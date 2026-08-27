import React, { useState } from 'react';
import { BookOpen, Calendar, User, Clock, Search, ArrowRight } from 'lucide-react';
import { BLOGS_DATA } from '../data/blogsData';

interface BlogPageProps {
  navigate: (route: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ navigate }) => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allTags = ['All', 'Cataract', 'LASIK', 'Glaucoma', 'Paediatric', 'IOL', 'OCT'];

  const filteredBlogs = BLOGS_DATA.filter((post) => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Knowledge & Patient Education</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Ophthalmic Health & Vision Blog
          </h1>
          <p className="text-sm sm:text-base text-orange-100 max-w-3xl leading-relaxed">
            Written and vetted by senior ophthalmologists from Sankara Eye Hospital to guide your family’s eye health decisions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Filters */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search eye symptoms, treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-card-hover hover:border-orange-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="space-y-2 pt-2 text-xs text-slate-600 leading-relaxed">
                    {post.content.slice(0, 2).map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                  <User className="w-4 h-4 text-orange-600" />
                  <span>{post.author}</span>
                </div>
                <div className="flex gap-1">
                  {post.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
