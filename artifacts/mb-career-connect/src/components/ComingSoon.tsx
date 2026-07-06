import { motion, useReducedMotion } from 'framer-motion';
import { Rocket, Clock, Mail, ArrowLeft, ArrowRight, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  relatedFeatures?: { label: string; href: string; icon?: React.ElementType }[];
  expectedDate?: string;
}

export function ComingSoon({ 
  title = "Coming Soon", 
  description = "We're building something amazing. This feature will be available soon.",
  icon: Icon = Rocket,
  relatedFeatures = [
    { label: "Browse Jobs", href: "/jobs" }, 
    { label: "View Courses", href: "/courses" }, 
    { label: "Find Mentors", href: "/mentors" }, 
    { label: "Resources", href: "/resources" }
  ],
  expectedDate = "Q3 2025"
}: ComingSoonProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background relative overflow-hidden text-foreground">
      <Navbar />
      
      {/* Aurora Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb aurora-orb-1 w-[400px] md:w-[600px] h-[400px] md:h-[600px] top-[-10%] left-[-10%]" />
        <div className="aurora-orb aurora-orb-2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bottom-[-10%] right-[-10%]" />
        
        {/* Decorative SVG shapes */}
        <svg className="aurora-shape aurora-shape-rotate absolute top-[20%] right-[15%] w-64 h-64 text-primary" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" opacity="0.1" />
        </svg>
        <svg className="aurora-shape absolute bottom-[30%] left-[10%] w-48 h-48 text-accent" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="40" opacity="0.2" strokeDasharray="4 4" />
        </svg>
      </div>

      <main className="flex-1 relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary relative z-10">
              <Icon className="w-12 h-12" />
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-[pulse-glow_4s_ease-in-out_infinite]" />
          </motion.div>

          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Coming Soon
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 gradient-text">
            {title}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            {description}
          </motion.p>

          {/* Decorative Progress Bar */}
          <motion.div variants={itemVariants} className="w-full max-w-md">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-muted-foreground">In Development</span>
              <span className="text-primary">35% Complete</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full relative"
                style={{ width: '35%' }}
              >
                <div className="absolute inset-0 bg-white/20" style={{ animation: 'shimmer 2s infinite linear' }} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Glass Card Section */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 shadow-2xl mb-24 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Clock className="w-3.5 h-3.5" />
              Expected: {expectedDate}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2">Get Notified</h3>
          <p className="text-muted-foreground mb-6">Be the first to know when this feature goes live.</p>

          <form className="flex flex-col sm:flex-row gap-3 mb-8" onSubmit={e => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-border focus:bg-background"
              />
            </div>
            <Button type="submit" className="h-12 px-8 btn-glow">
              Notify Me
            </Button>
          </form>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Design ✓</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span>Backend ⏳</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span>Testing ⏳</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between relative">
            <div className="hidden md:block absolute top-5 left-8 right-8 h-0.5 bg-border z-0" />
            
            <div className="relative z-10 flex flex-col md:items-center gap-3 mb-8 md:mb-0 group">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20 mb-2 md:mb-0 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="md:text-center ml-14 md:ml-0 -mt-11 md:mt-0">
                <h4 className="font-semibold text-foreground">Design & Planning</h4>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="md:hidden absolute left-5 top-10 bottom-[-32px] w-0.5 bg-green-500" />
            </div>

            <div className="relative z-10 flex flex-col md:items-center gap-3 mb-8 md:mb-0 group">
              <div className="w-10 h-10 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.3)] shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="md:text-center ml-14 md:ml-0 -mt-11 md:mt-0">
                <h4 className="font-semibold text-foreground">Backend Development</h4>
                <p className="text-sm text-primary font-medium">In Progress</p>
              </div>
              <div className="md:hidden absolute left-5 top-10 bottom-[-32px] w-0.5 bg-border" />
            </div>

            <div className="relative z-10 flex flex-col md:items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-background border-2 border-border text-muted-foreground flex items-center justify-center shrink-0">
                <Circle className="w-4 h-4" />
              </div>
              <div className="md:text-center ml-14 md:ml-0 -mt-11 md:mt-0">
                <h4 className="font-semibold text-muted-foreground">Launch</h4>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Features */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mb-24"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Explore other features while you wait</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedFeatures.map((feature, i) => (
              <Link key={i} href={feature.href} className="p-6 rounded-2xl bg-card border border-border card-hover flex flex-col items-center text-center group w-full h-full justify-center min-h-[120px]">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.label}
                </h4>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl mb-24"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">When will this feature launch?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We are currently in active development and expect to launch this feature in {expectedDate}. Join the waitlist above to be notified the moment it goes live.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">What will this feature do?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                This feature is designed to enhance your experience on MB Career Phagwara, bringing new tools and capabilities to help you achieve your career goals faster.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">How do I get early access?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                By entering your email in the notification form above, you'll not only get updates but may also be selected for our early beta testing program.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        >
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
          <Button variant="outline" className="gap-2 group" asChild>
            <Link href="/jobs">
              Browse All Features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
