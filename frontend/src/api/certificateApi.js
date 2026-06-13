import { buildApiUrl, getHeaders } from '../config/api.js';

export const getMyCertificates = async () => {
  try {
    const response = await fetch(buildApiUrl('/api/certificates/my-certificates'), {
      headers: getHeaders(false),
    });

    if (!response.ok) {
      if (response.status === 401) return [];
      const text = await response.text().catch(() => '');
      throw new Error(text ? JSON.parse(text).error : `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.certificates || [];
  } catch (err) {
    if (err.message && !err.message.startsWith('HTTP')) throw err;
    throw new Error('Failed to load certificates');
  }
};

export const issueCourseCertificate = async (courseId) => {
  try {
    const response = await fetch(buildApiUrl(`/api/certificates/issue/${courseId}`), {
      method: 'POST',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      const err = new Error(text ? JSON.parse(text).error || 'Failed to issue certificate' : 'Failed to issue certificate');
      throw err;
    }

    return await response.json();
  } catch (err) {
    if (err.message && !err.message.startsWith('Failed')) throw err;
    throw new Error('Failed to issue certificate');
  }
};

export const verifyCertificate = async (certificateId) => {
  try {
    const response = await fetch(buildApiUrl(`/api/certificates/verify/${certificateId}`));

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(text ? JSON.parse(text).error || 'Failed to verify certificate' : 'Failed to verify certificate');
    }

    return await response.json();
  } catch (err) {
    if (err.message && !err.message.startsWith('Failed')) throw err;
    throw new Error('Failed to verify certificate');
  }
};
