import React, { useState } from 'react';
import { 
  Quote, 
  Heart, 
  Star, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  UserCheck,
  Building2,
  Filter,
  Check
} from 'lucide-react';
import { GOOGLE_HOSPITAL_REVIEWS, GoogleHospitalReview } from '../data/googleReviewsData';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { useDatabase } from '../context/DatabaseContext';

interface TestimonialsPageProps {
  navigate: (route: string) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ navigate }) => {
  const { openAppointmentModal } = useDatabase();
  const [selectedUnit, setSelectedUnit] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'google' | 'stories'>('google');

  // List of hospital units for filter selector
  const units = [
    'All',
    'Varanasi',
    'Bangalore',
    'Shimoga',
    'Coimbatore',
    'Guntur',
    'Ludhiana',
    'Jaipur',
    'Kanpur',
    'Indore',
    'Panvel',
    'Anand',
    'Hyderabad',
    'Krishnankoil'
  ];

  const filteredReviews = selectedUnit === 'All'
    ? GOOGLE_HOSPITAL_REVIEWS
    : GOOGLE_HOSPITAL_REVIEWS.filter((r) => 
        r.city.toLowerCase().includes(selectedUnit.toLowerCase()) || 
        r.unitName.toLowerCase().includes(selectedUnit.toLowerCase())
      );

  const getInitials = (name: string) => {
    return name
      .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Master)\s+/i, '')
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>Google 5-Star Verified Hospital Reviews</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Patient Reviews Across All Sankara Units
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Authentic Google ratings and clinical testimonials from patients treated across all 14 super-specialty hospital units in India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Navigation Mode Selector & Unit Filter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-200">
          
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('google')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'google'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Google 5★ Reviews ({GOOGLE_HOSPITAL_REVIEWS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'stories'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Quote className="w-3.5 h-3.5" />
              <span>Clinical Testimonials</span>
            </button>
          </div>

          {/* Unit Dropdown Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Filter by Unit:</span>
            </span>

            <div className="flex-1 md:w-64">
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-500"
                aria-label="Filter by hospital unit"
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u === 'All' ? 'All Hospital Units (14 Branches)' : `${u} Unit`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* TAB 1: GOOGLE 5-STAR REVIEWS GRID */}
        {activeTab === 'google' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-500">
                Showing {filteredReviews.length} verified 5-Star reviews {selectedUnit !== 'All' ? `for ${selectedUnit} Hospital` : 'across all units'}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Check className="w-3.5 h-3.5" />
                <span>100% 5.0 Rated Patient Experiences</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-6 border-2 border-orange-100/80 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Top: Google Reviews Source Badge & 5 Stars */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>

                      <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700">
                        <span className="text-blue-600 font-extrabold">G</span>
                        <span>Google Reviews</span>
                      </div>
                    </div>

                    {/* Hospital Unit Badge */}
                    <div>
                      <div className="text-xs font-black text-slate-900 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-orange-600" />
                        <span>{rev.unitName}</span>
                      </div>
                      <div className="text-[11px] text-orange-600 font-semibold flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{rev.city}, {rev.state}</span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-xs text-slate-700 leading-relaxed font-normal italic">
                      "{rev.reviewText}"
                    </p>

                    {/* Clinical Highlight */}
                    <div className="p-2.5 rounded-xl bg-orange-50/60 border border-orange-100 text-[11px] text-orange-900 font-semibold">
                      ✨ {rev.highlight}
                    </div>
                  </div>

                  {/* Reviewer Meta (No Photos - Dignified Initials Badge) */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        {getInitials(rev.reviewerName)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                          <span>{rev.reviewerName}</span>
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div className="text-[10px] text-slate-400">{rev.relativeTime}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md truncate max-w-[110px]">
                      {rev.treatment.split(' ')[0]} Care
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED CLINICAL TESTIMONIALS */}
        {activeTab === 'stories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-orange-100 shadow-md hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Quote className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <span className="badge-sankara text-xs font-bold">{item.hospital}</span>
                  </div>

                  <blockquote className="text-sm sm:text-base text-slate-800 font-bold italic leading-relaxed pt-1">
                    "{item.quote}"
                  </blockquote>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.story}
                  </p>

                  <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-200/70 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Diagnosis / Condition:</span>
                      <strong className="text-slate-900 font-bold">{item.condition}</strong>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-orange-100">
                      <span className="text-slate-500 font-medium">Surgical Procedure:</span>
                      <strong className="text-orange-700 font-bold">{item.treatment}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                      {getInitials(item.patientName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                        <span>{item.patientName}</span>
                        {item.age && <span className="text-xs text-slate-500 font-medium">({item.age} yrs)</span>}
                        <UserCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Verified Outcome
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black">
            Experience 5-Star Ophthalmic Care at Your Nearest Sankara Hospital
          </h3>
          <p className="text-xs sm:text-sm text-orange-100 max-w-2xl mx-auto">
            Book a priority consultation with fellowship-trained senior ophthalmic surgeons across 14 hospitals nationwide.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => openAppointmentModal()}
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-xl font-bold text-xs shadow-lg transition-all"
            >
              Book Priority OPD Appointment →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
