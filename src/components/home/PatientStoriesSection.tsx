import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Heart, CheckCircle2, UserCheck, ShieldCheck, MapPin } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/testimonialsData';
import { useDatabase } from '../../context/DatabaseContext';

interface PatientStoriesSectionProps {
  navigate: (route: string) => void;
}

export const PatientStoriesSection: React.FC<PatientStoriesSectionProps> = ({ navigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  const getInitials = (name: string) => {
    return name
      .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Master)\s+/i, '')
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12"
        >
          <span className="badge-sankara text-xs">
            <Heart className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>Human Voices of Recovery</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Transformed Lives, <span className="orange-gradient-text">Renewed Sight</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Real experiences and clinical outcomes from patients treated across Sankara Eye Hospitals nationwide.
          </p>
        </motion.div>

        {/* Testimonial Showcase Card (No Patient Photos) */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-orange-100 shadow-2xl relative overflow-hidden">
            <Quote className="w-28 h-28 text-orange-100/60 absolute -top-4 -right-4 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div 
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6 relative z-10"
              >
                {/* Card Top: Badges & Treatment */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                      {current.treatment}
                    </span>
                  </div>

                  <span className="badge-sankara text-xs font-bold">
                    Treated at {current.hospital}
                  </span>
                </div>

                {/* Main Quote & Narrative Story */}
                <div className="space-y-3">
                  <blockquote className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed italic">
                    "{current.quote}"
                  </blockquote>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {current.story}
                  </p>
                </div>

                {/* Patient Information & Clinical Details (No Image - Initials & Badges) */}
                <div className="bg-orange-50/60 p-4 sm:p-5 rounded-2xl border border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-black text-sm shadow-md flex-shrink-0">
                      {getInitials(current.patientName)}
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{current.patientName}</span>
                        {current.age && <span className="text-xs text-slate-500 font-normal">({current.age} yrs)</span>}
                        <UserCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{current.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right space-y-0.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-orange-200/50">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Diagnosis</div>
                    <div className="text-xs font-bold text-orange-700">{current.condition}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <span>Story {currentIndex + 1} of {TESTIMONIALS_DATA.length}</span>
                <button
                  onClick={() => navigate('/testimonials')}
                  className="text-orange-600 hover:underline font-bold ml-2"
                >
                  View All Testimonials →
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevStory}
                  className="p-2.5 rounded-full border border-slate-200 hover:border-orange-500 hover:bg-orange-50 text-slate-700 transition-colors"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextStory}
                  className="p-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-colors"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
