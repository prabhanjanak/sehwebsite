import React from 'react';
import { Eye, ShieldCheck, CheckCircle2, Phone, Heart, Users, HelpCircle, ArrowRight } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

interface PledgeEyesPageProps {
  navigate: (route: string) => void;
}

export const PledgeEyesPage: React.FC<PledgeEyesPageProps> = ({ navigate }) => {
  const { openPledgeModal } = useDatabase();

  const myths = [
    {
      myth: 'Eye donation disfigures the face of the deceased.',
      fact: 'Eye donation removes only the paper-thin clear corneal layer (or whole eyeball with a prosthetic replacement), leaving no disfigurement or hollow appearance.'
    },
    {
      myth: 'People who wear glasses or have cataracts cannot pledge eyes.',
      fact: 'Anyone, regardless of age, glasses power, prior cataract surgery, or systemic hypertension/diabetes, can donate their eyes.'
    },
    {
      myth: 'Eyes can be harvested days after death.',
      fact: 'Eye harvesting must occur within 6 hours of death. The eye bank retrieval team visits the home directly upon notification.'
    },
    {
      myth: 'Eye donation violates religious scriptures.',
      fact: 'All major religions support organ and eye donation as the highest act of charity and selfless compassion (Daanam).'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Eye className="w-3.5 h-3.5" />
            <span>Sri Jayendra Saraswathi Eye Bank</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Pledge Your Eyes After Life
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Light up the lives of two blind individuals. Your eyes can continue to see the world even after you leave it.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Urgent Helpline Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border-2 border-orange-500 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              24/7 Eye Bank Emergency Lines
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">To Donate Eyes Upon Demise</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Call our grief counseling and mobile corneal harvesting team immediately within 6 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:7619519555"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span>Eye Bank: 7619519555</span>
            </a>
            <a
              href="tel:08069038900"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700"
            >
              <Phone className="w-4 h-4" />
              <span>080-69038900</span>
            </a>
          </div>
        </div>

        {/* Pledge Registration Callout */}
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 sm:p-12 border-2 border-orange-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="badge-sankara text-xs">Simple 1-Minute Process</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Register Your Digital Eye Pledge Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When you submit your pledge, you receive an official <strong>Digital Eye Donor Card</strong> with a unique registration ID. Share this card with your family members and next of kin so they are aware of your noble wish.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Instant Digital Donor Card Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Registered with National Eye Bank Network</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 text-center">
            <button
              onClick={() => openPledgeModal()}
              className="btn-primary !px-8 !py-4 text-sm font-extrabold shadow-glow w-full sm:w-auto"
            >
              <Eye className="w-5 h-5" />
              <span>Pledge My Eyes Now →</span>
            </button>
          </div>
        </div>

        {/* Myths vs Facts */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-trust text-xs mb-1">Knowledge & Awareness</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Myths vs Facts in Eye Donation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myths.map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-[11px] flex-shrink-0">
                    MYTH
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-snug">{item.myth}</p>
                </div>
                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200">
                  <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px] flex-shrink-0">
                    FACT
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
