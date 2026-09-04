import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Bed, 
  Clock, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Search 
} from 'lucide-react';
import { HOSPITALS_DATA } from '../../data/hospitalsData';
import { useDatabase } from '../../context/DatabaseContext';

interface HospitalNetworkSectionProps {
  navigate: (route: string) => void;
}

export const HospitalNetworkSection: React.FC<HospitalNetworkSectionProps> = ({ navigate }) => {
  const { openAppointmentModal, hospitalsList } = useDatabase();
  const [selectedState, setSelectedState] = useState<string>('All');

  const states = ['All', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Punjab', 'Rajasthan', 'Madhya Pradesh', 'Gujarat', 'Andhra Pradesh', 'Maharashtra'];

  const activeHospitals = (hospitalsList && hospitalsList.length > 0) ? hospitalsList : HOSPITALS_DATA;

  const filteredHospitals = selectedState === 'All' 
    ? activeHospitals 
    : activeHospitals.filter((h) => h.state === selectedState);

  return (
    <section className="py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
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
              <Building2 className="w-3.5 h-3.5" />
              <span>Our Network</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Our Network — <span className="orange-gradient-text">14 Super-Specialty Hospitals</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Delivering standardized, 100% NABH-certified tertiary ophthalmic care with dedicated Chief Medical Officers across 9 states.
            </p>
          </div>

          <button
            onClick={() => navigate('/hospitals')}
            className="btn-outline-orange !px-5 !py-2.5 text-xs font-bold self-start md:self-auto"
          >
            <span>View All Hospital Coordinates →</span>
          </button>
        </motion.div>

        {/* State Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedState === st
                  ? 'bg-orange-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Hospitals Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredHospitals.slice(0, 6).map((hosp, idx) => (
              <motion.div
                key={hosp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Genuine Hospital Photo Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <img
                      src={hosp.image || '/assets/images/Sankara-Bangalore-sq.jpg'}
                      alt={hosp.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/Sankara-Bangalore-sq.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-900 shadow-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-600" />
                      <span>{hosp.city}, {hosp.state}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-orange-600 text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md">
                      Tertiary Hub
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-base font-bold leading-tight">{hosp.name}</h3>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {hosp.address}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <Phone className="w-3.5 h-3.5 text-orange-600" />
                        <a href={`tel:${hosp.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">{hosp.phone}</a>
                      </div>
                      <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        100% NABH
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigate(`/hospitals/${hosp.id}`)}
                    className="text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center gap-1 group/btn"
                  >
                    <span>Unit Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    onClick={() => openAppointmentModal(hosp.city)}
                    className="btn-primary !py-1.5 !px-4 text-xs font-bold"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book OPD</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
