import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Stethoscope, 
  Building2, 
  CreditCard, 
  FileText, 
  ArrowRight, 
  HelpCircle, 
  Sparkles,
  Printer,
  Download,
  Share2
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { SPECIALTIES_DATA } from '../data/specialtiesData';
import { WHATSAPP_DEFAULT_URL } from '../data/chatbotKnowledgeData';
import { APPOINTMENT_UNITS, getUnitByRouteOrCode } from '../data/appointmentUnitsData';
import { InternationalPhoneInput } from '../components/common/InternationalPhoneInput';

interface BookAppointmentPageProps {
  navigate: (route: string) => void;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({ navigate }) => {
  const { hospitalsList, submitAppointment, showToast } = useDatabase();

  // Form State
  const [patientType, setPatientType] = useState<'new' | 'followup'>('new');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hospitalLocation, setHospitalLocation] = useState('Bangalore (Karnataka)');
  const [clinicalSpecialty, setClinicalSpecialty] = useState('Comprehensive Eye Examination & General OPD');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredSlot, setPreferredSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomsNotes, setSymptomsNotes] = useState('');
  const [paymentCategory, setPaymentCategory] = useState<'regular' | 'insurance' | 'free_scheme'>('regular');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState<any | null>(null);

  // Sync unit selection from URL hash (e.g. #/bookappointment-smg -> Shimoga)
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash || '';
      const matched = getUnitByRouteOrCode(hash);
      if (matched) {
        const found = hospitalsList.find(h => 
          h.city.toLowerCase() === matched.city.toLowerCase() ||
          h.name.toLowerCase().includes(matched.city.toLowerCase())
        );
        if (found) {
          setHospitalLocation(`${found.name} (${found.city}, ${found.state})`);
        } else {
          setHospitalLocation(matched.locationLabel);
        }
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [hospitalsList]);

  const handleHospitalChange = (newVal: string) => {
    setHospitalLocation(newVal);
    const matched = APPOINTMENT_UNITS.find(u => 
      newVal.toLowerCase().includes(u.city.toLowerCase()) || 
      newVal.toLowerCase().includes(u.name.toLowerCase())
    );
    if (matched) {
      window.location.hash = `/${matched.slug}`;
    }
  };

  // Common quick symptom tags
  const symptomTags = [
    'Blurry / Dim Vision',
    'Cataract Evaluation',
    'LASIK / Specs Removal',
    'Eye Pain / Redness',
    'Diabetes Retina Check',
    'Watering / Discharge',
    'Child Squint / Lazy Eye',
    'Glaucoma Pressure Check',
    'Floaters & Flashes'
  ];

  const toggleSymptom = (tag: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Find currently selected hospital details
  const currentHospital = hospitalsList.find(h => 
    hospitalLocation.toLowerCase().includes(h.city.toLowerCase()) || 
    hospitalLocation.toLowerCase().includes(h.name.toLowerCase())
  ) || hospitalsList[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      showToast('Please enter your full name and 10-digit mobile number.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    const compiledNotes = [
      selectedSymptoms.length > 0 ? `Selected Symptoms: ${selectedSymptoms.join(', ')}` : '',
      symptomsNotes ? `Notes: ${symptomsNotes}` : '',
      `Patient Type: ${patientType === 'new' ? 'New Patient' : 'Follow-up Visit'}`,
      `Billing Category: ${paymentCategory === 'regular' ? 'Direct OPD Consultation' : paymentCategory === 'insurance' ? 'Cashless Mediclaim / TPA' : 'Gift of Vision / Government Health Scheme'}`
    ].filter(Boolean).join(' | ');

    try {
      const record = await submitAppointment({
        patientName: patientName.trim(),
        phone: phone.trim(),
        email: email.trim() || `${patientName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        hospitalLocation,
        clinicalSpecialty,
        preferredDate,
        preferredSlot,
        patientType: patientType === 'new' ? 'New' : 'Follow-up',
        symptoms: compiledNotes
      });

      setBookingSuccessData(record);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setIsSubmitting(false);
      showToast('Booking failed. Please try again or call our helpline.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20">
      
      {/* 🔴 Hero Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-14 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Priority Outpatient (OPD) Scheduling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Book Eye Consultation Appointment
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Schedule direct consultation with super-specialty ophthalmologists across our 14 NABH-accredited hospital units. Instant digital confirmation and zero waiting queue.
          </p>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-white/90">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-200" />
              <span>NABH Accredited Care</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-200" />
              <span>Zero-Wait Priority Slot</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-200" />
              <span>14 Hospitals in 9 States</span>
            </span>
          </div>
        </div>
      </div>

      {/* Strict Print CSS - Guaranteed strictly 1 single page with print isolation */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 10mm 12mm;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            min-height: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, Helvetica, sans-serif !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden !important;
          }
          #official-appointment-print-area, #official-appointment-print-area * {
            visibility: visible !important;
          }
          #official-appointment-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            break-inside: avoid !important;
            break-after: avoid !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Success Screen */}
        {bookingSuccessData ? (
          <div className="max-w-2xl mx-auto space-y-4">
            
            {/* Screen UI Confirmation Banner (Hidden on print) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-4 text-center no-print">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-black uppercase tracking-wider">
                  Booking Reference: #{bookingSuccessData.bookingRef}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  OPD Appointment Confirmed!
                </h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Thank you, <strong>{bookingSuccessData.patientName}</strong>. Your appointment has been booked. You can print your official clinical pass below.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official Slip (1 Page)</span>
                </button>

                <button
                  onClick={() => {
                    setBookingSuccessData(null);
                    setPatientName('');
                    setPhone('');
                    setEmail('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                >
                  Book Another Patient
                </button>
              </div>
            </div>

            {/* Computer Generated Institutional Appointment Slip (Isolated Print Area) */}
            <div 
              id="official-appointment-print-area" 
              className="bg-white p-5 sm:p-6 border border-black text-black text-[11px] space-y-2.5 font-sans shadow-sm"
            >
              {/* Header: Organization & Unit Info */}
              <div className="border-b border-black pb-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src="/assets/images/sankaraeye-colored-logo.png"
                    alt="Sankara Eye Foundation"
                    className="h-12 w-auto object-contain flex-shrink-0"
                  />
                  <div>
                    <h1 className="text-sm font-black uppercase tracking-tight text-black leading-tight">
                      SRI KANCHI KAMAKOTI MEDICAL TRUST
                    </h1>
                    <h2 className="text-xs font-bold text-black uppercase tracking-tight">
                      SANKARA EYE HOSPITAL
                    </h2>
                    <p className="text-[10px] text-black mt-0.5 leading-tight">
                      Unit: <strong>{bookingSuccessData.hospitalLocation}</strong>
                    </p>
                    <p className="text-[9.5px] text-black leading-tight">
                      Sri Kanchi Kamakoti Medical Trust | Web: www.sankaraeye.com
                    </p>
                  </div>
                </div>

                <div className="text-right text-[9.5px] font-mono leading-tight flex-shrink-0 border-l border-black pl-3 space-y-0.5">
                  <div>Ref No: <strong>#{bookingSuccessData.bookingRef}</strong></div>
                  <div>NABH Certified</div>
                  <div>OPD Registration Pass</div>
                </div>
              </div>

              {/* Slip Title */}
              <div className="text-center py-1 border-y border-black font-black uppercase text-[11px] tracking-wider">
                OPD CONSULTATION APPOINTMENT PASS
              </div>

              {/* Patient & Appointment Details */}
              <div className="grid grid-cols-2 p-2 border border-black gap-x-4 gap-y-1 text-[10.5px]">
                <div><span className="text-slate-600">Patient Name:</span> <strong>{bookingSuccessData.patientName}</strong></div>
                <div><span className="text-slate-600">Contact Number:</span> <strong>{bookingSuccessData.phone}</strong></div>
                <div><span className="text-slate-600">Specialty / Department:</span> <strong>{bookingSuccessData.clinicalSpecialty}</strong></div>
                <div><span className="text-slate-600">Consultation Date:</span> <strong>{bookingSuccessData.preferredDate}</strong></div>
                <div><span className="text-slate-600">Time Slot:</span> <strong>{bookingSuccessData.preferredSlot} (Priority Entry)</strong></div>
                <div><span className="text-slate-600">Hospital Unit:</span> <strong>{bookingSuccessData.hospitalLocation}</strong></div>
              </div>

              {/* Instructions Table / Guidelines */}
              <div className="border border-black text-[10px]">
                <div className="px-2 py-0.5 font-bold text-[9px] uppercase border-b border-black">
                  Patient Guidelines on Day of Visit
                </div>
                <div className="p-2 space-y-1 text-[9.5px] leading-tight">
                  <p>1. Please report at the <strong>Ground Floor OPD Reception Desk</strong> 15 minutes prior to your allocated slot.</p>
                  <p>2. Bring a valid Government Photo ID (Aadhaar / Voter ID / DL) and previous eye prescription glasses or medical records (if any).</p>
                  <p>3. If opting for Cashless TPA / Mediclaim Insurance, kindly carry your physical policy card / e-card.</p>
                  <p>4. For dilated retina / diabetic eye evaluations, kindly be accompanied by an attendant (driving is not recommended for 2 hours post-dilation).</p>
                </div>
              </div>

              {/* Signatory & Computer Generated Stamp */}
              <div className="pt-2 border-t border-black flex items-end justify-between gap-4 text-[9.5px]">
                <div>
                  <p className="font-bold text-black">
                    * This is a computer-generated consultation slip and does not require a physical signature.
                  </p>
                  <p className="text-[9px] text-slate-700">
                    Hospital Timings: 8:30 AM – 6:00 PM | Sunday Emergency Ophthalmic Care Active
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-black text-[9.5px]">
                    SANKARA EYE HOSPITAL
                  </p>
                  <div className="pt-3 font-bold text-black text-[9px] uppercase border-t border-black inline-block">
                    Clinical Desk Coordinator
                  </div>
                </div>
              </div>

            </div>

          </div>
        ) : (

          /* ========================================================================= */
          /* 📋 FULL APPOINTMENT FORM (Two Column Modern Grid)                         */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: Comprehensive Clean Form */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
              
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. Patient Type Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                    1. Patient Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPatientType('new')}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                        patientType === 'new'
                          ? 'bg-orange-50/80 border-orange-500 text-orange-950 ring-2 ring-orange-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="font-black text-sm text-slate-900">New Patient</div>
                        <div className="text-[11px] text-slate-500 font-normal">First visit to Sankara Eye Hospital</div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${patientType === 'new' ? 'border-orange-600 bg-orange-600' : 'border-slate-300'}`}>
                        {patientType === 'new' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPatientType('followup')}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                        patientType === 'followup'
                          ? 'bg-orange-50/80 border-orange-500 text-orange-950 ring-2 ring-orange-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="font-black text-sm text-slate-900">Follow-up Visit</div>
                        <div className="text-[11px] text-slate-500 font-normal">Existing registered patient review</div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${patientType === 'followup' ? 'border-orange-600 bg-orange-600' : 'border-slate-300'}`}>
                        {patientType === 'followup' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 2. Patient Personal Details */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                    2. Patient Contact Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Patient Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number (with Country Code) <span className="text-red-500">*</span>
                      </label>
                      <InternationalPhoneInput
                        value={phone}
                        onChange={(val) => setPhone(val)}
                        placeholder="Enter mobile number"
                        required
                        defaultCountry="in"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Patient Age</label>
                      <input
                        type="number"
                        placeholder="e.g. 45"
                        min={1}
                        max={110}
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Hospital Location & Clinical Specialty */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                    3. Hospital Location & Eye Department
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Select Hospital Branch <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-orange-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={hospitalLocation}
                          onChange={(e) => handleHospitalChange(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        >
                          {hospitalsList.map((h) => (
                            <option key={h.id} value={`${h.name} (${h.city}, ${h.state})`}>
                              {h.name} — {h.city} ({h.state})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Eye Department / Specialty <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Stethoscope className="w-4 h-4 text-orange-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={clinicalSpecialty}
                          onChange={(e) => setClinicalSpecialty(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="Comprehensive Eye Examination & General OPD">Comprehensive Eye Examination & General OPD</option>
                          <option value="Cataract & Robotic Laser (FLACS)">Cataract & Robotic Laser (FLACS)</option>
                          <option value="LASIK, SMILE Pro & Blade-Free Specs Removal">LASIK, SMILE Pro & Blade-Free Specs Removal</option>
                          <option value="Cornea & Keratoconus (CXL / Transplants)">Cornea & Keratoconus (CXL / Transplants)</option>
                          <option value="Glaucoma & Eye Pressure Screening">Glaucoma & Eye Pressure Screening</option>
                          <option value="Vitreo-Retina & Diabetic Retinopathy">Vitreo-Retina & Diabetic Retinopathy</option>
                          <option value="Paediatric Ophthalmology & Squint (Strabismus)">Paediatric Ophthalmology & Squint (Strabismus)</option>
                          <option value="Oculoplasty, Ptosis & Eye Plastic Surgery">Oculoplasty, Ptosis & Eye Plastic Surgery</option>
                          <option value="Neuro-Ophthalmology & Uvea">Neuro-Ophthalmology & Uvea</option>
                          <option value="Low Vision Aids & Contact Lens Clinic">Low Vision Aids & Contact Lens Clinic</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Preferred Date & Time Slot */}
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                    4. Appointment Date & Preferred Time Slot
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Select Consultation Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Time Slot <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Morning', 'Afternoon', 'Evening'] as const).map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setPreferredSlot(slot)}
                            className={`py-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                              preferredSlot === slot
                                ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div>{slot}</div>
                            <div className="text-[9px] opacity-80">
                              {slot === 'Morning' ? '8:30 - 12:30' : slot === 'Afternoon' ? '1:00 - 4:00' : '4:00 - 6:30'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Symptoms Checklist & Free Notes */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                    5. Primary Symptoms or Reason for Visit (Optional)
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {symptomTags.map((tag) => {
                      const isSelected = selectedSymptoms.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleSymptom(tag)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                            isSelected
                              ? 'bg-orange-100 text-orange-900 border-orange-400 ring-1 ring-orange-400'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Describe any other visual difficulties, duration of symptoms, or current eye drops..."
                      value={symptomsNotes}
                      onChange={(e) => setSymptomsNotes(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* 6. Payment & Billing Scheme */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                    6. Billing & Insurance Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentCategory('regular')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        paymentCategory === 'regular'
                          ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-slate-900">Direct Consultation</div>
                      <div className="text-[10px] text-slate-500">Pay at hospital counter</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentCategory('insurance')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        paymentCategory === 'insurance'
                          ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-slate-900">Cashless Insurance / TPA</div>
                      <div className="text-[10px] text-slate-500">Star, ICICI, HDFC, Medi Assist</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentCategory('free_scheme')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        paymentCategory === 'free_scheme'
                          ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-slate-900">Ayushman / Unique Hybrid Free Care</div>
                      <div className="text-[10px] text-slate-500">PM-JAY, BPL or Gift of Vision</div>
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Your medical data is encrypted and strictly confidential.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto !py-3.5 px-8 text-xs font-black shadow-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Registering Consultation...</span>
                    ) : (
                      <>
                        <span>Confirm OPD Appointment →</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>

            {/* Right 4 Cols: Hospital Guidance, Hotline & Info Card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Selected Hospital Info Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-600" />
                  <h3 className="font-black text-sm text-slate-900">{currentHospital.name}</h3>
                </div>

                <div className="space-y-2.5 text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{currentHospital.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="font-bold text-slate-800">{currentHospital.phone}</span>
                  </div>

                  {currentHospital.emergencyPhone && (
                    <div className="flex items-center gap-2 text-orange-700 font-bold bg-orange-50 p-2 rounded-xl border border-orange-100">
                      <Phone className="w-3.5 h-3.5 text-orange-600" />
                      <span>24/7 Casualty: {currentHospital.emergencyPhone}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>OPD Hours: {currentHospital.timings}</span>
                  </div>
                </div>

                {currentHospital.headDoctor && (
                  <div className="pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-400 block font-medium">Chief Medical Officer:</span>
                    <span className="font-bold text-slate-900">{currentHospital.headDoctor}</span>
                    <span className="text-slate-500 block">{currentHospital.headDoctorRole}</span>
                  </div>
                )}
              </div>

              {/* Need Immediate WhatsApp Assistance? */}
              <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 rounded-3xl shadow-lg space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <h4 className="font-black text-sm">Need Instant WhatsApp Help?</h4>
                </div>
                <p className="text-emerald-100 text-[11px] leading-relaxed">
                  Chat directly with our Patient Care Coordinator for same-day emergency OPD slots or insurance queries.
                </p>
                <a
                  href={WHATSAPP_DEFAULT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-colors shadow-sm"
                >
                  <span>Chat on WhatsApp (+91 99528 90087)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* FAQ Help Accordion Note */}
              <div className="bg-slate-100 p-5 rounded-3xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
                  <span>Important Patient Guidance</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  • <strong>Eye Drop Dilation:</strong> Detailed retina and pediatric examinations require pupil dilation, which temporarily blurs near vision for 2-3 hours.
                </p>
                <p className="text-[11px] leading-relaxed">
                  • <strong>No Prior Appointment Needed for Emergency:</strong> Chemical eye burns and acute trauma are attended immediately at our 24/7 Casualty.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
