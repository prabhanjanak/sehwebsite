import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Phone, Calendar, ArrowRight, Eye, CheckCircle2, Sparkles, Layers, ShieldCheck, Clock, Heart, Navigation, Award } from 'lucide-react';
import { STATES_DATABASE, StateInfo } from '../../data/statesData';
import { useDatabase } from '../../context/DatabaseContext';
import rawStatePaths from '../../data/indiaStatePaths.json';

const STATE_PATHS: Record<string, string> = rawStatePaths as Record<string, string>;

// State names map for all Indian states/UTs
const ALL_STATE_NAMES: Record<string, string> = {
  INTN: 'Tamil Nadu',
  INKA: 'Karnataka',
  INAP: 'Andhra Pradesh',
  INOR: 'Odisha',
  INOD: 'Odisha',
  INBR: 'Bihar (Patna)',
  INUP: 'Uttar Pradesh',
  INPB: 'Punjab',
  INRJ: 'Rajasthan',
  INGJ: 'Gujarat',
  INMP: 'Madhya Pradesh',
  INMH: 'Maharashtra',
  INTG: 'Telangana',
  INKL: 'Kerala',
  INWB: 'West Bengal',
  INCT: 'Chhattisgarh',
  INJH: 'Jharkhand',
  INAS: 'Assam',
  INUT: 'Uttarakhand',
  INHP: 'Himachal Pradesh',
  INHR: 'Haryana',
  INJK: 'Jammu and Kashmir',
  INLA: 'Ladakh',
  INGA: 'Goa',
  INDL: 'Delhi',
  INSK: 'Sikkim',
  INTR: 'Tripura',
  INMN: 'Manipur',
  INML: 'Meghalaya',
  INMZ: 'Mizoram',
  INNL: 'Nagaland',
  INAR: 'Arunachal Pradesh',
  INCH: 'Chandigarh',
  INPY: 'Puducherry',
  INAN: 'Andaman & Nicobar',
  INLD: 'Lakshadweep',
  INDH: 'Dadra and Nagar Haveli'
};

interface InteractiveIndiaMapProps {
  navigate: (route: string) => void;
}

