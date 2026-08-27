import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  ArrowRight,
  Award
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const AnnouncementPromoModal: React.FC = () => {
  const { promoPopup } = useDatabase();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (promoPopup.isEnabled) {
      const isDismissed = sessionStorage.getItem(`sankara_dismissed_${promoPopup.id}`);
      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [promoPopup.isEnabled, promoPopup.id]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(`sankara_dismissed_${promoPopup.id}`, 'true');
  };

  const handleCtaClick = () => {
    if (promoPopup.ctaLink?.startsWith('http')) {
      window.open(promoPopup.ctaLink, '_blank', 'noopener,noreferrer');
    } else if (promoPopup.ctaLink) {
      window.location.hash = promoPopup.ctaLink;
    }
    handleClose();
  };

  if (!promoPopup.isEnabled || !isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Soft Dim Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Box - 100% Clean White Card Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 360 }}
          className="relative bg-white rounded-3xl max-w-[420px] w-full overflow-hidden shadow-2xl border border-slate-200 z-10 my-auto text-center p-6 sm:p-7 space-y-4"
        >
          {/* Close Button Top Right */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors shadow-xs"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Emblem / Logo - Pure White Background */}
          {promoPopup.imageUrl && (
            <div className="flex flex-col items-center justify-center pt-1">
              <div className="w-24 h-24 rounded-full bg-orange-50/80 border-2 border-orange-200/80 p-2 shadow-sm flex items-center justify-center">
                <img
                  src={promoPopup.imageUrl}
                  alt={promoPopup.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Badge Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-extrabold mx-auto">
            <Sparkles className="w-3 h-3 text-orange-600" />
            <span>{promoPopup.badge || 'National Conference'}</span>
          </div>

          {/* Title & Concise Description */}
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-black text-slate-900 leading-snug tracking-tight">
              {promoPopup.title}
            </h3>
            {promoPopup.description && (
              <p className="text-xs text-slate-600 leading-relaxed font-normal max-w-sm mx-auto">
                {promoPopup.description}
              </p>
            )}
          </div>

          {/* Event Coordinates Badges (If Available) */}
          {(promoPopup.eventDate || promoPopup.eventVenue) && (
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs pt-1">
              {promoPopup.eventDate && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-900 font-bold border border-orange-100 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-orange-600" />
                  <span>{promoPopup.eventDate}</span>
                </div>
              )}
              {promoPopup.eventVenue && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 font-medium border border-slate-200 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{promoPopup.eventVenue}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleCtaClick}
              className="btn-primary w-full !py-3 text-xs font-black shadow-md flex items-center justify-center gap-2 group"
            >
              <span>{promoPopup.ctaText || 'Explore & Register Now'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 pt-1">
              <a
                href="https://events.sankaraeye.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-600 font-medium flex items-center gap-1 text-slate-500"
              >
                <ExternalLink className="w-3 h-3 text-orange-500" />
                <span>events.sankaraeye.in</span>
              </a>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-700 font-medium"
              >
                Dismiss Window
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
