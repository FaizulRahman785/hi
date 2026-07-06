import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  GraduationCap, Calendar, CheckCircle2, Star, Search,
  ChevronRight, Bell, Users, Award, Globe, Heart, Trophy,
  Building2, BookOpen
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Scholarships', icon: Award },
  { id: 'government', label: 'Government', icon: Building2 },
  { id: 'private', label: 'Private', icon: Trophy },
  { id: 'international', label: 'International', icon: Globe },
  { id: 'merit', label: 'Merit-Based', icon: Star },
  { id: 'need', label: 'Need-Based', icon: Heart },
];

const categoryStyle: Record<string, string> = {
  government: 'bg-blue-500/10 text-blue-600 border-blue-200',
  private: 'bg-violet-500/10 text-violet-600 border-violet-200',
  international: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  merit: 'bg-amber-500/10 text-amber-600 border-amber-200',
  need: 'bg-rose-500/10 text-rose-600 border-rose-200',
};

const scholarships = [
  {
    id: 1,
    name: 'Prime Minister\'s Scholarship Scheme',
    provider: 'Ministry of Education, Govt. of India',
    category: 'government',
    categoryLabel: 'Government',
    amount: '₹36,000/year',
    eligibility: ['B.Tech / B.E. students', 'Min. 60% in 10+2', 'Family income < ₹6 LPA'],
    benefits: 'Covers tuition fees + monthly stipend of ₹3,000',
    deadline: 'Aug 31, 2025',
    seats: 5500,
    featured: true,
    tags: ['Engineering', 'Central Govt.', 'Annual Renewal'],
  },
  {
    id: 2,
    name: 'National Merit Scholarship',
    provider: 'MHRD — National Scholarship Portal',
    category: 'merit',
    categoryLabel: 'Merit-Based',
    amount: '₹12,000/year',
    eligibility: ['Class 11 & 12 students', 'Min. 80% in previous exam', 'All streams'],
    benefits: 'Annual scholarship for academic excellence',
    deadline: 'Sep 15, 2025',
    seats: 82,
    featured: false,
    tags: ['All Streams', 'Pre-University', 'MHRD'],
  },
  {
    id: 3,
    name: 'Tata Trusts Education Scholarship',
    provider: 'Tata Trusts',
    category: 'private',
    categoryLabel: 'Private',
    amount: 'Up to ₹1,50,000',
    eligibility: ['Undergraduate students', 'Merit + Financial need', 'Age < 25 years'],
    benefits: 'Full tuition, hostel, books, and laptop allowance',
    deadline: 'Oct 1, 2025',
    seats: 200,
    featured: false,
    tags: ['UG Students', 'Full Funding', 'Tata Group'],
  },
  {
    id: 4,
    name: 'Inlaks Shivdasani Foundation Award',
    provider: 'Inlaks Shivdasani Foundation',
    category: 'international',
    categoryLabel: 'International',
    amount: 'Full Cost of Study + Living',
    eligibility: ['Indian nationals', 'For PG / Research abroad', 'Age < 30 for PG, 35 for research'],
    benefits: 'Tuition, travel, living expenses for study abroad',
    deadline: 'Mar 31, 2026',
    seats: 25,
    featured: false,
    tags: ['Study Abroad', 'PG / PhD', 'Prestigious'],
  },
  {
    id: 5,
    name: 'Dr. Ambedkar Merit Scholarship',
    provider: 'Ministry of Social Justice, Govt. of India',
    category: 'government',
    categoryLabel: 'Government',
    amount: '₹20,000/year',
    eligibility: ['SC/ST students', 'Pursuing PG or Professional courses', 'Min. 60% in graduation'],
    benefits: 'Annual scholarship + book grant of ₹2,000',
    deadline: 'Nov 30, 2025',
    seats: 1000,
    featured: false,
    tags: ['SC/ST', 'PG Level', 'Social Justice'],
  },
  {
    id: 6,
    name: 'Infosys BPM Scholarship',
    provider: 'Infosys Foundation',
    category: 'private',
    categoryLabel: 'Private',
    amount: '₹50,000/year',
    eligibility: ['Women in STEM', 'Pursuing B.Tech / MCA', 'Min. 70% in previous exam'],
    benefits: 'Scholarship + mentorship from Infosys professionals + internship preference',
    deadline: 'Aug 15, 2025',
    seats: 300,
    featured: false,
    tags: ['Women in Tech', 'STEM', 'Infosys'],
  },
  {
    id: 7,
    name: 'Chevening Scholarship (UK)',
    provider: 'UK Foreign, Commonwealth & Development Office',
    category: 'international',
    categoryLabel: 'International',
    amount: 'Full Funding (£20,000+)',
    eligibility: ['Indian citizens', '2+ years work experience', 'Pursuing 1-year Masters in UK'],
    benefits: 'Tuition, living, travel, visa costs, and networking events',
    deadline: 'Nov 5, 2025',
    seats: 150,
    featured: false,
    tags: ['UK Masters', 'Fully Funded', 'Leadership'],
  },
  {
    id: 8,
    name: 'Need-Based College Access Grant',
    provider: 'MB Career Connect Foundation',
    category: 'need',
    categoryLabel: 'Need-Based',
    amount: '₹25,000 one-time',
    eligibility: ['Family income < ₹3 LPA', 'Any undergraduate course', 'Fresh admission only'],
    benefits: 'First-year tuition support + free premium course access',
    deadline: 'Jul 31, 2025',
    seats: 500,
    featured: false,
    tags: ['Freshers', 'Low Income', 'One-Time Grant'],
  },
];

