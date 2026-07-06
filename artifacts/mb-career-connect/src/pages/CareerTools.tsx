import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  FileText, CheckSquare, PenTool, DollarSign, Calculator,
  MessageSquare, Map, Rocket, Star, ChevronRight, Mail,
  Zap, Shield, Clock, Users
} from 'lucide-react';

const tools = [
  {
    icon: FileText,
    title: 'Resume Builder',
    desc: 'Create an ATS-optimized resume in minutes with our guided builder, 50+ templates, and real-time score.',
    href: '/resume-builder',
    badge: 'Most Popular',
    badgeColor: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
    status: 35,
    features: ['ATS Score Checker', '50+ Templates', 'AI Suggestions', 'Export to PDF'],
  },
  {
    icon: CheckSquare,
    title: 'ATS Checker',
    desc: 'Paste any job description and get an instant match score, keyword gap analysis, and improvement tips.',
    href: '/ats-checker',
    badge: 'Coming Soon',
    badgeColor: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
    status: 20,
    features: ['Keyword Matching', 'Score Analysis', 'JD Comparison', 'Instant Feedback'],
  },
  {
    icon: PenTool,
    title: 'Cover Letter Builder',
    desc: 'Generate personalized, compelling cover letters tailored to any job description using AI assistance.',
    href: '/cover-letter',
    badge: 'Coming Soon',
    badgeColor: 'text-violet-600 bg-violet-500/10 border-violet-500/20',
    status: 15,
    features: ['AI Writing', 'Tone Selector', 'Company Research', '20+ Templates'],
  },
  {
    icon: DollarSign,
    title: 'Salary Calculator',
    desc: 'Know your market worth. Compare salaries by role, experience, city, and company in India.',
    href: '/salary-calculator',
    badge: 'Coming Soon',
    badgeColor: 'text-orange-600 bg-orange-500/10 border-orange-500/20',
    status: 10,
    features: ['City-wise Data', 'Experience Filters', 'Company Benchmarks', 'Growth Projections'],
  },
  {
    icon: Calculator,
    title: 'CGPA Calculator',
    desc: 'Calculate your semester GPA, cumulative CGPA, and predict what you need to achieve your target grade.',
    href: '/cgpa-calculator',
    badge: 'Coming Soon',
    badgeColor: 'text-pink-600 bg-pink-500/10 border-pink-500/20',
    status: 25,
    features: ['All Grading Systems', 'Semester Planning', 'Target Calculator', 'GPA Converter'],
  },
  {
    icon: MessageSquare,
    title: 'Interview Preparation',
    desc: 'Practice HR, technical, and behavioral interviews with AI feedback, scoring, and confidence tips.',
    href: '/interview-prep',
    badge: 'Coming Soon',
    badgeColor: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/20',
    status: 18,
    features: ['AI Interviewer', '500+ Questions', 'Video Analysis', 'Domain Tracks'],
  },
  {
    icon: Map,
    title: 'Career Roadmaps',
    desc: 'Step-by-step visual roadmaps for 50+ career paths — from fresher to senior, with milestones and resources.',
    href: '/career-roadmaps',
    badge: 'Coming Soon',
    badgeColor: 'text-teal-600 bg-teal-500/10 border-teal-500/20',
    status: 30,
    features: ['50+ Career Paths', 'Skill Milestones', 'Resource Links', 'Timeline View'],
  },
];

const whyUs = [
  { icon: Zap, title: 'Free & Fast', desc: 'All tools are 100% free for students. No credit card required.' },
  { icon: Shield, title: 'ATS Optimized', desc: 'Built specifically to beat modern ATS systems at top companies.' },
  { icon: Users, title: '50,000+ Users', desc: 'Trusted by students from 500+ colleges across India.' },
  { icon: Star, title: 'Expert-Backed', desc: 'Designed with inputs from recruiters at FAANG and top Indian companies.' },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export function CareerTools() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[0%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Rocket className="w-4 h-4" /> 7 Powerful Free Tools
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Career Tools for<br />Every Stage</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            From building your resume to cracking interviews and planning your career path — our tools are designed to give you an unfair advantage.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 h-11 px-6">
              Try Resume Builder
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-6">
              All Tools Free →
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-10 justify-center md:justify-start">
            {[['7', 'Free Tools'], ['50K+', 'Students Helped'], ['95%', 'ATS Pass Rate'], ['4.9★', 'User Rating']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-primary">{num}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-12">

        {/* Tools Grid */}
        <h2 className="text-2xl font-bold text-foreground mb-8">All Career Tools</h2>
        <motion.div variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {tools.map(tool => (
            <motion.div key={tool.title} variants={item}
              className="bg-card border border-border rounded-2xl p-6 card-hover group flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <tool.icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                  {tool.badge}
                </span>
              </div>

              <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{tool.desc}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tool.features.map(f => (
                  <span key={f} className="text-xs px-2 py-0.5 bg-secondary rounded-full text-secondary-foreground border border-border">{f}</span>
                ))}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Development Progress</span>
                  <span className="font-semibold text-primary">{tool.status}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${tool.status}%` }} />
                </div>
              </div>

              <Link href={tool.href}>
                <Button className="w-full btn-glow gap-2 group-hover:gap-3 transition-all">
                  {tool.badge === 'Most Popular' ? 'Try Now (Free)' : 'Get Early Access'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Us */}
        <div className="bg-secondary/50 rounded-3xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Why 50,000+ Students Choose Our Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map(w => (
              <div key={w.title} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <w.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{w.title}</h3>
                <p className="text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notify */}
        <div className="glass-card rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Get Notified When Tools Launch</h3>
          <p className="text-muted-foreground mb-6">All 7 tools will be free on launch. Subscribe to get early access before everyone else.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <Input type="email" placeholder="your@email.com" className="h-11 flex-1" />
            <Button type="submit" className="h-11 btn-glow px-6 shrink-0">Notify Me</Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
