import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  Zap, Trophy, Calendar, DollarSign, Users, Search,
  Code2, Palette, Rocket, Brain, Star, Clock, ChevronRight, Mail, Building, Tag
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'coding', label: 'Coding Contests' },
  { id: 'design', label: 'Design Challenges' },
  { id: 'startup', label: 'Startup Competitions' },
  { id: 'ai', label: 'AI Challenges' },
  { id: 'innovation', label: 'Innovation' },
];

const competitions = [
  {
    title: 'Smart India Hackathon 2025',
    org: 'Ministry of Education, India',
    type: 'hackathon',
    prize: '₹1,00,000',
    deadline: 'Aug 15, 2025',
    eligibility: 'UG/PG Students',
    mode: 'Hybrid',
    teamSize: '2-6',
    featured: true,
    tag: 'Government',
    tagColor: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Google Summer of Code 2025',
    org: 'Google',
    type: 'coding',
    prize: '$1,500 – $3,300',
    deadline: 'Apr 2, 2025',
    eligibility: '18+ students',
    mode: 'Remote',
    teamSize: 'Solo',
    featured: true,
    tag: 'Open Source',
    tagColor: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Flipkart Grid 6.0',
    org: 'Flipkart',
    type: 'hackathon',
    prize: '₹5,00,000',
    deadline: 'Jul 31, 2025',
    eligibility: 'Engineering Students',
    mode: 'Online + Onsite',
    teamSize: '2-4',
    featured: true,
    tag: 'Corporate',
    tagColor: 'text-orange-600 bg-orange-500/10 border-orange-500/20',
  },
  {
    title: 'NASSCOM AI Gamechangers',
    org: 'NASSCOM',
    type: 'ai',
    prize: '₹2,00,000',
    deadline: 'Sep 10, 2025',
    eligibility: 'Students & Professionals',
    mode: 'Remote',
    teamSize: '1-3',
    featured: false,
    tag: 'AI/ML',
    tagColor: 'text-violet-600 bg-violet-500/10 border-violet-500/20',
  },
  {
    title: 'IIMB iDiya Startup Challenge',
    org: 'IIM Bangalore',
    type: 'startup',
    prize: '₹10,00,000 + Incubation',
    deadline: 'Oct 5, 2025',
    eligibility: 'Startups < 3 years',
    mode: 'Onsite Bangalore',
    teamSize: '2-5',
    featured: false,
    tag: 'Startup',
    tagColor: 'text-pink-600 bg-pink-500/10 border-pink-500/20',
  },
  {
    title: 'HackerEarth Developer Sprint',
    org: 'HackerEarth',
    type: 'coding',
    prize: '₹50,000',
    deadline: 'Ongoing',
    eligibility: 'All Developers',
    mode: 'Online',
    teamSize: 'Solo',
    featured: false,
    tag: 'Coding',
    tagColor: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/20',
  },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export function Hackathons() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? competitions : competitions.filter(c => c.type === active);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[0%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Zap className="w-4 h-4" /> Hackathons & Competitions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Compete, Build,<br />Win Big</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Find hackathons, coding contests, design challenges, and startup competitions. Win prizes, gain exposure, and launch your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                placeholder="Search competitions…"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none text-sm"
              />
            </div>
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 shrink-0">Search</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-10 justify-center md:justify-start">
            {[['200+', 'Active Competitions'], ['₹50L+', 'Total Prize Pool'], ['80K+', 'Participants'], ['1,200+', 'Winners']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-primary">{num}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-12">

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                active === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 mb-8" style={{ background: 'var(--hero-gradient)' }}>
          <div className="aurora-orb aurora-orb-1 absolute w-64 h-64 top-[-30%] left-[-5%] opacity-40" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <Trophy className="w-9 h-9 text-yellow-300" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Featured Opportunity</span>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-1">Smart India Hackathon 2025</h3>
              <p className="text-white/70 text-sm mt-1">India's largest hackathon · ₹1,00,000 prize · Register before Aug 15</p>
            </div>
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 shrink-0 gap-2">
              View Details <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Competition Cards */}
        <motion.div key={active} variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map(comp => (
            <motion.div key={comp.title} variants={item}
              className="bg-card border border-border rounded-2xl p-6 card-hover group flex flex-col">
              {comp.featured && (
                <div className="flex items-center gap-1.5 mb-3">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-semibold text-yellow-600">Featured</span>
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug pr-2">{comp.title}</h3>
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${comp.tagColor}`}>
                  {comp.tag}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                <Building className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{comp.org}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="bg-secondary/50 rounded-xl p-2.5">
                  <div className="text-xs text-muted-foreground mb-0.5">Prize Pool</div>
                  <div className="font-bold text-foreground text-sm">{comp.prize}</div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-2.5">
                  <div className="text-xs text-muted-foreground mb-0.5">Deadline</div>
                  <div className="font-bold text-foreground text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary" /> {comp.deadline}
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-2.5">
                  <div className="text-xs text-muted-foreground mb-0.5">Eligibility</div>
                  <div className="font-semibold text-foreground text-xs">{comp.eligibility}</div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-2.5">
                  <div className="text-xs text-muted-foreground mb-0.5">Team Size</div>
                  <div className="font-semibold text-foreground text-xs flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" /> {comp.teamSize}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">View Details</Button>
                <Button size="sm" className="flex-1 text-xs btn-glow relative">
                  Register
                  <span className="absolute -top-2 -right-2 text-[9px] font-bold px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full">Soon</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Notify */}
        <div className="glass-card rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Never Miss a Competition</h3>
          <p className="text-muted-foreground mb-6">Get notified about new hackathons, contests, and deadlines tailored to your skills.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <Input type="email" placeholder="your@email.com" className="h-11 flex-1" />
            <Button type="submit" className="h-11 btn-glow px-6 shrink-0">Get Alerts</Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