export const InteractiveIndiaMap: React.FC<InteractiveIndiaMapProps> = ({ navigate }) => {
  const { openAppointmentModal } = useDatabase();
  const [selectedCode, setSelectedCode] = useState<string>('INTN');
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  // Normalize state codes (e.g. INOD -> INOR)
  const resolveCode = (c: string) => (c === 'INOD' ? 'INOR' : c);
  const activeCode = resolveCode(hoveredCode || selectedCode);

  const activeState: StateInfo = STATES_DATABASE[activeCode] || STATES_DATABASE['INTN'];

  const handleStateHover = (code: string) => {
    const normalized = resolveCode(code);
    const stateData = STATES_DATABASE[normalized];
    // ONLY trigger hover for states with Sankara Presence or Upcoming Unit
    if (stateData && (stateData.status === 'operational' || stateData.status === 'upcoming')) {
      setHoveredCode(normalized);
    }
  };

  const handleStateLeave = () => {
    setHoveredCode(null);
  };

  const handleStateClick = (code: string) => {
    const normalized = resolveCode(code);
    const stateData = STATES_DATABASE[normalized];
    // ONLY allow click for states with Sankara Presence or Upcoming Unit
    if (stateData && (stateData.status === 'operational' || stateData.status === 'upcoming')) {
      setSelectedCode(normalized);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-orange-50/30 to-white rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-orange-200 shadow-2xl space-y-8 max-w-7xl mx-auto">
      
      {/* State Quick-Selection Filter Pills (Only Active Sankara States) */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex flex-wrap items-center justify-between gap-2">
          <span>Select Any Sankara Hospital State Below or On Map:</span>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-orange-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-600 inline-block animate-pulse" />
              14 Super-Specialty Hospitals Across India
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ✨ Patna (Bihar) Coming Soon
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {Object.values(STATES_DATABASE)
            .filter((st) => st.status === 'operational' || st.status === 'upcoming')
            .map((st) => {
              const isSelected = activeCode === st.code;
              const isUpcoming = st.status === 'upcoming';
              
              return (
                <button
                  key={st.code}
                  onClick={() => handleStateClick(st.code)}
                  onMouseEnter={() => handleStateHover(st.code)}
                  onMouseLeave={handleStateLeave}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-lg scale-105 ring-2 ring-orange-400 ring-offset-1'
                      : isUpcoming
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-orange-900 border border-orange-300 hover:bg-orange-100'
                      : 'bg-white text-slate-700 hover:bg-orange-50 border border-orange-200'
                  }`}
                >
                  <span 
                    className={`w-2 h-2 rounded-full ${
                      isSelected 
                        ? 'bg-white' 
                        : isUpcoming 
                        ? 'bg-amber-500 animate-ping' 
                        : 'bg-orange-500'
                    }`} 
                  />
                  <span>{st.name}</span>
                  {isUpcoming ? (
                    <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded-md font-extrabold">NEW</span>
                  ) : st.hospitalCount > 0 ? (
                    <span className="text-[10px] opacity-80 font-semibold">({st.hospitalCount})</span>
                  ) : null}
                </button>
              );
            })}
        </div>
      </div>

      {/* 2-Column Responsive Layout: Native SVG Map (7 Cols) + Live Detail Card (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: 100% Watermark-Free Native Vector Map of India (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-50/50 via-white to-orange-50/20 rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-inner">
          
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-orange-200 shadow-xs flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-orange-600" />
              <span>Hover over Sankara hospital states (colored in orange) to reveal districts</span>
            </span>
          </div>

          <div className="relative w-full max-w-[500px] aspect-[1/1.1]">
            <svg
              viewBox="-50 0 950 1000"
              className="w-full h-full filter drop-shadow-md select-none"
            >
              <defs>
                <linearGradient id="sankaraActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#c2410c" />
                </linearGradient>
                <linearGradient id="sankaraOperationalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#fdba74" />
                </linearGradient>
                <linearGradient id="sankaraUpcomingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#fde047" />
                </linearGradient>
                <linearGradient id="sankaraInactiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ea580c" floodOpacity="0.4"/>
                </filter>
              </defs>

              {/* State SVG Polygons */}
              {Object.entries(STATE_PATHS).map(([code, d]) => {
                const normalizedCode = resolveCode(code);
                const isSelected = activeCode === normalizedCode;
                const stateData = STATES_DATABASE[normalizedCode];
                const isOperational = stateData?.status === 'operational';
                const isUpcoming = stateData?.status === 'upcoming';
                const isInteractive = isOperational || isUpcoming;

                let fill = 'url(#sankaraInactiveGrad)';
                let stroke = '#cbd5e1';
                let strokeWidth = '1';

                if (isSelected) {
                  fill = 'url(#sankaraActiveGrad)';
                  stroke = '#ffffff';
                  strokeWidth = '2.5';
                } else if (isUpcoming) {
                  fill = 'url(#sankaraUpcomingGrad)';
                  stroke = '#ca8a04';
                  strokeWidth = '1.8';
                } else if (isOperational) {
                  fill = 'url(#sankaraOperationalGrad)';
                  stroke = '#ea580c';
                  strokeWidth = '1.5';
                }

                return (
                  <motion.path
                    key={code}
                    d={d}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    filter={isSelected ? 'url(#glow)' : undefined}
                    className={`transition-colors duration-200 ${isInteractive ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
                    whileHover={isInteractive ? { scale: 1.015 } : undefined}
                    onClick={isInteractive ? () => handleStateClick(normalizedCode) : undefined}
                    onMouseEnter={isInteractive ? () => handleStateHover(normalizedCode) : undefined}
                    onMouseLeave={isInteractive ? handleStateLeave : undefined}
                  />
                );
              })}

              {/* District Pinpoint Markers when State is Active */}
              {activeState?.districtPins && activeState.districtPins.map((dp, idx) => (
                <g 
                  key={'district-pin-' + idx}
                  transform={`translate(${dp.x}, ${dp.y})`}
                  className="pointer-events-none"
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="8"
                    fill="#ea580c"
                    opacity="0.4"
                    className="animate-ping"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="5"
                    fill="#ffffff"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                  />
                  <text
                    x="8"
                    y="4"
                    fill="#0f172a"
                    fontSize="11"
                    fontWeight="800"
                    className="drop-shadow-sm font-sans"
                  >
                    {dp.district}
                  </text>
                </g>
              ))}

              {/* Overview State Centroid Markers (when not zoomed into districts) */}
              {Object.values(STATES_DATABASE)
                .filter((st) => st.status === 'operational' || st.status === 'upcoming')
                .map((st) => {
                  if (!st.pinCoordinates) return null;
                  const isSelected = activeCode === st.code;
                  const isUpcoming = st.status === 'upcoming';

                  if (isSelected && st.districtPins && st.districtPins.length > 0) return null;

                  return (
                    <g 
                      key={st.code + '-pin'}
                      className="pointer-events-none transition-all duration-300"
                      transform={`translate(${st.pinCoordinates.x}, ${st.pinCoordinates.y})`}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={isUpcoming ? '10' : '7'}
                        fill={isUpcoming ? '#eab308' : '#ea580c'}
                        opacity="0.4"
                        className="animate-ping"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r={isUpcoming ? '6' : '5'}
                        fill={isUpcoming ? '#ca8a04' : '#ea580c'}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-orange-600 shadow-xs" />
              <span>Active State Selection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-orange-300 border border-orange-500 shadow-xs" />
              <span>Operational Hospital State (Sankara Units)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-300 border border-yellow-600 shadow-xs animate-pulse" />
              <span>✨ Coming Soon: Patna (Bihar)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-100 border border-slate-300" />
              <span>Other Indian States</span>
            </div>
          </div>
        </div>

        {/* Right: Dynamic State & District Details Panel (5 Cols) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState.code}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-200 shadow-xl space-y-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-orange-100 pb-5">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border mb-1.5 ${
                    activeState.status === 'upcoming'
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-orange-50 text-orange-700 border-orange-200'
                  }`}>
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>{activeState.statusBadge}</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900">{activeState.name}</h4>
                </div>

                <span className={`font-black px-3.5 py-1 rounded-xl text-xs shadow-md ${
                  activeState.status === 'upcoming'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-orange-600 text-white'
                }`}>
                  {activeState.status === 'upcoming' 
                    ? 'Coming Soon'
                    : `${activeState.hospitalCount} ${activeState.hospitalCount === 1 ? 'Hospital' : 'Hospitals'}`
                  }
                </span>
              </div>

              {/* State Narrative */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {activeState.description}
              </p>

              {/* Districts Covered Badges */}
              {activeState.districtsCovered && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Districts Where Units are Situated:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeState.districtsCovered.map((dist, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-orange-100/80 text-orange-900 font-bold text-xs border border-orange-200 flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3 text-orange-600" />
                        {dist}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Metrics (Standards & Care Model, Bed count removed) */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 bg-orange-50/80 rounded-2xl border border-orange-200">
                  <div className="text-base font-black text-orange-600 font-display flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>{activeState.accreditationBadge}</span>
                  </div>
                  <div className="text-slate-600 font-semibold text-[11px] mt-0.5">Clinical Standards</div>
                </div>

                <div className="p-3.5 bg-orange-50/80 rounded-2xl border border-orange-200">
                  <div className="text-base font-black text-slate-900 font-display flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-orange-600" />
                    <span>{activeState.freeSurgeriesShare}</span>
                  </div>
                  <div className="text-slate-600 font-semibold text-[11px] mt-0.5">80:20 Cross-Subsidy</div>
                </div>
              </div>

              {/* Detailed Unit Cards with District & Address (No bed count) */}
              <div className="space-y-2 pt-1 max-h-56 overflow-y-auto pr-1">
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  {activeState.status === 'upcoming' ? 'Upcoming Super-Specialty Unit' : 'Hospital Units & Addresses'}
                </div>
                
                {activeState.units && activeState.units.length > 0 ? (
                  activeState.units.map((unit, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                        unit.isUpcoming
                          ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {unit.isUpcoming ? (
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                          )}
                          <span>{unit.unitName}</span>
                        </div>
                        <span className="bg-orange-600/10 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0">
                          {unit.status}
                        </span>
                      </div>
                      
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span>{unit.address}</span>
                      </div>

                      {unit.specialties && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {unit.specialties.map((spec, sIdx) => (
                            <span key={sIdx} className="text-[9px] bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : null}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                {activeState.status === 'upcoming' ? (
                  <button
                    onClick={() => navigate('/donate')}
                    className="btn-primary flex-1 !py-3 text-xs font-bold shadow-md flex items-center justify-center gap-1.5 group bg-gradient-to-r from-orange-600 to-amber-600"
                  >
                    <Heart className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Support Patna Hospital Project</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openAppointmentModal(activeState.units?.[0]?.district.split(' ')[0] || activeState.hospitals[0]?.split(' ')[0])}
                    className="btn-primary flex-1 !py-3 text-xs font-bold shadow-md flex items-center justify-center gap-1.5 group"
                  >
                    <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Book OPD in {activeState.name}</span>
                  </button>
                )}

                <button
                  onClick={() => navigate('/hospitals')}
                  className="btn-outline-orange !py-3 !px-5 text-xs font-bold flex items-center justify-center gap-1"
                >
                  <span>All Sankara Units →</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Impact Metrics Bar (Cleaned, No bed count) */}
      <div className="bg-orange-50/80 border border-orange-200 text-slate-900 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-8">
          <div>
            <span className="text-orange-600 font-black text-2xl font-display">14</span>
            <span className="text-slate-700 text-xs font-semibold ml-2">Tertiary Hospitals</span>
          </div>
          <div>
            <span className="text-slate-900 font-black text-2xl font-display">9</span>
            <span className="text-slate-700 text-xs font-semibold ml-2">States Covered</span>
          </div>
          <div>
            <span className="text-emerald-700 font-black text-2xl font-display">+1</span>
            <span className="text-slate-700 text-xs font-semibold ml-2">Patna Unit (Coming Soon)</span>
          </div>
          <div>
            <span className="text-orange-600 font-black text-2xl font-display">2.6M+</span>
            <span className="text-slate-700 text-xs font-semibold ml-2">Surgeries Performed</span>
          </div>
        </div>
        <button
          onClick={() => navigate('/hospitals')}
          className="btn-primary !py-2.5 !px-6 text-xs font-bold shadow-md"
        >
          Browse All Hospital Units →
        </button>
      </div>
    </div>
  );
};
