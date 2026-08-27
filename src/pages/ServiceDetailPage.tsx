import React, { useState } from 'react';
import { 
  Check, 
  Calendar, 
  ArrowLeft, 
  Sparkles, 
  HelpCircle, 
  UserCheck, 
  ShieldCheck,
  Phone,
  Clock,
  CheckCircle2,
  Eye,
  Zap,
  Award,
  MessageCircle,
  Activity,
  Sliders,
  Shield,
  Layers,
  Cpu
} from 'lucide-react';
import { SPECIALTIES_DATA } from '../data/specialtiesData';
import { useDatabase } from '../context/DatabaseContext';

interface ServiceDetailPageProps {
  specialtyId: string;
  navigate: (route: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ specialtyId, navigate }) => {
  const { openAppointmentModal } = useDatabase();

  const specialty = SPECIALTIES_DATA.find((s) => s.id === specialtyId) || SPECIALTIES_DATA[0];
  const isLasik = specialtyId === 'lasik' || specialtyId.includes('lasik') || specialty.id === 'lasik';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans pb-16">
      
      {/* ========================================================================= */}
      {/* 🌟 CLINICAL HERO BANNER                                                    */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-100 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Specialties</span>
          </button>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-white/30">
                {isLasik ? 'Advanced Refractive Laser Surgery' : 'Super-Specialty Care'}
              </span>
              {isLasik && (
                <span className="bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>15-Minute Outpatient Procedure • Topical Anesthesia</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {specialty.title}
            </h1>
            
            <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
              {isLasik 
                ? 'Precision blade-free refractive laser correction utilizing Germany’s SCHWIND AMARIS 1050RS 7D Eye-Tracking Laser Suite and Zeiss SMILE Pro for permanent spectacle independence.'
                : specialty.tagline
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">

            {/* ========================================================================= */}
            {/* 🔬 PROFESSIONAL LASIK OVERVIEW & CLINICAL PRINCIPLES                      */}
            {/* ========================================================================= */}
            {isLasik ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
                
                {/* Clinical Mechanism */}
                <div className="space-y-4 border-b border-slate-100 pb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-black text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    <Activity className="w-3.5 h-3.5 text-orange-600" />
                    <span>Clinical Mechanism & Optical Science</span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Refractive Correction via Customized Excimer Laser Ablation
                  </h2>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong>LASIK (Laser-Assisted In Situ Keratomileusis)</strong> is a globally established, FDA-approved refractive procedure designed to permanently treat myopia (nearsightedness), hyperopia (farsightedness), and astigmatism. By utilizing an ultra-precise, cool excimer laser to microscopically reshape the corneal stroma, optical light rays are refocused directly onto the retina, achieving natural, unassisted 6/6 high-definition visual acuity without spectacles or contact lenses.
                  </p>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 space-y-1.5 leading-relaxed">
                    <strong className="text-slate-900 block font-bold">Clinical Efficacy at Sankara:</strong>
                    Over 99.4% of eligible candidates achieve 6/6 visual acuity or better within 24 hours post-procedure, benefiting from sub-micron ablation profiles tailored to individual corneal topography.
                  </div>
                </div>

                {/* 6 Core Clinical Pillars */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-500" />
                    <span>Key Clinical Pillars & Surgical Advantages</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* 1. Topical Painless Delivery */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Painless Topical Anesthesia</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Topical anesthetic eye drops eliminate ocular sensation within 30 seconds. The procedure is entirely injection-free, needle-free, and pain-free.
                      </p>
                    </div>

                    {/* 2. 15-Minute Outpatient Efficiency */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>15-Minute Day-Care Procedure</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Total OT duration is approximately 15 minutes, with active laser delivery requiring only <strong>8 to 15 seconds per eye</strong>. Patients are discharged the same hour.
                      </p>
                    </div>

                    {/* 3. 7D Sub-Micron Precision Tracking */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Cpu className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <span>7D Active Eye Tracking (1050 Hz)</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Powered by Germany’s <strong>SCHWIND AMARIS 1050RS</strong>, dynamically compensating for involuntary ocular micro-movements across 7 spatial dimensions in real time.
                      </p>
                    </div>

                    {/* 4. High Definition HD Wavefront Acuity */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Eye className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>High-Definition Wavefront Optics</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Topolyzer-guided custom ablation analyzes 22,000 individual elevation points, optimizing mesopic contrast and minimizing nocturnal glare or halos.
                      </p>
                    </div>

                    {/* 5. Institutional Cost Sustainability */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Award className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <span>Institutional Cost-Sustainability</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        As a public charitable trust, Sankara provides tertiary-grade refractive laser surgery at transparent, non-profit tariff schedules with zero hidden charges.
                      </p>
                    </div>

                    {/* 6. Rapid Convalescence & Minimal Rest */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Zap className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span>Minimal Rest & Fast Visual Recovery</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Sutureless corneal flap adherence completes within minutes. Patients resume routine occupational, computer, and mobile tasks within 24 to 48 hours.
                      </p>
                    </div>

                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 🔄 CLINICAL SURGICAL PHASES                                              */}
                {/* ========================================================================= */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">
                      Step-by-Step Surgical Workflow
                    </h3>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                      Clinical Duration: ~15 mins
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="w-7 h-7 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-center">
                        1
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">Phase 1: Topical Anesthesia</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Proparacaine topical ophthalmic drops are instilled to achieve complete corneal insensitivity without systemic sedation or injection discomfort.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="w-7 h-7 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-center">
                        2
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">Phase 2: Blade-Free Flap Creation</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        A femtosecond laser creates a precise, planar corneal flap with uniform stromal bed depth (or in Touch-Free SmartSurfACE PRK, ablation is entirely flapless).
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="w-7 h-7 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-center">
                        3
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">Phase 3: High-Speed Laser Ablation</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The 1050 Hz excimer beam sculpts the stromal bed according to custom corneal wavefront data. Active 7D tracking maintains perfect optical alignment.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="w-7 h-7 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-center">
                        4
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">Phase 4: Natural Flap Repositioning</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The corneal flap is repositioned and seals naturally via osmotic pressure within 2 to 3 minutes, eliminating any need for sutures or ocular patches.
                      </p>
                    </div>

                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 🔬 FULLY VISIBLE GERMAN LASIK PLATFORM SHOWCASE                          */}
                {/* ========================================================================= */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-orange-600 uppercase tracking-wider">Tertiary Surgical Infrastructure</span>
                    <h3 className="text-xl font-black text-slate-900">
                      Surgical Platform: SCHWIND AMARIS 1050RS Excimer Laser
                    </h3>
                    <p className="text-xs text-slate-600">
                      Integrated in dedicated modular refractive suites across Bangalore, Coimbatore, Shimoga, Guntur, and network hospitals.
                    </p>
                  </div>

                  {/* Fully Visible, High-Res Platform Card */}
                  <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white space-y-6">
                    <div className="bg-slate-800/80 rounded-2xl p-4 flex items-center justify-center border border-slate-700/60">
                      <img
                        src="/assets/images/SCHWIND-AMARIS.png"
                        alt="SCHWIND AMARIS 1050RS Laser Suite Full Platform View"
                        className="max-h-72 sm:max-h-80 w-auto object-contain drop-shadow-2xl mx-auto"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                        <div className="text-orange-400 font-black text-base">1050 Hz</div>
                        <div className="text-[11px] text-slate-300">Pulse Repetition Rate</div>
                      </div>
                      <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                        <div className="text-emerald-400 font-black text-base">7D Active Tracking</div>
                        <div className="text-[11px] text-slate-300">Latitudinal & Torsional Motion</div>
                      </div>
                      <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                        <div className="text-blue-400 font-black text-base">0.54 mm</div>
                        <div className="text-[11px] text-slate-300">Super-Gaussian Spot Size</div>
                      </div>
                      <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                        <div className="text-amber-400 font-black text-base">Zero Thermal Stress</div>
                        <div className="text-[11px] text-slate-300">Intelligent Thermal Effect Control</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* 📋 CLINICAL CANDIDACY CRITERIA                                            */}
                {/* ========================================================================= */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">
                    Clinical Candidacy & Evaluation Criteria
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Age ≥ 18 Years:</strong> Complete ocular axial elongation and refraction stability.
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Refractive Stability:</strong> Dioptric prescription variance ≤ 0.50D over the preceding 12 months.
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Corneal Pachymetry:</strong> Sufficient residual stromal bed thickness measured via Scheimpflug tomography.
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Ocular Surface Health:</strong> Absence of progressive ectatic conditions, severe dry eye, or uncontrolled glaucoma.
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (

              /* Generic Overview for Other Specialties */
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100 flex items-center justify-center p-2">
                  <img
                    src={specialty.image}
                    alt={specialty.title}
                    className="max-h-80 w-auto object-contain rounded-xl"
                  />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Clinical Overview</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {specialty.fullDescription}
                </p>
              </div>
            )}

            {/* Sub-Specialties & Surgical Procedures */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Sub-Specialties & Surgical Modalities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialty.subSpecialties.map((sub, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {specialty.faqs && specialty.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-orange-500" />
                  <span>Frequently Asked Clinical Questions</span>
                </h3>
                <div className="space-y-3">
                  {specialty.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                      <div className="font-bold text-slate-900 text-sm">{faq.question}</div>
                      <div className="text-slate-600 leading-relaxed">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Booking Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick OPD Appointment Card */}
            <div className="sticky top-20 bg-white rounded-3xl p-6 border-2 border-orange-300 shadow-xl space-y-5">
              
              <div className="space-y-1">
                <span className="bg-orange-100 text-orange-700 font-bold px-2.5 py-0.5 rounded text-[11px] uppercase tracking-wider">
                  Clinical OPD Evaluation
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {isLasik ? 'Book Pre-LASIK Topography Evaluation' : `Consult for ${specialty.title.split(',')[0]}`}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isLasik 
                    ? 'Schedule a comprehensive Scheimpflug topography scan and clinical consultation with senior refractive consultants.'
                    : 'Book a priority OPD slot at your nearest Sankara hospital branch.'
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => openAppointmentModal('', isLasik ? 'LASIK / Specs Removal' : specialty.title)}
                  className="btn-primary w-full !py-3 text-xs font-black shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isLasik ? 'Schedule Refractive OPD Slot →' : 'Book Appointment Now →'}</span>
                </button>

                <a
                  href="https://wa.me/919952890087?text=Hello%20Sankara%20Eye%20Hospital,%20I%20want%20to%20know%20more%20about%20LASIK%20refractive%20evaluation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Clinical Counselor</span>
                </a>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span>Central Helpline: <strong>080-69038900</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>NABH Accredited Modular Laser Theatres</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Same-Day Evaluation & Topography Reporting</span>
                </div>
              </div>

              {/* Senior Faculty Lead */}
              {specialty.doctors && specialty.doctors.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold uppercase text-slate-500">
                    Lead Refractive Faculty:
                  </div>
                  <div className="space-y-1 text-xs text-slate-800 font-semibold">
                    {specialty.doctors.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-orange-500" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
