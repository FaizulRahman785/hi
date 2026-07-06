import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { courses } from '@/data/courses';
import { Search, BookOpen, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Software Development', 'Data Science', 'Design', 'Digital Marketing', 'Cloud Computing', 'Finance', 'Soft Skills'];

export function Courses() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = active === 'All' ? courses : courses.filter(c => c.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, query]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-28 pb-14 overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-[500px] h-[500px] top-[-40%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-80 h-80 bottom-[-50%] right-[-5%] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
              <BookOpen className="w-3.5 h-3.5" /> Professional Skill Development
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Master In-Demand Skills</h1>
            <p className="text-white/80 text-lg max-w-2xl mb-8">
              Industry-recognized certification courses designed to make you job-ready. Learn from experts and accelerate your career growth.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search courses, instructors…"
                className="pl-12 pr-10 h-14 rounded-xl bg-white/95 text-foreground border-0 focus-visible:ring-4 focus-visible:ring-primary/30 text-base placeholder:text-muted-foreground shadow-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow pb-20">
        <div className="container mx-auto px-4 mt-10">
          {/* Category Filter */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              {active === 'All' ? 'All Courses' : active}
              {filtered.length > 0 && (
                <span className="ml-2 text-base font-normal text-muted-foreground">({filtered.length})</span>
              )}
            </h2>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                    active === cat
                      ? 'bg-primary text-primary-foreground border-primary shadow-md btn-glow'
                      : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${active}-${query}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: (idx % 4) * 0.06 }}
                  >
                    <CourseCard {...course} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6 max-w-xs">
                  Try adjusting your search or selecting a different category.
                </p>
                <button
                  onClick={() => { setActive('All'); setQuery(''); }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
