import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Heart, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Eye, 
  Target, 
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Quote,
  Clock,
  MapPin,
  TrendingUp,
  FileText,
  UserCheck
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import { InteractiveVisionMission } from '../components/common/InteractiveVisionMission';
import { InteractiveIndiaMap } from '../components/common/InteractiveIndiaMap';

interface AboutPageProps {
  navigate: (route: string) => void;
}

// 50-Year Golden Jubilee Milestones (1977 - 2026) with Authentic Unit & Event Photography
interface Milestone {
  year: string;
  title: string;
  location: string;
  description: string;
  tag: string;
  image: string;
  highlight?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    year: '1977',
    title: 'Genesis of Sri Kanchi Kamakoti Medical Centre',
    location: 'Coimbatore, Tamil Nadu',
    description: 'Dr. R.V. Ramani and Dr. Radha Ramani established a voluntary primary healthcare dispensary under the divine guidance and blessings of His Holiness Jagadguru Sri Jayendra Saraswathi Swamigal of Sri Kanchi Kamakoti Peetham.',
    tag: 'Foundational Genesis',
    image: '/assets/images/sankara-beginning-1977.jpg',
    highlight: true
  },
  {
    year: '1985',
    title: 'First Super-Specialty Sankara Eye Hospital',
    location: 'Sivanandapuram, Saravanampatti, Coimbatore',
    description: 'Foundation of the Coimbatore Mission Head Quarters base hospital, consecrating the institutional focus on preventable and curable blindness across rural Tamil Nadu.',
    tag: 'Mission Head Quarters',
    image: '/assets/images/Sankara-hq-sq.jpg'
  },
  {
    year: '1990',
    title: 'Launch of "Gift of Vision" & 80:20 Model',
    location: 'Rural Outreach Movement',
    description: 'Aligned with Mahatma Gandhi’s philosophy that "India lives in the villages", the revolutionary 80:20 self-sustaining cross-subsidy rural eye care model was consecrated in partnership with Rotary International.',
    tag: '80:20 Innovation',
    image: '/assets/images/gift-of-vision-program.png',
    highlight: true
  },
  {
    year: '2001',
    title: 'Coimbatore City Centre Unit',
    location: 'RS Puram, Coimbatore',
    description: 'Established the central urban facility for rapid outpatient examinations, refractive consultations, and diagnostic screening.',
    tag: 'Urban Access',
    image: '/assets/images/Sankara-coimbatore-city-sq.jpg'
  },
  {
    year: '2003',
    title: 'Sankara Eye Hospital Krishnankoil',
    location: 'Virudhunagar District, Tamil Nadu',
    description: 'Expanded deep into southern Tamil Nadu to provide 100% free rural cataract surgeries for agricultural laborers and weavers.',
    tag: 'Rural Southern Hub',
    image: '/assets/images/Sankara-krishnankoil-sq.jpg'
  },
  {
    year: '2004',
    title: 'Sankara Eye Hospital Guntur',
    location: 'Pedakakani, Andhra Pradesh',
    description: 'First national replication outside Tamil Nadu, made possible through international partnership with Sankara Eye Foundation USA.',
    tag: 'National Replication',
    image: '/assets/images/Sankara-guntur-sq.jpg'
  },
  {
    year: '2007',
    title: 'Sankara Eye Hospital Shimoga',
    location: 'Malnad Region, Karnataka',
    description: 'Land gifted to establish a modern super-specialty eye hospital serving the Malnad and Central Karnataka rural belt.',
    tag: 'Malnad Pioneer',
    image: '/assets/images/Sankara-shimoga-sq.jpg'
  },
  {
    year: '2008',
    title: 'Bangalore Flagship & Anand Hospital',
    location: 'Whitefield (Bengaluru) & Mogar (Gujarat)',
    description: 'Simultaneous milestone launches: Bengaluru super-specialty laser hub and the Charotar Center of Excellence in Anand, Gujarat.',
    tag: 'Dual Flagships',
    image: '/assets/images/Sankara-Bangalore-sq.jpg',
    highlight: true
  },
  {
    year: '2012',
    title: 'Sankara Eye Hospital Ludhiana',
    location: 'South City, Ludhiana, Punjab',
    description: 'Advanced North India tertiary retina hub and dedicated Diabetic Retinopathy screening fleet covering rural Punjab.',
    tag: 'North India Hub',
    image: '/assets/images/Sankara-ludhiana-sq.jpg'
  },
  {
    year: '2014',
    title: 'Millionth Surgery & Jaipur Hospital',
    location: 'Vidhyadhar Nagar, Jaipur, Rajasthan',
    description: 'Historic milestone of delivering the 1,000,000th free eye surgery in India, alongside the inauguration of the Jaipur desert eye care hospital.',
    tag: '1 Million Free Surgeries',
    image: '/assets/images/Sankara-jaipur-sq.jpg',
    highlight: true
  },
  {
    year: '2015',
    title: 'Sankara Eye Hospital Kanpur',
    location: 'Chakeri, GT Road, Uttar Pradesh',
    description: 'Jaslok Chanrai Community Eye Care facility established to eliminate preventable blindness across the industrial and rural belts of central UP.',
    tag: 'Central UP Hub',
    image: '/assets/images/Sankara-kanpur-sq.jpg'
  },
  {
    year: '2017',
    title: 'Sankara Eye Hospital Indore',
    location: 'Bicholi Mardana, Madhya Pradesh',
    description: 'Central India tertiary hub inaugurated with specialized pediatric ophthalmology and tribal vision screening units.',
    tag: 'Central India',
    image: '/assets/images/Sankara-indore-sq.jpg'
  },
  {
    year: '2019',
    title: 'Panvel (Mumbai) & Padma Shri Award',
    location: 'Navi Mumbai & Rashtrapati Bhavan, New Delhi',
    description: 'R. Jhunjhunwala Sankara Eye Hospital opened in Maharashtra. Founder Dr. R.V. Ramani conferred the Padma Shri by the President of India for monumental contributions to medicine.',
    tag: 'Padma Shri Honor',
    image: '/assets/images/Sankara-panvel-sq.jpg',
    highlight: true
  },
  {
    year: '2021',
    title: 'Sankara Eye Hospital Hyderabad',
    location: 'Gachibowli Financial District, Telangana',
    description: 'State-of-the-art super-specialty IT corridor hospital with advanced eye research wings and femtosecond laser suites.',
    tag: 'Telangana Flagship',
    image: '/assets/images/HYD-3.jpg'
  },
  {
    year: '2023 - 2024',
    title: 'RJ Sankara Eye Hospital Varanasi',
    location: 'Harahua, Varanasi, Uttar Pradesh',
    description: 'Inaugurated by the Hon’ble Prime Minister of India, creating the largest and most advanced eye hospital in the Purvanchal region.',
    tag: 'Purvanchal Gateway',
    image: '/assets/images/RJSEH-Varanasi-Front-view.jpg',
    highlight: true
  },
  {
    year: '2026',
    title: '50 Years Golden Jubilee Celebrations',
    location: 'Nationwide Network Across India',
    description: 'Celebrating 50 Golden Years (1977 - 2026): 2.6 Million+ Free Surgeries, 14 Super-Specialty Hospitals across 10 States, and 100% NABH Quality.',
    tag: '50-Year Golden Jubilee',
    image: '/assets/images/Sankara-50th-Year-Logo.png',
    highlight: true
  }
];

