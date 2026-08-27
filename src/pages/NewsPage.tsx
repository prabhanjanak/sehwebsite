import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  Search, 
  ExternalLink, 
  ArrowLeft, 
  BookOpen, 
  X, 
  CheckCircle2, 
  Share2, 
  Sparkles,
  Building2,
  Clock,
  Quote
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import { PressItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsPageProps {
  navigate: (route: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ navigate }) => {
  const { newsList, newslettersList, openNewsletterReader, showToast } = useDatabase();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<PressItem | null>(null);

  const categories = ['All', 'Hospital Launch', 'National Award', 'Technology & Clinical', 'Milestone', 'Outreach & Paediatrics', 'Education & Research'];

  const filteredPress = newsList.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white font-sans text-slate-900">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Official Media Center & Press Releases</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            News Releases & Press Coverage
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Latest official announcements, hospital inaugurations, clinical laser breakthroughs, and national humanitarian honors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-white font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPress.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              <div>
                {item.image && (
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-black text-orange-700 shadow-xs border border-orange-100">
                      {item.category}
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-bold text-slate-800">{item.source}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-orange-500" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Clickable Action Bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-orange-600 font-black group-hover:bg-orange-50/80 transition-colors">
                <span className="flex items-center gap-1 group-hover:underline">
                  <span>Read Full Coverage</span>
                  <span>→</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </div>
            </div>
          ))}
        </div>

        {/* 📄 Interactive Vision Bulletins & Quarterly Newsletters */}
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">Foundation Publications</div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Quarterly Vision Bulletins & Reports</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click on any edition to open the interactive digital magazine reader with full articles, photos, and milestones.
              </p>
            </div>
            <span className="px-3.5 py-1.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-orange-600" />
              <span>Interactive Digital Reader</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newslettersList.map((nl) => (
              <div
                key={nl.id}
                onClick={() => openNewsletterReader(nl)}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all p-5 flex flex-col justify-between cursor-pointer group space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative h-48 w-full bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-3 border border-slate-100">
                    <img
                      src={nl.coverImage}
                      alt={nl.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {nl.date}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-orange-600 uppercase font-mono tracking-wide">
                      {nl.edition}
                    </span>
                    <h4 className="text-xs font-black text-slate-900 leading-snug group-hover:text-orange-600 transition-colors mt-0.5">
                      {nl.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 font-normal">
                      {nl.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
                  <span className="group-hover:underline flex items-center gap-1 font-black">
                    <span>Read Edition</span>
                    <span>→</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{nl.fileSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 📰 FULL NEWS COVERAGE & ARTICLE READER MODAL                              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            
            {/* Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 z-10 my-auto max-h-[92vh] overflow-y-auto text-left"
            >
              
              {/* Header Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-black uppercase font-mono">
                      {selectedArticle.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedArticle.date}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                    <span>Source: {selectedArticle.source}</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Article Image */}
              {selectedArticle.image && (
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Key Takeaways Callout Box */}
              {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 space-y-2 text-xs">
                  <h4 className="font-black text-orange-950 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>Key Takeaways & Impact Milestones</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-medium text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Multi-Paragraph Comprehensive Article Body */}
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedArticle.content && selectedArticle.content.length > 0 ? (
                  selectedArticle.content.map((para, pIdx) => (
                    <p key={pIdx}>
                      {para}
                    </p>
                  ))
                ) : (
                  <p>
                    {selectedArticle.summary}
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-[11px] text-slate-400">
                  Published by Sri Kanchi Kamakoti Medical Trust Communications
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        showToast('Article link copied to clipboard!');
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="btn-primary !py-2 px-5 text-xs font-black shadow-xs"
                  >
                    Done Reading
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
