import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, Heart, ArrowUp } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const FloatingQuickAction: React.FC = () => {
  const { openAppointmentModal, openDonationModal } = useDatabase();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate distance from bottom of the page (footer area)
      const distanceFromBottom = documentHeight - (scrollY + windowHeight);
      
      // Show when scrolled down past 350px, but vanish and blur out when near the footer (within 450px from bottom)
      const isPastHero = scrollY > 350;
      const isNearFooter = distanceFromBottom < 480;

      if (isPastHero && !isNearFooter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Also observe footer entry if available for pixel-perfect intersection
    const footerElement = document.querySelector('footer');
    let observer: IntersectionObserver | null = null;
    
    if (footerElement) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(false);
            } else {
              handleScroll();
            }
          });
        },
        { rootMargin: '0px 0px -50px 0px', threshold: 0.05 }
      );
      observer.observe(footerElement);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9, x: '-50%', filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%', filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 25, scale: 0.88, x: '-50%', filter: 'blur(12px)' }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white max-w-[90vw] whitespace-nowrap"
        >
          {/* Quick Book Consultation CTA */}
          <button
            onClick={() => openAppointmentModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
          </button>

          {/* Quick Sponsor / Donate CTA */}
          <button
            onClick={() => openDonationModal(1)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-orange-300 px-3.5 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
            <span>Donate</span>
          </button>

          {/* Emergency Direct Call */}
          <a
            href="tel:08069038900"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
            title="Call Emergency Hotline: 080-69038900"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          </a>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
