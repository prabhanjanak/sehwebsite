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
              <div className="font-bold text-slate-100 text-sm">80:20 Self-Sustaining Model</div>
              <div className="text-xs text-slate-400">80% Surgeries Delivered Free of Cost</div>
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
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Central Helpline: <a href="tel:04224234200" className="text-orange-300 hover:underline">0422-4234200</a> / <a href="tel:08069038900" className="text-orange-300 hover:underline">080-69038900</a></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>support@sankaraeye.com / donations@sankaraeye.com</span>
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
                  Sponsor Cataract Surgery (₹3,750)
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
