import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, ArrowRight, Clock, MapPin, Eye } from 'lucide-react';
import { PRESS_DATA } from '../../data/newsPressData';
import { EVENTS_DATA } from '../../data/eventsData';

interface LatestUpdatesSectionProps {
  navigate: (route: string) => void;
}

export const LatestUpdatesSection: React.FC<LatestUpdatesSectionProps> = ({ navigate }) => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="badge-sankara text-xs mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Institutional Pulse</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              News, Free Camps & <span className="orange-gradient-text">Community Events</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/news')}
              className="text-xs font-bold text-slate-700 hover:text-orange-600 underline"
            >
              All Press Releases
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => navigate('/events')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
            >
              All Eye Camps
            </button>
          </div>
        </motion.div>

        {/* 2-Column Split: News Releases & Upcoming Free Camps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Press News (7 cols) with Scroll Animation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-orange-600" />
                <span>Media Coverage & Announcements</span>
              </h3>
              <button onClick={() => navigate('/news')} className="text-xs font-semibold text-orange-600 hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {PRESS_DATA.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/news')}
                  className="p-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:bg-orange-50/40 hover:border-orange-300 transition-all cursor-pointer flex gap-4 items-center group shadow-xs"
                >
                  {item.image && (
                    <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-semibold text-orange-600">{item.source}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Free Rural Camps & Events (5 cols) with Scroll Animation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span>Upcoming Free Rural Eye Camps</span>
              </h3>
              <button onClick={() => navigate('/events')} className="text-xs font-semibold text-orange-600 hover:underline">
                View Schedule →
              </button>
            </div>

            <div className="space-y-3">
              {EVENTS_DATA.slice(0, 3).map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl border-2 border-orange-100 bg-orange-50/30 space-y-2 hover:bg-orange-50/70 hover:border-orange-300 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="badge-sankara text-[10px]">{evt.category}</span>
                    <span className="text-xs font-bold text-orange-700">{evt.date}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{evt.title}</h4>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-orange-600 flex-shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
