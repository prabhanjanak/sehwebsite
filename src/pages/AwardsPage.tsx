import React, { useState } from 'react';
import { 
  Award, 
  Medal, 
  Calendar, 
  Search, 
  Building2, 
  Globe2, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  ExternalLink,
  Users
} from 'lucide-react';

interface AwardsPageProps {
  navigate: (route: string) => void;
}

interface AwardItem {
  year: number;
  title: string;
  conferredBy: string;
  category: 'civilian' | 'international' | 'quality' | 'humanitarian' | 'ophthalmology';
  description: string;
  highlight?: boolean;
}

const AWARDS_DATA: AwardItem[] = [
  {
    year: 2023,
    title: 'IFocus Lifetime Achievement Award',
    conferredBy: 'Centre for Sight National Academic Forum',
    category: 'ophthalmology',
    description: 'Conferred in recognition of lifelong monumental contributions to ophthalmic residency training, clinical excellence, and eradicating preventable blindness.'
  },
  {
    year: 2022,
    title: 'Quality Champion Platinum Award',
    conferredBy: 'Quality Council of India (QCI)',
    category: 'quality',
    description: 'Highest national quality recognition honoring zero-disparity surgical safety benchmarks across 14 hospital units.',
    highlight: true
  },
  {
    year: 2022,
    title: 'Healthcare Icon of the Year',
    conferredBy: 'The Economic Times',
    category: 'quality',
    description: 'Recognized for pioneering India’s largest self-sustaining community eye care ecosystem and transforming rural public health delivery.'
  },
  {
    year: 2022,
    title: 'Best CEO of the Year (Southern Region)',
    conferredBy: 'Indian Chamber of Commerce (ICC)',
    category: 'quality',
    description: 'Awarded for visionary executive leadership, ethical institutional stewardship, and sustainable social enterprise governance.'
  },
  {
    year: 2022,
    title: 'Hero of Indian Ophthalmology Award',
    conferredBy: 'Kerala Society of Ophthalmic Surgeons (KSOS)',
    category: 'ophthalmology',
    description: 'Honoring four decades of groundbreaking rural surgical outreach and setting national benchmarks for cataract eradication.'
  },
  {
    year: 2020,
    title: 'Board of Governors Appointment',
    conferredBy: 'Government of India (Supersession of Medical Council of India - MCI)',
    category: 'civilian',
    description: 'Selected and appointed by the Government of India to the apex national governing body regulating medical education and standards across India.'
  },
  {
    year: 2019,
    title: 'Padma Shri in Medicine (Affordable Healthcare)',
    conferredBy: 'President of India, Rashtrapati Bhavan',
    category: 'civilian',
    description: 'Conferred India’s fourth-highest civilian honor for exemplary humanitarian leadership in social medicine and eradicating curable blindness.',
    highlight: true
  },
  {
    year: 2019,
    title: 'Qimpro Gold Standard National Award',
    conferredBy: 'Qimpro Foundation',
    category: 'quality',
    description: 'Recognized for institutional quality stewardship and flawless operational standardization across hospital campuses.'
  },
  {
    year: 2016,
    title: 'Regional Achievement Award for Southeast Asia',
    conferredBy: 'International Agency for Prevention of Blindness (IAPB)',
    category: 'international',
    description: 'Presented at the IAPB General Assembly in South Africa for transformative leadership in rural preventable blindness eradication in South Asia.'
  },
  {
    year: 2016,
    title: '19th Mahaveer Award for Social Service & Medicine',
    conferredBy: 'Bhagwan Mahaveer Foundation',
    category: 'humanitarian',
    description: 'National award carrying a citation and cash grant for selfless medical service and uplifting impoverished rural communities.'
  },
  {
    year: 2014,
    title: 'IMC Ramakrishna Bajaj National Quality Excellence Award',
    conferredBy: 'Indian Merchants Chamber, Mumbai',
    category: 'quality',
    description: 'Honored with India’s foremost institutional quality recognition for clinical governance and patient satisfaction benchmarks.'
  },
  {
    year: 2013,
    title: 'For the Sake of Honour Award',
    conferredBy: 'Rotary Club of Udumalpet (District 3201)',
    category: 'humanitarian',
    description: 'Awarded for extraordinary ethical standards and humanitarian service to underserved populations.'
  },
  {
    year: 2013,
    title: 'Kochouseph Chittilappilly Humanitarian Award',
    conferredBy: 'Rotary International District 3201',
    category: 'humanitarian',
    description: 'Commended for outstanding humanitarian impact in rural eye healthcare.'
  },
  {
    year: 2012,
    title: 'Spirit of Mastek National Award',
    conferredBy: 'Mastek Foundation',
    category: 'humanitarian',
    description: 'Recognized for creating scalable, technology-enabled community healthcare systems.'
  },
  {
    year: 2010,
    title: 'Heroes of Humanity Award',
    conferredBy: 'Art of Living Foundation',
    category: 'humanitarian',
    description: 'Presented in the presence of global spiritual leaders for restoring sight and dignity to millions of impoverished citizens.'
  },
  {
    year: 2008,
    title: 'Asia Leadership Summit Global Keynote Invitee',
    conferredBy: 'Asia Leadership Forum, New York',
    category: 'international',
    description: 'Invited to address global health leaders in New York on "The Tale of Two Challenges: Scalable Healthcare Delivery".'
  },
  {
    year: 2007,
    title: 'Dr. K.S. Sanjivi Award for Medical Service',
    conferredBy: 'Confederation of Indian Organizations for Service and Advocacy (CIOSA)',
    category: 'humanitarian',
    description: 'Honored for outstanding, selfless medical service to the poor and needy.'
  },
  {
    year: 2007,
    title: 'Mrs. P. Pattanayak Memorial Award',
    conferredBy: 'International Centre for Eye Health (ICEH), London Alumni',
    category: 'international',
    description: 'Presented in Hyderabad for devoted community eye care leadership and institutional excellence.'
  },
  {
    year: 2007,
    title: 'Service to Humanity Award',
    conferredBy: 'Rotary Foundation Zone 6 Alumni',
    category: 'humanitarian',
    description: 'Recognized for sustainable community outreach and village screening camp networks.'
  },
  {
    year: 2006,
    title: 'Dr. R.K. Seth Memorial Award in Community Ophthalmology',
    conferredBy: 'National Association of Community Ophthalmologists',
    category: 'ophthalmology',
    description: 'Honored for pioneering rural mobile screening camps and door-to-door visual rehabilitation.'
  },
  {
    year: 2005,
    title: 'Certificate of Appreciation & Citation',
    conferredBy: 'New York Eye and Ear Infirmary, USA',
    category: 'international',
    description: 'Commended for extraordinary global contributions to ophthalmic training, surgery, and humanitarian care.'
  },
  {
    year: 2005,
    title: 'Visionary Award of New York',
    conferredBy: 'Andhra Society of Greater New York Region',
    category: 'international',
    description: 'Honored in New York for visionary leadership in expanding non-profit healthcare institutions across India.'
  },
  {
    year: 2004,
    title: 'Navajeevan Sight Saver Award',
    conferredBy: 'Navajeevan Trust',
    category: 'humanitarian',
    description: 'Awarded for outstanding sight-restoring services rendered to underprivileged rural citizens.'
  },
  {
    year: 2002,
    title: 'Great Achievers of India',
    conferredBy: 'The Indian Express Daily',
    category: 'civilian',
    description: 'Selected as one of the leading public healthcare achievers transforming Indian social welfare.'
  },
  {
    year: 2001,
    title: 'Silver Jubilee Pioneering Service Award',
    conferredBy: 'Sankara Eye Foundation, USA',
    category: 'international',
    description: 'Presented in Silicon Valley for 25 years of steadfast dedication to community eye care in India.'
  },
  {
    year: 2000,
    title: 'Vaidyarathna Award',
    conferredBy: 'Sri Kanchi Kamakoti Peetam, Kanchipuram',
    category: 'civilian',
    description: 'Consecrated by the Acharyas of Kanchi Kamakoti Peetham for noble, ethical, and compassionate medical stewardship.',
    highlight: true
  },
  {
    year: 2000,
    title: 'Role Model of India National Award',
    conferredBy: 'National Cultural & Civic Council, New Delhi',
    category: 'civilian',
    description: 'Presented in New Delhi honoring exemplary dedication to nation-building and rural healthcare.'
  },
  {
    year: 1996,
    title: 'Lifetime Achievement Alumnus Award',
    conferredBy: 'Kasturba Medical College (KMC) Alumni Association, Manipal',
    category: 'ophthalmology',
    description: 'Honored by his alma mater (Best Outgoing Student recipient) for outstanding contributions to public health.'
  },
  {
    year: 1989,
    title: 'Paul Harris Fellow & Presidential Citation',
    conferredBy: 'Rotary Club of Coimbatore Central (1st 100% PHF Club)',
    category: 'humanitarian',
    description: 'Commended for pioneering early rural cataract camp initiatives across Western Tamil Nadu.'
  },
  {
    year: 1986,
    title: 'Meritorious Service Award',
    conferredBy: 'Lions International',
    category: 'humanitarian',
    description: 'Honored for community health advocacy and early eye banking awareness drives.'
  },
  {
    year: 1985,
    title: 'Young Doctor Award',
    conferredBy: 'Jaycees International',
    category: 'ophthalmology',
    description: 'Recognized as an outstanding young medical practitioner committed to community medicine.'
  },
  {
    year: 1982,
    title: 'Outstanding Young Person Award (TOYP)',
    conferredBy: 'Jaycees International',
    category: 'humanitarian',
    description: 'Conferred for visionary healthcare leadership in founding community medical centers.'
  },
  {
    year: 1980,
    title: 'Group Study Exchange (GSE) Ambassador of Goodwill',
    conferredBy: 'Rotary International (USA Tour)',
    category: 'international',
    description: 'Selected as Rotary International GSE Team Member to represent Indian medicine across the United States.'
  }
];

