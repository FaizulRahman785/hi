import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { useState } from 'react';
import {
  BookOpen, FileText, Code2, Brain, Users2,
  FileSpreadsheet, FlaskConical, Clipboard, Calculator, Map,
  ChevronRight, Mail, Download, BookMarked, Search,
  Lightbulb, Target, MessageSquare, GitBranch, Cpu, Sparkles
} from 'lucide-react';

const categories = [
  {
    id: 'academic',
    label: 'Academic',
    icon: BookOpen,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    items: [
      { icon: BookMarked, title: 'Notes', desc: 'Subject-wise study notes for all semesters' },
      { icon: FileSpreadsheet, title: 'Previous Year Papers', desc: 'University & competitive exam papers' },
      { icon: Clipboard, title: 'Syllabus', desc: 'Up-to-date syllabus for all branches' },
      { icon: FlaskConical, title: 'Lab Manuals', desc: 'Practical lab manuals & experiments' },
      { icon: FileText, title: 'Practical Files', desc: 'Ready-to-use practical file templates' },
      { icon: BookOpen, title: 'Assignments', desc: 'Assignment questions & solutions' },
      { icon: Calculator, title: 'Formula Sheets', desc: 'Quick-reference formula sheets' },
      { icon: FileSpreadsheet, title: 'Study Material', desc: 'Curated study material by experts' },
    ],
  },
  {
    id: 'career',
    label: 'Career',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    items: [
      { icon: FileText, title: 'Resume Templates', desc: 'ATS-friendly resume templates for freshers' },
      { icon: Target, title: 'ATS Resume Guide', desc: 'Beat applicant tracking systems' },
      { icon: FileSpreadsheet, title: 'Cover Letter Templates', desc: 'Impactful cover letters for every role' },
      { icon: Users2, title: 'LinkedIn Profile Guide', desc: 'Build a profile that gets noticed' },
      { icon: Lightbulb, title: 'Portfolio Guide', desc: 'Showcase your work professionally' },
      { icon: GitBranch, title: 'GitHub Guide', desc: 'Set up a winning developer profile' },
    ],
  },
  {
    id: 'interview',
    label: 'Interview',
    icon: MessageSquare,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    items: [
      { icon: MessageSquare, title: 'HR Questions', desc: '100+ most asked HR interview questions' },
      { icon: Code2, title: 'Technical Questions', desc: 'Technical Q&A by domain & company' },
      { icon: Calculator, title: 'Aptitude', desc: 'Quantitative & verbal aptitude prep' },
      { icon: Brain, title: 'Logical Reasoning', desc: 'Puzzles, patterns & reasoning guides' },
      { icon: Users2, title: 'Mock Interviews', desc: 'Practice interviews with feedback' },
      { icon: Users2, title: 'Group Discussion', desc: 'GD topics & strategies to win' },
    ],
  },
  {
    id: 'coding',
    label: 'Coding',
    icon: Code2,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    items: [
      { icon: FileSpreadsheet, title: 'DSA Sheets', desc: 'Curated DSA sheets for placements' },
      { icon: Code2, title: 'Coding Challenges', desc: 'Practice problems by difficulty' },
      { icon: Clipboard, title: 'Problem Lists', desc: 'Striver, Blind 75, Neetcode & more' },
      { icon: Lightbulb, title: 'Project Ideas', desc: 'Trending project ideas for your portfolio' },
      { icon: Map, title: 'Roadmaps', desc: 'Step-by-step learning roadmaps' },
      { icon: GitBranch, title: 'Open Source Guide', desc: 'How to start contributing to OSS' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Tools',
    icon: Brain,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    items: [
      { icon: Cpu, title: 'AI Tools Directory', desc: '200+ AI tools categorized by use case' },
      { icon: Sparkles, title: 'Prompt Library', desc: 'Ready-to-use prompts for productivity' },
      { icon: Brain, title: 'Productivity Tools', desc: 'Tools to 10x your workflow' },
      { icon: BookOpen, title: 'Learning Resources', desc: 'Best AI/ML learning paths & courses' },
    ],
  },
];

export function StudentResources() {
  const [activeTab, setActiveTab] = useState('academic');
  const active = categories.find(c => c.id === activeTab)!;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[-5%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <BookOpen className="w-4 h-4" /> Free For All Students
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Student Resources Hub</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Everything you need to ace academics, crack placements, and build a stellar career — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search resources…"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 text-sm"
              />
            </div>
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0">Browse All</Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {[['500+', 'Study Materials'], ['50+', 'Resume Templates'], ['200+', 'DSA Problems'], ['100+', 'AI Tools Listed']].map(([num, label]) => (
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
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeTab === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category Header */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${active.bg} ${active.border} border mb-6`}>
            <active.icon className={`w-5 h-5 ${active.color}`} />
            <span className={`font-semibold ${active.color}`}>{active.label} Resources</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {active.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-card border border-border rounded-2xl p-5 card-hover group relative overflow-hidden"
              >
                <div className={`w-10 h-10 rounded-xl ${active.bg} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-5 h-5 ${active.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Coming Soon
                  </span>
                  <Button size="sm" variant="ghost" className="text-primary p-0 h-auto text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download className="w-3 h-3" /> Get
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notification Banner */}
        <div className="glass-card rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Get Notified When Resources Launch</h3>
          <p className="text-muted-foreground mb-6">Be the first student to access free notes, templates, and guides.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <Input type="email" placeholder="your@email.com" className="h-11 flex-1" />
            <Button type="submit" className="h-11 btn-glow px-6">Notify Me</Button>
          </form>
        </div>

        {/* Explore More */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-foreground mb-6">Explore More on MB Career Connect</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Browse Jobs', href: '/jobs', icon: Target },
              { label: 'Find Internships', href: '/internships', icon: Clipboard },
              { label: 'Skill Courses', href: '/courses', icon: BookOpen },
              { label: 'Find Mentors', href: '/mentors', icon: Users2 },
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
