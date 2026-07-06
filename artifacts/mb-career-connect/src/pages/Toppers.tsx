import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Trophy, Star, Award, Code2, Rocket, GitBranch,
  BookOpen, DollarSign, Briefcase, GraduationCap, Medal, Crown, ChevronRight
} from 'lucide-react';

const categories = [
  { id: 'placement', label: 'Placement', icon: Briefcase, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
  { id: 'academic', label: 'Academic', icon: GraduationCap, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
  { id: 'internship', label: 'Internship', icon: Award, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
  { id: 'startup', label: 'Startup', icon: Rocket, color: 'text-violet-500 bg-violet-500/10 border-violet-500/20' },
  { id: 'freelance', label: 'Freelance', icon: DollarSign, color: 'text-pink-500 bg-pink-500/10 border-pink-500/20' },
  { id: 'opensource', label: 'Open Source', icon: GitBranch, color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' },
  { id: 'hackathon', label: 'Hackathon', icon: Code2, color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
  { id: 'scholarship', label: 'Scholarship', icon: BookOpen, color: 'text-red-500 bg-red-500/10 border-red-500/20' },
];

const achievers = {
  placement: [
    { name: 'Rohan Kumar', college: 'IIT Bombay', achievement: 'Placed at Google with ₹48 LPA package', tips: 'Practice DSA daily for 6 months, focus on system design.', timeline: 'Nov 2023', badge: '🏆 Highest Package', rank: 1 },
    { name: 'Divya Nair', college: 'NIT Calicut', achievement: 'Microsoft SDE at ₹42 LPA as fresher', tips: 'Mock interviews were game-changing for me.', timeline: 'Dec 2023', badge: '⭐ Microsoft Star', rank: 2 },
    { name: 'Aakash Verma', college: 'BITS Goa', achievement: 'Amazon SDE-2 off-campus at ₹38 LPA', tips: 'Build real projects, not just LeetCode grind.', timeline: 'Oct 2023', badge: '🚀 Off-Campus Win', rank: 3 },
    { name: 'Kavya Menon', college: 'VIT Vellore', achievement: 'Goldman Sachs quant role at ₹35 LPA', tips: 'Quantitative skills + coding is a deadly combo.', timeline: 'Jan 2024', badge: '💹 Finance Tech', rank: 4 },
    { name: 'Saurabh Tiwari', college: 'DTU Delhi', achievement: 'Cisco network engineer at ₹32 LPA', tips: 'Certifications matter in networking roles.', timeline: 'Feb 2024', badge: '🌐 Network Pro', rank: 5 },
    { name: 'Anushka Das', college: 'Jadavpur Univ', achievement: 'Adobe design engineer at ₹30 LPA', tips: 'Portfolio quality > quantity of projects.', timeline: 'Mar 2024', badge: '🎨 Design + Code', rank: 6 },
  ],
  startup: [
    { name: 'Rahul Jain', college: 'IIT Delhi', achievement: 'Founded Zepto – $1.4B valuation', tips: 'Solve a real problem you understand deeply.', timeline: '2021–Present', badge: '🦄 Unicorn Founder', rank: 1 },
    { name: 'Aditi Sharma', college: 'IIM Ahmedabad', achievement: 'Founded EdTech startup, raised $5M Series A', tips: 'Talk to 100 customers before writing a line of code.', timeline: '2022–Present', badge: '💡 EdTech Pioneer', rank: 2 },
    { name: 'Karan Bedi', college: 'IIIT Hyderabad', achievement: 'Founded FinTech SaaS, 500+ B2B clients', tips: 'B2B is harder but more sustainable.', timeline: '2023–Present', badge: '💰 B2B SaaS', rank: 3 },
  ],
};

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const cardAnim = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export function Toppers() {
  const [active, setActive] = useState('placement');
  const data = achievers[active as keyof typeof achievers] || achievers.placement;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[-5%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Trophy className="w-4 h-4" /> Hall of Fame
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Toppers & Achievers</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Celebrating the best of the best — placement heroes, startup founders, scholarship winners, and open source legends.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 h-11 px-6">
              Submit Achievement
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-6">
              Nominate Someone
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-10 justify-center md:justify-start">
            {[['5,000+', 'Achievers Listed'], ['₹48 LPA', 'Top Package'], ['50+', 'Unicorn Founders'], ['1,200+', 'Scholarship Winners']].map(([num, label]) => (
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
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                active === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Achiever Cards */}
        {data.length > 0 ? (
          <motion.div key={active} variants={container} initial="hidden" animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {data.map((a, i) => (
              <motion.div key={a.name} variants={cardAnim}
                className="bg-card border border-border rounded-2xl p-6 card-hover group relative overflow-hidden">
                {i === 0 && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-t-2xl" />}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                      i === 0 ? 'bg-yellow-500 text-white' : i === 1 ? 'bg-gray-400 text-white' : i === 2 ? 'bg-orange-500 text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      {i < 3 ? ['🥇','🥈','🥉'][i] : a.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{a.name}</h3>
                      <p className="text-xs text-muted-foreground">{a.college}</p>
                    </div>
                  </div>
                  <Crown className={`w-5 h-5 shrink-0 ${i === 0 ? 'text-yellow-500' : 'text-muted-foreground/30'}`} />
                </div>

                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-3">
                  {a.badge}
                </span>

                <p className="text-sm font-medium text-foreground mb-2">{a.achievement}</p>

                <div className="bg-secondary/50 rounded-xl p-3 mb-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">💡 Tip: </span>{a.tips}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> {a.timeline}</span>
                  <Button size="sm" variant="ghost" className="text-primary h-auto py-0 px-2 text-xs gap-1">
                    Full Story <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <Medal className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">Achievers coming soon in this category</p>
            <p className="text-sm mt-1">Be the first to be featured!</p>
            <Button className="mt-6 btn-glow">Submit Your Achievement</Button>
          </div>
        )}

        {/* Submit CTA */}
        <div className="glass-card rounded-3xl p-8 text-center">
          <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Are You an Achiever?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Got placed at a dream company? Won a hackathon? Founded a startup? Share your story and inspire thousands.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button className="btn-glow gap-2"><Trophy className="w-4 h-4" /> Submit Your Story</Button>
            <Button variant="outline" className="gap-2"><Medal className="w-4 h-4" /> Nominate a Friend</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
