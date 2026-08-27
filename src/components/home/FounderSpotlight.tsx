import React from 'react';
import { Award, Heart, CheckCircle2, ChevronRight, Quote } from 'lucide-react';
import { DOCTORS_DATA } from '../../data/doctorsData';

interface FounderSpotlightProps {
  navigate: (route: string) => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ navigate }) => {
  const founder = DOCTORS_DATA[0]; // Dr. R.V. Ramani

  return (
    <section className="py-16 bg-gradient-to-b from-white via-orange-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Orange Gradient Backing */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Photo */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-4 border-orange-500 shadow-xl bg-slate-800">
                  <img
                    src={founder.image || '/assets/images/New-Project-27.jpg'}
                    alt="Dr. R.V. Ramani"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Award className="w-3.5 h-3.5" />
                  <span>Padma Shri 2019</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                <div className="text-xs text-orange-400 font-semibold">{founder.designation}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Sri Kanchi Kamakoti Medical Trust</div>
              </div>
            </div>

            {/* Right Biography & Legacy */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold border border-orange-500/30">
                <Heart className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                <span>Four Decades of Humanitarian Service</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                "No person should needlessly live in darkness when a simple 10-minute surgery can restore sight."
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In 1977, Dr. R.V. Ramani and Dr. Radha Ramani founded a humble primary healthcare clinic in Coimbatore under the divine guidance and blessings of Kanchi Kamakoti Peetham. Observing that 80% of blind people in India suffered from curable cataracts simply due to poverty, Dr. Ramani conceptualized the globally celebrated <strong className="text-white">80:20 self-sustaining cross-subsidy model</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Conferred <strong>Padma Shri</strong> by the President of India in 2019</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Created network of 14 hospitals performing 2.6M+ free surgeries</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Founded Sankara Academy of Vision & Optometry Colleges</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Global speaker at WHO & Harvard School of Public Health</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/about/founder')}
                  className="btn-primary !px-6 !py-2.5 text-xs font-bold"
                >
                  <span>Read Full Dr. R.V. Ramani Biography</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/about')}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  <span>About Sri Kanchi Kamakoti Medical Trust →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
