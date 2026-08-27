import React from 'react';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  navigate: (route: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ navigate }) => {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-100 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Privacy Policy & Medical Data Confidentiality</h1>
          <p className="text-xs sm:text-sm text-orange-100">
            Sri Kanchi Kamakoti Medical Trust / Sankara Eye Foundation India
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs text-slate-600 leading-relaxed">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 font-semibold">
          Last Updated: August 2026 | Governing Law: Information Technology Act & NABH Patient Privacy Standards
        </div>

        <h3 className="text-base font-bold text-slate-900 pt-2">1. Patient Medical Information & Electronic Health Records</h3>
        <p>
          All diagnostic imagery, ophthalmic scan records (OCT, Topography, Visual Fields), surgical reports, and consultation summaries captured across Sankara Eye Hospital units are strictly confidential and stored on encrypted, access-restricted healthcare databases compliant with NABH standards.
        </p>

        <h3 className="text-base font-bold text-slate-900 pt-2">2. Donor Data & Financial Security</h3>
        <p>
          Information submitted for surgery sponsorships and 80G tax exemption receipts (including Permanent Account Numbers - PAN) is used solely for the generation of statutory tax receipts and accounting compliance under the Indian Income Tax Act and FCRA regulations. We do not sell, rent, or distribute donor details.
        </p>

        <h3 className="text-base font-bold text-slate-900 pt-2">3. Eye Bank Pledge Registry</h3>
        <p>
          Pledge information entered for eye donation is stored within the Sri Jayendra Saraswathi Eye Bank confidential registry and referenced only upon grief notification by authorized next of kin.
        </p>
      </div>
    </div>
  );
};
