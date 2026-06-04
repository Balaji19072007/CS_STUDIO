import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { verifyCertificate } from '../api/certificateApi.js';
import CertificatePreview from '../components/certificates/CertificatePreview.jsx';
import Loader from '../components/common/Loader';
import { downloadCertificate, formatCertificateDate } from '../utils/certificateUtils.js';

const VerifyCertificate = () => {
  const navigate = useNavigate();
  const { certificateId: routeCertificateId } = useParams();
  const [searchParams] = useSearchParams();
  const queryCertificateId = searchParams.get('id') || '';

  const [certificateId, setCertificateId] = useState(routeCertificateId || queryCertificateId || '');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const runVerification = async (id) => {
    const trimmedId = id.trim();
    if (!trimmedId) {
      setError('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setError('');
    setNotice('');
    setVerificationResult(null);

    try {
      const result = await verifyCertificate(trimmedId);
      setVerificationResult(result);
    } catch (verificationError) {
      setError(verificationError.message || 'Certificate not found or invalid');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialId = routeCertificateId || queryCertificateId || '';
    if (!initialId) {
      return;
    }

    setCertificateId(initialId);
    runVerification(initialId);
  }, [queryCertificateId, routeCertificateId]);

  const handleVerify = async (event) => {
    event.preventDefault();
    await runVerification(certificateId);
  };

  const handleCopyLink = async () => {
    if (!verificationResult?.verificationUrl) {
      return;
    }

    await navigator.clipboard.writeText(verificationResult.verificationUrl);
    setNotice('Verification link copied to clipboard.');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/courses')}
          className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white shadow-sm"
          title="Back to Courses"
        >
          ←
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Verify Certificate</h1>
          <p className="text-gray-400 text-lg">
            Enter a certificate ID to confirm that the completion record is valid.
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="certificateId" className="block text-sm font-medium text-gray-300 mb-2">
                Certificate ID
              </label>
              <input
                type="text"
                id="certificateId"
                value={certificateId}
                onChange={(event) => setCertificateId(event.target.value)}
                placeholder="Enter a certificate UUID"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
              />
            </div>

            {error ? (
              <div className="rounded-lg border border-red-500 bg-red-900/20 px-4 py-3 text-red-200">
                {error}
              </div>
            ) : null}

            {notice ? (
              <div className="rounded-lg border border-blue-500 bg-blue-900/20 px-4 py-3 text-blue-200">
                {notice}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Certificate'}
            </button>
          </form>

          {loading ? (
            <div className="mt-8 text-center">
              <Loader size="md" message="Verifying certificate..." />
            </div>
          ) : null}

          {verificationResult ? (
            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-green-500 bg-green-900/20 p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                    OK
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-400">Valid Certificate</h3>
                    <p className="text-sm text-green-300">This certificate is authentic and verified.</p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-green-800 pt-4">
                  <div>
                    <p className="mb-1 text-sm text-green-300/70">Recipient</p>
                    <p className="text-lg font-semibold text-white">{verificationResult.userName}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-green-300/70">Course</p>
                    <p className="text-lg font-semibold text-white">{verificationResult.courseTitle}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-green-300/70">Issue Date</p>
                    <p className="text-white">{formatCertificateDate(verificationResult.issuedAt)}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-green-300/70">Certificate ID</p>
                    <p className="break-all font-mono text-sm text-white">{verificationResult.certificateId}</p>
                  </div>
                </div>
              </div>

              <CertificatePreview certificate={verificationResult} />

              <div className="grid gap-3 sm:grid-cols-3">
                <button
                  onClick={handleCopyLink}
                  className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition"
                >
                  Copy Verification Link
                </button>
                <button
                  onClick={() => downloadCertificate(verificationResult)}
                  className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition"
                >
                  Download Certificate
                </button>
                <button
                  onClick={() => navigate('/courses')}
                  className="rounded-xl border border-gray-700 px-4 py-3 text-sm font-medium text-gray-200 hover:border-gray-500 transition"
                >
                  Browse Courses
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>CS Studio certificates are issued when learners complete the tracked course path.</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
