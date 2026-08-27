import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Calendar,
  Activity,
  Eye,
  ArrowRight,
  Zap,
  MapPin,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { SPECIALTIES_DATA } from '../../data/specialtiesData';
import { useDatabase } from '../../context/DatabaseContext';

interface SpecialtiesPreviewProps {
  navigate: (route: string) => void;
}

const SPECIALTY_ICONS: Record<string, React.ElementType> = {
  lasik: Sparkles,
  cataract: Eye,
  retina: Activity,
  cornea: ShieldCheck,
  paediatric: Award,
  glaucoma: Clock
};

export const SpecialtiesPreview: React.FC<SpecialtiesPreviewProps> = ({ navigate }) => {
  // LASIK is default #1 active tab
  const [activeTab, setActiveTab] = useState('lasik');
  const { openAppointmentModal } = useDatabase();

  const currentSpecialty = SPECIALTIES_DATA.find((s) => s.id === activeTab) || SPECIALTIES_DATA[0];
  const IconComponent = SPECIALTY_ICONS[currentSpecialty.id] || Sparkles;

  return (
    <section className="py-16 sm:py-20 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-orange-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Flagship Refractive Laser Suites & Tertiary Eye Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Advanced Clinical <span className="orange-gradient-text">Specialties & Laser Suites</span>
            </h2>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="btn-outline-orange !px-5 !py-2.5 text-xs font-bold self-start md:self-auto flex items-center gap-1.5 shadow-xs"
          >
            <span>View All 12 Specialties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Master-Detail Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Vertical Specialty Navigation Tabs (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {SPECIALTIES_DATA.slice(0, 6).map((spec) => {
              const SpecIcon = SPECIALTY_ICONS[spec.id] || Eye;
              const isActive = activeTab === spec.id;

              return (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(spec.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border-2 cursor-pointer ${
                    isActive
                      ? 'bg-white border-orange-500 shadow-lg shadow-orange-500/10 translate-x-1.5'
                      : 'bg-white/80 border-slate-200/90 hover:border-orange-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold transition-colors ${
                      isActive 
                        ? 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md' 
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      <SpecIcon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className={`font-bold text-sm truncate ${isActive ? 'text-orange-600' : 'text-slate-900'}`}>
                        {spec.title}
                      </div>
                      <div className="text-xs text-slate-500 truncate max-w-[210px] mt-0.5 font-normal">
                        {spec.tagline}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isActive ? 'text-orange-600 translate-x-1 font-bold' : 'text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Specialty Showcase Card (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpecialty.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-orange-100 shadow-xl space-y-6 h-full flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top Badges & Booking CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="badge-sankara text-xs">
                          <IconComponent className="w-3.5 h-3.5" />
                          <span>NABH Super-Specialty Center</span>
                        </span>

                        {currentSpecialty.id === 'lasik' && (
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>In-House OTs in Shimoga, Bangalore, Coimbatore, Guntur & All Units</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                        {currentSpecialty.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-orange-600">
                        {currentSpecialty.tagline}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/services/${currentSpecialty.id}`)}
                      className="btn-primary !px-6 !py-3 text-xs font-bold whitespace-nowrap shadow-glow flex items-center gap-2 flex-shrink-0 self-start sm:self-auto"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Explore Department Details →</span>
                    </button>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {currentSpecialty.fullDescription}
                  </p>

                  {/* Key Treatments / Procedural Highlights Grid */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      <span>Advanced Surgical Procedures & Clinical Highlights</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentSpecialty.keyTreatments.map((proc, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-orange-50/50 border border-orange-100/90 text-xs text-slate-800 font-semibold">
                          <Check className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{proc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Tech & Laser Suite Bar */}
                {currentSpecialty.equipment && currentSpecialty.equipment.length > 0 && (
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 sm:p-5 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-white rounded-xl p-1.5 flex items-center justify-center flex-shrink-0 shadow-md">
                        <img 
                          src="/assets/images/SCHWIND-AMARIS.png" 
                          alt="German Technology" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>{currentSpecialty.equipment[0]?.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-300 leading-tight">
                          {currentSpecialty.equipment[0]?.description}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/services/${currentSpecialty.id}`)}
                      className="text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2.5 rounded-xl shadow-md whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 transition-all hover:scale-105"
                    >
                      <span>Specialty Details & FAQs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
