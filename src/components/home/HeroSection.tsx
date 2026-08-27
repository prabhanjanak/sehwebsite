import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Heart, 
  Eye, 
  Award, 
  Users, 
  Sparkles, 
  ArrowRight,
  Activity,
  CheckCircle2,
  Clock,
  CreditCard,
  Zap,
  Building2
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { HOSPITALS_DATA } from '../../data/hospitalsData';
import { SPECIALTIES_DATA } from '../../data/specialtiesData';
import { ParticlesBackground } from './ParticlesBackground';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { TiltCard } from '../common/TiltCard';
import { HeroEyeGraphic } from './HeroEyeGraphic';

interface HeroSectionProps {
  navigate: (route: string) => void;
}

// Framer Motion Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ navigate }) => {

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-12 lg:pb-20 w-full">
      {/* Interactive particles.js Constellation Network & Cursor Hover */}
      <ParticlesBackground />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10"
      >
        {/* Top Trust Eyebrow Pill */}
        <motion.div variants={itemVariants} className="flex justify-center sm:justify-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-200 text-slate-800 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
            <span>India's Premier Super-Specialty Eye Hospital Network • 100% NABH Certified</span>
          </div>
        </motion.div>

        {/* 2-Column Hero Grid: Left Copy & Actions + Right 3D Animated Emblem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Clinical Excellence & Booking Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                From Patient Testimonies, to{' '}
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  World Class Eye Care
                </span>
              </h1>

              <div className="space-y-1.5 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                <p className="font-semibold text-slate-800">
                  Visioned towards building a sustainable eye care model across the country,
                </p>
                <p>
                  Sankara was started with the mission to work towards eradicating needless blindness.
                </p>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/services')}
                className="btn-primary shadow-glow !py-3.5 !px-6 text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 group"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore 12 Clinical Specialties</span>
              </button>

              <button
                onClick={() => navigate('/hospitals')}
                className="btn-secondary !py-3.5 !px-6 text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 group"
              >
                <Building2 className="w-4 h-4 text-orange-600" />
                <span>Find Nearest Sankara Unit</span>
              </button>
            </motion.div>

            {/* 4 Clinical Excellence Counter Badges */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <TiltCard className="h-full">
                <div className="p-3 bg-white rounded-2xl border border-orange-200 shadow-sm hover:border-orange-400 hover:shadow-md transition-all h-full">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>Blade-Free</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold mt-0.5">Laser & SMILE Pro</div>
                </div>
              </TiltCard>

              <TiltCard className="h-full">
                <div className="p-3 bg-white rounded-2xl border border-orange-200 shadow-sm hover:border-orange-400 hover:shadow-md transition-all h-full">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>100% NABH</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold mt-0.5">Tertiary Certified</div>
                </div>
              </TiltCard>

              <TiltCard className="h-full">
                <div className="p-3 bg-white rounded-2xl border border-orange-200 shadow-sm hover:border-orange-400 hover:shadow-md transition-all h-full">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>50+ TPAs</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold mt-0.5">Cashless Mediclaim</div>
                </div>
              </TiltCard>

              <TiltCard className="h-full">
                <div className="p-3 bg-white rounded-2xl border border-orange-200 shadow-sm hover:border-orange-400 hover:shadow-md transition-all h-full">
                  <div className="text-xl sm:text-2xl font-black text-orange-600 font-display flex items-center gap-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>Daycare</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-semibold mt-0.5">Same-Day Discharge</div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Bottom Reassuring Trust Row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Stitchless & Painless Micro-Incision
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                0% Interest EMI Plans Available
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                NABH Infection-Control Protocols
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3D Floating 50-Year Golden Jubilee Optical Medallion Graphic (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <HeroEyeGraphic />
          </div>

        </div>
      </motion.div>
    </section>
  );
};
