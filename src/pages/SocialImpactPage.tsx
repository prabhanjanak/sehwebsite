import React from 'react';
import { Heart, CheckCircle2, Users, ArrowRight, ShieldCheck, Sparkles, Building2, Calendar } from 'lucide-react';
import { INITIATIVES_DATA, MODEL_80_20_STEPS } from '../data/initiativesData';
import { useDatabase } from '../context/DatabaseContext';

interface SocialImpactPageProps {
  navigate: (route: string) => void;
}

export const SocialImpactPage: React.FC<SocialImpactPageProps> = ({ navigate }) => {
  const { openDonationModal } = useDatabase();

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" />
            <span>80:20 Cross-Subsidy Socio-Economic Healthcare Engine</span>
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
        {/* 80:20 Architecture Blueprint */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="badge-sankara text-xs">Self-Sustaining Philosophy</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              The 80:20 Operating Model Explained
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For every 20 paying patients treated at our modern super-specialty suites, the operational surplus generated funds free surgical care, intraocular lenses, hospital stay, nutritious food, and transport for 80 rural patients who cannot afford care.
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
            <span>Sponsor Cataract Surgery (₹3,750)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
