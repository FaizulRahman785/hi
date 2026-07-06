import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  DollarSign, Search, Star, Code2, Smartphone, Palette, PenTool,
  Brain, BarChart, FileText, Video, Megaphone, TrendingUp, Settings,
  MessageSquare, Briefcase, ChevronRight, Users, CheckCircle2, Mail
} from 'lucide-react';

const freelanceCategories = [
  { icon: Code2, label: 'Web Development', count: '2.4k+', color: 'text-blue-500 bg-blue-500/10' },
  { icon: Smartphone, label: 'Mobile Apps', count: '1.2k+', color: 'text-emerald-500 bg-emerald-500/10' },
  { icon: Palette, label: 'UI/UX Design', count: '1.8k+', color: 'text-violet-500 bg-violet-500/10' },
  { icon: PenTool, label: 'Graphic Design', count: '3.1k+', color: 'text-pink-500 bg-pink-500/10' },
  { icon: Brain, label: 'AI & ML', count: '890+', color: 'text-orange-500 bg-orange-500/10' },
  { icon: BarChart, label: 'Data Science', count: '760+', color: 'text-cyan-500 bg-cyan-500/10' },
  { icon: FileText, label: 'Content Writing', count: '4.2k+', color: 'text-yellow-500 bg-yellow-500/10' },
  { icon: Video, label: 'Video Editing', count: '1.5k+', color: 'text-red-500 bg-red-500/10' },
  { icon: Megaphone, label: 'Digital Marketing', count: '2.0k+', color: 'text-teal-500 bg-teal-500/10' },
  { icon: TrendingUp, label: 'SEO', count: '1.3k+', color: 'text-indigo-500 bg-indigo-500/10' },
  { icon: Settings, label: 'Automation', count: '540+', color: 'text-slate-500 bg-slate-500/10' },
  { icon: Briefcase, label: 'Consulting', count: '680+', color: 'text-lime-500 bg-lime-500/10' },
];

const mainCards = [
  {
    title: 'Find Freelancers',
    desc: 'Hire skilled freelancers for your projects. Browse profiles, compare portfolios, and connect with the perfect talent.',
    icon: Search,
    cta: 'Browse Talent',
    color: 'from-blue-600 to-blue-400',
  },
  {
    title: 'Hire Top Talent',
    desc: 'Post your project requirements and receive proposals from verified freelancers. Smart matching by skills and budget.',
    icon: Users,
    cta: 'Post a Project',
    color: 'from-violet-600 to-violet-400',
  },
  {
    title: 'Become a Freelancer',
    desc: 'Showcase your skills, build your portfolio, and start earning. Get matched with clients actively looking for your expertise.',
    icon: Star,
    cta: 'Start Earning',
    color: 'from-emerald-600 to-emerald-400',
  },
];

const howItWorks = [
  { step: '01', title: 'Create Your Profile', desc: 'Sign up, add your skills, portfolio, and set your rates.' },
  { step: '02', title: 'Browse or Post Projects', desc: 'Find projects that match your skills or post what you need.' },
  { step: '03', title: 'Submit Proposals', desc: 'Send tailored proposals or receive bids from freelancers.' },
  { step: '04', title: 'Work & Get Paid', desc: 'Collaborate securely. Get paid when milestones are completed.' },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export function Freelance() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[0%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <DollarSign className="w-4 h-4" /> Freelancer Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">The Freelance<br />Marketplace for India</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Connect with clients, showcase your skills, and earn on your own terms. Built for Indian students and professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                placeholder="Search skills or services…"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 text-sm"
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
            {[['20,000+', 'Freelancers'], ['5,000+', 'Projects Posted'], ['₹2.5Cr+', 'Earnings Processed'], ['98%', 'Satisfaction Rate']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-primary">{num}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-12">

        {/* Coming Soon Banner */}
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4 mb-10">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute h-2.5 w-2.5 rounded-full bg-primary opacity-50" />
            <span className="relative rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <p className="text-sm text-foreground font-medium">
            Freelancer Hub is launching soon. Join the waitlist to get early access and 3 months of premium free.
          </p>
        </div>

        {/* 3 Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {mainCards.map(card => (
            <div key={card.title} className="relative overflow-hidden rounded-2xl p-6 text-white group card-hover"
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm mb-5 leading-relaxed">{card.desc}</p>
                <div className="flex items-center justify-between">
                  <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 gap-1.5">
                    {card.cta} <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 border border-white/20">Coming Soon</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Grid */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
        <motion.div variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-16">
          {freelanceCategories.map(cat => (
            <motion.div key={cat.label} variants={item}
              className="bg-card border border-border rounded-2xl p-4 card-hover group cursor-pointer">
              <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mb-3`}>
                <cat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm mb-0.5">{cat.label}</h3>
              <p className="text-xs text-muted-foreground">{cat.count} freelancers</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <h2 className="text-2xl font-bold text-foreground mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {howItWorks.map((step, i) => (
            <div key={step.step} className="relative">
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-border z-0 -translate-y-0.5" />
              )}
              <div className="bg-card border border-border rounded-2xl p-5 relative z-10">
                <div className="text-4xl font-black text-primary/10 mb-2">{step.step}</div>
                <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notify */}
        <div className="glass-card rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Be Among the First Freelancers</h3>
          <p className="text-muted-foreground mb-6">Get notified at launch + 3 months of premium membership free.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <Input type="email" placeholder="your@email.com" className="h-11 flex-1" />
            <Button type="submit" className="h-11 btn-glow px-6 shrink-0">Join Waitlist</Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
