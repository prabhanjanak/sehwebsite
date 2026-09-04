import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Download, 
  Share2, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Quote,
  Eye,
  FileText
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const NewsletterReaderModal: React.FC = () => {
  const { activeNewsletterForReader, closeNewsletterReader, showToast } = useDatabase();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (!activeNewsletterForReader) return null;

  const pages = activeNewsletterForReader.pages || [
    {
      pageNumber: 1,
      title: activeNewsletterForReader.title,
      subtitle: activeNewsletterForReader.edition,
      content: [
        activeNewsletterForReader.description,
        'This quarterly bulletin provides verified updates on our rural healthcare camps, clinical surgical milestones, and foundation achievements across our national network.'
      ],
      highlights: ['100% NABH Certified Quality', '2.6M+ Free Surgeries Restored', 'Unique Hybrid Cross-Subsidy']
    }
  ];

  const totalPages = pages.length;
  const currentPage = pages[currentPageIndex];

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Dark Dim Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeNewsletterReader}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Reader Container Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 z-10 my-auto flex flex-col max-h-[92vh]"
        >
          
          {/* Reader Top Bar */}
          <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-3 border-b border-slate-800 flex-shrink-0">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h3 className="text-xs sm:text-sm font-black text-white leading-tight truncate max-w-[240px] sm:max-w-md">
                  {activeNewsletterForReader.title}
                </h3>
                <div className="text-[10px] text-orange-400 font-semibold flex items-center gap-2">
                  <span>{activeNewsletterForReader.edition}</span>
                  <span>•</span>
                  <span>{activeNewsletterForReader.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  showToast('Preparing full print edition PDF download...');
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>PDF Download</span>
              </button>

              <button
                onClick={closeNewsletterReader}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Close Reader"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Reader Body (Book Spread / Page View) */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-left">
            
            {/* Editorial / Cover Header when on page 1 */}
            {currentPageIndex === 0 && activeNewsletterForReader.editorialMessage && (
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-orange-800 uppercase tracking-wide">
                  <Quote className="w-4 h-4 text-orange-600" />
                  <span>Chairman & Founder's Dispatch</span>
                </div>
                <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                  "{activeNewsletterForReader.editorialMessage}"
                </p>
                <div className="text-[11px] font-bold text-orange-900 text-right">
                  — Dr. R.V. Ramani & Dr. Radha Ramani (Managing Trustees)
                </div>
              </div>
            )}

            {/* Current Page Content */}
            <div className="space-y-4">
              
              <div className="border-b border-slate-100 pb-3">
                <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-wider mb-1">
                  ARTICLE {currentPage.pageNumber} OF {totalPages}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {currentPage.title}
                </h2>
                {currentPage.subtitle && (
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {currentPage.subtitle}
                  </p>
                )}
              </div>

              {/* Multi-Paragraph Article Content */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {currentPage.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Highlights Box */}
              {currentPage.highlights && currentPage.highlights.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>Key Report Highlights & Metrics</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentPage.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Page Quote (If Available) */}
              {currentPage.quote && (
                <div className="p-3.5 rounded-xl bg-slate-900 text-white text-center italic text-xs font-medium">
                  "{currentPage.quote}"
                </div>
              )}

            </div>

          </div>

          {/* Reader Bottom Navigation Bar */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between gap-3 flex-shrink-0">
            
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                currentPageIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            {/* Page indicator pills */}
            <div className="flex items-center gap-1.5">
              {pages.map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => setCurrentPageIndex(pIdx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPageIndex === pIdx
                      ? 'w-6 bg-orange-600'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Page ${pIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPageIndex === totalPages - 1}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                currentPageIndex === totalPages - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-500 text-white shadow-xs font-black'
              }`}
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
