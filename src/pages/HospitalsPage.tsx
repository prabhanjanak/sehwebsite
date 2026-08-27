import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Users,
  Check
} from 'lucide-react';
import { HOSPITALS_DATA } from '../data/hospitalsData';
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
            Strategically located across India to deliver world-class tertiary ophthalmic care, blade-free laser suites, and NABH-accredited surgical facilities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Hospital Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitalsList.map((hosp) => (
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
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                      {hosp.state}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5 group-hover:text-orange-600 transition-colors">
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
                        <span className="text-orange-700 font-bold">
                          Emergency: {hosp.emergencyPhone}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{hosp.timings}</span>
                    </div>
                  </div>

                  {/* CMO / Head Doctor & Administrator */}
                  <div className="space-y-1.5 pt-1">
                    {hosp.headDoctor && (
                      <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-100 flex items-center gap-2 text-xs">
                        <Users className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                        <div className="truncate">
                          <span className="font-bold text-slate-900">{hosp.headDoctor}</span>
                          <span className="text-slate-500 text-[10px] block truncate">
                            {hosp.headDoctorRole || 'Chief Medical Officer'}
                          </span>
                        </div>
                      </div>
                    )}

                    {hosp.administratorName && (
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <div className="truncate">
                          <span className="font-bold text-slate-800">{hosp.administratorName}</span>
                          <span className="text-slate-400 text-[10px] block truncate">
                            {hosp.administratorRole || 'Hospital Administrator'}
                          </span>
                        </div>
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
                  className="btn-outline-orange text-xs !py-2 text-center"
                >
                  View Details
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
          ))}
        </div>
      </div>
    </div>
  );
};
