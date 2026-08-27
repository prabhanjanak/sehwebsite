import React, { useState } from 'react';
import { Eye, Sparkles, Activity, ShieldCheck, Users, Shield, HeartPulse, BookOpen, Check, Calendar, ArrowRight, HelpCircle } from 'lucide-react';
import { SPECIALTIES_DATA } from '../data/specialtiesData';
import { HospitalServicesAndInformation } from '../components/common/HospitalServicesAndInformation';
import { useDatabase } from '../context/DatabaseContext';

interface ServicesPageProps {
  navigate: (route: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  const { openAppointmentModal } = useDatabase();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Eye className="w-3.5 h-3.5" />
            <span>Comprehensive Ophthalmology & Laser Suites</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Clinical Specialties & Surgical Services
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Equipped with state-of-the-art diagnostic platforms, blade-free femtosecond lasers, and 24/7 Eye Banks to deliver world-class clinical outcomes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Refractive LASIK Spotlight Feature */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Refractive Laser Vision Correction Suite
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Germany’s SCHWIND AMARIS 1050RS & SMILE Pro
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience the world’s most advanced 7D eye-tracking excimer laser operating at 1050 Hz. Freedom from spectacles and contact lenses with sub-millimeter precision, zero pain, and HD visual outcomes within hours.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>Blade-Free Femto-LASIK</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>Contoura Vision Topography</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>SMILE Pro Lenticule Extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>ICL Phakic Lenses for High Power</span>
                </div>
              </div>
              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={() => openAppointmentModal('', 'LASIK, SMILE Pro & Refractive Laser Suite')}
                  className="btn-primary !px-6 !py-2.5 text-xs font-bold"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free LASIK Candidacy Test</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 text-center">
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 max-w-sm mx-auto shadow-xl">
                <img
                  src="/assets/images/SCHWIND-AMARIS.png"
                  alt="SCHWIND AMARIS 1050RS"
                  className="w-full h-auto object-contain mx-auto"
                />
                <div className="mt-4 pt-3 border-t border-slate-700">
                  <div className="text-xs font-bold text-orange-400">SCHWIND AMARIS 1050RS</div>
                  <div className="text-[11px] text-slate-400">German Engineered 7D Laser Suite</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Specialties List */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-sankara text-xs mb-1">Our Clinical Offerings</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Explore All Clinical Departments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES_DATA.map((spec) => (
              <div
                key={spec.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-hover hover:border-orange-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={spec.image}
                      alt={spec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-sm font-bold truncate">{spec.title}</div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs font-semibold text-orange-600">
                      {spec.tagline}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {spec.shortDescription}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Key Treatments:</div>
                      {spec.keyTreatments.slice(0, 2).map((tr, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                          <Check className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="truncate">{tr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigate(`/services/${spec.id}`)}
                    className="text-xs font-bold text-slate-700 hover:text-orange-600"
                  >
                    Clinical Details →
                  </button>
                  <button
                    onClick={() => openAppointmentModal('', spec.title)}
                    className="btn-primary !px-3.5 !py-1.5 text-xs font-bold"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book OPD</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🏥 Comprehensive Services and Information by Unit Dropdown */}
        <div className="pt-8 border-t border-slate-200">
          <HospitalServicesAndInformation />
        </div>

      </div>
    </div>
  );
};
