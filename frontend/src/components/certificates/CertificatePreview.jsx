import React from 'react';
import { formatCertificateDate } from '../../utils/certificateUtils.js';

const CertificatePreview = ({ certificate, compact = false }) => {
  if (!certificate) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-amber-300/30 bg-[#09131E] shadow-2xl ${compact ? 'p-5' : 'p-8'}`}>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-amber-300/15 via-yellow-200/10 to-transparent" />
      <div className="absolute inset-4 rounded-[22px] border border-slate-600/40" />

      <div className="relative z-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.38em] text-amber-200">CS Studio</p>
          <h3 className={`mt-4 font-serif text-white ${compact ? 'text-2xl' : 'text-4xl'}`}>Certificate of Completion</h3>
          <p className={`mt-4 text-slate-400 ${compact ? 'text-sm' : 'text-base'}`}>Awarded to</p>
          <p className={`mt-3 font-serif text-amber-100 ${compact ? 'text-3xl' : 'text-5xl'}`}>{certificate.userName}</p>
          <div className="mx-auto mt-4 h-px w-3/4 bg-slate-700/70" />
          <p className={`mt-6 text-slate-300 ${compact ? 'text-sm' : 'text-base'}`}>for successfully completing</p>
          <p className={`mt-3 font-serif text-white ${compact ? 'text-2xl' : 'text-4xl'}`}>{certificate.courseTitle}</p>
        </div>

        <div className={`mt-8 grid gap-4 ${compact ? 'md:grid-cols-1' : 'md:grid-cols-3'}`}>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Issued On</p>
            <p className="mt-2 text-sm text-white">{formatCertificateDate(certificate.issuedAt)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Status</p>
            <p className="mt-2 text-sm font-semibold text-emerald-300">Verified completion record</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Certificate ID</p>
            <p className="mt-2 break-all font-mono text-xs text-slate-200">{certificate.certificateId || certificate.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
