import React, { useState, useEffect } from 'react';
import {
  Phone,
  Clock,
  Heart,
  Calendar,
  Menu,
  X,
  ChevronDown,
  Building2,
  Award,
  GraduationCap,
  Eye,
  ShieldCheck,
  FileText,
  Activity,
  Search,
  Sparkles,
  Users
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { HOSPITALS_DATA } from '../../data/hospitalsData';
import { SPECIALTIES_DATA } from '../../data/specialtiesData';
import { APPOINTMENT_UNITS } from '../../data/appointmentUnitsData';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate }) => {
  const { openAppointmentModal, openDonationModal, openPledgeModal, wishesBanner } = useDatabase();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: string) => {
    navigate(route);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Wishes Header Banner Styling
  const getBannerThemeClasses = () => {
    switch (wishesBanner?.theme) {
      case 'royal-gold':
        return 'bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 text-white shadow-inner';
      case 'emerald-glow':
        return 'bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 text-white shadow-inner';
      case 'patriotic-tricolor':
        return 'bg-gradient-to-r from-orange-600 via-amber-700 to-emerald-700 text-white shadow-inner';
      case 'deep-navy':
        return 'bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white shadow-inner';
      case 'saffron-festive':
      default:
        return 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-inner';
    }
  };

  const isHomePage = currentRoute === '/' || currentRoute === '' || currentRoute === 'home';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Occasion & Festival Wishes Header (Home Page Only + Zoom Out Blur upon Scroll) */}
      {wishesBanner?.isEnabled && isHomePage && (
        <div 
          className={`text-xs px-4 text-center border-b border-white/20 transition-all duration-500 ease-out origin-top select-none ${getBannerThemeClasses()} ${
            isScrolled 
              ? 'opacity-0 scale-90 blur-xs max-h-0 py-0 overflow-hidden pointer-events-none -translate-y-2 border-b-0 m-0' 
              : 'opacity-100 scale-100 blur-none max-h-10 py-1.5 overflow-hidden translate-y-0 shadow-xs'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center text-xs font-medium truncate">
            <span className="font-black tracking-wide text-amber-100 flex items-center gap-1.5 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{wishesBanner.occasionTitle}</span>
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white text-[11px] sm:text-xs opacity-95 truncate">
              {wishesBanner.greetingMessage}
            </span>
            {wishesBanner.actionText && wishesBanner.actionLink && (
              <button
                onClick={() => handleNavClick(wishesBanner.actionLink || '/donate')}
                className="ml-1 text-[11px] font-black underline underline-offset-2 hover:text-amber-200 transition-colors cursor-pointer flex-shrink-0 whitespace-nowrap"
              >
                {wishesBanner.actionText}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Informational Announcement Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>OPD Consultations: Mon – Sat 8:00 AM – 6:00 PM</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <span>• Across 14 Super-Specialty Units</span>
              <button
                onClick={() => handleNavClick('/hospitals')}
                className="text-orange-400 hover:text-orange-300 ml-1 font-medium hover:underline cursor-pointer"
              >
                Find Unit Contacts →
              </button>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => handleNavClick('/pledge-your-eyes')}
              className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 text-xs cursor-pointer"
            >
              <Eye className="w-3 h-3 text-orange-400" />
              <span>Pledge Your Eyes</span>
            </button>
            <span className="text-slate-700">|</span>
            <span className="bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded text-[11px] font-semibold border border-orange-500/30">
              80G Tax Exempt
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar with smooth backdrop blur upon scroll */}
      <nav className={`w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-orange-100/80 py-2.5'
          : 'bg-white/98 backdrop-blur-md py-3 border-b border-slate-100'
        }`}>
        <div className="max-w-[96rem] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-6 flex-nowrap">
          {/* Logo & 1-Line Clean Brand Identity */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <img
              src="/assets/images/sankaraeye-colored-logo.png"
              alt="Sankara Eye Foundation Logo"
              className="h-7.5 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Navigation Links - Single Continuous Row */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap flex-shrink">
            {/* Home */}
            <button
              onClick={() => handleNavClick('/')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all ${currentRoute === '/'
                  ? 'text-orange-600 bg-orange-50 font-bold'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
            >
              Home
            </button>

            {/* About Us - Direct Clickable Link */}
            <button
              onClick={() => handleNavClick('/about')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${currentRoute === '/about'
                  ? 'text-orange-600 bg-orange-50 font-bold'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
            >
              About Us
            </button>

            {/* Treatments (Renamed from Clinical Specialties) - Horizontal Projection Dropdown */}
            <div
              className="relative flex-shrink-0"
              onMouseEnter={() => setActiveDropdown('specialties')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('/services')}
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap flex items-center gap-1 transition-all ${currentRoute.startsWith('/services')
                    ? 'text-orange-600 bg-orange-50 font-bold'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                  }`}
              >
                Treatments
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'specialties' && (
                <div className="absolute top-full -left-28 xl:-left-40 w-[840px] xl:w-[920px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-extrabold text-orange-600 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Advanced Ophthalmic Treatments & Surgery</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        12 Specialized Centers of Excellence powered by cutting-edge diagnostic and laser suites.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavClick('/services')}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      View All 12 Departments →
                    </button>
                  </div>

                  {/* 3-Column Horizontal Projection Grid */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {SPECIALTIES_DATA.map((spec) => (
                      <button
                        key={spec.id}
                        onClick={() => handleNavClick(`/services/${spec.id}`)}
                        className="text-left p-2.5 rounded-xl hover:bg-orange-50/80 border border-transparent hover:border-orange-200 group transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="font-bold text-xs text-slate-900 group-hover:text-orange-600 truncate">
                            {spec.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 pl-4">
                          {spec.tagline}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 mt-3 pt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      German Excimer Lasers & Micro-Incision Phaco Suites
                    </span>
                    <span>All procedures performed by Fellowship-Trained Faculty</span>
                  </div>
                </div>
              )}
            </div>

            {/* Our Network (Renamed from Sankara Units) - Horizontal Projection Dropdown */}
            <div
              className="relative flex-shrink-0"
              onMouseEnter={() => setActiveDropdown('hospitals')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('/hospitals')}
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap flex items-center gap-1 transition-all ${currentRoute.startsWith('/hospitals')
                    ? 'text-orange-600 bg-orange-50 font-bold'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                  }`}
              >
                Our Network
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'hospitals' && (
                <div className="absolute top-full -left-52 xl:-left-80 w-[880px] xl:w-[960px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-extrabold text-orange-600 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Sankara Super-Specialty Hospital Network</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        14 Super-Specialty Eye Care Units across 9 States • 100% NABH Standards
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavClick('/hospitals')}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Browse Interactive Map & Units →
                    </button>
                  </div>

                  {/* 3 Geographic Regional Columns */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Region 1: South (TN & Karnataka) */}
                    <div className="space-y-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1 mb-1">
                        Tamil Nadu & Karnataka
                      </div>
                      {HOSPITALS_DATA.filter(h => ['Tamil Nadu', 'Karnataka'].includes(h.state)).map((hosp) => (
                        <button
                          key={hosp.id}
                          onClick={() => handleNavClick(`/hospitals/${hosp.id}`)}
                          className="w-full text-left p-1.5 rounded-lg hover:bg-white hover:shadow-xs text-slate-800 hover:text-orange-600 text-xs transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <span className="font-semibold">{hosp.city}</span>
                            {hosp.cmoName && <div className="text-[10px] text-slate-400 truncate max-w-[170px]">CMO: {hosp.cmoName}</div>}
                          </div>
                          <span className="text-[10px] text-slate-400 group-hover:text-orange-600">{hosp.phone}</span>
                        </button>
                      ))}
                    </div>

                    {/* Region 2: AP, Telangana & Maharashtra */}
                    <div className="space-y-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1 mb-1">
                        Andhra, Telangana & Maharashtra
                      </div>
                      {HOSPITALS_DATA.filter(h => ['Andhra Pradesh', 'Telangana', 'Maharashtra'].includes(h.state)).map((hosp) => (
                        <button
                          key={hosp.id}
                          onClick={() => handleNavClick(`/hospitals/${hosp.id}`)}
                          className="w-full text-left p-1.5 rounded-lg hover:bg-white hover:shadow-xs text-slate-800 hover:text-orange-600 text-xs transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <span className="font-semibold">{hosp.city}</span>
                            {hosp.cmoName && <div className="text-[10px] text-slate-400 truncate max-w-[170px]">CMO: {hosp.cmoName}</div>}
                          </div>
                          <span className="text-[10px] text-slate-400 group-hover:text-orange-600">{hosp.phone}</span>
                        </button>
                      ))}
                    </div>

                    {/* Region 3: North & Central India */}
                    <div className="space-y-1 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1 mb-1">
                        North & Central India
                      </div>
                      {HOSPITALS_DATA.filter(h => ['Rajasthan', 'Punjab', 'Uttar Pradesh', 'Madhya Pradesh', 'Gujarat'].includes(h.state)).map((hosp) => (
                        <button
                          key={hosp.id}
                          onClick={() => handleNavClick(`/hospitals/${hosp.id}`)}
                          className="w-full text-left p-1.5 rounded-lg hover:bg-white hover:shadow-xs text-slate-800 hover:text-orange-600 text-xs transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <span className="font-semibold">{hosp.city}</span>
                            {hosp.cmoName && <div className="text-[10px] text-slate-400 truncate max-w-[170px]">CMO: {hosp.cmoName}</div>}
                          </div>
                          <span className="text-[10px] text-slate-400 group-hover:text-orange-600">{hosp.phone}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 mt-3 pt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium text-slate-600">
                      Direct unit coordinates, outpatient slots, and directions available on individual unit pages.
                    </span>
                    <button
                      onClick={() => handleNavClick('/book-appointment')}
                      className="font-bold text-orange-600 hover:underline"
                    >
                      Book Priority Outpatient OPD Slot →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Social Impact */}
            <button
              onClick={() => handleNavClick('/social-impact')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${currentRoute === '/social-impact'
                  ? 'text-orange-600 bg-orange-50 font-bold'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
            >
              Social Impact
            </button>

            {/* Education */}
            <button
              onClick={() => handleNavClick('/education')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${currentRoute === '/education'
                  ? 'text-orange-600 bg-orange-50 font-bold'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
            >
              Academy of Vision
            </button>

            {/* More Dropdown */}
            <div
              className="relative flex-shrink-0"
              onMouseEnter={() => setActiveDropdown('more')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap flex items-center gap-1 transition-all ${['/awards', '/annual-reports', '/news', '/events', '/blog', '/testimonials', '/careers', '/contact'].includes(currentRoute)
                    ? 'text-orange-600 bg-orange-50 font-bold'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                  }`}
              >
                More
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'more' && (
                <div className="absolute top-full right-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('/awards')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-800 hover:text-orange-600 text-xs font-semibold flex items-center gap-2"
                  >
                    <Award className="w-3.5 h-3.5 text-orange-500" />
                    <span>Awards & Honors</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/annual-reports')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-800 hover:text-orange-600 text-xs font-semibold flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-orange-500" />
                    <span>Annual Reports & Audits</span>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => handleNavClick('/news')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-800 hover:text-orange-600 text-xs font-semibold"
                  >
                    News & Media Coverage
                  </button>
                  <button
                    onClick={() => handleNavClick('/events')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-800 hover:text-orange-600 text-xs font-semibold"
                  >
                    Events & Free Eye Camps
                  </button>
                  <button
                    onClick={() => handleNavClick('/blog')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-800 hover:text-orange-600 text-xs font-semibold"
                  >
                    Clinical Eye Care Blog
                  </button>
                  <button
                    onClick={() => handleNavClick('/testimonials')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-800 hover:text-orange-600 text-xs font-semibold"
                  >
                    Patient Testimonies
                  </button>
                  <button
                    onClick={() => handleNavClick('/careers')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-800 hover:text-orange-600 text-xs font-semibold"
                  >
                    Careers & Fellowships
                  </button>
                  <button
                    onClick={() => handleNavClick('/contact')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 text-slate-800 hover:text-orange-600 text-xs font-semibold border-t border-slate-100 mt-1 pt-2"
                  >
                    Contact & Unit Coordinates
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs - Fixed in Single Continuous Row */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 flex-nowrap flex-shrink-0">
            <button
              onClick={() => handleNavClick('/donate')}
              className="btn-outline-orange !px-3.5 xl:!px-4 !py-2 text-xs font-bold whitespace-nowrap flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-orange-600 fill-orange-500/20 flex-shrink-0" />
              <span>Donate</span>
            </button>

            {/* Book Appointment Dropdown with Direct Unit Slugs */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('appointment-units')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'appointment-units' ? null : 'appointment-units')}
                className="btn-primary !px-3.5 xl:!px-4 !py-2 text-xs font-bold shadow-sm whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Book Appointment</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'appointment-units' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'appointment-units' && (
                <div className="absolute right-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white rounded-2xl shadow-2xl border-2 border-orange-200 p-3 space-y-2">
                    <div className="flex items-center justify-between px-2 pb-1 border-b border-slate-100">
                      <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                        Select Hospital Unit:
                      </span>
                      <span className="text-[10px] text-orange-600 font-bold">14 Branches</span>
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-1 scrollbar-thin pr-1">
                      {APPOINTMENT_UNITS.map((unit) => (
                        <button
                          key={unit.code}
                          onClick={() => handleNavClick(`/${unit.slug}`)}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600">
                              {unit.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {unit.city}, {unit.state}
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-orange-600 bg-orange-100/60 px-2 py-0.5 rounded-md">
                            #{unit.code}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-center">
                      <button
                        onClick={() => handleNavClick('/book-appointment')}
                        className="text-[11px] font-bold text-slate-600 hover:text-orange-600 underline cursor-pointer"
                      >
                        Open General OPD Booking Form →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('/book-appointment')}
              className="btn-primary !px-3 !py-2 text-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-orange-100 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              
              {/* Mobile Direct Unit Appointment Selector */}
              <div className="p-3 bg-orange-50/80 rounded-xl border border-orange-200 mb-2 space-y-2">
                <div className="text-xs font-black text-orange-950 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-orange-600" />
                    <span>Book Appointment by Unit:</span>
                  </span>
                  <span className="text-[10px] text-orange-700 font-bold">14 Units</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                  {APPOINTMENT_UNITS.map((unit) => (
                    <button
                      key={unit.code}
                      onClick={() => handleNavClick(`/${unit.slug}`)}
                      className="text-left px-2.5 py-1.5 bg-white border border-orange-200/60 rounded-lg text-[11px] font-bold text-slate-800 hover:bg-orange-600 hover:text-white truncate"
                    >
                      {unit.city}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleNavClick('/')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('/about')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                About Us & Trust History
              </button>
              <button
                onClick={() => handleNavClick('/services')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Treatments (12 Super-Specialties)
              </button>
              <button
                onClick={() => handleNavClick('/hospitals')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Our Network (14 Hospitals)
              </button>
              <button
                onClick={() => handleNavClick('/awards')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Awards & Honors
              </button>
              <button
                onClick={() => handleNavClick('/social-impact')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Social Impact
              </button>
              <button
                onClick={() => handleNavClick('/education')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Sankara Academy of Vision
              </button>
              <button
                onClick={() => handleNavClick('/news')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                News & Press Releases
              </button>
              <button
                onClick={() => handleNavClick('/events')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Events & Free Eye Camps
              </button>
              <button
                onClick={() => handleNavClick('/blog')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Clinical Eye Care Blog
              </button>
              <button
                onClick={() => handleNavClick('/testimonials')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Patient Stories
              </button>
              <button
                onClick={() => handleNavClick('/careers')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Careers & Fellowships
              </button>
              <button
                onClick={() => handleNavClick('/annual-reports')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Annual Reports & Audits
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              >
                Contact & Coordinates
              </button>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openDonationModal(1);
                }}
                className="btn-outline-orange w-full py-2.5 text-xs font-bold justify-center"
              >
                <Heart className="w-4 h-4 text-orange-600" />
                <span>Donate</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openPledgeModal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-orange-500" />
                <span>Pledge Your Eyes Registration</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
