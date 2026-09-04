import React from 'react';
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
  UserCheck
} from 'lucide-react';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { DOCTORS_DATA } from '../data/doctorsData';
import { HOSPITAL_SERVICES_DATA } from '../data/hospitalServicesData';
import { useDatabase } from '../context/DatabaseContext';

interface HospitalDetailPageProps {
  hospitalId: string;
  navigate: (route: string) => void;
}

export const HospitalDetailPage: React.FC<HospitalDetailPageProps> = ({ hospitalId, navigate }) => {
  const { openAppointmentModal, hospitalsList } = useDatabase();

  const hospital = hospitalsList.find((h) => h.id === hospitalId) || hospitalsList[0];

  // Specific unit service data from official registry
  const unitServiceData = HOSPITAL_SERVICES_DATA.find((u) => {
    if (hospital.id === 'coimbatore-hq') return u.id === 'coimbatore-sathy-road';
    if (hospital.id === 'coimbatore-city') return u.id === 'coimbatore-rs-puram';
    return u.id === hospital.id;
  });

  // Highlight doctors that match this unit
  const matchedDoctors = DOCTORS_DATA.filter((d) => {
    if (hospital.id === 'coimbatore-hq') {
      return d.hospitalLocation.includes('Coimbatore (Mission Head Quarters)');
    }
    if (hospital.id === 'coimbatore-city') {
      return d.hospitalLocation.includes('City') && d.hospitalLocation.includes('Coimbatore');
    }
    return d.hospitalLocation.toLowerCase().includes(hospital.city.toLowerCase());
  });

  return (
    <div className="bg-white">
      {/* Top Breadcrumb & Hero */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={() => navigate('/hospitals')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-100 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 14 Hospitals</span>
          </button>

          <div className="space-y-2">
            <span className="badge-trust text-xs">NABH Accredited Unit</span>
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
          <div className="lg:col-span-8 space-y-8">
            {/* Hospital Photo & Fast Specs (Uncropped Aspect Ratio) */}
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
                <div className="text-xs text-slate-500 font-medium">Clinical Tier</div>
                <div className="text-lg font-bold text-orange-600">Tertiary Hub</div>
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
                <div className="text-xs text-slate-500 font-medium">Emergency Care</div>
                <div className="text-lg font-bold text-orange-600">24/7 Available</div>
              </div>
            </div>

            {/* Specialties Available at this Unit */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">Clinical Specialties at {hospital.city}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {hospital.specialties.map((spec, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                    <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Infrastructure & Features */}
            <div className="space-y-3">
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

            {/* Unit Doctors & Medical Faculty List (Under Unit Detail & Backend) */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-slate-900">Clinical Faculty & Specialists at {hospital.city}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Medical Admin Lead */}
                <div className="bg-orange-50/50 border border-orange-200 rounded-2xl p-4 space-y-2">
                  <span className="badge-sankara text-[10px]">Chief Medical Officer / Clinical Lead</span>
                  <h4 className="text-sm font-bold text-slate-900">{hospital.headDoctor}</h4>
                  <p className="text-xs text-orange-700 font-semibold">{hospital.headDoctorRole}</p>
                  <p className="text-[11px] text-slate-500">Leading ophthalmic consultations, surgical governance, and clinical excellence.</p>
                </div>

                {/* Hospital Administrator */}
                {hospital.administratorName && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                    <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">Hospital Administration</span>
                    <h4 className="text-sm font-bold text-slate-900">{hospital.administratorName}</h4>
                    <p className="text-xs text-slate-600 font-semibold">{hospital.administratorRole || 'Facility Superintendent'}</p>
                    <p className="text-[11px] text-slate-500">Managing unit operations, patient care logistics, and emergency coordination.</p>
                  </div>
                )}

                {matchedDoctors.map((doc) => (
                  <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-xs">
                    <span className="badge-trust text-[10px]">Consultant Specialist</span>
                    <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                    <p className="text-xs text-orange-600 font-semibold">{doc.specialty}</p>
                    <p className="text-[11px] text-slate-500 font-mono">{doc.qualifications}</p>
                  </div>
                ))}

                {/* Additional Unit-Specific Specialists from Official Registry */}
                {unitServiceData?.doctors
                  ?.filter((docStr) => !docStr.toLowerCase().includes(hospital.headDoctor.toLowerCase()))
                  .map((docStr, idx) => {
                    const parts = docStr.split('(');
                    const nameAndDeg = parts[0]?.trim() || docStr;
                    const department = parts[1] ? parts[1].replace(')', '').trim() : 'Consultant Ophthalmologist';
                    return (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-xs">
                        <span className="badge-trust text-[10px]">Department Specialist</span>
                        <h4 className="text-sm font-bold text-slate-900">{nameAndDeg}</h4>
                        <p className="text-xs text-orange-600 font-semibold">{department}</p>
                        <p className="text-[11px] text-slate-500">Dedicated Full-Time Clinical Faculty</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Sidebar Booking & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white rounded-3xl p-6 border-2 border-orange-200 shadow-xl space-y-5">
              <div>
                <span className="badge-sankara text-xs mb-1">Priority OPD Booking</span>
                <h3 className="text-lg font-bold text-slate-900">Book at {hospital.city} Unit</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Schedule direct consultation with our departmental specialists.
                </p>
              </div>

              <button
                onClick={() => openAppointmentModal(hospital.city)}
                className="btn-primary w-full !py-3 text-xs font-bold shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Now →</span>
              </button>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">HOSPITAL TELEPHONE:</span>
                  <div className="font-bold text-orange-700 text-sm mt-0.5">
                    <a href={`tel:${hospital.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">
                      {hospital.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">24/7 EMERGENCY & EYE BANK:</span>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">
                    {hospital.emergencyPhone}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">OFFICIAL EMAIL:</span>
                  <div className="text-slate-800 font-mono text-xs mt-0.5">
                    {hospital.email}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px]">OPD WORKING HOURS:</span>
                  <div className="text-slate-800 text-xs mt-0.5">
                    {hospital.timings}
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    {hospital.sundayTimings}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
