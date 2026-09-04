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
  Cpu,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Building2,
  CheckCircle
} from 'lucide-react';
import { SPECIALTIES_DATA } from '../data/specialtiesData';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { HOSPITAL_SERVICES_DATA } from '../data/hospitalServicesData';
import { useDatabase } from '../context/DatabaseContext';

interface ServiceDetailPageProps {
  specialtyId: string;
  navigate: (route: string) => void;
}

// Units offering LASIK / Refractive Laser Surgery
const LASIK_AVAILABLE_UNITS = [
  'bangalore',
  'coimbatore-hq',
  'guntur',
  'jaipur',
  'shimoga',
  'indore',
  'hyderabad'
];

// Units equipped with German SCHWIND AMARIS 1050RS Excimer Laser
const SCHWIND_AMARIS_UNITS = [
  'bangalore',
  'coimbatore-hq'
];

// Authentic Lead Refractive Faculty by Unit (Zero cross-unit fabrication)
const REFRACTIVE_FACULTY_BY_UNIT: Record<string, string[]> = {
  'bangalore': [
    'Dr. Y. Umesh (CMO & Senior Cornea/Refractive Surgeon)',
    'Dr. Pallavi Joshi (Senior Refractive & Cornea Consultant)'
  ],
  'coimbatore-hq': [
    'Dr. Shruthi Tara (CMO & Senior Cataract/Refractive Faculty)',
    'Dr. S. Kavitha (Senior Consultant – Refractive Surgery)'
  ],
  'guntur': [
    'Dr. Sudhakar Potti (CMO & Chief Refractive Faculty)'
  ],
  'jaipur': [
    'Dr. Neeraj Shah (CMO & Senior Refractive Surgeon)'
  ],
  'shimoga': [
    'Dr. Mallikarjun M H (CMO & Senior Refractive Faculty)'
  ],
  'indore': [
    'Dr. Ankit Deokar (CMO & Refractive Consultant)'
  ],
  'hyderabad': [
    'Dr. Simakurthy Sriram (CMO & Senior Refractive Faculty)'
  ]
};

