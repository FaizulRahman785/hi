import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MentorCard } from '@/components/MentorCard';
import { mentors } from '@/data/mentors';
import { Users, Search, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const SPECIALIZATIONS = ['All', 'Engineering', 'Data Science', 'Design', 'Marketing', 'Product', 'Finance'];

export function Mentors() {
  const [query, setQuery] = useState('');
  const [activeSpec, setActiveSpec] = useState('All');

  const filtered = useMemo(() => {
    let list = mentors;
    if (activeSpec !== 'All') {
      list = list.filter(m =>
        m.specialization.some(s => s.toLowerCase().includes(activeSpec.toLowerCase()))
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        m.specialization.some(s => s.toLowerCase().includes(q))
      );
    }
    return list;
  }, [query, activeSpec]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-28 pb-14 overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-40%] left-[-8%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-72 h-72 bottom-[-50%] right-[-5%] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
              <Users className="w-3.5 h-3.5" /> 1-on-1 Guidance
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Connect with Industry Mentors</h1>
            <p className="text-white/80 text-lg max-w-2xl mb-8">
              Get personalized guidance, resume reviews, and mock interviews from professionals at top companies.
            </p>
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name, company, or skill…"
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
        <div className="container mx-auto px-4 mt-8">
          {/* Filter Bar */}
          <div className="flex items-center justify-between border-b border-border pb-5 mb-6 flex-wrap gap-4">
            <p className="text-muted-foreground font-medium">
              <span className="font-bold text-foreground">{filtered.length}</span> mentors available
            </p>
            <div className="flex gap-2 flex-wrap">
              {SPECIALIZATIONS.map(spec => (
                <button
                  key={spec}
                  onClick={() => setActiveSpec(spec)}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-colors border ${
                    activeSpec === spec
                      ? 'bg-primary text-primary-foreground border-primary btn-glow'
                      : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                  }`}
                >
                  {spec === 'All' && <SlidersHorizontal className="w-3.5 h-3.5" />}
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeSpec}-${query}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((mentor, idx) => (
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: (idx % 4) * 0.07 }}
                  >
                    <MentorCard {...mentor} />
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
                  <Users className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No mentors found</h3>
                <p className="text-muted-foreground mb-6 max-w-xs">
                  Try a different search term or specialization filter.
                </p>
                <button
                  onClick={() => { setActiveSpec('All'); setQuery(''); }}
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
