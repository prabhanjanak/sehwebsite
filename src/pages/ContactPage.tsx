import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  ExternalLink,
  MessageSquare,
  GraduationCap,
  Heart,
  Briefcase,
  Search,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { useDatabase } from '../context/DatabaseContext';
import { InteractiveIndiaMap } from '../components/common/InteractiveIndiaMap';

interface ContactPageProps {
  navigate: (route: string) => void;
}

// Scraped Central Department Desks from sankaraeye.com/contact/
const CENTRAL_DEPARTMENTS = [
  {
    title: 'General Enquiries & Feedback',
    email: 'info@sankaraeye.com',
    icon: MessageSquare,
    desc: 'Patient care feedback, general hospital assistance, and clinical queries.',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700'
  },
  {
    title: 'Education & Academics',
    email: 'director.sav@sankaraeye.com',
    icon: GraduationCap,
    desc: 'Sankara Academy of Vision, DNB Ophthalmology, Fellowships & Optometry.',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700'
  },
  {
    title: 'Donations & Philanthropy',
    email: 'donations@sankaraeye.com',
    icon: Heart,
    desc: 'Section 80G(5)(vi) tax receipts, Gift of Vision sponsorships, and CSR.',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700'
  },
  {
    title: 'Careers & Recruitment',
    email: 'careers.sefi@sankaraeye.com',
    icon: Briefcase,
    desc: 'Ophthalmologist positions, surgical nursing, optometry, and administrative roles.',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700'
  }
];

// Scraped Hospital Contact Details from sankaraeye.com/contact/
interface HospitalContactDetail {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  workingHours: string;
  sundayHours: string;
  tel: string;
  mobile: string;
  tollFree?: string;
  email: string;
  altEmail?: string;
  eyeBankPhone?: string;
  mapUrl: string;
  summary: string;
}

