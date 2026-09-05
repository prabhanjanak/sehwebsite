import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Users, 
  Check,
  ChevronRight,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { HOSPITAL_SERVICES_DATA } from '../data/hospitalServicesData';
import { HospitalServicesAndInformation } from '../components/common/HospitalServicesAndInformation';
import { parseDoctor } from '../utils/doctorParser';
import { useDatabase } from '../context/DatabaseContext';

interface HospitalsPageProps {
  navigate: (route: string) => void;
}

export const HospitalsPage: React.FC<HospitalsPageProps> = ({ navigate }) => {
  const { openAppointmentModal, hospitalsList } = useDatabase();

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>14 Super-Specialty Hospitals Across 9 States</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Our Hospital Network Across India
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Strategically located across India to deliver world-class tertiary ophthalmic care, blade-free laser suites, and NABH-accredited surgical facilities with full-time fellowship-trained faculty.
          </p>
        </div>
      </div>

      {/* Interactive Unit Directory Selector (Same as Home Page) */}
      <div className="border-b border-slate-200">
        <HospitalServicesAndInformation />
      </div>

      {/* All 14 Hospital Units Full Network Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Network Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore All 14 Eye Care Campuses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Click on any hospital unit below to view its full clinical team, Chief Medical Officer profile, department sub-specialties, and priority appointment booking.
          </p>
        </div>

        {/* Hospital Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitalsList.map((hosp) => {
            // Match with authentic hospital services data
            const unitData = HOSPITAL_SERVICES_DATA.find((u) => {
              if (hosp.id === 'coimbatore-hq') return u.id === 'coimbatore-sathy-road';
              if (hosp.id === 'coimbatore-city') return u.id === 'coimbatore-rs-puram';
              return u.id === hosp.id;
            });

            const doctorCount = unitData?.doctors?.length || 0;
            const parsedDocs = (unitData?.doctors || []).map(parseDoctor);
            const leadDoctors = parsedDocs.slice(0, 2);

            return (
              <div
                key={hosp.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-hover hover:border-orange-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image Header with established badge */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={hosp.image}
                      alt={hosp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                      {hosp.nabhAccredited && (
                        <span className="badge-nabh text-[10px]">
                          <ShieldCheck className="w-3 h-3 inline mr-1" />
                          NABH
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      Est. {hosp.established}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                          {hosp.state}
                        </span>
                        <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                          {doctorCount} Specialists
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-orange-600 transition-colors leading-snug">
                        {hosp.name}
                      </h3>
                    </div>

                    {/* Details List */}
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{hosp.address}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <a href={`tel:${hosp.phone.split(',')[0]}`} className="font-semibold text-slate-800 hover:text-orange-600">
                          {hosp.phone}
                        </a>
                      </div>

                      {hosp.emergencyPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                          <span className="text-orange-700 font-bold text-[11px]">
                            Emergency: {hosp.emergencyPhone}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{hosp.timings}</span>
                      </div>
                    </div>

                    {/* CMO / Head Doctor */}
                    <div className="space-y-1.5 pt-1">
                      {hosp.headDoctor && (
                        <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/80 flex items-start gap-2 text-xs">
                          <Users className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="text-[10px] uppercase font-bold text-orange-800 block">
                              Chief Medical Officer
                            </span>
                            <span className="font-bold text-slate-900 block truncate">
                              {hosp.headDoctor}
                            </span>
                            <span className="text-slate-500 text-[10px] block truncate">
                              {hosp.headDoctorRole || 'Clinical Lead'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Specialist Faculty Preview */}
                      {leadDoctors.length > 0 && (
                        <div className="px-1 text-[11px] text-slate-500 flex items-center gap-1.5">
                          <Stethoscope className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span className="truncate">
                            Team: {leadDoctors.map(d => d.name.replace('Dr. ', '')).join(', ')}
                            {doctorCount > 2 ? ` +${doctorCount - 2} more` : ''}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Key Specialties Chips */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {hosp.specialties.slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          {spec}
                        </span>
                      ))}
                      {hosp.specialties.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{hosp.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate(`/hospitals/${hosp.id}`)}
                    className="btn-outline-orange text-xs !py-2 text-center flex items-center justify-center gap-1"
                  >
                    <span>View Team ({doctorCount})</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => openAppointmentModal(hosp.city)}
                    className="btn-primary text-xs !py-2 text-center shadow-none"
                  >
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Book OPD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

