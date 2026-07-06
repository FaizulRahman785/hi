import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  Building, Users, Calendar, Trophy, Megaphone, Lightbulb,
  BookOpen, Briefcase, MapPin, Star, ChevronRight, Mail,
  FlaskConical, GraduationCap, Rocket, Building2, ClipboardList
} from 'lucide-react';

const hubFeatures = [
  { icon: GraduationCap, title: 'College Profiles', desc: 'Comprehensive profiles for 1000+ colleges across India with rankings, reviews, and placement stats.' },
  { icon: Building, title: 'Department Pages', desc: 'Explore department-wise resources, faculty, research, and alumni from your specific branch.' },
  { icon: Briefcase, title: 'Campus Placement', desc: 'Track placement drives, company visit schedules, and historical placement records by college.' },
  { icon: Megaphone, title: 'College Notices', desc: 'Stay updated with official notices, circulars, and announcements from your college.' },
  { icon: Users, title: 'Student Clubs', desc: 'Discover coding clubs, cultural societies, sports teams, and technical committees.' },
  { icon: FlaskConical, title: 'Innovation Cells', desc: 'Connect with innovation cells, startup incubators, and research labs on campus.' },
  { icon: Calendar, title: 'Placement Calendar', desc: 'Never miss a placement drive. Track upcoming company visits and on-campus events.' },
  { icon: Rocket, title: 'Incubation Centres', desc: 'Explore campus startup incubators and entrepreneurship support programs.' },
  { icon: Lightbulb, title: 'Workshops & Seminars', desc: 'Stay informed about workshops, seminars, and technical talks happening in colleges.' },
  { icon: Trophy, title: 'Tech Fests & Events', desc: 'Participate in annual tech fests, hackathons, and inter-college competitions.' },
  { icon: BookOpen, title: 'Training Programs', desc: 'Discover industry-sponsored training programs and certification courses.' },
  { icon: ClipboardList, title: 'Coding Clubs', desc: 'Join or explore competitive programming clubs and DSA practice groups.' },
];

const mockColleges = [
  { name: 'IIT Delhi', city: 'New Delhi', type: 'IIT', rating: 4.9, placements: '98%', companies: 320 },
  { name: 'BITS Pilani', city: 'Rajasthan', type: 'Deemed', rating: 4.8, placements: '96%', companies: 280 },
  { name: 'NIT Trichy', city: 'Tamil Nadu', type: 'NIT', rating: 4.7, placements: '94%', companies: 210 },
  { name: 'VIT Vellore', city: 'Tamil Nadu', type: 'Deemed', rating: 4.5, placements: '92%', companies: 190 },
  { name: 'SRM University', city: 'Chennai', type: 'Deemed', rating: 4.3, placements: '89%', companies: 150 },
  { name: 'Amity University', city: 'Noida', type: 'Private', rating: 4.2, placements: '86%', companies: 120 },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export function CollegeHub() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-72 h-72 bottom-[-20%] right-[-5%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Building2 className="w-4 h-4" /> 1000+ Colleges Listed
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">College Hub</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Your complete campus companion — from placement records and department resources to student clubs and innovation cells.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 h-11 px-6">
              Find Your College
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-6">
              List Your College
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-10 justify-center md:justify-start">
            {[['1000+', 'Colleges'], ['500K+', 'Students'], ['50K+', 'Placement Records'], ['200+', 'Cities']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-primary">{num}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-12">

        {/* Coming Soon Notice */}
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4 mb-10">
          <span className="flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute h-2.5 w-2.5 rounded-full bg-primary opacity-50" />
            <span className="relative rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <p className="text-sm text-foreground font-medium">
            College Hub is actively being built. Below is a preview of what's coming. 
            <Link href="#notify" className="text-primary ml-1 underline underline-offset-2">Get notified →</Link>
          </p>
        </div>

        {/* Feature Grid */}
        <h2 className="text-2xl font-bold text-foreground mb-6">What College Hub Offers</h2>
        <motion.div variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {hubFeatures.map(feat => (
            <motion.div key={feat.title} variants={item}
              className="bg-card border border-border rounded-2xl p-5 card-hover group">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <feat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{feat.title}</h3>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border shrink-0 ml-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Soon
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mock College Cards */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Featured Colleges <span className="text-sm font-normal text-muted-foreground ml-2">Sample Preview</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {mockColleges.map(college => (
            <div key={college.name} className="bg-card border border-border rounded-2xl p-5 card-hover group relative">
              <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                {college.type}
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">{college.name}</h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                <MapPin className="w-3.5 h-3.5" /> {college.city}
              </div>
              <div className="flex items-center gap-4 text-sm border-t border-border pt-3">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-foreground">{college.rating}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Placement: </span>
                  <span className="font-semibold text-green-600">{college.placements}</span>
                </div>
                <div>
                  <span className="font-semibold text-primary">{college.companies}+</span>
                  <span className="text-muted-foreground"> companies</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notify */}
        <div id="notify" className="glass-card rounded-3xl p-8 text-center max-w-xl mx-auto">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Get Early Access to College Hub</h3>
          <p className="text-muted-foreground mb-6">We're onboarding colleges now. Be among the first to explore your campus profile.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
            <Input type="email" placeholder="Enter your email" className="h-11 flex-1" />
            <Button type="submit" className="h-11 btn-glow px-6">Notify Me</Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
