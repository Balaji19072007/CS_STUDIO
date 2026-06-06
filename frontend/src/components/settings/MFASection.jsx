import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, ShieldAlert, Loader, Check, X } from 'lucide-react';

const MFASection = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'disabled', 'enrolling', 'enabled'
  const [factors, setFactors] = useState([]);
  const [qrCodeData, setQrCodeData] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/auth/session/mfa/status');
      const data = await res.json();
      if (data.success) {
        setFactors(data.factors);
        if (data.factors.length > 0 && data.factors[0].status === 'verified') {
          setStatus('enabled');
        } else {
          setStatus('disabled');
        }
      } else {
        setError('Failed to fetch MFA status');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const startEnrollment = async () => {
    setIsProcessing(true);
    setError('');
    try {
      const res = await fetch('/api/auth/session/mfa/enroll', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.data.totp.qr_code) {
        setQrCodeData(data.data.totp.qr_code);
        setFactorId(data.data.id);
        setStatus('enrolling');
      } else {
        setError(data.msg || 'Failed to start enrollment');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyEnrollment = async () => {
    if (!verifyCode || verifyCode.length < 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    setIsProcessing(true);
    setError('');
    try {
      // First, challenge
      const challengeRes = await fetch('/api/auth/session/mfa/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ factorId })
      });
      const challengeData = await challengeRes.json();
      
      if (!challengeData.success) {
        throw new Error(challengeData.msg || 'Challenge failed');
      }

      // Then verify
      const verifyRes = await fetch('/api/auth/session/mfa/verify-enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          factorId, 
          challengeId: challengeData.data.id, 
          code: verifyCode 
        })
      });
      const verifyData = await verifyRes.json();
      
      if (verifyData.success) {
        setStatus('enabled');
        fetchStatus();
      } else {
        setError(verifyData.msg || 'Invalid code');
      }
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const unenroll = async () => {
    if (!factors.length) return;
    setIsProcessing(true);
    setError('');
    try {
      const res = await fetch('/api/auth/session/mfa/unenroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ factorId: factors[0].id })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('disabled');
        setFactors([]);
      } else {
        setError(data.msg || 'Failed to disable MFA');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader className="w-5 h-5 animate-spin" />
        <span>Loading security settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className={`w-5 h-5 ${status === 'enabled' ? 'text-green-500' : 'text-gray-400'}`} />
            Two-Factor Authentication (2FA)
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add an extra layer of security to your account using an authenticator app.
          </p>
        </div>
        {status === 'enabled' ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400">
            <Check className="w-3.5 h-3.5" />
            Enabled
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            Disabled
          </span>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {status === 'disabled' && (
        <button
          onClick={startEnrollment}
          disabled={isProcessing}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? <Loader className="w-4 h-4 animate-spin" /> : null}
          Enable 2FA
        </button>
      )}

      {status === 'enrolling' && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p className="font-medium mb-2">Step 1: Scan this QR code</p>
            <p>Open your authenticator app (like Google Authenticator or Authy) and scan the QR code below.</p>
          </div>
          
          <div className="bg-white p-4 inline-block rounded-xl shadow-sm">
            {qrCodeData && <QRCodeSVG value={qrCodeData} size={160} />}
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p className="font-medium mb-2">Step 2: Enter verification code</p>
            <p className="mb-3">Enter the 6-digit code generated by your app to verify the setup.</p>
            
            <div className="flex gap-3 max-w-sm">
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={verifyEnrollment}
                disabled={isProcessing || verifyCode.length !== 6}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? <Loader className="w-4 h-4 animate-spin" /> : 'Verify'}
              </button>
            </div>
          </div>
          
          <button
            onClick={() => setStatus('disabled')}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
          >
            Cancel setup
          </button>
        </div>
      )}

      {status === 'enabled' && (
        <div>
          <button
            onClick={unenroll}
            disabled={isProcessing}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? <Loader className="w-4 h-4 animate-spin" /> : null}
            Disable 2FA
          </button>
        </div>
      )}
    </div>
  );
};

export default MFASection;
