import React, { useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, Briefcase, ChevronRight, CheckCircle, Phone, Mail, MessageCircle, Building, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { StatCard } from '@/components/StatCard';
import { OpportunityCard } from '@/components/OpportunityCard';
import { CategoryCard } from '@/components/CategoryCard';
import { CourseCard } from '@/components/CourseCard';
import { MentorCard } from '@/components/MentorCard';
import { CompanyCard } from '@/components/CompanyCard';
import { TestimonialCard } from '@/components/TestimonialCard';

import { jobs, internships } from '@/data/jobs';
import { categories } from '@/data/categories';
import { courses } from '@/data/courses';
import { mentors } from '@/data/mentors';
import { companies } from '@/data/companies';
import { testimonials } from '@/data/testimonials';

import useEmblaCarousel from 'embla-carousel-react';
import { Users, GraduationCap, Laptop, BookOpen, Star, Zap, Plane } from 'lucide-react';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTheme } from '@/contexts/ThemeContext';

export function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });
  const { theme } = useTheme();
  const heroRef = useRef(null);
  
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const statsReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const oppsReveal = useScrollReveal();
  const categoriesReveal = useScrollReveal();
  const coursesReveal = useScrollReveal();
  const whyReveal = useScrollReveal();
  const faqReveal = useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative min-h-[100dvh] flex items-center pt-24 pb-20 overflow-hidden bg-slate-950">
          {/* Animated Background */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={prefersReduced ? {} : { y: heroY, opacity: heroOpacity }}
          >
            <div className="absolute inset-0" style={{ background: 'var(--hero-gradient)' }} />
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center mix-blend-overlay" />
            
            {/* Animated Orbs */}
            {!prefersReduced && (
              <>
                <motion.div 
                  className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[80px] opacity-70"
                  style={{ background: 'var(--orb-1)' }}
                  animate={{ 
                    x: [0, 100, 0], 
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[80px] opacity-60"
                  style={{ background: 'var(--orb-2)' }}
                  animate={{ 
                    x: [0, -80, 0], 
                    y: [0, -60, 0],
                    scale: [1, 1.2, 1] 
                  }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[60px] opacity-50"
                  style={{ background: 'var(--particle-color)' }}
                  animate={{ 
                    x: [0, -40, 0], 
                    y: [0, 80, 0] 
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Floating Geometric Shapes */}
                <motion.div className="absolute top-[15%] right-[20%] w-24 h-24 border border-white/10 rounded-2xl rotate-12 backdrop-blur-sm"
                  animate={{ rotate: [12, 45, 12], y: [0, -20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div className="absolute bottom-[25%] left-[15%] w-16 h-16 border-2 border-white/5 rounded-full backdrop-blur-sm"
                  animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
            
            {/* Emerald theme extra effects */}
            {theme === 'emerald' && (
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay pointer-events-none" />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          </motion.div>
          
          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  Your Trusted Career Launchpad
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                  Build Your Career with <br className="hidden sm:block" />
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'blue' ? 'from-blue-400 to-cyan-300' : 'from-emerald-400 to-green-300'} drop-shadow-sm`}>
                    Confidence
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                  Discover verified job opportunities, internships, professional training, and career guidance tailored for your growth.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                  <Link href="/jobs" data-cursor="pointer">
                    <Button size="lg" className={`w-full sm:w-auto h-14 px-8 text-base font-bold rounded-full shadow-xl transition-all border-0 ${
                      theme === 'blue' 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/25' 
                        : 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-emerald-500/25'
                    }`}>
                      Explore Jobs
                    </Button>
                  </Link>
                  <Link href="/internships" data-cursor="pointer">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-base font-bold border-white/30 text-white bg-white/5 hover:bg-white/15 backdrop-blur-md transition-all">
                      Find Internships
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Glassmorphism Search Box */}
              <motion.div 
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto border"
                style={{ 
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                <div className="flex-1 flex items-center bg-background/80 rounded-xl sm:rounded-2xl px-4 py-1 border border-border/50 transition-colors focus-within:border-primary/50">
                  <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
                  <Input 
                    placeholder="Job title, keywords, or company" 
                    className="border-0 shadow-none focus-visible:ring-0 px-0 h-12 sm:h-14 text-base bg-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex-1 flex items-center bg-background/80 rounded-xl sm:rounded-2xl px-4 py-1 border border-border/50 transition-colors focus-within:border-primary/50">
                  <MapPin className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
                  <Input 
                    placeholder="City, state, or 'Remote'" 
                    className="border-0 shadow-none focus-visible:ring-0 px-0 h-12 sm:h-14 text-base bg-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button className={`h-14 md:w-36 rounded-xl sm:rounded-2xl text-base font-bold shrink-0 shadow-lg border-0 transition-transform active:scale-95 ${
                  theme === 'blue' 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                }`}>
                  Search
                </Button>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* Soft Wave Divider */}
        <div className="w-full overflow-hidden leading-none rotate-180 -mt-[1px] bg-muted/30">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] sm:h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" className="text-background"></path>
          </svg>
        </div>

        {/* STATS SECTION */}
        <section className="py-16 bg-muted/30 relative">
          <div className="container mx-auto px-4" ref={statsReveal.ref}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { number: "10,000+", label: "Registered Job Seekers", icon: Users },
                { number: "500+", label: "Active Job Openings", icon: Briefcase },
                { number: "150+", label: "Hiring Companies", icon: Building },
                { number: "5,000+", label: "Students Trained", icon: GraduationCap }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={statsReveal.variants.scaleIn}
                  initial="hidden"
                  animate={statsReveal.isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-4" ref={servicesReveal.ref}>
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <motion.h2 
                variants={servicesReveal.variants.fadeUp}
                initial="hidden"
                animate={servicesReveal.isInView ? "visible" : "hidden"}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              >
                Our Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Services</span>
              </motion.h2>
              <motion.p 
                variants={servicesReveal.variants.fadeUp}
                initial="hidden"
                animate={servicesReveal.isInView ? "visible" : "hidden"}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-lg sm:text-xl"
              >
                We provide an end-to-end ecosystem to support your professional journey from learning to placement.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { title: "Job Placement", desc: "Find verified full-time, part-time, and remote job opportunities across multiple industries.", icon: Briefcase },
                { title: "Internship Programs", desc: "Gain practical experience through internships designed for students and fresh graduates.", icon: Laptop },
                { title: "Professional Networking", desc: "Connect with experienced professionals, recruiters, mentors, and hiring managers.", icon: Users },
                { title: "Career Guidance", desc: "Personalized guidance for resume building, interview prep, career planning.", icon: Star },
                { title: "Skill Development", desc: "Learn in-demand technical and professional skills through industry-oriented training.", icon: BookOpen },
                { title: "Air Ticketing & Travel", desc: "Professional travel booking and ticketing services.", icon: Plane, comingSoon: true }
              ].map((service, i) => (
                <motion.div 
                  key={i} 
                  variants={servicesReveal.variants.fadeUp}
                  initial="hidden"
                  animate={servicesReveal.isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-background border shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-transform duration-300">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3 flex items-center gap-2">
                    {service.title}
                    {service.comingSoon && (
                      <span className="text-[10px] uppercase font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">Coming Soon</span>
                    )}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED OPPORTUNITIES */}
        <section className="py-20 sm:py-28 bg-muted/30 border-y">
          <div className="container mx-auto px-4" ref={oppsReveal.ref}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div className="max-w-2xl">
                <motion.h2 
                  variants={oppsReveal.variants.fadeUp}
                  initial="hidden"
                  animate={oppsReveal.isInView ? "visible" : "hidden"}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Featured Opportunities
                </motion.h2>
                <motion.p 
                  variants={oppsReveal.variants.fadeUp}
                  initial="hidden"
                  animate={oppsReveal.isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground text-lg"
                >
                  Hand-picked jobs and internships from top companies actively hiring right now.
                </motion.p>
              </div>
              <motion.div 
                variants={oppsReveal.variants.fadeLeft}
                initial="hidden"
                animate={oppsReveal.isInView ? "visible" : "hidden"}
                className="flex gap-2 bg-background p-1.5 rounded-xl border shadow-sm self-start w-full sm:w-auto"
              >
                <Button variant="ghost" className="flex-1 sm:flex-none bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-bold rounded-lg transition-colors">Jobs</Button>
                <Link href="/internships" className="flex-1 sm:flex-none">
                  <Button variant="ghost" className="w-full hover:bg-muted text-muted-foreground font-medium rounded-lg">Internships</Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(0, 6).map((job, i) => (
                <motion.div
                  key={job.id}
                  variants={oppsReveal.variants.fadeUp}
                  initial="hidden"
                  animate={oppsReveal.isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full"
                >
                  <OpportunityCard {...job} />
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={oppsReveal.variants.fadeUp}
              initial="hidden"
              animate={oppsReveal.isInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
              className="mt-12 sm:mt-16 text-center"
            >
              <Link href="/jobs" data-cursor="pointer">
                <Button variant="outline" size="lg" className="bg-background border-primary/20 hover:bg-primary/5 hover:border-primary/50 font-semibold h-14 px-8 rounded-full group w-full sm:w-auto">
                  View All Opportunities 
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* POPULAR CATEGORIES */}
        <section className="py-20 sm:py-24 bg-background">
          <div className="container mx-auto px-4" ref={categoriesReveal.ref}>
            <motion.h2 
              variants={categoriesReveal.variants.fadeUp}
              initial="hidden"
              animate={categoriesReveal.isInView ? "visible" : "hidden"}
              className="text-3xl md:text-4xl font-bold mb-12 sm:mb-16 text-center"
            >
              Explore by Category
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  variants={categoriesReveal.variants.scaleIn}
                  initial="hidden"
                  animate={categoriesReveal.isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <CategoryCard {...cat} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* COURSES PREVIEW */}
        <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
          {theme === 'emerald' && <div className="absolute inset-0 bg-black/40 mix-blend-overlay pointer-events-none" />}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="container mx-auto px-4 relative z-10" ref={coursesReveal.ref}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div className="max-w-2xl text-white">
                <motion.h2 
                  variants={coursesReveal.variants.fadeUp}
                  initial="hidden"
                  animate={coursesReveal.isInView ? "visible" : "hidden"}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-sm"
                >
                  Upskill with Our Courses
                </motion.h2>
                <motion.p 
                  variants={coursesReveal.variants.fadeUp}
                  initial="hidden"
                  animate={coursesReveal.isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.1 }}
                  className="text-white/80 text-lg sm:text-xl font-light"
                >
                  Industry-relevant training programs designed by experts to make you job-ready.
                </motion.p>
              </div>
              <motion.div
                variants={coursesReveal.variants.fadeLeft}
                initial="hidden"
                animate={coursesReveal.isInView ? "visible" : "hidden"}
              >
                <Link href="/courses" data-cursor="pointer">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black bg-white/10 backdrop-blur-md rounded-full h-12 px-6 w-full sm:w-auto font-semibold">
                    Browse Catalog <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {courses.slice(0, 4).map((course, i) => (
                <motion.div
                  key={course.id}
                  variants={coursesReveal.variants.fadeUp}
                  initial="hidden"
                  animate={coursesReveal.isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full"
                >
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 sm:py-32 bg-background overflow-hidden relative">
          <div className="absolute top-[20%] left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-4" ref={whyReveal.ref}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={whyReveal.variants.fadeRight}
                initial="hidden"
                animate={whyReveal.isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Why Choose <br/><span className="text-primary">MB Career Phagwara?</span></h2>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-lg">
                  We don't just list jobs; we build careers. Our platform offers a holistic approach to professional development, ensuring you have the skills, connections, and opportunities to succeed.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    "Verified Opportunities", "Trusted Hiring Partners", 
                    "Career Guidance", "Internship Support", 
                    "Industry Connections", "Affordable Skill Development", 
                    "Dedicated Support Team", "Transparent Hiring Process"
                  ].map((point, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={whyReveal.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.2 + (i * 0.05) }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 bg-primary/10 text-primary rounded-full p-0.5 shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-foreground">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                variants={whyReveal.variants.fadeLeft}
                initial="hidden"
                animate={whyReveal.isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto w-full max-w-[500px] lg:max-w-none"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/20 rounded-3xl transform rotate-3 scale-105 filter blur-sm"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Career mentoring session" 
                    className="w-full object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
                </div>
                
                {/* Floating badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 sm:bottom-10 sm:-left-10 bg-card border border-border p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">4.9/5</div>
                      <div className="text-sm text-muted-foreground font-medium">User Rating</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HIRING PARTNERS */}
        <section className="py-16 bg-muted/30 border-y">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-10">Trusted by Top Companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {companies.slice(0, 6).map((comp) => (
                <div key={comp.id} className="text-xl md:text-2xl font-black text-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-8 h-8 bg-current rounded-md shrink-0 opacity-20"></div>
                  {comp.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 sm:py-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center"
            >
              Success Stories
            </motion.h2>
            <div className="overflow-hidden cursor-grab active:cursor-grabbing pb-8" ref={emblaRef}>
              <div className="flex gap-6">
                {testimonials.map((test, i) => (
                  <motion.div 
                    key={test.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6 first:pl-0 h-auto"
                  >
                    <TestimonialCard {...test} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 sm:py-32 bg-muted/30 border-t">
          <div className="container mx-auto px-4 max-w-3xl" ref={faqReveal.ref}>
            <motion.h2 
              variants={faqReveal.variants.fadeUp}
              initial="hidden"
              animate={faqReveal.isInView ? "visible" : "hidden"}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              variants={faqReveal.variants.fadeUp}
              initial="hidden"
              animate={faqReveal.isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="w-full bg-card rounded-2xl shadow-sm border p-4 sm:p-6">
                <AccordionItem value="item-1" className="border-b border-border/50 px-2">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary hover:no-underline py-4">How do I apply for jobs?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                    Create a free profile, complete your resume details, and browse our Jobs section. Click "Apply Now" on any job that matches your skills. Our system will send your profile directly to the hiring manager.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-border/50 px-2">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary hover:no-underline py-4">Are all jobs verified?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                    Yes, our team manually verifies every employer and job posting to ensure they are legitimate opportunities. We have a strict zero-tolerance policy for fake listings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-border/50 px-2">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary hover:no-underline py-4">Do you charge placement fees?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                    No, job seekers never pay a placement fee. The platform is completely free to use for applying to jobs and internships. We only charge for optional upskilling courses.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-none px-2">
                  <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary hover:no-underline py-4">Can freshers apply?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                    Absolutely! We have a dedicated section for internships and entry-level positions specifically meant for students and recent graduates with 0-1 years of experience.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
            <div className="text-center mt-10">
              <Link href="/faq" className="text-primary font-medium hover:underline inline-flex items-center" data-cursor="pointer">
                View all FAQs <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* CONTACT PREVIEW & NEWSLETTER */}
        <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-white"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-sm">Start Your Career <br/>Journey Today</h2>
                <p className="text-white/80 text-lg mb-10 max-w-lg font-light leading-relaxed">
                  Create your profile, explore verified opportunities, develop your skills, and connect with top employers across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link href="/register" data-cursor="pointer">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-slate-100 font-bold h-14 px-8 rounded-full shadow-xl">
                      Create Free Account
                    </Button>
                  </Link>
                  <Link href="/contact" data-cursor="pointer">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-bold h-14 px-8 rounded-full bg-white/5 backdrop-blur-sm">
                      Contact Support
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white/70 font-medium mb-0.5">Call Us</div>
                      <div className="font-bold text-lg tracking-tight">+91-9876543210</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white/70 font-medium mb-0.5">Email Us</div>
                      <div className="font-bold text-lg tracking-tight">support@mbcareer.com</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-border/50 max-w-md ml-auto w-full relative"
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-[40px] pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
                
                <div className="mb-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-3 hover:rotate-6 transition-transform">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Stay Ahead</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Get the latest jobs and career tips delivered to your inbox weekly.</p>
                </div>
                
                <form className="space-y-4 relative z-10" onSubmit={e => e.preventDefault()}>
                  <div>
                    <Input placeholder="Your Name" className="h-14 bg-muted/50 border-transparent focus:border-primary/50 focus:bg-background rounded-xl px-5 text-base" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email Address" className="h-14 bg-muted/50 border-transparent focus:border-primary/50 focus:bg-background rounded-xl px-5 text-base" />
                  </div>
                  <Button className={`w-full h-14 text-base font-bold rounded-xl shadow-lg border-0 transition-transform active:scale-95 mt-2 ${
                    theme === 'blue' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/25' 
                      : 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-emerald-500/25'
                  }`}>
                    Subscribe Now
                  </Button>
                  <p className="text-xs text-center text-muted-foreground font-medium pt-2">We respect your privacy. No spam ever.</p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}