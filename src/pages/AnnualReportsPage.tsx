import React from 'react';
import { FileText, Download, ShieldCheck, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';
import { ANNUAL_REPORTS_DATA } from '../data/reportsData';

interface AnnualReportsPageProps {
  navigate: (route: string) => void;
}

export const AnnualReportsPage: React.FC<AnnualReportsPageProps> = ({ navigate }) => {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Governance & Financial Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Annual Reports & Audited Statements
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            As a public charitable trust, Sri Kanchi Kamakoti Medical Trust maintains absolute financial integrity and statutory compliance under FCRA and 80G.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Governance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-orange-600 uppercase">FCRA Registered</div>
            <div className="text-xl font-bold text-slate-900 mt-1">Ministry of Home Affairs</div>
            <div className="text-xs text-slate-500 mt-1">Foreign Contribution Permitted</div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-orange-600 uppercase">Section 80G</div>
            <div className="text-xl font-bold text-slate-900 mt-1">Income Tax Exempt</div>
            <div className="text-xs text-slate-500 mt-1">50% Deduction for Donors</div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-emerald-600 uppercase">Independent Audit</div>
            <div className="text-xl font-bold text-slate-900 mt-1">Statutory Audited</div>
            <div className="text-xs text-slate-500 mt-1">Chartered Accountants Vetted</div>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-orange-600 uppercase">Surplus Deployment</div>
            <div className="text-xl font-bold text-slate-900 mt-1">100% Non-Profit</div>
            <div className="text-xs text-slate-500 mt-1">Re-invested in Free Care</div>
          </div>
        </div>

        {/* Reports Gallery */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Audited Reports & Clinical Reviews (2016 - 2025)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANNUAL_REPORTS_DATA.map((rep) => (
              <div
                key={rep.year}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-orange-300 hover:shadow-card-hover transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={rep.image}
                      alt={rep.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {rep.year}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {rep.title}
                    </h3>
                    <div className="space-y-1 text-xs text-slate-600">
                      <div><strong>Surgeries:</strong> {rep.surgeriesConducted}</div>
                      <div><strong>Rural Outreach:</strong> {rep.outreachPatients}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">{rep.fileSize}</span>
                  <a
                    href={rep.downloadUrl}
                    onClick={(e) => { e.preventDefault(); alert(`Downloading report for ${rep.year}...`); }}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
