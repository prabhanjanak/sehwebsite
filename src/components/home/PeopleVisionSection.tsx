import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, CheckCircle2, ChevronRight, Sparkles, Building2, Smile, Eye, Calendar } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

interface PeopleVisionSectionProps {
  navigate: (route: string) => void;
}

export const PeopleVisionSection: React.FC<PeopleVisionSectionProps> = ({ navigate }) => {
  const { openAppointmentModal } = useDatabase();

  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-50/20 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden border border-slate-800"
        >
          {/* Subtle Saffron Lighting Halo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold border border-orange-500/30">
                <Heart className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                <span>Our Sacred Mission • Serving Humanity Since 1977</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                "Restoring Vision, Restoring Independence, Restoring Smiles"
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Sankara, every patient experience represents clinical excellence and trust. Founded in 1977 under the sacred auspices of Sri Kanchi Kamakoti Peetham, our network has touched over <strong className="text-white">6.5 million citizens</strong> across India, delivering independence, restorative eye care, and surgical excellence.
              </p>

              {/* People Impact Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs">
                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <div className="flex items-center gap-2 text-orange-400 font-bold">
                    <Users className="w-4 h-4" />
                    <span>2.6+ Million Patients Treated</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Under strict NABH quality protocols with advanced micro-incision surgical care.</p>
                </div>

                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <div className="flex items-center gap-2 text-orange-400 font-bold">
                    <Smile className="w-4 h-4" />
                    <span>1.8+ Million Children</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Screened in rural schools under the Rainbow Child Eye Care program.</p>
                </div>

                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>2,500+ Rural Women</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Trained and empowered as certified vision care technicians.</p>
                </div>

                <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Eye className="w-4 h-4" />
                    <span>30,000+ Villages</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Visited continuously by our mobile screening and tele-retina fleets.</p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/social-impact')}
                  className="btn-primary !px-6 !py-3.5 text-xs font-bold shadow-lg flex items-center gap-2 group"
                >
                  <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Explore Social Impact Initiatives →</span>
                </button>

                <button
                  onClick={() => navigate('/services')}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 group"
                >
                  <span>Explore Clinical Network</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Genuine Hospital Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800 rounded-3xl p-3 border border-slate-700 shadow-2xl max-w-md mx-auto space-y-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] w-full bg-slate-900">
                  <img
                    src="/assets/images/sankara_home_2-2.jpg"
                    alt="Sankara Eye Hospital Super-Specialty Facilities"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2 text-center">
                  <div className="text-xs font-bold text-slate-200">
                    Sankara Super-Specialty Tertiary Hospital Network
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    NABH-accredited modern ophthalmic hospitals delivering world-class surgical precision and patient care across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
