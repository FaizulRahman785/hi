import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export function FAQ() {
  const categories = [
    {
      title: 'General',
      items: [
        { q: 'What is MB Career Phagwara?', a: 'MB Career Phagwara is a comprehensive career platform that bridges the gap between job seekers and employers in India. We offer job listings, internships, skill development courses, and mentorship.' },
        { q: 'Is the platform free to use?', a: 'Yes, creating a profile and applying for jobs/internships is completely free. We only charge for optional premium skill development courses and advanced mentorship sessions.' },
        { q: 'How do I contact support?', a: 'You can reach us via the Contact Us page, email us at support@mbcareerconnect.com, or use our WhatsApp chat support during business hours.' },
      ],
    },
    {
      title: 'Jobs & Internships',
      items: [
        { q: 'How do I apply for jobs?', a: 'Create a free profile, complete your resume details, and browse our Jobs section. Click "Apply Now" on any job that matches your skills. Our system will send your profile directly to the hiring manager.' },
        { q: 'Are all jobs verified?', a: 'Yes, our team manually verifies every employer and job posting to ensure they are legitimate opportunities. We have a strict zero-tolerance policy for fake listings.' },
        { q: 'Do you charge placement fees?', a: 'No, job seekers never pay a placement fee. The platform is completely free to use for applying to jobs and internships.' },
        { q: 'Can freshers apply?', a: 'Absolutely! We have a dedicated section for internships and entry-level positions specifically meant for students and recent graduates with 0–1 years of experience.' },
      ],
    },
    {
      title: 'Courses & Skill Development',
      items: [
        { q: 'How do I enroll in courses?', a: 'Browse our Courses section, select a course that fits your career goals, and click "Enroll". You can pay securely online.' },
        { q: 'Do I get a certificate?', a: 'Yes, all our paid courses provide an industry-recognized certificate of completion.' },
        { q: 'Is there placement assistance with courses?', a: 'Selected premium courses come with dedicated placement assistance, where we guarantee a certain number of interview opportunities upon successful completion.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-28 pb-14 overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-40%] left-[-8%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-72 h-72 bottom-[-50%] right-[-5%] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">How Can We Help?</h1>
            <p className="text-white/80 text-lg max-w-xl">
              Find quick answers to common questions about our platform.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow pb-20">
        <div className="container mx-auto px-4 max-w-3xl mt-10">
          {/* Search */}
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search for an answer..." className="pl-12 h-14 bg-card border-border text-base rounded-2xl" />
          </div>

          <div className="space-y-8">
            {categories.map((category, ci) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: ci * 0.1 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  {category.title}
                </h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                  <Accordion type="single" collapsible>
                    {category.items.map((item, ii) => (
                      <AccordionItem key={ii} value={`${ci}-${ii}`} className="border-border last:border-0">
                        <AccordionTrigger className="px-6 py-4 text-left font-medium text-foreground hover:text-primary hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 p-8 rounded-2xl glass-card text-center"
          >
            <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">Our support team is happy to help you with anything.</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity btn-glow">
              Contact Support
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
