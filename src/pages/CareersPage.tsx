import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Upload, 
  Send, 
  ShieldCheck,
  User,
  Mail,
  Phone,
  Building2,
  Award,
  Sparkles,
  Heart,
  FileText,
  Check,
  Cpu,
  Code,
  Laptop,
  Database,
  Layers
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

interface CareersPageProps {
  navigate: (route: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ navigate }) => {
  const { submitJobApplication } = useDatabase();

  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    phone: '',
    preferredUnit: 'Bangalore',
    departmentRole: 'AI / ML Engineer (Healthcare & Computer Vision)',
    qualification: 'B.Tech / M.Tech in CS / AI / Data Science',
    experienceYears: '3-5 Years',
    currentLocation: '',
    currentOrganization: '',
    resumeFileName: '',
    coverNote: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<{ id: string; name: string } | null>(null);

  const unitsList = [
    'Bangalore (Tech Hub & Headquarters)',
    'Coimbatore (Sathy Road HQ)',
    'Varanasi (RJ Sankara Eye Hospital)',
    'Coimbatore (RS Puram)',
    'Shimoga (Harige)',
    'Guntur (Pedakakani)',
    'Ludhiana (Vipul World)',
    'Jaipur (Vidhyadhar Nagar)',
    'Kanpur (Panki)',
    'Indore (Vijay Nagar)',
    'Panvel (Navi Mumbai)',
    'Anand (Mogar)',
    'Hyderabad (Miyapur)',
    'Krishnankoil (Virudhunagar)',
    'Remote / Central In-House Tech Team',
    'Any Sankara Hospital Unit (Flexible)'
  ];

  const departmentsList = [
    'AI / ML Engineer (Healthcare & Computer Vision)',
    'Full-Stack Software Engineer (In-House Health Apps & EMR)',
    'Healthcare Data Scientist & Predictive AI Specialist',
    'Clinical Informatics & Tele-Ophthalmology Lead',
    'Mobile App Developer (iOS & Android Digital Health)',
    'UI/UX Designer & Product Lead (Digital Health)',
    'Cloud Systems & Cyber Security Engineer',
    'Ophthalmology Consultant / Surgeon',
    'Clinical Fellow (Cornea, Retina, Paediatric, Glaucoma)',
    'Optometry & Vision Science Specialist',
    'Ophthalmic Nursing & OT In-Charge',
    'Hospital Administration & TPA Mediclaim',
    'Biomedical & Diagnostic Technology',
    'HR, Finance & Operations'
  ];

  const qualificationsList = [
    'B.Tech / B.E. / M.Tech / MS in CS / AI / Data Science',
    'MCA / B.Sc / M.Sc in Computer Science / Information Technology',
    'MS / DNB / FRCS (Ophthalmology)',
    'MBBS + Fellowship (FCRS / FVRS / FPOS / FAICO)',
    'M.Optom / B.Optom (Optometry)',
    'B.Sc / M.Sc Nursing (OT Certified)',
    'MBA / MHA (Hospital Administration)',
    'Other Technical / Medical / Graduate Degree'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resumeFileName: e.target.files![0].name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const record = await submitJobApplication({
        candidateName: formData.candidateName,
        applicantName: formData.candidateName,
        email: formData.email,
        phone: formData.phone,
        preferredUnit: formData.preferredUnit,
        departmentRole: formData.departmentRole,
        qualification: formData.qualification,
        experienceYears: formData.experienceYears,
        currentLocation: formData.currentLocation,
        currentOrganization: formData.currentOrganization,
        resumeFileName: formData.resumeFileName || 'Resume_Attached.pdf',
        coverNote: formData.coverNote,
        jobTitle: formData.departmentRole
      });

      setSubmittedApplication({ id: record.id, name: formData.candidateName });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Clinical Specialties & In-House Healthcare Technology (AI/ML)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Careers in Medicine & Healthcare Technology
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Join surgeons, medical fellows, AI/ML engineers, and in-house software architects building next-generation digital health platforms and eradicating needless blindness.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Why Join Sankara (Medical + Tech AI/ML) (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="badge-sankara text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dual Engine: Medical & In-House Tech</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Pioneering AI/ML & In-House Application Engineering
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Sankara Eye Hospital empowers doctors and engineers to collaborate under one roof. Our in-house technology and AI/ML teams develop proprietary hospital management workflows, computer vision diagnostic algorithms, tele-ophthalmology engines, and patient care apps across 14 tertiary hospital hubs.
              </p>
            </div>

            {/* 4 Pillars Including Tech / AI/ML */}
            <div className="space-y-4">
              
              {/* Tech Pillar: In-House Apps & AI/ML */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 shadow-md flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-md">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">In-House Tech & AI/ML Engineering</h4>
                    <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[9px] font-extrabold px-1.5 py-0.5 rounded">NEW</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Developing real-time computer vision models for retinal disease detection, automated diagnostic triage, tele-screening networks, and cloud EMR platforms.
                  </p>
                </div>
              </div>

              {/* Medical Pillar: German Lasers */}
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Cutting-Edge Surgical Laser Suites</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Operate on German Schwind Amaris 1050RS 7D eye-trackers, robotic FLACS cataract systems, and SWEPT Source OCTs.
                  </p>
                </div>
              </div>

              {/* 14 Tertiary Hospitals */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">14 Tertiary Hospitals Nationwide</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Opportunities across Bangalore, Coimbatore, Varanasi, Shimoga, Guntur, Panvel, Indore, Jaipur, Kanpur, Ludhiana, and Anand.
                  </p>
                </div>
              </div>

              {/* Academy Fellowship */}
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Sankara Academy of Vision & Research</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Fellowship training, clinical data science research, international journal publications, and CME programs.
                  </p>
                </div>
              </div>
            </div>

            {/* HR Contact Box */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-2 text-xs">
              <div className="font-bold text-orange-400 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Central HR & Tech Talent Acquisition</span>
              </div>
              <p className="text-slate-300 text-xs">
                Direct inquiries: <strong className="text-white">hr@sankaraeye.com</strong> | <strong className="text-white">tech.careers@sankaraeye.com</strong>
              </p>
            </div>
          </div>

          {/* Right Column: Open Talent Pool Application Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-orange-200 shadow-xl space-y-6">
              
              {submittedApplication ? (
                /* Success Confirmation State */
                <div className="text-center py-10 space-y-5">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Application Received!</h3>
                    <p className="text-xs text-slate-500">
                      Application Reference ID: <strong className="text-orange-600 font-mono">#{submittedApplication.id}</strong>
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-900">{submittedApplication.name}</strong>. Your profile has been logged in the Sankara Talent & HR Portal. Our recruitment panel will review your credentials and get in touch.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmittedApplication(null);
                      setFormData({
                        candidateName: '',
                        email: '',
                        phone: '',
                        preferredUnit: 'Bangalore',
                        departmentRole: 'AI / ML Engineer (Healthcare & Computer Vision)',
                        qualification: 'B.Tech / M.Tech in CS / AI / Data Science',
                        experienceYears: '3-5 Years',
                        currentLocation: '',
                        currentOrganization: '',
                        resumeFileName: '',
                        coverNote: ''
                      });
                    }}
                    className="btn-outline-orange text-xs !py-2.5 font-bold"
                  >
                    Submit Another Application →
                  </button>
                </div>
              ) : (
                /* Main Application Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="badge-sankara text-xs mb-1">
                      <Send className="w-3 h-3" />
                      <span>Direct Talent Submission</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Apply to Join Sankara Eye Hospital
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Submit your application for Clinical, In-House Technology / AI-ML, Nursing, or Administrative roles across our 14 hospital units.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">
                        Full Name & Title <span className="text-orange-600">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Vivek Bhattacharya / Rahul Sharma"
                          value={formData.candidateName}
                          onChange={(e) => setFormData(prev => ({ ...prev, candidateName: e.target.value }))}
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Email Address <span className="text-orange-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="candidate@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Phone / WhatsApp <span className="text-orange-600">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98450 12345"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                        />
                      </div>
                    </div>

                    {/* Department / Role Interest */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>Department / Target Role <span className="text-orange-600">*</span></span>
                        <span className="text-[10px] text-orange-600 font-bold">Includes AI/ML & In-House Tech</span>
                      </label>
                      <select
                        value={formData.departmentRole}
                        onChange={(e) => setFormData(prev => ({ ...prev, departmentRole: e.target.value }))}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white font-medium"
                      >
                        {departmentsList.map((dept, dIdx) => (
                          <option key={dIdx} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Hospital Unit */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Preferred Location / Unit <span className="text-orange-600">*</span>
                      </label>
                      <select
                        value={formData.preferredUnit}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredUnit: e.target.value }))}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white font-medium"
                      >
                        {unitsList.map((unit, uIdx) => (
                          <option key={uIdx} value={unit.split(' ')[0]}>{unit}</option>
                        ))}
                      </select>
                    </div>

                    {/* Highest Qualification */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Highest Qualification <span className="text-orange-600">*</span>
                      </label>
                      <select
                        value={formData.qualification}
                        onChange={(e) => setFormData(prev => ({ ...prev, qualification: e.target.value }))}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white font-medium"
                      >
                        {qualificationsList.map((qual, qIdx) => (
                          <option key={qIdx} value={qual}>{qual}</option>
                        ))}
                      </select>
                    </div>

                    {/* Experience Years */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Experience Level
                      </label>
                      <select
                        value={formData.experienceYears}
                        onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white font-medium"
                      >
                        <option value="Fresher / College Graduate">Fresher / College Graduate</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="6-10 Years">6-10 Years</option>
                        <option value="10+ Years (Lead / Senior Consultant)">10+ Years (Lead / Senior Consultant)</option>
                      </select>
                    </div>

                    {/* Current Organization */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Current Company / Hospital & City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Infosys, Bangalore / Fortis / Freelance"
                        value={formData.currentOrganization}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentOrganization: e.target.value }))}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                      />
                    </div>

                    {/* Resume Attachment */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">
                        Attach Resume / CV (PDF or DOC)
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-orange-400 transition-colors bg-slate-50/60 relative cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                          <Upload className="w-5 h-5 text-orange-600" />
                          <span className="text-xs font-bold text-slate-800">
                            {formData.resumeFileName || 'Click to select or drag & drop Resume / CV'}
                          </span>
                          <span className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</span>
                        </div>
                      </div>
                    </div>

                    {/* Statement of Purpose / Cover Note */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700">
                        Brief Cover Note / Tech Stack / Clinical Interests
                      </label>
                      <textarea
                        rows={3}
                        placeholder="For Tech: Mention your programming languages, AI/ML frameworks (PyTorch, TensorFlow, OpenCV), React/Node... / For Medical: Clinical & surgical interests..."
                        value={formData.coverNote}
                        onChange={(e) => setFormData(prev => ({ ...prev, coverNote: e.target.value }))}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full !py-3.5 text-xs font-bold shadow-lg flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application to HR...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application to Talent Pool →</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your application details are confidential and reviewed exclusively by Sankara HR.</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
