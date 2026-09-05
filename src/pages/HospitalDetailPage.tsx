import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Bed, 
  ShieldCheck, 
  Users, 
  Check, 
  Eye,
  Mail,
  Award,
  UserCheck,
  Stethoscope,
  HeartHandshake,
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { HOSPITAL_SERVICES_DATA } from '../data/hospitalServicesData';
import { parseDoctor, ParsedDoctor } from '../utils/doctorParser';
import { useDatabase } from '../context/DatabaseContext';

interface HospitalDetailPageProps {
  hospitalId: string;
  navigate: (route: string) => void;
}

export const HospitalDetailPage: React.FC<HospitalDetailPageProps> = ({ hospitalId, navigate }) => {
  const { openAppointmentModal, hospitalsList } = useDatabase();
  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState<string>('all');

  const hospital = hospitalsList.find((h) => h.id === hospitalId) || hospitalsList[0];

  // Specific unit service data from authentic official registry
  const unitServiceData = HOSPITAL_SERVICES_DATA.find((u) => {
    if (hospital.id === 'coimbatore-hq') return u.id === 'coimbatore-sathy-road';
    if (hospital.id === 'coimbatore-city') return u.id === 'coimbatore-rs-puram';
    return u.id === hospital.id;
  });

  // Parse all authentic doctors for this hospital unit
  const allParsedDoctors: ParsedDoctor[] = useMemo(() => {
    if (!unitServiceData || !unitServiceData.doctors) return [];
    return unitServiceData.doctors.map(parseDoctor);
  }, [unitServiceData]);

  // Identify Chief Medical Officer (CMO)
  const cmoDoctor = useMemo(() => {
    return (
      allParsedDoctors.find((d) => d.isCMO) ||
      allParsedDoctors.find((d) => 
        hospital.headDoctor && d.name.toLowerCase().includes(hospital.headDoctor.toLowerCase().replace('dr. ', ''))
      ) ||
      (hospital.headDoctor ? {
        raw: hospital.headDoctor,
        name: hospital.headDoctor,
        qualifications: hospital.headDoctorRole || 'Chief Medical Officer',
        department: 'Chief Medical Officer & Clinical Administration',
        isCMO: true
      } : null)
    );
  }, [allParsedDoctors, hospital.headDoctor, hospital.headDoctorRole]);

  // Non-CMO regular faculty
  const facultyDoctors = useMemo(() => {
    return allParsedDoctors.filter((d) => d !== cmoDoctor && !d.isCMO);
  }, [allParsedDoctors, cmoDoctor]);

  // Extract unique department filters
  const departmentFilters = useMemo(() => {
    const filters = new Set<string>();
    allParsedDoctors.forEach((doc) => {
      const dep = doc.department.toLowerCase();
      if (dep.includes('cataract') || dep.includes('refractive') || dep.includes('lasik')) {
        filters.add('Cataract & Refractive');
      } else if (dep.includes('retina') || dep.includes('vitreo') || dep.includes('uvea')) {
        filters.add('Vitreo-Retina & Uvea');
      } else if (dep.includes('cornea') || dep.includes('ocular surface')) {
        filters.add('Cornea & Ocular Surface');
      } else if (dep.includes('glaucoma')) {
        filters.add('Glaucoma');
      } else if (dep.includes('paediatric') || dep.includes('pediatric') || dep.includes('squint') || dep.includes('strabismus')) {
        filters.add('Paediatric & Strabismus');
      } else if (dep.includes('orbit') || dep.includes('oculoplast') || dep.includes('neuro')) {
        filters.add('Orbit & Oculoplasty');
      } else {
        filters.add('Comprehensive Care');
      }
    });
    return Array.from(filters);
  }, [allParsedDoctors]);

  // Filtered doctors list
  const filteredDoctors = useMemo(() => {
    if (activeSpecialtyFilter === 'all') return facultyDoctors;
    return facultyDoctors.filter((doc) => {
      const dep = doc.department.toLowerCase();
      switch (activeSpecialtyFilter) {
        case 'Cataract & Refractive':
          return dep.includes('cataract') || dep.includes('refractive') || dep.includes('lasik');
        case 'Vitreo-Retina & Uvea':
          return dep.includes('retina') || dep.includes('vitreo') || dep.includes('uvea');
        case 'Cornea & Ocular Surface':
          return dep.includes('cornea') || dep.includes('ocular surface');
        case 'Glaucoma':
          return dep.includes('glaucoma');
        case 'Paediatric & Strabismus':
          return dep.includes('paediatric') || dep.includes('pediatric') || dep.includes('squint') || dep.includes('strabismus');
        case 'Orbit & Oculoplasty':
          return dep.includes('orbit') || dep.includes('oculoplast') || dep.includes('neuro');
        case 'Comprehensive Care':
          return !dep.includes('cataract') && !dep.includes('retina') && !dep.includes('cornea') && !dep.includes('glaucoma') && !dep.includes('paediatric') && !dep.includes('pediatric');
        default:
          return true;
      }
    });
  }, [facultyDoctors, activeSpecialtyFilter]);

  // Authentic specialties list
  const specialtiesToDisplay = unitServiceData?.specialities && unitServiceData.specialities.length > 0
    ? unitServiceData.specialities
    : hospital.specialties;

  return (
    <div className="bg-white">
      {/* Top Breadcrumb & Hero */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={() => navigate('/hospitals')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-100 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to All 14 Hospital Units</span>
          </button>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-trust text-xs">NABH Accredited Unit</span>
              <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {allParsedDoctors.length} Full-Time Specialists
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              {hospital.name}
            </h1>
            <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-200 flex-shrink-0" />
              <span>{hospital.address}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Hospital Photo & Fast Specs */}
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white w-full relative bg-slate-900">
              <div className="aspect-[16/10] w-full">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                Super-Specialty Unit
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-100">
                <div className="text-xs text-slate-500 font-medium">Specialist Doctors</div>
                <div className="text-lg font-bold text-orange-600">{allParsedDoctors.length} Specialists</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Established</div>
                <div className="text-lg font-bold text-slate-900">{hospital.established}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Accreditation</div>
                <div className="text-lg font-bold text-emerald-600">NABH Standard</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Bed Capacity</div>
                <div className="text-lg font-bold text-slate-900">{hospital.beds} Beds</div>
              </div>
            </div>

            {/* Specialties Available at this Unit (from authentic registry) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Clinical Specialties at {hospital.city}</h3>
                <span className="text-xs text-slate-500 font-medium">{specialtiesToDisplay.length} Specialties Available</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {specialtiesToDisplay.map((spec, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2.5 text-xs font-semibold text-slate-800 hover:border-orange-200 transition-colors">
                    <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Infrastructure & Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Infrastructure & Hospital Facilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {hospital.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-orange-100 bg-orange-50/30 flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================================================================ */}
            {/* AUTHENTIC CLINICAL FACULTY & MEDICAL TEAM DIRECTORY */}
            {/* ================================================================ */}
            <div className="space-y-6 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dedicated Medical Team</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                    Clinical Faculty & Specialists at {hospital.city}
                  </h3>
                </div>
                <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                  {allParsedDoctors.length} Full-Time Consultants
                </div>
              </div>

              {/* 1. Chief Medical Officer Leadership Spotlight */}
              {cmoDoctor && (
                <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-50 rounded-2xl border-2 border-orange-300 p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      <Award className="w-3.5 h-3.5" />
                      Chief Medical Officer & Unit Lead
                    </span>
                    <span className="text-[11px] font-semibold text-orange-800 bg-orange-100/80 px-2.5 py-0.5 rounded-md">
                      Clinical Governance Head
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <div className="space-y-1.5">
                      <h4 className="text-xl font-black text-slate-900">{cmoDoctor.name}</h4>
                      {cmoDoctor.qualifications && (
                        <div className="inline-block text-xs font-mono font-semibold bg-white border border-orange-200 text-orange-900 px-2.5 py-1 rounded-md shadow-2xs">
                          {cmoDoctor.qualifications}
                        </div>
                      )}
                      <p className="text-xs font-medium text-slate-700">
                        <strong className="text-slate-900">Department:</strong> {cmoDoctor.department}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-relaxed max-w-xl">
                        Overseeing ophthalmic surgery, clinical excellence, diagnostic protocols, and patient welfare at Sankara Eye Hospital, {hospital.city}.
                      </p>
                    </div>

                    <button
                      onClick={() => openAppointmentModal(hospital.city)}
                      className="btn-primary whitespace-nowrap !py-2.5 !px-5 text-xs font-bold self-start sm:self-center shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5 inline mr-1.5" />
                      Book Consultation
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Department Filter Chips */}
              {departmentFilters.length > 1 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span>Filter Doctors by Specialty:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setActiveSpecialtyFilter('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        activeSpecialtyFilter === 'all'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      All Specialists ({facultyDoctors.length})
                    </button>
                    {departmentFilters.map((dep, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSpecialtyFilter(dep)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeSpecialtyFilter === dep
                            ? 'bg-orange-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {dep}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Doctors Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDoctors.map((doc, idx) => {
                  // Generate an avatar initials
                  const initials = doc.name
                    .replace(/^Dr\.\s*/i, '')
                    .split(' ')
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  return (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                            {initials || <Stethoscope className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                              {doc.name}
                            </h4>
                            {doc.qualifications && (
                              <p className="text-[11px] font-mono text-slate-600 mt-0.5 break-words">
                                {doc.qualifications}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="pt-1 space-y-1.5">
                          <div className="inline-block bg-orange-50 border border-orange-200/80 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {doc.department}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>Full-Time Clinical Specialist</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-400">Sankara {hospital.city}</span>
                        <button
                          onClick={() => openAppointmentModal(hospital.city)}
                          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                        >
                          <span>Consult Doctor</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredDoctors.length === 0 && (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-sm text-slate-600 font-medium">
                    No doctors found for this specific filter. Please select "All Specialists" to view the complete medical faculty.
                  </p>
                  <button
                    onClick={() => setActiveSpecialtyFilter('all')}
                    className="mt-3 text-xs font-bold text-orange-600 hover:underline"
                  >
                    View All {facultyDoctors.length} Specialists
                  </button>
                </div>
              )}
            </div>

            {/* Partners in Service (from authentic registry) */}
            {unitServiceData?.partners && unitServiceData.partners.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-bold text-slate-900">Partners in Service</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {unitServiceData.partners.map((partner, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                      <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                      <span>{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Booking & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white rounded-3xl p-6 border-2 border-orange-200 shadow-xl space-y-5">
              <div>
                <span className="badge-sankara text-xs mb-1">Priority OPD Booking</span>
                <h3 className="text-lg font-bold text-slate-900">Book at {hospital.city} Unit</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Schedule direct consultation with our departmental specialists ({allParsedDoctors.length} faculty members available).
                </p>
              </div>

              <button
                onClick={() => openAppointmentModal(hospital.city)}
                className="btn-primary w-full !py-3 text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Now →</span>
              </button>

              <div className="space-y-3.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">HOSPITAL TELEPHONE:</span>
                  <div className="font-bold text-orange-700 text-sm mt-0.5">
                    <a href={`tel:${hospital.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">
                      {hospital.phone}
                    </a>
                  </div>
                </div>

                {unitServiceData?.emergencyContact ? (
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px]">EMERGENCY CONTACTS:</span>
                    <div className="space-y-1 mt-0.5">
                      {unitServiceData.emergencyContact.split('\n').map((line, lIdx) => (
                        <div key={lIdx} className="font-bold text-slate-900 text-xs">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px]">24/7 EMERGENCY & EYE BANK:</span>
                    <div className="font-bold text-slate-900 text-xs mt-0.5">
                      {hospital.emergencyPhone}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">OFFICIAL EMAIL:</span>
                  <div className="text-slate-800 font-mono text-xs mt-0.5">
                    {hospital.email}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">OPD WORKING HOURS:</span>
                  <div className="text-slate-800 text-xs mt-0.5 whitespace-pre-line leading-relaxed">
                    {unitServiceData?.workingHours || hospital.timings}
                  </div>
                  {hospital.sundayTimings && !unitServiceData?.workingHours && (
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      {hospital.sundayTimings}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