export const AwardsPage: React.FC<AwardsPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Honors (33)' },
    { id: 'civilian', label: 'Civilian & National' },
    { id: 'international', label: 'International' },
    { id: 'quality', label: 'Quality & Governance' },
    { id: 'humanitarian', label: 'Humanitarian' },
    { id: 'ophthalmology', label: 'Ophthalmic Sciences' }
  ];

  const filteredAwards = AWARDS_DATA.filter((award) => {
    const matchesCategory = selectedCategory === 'all' || award.category === selectedCategory;
    const matchesSearch = 
      award.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      award.conferredBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      award.year.toString().includes(searchQuery) ||
      award.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans pb-20">
      
      {/* ========================================================================= */}
      {/* 🌟 HERO BANNER                                                             */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <button
            onClick={() => navigate('/about')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-100 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to About Us</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-white/30">
                <Award className="w-3.5 h-3.5" />
                <span>Padma Shri Dr. R.V. Ramani — Founder & Managing Trustee</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Awards & National Honors
              </h1>

              <p className="text-sm sm:text-base text-orange-100 leading-relaxed font-normal">
                Four decades of selfless dedication to public healthcare, social entrepreneurship, and eradicating preventable blindness recognized by the President of India, international bodies, and national medical institutions.
              </p>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl text-center">
                <div className="text-2xl font-black text-white">Padma Shri</div>
                <div className="text-[11px] text-orange-100">National Civilian Honor (2019)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl text-center">
                <div className="text-2xl font-black text-white">33+</div>
                <div className="text-[11px] text-orange-100">National & Global Accolades</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* ========================================================================= */}
        {/* 🎖️ PADMA SHRI INVESTITURE SPOTLIGHT CARD                                   */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100/60 to-transparent rounded-full pointer-events-none -mr-20 -mt-20" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
              <div className="w-48 sm:w-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-amber-50">
                <img
                  src="/assets/images/dr-rv-ramani-padmashri.jpg"
                  alt="Padma Shri Dr. R.V. Ramani with Medal"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-slate-900">Dr. R.V. Ramani</h3>
                <p className="text-xs text-slate-600 font-medium">Founder & Managing Trustee, Sankara Eye Foundation</p>
                <p className="text-[11px] text-amber-700 font-bold">Padma Shri Awardee (2019) • Medicine</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider border border-amber-300">
                <Medal className="w-3.5 h-3.5 text-amber-700" />
                <span>Presidential Investiture at Rashtrapati Bhavan</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Padma Shri Conferred by the President of India (2019)
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                On March 16, 2019, the President of India presented the prestigious <strong>Padma Shri</strong> to Dr. R.V. Ramani in recognition of his pioneering social enterprise model in medicine and affordable healthcare. Starting in 1977 as a humble primary clinic in Coimbatore with the guidance of the Sankaracharyas of Kanchi Kamakoti Peetham, Dr. Ramani and Dr. Radha Ramani scaled Sankara into India’s largest charitable ophthalmic movement, performing over <strong>2.6 million free sight-restoring surgeries</strong> with global infection-control benchmarks.
              </p>

              <blockquote className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                “This recognition belongs to our dedicated surgeons, paramedical staff, donors, and the millions of rural patients who place their sacred trust in our hands. Sight is not a luxury; it is a fundamental human right.”
                <span className="block mt-1 font-bold not-italic text-amber-900 text-xs">— Dr. R.V. Ramani</span>
              </blockquote>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Building2 className="w-3.5 h-3.5 text-orange-600" />
                  Conferred at Rashtrapati Bhavan, New Delhi
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Field: Medicine (Affordable Rural Healthcare)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🔍 SEARCH & CATEGORY FILTER BAR                                           */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search awards, year, body..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 📜 CHRONOLOGICAL AWARDS TIMELINE GRID                                     */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing {filteredAwards.length} accolades & recognitions</span>
            <span>Chronological order (1980 – Present)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAwards.map((award, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                  award.highlight
                    ? 'bg-gradient-to-br from-amber-50/60 to-white border-amber-300 shadow-md ring-1 ring-amber-300'
                    : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-lg border border-orange-200">
                      {award.year}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {award.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {award.title}
                  </h3>

                  <div className="text-xs text-amber-700 font-semibold flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
                    <span className="truncate">{award.conferredBy}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                    {award.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium flex items-center justify-between">
                  <span>Conferred to Dr. R.V. Ramani</span>
                  {award.highlight && (
                    <span className="text-amber-700 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      National Benchmark
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredAwards.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Award className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No awards match your filter criteria.</div>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 🤝 INSTITUTIONAL LEADERSHIP & EXPLORE NEXT                                 */}
        {/* ========================================================================= */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black">
              Explore Our Governance & Four Decades of Heritage
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Learn about Dr. R.V. Ramani, Dr. Radha Ramani, the Board of Trustees, and how a modest 1-room dispensary scaled into India’s premier charitable eye care institution.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('/about')}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Read Heritage & Credo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
