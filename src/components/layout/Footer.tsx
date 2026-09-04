import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  ShieldCheck,
  ChevronRight,
  Eye,
  CheckCircle2,
  Award,
  Send,
  Building,
  Sparkles,
  Lock
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { HOSPITALS_DATA } from '../../data/hospitalsData';
import { SPECIALTIES_DATA } from '../../data/specialtiesData';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { subscribeNewsletter, openDonationModal, openPledgeModal } = useDatabase();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    await subscribeNewsletter(emailInput);
    setSubscribed(true);
    setEmailInput('');
  };

  const handleNav = (route: string) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t-4 border-orange-500">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="font-bold text-slate-100 text-sm">Padma Shri Leadership</div>
              <div className="text-xs text-slate-400">Founded by Dr. R.V. Ramani in 1977</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="font-bold text-slate-100 text-sm">Unique Hybrid Model</div>
              <div className="text-xs text-slate-400">Rural Eye Care Cross-Subsidized for the Underserved</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
              <Building className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="font-bold text-slate-100 text-sm">14 Super-Specialty Hospitals</div>
              <div className="text-xs text-slate-400">Serving Communities Across 10 States</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-slate-100 text-sm">Tax Exemption 80G & 501(c)(3)</div>
              <div className="text-xs text-slate-400">FCRA Registered & Fully Audited</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1: Trust & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/sankaraeye-white-logo.png"
                alt="Sankara Eye Hospital Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              <strong className="text-white font-semibold">Sri Kanchi Kamakoti Medical Trust</strong> is a social enterprise committed to eradicating preventable blindness in India through world-class clinical care and compassionate community service.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>Headquarters: Sathy Road, Sivanandapuram, Saravanampatti, Coimbatore, Tamil Nadu 641035</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>support@sankaraeye.com / donations@sankaraeye.com</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                For unit-specific queries, appointments, and contact details, please visit our individual <button onClick={() => handleNav('/hospitals')} className="text-orange-400 hover:underline font-medium">Hospital Units</button>.
              </div>
            </div>

            {/* Social Media Links (#20) */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-300 mb-2">Connect with Sankara Eye Foundation:</div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/sankaraeyehospitals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 border border-slate-700/60"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://instagram.com/sankaraeyehospitals"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 border border-slate-700/60"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a
                  href="https://twitter.com/sankarav2020"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 border border-slate-700/60"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href="https://www.youtube.com/user/sankaraeyehospitals"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 border border-slate-700/60"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a
                  href="https://wa.me/919790006789"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 border border-slate-700/60"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                Subscribe to Quarterly Vision Bulletin
              </h4>
              {subscribed ? (
                <div className="bg-emerald-950/80 border border-emerald-700/60 rounded-xl p-2.5 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Thank you for subscribing to Sankara updates!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Clinical Specialties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3 border-b border-slate-800 pb-2">
              Clinical Specialties
            </h4>
            <ul className="space-y-2 text-xs">
              {SPECIALTIES_DATA.slice(0, 7).map((spec) => (
                <li key={spec.id}>
                  <button
                    onClick={() => handleNav(`/services/${spec.id}`)}
                    className="text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1 text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-orange-500" />
                    <span className="truncate">{spec.title.split('&')[0]}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="text-orange-400 hover:text-orange-300 font-semibold text-xs pt-1 inline-block"
                >
                  View All 12 Departments →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: 14 Hospital Branches */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3 border-b border-slate-800 pb-2">
              14 Hospital Units
            </h4>
            <ul className="space-y-1.5 text-xs">
              {HOSPITALS_DATA.slice(0, 8).map((hosp) => (
                <li key={hosp.id}>
                  <button
                    onClick={() => handleNav(`/hospitals/${hosp.id}`)}
                    className="text-slate-300 hover:text-orange-400 transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>{hosp.city}</span>
                    <span className="text-[10px] text-slate-500">{hosp.state}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('/hospitals')}
                  className="text-orange-400 hover:text-orange-300 font-semibold text-xs pt-1 inline-block"
                >
                  All Sankara Units & Maps →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Social Giving */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3 border-b border-slate-800 pb-2">
              Social Giving & Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => openDonationModal(1)}
                  className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-orange-500/20 text-orange-400" />
                  Sponsor Cataract Surgery (₹3,000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/donate')}
                  className="hover:text-orange-400 transition-colors"
                >
                  SEF USA 501(c)(3) Giving
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPledgeModal()}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3 h-3 text-orange-400" />
                  Register Eye Pledge
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/education')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Sankara College of Optometry
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/careers')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Doctor Fellowships & Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/annual-reports')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Audited Accounts & FCRA
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Accreditations & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Sri Kanchi Kamakoti Medical Trust / Sankara Eye Foundation India. All Rights Reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-slate-500">Reg. No: 1977/CBE</span>
            <button onClick={() => handleNav('/privacy-policy')} className="hover:text-orange-400">Privacy Policy</button>
            <button onClick={() => handleNav('/about')} className="hover:text-orange-400">Credo & Governance</button>
            <button onClick={() => handleNav('/admin')} className="text-orange-400 font-bold hover:underline flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Admin CMS Portal</span>
            </button>
            <button onClick={() => handleNav('/contact')} className="hover:text-orange-400">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
