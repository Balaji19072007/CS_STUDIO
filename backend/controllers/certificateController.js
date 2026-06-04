const { randomUUID } = require('crypto');
const { supabase } = require('../config/supabase');

const normalizeBaseUrl = (value) => value.replace(/\/+$/, '');

const getFrontendBaseUrl = (req) => {
  const configured = process.env.FRONTEND_URL || process.env.CLIENT_URL;
  if (configured) {
    return normalizeBaseUrl(configured);
  }

  const origin = req.headers.origin || req.headers.referer;
  if (origin) {
    // Referer might have trailing paths, so we parse it safely
    try {
      const parsedUrl = new URL(origin);
      return `${parsedUrl.protocol}//${parsedUrl.host}`;
    } catch (e) {
      return normalizeBaseUrl(origin);
    }
  }

  return `${req.protocol}://${req.get('host')}`;
};

const buildVerificationUrl = (req, certificateId) =>
  `${getFrontendBaseUrl(req)}/#/certificates/verify/${certificateId}`;

const serializeCertificate = (certificate) => ({
  id: certificate.id,
  certificateId: certificate.id,
  userId: certificate.user_id,
  userName: certificate.user_name,
  courseTitle: certificate.course_title,
  issuedAt: certificate.issued_at,
  verificationUrl: certificate.verification_url,
  pdfUrl: certificate.pdf_url,
});

const isProgressCompleted = (entry) =>
  Boolean(entry?.completed === true || entry?.status === 'completed' || entry?.completed_at);

const getProgressTimestamp = (entry) =>
  entry?.completed_at || entry?.updated_at || entry?.created_at || entry?.started_at || null;

const shouldPreferProgressEntry = (candidate, existing) => {
  if (!existing) {
    return true;
  }

  const candidateCompleted = isProgressCompleted(candidate);
  const existingCompleted = isProgressCompleted(existing);

  if (candidateCompleted !== existingCompleted) {
    return candidateCompleted;
  }

  return new Date(getProgressTimestamp(candidate) || 0).getTime()
    >= new Date(getProgressTimestamp(existing) || 0).getTime();
};

const countCompletedProgressRows = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return 0;
  }

  const byTopicId = new Map();

  rows.forEach((row) => {
    const topicId = row?.topic_id;
    if (!topicId) {
      return;
    }

    const current = byTopicId.get(topicId);
    if (shouldPreferProgressEntry(row, current)) {
      byTopicId.set(topicId, row);
    }
  });

  return Array.from(byTopicId.values()).filter(isProgressCompleted).length;
};

const getCompletionCounts = async (userId, courseId) => {
  const { count: totalTopics } = await supabase
    .from('topics')
    .select('id, phases!inner(id, course_id)', { count: 'exact', head: true })
    .eq('phases.course_id', courseId);

  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('*, topics!inner(id, phases!inner(id, course_id))')
    .eq('user_id', userId)
    .eq('topics.phases.course_id', courseId);

  return {
    totalTopics: totalTopics || 0,
    completedTopics: countCompletedProgressRows(progressRows),
  };
};

const getUserDisplayName = async (userId, fallbackEmail = '') => {
  const { data: userRow } = await supabase
    .from('users')
    .select('first_name, last_name, username, email')
    .eq('id', userId)
    .single();

  const fullName = [userRow?.first_name, userRow?.last_name].filter(Boolean).join(' ').trim();
  if (fullName) {
    return fullName;
  }

  if (userRow?.username) {
    return userRow.username;
  }

  return userRow?.email || fallbackEmail || 'CS Studio Learner';
};

const verifyCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Certificate ID is required' });
    }

    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ status: 'invalid', error: 'Certificate not found' });
    }

    return res.status(200).json({
      status: 'valid',
      ...serializeCertificate(data),
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const verifyCertificatePremium = async (req, res) => {
  try {
    const { id, verifiedBy, paymentToken } = req.body;

    if (!id || !verifiedBy || !paymentToken) {
      return res
        .status(400)
        .json({ error: 'Missing required fields (id, verifiedBy, paymentToken)' });
    }

    if (paymentToken !== 'valid_token') {
      return res.status(402).json({ error: 'Payment failed' });
    }

    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ status: 'invalid', error: 'Certificate not found' });
    }

    await supabase.from('certificate_verifications').insert([
      {
        certificate_id: id,
        verified_by: verifiedBy,
        payment_status: 'paid',
        verified_at: new Date().toISOString(),
        verification_type: 'premium',
      },
    ]);

    return res.status(200).json({
      status: 'valid',
      ...serializeCertificate(data),
      topicsCovered: `All topics in ${data.course_title}`,
      verificationType: 'premium',
    });
  } catch (error) {
    console.error('Premium Verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getMyCertificates = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .order('issued_at', { ascending: false });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      certificates: (data || []).map(serializeCertificate),
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const issueCourseCertificate = async (req, res) => {
  try {
    const userId = req.user?.id;
    const courseId = req.params.courseId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id, title')
      .eq('id', courseId)
      .single();

    if (courseError || !course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const { totalTopics, completedTopics } = await getCompletionCounts(userId, courseId);

    if (!totalTopics) {
      return res.status(400).json({
        error: 'This course does not have any topics to certify yet',
      });
    }

    if (completedTopics < totalTopics) {
      return res.status(400).json({
        error: 'Complete every topic in the course before requesting a certificate',
        progress: {
          totalTopics,
          completedTopics,
          progressPercentage: Math.round((completedTopics / totalTopics) * 100),
        },
      });
    }

    const { data: existing } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .eq('course_title', course.title)
      .limit(1)
      .maybeSingle();

    if (existing) {
      return res.status(200).json({
        alreadyIssued: true,
        certificate: serializeCertificate(existing),
      });
    }

    const certificateId = randomUUID();
    const certificate = {
      id: certificateId,
      user_id: userId,
      user_name: await getUserDisplayName(userId, req.user?.email),
      course_title: course.title,
      issued_at: new Date().toISOString(),
      verification_url: buildVerificationUrl(req, certificateId),
      pdf_url: null,
    };

    const { data, error } = await supabase
      .from('certificates')
      .insert(certificate)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      alreadyIssued: false,
      certificate: serializeCertificate(data),
    });
  } catch (error) {
    console.error('Error issuing certificate:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  verifyCertificate,
  verifyCertificatePremium,
  getMyCertificates,
  issueCourseCertificate,
};