// Cutting-Edge Surgical & Diagnostic Technology Platforms
const TECH_PLATFORMS = [
  {
    id: 'schwind',
    name: 'SCHWIND AMARIS 1050RS Excimer Laser',
    units: 'Bangalore & Coimbatore (Sathy Road)',
    badge: 'Flagship 7D Laser',
    description: 'Ultra-fast 1050 Hz pulse rate with latency-free 7D active eye tracking and sub-micron corneal sculpting precision.',
    image: '/assets/images/SCHWIND-AMARIS.png',
    specs: ['1050 Hz Repetition Rate', '7D Dynamic Eye Tracking', 'Touch-Free SmartSurfACE PRK', 'Sub-millimeter 0.54mm Spot']
  },
  {
    id: 'centurion',
    name: 'Alcon Centurion Vision System',
    units: 'Available across all 14 Super-Specialty Units',
    badge: 'Active Fluidics Phaco',
    description: 'Gold-standard phacoemulsification console dynamically maintaining physiological intraocular pressure during cataract removal.',
    image: '/assets/images/services29-e1674881195606.jpg',
    specs: ['Active Fluidics Stabilization', 'Sub-2mm Micro-Coaxial MICS', 'Stitchless Cataract Clearance', 'Reduced Ultrasound Energy']
  },
  {
    id: 'constellation',
    name: 'Alcon Constellation Vision Vitrectomy',
    units: 'Coimbatore HQ, Bangalore, Guntur, Jaipur, Kanpur, Varanasi',
    badge: '10,000 CPM Vitrectomy',
    description: 'High-speed dual-pneumatic 25G/27G sutureless vitrectomy platform for complex retinal detachments and macular holes.',
    image: '/assets/images/Vitro-Retina-e1674880647629.png',
    specs: ['10,000 Cuts/Min Probe', 'Integrated Green Endo-Laser', 'Non-Contact Wide-Field Viewing', 'Automated Infusion Pressure']
  },
  {
    id: 'cirrus',
    name: 'Zeiss Cirrus 6000 HD-OCT Angiography',
    units: 'Bangalore, Coimbatore HQ, Guntur, Jaipur, Indore, Varanasi',
    badge: '100,000 A-Scans/sec',
    description: 'Ultra-high-speed non-invasive micro-vascular retinal capillary imaging without intravenous fluorescein dye injection.',
    image: '/assets/images/11.jpg',
    specs: ['Non-Invasive OCT-A', 'Foveal Avascular Zone Mapping', 'RNFL Glaucoma Progression', 'High-Definition Choroidal Scans']
  },
  {
    id: 'retcam',
    name: 'RetCam Envision Digital Pediatric Imaging',
    units: 'Bangalore, Coimbatore HQ, Guntur, Ludhiana',
    badge: 'Neonatal ROP Suite',
    description: 'Wide-field 130-degree digital camera for bedside neonatal Retinopathy of Prematurity (ROP) and Retinoblastoma monitoring.',
    image: '/assets/images/squint-eye-treatment-and-surgery-720x720.png',
    specs: ['130° Wide-Field Lens', 'Bedside Infant Screening', 'Digital Tele-ROP Connectivity', 'Fluorescein Angiography in Babies']
  },
  {
    id: 'pentacam',
    name: 'Oculus Pentacam HR Tomographer',
    units: 'Bangalore, Coimbatore HQ, Guntur, Jaipur, Shimoga, Indore',
    badge: 'Corneal Tomography',
    description: 'High-resolution rotating Scheimpflug camera mapping 22,000 elevation points for Keratoconus screening and custom LASIK.',
    image: '/assets/images/16.jpg',
    specs: ['3D Anterior Segment Model', 'Belin-Ambrosio Ectasia Display', 'Pachymetry Thickness Maps', 'True Net Corneal Power']
  }
];

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ specialtyId, navigate }) => {
  const { openAppointmentModal } = useDatabase();
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');
  const [currentTechIndex, setCurrentTechIndex] = useState(0);

  const specialty = SPECIALTIES_DATA.find((s) => s.id === specialtyId) || SPECIALTIES_DATA[0];
  const isLasik = specialtyId === 'lasik' || specialtyId.includes('lasik') || specialty.id === 'lasik';

  // Unit-Specific Refractive Logic (#8 & #13)
  const isLasikOfferedAtSelectedUnit = selectedUnitId === 'all' || LASIK_AVAILABLE_UNITS.includes(selectedUnitId);
  const isSchwindAmarisAtSelectedUnit = selectedUnitId === 'all' || SCHWIND_AMARIS_UNITS.includes(selectedUnitId);
  const selectedHospitalInfo = HOSPITALS_DATA.find(h => h.id === selectedUnitId);
  const selectedHospitalServiceInfo = HOSPITAL_SERVICES_DATA.find(h => h.id === selectedUnitId);

  // Derive faculty for the selected unit
  let displayFaculty: string[] = [];
  if (isLasik) {
    if (selectedUnitId === 'all') {
      displayFaculty = specialty.doctors;
    } else if (isLasikOfferedAtSelectedUnit) {
      displayFaculty = REFRACTIVE_FACULTY_BY_UNIT[selectedUnitId] || [
        `${selectedHospitalInfo?.cmoName || 'Senior Consultant'} (Lead Refractive Surgeon)`
      ];
    } else {
      displayFaculty = []; // Do NOT display refractive faculty for non-LASIK units (#8)
    }
  } else {
    if (selectedUnitId === 'all') {
      displayFaculty = specialty.doctors;
    } else if (selectedHospitalServiceInfo) {
      // Find matching doctors from that unit
      displayFaculty = selectedHospitalServiceInfo.doctors.slice(0, 3);
    } else {
      displayFaculty = specialty.doctors;
    }
  }

  const nextTech = () => {
    setCurrentTechIndex((prev) => (prev + 1) % TECH_PLATFORMS.length);
  };

  const prevTech = () => {
    setCurrentTechIndex((prev) => (prev - 1 + TECH_PLATFORMS.length) % TECH_PLATFORMS.length);
  };

  const currentTech = TECH_PLATFORMS[currentTechIndex];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans pb-16">
      
      {/* ========================================================================= */}
      {/* 🌟 CLINICAL HERO BANNER                                                    */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-100 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 12 Treatments</span>
          </button>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-white/30">
                {isLasik ? 'Advanced Refractive Laser Surgery' : 'Super-Specialty Care'}
              </span>
              {isLasik && (
                <span className="bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>15-Minute Outpatient Procedure • Topical Drop Anesthesia</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {specialty.title}
            </h1>
            
            <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
              {isLasik 
                ? 'Precision blade-free refractive laser correction. Germany’s SCHWIND AMARIS 1050RS 7D Eye-Tracking Laser at Bangalore and Coimbatore (Sathy Road), plus Contoura, PRK, and ICL.'
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

                    {/* 3. 7D Active Eye Tracking */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Cpu className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        <span>7D Active Eye Tracking</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        At our Bangalore and Coimbatore centers, Germany’s <strong>SCHWIND AMARIS 1050RS</strong> dynamically compensates for involuntary ocular micro-movements across 7 spatial dimensions in real time.
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
                        <span>Institutional Non-Profit Tariffs</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Operating under our Unique Hybrid Model, Sankara provides tertiary-grade refractive laser surgery at transparent tariffs with zero hidden charges.
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
                {/* 🔬 GERMAN LASIK PLATFORM SHOWCASE (Unit-Specific Mapping)                 */}
                {/* ========================================================================= */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-orange-600 uppercase tracking-wider">Tertiary Surgical Infrastructure</span>
                    <h3 className="text-xl font-black text-slate-900">
                      Excimer Laser Suite: SCHWIND AMARIS 1050RS
                    </h3>
                    <p className="text-xs text-slate-600">
                      Commissioned at our flagship laser suites in <strong>Bangalore</strong> and <strong>Coimbatore (Sathy Road)</strong>. Dedicated excimer and refractive suites are also operational at <strong>Guntur, Jaipur, Shimoga, Indore, and Hyderabad</strong>.
                    </p>
                  </div>

                  {/* High-Res Platform Card */}
                  <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white space-y-6">
                    <div className="bg-slate-800/80 rounded-2xl p-4 flex items-center justify-center border border-slate-700/60">
                      <img
                        src="/assets/images/SCHWIND-AMARIS.png"
                        alt="SCHWIND AMARIS 1050RS Laser Suite Platform View"
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
                        <div className="text-[11px] text-slate-300">Latency-Free Compensation</div>
                      </div>
                      <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                        <div className="text-blue-400 font-black text-base">0.54 mm</div>
                        <div className="text-[11px] text-slate-300">Super-Gaussian Spot Size</div>
                      </div>
                      <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                        <div className="text-amber-400 font-black text-base">Zero Thermal Stress</div>
                        <div className="text-[11px] text-slate-300">Intelligent Thermal Control</div>
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
              <h3 className="text-xl font-bold text-slate-900">Sub-Specialties & Clinical Procedures</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialty.subSpecialties.map((sub, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* ⚙️ INTERACTIVE TECHNOLOGY & MACHINE SLIDER (#12)                           */}
            {/* ========================================================================= */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider font-extrabold text-orange-600 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Precision Technology Suite</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">
                    Advanced Surgical & Diagnostic Platforms
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTech}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                    aria-label="Previous platform"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTech}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                    aria-label="Next platform"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Current Active Platform Showcase */}
              <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 bg-slate-900/90 rounded-xl p-3 flex items-center justify-center border border-slate-800">
                  <img
                    src={currentTech.image}
                    alt={currentTech.name}
                    className="max-h-48 w-auto object-contain drop-shadow-lg"
                  />
                </div>
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {currentTech.badge}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      📍 {currentTech.units}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {currentTech.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentTech.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {currentTech.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slide Indicator Dots */}
              <div className="flex justify-center gap-1.5 pt-2">
                {TECH_PLATFORMS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentTechIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      dotIdx === currentTechIndex ? 'w-6 bg-orange-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
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

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick OPD Appointment Card with Unit Selector (#8 & #13) */}
            <div className="sticky top-20 bg-white rounded-3xl p-6 border-2 border-orange-300 shadow-xl space-y-5">
              
              <div className="space-y-1">
                <span className="bg-orange-100 text-orange-700 font-bold px-2.5 py-0.5 rounded text-[11px] uppercase tracking-wider">
                  Clinical OPD Evaluation
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {isLasik ? 'Book Pre-LASIK Evaluation' : `Consult for ${specialty.title.split('&')[0]}`}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isLasik 
                    ? 'Schedule a comprehensive Scheimpflug tomography scan and clinical consultation with senior refractive consultants.'
                    : 'Book a priority outpatient appointment at your nearest Sankara hospital branch.'
                  }
                </p>
              </div>

              {/* Unit-Level Selector */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>Select Hospital Unit:</span>
                </label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">National Network (All 14 Units)</option>
                  {HOSPITALS_DATA.map((hosp) => (
                    <option key={hosp.id} value={hosp.id}>
                      {hosp.city} ({hosp.state})
                    </option>
                  ))}
                </select>

                {/* Unit Availability Notice for LASIK (#8 & #13) */}
                {isLasik && selectedUnitId !== 'all' && (
                  <div>
                    {isLasikOfferedAtSelectedUnit ? (
                      <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 space-y-0.5">
                        <div className="font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>LASIK Operational at {selectedHospitalInfo?.city}</span>
                        </div>
                        <p className="text-[10.5px] text-emerald-700">
                          {isSchwindAmarisAtSelectedUnit 
                            ? 'Equipped with German SCHWIND AMARIS 1050RS 7D Laser Suite.'
                            : 'Equipped with Advanced Dedicated Excimer & Refractive Suite.'
                          }
                        </p>
                      </div>
                    ) : (
                      <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-xl text-[11px] text-amber-900 space-y-1">
                        <div className="font-bold flex items-center gap-1 text-amber-800">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          <span>LASIK Not Offered at {selectedHospitalInfo?.city}</span>
                        </div>
                        <p className="text-[10.5px] text-amber-800 leading-relaxed">
                          Refractive laser surgery is not performed on-site at this unit. Patients receive preliminary corneal evaluation and are coordinated for treatment at our nearest regional laser hub (Bangalore, Coimbatore, Jaipur, or Guntur).
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => openAppointmentModal(
                    selectedUnitId !== 'all' ? (selectedHospitalInfo?.city || '') : '',
                    isLasik ? 'LASIK / Specs Removal' : specialty.title
                  )}
                  className="btn-primary w-full !py-3 text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isLasik ? 'Schedule Refractive OPD Slot →' : 'Book Appointment Now →'}</span>
                </button>

                <a
                  href={`https://wa.me/919790006789?text=Hello%20Sankara%20Eye%20Hospital,%20I%20want%20to%20consult%20for%20${encodeURIComponent(specialty.title)}%20at%20${encodeURIComponent(selectedHospitalInfo?.city || 'Sankara')}.`}
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
                  <span>
                    Direct Contact: <strong>{selectedHospitalInfo ? selectedHospitalInfo.phone : 'Available across 14 Units'}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% NABH Accredited Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>OPD Hours: Mon - Sat 8:00 AM to 6:00 PM</span>
                </div>
              </div>

              {/* Unit-Mapped Faculty Lead (#8) */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-[11px] font-bold uppercase text-slate-500">
                  {isLasik ? 'Lead Refractive Faculty:' : 'Department Faculty:'}
                </div>

                {displayFaculty && displayFaculty.length > 0 ? (
                  <div className="space-y-1 text-xs text-slate-800 font-semibold">
                    {displayFaculty.map((doc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic p-2 bg-slate-50 rounded-lg">
                    {isLasik 
                      ? 'No refractive faculty assigned at this unit. For laser procedures, please select an operational center (e.g. Bangalore, Coimbatore, Guntur, Jaipur, Shimoga).'
                      : 'Consultation available with senior visiting ophthalmology faculty.'
                    }
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
