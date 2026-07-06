import React from 'react';
import { Link } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { label: 'Browse Jobs', href: '/jobs' },
  { label: 'Internships', href: '/internships' },
  { label: 'Courses', href: '/courses' },
  { label: 'Find Mentors', href: '/mentors' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Events', href: '/events' },
];

export function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground relative overflow-hidden">
      <Navbar />

      {/* Aurora background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb aurora-orb-1 w-[500px] h-[500px] top-[-15%] left-[-10%] opacity-60" />
        <div className="aurora-orb aurora-orb-2 w-[400px] h-[400px] bottom-[-10%] right-[-8%] opacity-40" />
      </div>

      <main className="flex-1 relative z-10 flex items-center justify-center px-4 pt-24 pb-20">
        <div className="w-full max-w-3xl mx-auto text-center">

          {/* 404 number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative mb-6 select-none"
          >
            <div className="text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter text-primary/10 pointer-events-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Compass className="w-10 h-10" />
              </div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 border border-border"
          >
            <Search className="w-3.5 h-3.5" />
            Page Not Found
          </motion.div>

          {/* Headline & description */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Looks like you took a wrong turn
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="text-muted-foreground text-lg max-w-md mx-auto mb-10 leading-relaxed"
          >
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back on track.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
          >
            <Button asChild size="lg" className="gap-2 btn-glow">
              <Link href="/">
                <Home className="w-4 h-4" /> Go to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 group">
              <Link href="/jobs">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Browse Jobs
              </Link>
            </Button>
          </motion.div>

          {/* Quick links grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Popular destinations
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              {quickLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="p-3 rounded-xl bg-card border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all text-center card-hover"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