// Authentic Board of Trustees Data with Live Scraped Portraits
interface TrusteeMember {
  name: string;
  role: string;
  description: string;
  badge?: string;
  image: string;
}

const BOARD_OF_TRUSTEES: TrusteeMember[] = [
  {
    name: 'Dr. S.V. Balasubramaniam',
    role: 'Chairman',
    description: 'Eminent industrialist, philanthropist, and community health visionary guiding the strategic and institutional governance of the Trust.',
    badge: 'Chairman',
    image: '/assets/images/dr-sv-balasubramaniam.png'
  },
  {
    name: 'Dr. R.V. Ramani',
    role: 'Founder & Managing Trustee',
    description: 'Padma Shri Awardee (2019). Visionary architect of the 80:20 self-sustaining rural eye care model with over 45 years of service.',
    badge: 'Founder & Managing Trustee',
    image: '/assets/images/dr-rv-ramani.jpg'
  },
  {
    name: 'Dr. P.G. Visvanathan',
    role: 'Trustee & ENT Surgeon',
    description: 'Renowned senior ENT surgeon and healthcare administrator ensuring the highest benchmarks of surgical sterility and patient care.',
    badge: 'Trustee',
    image: '/assets/images/admin-ajax-8.png'
  },
  {
    name: 'Dr. S.R. Rao',
    role: 'Trustee & Head of Rao Hospitals',
    description: 'Distinguished medical leader and head of Rao Hospitals, contributing vital institutional governance and clinical ethics.',
    badge: 'Trustee',
    image: '/assets/images/admin-ajax-9.png'
  },
  {
    name: 'Dr. S. Balasubramaniam',
    role: 'Trustee & Senior Eye Surgeon',
    description: 'Pioneering ophthalmic surgeon deeply involved in clinical subspecialty development, residency programs, and surgical excellence.',
    badge: 'Trustee',
    image: '/assets/images/admin-ajax-10.png'
  },
  {
    name: 'Shri. Jagdish M. Chanrai',
    role: 'Trustee & Philanthropist',
    description: 'Global humanitarian and philanthropist, instrumental in establishing international endowments and community outreach wings.',
    badge: 'Trustee',
    image: '/assets/images/admin-ajax-11.png'
  },
  {
    name: 'Mrs. Seetha Chandrasekar',
    role: 'Trustee & Chartered Accountant',
    description: 'Veteran finance professional overseeing rigorous audit compliance, statutory governance, and 100% financial transparency.',
    badge: 'Trustee & CA',
    image: '/assets/images/admin-ajax-13.png'
  },
  {
    name: 'Shri. M.N. Padmanaban',
    role: 'Trustee, Agriculturist & Industrialist',
    description: 'Leading agricultural pioneer and industrialist connecting rural farming communities with Sankara’s free village screening camps.',
    badge: 'Trustee',
    image: '/assets/images/admin-ajax-14.png'
  },
  {
    name: 'Mrs. Rekha Jhunjhunwala',
    role: 'Trustee & Philanthropist',
    description: 'Distinguished philanthropist and patron of the R. Jhunjhunwala Sankara Eye Hospitals, championing affordable healthcare for all.',
    badge: 'Trustee',
    image: '/assets/images/Mrs.Rekha-Jhunjhunwala.jpeg'
  }
];

