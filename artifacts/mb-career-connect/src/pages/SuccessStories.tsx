import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Star, Quote, Briefcase, Users, Rocket, DollarSign,
  GraduationCap, ChevronRight, Trophy, Heart, Clock
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Stories', icon: Star },
  { id: 'placement', label: 'Placement', icon: Briefcase },
  { id: 'internship', label: 'Internship', icon: GraduationCap },
  { id: 'startup', label: 'Startup', icon: Rocket },
  { id: 'freelance', label: 'Freelance', icon: DollarSign },
  { id: 'alumni', label: 'Alumni', icon: Users },
];

const stories = [
  {
    name: 'Shreya Kapoor',
    role: 'Software Engineer at Meta',
    college: 'IIT Kanpur · CSE · 2022',
    type: 'placement',
    headline: 'From 0 DSA problems to Meta in 8 months',
    quote: 'I had no idea what a linked list was in my 3rd year. Then I dedicated every day to learning. MB Career Phagwara\'s resources and mock interview guides completely transformed my preparation.',
    package: '₹52 LPA',
    duration: '8 months prep',
    tips: ['Start DSA from scratch — don\'t rush', 'Do 3 mock interviews weekly', 'System design is as important as DSA'],
    color: 'from-blue-600 to-blue-400',
    initials: 'SK',
  },
  {
    name: 'Amit Choudhary',
    role: 'Intern → FTE at Amazon',
    college: 'NIT Warangal · ECE · 2023',
    type: 'internship',
    headline: 'Non-CS student cracked Amazon SDE internship',
    quote: 'Being from ECE, I always thought top tech companies were out of reach. I self-taught full-stack development and cracked Amazon\'s internship, which converted to a full-time offer.',
    package: '₹36 LPA FTE',
    duration: '6-month internship',
    tips: ['Branch doesn\'t define your career', 'Build real projects with real tech', 'Networking is underrated for non-CS folks'],
    color: 'from-orange-600 to-orange-400',
    initials: 'AC',
  },
  {
    name: 'Neha Agarwal',
    role: 'Co-Founder, SkillBridge',
    college: 'IIM Lucknow · MBA · 2021',
    type: 'startup',
    headline: 'Built an EdTech startup during MBA, raised ₹2 Cr',
    quote: 'I started SkillBridge as my MBA project. Within a year, we had 10,000 paying users and raised ₹2 crore. The key was focusing on a problem I personally faced as a student.',
    package: '₹2 Cr Raised',
    duration: '18 months',
    tips: ['Validate before building', 'Use your college network ruthlessly', 'Revenue > investors in early stage'],
    color: 'from-violet-600 to-violet-400',
    initials: 'NA',
  },
  {
    name: 'Rohan Desai',
    role: 'Full-Stack Freelancer',
    college: 'Pune University · IT · 2022',
    type: 'freelance',
    headline: '₹3L/month freelancing while in final year',
    quote: 'I started freelancing in my 3rd year, building websites for local businesses. By my final year I was earning ₹3 lakh per month and had 15 recurring clients.',
    package: '₹3L/month',
    duration: '18 months',
    tips: ['Start with local businesses', 'Specialize early — I focused on React', 'Referrals are your best growth channel'],
    color: 'from-emerald-600 to-emerald-400',
    initials: 'RD',
  },
  {
    name: 'Pooja Iyer',
    role: 'Product Manager at Swiggy',
    college: 'BITS Hyderabad · Mech · 2020',
    type: 'placement',
    headline: 'Mechanical to Product Manager — the unconventional path',
    quote: 'Everyone told me PM roles are hard to crack without a CS background. I did 6 PM internships, built my portfolio, and got offers from 3 top companies.',
    package: '₹28 LPA',
    duration: '2 years of pivoting',
    tips: ['PM is about problem-solving, not coding', 'Build a portfolio of PM work', 'Cold outreach works if done right'],
    color: 'from-pink-600 to-pink-400',
    initials: 'PI',
  },
  {
    name: 'Karan Shah',
    role: 'Senior Consultant, BCG',
    college: 'IITD + IIM-A · MBA · 2019',
    type: 'alumni',
    headline: 'IIT to IIM to BCG — navigating the MBA journey',
    quote: 'The MBA journey is more about who you become than what you learn. MB Career Phagwara\'s mentorship network connected me with 5 BCG consultants before my final round.',
    package: '₹42 LPA',
    duration: '5-year journey',
    tips: ['Network before you need it', 'Case prep starts 6 months early', 'Your story matters as much as your grades'],
    color: 'from-cyan-600 to-cyan-400',
    initials: 'KS',
  },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export function SuccessStories() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? stories : stories.filter(s => s.type === active);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[0%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Trophy className="w-4 h-4" /> Inspiring Real Stories
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Success Stories</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Real journeys. Real results. Get inspired by students and professionals who transformed their careers with determination and the right resources.
          </p>
          <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 h-11 px-6">
            Share Your Story
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-10 justify-center md:justify-start">
            {[['5,000+', 'Stories Shared'], ['₹52 LPA', 'Top Package Placed'], ['200+', 'Startups Founded'], ['98%', 'Goal Achievement']].map(([num, label]) => (
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
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                active === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Story Cards */}
        <motion.div key={active} variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {filtered.map(story => (
            <motion.div key={story.name} variants={item}
              className="bg-card border border-border rounded-3xl overflow-hidden card-hover group">
              {/* Card Header with gradient */}
              <div className={`bg-gradient-to-r ${story.color} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {story.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">{story.name}</h3>
                    <p className="text-white/80 text-sm">{story.role}</p>
                    <p className="text-white/60 text-xs mt-0.5">{story.college}</p>
                  </div>
                </div>
                <div className="relative z-10 flex gap-3 mt-4">
                  <div className="bg-white/20 rounded-xl px-3 py-1.5 text-xs font-bold text-white">{story.package}</div>
                  <div className="bg-white/20 rounded-xl px-3 py-1.5 text-xs font-semibold text-white/80 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {story.duration}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h4 className="font-bold text-foreground text-lg mb-3 group-hover:text-primary transition-colors">
                  "{story.headline}"
                </h4>

                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-1 -left-1" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6 italic">
                    {story.quote}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-primary" /> Key Takeaways
                  </p>
                  <ul className="space-y-1">
                    {story.tips.map(tip => (
                      <li key={tip} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="ghost" className="text-primary gap-1.5 text-xs">
                    <Heart className="w-3.5 h-3.5" /> Inspire
                  </Button>
                  <Button size="sm" variant="ghost" className="text-primary gap-1.5 text-xs ml-auto">
                    Read Full Story <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center" style={{ background: 'var(--hero-gradient)' }}>
          <div className="aurora-orb aurora-orb-1 absolute w-72 h-72 top-[-30%] left-[-5%] opacity-30" />
          <div className="relative z-10">
            <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-3">Your Story Deserves to Be Heard</h3>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Did you land your dream job, build a successful startup, or overcome odds? Inspire the next generation by sharing your journey.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 h-11 px-8">
                Share Your Story
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-8">
                Nominate Someone
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
