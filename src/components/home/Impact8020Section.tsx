import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, ArrowRight, ShieldCheck, CheckCircle, Sparkles, Building2, Eye, TrendingUp } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { MODEL_80_20_STEPS, INITIATIVES_DATA } from '../../data/initiativesData';
import { TiltCard } from '../common/TiltCard';

interface Impact8020SectionProps {
  navigate: (route: string) => void;
}

export const Impact8020Section: React.FC<Impact8020SectionProps> = ({ navigate }) => {
  const { openDonationModal } = useDatabase();

  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header with Smooth Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <span className="badge-sankara text-xs">
            <Heart className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>The Pioneering Socio-Economic Health Engine</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            The Sankara <span className="orange-gradient-text">80:20 Model</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Unlike conventional charities, Sankara Eye Hospital functions as a self-sustaining social enterprise where revenue generated from 20% paying patients cross-subsidizes 80% free super-specialty surgical care for rural poor.
          </p>
        </motion.div>

        {/* 80:20 Flow Diagram with Staggered 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {MODEL_80_20_STEPS.map((step, idx) => (
            <motion.div 
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className="bg-white rounded-3xl p-6 border-2 border-orange-100/80 shadow-md hover:border-orange-400 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group h-full">
                  {/* Step Number Bubble */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-md group-hover:scale-105 transition-transform">
                      0{step.step}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                      {step.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-orange-600 font-semibold">
                    <span>Phase 0{idx + 1}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Dedicated Social Impact Programs Grid with Uncropped Official Graphics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-orange-100 shadow-xl space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-orange-600">Outreach Pillars</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Our Dedicated Social Impact Programs</h3>
            </div>
            <button
              onClick={() => navigate('/social-impact')}
              className="btn-outline-orange !px-5 !py-2 text-xs font-bold self-start md:self-auto"
            >
              <span>Explore All Impact Initiatives →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIATIVES_DATA.slice(0, 3).map((init, idx) => (
              <motion.div
                key={init.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl border-2 border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Uncropped Official Graphic Container */}
                  <div className="w-full h-48 bg-gradient-to-b from-orange-50/80 via-orange-50/40 to-white p-5 flex items-center justify-center border-b border-orange-100/60">
                    <img 
                      src={init.icon} 
                      alt={init.title} 
                      className="max-h-full max-w-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <span className="badge-sankara text-[10px]">{init.targetGroup}</span>
                    <h4 className="font-bold text-slate-900 text-base leading-snug">{init.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {init.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {init.impactMetrics.slice(0, 2).map((metric, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/social-impact')}
                    className="w-full py-2 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center"
                  >
                    Program Details & Reach →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sponsoring Action Banner */}
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-black">Join the Mission to Eradicate Needless Blindness</h4>
              <p className="text-xs text-orange-100 max-w-xl">
                Just ₹3,750 ($50) provides one complete micro-incision cataract surgery, premium foldable IOL lens, food, and medication for a rural elder.
              </p>
            </div>
            <button
              onClick={() => openDonationModal(1)}
              className="bg-white text-orange-600 hover:bg-orange-50 font-black px-6 py-3.5 rounded-2xl text-xs shadow-lg flex-shrink-0 flex items-center gap-2 hover:scale-105 transition-all group"
            >
              <Heart className="w-4 h-4 fill-orange-600 text-orange-600 transition-transform group-hover:scale-110" />
              <span>Sponsor a Cataract (₹3,750)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
