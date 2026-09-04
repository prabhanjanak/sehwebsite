import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Target, ShieldCheck, CheckCircle2, Sparkles, ArrowRight, Heart } from 'lucide-react';

export const InteractiveVisionMission: React.FC = () => {
  const [activeZone, setActiveZone] = useState<'vision' | 'mission'>('vision');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="badge-sankara text-xs">Our Core Purpose</span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Vision & Mission: <span className="orange-gradient-text">Interactive Philosophy</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Move your cursor between Vision and Mission to explore our founding creed and clinical calling.
        </p>
      </div>

      {/* Interactive Dual-Zone Cursor Flow Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* 👁️ VISION ZONE */}
        <motion.div
          onMouseEnter={() => setActiveZone('vision')}
          onClick={() => setActiveZone('vision')}
          animate={{
            scale: activeZone === 'vision' ? 1.02 : 0.98,
            borderColor: activeZone === 'vision' ? '#ea580c' : '#fed7aa'
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`rounded-3xl p-8 cursor-pointer relative overflow-hidden transition-all duration-300 flex flex-col justify-between border-2 ${
            activeZone === 'vision'
              ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white shadow-2xl shadow-orange-500/20'
              : 'bg-white text-slate-900 shadow-md hover:shadow-xl hover:border-orange-300'
          }`}
        >
          {/* Ambient Glow */}
          {activeZone === 'vision' && (
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          )}

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold shadow-md transition-colors ${
                activeZone === 'vision' ? 'bg-white text-orange-600' : 'bg-orange-100 text-orange-600'
              }`}>
                <Eye className="w-7 h-7" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                activeZone === 'vision'
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-orange-50 text-orange-700 border-orange-200'
              }`}>
                The North Star
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black">Our Vision</h3>
              <div className={`text-xs font-semibold ${activeZone === 'vision' ? 'text-orange-100' : 'text-slate-500'}`}>
                Eradicating Preventable Blindness
              </div>
            </div>

            <blockquote className={`text-lg sm:text-xl font-bold leading-snug italic pt-2 ${
              activeZone === 'vision' ? 'text-white' : 'text-slate-800'
            }`}>
              “To work towards freedom from preventable and curable blindness.”
            </blockquote>

            <p className={`text-xs leading-relaxed ${activeZone === 'vision' ? 'text-orange-100' : 'text-slate-600'}`}>
              Ensuring that no citizen, regardless of geography or economic status, is deprived of the gift of sight due to lack of access or affordability.
            </p>
          </div>

          <div className={`pt-6 mt-4 border-t flex flex-wrap items-center justify-between text-xs font-semibold relative z-10 ${
            activeZone === 'vision' ? 'border-white/20 text-white' : 'border-slate-100 text-slate-500'
          }`}>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-4 h-4 ${activeZone === 'vision' ? 'text-white' : 'text-emerald-600'}`} />
              <span>Universal Rural Eye Health</span>
            </span>
            <span className={`text-[11px] font-bold ${activeZone === 'vision' ? 'text-orange-200' : 'text-orange-600'}`}>
              {activeZone === 'vision' ? '● Active Focus' : 'Hover to Expand →'}
            </span>
          </div>
        </motion.div>

        {/* 🎯 MISSION ZONE */}
        <motion.div
          onMouseEnter={() => setActiveZone('mission')}
          onClick={() => setActiveZone('mission')}
          animate={{
            scale: activeZone === 'mission' ? 1.02 : 0.98,
            borderColor: activeZone === 'mission' ? '#ea580c' : '#fed7aa'
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`rounded-3xl p-8 cursor-pointer relative overflow-hidden transition-all duration-300 flex flex-col justify-between border-2 ${
            activeZone === 'mission'
              ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white shadow-2xl shadow-orange-500/20'
              : 'bg-white text-slate-900 shadow-md hover:shadow-xl hover:border-orange-300'
          }`}
        >
          {/* Ambient Glow */}
          {activeZone === 'mission' && (
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          )}

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold shadow-md transition-colors ${
                activeZone === 'mission' ? 'bg-white text-orange-600' : 'bg-orange-100 text-orange-600'
              }`}>
                <Target className="w-7 h-7" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                activeZone === 'mission'
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-orange-50 text-orange-700 border-orange-200'
              }`}>
                The Operational Vow
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black">Our Mission</h3>
              <div className={`text-xs font-semibold ${activeZone === 'mission' ? 'text-orange-100' : 'text-slate-500'}`}>
                High-Volume Compassionate Care
              </div>
            </div>

            <blockquote className={`text-lg sm:text-xl font-bold leading-snug italic pt-2 ${
              activeZone === 'mission' ? 'text-white' : 'text-slate-800'
            }`}>
              “To provide unmatched eye care through a strong service oriented team.”
            </blockquote>

            <p className={`text-xs leading-relaxed ${activeZone === 'mission' ? 'text-orange-100' : 'text-slate-600'}`}>
              Powered by dedicated surgical fellows, paramedical vision assistants, and the Unique Hybrid self-sustaining cross-subsidy engine across 14 hospital hubs.
            </p>
          </div>

          <div className={`pt-6 mt-4 border-t flex flex-wrap items-center justify-between text-xs font-semibold relative z-10 ${
            activeZone === 'mission' ? 'border-white/20 text-white' : 'border-slate-100 text-slate-500'
          }`}>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-4 h-4 ${activeZone === 'mission' ? 'text-white' : 'text-emerald-600'}`} />
              <span>Service-Oriented Clinical Teams</span>
            </span>
            <span className={`text-[11px] font-bold ${activeZone === 'mission' ? 'text-orange-200' : 'text-orange-600'}`}>
              {activeZone === 'mission' ? '● Active Focus' : 'Hover to Expand →'}
            </span>
          </div>
        </motion.div>

      </div>

      {/* 🛡️ STATIC QUALITY POLICY CARD (BELOW VISION & MISSION) */}
      <div className="bg-gradient-to-br from-white via-emerald-50/40 to-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-300 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-sm flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-200">
                Statutory Governance & Standards
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Sankara Quality Policy</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% NABH Accreditation</span>
          </div>
        </div>

        <blockquote className="text-sm sm:text-base text-slate-800 italic font-medium leading-relaxed bg-white/80 p-5 rounded-2xl border border-emerald-100 shadow-xs">
          “We will provide quality ophthalmic treatment and care with the highest levels of skill, competence and concern, by adopting the latest technologies, techniques and practices in prevention, diagnosis and treatment in all ophthalmological subspecialties.”
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 bg-white rounded-2xl border border-emerald-100 shadow-xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Highest Competence</span>
            </div>
            <p className="text-slate-500 text-[11px]">Subspecialty-trained surgeons with global DNB & ICO accreditations.</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-emerald-100 shadow-xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Latest Technology</span>
            </div>
            <p className="text-slate-500 text-[11px]">German Schwind Amaris 1050RS lasers & laminar airflow modular OTs.</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-emerald-100 shadow-xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Equal Clinical Concern</span>
            </div>
            <p className="text-slate-500 text-[11px]">Same surgical standards and sterility for free and paying patients.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
