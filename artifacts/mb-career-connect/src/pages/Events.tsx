import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Calendar, MapPin, Clock, Users, ExternalLink, Search,
  Monitor, Building2, Trophy, Lightbulb, Mic2,
  Star, ChevronRight, Bell, Globe
} from 'lucide-react';

const eventCategories = [
  { id: 'all', label: 'All Events' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'webinar', label: 'Webinars' },
  { id: 'career-fair', label: 'Career Fair' },
  { id: 'placement', label: 'Placement Drive' },
  { id: 'meetup', label: 'Meetups' },
  { id: 'talk', label: 'Tech Talks' },
  { id: 'conference', label: 'Conferences' },
];

const typeIcon: Record<string, React.ElementType> = {
  workshop: Monitor,
  webinar: Globe,
  'career-fair': Building2,
  placement: Trophy,
  meetup: Users,
  talk: Mic2,
  conference: Lightbulb,
};

const typeColor: Record<string, string> = {
  workshop: 'bg-blue-500/10 text-blue-600 border-blue-200',
  webinar: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  'career-fair': 'bg-violet-500/10 text-violet-600 border-violet-200',
  placement: 'bg-orange-500/10 text-orange-600 border-orange-200',
  meetup: 'bg-pink-500/10 text-pink-600 border-pink-200',
  talk: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
  conference: 'bg-amber-500/10 text-amber-600 border-amber-200',
};

const typeLabel: Record<string, string> = {
  workshop: 'Workshop',
  webinar: 'Webinar',
  'career-fair': 'Career Fair',
  placement: 'Placement Drive',
  meetup: 'Meetup',
  talk: 'Tech Talk',
  conference: 'Conference',
};

const events = [
  {
    id: 1,
    title: 'Full Stack Web Development Bootcamp',
    organizer: 'MB Career Phagwara × GeeksforGeeks',
    type: 'workshop',
    date: 'Jul 20, 2025',
    time: '10:00 AM – 4:00 PM',
    location: 'Online (Zoom)',
    isOnline: true,
    seats: 500,
    seatsLeft: 134,
    featured: true,
    description: 'A hands-on full-day workshop covering React, Node.js, and deploying to the cloud. Ideal for students and freshers building their first full-stack project.',
    tags: ['React', 'Node.js', 'Beginner Friendly'],
  },
  {
    id: 2,
    title: 'Campus Placement Drive — TCS & Wipro',
    organizer: 'TCS & Wipro HR Teams',
    type: 'placement',
    date: 'Jul 22, 2025',
    time: '9:00 AM onwards',
    location: 'IIT Delhi, New Delhi',
    isOnline: false,
    seats: 300,
    seatsLeft: 48,
    featured: false,
    description: 'On-campus placement drive for B.Tech 2025 batch. Openings in Software Engineering, Data Analytics, and Business Consulting.',
    tags: ['TCS', 'Wipro', '2025 Batch'],
  },
  {
    id: 3,
    title: 'AI in the Workplace: What Every Professional Must Know',
    organizer: 'MB Career Phagwara',
    type: 'webinar',
    date: 'Jul 18, 2025',
    time: '7:00 PM – 8:30 PM',
    location: 'Online (Live)',
    isOnline: true,
    seats: 1000,
    seatsLeft: 612,
    featured: false,
    description: 'Industry leaders discuss how AI is reshaping every industry and what skills you need to stay ahead. Live Q&A included.',
    tags: ['AI', 'Future of Work', 'Free'],
  },
  {
    id: 4,
    title: 'National Career Fair 2025',
    organizer: 'MB Career Phagwara & NASSCOM',
    type: 'career-fair',
    date: 'Aug 3–4, 2025',
    time: '10:00 AM – 6:00 PM',
    location: 'Pragati Maidan, New Delhi',
    isOnline: false,
    seats: 5000,
    seatsLeft: 2340,
    featured: false,
    description: "India's largest career fair with 200+ companies hiring across tech, finance, marketing, and more. Open to all students and freshers.",
    tags: ['200+ Companies', 'All Domains', 'Freshers'],
  },
  {
    id: 5,
    title: 'System Design for Engineers — Masterclass',
    organizer: 'Priya Nair (Ex-Google)',
    type: 'workshop',
    date: 'Jul 26, 2025',
    time: '6:00 PM – 9:00 PM',
    location: 'Online (Zoom)',
    isOnline: true,
    seats: 200,
    seatsLeft: 72,
    featured: false,
    description: 'Learn to design scalable systems like a FAANG engineer. Covers URL shorteners, WhatsApp backend, and Netflix architecture.',
    tags: ['System Design', 'FAANG Prep', 'Advanced'],
  },
  {
    id: 6,
    title: 'Bangalore Developer Meetup — July Edition',
    organizer: 'Dev Community Bangalore',
    type: 'meetup',
    date: 'Jul 19, 2025',
    time: '5:00 PM – 8:00 PM',
    location: '91springboard, Koramangala',
    isOnline: false,
    seats: 80,
    seatsLeft: 19,
    featured: false,
    description: 'Monthly meetup for developers in Bangalore. Open mic lightning talks, networking, and free pizza.',
    tags: ['Networking', 'Bangalore', 'Free'],
  },
  {
    id: 7,
    title: 'Building a Personal Brand on LinkedIn',
    organizer: 'Sameer Gupta — LinkedIn Top Voice',
    type: 'talk',
    date: 'Jul 16, 2025',
    time: '8:00 PM – 9:00 PM',
    location: 'Online (YouTube Live)',
    isOnline: true,
    seats: 999,
    seatsLeft: 999,
    featured: false,
    description: 'Learn how to grow from 0 to 10,000 LinkedIn followers and attract job opportunities without sending cold applications.',
    tags: ['LinkedIn', 'Personal Brand', 'Free'],
  },
  {
    id: 8,
    title: 'India Startup Summit 2025',
    organizer: 'iSPIRT & Startup India',
    type: 'conference',
    date: 'Aug 10–12, 2025',
    time: 'All Day',
    location: 'HICC, Hyderabad',
    isOnline: false,
    seats: 2000,
    seatsLeft: 890,
    featured: false,
    description: "Three days of keynotes, workshops, and networking with India's top founders, VCs, and government innovators. A must-attend for student entrepreneurs.",
    tags: ['Startups', 'Investors', 'Networking'],
  },
];