const SCRAPED_HOSPITAL_CONTACTS: HospitalContactDetail[] = [
  {
    id: 'anand',
    name: 'Sankara Eye Hospital, Anand',
    city: 'Anand',
    state: 'Gujarat',
    address: 'National Highway No.8, Mogar, Anand – 388340 (Gujarat)',
    workingHours: '8:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: 'Sunday (Emergency Services 24/7)',
    tel: '02692-280450 / 60',
    mobile: '+91 90990 45217',
    tollFree: '1800 233 1214',
    email: 'anand@sankaraeye.com',
    mapUrl: 'https://goo.gl/maps/KmF2Tbpz92G2',
    summary: 'Established in 2008 in Mogar, serving the Charotar belt with tertiary cataract, cornea, and pediatric care.'
  },
  {
    id: 'bangalore',
    name: 'Sankara Eye Hospital, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    address: 'Varthur Main Road, Kundalahalli Gate, Bangalore – 560037',
    workingHours: '9:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 1:00 PM (Sunday)',
    tel: '080-69038900 to 080-69038999',
    mobile: '+91 97392 70477',
    email: 'bangalore@sankaraeye.com',
    altEmail: 'blr.appointments@sankaraeye.com',
    eyeBankPhone: '7619519555',
    mapUrl: 'https://goo.gl/maps/5i2wXK9Uqg72',
    summary: '90,000 sq.ft state-of-the-art super-specialty facility equipped with German SCHWIND 7D LASIK and 24/7 Eye Bank.'
  },
  {
    id: 'coimbatore-hq',
    name: 'Sankara Eye Hospital, Coimbatore (Headquarters)',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    address: 'Sathy Road, Sivanandapuram, Saravanampatti, Coimbatore – 641035',
    workingHours: '9:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 6:00 PM (Sunday)',
    tel: '0422-3116789, 0422-3500897 / 898 / 899',
    mobile: '+91 99424 26000',
    email: 'coimbatore@sankaraeye.com',
    eyeBankPhone: '9965511174',
    mapUrl: 'https://goo.gl/maps/9fzPcoMD9k12',
    summary: '500-bed apex institution on 5 acres land. Founding headquarters of the 80:20 self-sustaining model and Academy of Vision.'
  },
  {
    id: 'coimbatore-city',
    name: 'Sankara Eye Hospital, Coimbatore (City Centre)',
    city: 'Coimbatore (RS Puram)',
    state: 'Tamil Nadu',
    address: '2nd Floor, Srivari Kikani Centre, Dr. Krishnasamy Mudaliyar Road, RS Puram, Coimbatore – 641002',
    workingHours: '9:00 AM – 8:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 1:30 PM (Sunday)',
    tel: '0422-3106789',
    mobile: '+91 99655 11130',
    email: 'pc.cbecity@sankaraeye.com',
    eyeBankPhone: '0422-3116789, 9965511174',
    mapUrl: 'https://goo.gl/maps/xjQJZ56fGpF2',
    summary: 'Day-care surgical and diagnostic clinic located next to Chinthamani Super Market in the heart of Coimbatore.'
  },
  {
    id: 'guntur',
    name: 'Sankara Eye Hospital, Guntur',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    address: 'Vijayawada Expressway, Pedakakani, Guntur – 522509',
    workingHours: '9:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 1:30 PM (Sunday)',
    tel: '0863-2347800',
    mobile: '+91 96666 77504',
    email: 'guntur@sankaraeye.com',
    eyeBankPhone: '0863-2594100, 9951604126',
    mapUrl: 'https://goo.gl/maps/vQpqReyeamp',
    summary: '225-bed high-volume surgical facility on 4.35 acres land, serving coastal Andhra Pradesh and rural community outreaches.'
  },
  {
    id: 'jaipur',
    name: 'Sankara Eye Hospital, Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Plot No. 6, Sector 6, Near Cinestar Cinema, Central Spine, Vidhyadhar Nagar, Jaipur – 302039',
    workingHours: '8:00 AM – 7:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 5:00 PM (Sunday)',
    tel: '0141-2256900',
    mobile: '+91 73574 44473',
    email: 'jaipur@sankaraeye.com',
    eyeBankPhone: '+91 93589 20080',
    mapUrl: 'https://goo.gl/maps/HPKkFSxejYo',
    summary: 'Tertiary centre of excellence with advanced modular operation theatres, cornea transplants, and pediatric vision care.'
  },
  {
    id: 'kanpur',
    name: 'Sankara Eye Hospital, Kanpur',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    address: 'Village Panau Purwa, Amiliha, Post Tatiyaganj, Kanpur Nagar – 209217',
    workingHours: '9:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: 'Sunday (Closed)',
    tel: '0512-2891000',
    mobile: '+91 80049 38219',
    email: 'kanpur@sankaraeye.com',
    mapUrl: 'https://goo.gl/maps/KjaXaZCCPzL2',
    summary: 'Full-spectrum ophthalmology services providing uncompromised eye care across the industrial belt of Uttar Pradesh.'
  },
  {
    id: 'krishnankoil',
    name: 'Sankara Eye Hospital, Krishnankoil',
    city: 'Krishnankoil',
    state: 'Tamil Nadu',
    address: 'Kunnur PO, Srivilliputhur Taluk, Virudhunagar Dist, Krishnankoil – 626190',
    workingHours: '9:00 AM – 6:00 PM (Monday to Sunday)',
    sundayHours: '9:00 AM – 6:00 PM (Sunday Emergency)',
    tel: '04563-289029',
    mobile: '+91 99655 11183',
    email: 'krishnankoil@sankaraeye.com',
    mapUrl: 'https://goo.gl/maps/Y4TXjZKYWrL2',
    summary: '225-bed tertiary eye hospital on 6.1 acres land, serving agricultural and rural communities across southern Tamil Nadu.'
  },
  {
    id: 'ludhiana',
    name: 'Sankara Eye Hospital, Ludhiana',
    city: 'Ludhiana',
    state: 'Punjab',
    address: 'Vipul World, Village Bhanohar, Post Dhaka Near Wadi Haveli, Ferozepur Road, Ludhiana – 141101',
    workingHours: '9:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: 'Sunday (Closed)',
    tel: '0161-5202000',
    mobile: '+91 87250 00279 / 87250 00289',
    email: 'ludhiana@sankaraeye.com',
    mapUrl: 'https://goo.gl/maps/PQ4kLNU4Xwm',
    summary: '125-bed facility with 100 beds dedicated to 100% free rural patients, serving Punjab and neighbouring northern states.'
  },
  {
    id: 'shimoga',
    name: 'Sankara Eye Hospital, Shimoga',
    city: 'Shimoga',
    state: 'Karnataka',
    address: 'Thirthahalli Road, Harakere, Shimoga – 577202',
    workingHours: '8:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 1:00 PM (Sunday)',
    tel: '08182-222099 / 100',
    mobile: '+91 90085 00116',
    email: 'shimoga@sankaraeye.com',
    eyeBankPhone: '08182-222123 / 9611167158',
    mapUrl: 'https://goo.gl/maps/uvvwR77VdUn',
    summary: '225-bed hospital situated amidst lush greenery, serving the Malnad region of Karnataka since October 2008.'
  },
  {
    id: 'indore',
    name: 'Sankara Eye Hospital, Indore',
    city: 'Indore',
    state: 'Madhya Pradesh',
    address: 'Scheme No 74C, Vijay Nagar, Indore, Madhya Pradesh – 452010',
    workingHours: '9:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 5:00 PM (Sunday)',
    tel: '0731-4744747',
    mobile: '+91 98545 98445',
    email: 'indore@sankaraeye.com',
    eyeBankPhone: '+91 62329 06013',
    mapUrl: 'https://goo.gl/maps/UjFKJfnRRzgqfcJT6',
    summary: 'Central India hub providing comprehensive retina, cornea, and cataract micro-surgeries with tribal outreach units.'
  },
  {
    id: 'panvel',
    name: 'Sankara Eye Hospital, Panvel (Navi Mumbai)',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    address: 'Plot No: 13, Sector 5A, New Panvel East, Navi Mumbai, Maharashtra – 410206',
    workingHours: '9:00 AM – 8:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 6:00 PM (Sunday & Holidays)',
    tel: '022-65454300',
    mobile: '+91 77387 73914 / +91 72089 34916',
    email: 'panvel@sankaraeye.com',
    eyeBankPhone: '+91 88284 34354',
    mapUrl: 'https://goo.gl/maps/GdHzq1i2py4i2ZBW6',
    summary: 'State-of-the-art operation theatre complex, day care surgery, outpatient clinics, and Konkan gateway eye care.'
  },
  {
    id: 'hyderabad',
    name: 'Sankara Eye Hospital, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Syno: 188/2, Rajendra Nagar, Financial District, Narsingi Village, Ranga Reddy, Hyderabad – 500089',
    workingHours: '9:00 AM – 8:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 6:00 PM (Sunday)',
    tel: '040-23456600',
    mobile: '+91 78458 78423',
    email: 'hyderabad@sankaraeye.com',
    mapUrl: 'https://goo.gl/maps/K5eHSp1VBSzvkixr9',
    summary: 'Advanced eye care flagship in the IT corridor of Hyderabad with dedicated Cornea, SMILE Pro, and research laboratories.'
  },
  {
    id: 'varanasi',
    name: 'RJ Sankara Eye Hospital, Varanasi',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    address: 'S.M. Plot No 193, 194 Ring Road Phase-I, Madhopur, Tehsil Pindra, Varanasi – 221003',
    workingHours: '9:00 AM – 6:00 PM (Monday to Saturday)',
    sundayHours: '9:00 AM – 1:00 PM (Sunday)',
    tel: '0542-3506789',
    mobile: '+91 91510 11183',
    email: 'varanasi@sankaraeye.com',
    mapUrl: 'https://goo.gl/maps/QHDJPATBG22EiLYw8',
    summary: 'Purvanchal super-specialty hospital inaugurated by the Hon. Prime Minister, catering to Eastern UP, Bihar, and Nepal.'
  }
];

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const { submitContactMessage, showToast, openAppointmentModal } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('ALL');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hospitalBranch: 'Coimbatore (Headquarters)',
    subject: 'General Consultation Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please fill in required fields (Name, Phone, Message)');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactMessage(formData);
      setSubmittedSuccess(true);
      showToast('Inquiry message submitted successfully! Our team will contact you shortly.');
    } catch (e) {
      console.error(e);
      showToast('Error submitting inquiry. Please call our central helpline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statesList = ['ALL', ...Array.from(new Set(SCRAPED_HOSPITAL_CONTACTS.map(h => h.state)))];

  const filteredHospitals = SCRAPED_HOSPITAL_CONTACTS.filter(hosp => {
    const matchesSearch = 
      hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hosp.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = selectedStateFilter === 'ALL' || hosp.state === selectedStateFilter;
    return matchesSearch && matchesState;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 🌟 Premium Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide">
            <Phone className="w-3.5 h-3.5" />
            <span>24/7 Clinical Helplines & Nationwide Hospital Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Contact Us & Hospital Coordinates
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Connect with our central mission headquarters, 24/7 Eye Bank retrieval network, or get exact addresses, phone numbers, and OPD timings for all 14 super-specialty hospital units across India.
          </p>

          {/* Quick Direct Hotline Strip */}
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
            <a 
              href="tel:08069038900" 
              className="inline-flex items-center gap-2 bg-white text-orange-700 px-4 py-2 rounded-xl shadow-md hover:bg-orange-50 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              <span>Central Helpline: 080-69038900</span>
            </a>
            <a 
              href="tel:7619519555" 
              className="inline-flex items-center gap-2 bg-slate-950 text-white px-4 py-2 rounded-xl shadow-md hover:bg-slate-900 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>24/7 Eye Bank: 7619519555</span>
            </a>
            <a 
              href="https://wa.me/919952890087" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Coordinator: +91 99528 90087</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* 🗺️ INTERACTIVE INDIA MAP (PROMINENT AT TOP) */}
        <section className="space-y-4">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-black uppercase tracking-wider">
              Interactive Geographic Navigator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Locate Sankara Eye Hospitals Across India
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Hover or click on any state across our nationwide network to view direct hospital coordinates, patient facilities, and immediate OPD booking links.
            </p>
          </div>

          {/* Interactive Vector Map Component */}
          <div className="pt-2">
            <InteractiveIndiaMap navigate={navigate} />
          </div>
        </section>

        {/* 🏛️ CENTRAL MISSION HEADQUARTERS & KEY DEPARTMENT DESKS */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Building2 className="w-6 h-6 text-orange-600" />
              <span>Mission Headquarters & Department Desks</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Direct departmental communication channels for patient feedback, education, 80G tax donations, and medical careers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CENTRAL_DEPARTMENTS.map((dept, idx) => {
              const Icon = dept.icon;
              return (
                <div 
                  key={idx} 
                  className={`rounded-3xl p-6 border ${dept.borderColor} ${dept.bgColor} shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${dept.textColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{dept.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{dept.desc}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <a 
                      href={`mailto:${dept.email}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 hover:text-orange-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-orange-500" />
                      <span>{dept.email}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🏥 COMPREHENSIVE DIRECTORY OF ALL 14 HOSPITAL BRANCHES */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <MapPin className="w-6 h-6 text-orange-600" />
                <span>All 14 Hospital Branches & Eye Bank Numbers ({filteredHospitals.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Complete addresses, telephone lines, mobile contacts, and verified Google Maps locations.
              </p>
            </div>

            {/* State Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {statesList.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStateFilter(st)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedStateFilter === st
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st === 'ALL' ? 'All States' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Filter */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, hospital name, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
          </div>

          {/* Hospital Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hosp) => (
              <div 
                key={hosp.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                      {hosp.city}, {hosp.state}
                    </span>
                    <a
                      href={hosp.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-600 font-bold hover:underline flex items-center gap-1 opacity-80 group-hover:opacity-100"
                    >
                      <span>Map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-orange-600 transition-colors">
                    {hosp.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hosp.address}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-800">{hosp.workingHours}</div>
                        <div className="text-[11px] text-slate-500">{hosp.sundayHours}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <div className="font-bold text-slate-900">
                        Tel: <a href={`tel:${hosp.tel.split('/')[0].replace(/[^0-9]/g, '')}`} className="hover:underline">{hosp.tel}</a>
                      </div>
                    </div>

                    {hosp.mobile && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <div className="font-medium text-slate-800">
                          Mob: <a href={`tel:${hosp.mobile.replace(/[^0-9]/g, '')}`} className="hover:underline">{hosp.mobile}</a>
                        </div>
                      </div>
                    )}

                    {hosp.tollFree && (
                      <div className="flex items-center gap-2 text-emerald-700 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Toll Free: {hosp.tollFree}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${hosp.email}`} className="font-mono text-[11px] text-slate-700 hover:text-orange-600 truncate">
                        {hosp.email}
                      </a>
                    </div>

                    {hosp.eyeBankPhone && (
                      <div className="p-2 bg-orange-50/70 border border-orange-100 rounded-xl text-[11px] text-orange-900 font-bold flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-orange-600" />
                          <span>24/7 Eye Bank:</span>
                        </span>
                        <a href={`tel:${hosp.eyeBankPhone.replace(/[^0-9]/g, '')}`} className="underline">
                          {hosp.eyeBankPhone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => openAppointmentModal(hosp.id)}
                    className="flex-1 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold text-center transition-all shadow-sm cursor-pointer"
                  >
                    Book Appointment
                  </button>
                  <a
                    href={hosp.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="View on Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inquiry Form & Headquarters Details */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-t border-slate-200 pt-12">
          
          {/* Consultation & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border-2 border-orange-200 shadow-xl space-y-6">
            <div>
              <span className="badge-sankara text-xs mb-1">Direct Consultation Desk</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Send an Inquiry or Message</h3>
              <p className="text-xs text-slate-500 mt-1">
                Our central patient care team will review your query and get back to you within 2–4 working hours.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center space-y-3 text-xs text-emerald-900">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-emerald-900">Inquiry Submitted Successfully!</h4>
                <p className="text-emerald-800">
                  Thank you, <strong>{formData.name}</strong>. A confirmation message has been recorded and our team will call/email you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedSuccess(false)}
                  className="mt-2 text-xs font-bold text-emerald-700 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number (10 digits) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preferred Hospital Branch</label>
                    <select
                      value={formData.hospitalBranch}
                      onChange={(e) => setFormData({ ...formData, hospitalBranch: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                      {SCRAPED_HOSPITAL_CONTACTS.map((hosp) => (
                        <option key={hosp.id} value={hosp.name}>
                          {hosp.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject / Inquiry Type</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message / Medical Query *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your eye condition, inquiry, feedback, or appointment preference..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full !py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Send Inquiry Message →'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Headquarters Secretariat & Trust Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-5 shadow-2xl">
              <span className="badge-sankara text-xs">Trust Secretariat</span>
              <h3 className="text-xl font-black tracking-tight">Coimbatore Central Headquarters</h3>
              
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Sri Kanchi Kamakoti Medical Trust</strong><br />
                Sathy Road, Sivanandapuram, Saravanampatti,<br />
                Coimbatore, Tamil Nadu – 641035, India.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span><strong>HQ Landline:</strong> 0422-4234200 / 0422-3116789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-orange-400" />
                  <span><strong>Sri Jayendra Eye Bank:</strong> 9965511174</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span><strong>Official Email:</strong> info@sankaraeye.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span><strong>Working Hours:</strong> Mon – Sat: 8:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span><strong>Emergency Care:</strong> 24/7 round-the-clock</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://goo.gl/maps/9fzPcoMD9k12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Open HQ in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
