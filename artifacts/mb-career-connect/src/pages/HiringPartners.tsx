import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CompanyCard } from '@/components/CompanyCard';
import { companies } from '@/data/companies';
import { Building2, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

export function HiringPartners() {
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
              <Handshake className="w-3.5 h-3.5" /> Verified Hiring Partners
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Hiring Partners</h1>
            <p className="text-white/80 text-lg max-w-2xl">
              We partner with leading companies across India to bring you exclusive, verified job and internship opportunities.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow pb-20">
        <div className="container mx-auto px-4 mt-10">
          <div className="flex items-center justify-between mb-8 border-b border-border pb-5">
            <p className="text-muted-foreground">
              <span className="font-bold text-foreground">{companies.length}</span> partner companies
            </p>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">All Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companies.map((company, idx) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (idx % 4) * 0.07 }}
              >
                <CompanyCard {...company} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
