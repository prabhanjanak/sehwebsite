import React, { useState } from 'react';
import { Heart, CheckCircle2, Users, ArrowRight, ShieldCheck, Sparkles, Building2, Calendar, FileText, Download, Eye } from 'lucide-react';
import { INITIATIVES_DATA, MODEL_80_20_STEPS } from '../data/initiativesData';
import { useDatabase } from '../context/DatabaseContext';

interface SocialImpactPageProps {
  navigate: (route: string) => void;
}

interface ImpactReportItem {
  id: string;
  year: string;
  title: string;
  beneficiaries: string;
  metricLabel: string;
  coverage: string;
  fileSize: string;
}

const GOV_REPORTS: ImpactReportItem[] = [
  {
    id: 'gov-2025',
    year: '2024 - 2025',
    title: 'Gift of Vision (GOV) Annual Rural Outreach & Eye Care Impact Report',
    beneficiaries: '248,500+ Sight-Restoring Surgeries',
    metricLabel: 'Surgeries Provided 100% Free of Cost',
    coverage: 'Covering 30,000+ villages across 9 States',
    fileSize: '4.2 MB (PDF)'
  },
  {
    id: 'gov-2024',
    year: '2023 - 2024',
    title: 'Gift of Vision (GOV) Rural Community Surgical Audit & Reach',
    beneficiaries: '232,000+ Surgeries Delivered',
    metricLabel: 'Free Cataract & Posterior Surgeries',
    coverage: 'Doorstep mobile screening in 28,500 villages',
    fileSize: '3.8 MB (PDF)'
  },
  {
    id: 'gov-2023',
    year: '2022 - 2023',
    title: 'Gift of Vision (GOV) Comprehensive Eradication of Blindness Report',
    beneficiaries: '215,400+ Sight Restorations',
    metricLabel: 'Free Micro-Incision Phaco Procedures',
    coverage: 'Deep rural outreach in South & Central India',
    fileSize: '3.5 MB (PDF)'
  }
];

const RAINBOW_REPORTS: ImpactReportItem[] = [
  {
    id: 'rb-2025',
    year: '2024 - 2025',
    title: 'Rainbow Paediatric Eye Care & School Vision Screening Annual Audit',
    beneficiaries: '320,000+ Children Screened',
    metricLabel: '18,500+ Prescription Spectacles Distributed Free',
    coverage: 'Government & rural schools across Karnataka, TN & UP',
    fileSize: '3.9 MB (PDF)'
  },
  {
    id: 'rb-2024',
    year: '2023 - 2024',
    title: 'Rainbow Paediatric Vision Screening & Early Squint Intervention Report',
    beneficiaries: '280,000+ Children Screened',
    metricLabel: '1,450+ Congenital Cataract & Squint Surgeries',
    coverage: 'Anganwadi centers and rural primary schools',
    fileSize: '3.4 MB (PDF)'
  },
  {
    id: 'rb-2023',
    year: '2022 - 2023',
    title: 'Rainbow Childhood Blindness Prevention & Amblyopia Intervention',
    beneficiaries: '250,000+ Students Tested',
    metricLabel: '14,200+ Free Spectacles & Vision Therapy Kits',
    coverage: 'Over 850 rural government educational institutions',
    fileSize: '3.1 MB (PDF)'
  }
];

export const SocialImpactPage: React.FC<SocialImpactPageProps> = ({ navigate }) => {
  const { openDonationModal } = useDatabase();
  const [activeReportTab, setActiveReportTab] = useState<'gov' | 'rainbow'>('gov');

  const currentReports = activeReportTab === 'gov' ? GOV_REPORTS : RAINBOW_REPORTS;

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" />
            <span>Unique Hybrid Socio-Economic Healthcare Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Social Impact & Rural Outreach
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Eliminating curable blindness by reaching patients where they live — in remote villages, government schools, and tribal communities across India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Unique Hybrid Model Architecture Blueprint */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="badge-sankara text-xs">Self-Sustaining Philosophy</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              The Unique Hybrid Model Explained
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Under our pioneering Unique Hybrid Model, revenue generated from paying patient tariffs in our modern super-specialty suites directly cross-subsidizes free surgical care, intraocular lenses, hospital stay, nutritious food, and doorstep transport for rural poor patients without dependence on foreign aid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {MODEL_80_20_STEPS.map((step) => (
              <div key={step.step} className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-orange-600 text-white font-bold flex items-center justify-center text-xs">
                    0{step.step}
                  </span>
                  <span className="text-[10px] font-bold text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/60">
                    {step.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white pt-1">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Initiatives Grid with Proper Uncropped Official Graphics */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-sankara text-xs mb-1">Our Outreach Arms</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Community Outreach Programs
            </h2>
          </div>

          <div className="space-y-10">
            {INITIATIVES_DATA.map((init, idx) => (
              <div
                key={init.id}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-orange-100 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <span className="badge-sankara text-[10px]">{init.targetGroup}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{init.title}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {init.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {init.keyHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                    {init.impactMetrics.map((m, i) => (
                      <span key={i} className="badge-trust text-xs">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Clean uncropped official graphic showcase */}
                  <div className="rounded-3xl bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 border-2 border-orange-100 shadow-md flex items-center justify-center min-h-[220px]">
                    <img
                      src={init.icon}
                      alt={init.title}
                      className="max-h-48 max-w-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated GOV & Rainbow Reports Section (Item 19) */}
        <div id="impact-reports" className="space-y-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="badge-sankara text-xs mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Audited Social Impact Reports</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                GOV & Rainbow Program Documentation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Official clinical audits and rural coverage records detailing beneficiaries served under our Gift of Vision and Rainbow childhood vision initiatives.
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
              <button
                onClick={() => setActiveReportTab('gov')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeReportTab === 'gov'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-orange-600'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Gift of Vision (GOV)</span>
              </button>
              <button
                onClick={() => setActiveReportTab('rainbow')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeReportTab === 'rainbow'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-orange-600'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Rainbow Paediatric</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentReports.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-3xl p-6 border-2 border-orange-100 shadow-md hover:border-orange-300 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                      {rep.year}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">{rep.fileSize}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                    {rep.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="font-bold text-slate-900">{rep.beneficiaries}</div>
                    <div className="text-slate-500 text-[11px]">{rep.metricLabel}</div>
                    <div className="text-orange-700 font-medium text-[11px] flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{rep.coverage}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => alert(`Downloading ${rep.title} (${rep.year})...`)}
                    className="w-full btn-outline-orange !py-2 text-xs font-bold justify-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Sponsorship Cart Box */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">Transform a Life Today</h3>
            <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
              100% of your donation under Section 80G and 501(c)(3) directly funds sight-restoring surgeries for verified rural patients.
            </p>
          </div>
          <button
            onClick={() => openDonationModal(1)}
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-4 rounded-2xl text-xs sm:text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all flex-shrink-0"
          >
            <Heart className="w-4 h-4 fill-orange-600" />
            <span>Sponsor Cataract Surgery (₹3,000)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
