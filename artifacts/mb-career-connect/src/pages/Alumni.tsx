import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import { Users, Star, Building, MapPin, Calendar, Mail, Linkedin, Award, MessageSquare, ChevronRight, GraduationCap, Briefcase } from 'lucide-react';

const alumni = [
  { name: 'Priya Sharma', year: '2019', dept: 'Computer Science', company: 'Google', role: 'Senior Software Engineer', location: 'Bangalore', skills: ['Go', 'Kubernetes', 'System Design'], achievement: 'Led migration of payment infra serving 2M+ users', img: 'PS' },
  { name: 'Arjun Mehta', year: '2018', dept: 'Electronics', company: 'Microsoft', role: 'Principal Engineer', location: 'Hyderabad', skills: ['Azure', 'C++', 'ML Infra'], achievement: 'Co-authored 3 patents in distributed computing', img: 'AM' },
  { name: 'Sneha Reddy', year: '2020', dept: 'MBA', company: 'McKinsey', role: 'Associate Consultant', location: 'Mumbai', skills: ['Strategy', 'Analytics', 'Finance'], achievement: 'Forbes 30 Under 30 in Business & Finance 2024', img: 'SR' },
  { name: 'Vikram Singh', year: '2017', dept: 'Mechanical', company: 'Tesla', role: 'Design Engineer', location: 'Berlin', skills: ['CAD', 'FEA', 'EV Design'], achievement: 'Key contributor to Model Y structural design', img: 'VS' },
  { name: 'Ananya Patel', year: '2021', dept: 'Data Science', company: 'Flipkart', role: 'ML Engineer', location: 'Bangalore', skills: ['PyTorch', 'NLP', 'Recommendation'], achievement: 'Built search ranking model with 23% CTR boost', img: 'AP' },
  { name: 'Rahul Jain', year: '2016', dept: 'Computer Science', company: 'Zepto (Founder)', role: 'Co-Founder & CTO', location: 'Mumbai', skills: ['Leadership', 'Product', 'Architecture'], achievement: 'Built Zepto to $1.4B valuation in 2 years', img: 'RJ' },
];

const stories = [
  { title: 'From Campus to Google in 6 Months', author: 'Priya Sharma', readTime: '5 min', tag: 'Placement', color: 'text-blue-500 bg-blue-500/10' },
  { title: 'How I Got Into McKinsey as a Non-MBA', author: 'Sneha Reddy', readTime: '8 min', tag: 'MBA', color: 'text-emerald-500 bg-emerald-500/10' },
  { title: 'Building a Startup from My Hostel Room', author: 'Rahul Jain', readTime: '12 min', tag: 'Startup', color: 'text-orange-500 bg-orange-500/10' },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export function Alumni() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[0%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Users className="w-4 h-4" /> Alumni Network
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Connect with Alumni</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Learn from those who walked the same path. Connect with alumni from top companies, get mentorship, and find your next opportunity.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 h-11 px-6">
              Browse Alumni
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-6">
              Register as Alumni
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-10 justify-center md:justify-start">
            {[['10,000+', 'Alumni Registered'], ['500+', 'Companies'], ['120+', 'Countries'], ['2,000+', 'Mentors']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-primary">{num}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-12">

        {/* Featured Alumni */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Alumni</h2>
          <Button variant="ghost" className="text-primary gap-1 text-sm">
            View All <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <motion.div variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {alumni.map(a => (
            <motion.div key={a.name} variants={item}
              className="bg-card border border-border rounded-2xl p-6 card-hover group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                  {a.img}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">{a.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{a.role}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Building className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="text-xs font-semibold text-primary truncate">{a.company}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {a.dept} · {a.year}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {a.location}</span>
              </div>

              <div className="bg-secondary/50 rounded-xl p-3 mb-4 text-sm text-foreground">
                <Award className="w-3.5 h-3.5 text-primary inline mr-1.5 -mt-0.5" />
                {a.achievement}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {a.skills.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-secondary rounded-full text-secondary-foreground border border-border">{s}</span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs h-8">
                  <Linkedin className="w-3.5 h-3.5" /> Connect
                </Button>
                <Button size="sm" className="flex-1 gap-1.5 text-xs h-8 btn-glow relative">
                  <MessageSquare className="w-3.5 h-3.5" /> Book Session
                  <span className="absolute -top-2 -right-2 text-[9px] font-bold px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full">Soon</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Alumni Stories */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Alumni Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {stories.map(story => (
            <div key={story.title} className="bg-card border border-border rounded-2xl p-6 card-hover group">
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${story.color}`}>{story.tag}</span>
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{story.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {story.author}</span>
                <span>{story.readTime} read</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mentorship CTA */}
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-12" style={{ background: 'var(--hero-gradient)' }}>
          <div className="aurora-orb aurora-orb-1 absolute w-72 h-72 top-[-30%] left-[-10%] opacity-40" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Get Mentored by Alumni</h3>
              <p className="text-white/80 mb-1">1-on-1 sessions with professionals at Google, Microsoft, McKinsey and more.</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Launching Q4 2025
              </span>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <Input type="email" placeholder="Your email" className="h-11 bg-white/10 border-white/20 text-white placeholder-white/50 w-48" />
                <Button type="submit" className="h-11 bg-white text-primary font-semibold border-0 hover:bg-white/90 shrink-0">Join Waitlist</Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
