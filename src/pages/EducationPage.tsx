import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Users, 
  FileText,
  Sparkles,
  Send
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

interface EducationPageProps {
  navigate: (route: string) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ navigate }) => {
  const { showToast, submitExamApplication } = useDatabase();
  const [activeCampus, setActiveCampus] = useState<'Bangalore' | 'Ludhiana'>('Bangalore');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCourse, setInquiryCourse] = useState<any>('DNB Ophthalmology');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    await submitExamApplication({
      candidateName: inquiryName,
      email: inquiryEmail || `${inquiryName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: inquiryPhone,
      courseType: inquiryCourse,
      dob: '1998-05-15',
      gender: 'Candidate',
      qualifications: 'MBBS / Optometry / Higher Secondary',
      currentInstitution: 'Medical / Science College',
      preferredExamCenter: `Sankara Eye Hospital - ${activeCampus}`,
      status: 'Application Received'
    });

    setInquirySubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Sankara Academy of Vision (SAV)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Academic Excellence & Vision Sciences
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Training the next generation of ophthalmologists, clinical optometrists, and vision researchers to transform global eye healthcare.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Overview & Convocation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="badge-sankara text-xs">Academic Pedagogy</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sankara College of Optometry (SCO)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Established with the vision of building high-caliber vision care specialists, SCO provides hands-on clinical exposure across 14 super-specialty hospitals. Students train alongside top ophthalmologists with access to real patient case loads exceeding 200,000 cases annually.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-100">
                <div className="text-lg font-bold text-orange-600">100% Placement</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Top Eye Hospitals & Research</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-100">
                <div className="text-lg font-bold text-slate-900">Affiliated</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Rajiv Gandhi University (RGUHS)</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950">
              <div className="aspect-[16/10] w-full">
                <img
                  src="/assets/images/convocation.jpg"
                  alt="Sankara College of Optometry Convocation"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="bg-slate-950 text-white p-4 text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold">SCO Convocation Ceremony</div>
                  <div className="text-slate-400">Graduating Bachelors & Masters of Optometry</div>
                </div>
                <span className="text-orange-400 font-semibold">18 Batches Graduated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Campuses & Degree Programs */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="badge-trust text-xs mb-1">Degree Offerings</span>
              <h3 className="text-2xl font-bold text-slate-900">Academic Programs & Campuses</h3>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveCampus('Bangalore')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCampus === 'Bangalore'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-orange-600'
                }`}
              >
                Bangalore Campus
              </button>
              <button
                onClick={() => setActiveCampus('Ludhiana')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCampus === 'Ludhiana'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-orange-600'
                }`}
              >
                Ludhiana Campus
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold">
                B.Sc
              </div>
              <div>
                <span className="badge-sankara text-[10px]">Undergraduate Degree</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">B.Sc in Optometry</h4>
                <p className="text-xs text-slate-500 mt-0.5">4 Years (3 Years Theory + 1 Year Clinical Internship)</p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Comprehensive Refraction & Optics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Contact Lens Fitting & Low Vision</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Rotations in FLACS & LASIK Suites</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold">
                M.Sc
              </div>
              <div>
                <span className="badge-sankara text-[10px]">Postgraduate Degree</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">M.Sc in Optometry</h4>
                <p className="text-xs text-slate-500 mt-0.5">2 Years Advanced Clinical & Research Specialization</p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Advanced Ocular Diagnostics (OCT, Topography)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Pediatric Vision Therapy & Orthoptics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Clinical Research Thesis Defense</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold">
                DNB
              </div>
              <div>
                <span className="badge-trust text-[10px]">Medical Residency</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">DNB Ophthalmology Residency</h4>
                <p className="text-xs text-slate-500 mt-0.5">3 Years Post-MBBS / Post-DOMS Surgical Training</p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>High-Volume Phacoemulsification Training</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Fellowships in Cornea, Retina & Glaucoma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>National Board of Examinations (NBE) Accredited</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Admissions Inquiry & Online Entrance Exam Application Form */}
        <div className="bg-gradient-to-br from-orange-50/70 via-white to-orange-50/40 rounded-3xl p-8 sm:p-12 border-2 border-orange-200 shadow-xl max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black">
              <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
              <span>National Academic Admissions & Entrance Portal 2026</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Apply for Academic Admissions & Entrance Exams</h3>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              Submit your formal application for DNB Ophthalmology Residency, Sub-Specialty Surgical Fellowships, or B.Sc/M.Sc Optometry Entrance.
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-3 text-xs text-emerald-800 shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-black text-emerald-950">Entrance Application Registered Successfully!</h4>
              <p className="text-slate-700 max-w-md mx-auto">
                Your application has been registered with the <strong>Sankara Academy of Vision Academic Board</strong>. Your digital entrance confirmation and syllabus pack have been dispatched to your email.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rohith Varma"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Contact *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 XXXXX"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="candidate@example.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Academic Course / Fellowship *</label>
                  <select
                    value={inquiryCourse}
                    onChange={(e) => setInquiryCourse(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white font-semibold text-xs"
                  >
                    <option value="DNB Ophthalmology">DNB Ophthalmology Residency (3 Years)</option>
                    <option value="Fellowship in Cornea & Refractive">Fellowship in Cornea & Refractive Surgery (2 Years)</option>
                    <option value="Fellowship in Vitreo-Retina">Fellowship in Vitreo-Retinal Surgery (2 Years)</option>
                    <option value="Fellowship in Paediatric Ophthalmology">Fellowship in Paediatric Ophthalmology & Squint</option>
                    <option value="B.Sc Optometry Entrance">B.Sc in Optometry (4 Years Degree)</option>
                    <option value="M.Sc Clinical Optometry">M.Sc in Clinical Optometry (2 Years Post-Grad)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Highest Qualification / Degree</label>
                  <input
                    type="text"
                    placeholder="e.g. MBBS, MS Ophthalmology, or 10+2 Science"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Examination Center</label>
                  <select
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white font-semibold text-xs"
                  >
                    <option value="Sankara Eye Hospital - Bangalore">Sankara Eye Hospital - Bangalore</option>
                    <option value="Sankara Eye Hospital - Coimbatore">Sankara Eye Hospital - Coimbatore</option>
                    <option value="RJ Sankara Eye Hospital - Varanasi">RJ Sankara Eye Hospital - Varanasi</option>
                    <option value="Sankara Eye Hospital - Guntur">Sankara Eye Hospital - Guntur</option>
                    <option value="Sankara Eye Hospital - Ludhiana">Sankara Eye Hospital - Ludhiana</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full !py-3.5 text-xs font-black flex items-center justify-center gap-2 shadow-lg mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Academic Application & Generate Entrance Roll No →</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
