import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileText, Download, Briefcase, MessagesSquare, Target, PenTool, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Resume Templates',
    icon: FileText,
    desc: 'ATS-friendly templates for freshers and professionals.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    href: '/resume-builder',
    cta: 'Get Templates',
  },
  {
    title: 'Interview Prep',
    icon: MessagesSquare,
    desc: 'Common HR and technical questions with detailed answers.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    href: '/interview-prep',
    cta: 'Start Prepping',
  },
  {
    title: 'Career Roadmaps',
    icon: Target,
    desc: 'Step-by-step guides for different tech & non-tech roles.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    href: '/career-roadmaps',
    cta: 'View Roadmaps',
  },
  {
    title: 'Salary Guide',
    icon: Briefcase,
    desc: 'Industry salary standards for various roles across India.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    href: '/salary-calculator',
    cta: 'Check Salaries',
  },
  {
    title: 'LinkedIn Optimization',
    icon: Lightbulb,
    desc: 'Tips to make your profile stand out to recruiters.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    href: '/student-resources',
    cta: 'Learn More',
  },
  {
    title: 'Communication Skills',
    icon: PenTool,
    desc: 'Email templates and workplace communication guides.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    href: '/student-resources',
    cta: 'Explore Guides',
  },
];

export function Resources() {
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
              <BookOpen className="w-3.5 h-3.5" /> 100% Free Resources
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Career Resources</h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Free guides, templates, and tools to help you succeed in your career journey.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow pb-20">
        <div className="container mx-auto px-4 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 3) * 0.07 }}
              >
                <Link href={cat.href}>
                  <div className="bg-card border border-border rounded-2xl p-6 card-hover group cursor-pointer relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none" />
                    <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 relative z-10`}>
                      <cat.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors relative z-10">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed relative z-10">{cat.desc}</p>
                    <div className="flex items-center gap-1.5 text-primary font-medium text-sm group-hover:gap-2 transition-all relative z-10">
                      <Download className="w-4 h-4" />
                      {cat.cta}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