// Authentic Steering Council Data with Live Original Portraits
const STEERING_COUNCIL = [
  { 
    name: 'Prof. V. Kamakoti', 
    role: 'Director – IIT Madras', 
    desc: 'Guiding digital health integration, AI in ophthalmology, and indigenous medical device innovation.',
    image: '/assets/images/prof-kamakoti.jpg'
  },
  { 
    name: 'Mr. P. Jayendra', 
    role: 'Founder of Real Image Media Technologies', 
    desc: 'Advising on high-impact public awareness campaigns, digital outreach, and media communications.',
    image: '/assets/images/admin-ajax-17.png'
  },
  { 
    name: 'Mr. S.G. Murali', 
    role: 'Chief Financial Officer – T.V.S. Motor Company Ltd', 
    desc: 'Advising on institutional fiscal strategy, capital budgeting, and sustainable operational scaling.',
    image: '/assets/images/admin-ajax-18.png'
  },
  { 
    name: 'Mr. Bhaskar Bhat', 
    role: 'Chairman – Tata SIA Airlines Ltd & Former MD Titan', 
    desc: 'Guiding corporate governance, service excellence benchmarks, and brand stewardship.',
    image: '/assets/images/admin-ajax-20.png'
  },
  { 
    name: 'Dr. P. Janakiraman', 
    role: 'Senior Eye Surgeon', 
    desc: 'Providing clinical mentorship, surgical fellowship standards, and tertiary subspecialty development.',
    image: '/assets/images/admin-ajax-21.png'
  },
  { 
    name: 'Mr. D. Balasundaram', 
    role: 'Managing Director – Power Link System Pvt Ltd', 
    desc: 'Advising on green hospital infrastructure, energy efficiency, and operational logistics.',
    image: '/assets/images/balasundaram.png'
  }
];