export function Scholarships() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = scholarships.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.provider.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = scholarships.find(s => s.featured);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[-5%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <GraduationCap className="w-4 h-4" /> Scholarship Programs
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Scholarships & Grants</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Financial constraints should never stop brilliant minds. Discover government schemes, private grants, and international scholarships.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search scholarships…"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {[['500+', 'Scholarships Listed'], ['₹50 Cr+', 'Total Value'], ['5', 'Categories'], ['Annual', 'Updated']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-primary">{num}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured */}
        {featured && activeCategory === 'all' && !search && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                <Star className="w-3 h-3 fill-current" /> High Seats Available
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryStyle[featured.category]}`}>
                {featured.categoryLabel}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-1">{featured.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{featured.provider}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">Amount</div>
                <div className="text-2xl font-extrabold text-primary">{featured.amount}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">Deadline</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">{featured.deadline}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">Available Seats</div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">{featured.seats.toLocaleString()} seats</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-muted-foreground mb-2 uppercase font-semibold tracking-wider">Eligibility</div>
              <div className="flex flex-wrap gap-2">
                {featured.eligibility.map(e => (
                  <span key={e} className="flex items-center gap-1.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{e}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {featured.tags.map(tag => (
                <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">{tag}</span>
              ))}
            </div>
            <Button className="btn-glow gap-2 pointer-events-none opacity-80">
              Apply Now — Coming Soon <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(activeCategory === 'all' && !search ? filtered.filter(s => !s.featured) : filtered).map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-6 group card-hover flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryStyle[s.category]}`}>
                  {s.categoryLabel}
                </span>
                <span className="text-xl font-extrabold text-primary">{s.amount}</span>
              </div>

              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-snug">{s.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{s.provider}</p>

              <div className="mb-3">
                <div className="text-xs text-muted-foreground mb-2 font-semibold">Eligibility</div>
                <ul className="space-y-1">
                  {s.eligibility.slice(0, 2).map(e => (
                    <li key={e} className="flex items-center gap-1.5 text-sm text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />{e}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" />Deadline: {s.deadline}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-primary" />{s.seats} seats</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-secondary text-secondary-foreground border border-border">{tag}</span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  <span className="font-semibold text-foreground">Benefits: </span>{s.benefits}
                </div>
                <Button size="sm" className="w-full btn-glow text-sm pointer-events-none opacity-80 h-9">
                  Apply Now — Coming Soon
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">No scholarships found. Try a different filter.</p>
          </div>
        )}

        {/* Notify CTA */}
        <div className="mt-12 glass-card rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Get Scholarship Alerts</h3>
          <p className="text-muted-foreground mb-6">Never miss a deadline. Get personalized scholarship alerts based on your profile.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 h-11 px-4 rounded-xl bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
            />
            <Button className="h-11 btn-glow px-6 shrink-0">Alert Me</Button>
          </div>
        </div>

        {/* Explore More */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-foreground mb-6">More Opportunities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Courses', href: '/courses', icon: BookOpen },
              { label: 'Hackathons', href: '/hackathons', icon: Trophy },
              { label: 'Student Resources', href: '/student-resources', icon: GraduationCap },
              { label: 'Mentors', href: '/mentors', icon: Users },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl card-hover group">
                <link.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
