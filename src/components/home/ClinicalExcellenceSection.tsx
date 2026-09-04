import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  Award, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Eye, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { TiltCard } from '../common/TiltCard';

interface ClinicalExcellenceSectionProps {
  navigate: (route: string) => void;
}

const CLINICAL_PILLARS = [
  {
    icon: Sparkles,
    badge: 'Precision Tech',
    title: 'Blade-Free German Laser & SMILE Pro',
    description: 'Equipped with the 7D German Schwind Amaris Laser and Zeiss SMILE Pro platforms for 10-second, stitchless vision correction with rapid 24-hour visual recovery.',
    highlights: ['10-Second Laser Delivery', '0% Pain / Blade-Free', 'Rapid 24-Hour Recovery']
  },
  {
    icon: Eye,
    badge: 'Robotic FLACS',
    title: 'Advanced Robotic Cataract Surgery',
    description: 'State-of-the-art Femtosecond Laser-Assisted Cataract Surgery (FLACS) with premium trifocal, multifocal, and toric intraocular lenses for glasses-free vision.',
    highlights: ['Micro-Incision (2.2mm)', 'Same-Day Daycare Discharge', 'Custom Premium IOLs']
  },
  {
    icon: CreditCard,
    badge: 'Hassle-Free',
    title: 'Cashless Insurance with 50+ Top TPAs',
    description: 'Dedicated on-campus insurance facilitation desks offering instant cashless hospitalization approvals with Star Health, HDFC ERGO, ICICI Lombard, and all major TPAs.',
    highlights: ['50+ Insurers & TPAs Empanelled', '0% EMI Payment Options', 'Direct Cashless Helpdesk']
  },
  {
    icon: ShieldCheck,
    badge: '100% Certified',
    title: 'NABH Tertiary Infection-Control Standards',
    description: 'Every operating theatre features modular laminar airflow and HEPA filtration with zero-compromise clinical governance, ensuring the highest safety benchmarks.',
    highlights: ['NABH Accredited Facilities', 'Laminar Airflow Modular OTs', 'Senior Fellowship Surgeons']
  }
];

export const ClinicalExcellenceSection: React.FC<ClinicalExcellenceSectionProps> = ({ navigate }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-50/20 to-white relative overflow-hidden">
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
            <Award className="w-3.5 h-3.5" />
            <span>Why Patients Trust Sankara Eye Hospital</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            World-Class Technology & <span className="orange-gradient-text">Clinical Precision</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From routine vision exams to complex vitreo-retinal and corneal micro-surgeries, experience comprehensive ophthalmic healthcare delivered by fellowship-trained senior specialists.
          </p>
        </motion.div>

        {/* 4 Clinical Pillars Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINICAL_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="bg-white rounded-3xl p-6 border-2 border-orange-100 shadow-md hover:border-orange-400 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group h-full space-y-5 text-left">
                    <div className="space-y-4">
                      {/* Icon & Badge Header */}
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                          {pillar.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors leading-snug">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Highlights Checkmarks */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {pillar.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/services')}
                      className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-orange-600 font-bold group-hover:text-orange-700 transition-colors"
                    >
                      <span>Explore Specialty</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Cashless Insurance & Corporate Empanelment Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 text-left"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Cashless Mediclaim & Corporate Empanelments</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Instant Cashless Hospitalization with 50+ Top Insurers & TPAs
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Star Health, HDFC ERGO, ICICI Lombard, Care Health, MediAssist, Vidal, Paramount, MD India, Raksha, and CGHS/ECHS approved across all 14 tertiary units.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full lg:w-auto">
            <button
              onClick={() => navigate('/services')}
              className="btn-primary !px-6 !py-3.5 text-xs font-bold whitespace-nowrap shadow-glow"
            >
              <span>View Treatment Packages →</span>
            </button>
          </div>
        </motion.div>

        {/* Refined Dignified Teaser to Social Impact Page */}
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-3xl p-6 sm:p-8 border border-orange-200/90 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h4 className="font-black text-base text-slate-900">Institutional Heritage & Social Commitment</h4>
              <p className="text-xs text-slate-600 mt-0.5 font-normal">
                Committed to ethical clinical stewardship, community outreach, and the self-sustaining Unique Hybrid Model healthcare philosophy.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/social-impact')}
            className="btn-secondary !px-5 !py-2.5 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shadow-xs flex-shrink-0"
          >
            <span>Explore Social Impact & CSR</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
