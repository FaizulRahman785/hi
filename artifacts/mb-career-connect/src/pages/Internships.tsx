import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OpportunityCard } from '@/components/OpportunityCard';
import { internships } from '@/data/jobs';
import { Search, MapPin, SlidersHorizontal, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

export function Internships() {
  const [filtersOpen, setFiltersOpen] = useState(false);

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
              <GraduationCap className="w-3.5 h-3.5" />
              For Students & Fresh Graduates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Find Internships</h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Kickstart your career with hands-on experience at leading companies across India.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow pb-20">
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar Filters — desktop always visible, mobile collapsible */}
            <aside className="w-full lg:w-64 shrink-0">
              {/* Mobile toggle */}
              <button
                className="lg:hidden w-full flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-3.5 mb-3 text-sm font-semibold text-foreground"
                onClick={() => setFiltersOpen(v => !v)}
                aria-expanded={filtersOpen}
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" /> Filters
                </span>
                {filtersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <div
                id="internships-filters"
                className={filtersOpen ? 'block' : 'hidden lg:block'}
                aria-hidden={!filtersOpen}
              >
                    <div className="bg-card border border-border rounded-2xl p-6 lg:sticky lg:top-28 shadow-sm">
                      <div className="flex items-center gap-2 mb-6 text-base font-bold text-foreground border-b border-border pb-4">
                        <SlidersHorizontal className="w-4 h-4 text-primary" /> Filters
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Duration</h3>
                          <div className="space-y-2.5">
                            {['1-3 Months', '3-6 Months', '6+ Months', 'Part-time'].map((d) => (
                              <div key={d} className="flex items-center space-x-2">
                                <Checkbox id={`dur-${d}`} />
                                <label htmlFor={`dur-${d}`} className="text-sm text-muted-foreground cursor-pointer select-none">{d}</label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Stipend</h3>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Any Stipend" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="any">Any Stipend</SelectItem>
                              <SelectItem value="unpaid">Unpaid / Certificate</SelectItem>
                              <SelectItem value="5-10k">₹5k – ₹10k/mo</SelectItem>
                              <SelectItem value="10-20k">₹10k – ₹20k/mo</SelectItem>
                              <SelectItem value="20k+">₹20k+/mo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Work Mode</h3>
                          <div className="space-y-2.5">
                            {['Remote', 'Hybrid', 'In-Office'].map((m) => (
                              <div key={m} className="flex items-center space-x-2">
                                <Checkbox id={`mode-${m}`} />
                                <label htmlFor={`mode-${m}`} className="text-sm text-muted-foreground cursor-pointer select-none">{m}</label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full btn-glow shadow-md">Apply Filters</Button>
                      </div>
                    </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-card p-2 rounded-2xl border border-border mb-6 flex flex-col sm:flex-row gap-2 shadow-sm">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Role, skills or company" className="pl-9 border-0 shadow-none focus-visible:ring-0 h-12 bg-transparent" />
                </div>
                <div className="w-px bg-border hidden sm:block" />
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="City or Remote" className="pl-9 border-0 shadow-none focus-visible:ring-0 h-12 bg-transparent" />
                </div>
                <Button className="h-12 px-8 rounded-xl btn-glow">Search</Button>
              </div>

              <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing <span className="font-bold text-foreground">{internships.length * 2}</span> internships</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-36 h-8 text-xs bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="stipend">Highest Stipend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {[...internships, ...internships].map((job, idx) => (
                  <motion.div
                    key={`${job.id}-${idx}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, delay: (idx % 4) * 0.06 }}
                  >
                    <OpportunityCard {...job} id={`${job.id}-${idx}`} isInternship />
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <div className="flex gap-1">
                  {['‹', '1', '2', '3', '›'].map((p, i) => (
                    <Button
                      key={p}
                      variant={i === 1 ? 'default' : 'outline'}
                      size="icon"
                      className={i === 1 ? 'btn-glow' : 'bg-card border-border text-muted-foreground hover:text-foreground'}
                      disabled={p === '‹'}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