// Authentic Leadership Council Data with Live Original & Uploaded Portraits
const LEADERSHIP_COUNCIL = [
  { 
    name: 'Dr. Kaushik Murali', 
    role: 'President – Medical Administration, Quality & Training', 
    desc: 'Directs clinical administration across Sankara units, pediatric ophthalmology, and DNB fellowship academies.',
    image: '/assets/images/kaushik.png'
  },
  { 
    name: 'Mr. Bharath Balasubramaniam', 
    role: 'President – Operations & Administration', 
    desc: 'Oversees nationwide hospital supply chain, rural camp logistics, and infrastructure execution.',
    image: '/assets/images/bharath-balasubramaniam.png'
  },
  { 
    name: 'Ms. Srini Karthikeyan', 
    role: 'Chief People Officer', 
    desc: 'Directs talent acquisition, employee development, and community nurse empowerment initiatives.',
    image: '/assets/images/srini-madam.jpg'
  },
  { 
    name: 'Mr. Sankaran G. Sreenivasan', 
    role: 'Head – ID, RM & Information Security', 
    desc: 'Leads digital health infrastructure, donor data security, and enterprise information systems.',
    image: '/assets/images/sankaran-1.jpg'
  }
];

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { openDonationModal, trustees, steeringCouncil, leadershipCouncil } = useDatabase();
  const timelineScrollContainerRef = useRef<HTMLDivElement>(null);

  const founderSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: founderSectionRef,
    offset: ['start end', 'end start']
  });

  const ramaniY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const ramaniScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1.02, 0.99]);

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineScrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      timelineScrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white overflow-hidden text-slate-900">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Sri Kanchi Kamakoti Medical Trust • 50th Golden Jubilee (1977 - 2026)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            About Sankara Eye Hospital
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            A social enterprise dedicated to eliminating preventable blindness across India through high-volume, high-quality, compassionate clinical care.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* 🏛️ SECTION 1: THE BEGINNING (MAY 1977) */}
        <section id="beginning" className="space-y-8">
          <div className="text-left space-y-2">
            <span className="badge-sankara text-xs">Genesis & Divine Foundation</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The <span className="orange-gradient-text">Beginning (May 1977)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              How a humble voluntary clinic in Coimbatore sparked one of the world's most admired healthcare movements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Authentic 1977 Dispensary Photo */}
            <div className="lg:col-span-6 space-y-3">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-100 bg-slate-900 group">
                <div className="relative aspect-[16/10] w-full">
                  <img
                    src="/assets/images/sankara-beginning-1977.jpg"
                    alt="Sri Kanchi Kamakoti Medical Centre, Coimbatore (Established May 1977)"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div className="bg-slate-950 text-white p-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-orange-400">Sri Kanchi Kamakoti Medical Centre, Coimbatore</div>
                    <div className="text-slate-400 text-[11px]">Primary Dispensary Founded in May 1977</div>
                  </div>
                  <span className="bg-orange-500/20 text-orange-300 px-2.5 py-1 rounded-full text-[11px] font-bold border border-orange-500/30">
                    May 1977
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic text-center">
                Original dispensary building of Sri Kanchi Kamakoti Medical Centre in Coimbatore, where the journey began.
              </p>
            </div>

            {/* In-Depth Historical Narrative */}
            <div className="lg:col-span-6 space-y-4 text-slate-700">
              <h3 className="text-xl font-bold text-slate-900">
                A Consecrated Vow to Serve the Underserved
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                In May 1977, under the divine guidance and benign blessings of <strong>His Holiness Jagadguru Sri Jayendra Saraswathi Swamigal</strong> of Sri Kanchi Kamakoti Peetham, <strong>Dr. R.V. Ramani</strong> and <strong>Dr. Radha Ramani</strong> established the <em>Sri Kanchi Kamakoti Medical Centre</em> in Coimbatore.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">
                Starting as a voluntary, non-commercial primary healthcare clinic, they treated thousands of daily wage laborers and impoverished rural families. During these initial years, they witnessed a tragic medical reality: <strong>over 80% of blind people in rural India were blind needlessly</strong> — suffering from simple, curable cataracts that could be restored in just minutes of surgical care.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">
                Confronted by this profound social injustice, the founders made a lifelong pledge to build a self-reliant, institutionally scalable model that would take world-class eye care directly to the doorsteps of rural villagers.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-200">
                  <div className="text-2xl font-black text-orange-600 font-display">May 1977</div>
                  <div className="text-xs text-slate-700 font-semibold mt-0.5">Founding Clinic</div>
                  <div className="text-[11px] text-slate-500">Voluntary dispensary in Coimbatore</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-200">
                  <div className="text-2xl font-black text-slate-900 font-display">50 Years</div>
                  <div className="text-xs text-slate-700 font-semibold mt-0.5">Golden Jubilee (2026)</div>
                  <div className="text-[11px] text-slate-500">2.6 Million+ Free Surgeries</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⏳ SECTION 2: 3D ZIGZAG HORIZONTAL SCROLLING TIMELINE (1977 - 2026 GOLDEN JUBILEE) */}
        <section id="timeline" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="badge-sankara text-xs mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>50-Year Golden Jubilee Journey (1977 - 2026)</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Interactive 3D Chronicle: <span className="orange-gradient-text">1977 to 2026</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Explore the 50-year transformation from a single room dispensary to 14 multi-specialty hospitals across India.
              </p>
            </div>

            {/* Horizontal Navigation Buttons */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => scrollTimeline('left')}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:border-orange-500 hover:bg-orange-50 text-slate-700 hover:text-orange-600 flex items-center justify-center transition-all shadow-xs"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTimeline('right')}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 hover:border-orange-500 hover:bg-orange-50 text-slate-700 hover:text-orange-600 flex items-center justify-center transition-all shadow-xs"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Curved Zigzag Connector SVG Path */}
          <div className="relative">
            <svg className="w-full h-8 overflow-visible opacity-50 hidden lg:block" viewBox="0 0 1200 30">
              <path
                d="M 0,15 Q 150,0 300,15 T 600,15 T 900,15 T 1200,15"
                fill="none"
                stroke="url(#timeline-gradient)"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Horizontal Scrolling Track */}
          <div 
            ref={timelineScrollContainerRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-50"
          >
            {MILESTONES.map((m, idx) => (
              <motion.div
                key={m.year + idx}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`flex-shrink-0 w-80 sm:w-96 rounded-3xl overflow-hidden snap-start shadow-xl border-2 flex flex-col justify-between transition-all ${
                  m.highlight
                    ? 'bg-gradient-to-b from-orange-50/90 via-white to-orange-50/50 border-orange-400'
                    : 'bg-white border-slate-200 hover:border-orange-300'
                }`}
              >
                {/* Milestone Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-black border border-white/20">
                    {m.year}
                  </div>
                  <div className="absolute top-3 right-3 bg-orange-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                    {m.tag}
                  </div>
                </div>

                {/* Milestone Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-orange-700 font-bold uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{m.location}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {m.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Milestone #{idx + 1} of 16</span>
                    <span className="text-orange-600 font-bold">1977 → 2026</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🌟 SECTION 3: FOUNDER'S MESSAGE (WHITE BACKGROUND WITH GRADIENT MASK) */}
        <section 
          ref={founderSectionRef}
          id="founder-message"
          className="relative bg-gradient-to-br from-white via-orange-50/50 to-white text-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border-2 border-orange-200/90 overflow-hidden"
        >
          {/* Ambient Warm Saffron Lighting Spheres */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Narrative & Message */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-semibold">
                <Quote className="w-3.5 h-3.5 text-orange-600" />
                <span>Founder's Message</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Padma Shri <span className="orange-gradient-text">Dr. R.V. Ramani</span>
                </h2>
                <div className="text-xs sm:text-sm font-semibold text-orange-600">
                  Founder & Managing Trustee, Sankara Eye Foundation India
                </div>
              </div>

              <blockquote className="border-l-4 border-orange-500 pl-4 text-xs sm:text-sm text-slate-700 italic leading-relaxed bg-orange-50/50 py-2 rounded-r-xl">
                "In 1985, I became acutely aware of the transformative impact that the 'Gift of Vision' could bestow. Recognizing that over 80% of blindness is preventable and treatable, we envisioned Sankara as a beacon of hope in the fight against needless blindness, operating under the auspices of the Sri Kanchi Kamakoti Medical Trust."
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                "Aligned with Mahatma Gandhi’s profound assertion that <em>'India lives in the villages'</em>, we introduced the Gift of Vision initiative in 1990. Through the 80:20 model, for every 20 paying patients, 80 rural citizens receive world-class surgery completely free of cost. Our goal remains: total eradication of curable blindness with dignity and compassionate care."
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => openDonationModal(1)}
                  className="btn-primary !py-3 !px-6 text-xs font-bold shadow-lg"
                >
                  <Heart className="w-4 h-4" />
                  <span>Support Dr. Ramani's Mission</span>
                </button>
              </div>
            </div>

            {/* Right Column: Masterfully Crafted Circular Portrait Container (Strictly Contained within Circle Boundary) */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              {/* Outer Decorative Spinning Dashed Aura */}
              <div className="absolute w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] lg:w-[390px] lg:h-[390px] rounded-full border-2 border-dashed border-orange-400/40 animate-spin-slow pointer-events-none" />
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-orange-400/20 to-amber-300/15 blur-2xl pointer-events-none" />

              <motion.div
                style={{
                  y: ramaniY,
                  scale: ramaniScale
                }}
                className="relative z-20 w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] lg:w-[370px] lg:h-[370px] rounded-full p-2 bg-gradient-to-tr from-orange-500 via-amber-400 to-orange-600 shadow-2xl shadow-orange-500/20"
              >
                {/* Strict Circular Frame */}
                <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-b from-orange-100 via-amber-50/60 to-orange-200 border-2 border-white/80 shadow-inner flex items-center justify-center">
                  <img
                    src="/assets/images/dr-rv-ramani-nobg.png"
                    alt="Dr. R.V. Ramani - Founder & Managing Trustee"
                    className="w-full h-full object-cover object-top pointer-events-none select-none drop-shadow-md scale-105 transform translate-y-2"
                  />
                  {/* Subtle Inner Circular Bottom Gradient Blend (Strictly Contained Inside Circle) */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-orange-200/90 via-orange-200/40 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 🎖️ HISTORIC CIVIL INVESTITURE SHOWCASE (PRESIDENT OF INDIA & DR. R.V. RAMANI) */}
        <section id="padmashri-ceremony" className="bg-gradient-to-br from-white via-orange-50/40 to-white rounded-3xl p-8 sm:p-12 border-2 border-orange-200 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="badge-sankara text-xs">Civil Investiture Ceremony (2019)</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              National Recognition: Padma Shri Award in Medicine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Honoring Dr. R.V. Ramani's lifetime devotion to eradicating curable blindness across rural and tribal India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Ceremony High-Resolution Photo */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 max-w-md w-full">
                <div className="aspect-[3/4] w-full">
                  <img
                    src="/assets/images/padmashri-award-ceremony.jpg"
                    alt="Dr. R.V. Ramani receiving Padma Shri Award from the President of India"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-slate-950 text-white p-4 text-xs flex justify-between items-center">
                  <div>
                    <div className="font-bold text-orange-400">Rashtrapati Bhavan, New Delhi</div>
                    <div className="text-slate-400 text-[11px]">Conferred by Hon. President Shri Ram Nath Kovind</div>
                  </div>
                  <span className="bg-orange-500/20 text-orange-300 font-bold px-2.5 py-1 rounded-full border border-orange-500/40 text-[11px]">
                    Padma Shri 2019
                  </span>
                </div>
              </div>
            </div>

            {/* Citation & Significance Details */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-slate-900">
                  Exemplary Contributions to Social Ophthalmology
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In March 2019, Dr. R.V. Ramani was conferred the <strong>Padma Shri</strong> by the President of India at the Civil Investiture Ceremony held at Rashtrapati Bhavan, New Delhi.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The award recognized the pioneering <strong>80:20 self-sustaining cross-subsidy institutional model</strong> that has restored sight to over 2.6 million rural citizens without dependence on government aid or foreign charity.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="p-3.5 rounded-2xl bg-white border border-orange-200/80 shadow-xs flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Eradicating Rural Blindness</div>
                    <div className="text-[11px] text-slate-500">Over 2.6 million free surgeries performed under strict NABH standards.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-orange-200/80 shadow-xs flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Globally Acclaimed 80:20 Model</div>
                    <div className="text-[11px] text-slate-500">Taught as a Harvard Business School case study in healthcare sustainability.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-orange-200/80 shadow-xs flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Rural Women Technician Empowerment</div>
                    <div className="text-[11px] text-slate-500">Trained and employed over 2,500 rural women as paramedical vision assistants.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🎯 SECTION 4: INTERACTIVE VISION, MISSION & STATIC QUALITY POLICY */}
        <section id="vision-mission">
          <InteractiveVisionMission />
        </section>

        {/* 💎 SECTION 5: VALUE STATEMENT & CREDO */}
        <section id="values-credo" className="bg-gradient-to-br from-white via-orange-50/30 to-white rounded-3xl p-8 sm:p-12 border-2 border-orange-200 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="badge-sankara text-xs">Ethical Framework</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Value Statement & Sankara Credo</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Value Statement */}
            <div className="lg:col-span-5 bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl p-8 text-white space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Value Statement</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">Build Social Value</h3>
                <blockquote className="text-base sm:text-lg italic font-medium leading-snug">
                  “Service to Humanity with Compassion and Commitment”
                </blockquote>
              </div>
              <p className="text-xs text-orange-100 leading-relaxed">
                Every clinical and surgical decision is guided by empathy and the sacred duty to restore vision to the marginalized.
              </p>
            </div>

            {/* Credo Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 border-2 border-orange-100 shadow-sm space-y-2">
                <div className="text-orange-600 font-bold text-xs uppercase tracking-wider">01. Patient Value</div>
                <h4 className="text-base font-bold text-slate-900">Patient Centricity</h4>
                <p className="text-xs text-slate-600 italic">“Focus on Patient Centricity, Ensure ethical practices and Quality.”</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-orange-100 shadow-sm space-y-2">
                <div className="text-orange-600 font-bold text-xs uppercase tracking-wider">02. Growth & Learning</div>
                <h4 className="text-base font-bold text-slate-900">Continuous Mentoring</h4>
                <p className="text-xs text-slate-600 italic">“Structured learning, Quality training, Mentoring and Innovation.”</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-orange-100 shadow-sm space-y-2">
                <div className="text-orange-600 font-bold text-xs uppercase tracking-wider">03. Teamwork</div>
                <h4 className="text-base font-bold text-slate-900">Family Spirit</h4>
                <p className="text-xs text-slate-600 italic">“Team of committed individuals working towards a common cause.”</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🗺️ SECTION 6: NATIONAL REPLICATION & INTERACTIVE INDIA MAP */}
        <section id="national-replication" className="space-y-8">
          <div className="text-left space-y-2">
            <span className="badge-sankara text-xs">National Footprint</span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              National Replication: <span className="orange-gradient-text">14 Super-Specialty Hospitals Across 9 States</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              In 2002, Dr. R.V. Ramani envisaged replicating the sustainable eye care model across India. Today, with international partnership from Sankara Eye Foundation USA, Sankara operates 14 tertiary hospitals across 9 states, with our next super-specialty unit coming soon in Patna, Bihar.
            </p>
          </div>

          <InteractiveIndiaMap navigate={navigate} />
        </section>

        {/* 👥 SECTION 7: BOARD OF TRUSTEES (LARGER 1.2X CIRCULAR PHOTOS) */}
        <section id="board-of-trustees" className="space-y-8">
          <div className="text-left space-y-2">
            <span className="badge-sankara text-xs">Institutional Governance</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Board of Trustees</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Distinguished medical pioneers, jurists, industrialists, and philanthropists governing the Sri Kanchi Kamakoti Medical Trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustees.map((trustee, idx) => (
              <div 
                key={trustee.id || (trustee.name + idx)}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100/90 shadow-md hover:border-orange-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-5 flex flex-col justify-between text-center group"
              >
                <div className="space-y-4">
                  {/* 1.2x Larger Circular Photo */}
                  <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-orange-200/90 shadow-lg group-hover:border-orange-500 group-hover:shadow-2xl group-hover:shadow-orange-500/30 group-hover:scale-105 transition-all duration-500 relative bg-orange-50">
                    <img
                      src={trustee.image}
                      alt={trustee.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors">{trustee.name}</h3>
                    <div className="text-xs font-semibold text-orange-600 mt-0.5">{trustee.role}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed text-left">
                    {trustee.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sri Kanchi Kamakoti Medical Trust</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🧭 SECTION 8: STEERING COUNCIL (LARGER 1.2X CIRCULAR PHOTOS) */}
        <section id="steering-council" className="space-y-8">
          <div className="text-left space-y-2">
            <span className="badge-sankara text-xs">Strategic Advisory</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Steering Council</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              National academic, financial, technological, and corporate leaders guiding institutional excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steeringCouncil.map((c, idx) => (
              <div 
                key={c.id || (c.name + idx)}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-orange-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-5 flex flex-col justify-between text-center group"
              >
                <div className="space-y-4">
                  {/* 1.2x Larger Circular Photo */}
                  <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-slate-200 group-hover:border-orange-500 group-hover:shadow-2xl group-hover:shadow-orange-500/30 group-hover:scale-105 transition-all duration-500 bg-slate-100">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors">{c.name}</h3>
                    <div className="text-xs font-semibold text-orange-600 mt-0.5">{c.role}</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-left">{c.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-orange-600" />
                  <span>Steering Council Advisory</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ⚡ SECTION 9: LEADERSHIP COUNCIL (BALANCED 4-COLUMN WIDE GRID) */}
        <section id="leadership-council" className="space-y-8 w-full">
          <div className="text-left space-y-2">
            <span className="badge-sankara text-xs">Executive Operations</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Leadership Council</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Operational and clinical leaders executing the mission across 14 hospital hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {leadershipCouncil.map((l, idx) => (
              <div 
                key={l.id || (l.name + idx)}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-orange-100 shadow-md hover:border-orange-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-5 flex flex-col justify-between text-center group h-full"
              >
                <div className="space-y-4">
                  {/* 1.2x Larger Circular Photo */}
                  <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-orange-200/90 shadow-md group-hover:border-orange-500 group-hover:shadow-2xl group-hover:shadow-orange-500/30 group-hover:scale-105 transition-all duration-500 bg-orange-50">
                    <img
                      src={l.image}
                      alt={l.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">{l.name}</h3>
                    <div className="text-xs font-bold text-orange-600 mt-1 min-h-[32px] flex items-center justify-center">{l.role}</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-left pt-1">{l.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-600 font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Executive Leadership
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📊 SECTION 10: ANNUAL REPORTS & AUDITS */}
        <section id="annual-reports" className="bg-gradient-to-br from-white via-orange-50/40 to-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 border-2 border-orange-200">
          <div className="max-w-3xl space-y-2">
            <span className="badge-sankara text-xs">Financial Governance</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Annual Reports & Audits</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              100% financial transparency. Sri Kanchi Kamakoti Medical Trust undergoes rigorous statutory audits annually. All accounts are compliant with FCRA, Section 80G, and 501(c)(3) regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white border border-orange-200 shadow-xs space-y-1">
              <div className="text-xl font-bold text-orange-600">80G & 501(c)(3)</div>
              <div className="text-xs text-slate-600">Tax Exemption Certified</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-orange-200 shadow-xs space-y-1">
              <div className="text-xl font-bold text-emerald-600">100% Audited</div>
              <div className="text-xs text-slate-600">Annual Statutory Filings</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-orange-200 shadow-xs space-y-1">
              <div className="text-xl font-bold text-slate-900">2016 - 2025</div>
              <div className="text-xs text-slate-600">Archived Financial Records</div>
            </div>
          </div>

          <div className="pt-4 border-t border-orange-100">
            <button
              onClick={() => navigate('/annual-reports')}
              className="btn-primary !py-3.5 !px-8 text-xs font-bold shadow-lg flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>See All Reports & Audits →</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
