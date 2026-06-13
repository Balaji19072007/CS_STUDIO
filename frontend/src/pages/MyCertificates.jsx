import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCertificates } from '../api/certificateApi.js';
import CertificatePreview from '../components/certificates/CertificatePreview.jsx';
import { SkeletonCard } from '../components/common/SkeletonLoader';
import EmptyState from '../components/common/EmptyState';
import { ErrorPage } from '../components/common/ErrorPages';
import { downloadCertificate, formatCertificateDate } from '../utils/certificateUtils.js';

const MyCertificates = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getMyCertificates();
        setCertificates(data);
      } catch (fetchError) {
        setError(fetchError.message || 'Failed to fetch certificates');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const copyVerificationLink = async (url) => {
    if (!url) {
      return;
    }

    await navigator.clipboard.writeText(url);
    setNotice('Verification link copied to clipboard.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-48 bg-gray-800 animate-pulse rounded-lg mb-2" />
            <div className="h-4 w-64 bg-gray-800/50 animate-pulse rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Certificates</h1>
            <p className="text-gray-400">Your verified records for completed courses.</p>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="px-5 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            Browse Courses
          </button>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorPage title="Failed to load certificates" description={error} onRetry={() => window.location.reload()} fullPage={false} />
          </div>
        )}

        {notice && (
          <div className="bg-blue-900/20 border border-blue-500 text-blue-200 px-4 py-3 rounded mb-6">
            {notice}
          </div>
        )}

        {certificates.length === 0 ? (
          <EmptyState
            iconType="default"
            title="No Certificates Yet"
            description="Complete courses to earn certificates. Each certificate verifies your mastery of the subject."
            action={
              <button
                onClick={() => navigate('/courses')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-600/20"
              >
                Browse Courses
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {certificates.map((certificate) => (
              <div
                key={certificate.certificateId}
                className="bg-gray-800 rounded-3xl border border-gray-700 overflow-hidden hover:border-amber-400/40 transition"
              >
                <div className="p-6 space-y-6">
                  <CertificatePreview certificate={certificate} compact={true} />

                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {certificate.courseTitle}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Issued on {formatCertificateDate(certificate.issuedAt)}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                      Verified
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                    <p className="text-sm text-gray-300 font-mono break-all">
                      {certificate.certificateId}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => navigate(`/certificates/verify/${certificate.certificateId}`)}
                      className="block w-full px-4 py-2.5 bg-amber-500 text-slate-950 text-center rounded-lg hover:bg-amber-400 transition text-sm font-semibold"
                    >
                      Open Verification
                    </button>

                    <button
                      onClick={() =>
                        copyVerificationLink(
                          certificate.verificationUrl ||
                            `${window.location.origin}/#/certificates/verify/${certificate.certificateId}`
                        )
                      }
                      className="w-full px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm font-medium"
                    >
                      Copy Verification Link
                    </button>

                    {certificate.pdfUrl ? (
                      <a
                        href={certificate.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-4 py-2.5 border border-gray-600 text-gray-200 text-center rounded-lg hover:border-gray-500 transition text-sm font-medium"
                      >
                        Download PDF
                      </a>
                    ) : (
                      <button
                        onClick={() => downloadCertificate(certificate)}
                        className="w-full px-4 py-2.5 border border-gray-600 text-gray-200 text-center rounded-lg hover:border-gray-500 transition text-sm font-medium"
                      >
                        Download Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCertificates;
