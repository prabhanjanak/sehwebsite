import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Phone, CheckCircle2, ShieldCheck, Search, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

interface EventsPageProps {
  navigate: (route: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ navigate }) => {
  const { eventsList } = useDatabase();
  const [filterCamp, setFilterCamp] = useState<'All' | 'Free Camp' | 'Conference'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = eventsList.filter((ev) => {
    if (filterCamp === 'Free Camp' && !ev.isFreeCamp) return false;
    if (filterCamp === 'Conference' && ev.isFreeCamp) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q) ||
        ev.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Sankara Events & Academic Conferences</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Conferences, Symposia & Rural Eye Camps
              </h1>
              <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
                Explore upcoming ophthalmic symposia, surgical workshops, and free district screening camps.
              </p>
            </div>

            {/* Direct Link to events.sankaraeye.in */}
            <a
              href="https://events.sankaraeye.in"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-orange-700 hover:bg-orange-50 px-6 py-3 rounded-full text-xs font-black shadow-xl flex items-center justify-center gap-2 whitespace-nowrap self-start md:self-auto transition-all group"
            >
              <span>Visit events.sankaraeye.in</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setFilterCamp('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterCamp === 'All' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              All Events ({eventsList.length})
            </button>
            <button
              onClick={() => setFilterCamp('Conference')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterCamp === 'Conference' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              Academic Conferences & CMEs
            </button>
            <button
              onClick={() => setFilterCamp('Free Camp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterCamp === 'Free Camp' ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              Free Rural Eye Camps
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by city or event title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/90 shadow-sm hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-3 py-1 rounded-full">
                    {ev.category}
                  </span>
                  {ev.isFreeCamp ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full">
                      100% Free Camp
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Academic CME
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {ev.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {ev.description}
                </p>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={ev.registrationUrl || 'https://events.sankaraeye.in'}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary flex-1 !py-2.5 text-xs font-bold shadow-md flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>Register & Details</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
                </a>

                {ev.contactNumber && (
                  <a
                    href={`tel:${ev.contactNumber.replace(/[^0-9]/g, '')}`}
                    className="p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 transition-colors"
                    title={`Call ${ev.contactNumber}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