export function Events() {
  const [activeType, setActiveType] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = events.filter(e => {
    const matchType = activeType === 'all' || e.type === activeType;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.organizer.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const featured = events.find(e => e.featured);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[-5%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Calendar className="w-4 h-4" /> Career Events & Webinars
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Events & Webinars</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Join workshops, career fairs, placement drives, and expert webinars. Learn, connect, and grow with India's best career events.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search events…"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {[['50+', 'Events This Month'], ['200+', 'Companies Participating'], ['25K+', 'Students Joined'], ['7', 'Event Types']].map(([num, label]) => (
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
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1">
          {eventCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveType(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
                activeType === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Event */}
        {featured && activeType === 'all' && !search && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                <Star className="w-3 h-3 fill-current" /> Featured Event
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColor[featured.type]}`}>
                {typeLabel[featured.type]}
              </span>
              {featured.isOnline && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-200">
                  <Globe className="w-3 h-3" /> Online
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2">{featured.title}</h2>
            <p className="text-muted-foreground mb-4 max-w-2xl">{featured.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" />{featured.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{featured.time}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{featured.location}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" />{featured.seatsLeft} seats left</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {featured.tags.map(tag => (
                <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">{tag}</span>
              ))}
            </div>
            <Button className="btn-glow gap-2 pointer-events-none opacity-80">
              Register Now — Coming Soon <ExternalLink className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(activeType === 'all' && !search ? filtered.filter(e => !e.featured) : filtered).map((event, i) => {
            const TypeIcon = typeIcon[event.type] || Calendar;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-2xl p-6 group card-hover flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColor[event.type]}`}>
                      <TypeIcon className="w-3 h-3" />
                      {typeLabel[event.type]}
                    </span>
                    {event.isOnline && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-200">
                        <Globe className="w-3 h-3" /> Online
                      </span>
                    )}
                  </div>
                  {event.seatsLeft < 100 && (
                    <span className="text-xs font-semibold text-destructive">{event.seatsLeft} left!</span>
                  )}
                </div>

                <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-snug">{event.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">by {event.organizer}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{event.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary shrink-0" />{event.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary shrink-0" />{event.time}</span>
                  <span className="flex items-center gap-1.5 col-span-2"><MapPin className="w-3.5 h-3.5 text-primary shrink-0" />{event.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {event.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-secondary text-secondary-foreground border border-border">{tag}</span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" /> {event.seatsLeft} / {event.seats} seats
                  </span>
                  <Button size="sm" className="btn-glow text-xs pointer-events-none opacity-80 h-8">
                    Register — Soon
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">No events found. Try a different filter.</p>
          </div>
        )}

        {/* Notify CTA */}
        <div className="mt-12 glass-card rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Never Miss an Event</h3>
          <p className="text-muted-foreground mb-6">Get notified about upcoming career fairs, workshops, and placement drives near you.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 h-11 px-4 rounded-xl bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
            />
            <Button className="h-11 btn-glow px-6 shrink-0">Notify Me</Button>
          </div>
        </div>

        {/* Explore More */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-foreground mb-6">Explore More Opportunities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Hackathons', href: '/hackathons', icon: Trophy },
              { label: 'Courses', href: '/courses', icon: Monitor },
              { label: 'Jobs', href: '/jobs', icon: Building2 },
              { label: 'Community', href: '/community', icon: Users },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl card-hover group">
                <link.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
