import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Phone, 
  Clock, 
  Calendar, 
  Building2, 
  Users, 
  Award, 
  HeartHandshake, 
  Eye, 
  CheckCircle2,
  Sparkles,
  MapPin
} from 'lucide-react';
import { HOSPITAL_SERVICES_DATA, HospitalUnitServiceInfo } from '../../data/hospitalServicesData';
import { useDatabase } from '../../context/DatabaseContext';

export const HospitalServicesAndInformation: React.FC = () => {
  const { openAppointmentModal } = useDatabase();
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(HOSPITAL_SERVICES_DATA[0].id);

  const selectedUnit: HospitalUnitServiceInfo = 
    HOSPITAL_SERVICES_DATA.find((h) => h.id === selectedHospitalId) || HOSPITAL_SERVICES_DATA[0];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Section Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-800 tracking-[0.2em] uppercase">
            SERVICES AND INFORMATION
          </h2>

          {/* Hospital Choose Dropdown Selector Matching Official Design */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className="text-base sm:text-lg text-slate-600 font-normal">
              Choose Hospital
            </span>

            <div className="relative inline-block">
              <select
                value={selectedHospitalId}
                onChange={(e) => setSelectedHospitalId(e.target.value)}
                className="appearance-none bg-transparent border-b-2 border-slate-400 focus:border-orange-600 pl-3 pr-8 py-1.5 text-base sm:text-xl font-bold uppercase tracking-widest text-slate-900 focus:outline-none cursor-pointer"
                aria-label="Choose Hospital"
              >
                {HOSPITAL_SERVICES_DATA.map((hosp) => (
                  <option key={hosp.id} value={hosp.id} className="text-sm font-semibold tracking-normal text-slate-800 py-1">
                    {hosp.name.toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-slate-500 absolute right-1 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Sub-Header: CLINICAL SERVICES */}
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-medium text-slate-700 tracking-[0.25em] uppercase border-b border-slate-200 pb-4 max-w-md mx-auto">
            CLINICAL SERVICES
          </h3>
        </div>

        {/* 4-Column Dynamic Hospital Unit Information Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedUnit.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-left"
          >
            
            {/* COLUMN 1: 👁️ OUTPATIENT & EMERGENCY */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <span className="text-orange-500 font-black text-lg">👁️</span>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900">
                  OUTPATIENT
                </h4>
              </div>

              {/* Working Hours */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Working hours</span>
                </div>
                <div className="whitespace-pre-line leading-relaxed pl-5 font-medium text-slate-700">
                  {selectedUnit.workingHours}
                </div>
              </div>

              {/* Emergency Contact */}
              {selectedUnit.emergencyContact && (
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    <span>Emergency Contact</span>
                  </div>
                  <div className="pl-5 space-y-1">
                    {selectedUnit.emergencyContact.split('\n').map((line, lIdx) => (
                      <a
                        key={lIdx}
                        href={`tel:${line.replace(/[^0-9]/g, '')}`}
                        className="block font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                      >
                        {line}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Unit Booking Action */}
              <div className="pt-3">
                <button
                  onClick={() => openAppointmentModal(selectedUnit.name.split(' ')[0])}
                  className="btn-primary w-full !py-2.5 text-xs font-bold shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book at {selectedUnit.name.split(' ')[0]} →</span>
                </button>
              </div>
            </div>

            {/* COLUMN 2: 👁️ SPECIALITY SERVICES */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <span className="text-orange-500 font-black text-lg">👁️</span>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900">
                  SPECIALITY SERVICES
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {selectedUnit.specialities.map((spec, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: 👁️ OUR TEAM OF DOCTORS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <span className="text-orange-500 font-black text-lg">👁️</span>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900">
                  OUR TEAM OF DOCTORS
                </h4>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 max-h-[420px] overflow-y-auto pr-1">
                {selectedUnit.doctors.length > 0 ? (
                  selectedUnit.doctors.map((doc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 leading-relaxed pb-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-400 font-bold">•</span>
                      <span className="font-medium text-slate-800">{doc}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 text-xs italic">
                    Fellowship-trained senior ophthalmic consultants on duty.
                  </li>
                )}
              </ul>
            </div>

            {/* COLUMN 4: 👁️ OUR PARTNERS IN SERVICE */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
                <span className="text-orange-500 font-black text-lg">👁️</span>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900">
                  OUR PARTNERS IN SERVICE
                </h4>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                {selectedUnit.partners.length > 0 ? (
                  selectedUnit.partners.map((partner, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-slate-400 font-bold">•</span>
                      <span className="font-medium text-slate-800">{partner}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 text-xs italic">
                    Supported by community patrons, industrial CSR partners, and Sri Kanchi Kamakoti Medical Trust.
                  </li>
                )}
              </ul>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
