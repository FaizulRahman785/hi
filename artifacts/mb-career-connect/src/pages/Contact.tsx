import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Contact() {
  const formReveal = useScrollReveal();

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Get in Touch</h1>
            <p className="text-white/80 text-lg max-w-xl">
              Have questions about our platform? We're here to help you succeed.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow pb-20">
        <div className="container mx-auto px-4 max-w-5xl mt-10" ref={formReveal.ref}>
          <div className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden flex flex-col lg:flex-row">

            {/* Contact Info Sidebar */}
            <div
              className="p-10 lg:w-2/5 flex flex-col justify-between relative overflow-hidden"
              style={{ background: 'var(--hero-gradient)' }}
            >
              <div className="aurora-orb aurora-orb-1 absolute w-80 h-80 top-[-30%] left-[-30%] opacity-40" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Phone, title: '+91 98765 43210', sub: 'Mon–Fri, 9am–6pm' },
                    { icon: Mail, title: 'info@mbcareerconnect.com', sub: 'Online support' },
                    { icon: MessageCircle, title: '+91 98765 43210', sub: 'WhatsApp Chat' },
                    { icon: MapPin, title: 'MB Tech Park, Block C', sub: 'Koramangala, Bangalore, Karnataka 560034' },
                  ].map(({ icon: Icon, title, sub }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{title}</div>
                        <div className="text-white/60 text-sm">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute bottom-8 right-8 w-40 h-40 border-2 border-white/10 rounded-full pointer-events-none" />
              <div className="absolute bottom-16 right-16 w-24 h-24 border-2 border-white/10 rounded-full pointer-events-none" />
            </div>

            {/* Contact Form */}
            <motion.div
              variants={formReveal.variants.fadeRight}
              initial="hidden"
              animate={formReveal.isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6 }}
              className="p-10 lg:w-3/5"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                    <Input placeholder="John Doe" className="h-12 bg-background border-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                    <Input type="email" placeholder="you@example.com" className="h-12 bg-background border-input" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                  <Input placeholder="How can we help?" className="h-12 bg-background border-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    className="bg-background border-input resize-none"
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-base font-bold btn-glow gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
