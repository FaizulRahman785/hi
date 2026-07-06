import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  MessageSquare, Users, Code2, Lightbulb, GraduationCap,
  Rocket, Brain, Calendar, MapPin, Hash, ChevronRight,
  ThumbsUp, Eye, Mail, TrendingUp, Star
} from 'lucide-react';

const sections = [
  { icon: MessageSquare, title: 'Discussion Forums', desc: 'Ask questions, share knowledge, and discuss everything career-related with peers.', posts: '12.4k', members: '45k', color: 'text-blue-500 bg-blue-500/10' },
  { icon: Users, title: 'Study Groups', desc: 'Join or create study groups for competitive exams, DSA prep, and placement prep.', posts: '3.2k', members: '18k', color: 'text-emerald-500 bg-emerald-500/10' },
  { icon: Code2, title: 'Coding Community', desc: 'Share code reviews, debugging help, project collabs, and hackathon team forming.', posts: '8.7k', members: '32k', color: 'text-violet-500 bg-violet-500/10' },
  { icon: Rocket, title: 'Startup Community', desc: 'Connect with co-founders, share ideas, find investors, and get early feedback.', posts: '2.1k', members: '9k', color: 'text-orange-500 bg-orange-500/10' },
  { icon: Brain, title: 'AI Community', desc: 'Explore the latest in AI/ML, share projects, and discuss emerging technologies.', posts: '5.6k', members: '22k', color: 'text-pink-500 bg-pink-500/10' },
  { icon: GraduationCap, title: 'College Community', desc: 'College-specific groups, batch chats, and alumni reconnects for your institution.', posts: '9.3k', members: '60k', color: 'text-cyan-500 bg-cyan-500/10' },
  { icon: Code2, title: 'Developer Community', desc: 'Web, mobile, backend, DevOps – all developer disciplines under one roof.', posts: '7.8k', members: '28k', color: 'text-teal-500 bg-teal-500/10' },
  { icon: Calendar, title: 'Events & Meetups', desc: 'Organize and attend local meetups, virtual events, and networking sessions.', posts: '1.4k', members: '12k', color: 'text-yellow-500 bg-yellow-500/10' },
];

const trendingTopics = [
  { tag: '#DSAPrep', posts: '2.3k' },
  { tag: '#GoogleInternship', posts: '1.8k' },
  { tag: '#StartupIdeas', posts: '1.2k' },
  { tag: '#AITools2025', posts: '980' },
  { tag: '#ResumeReview', posts: '870' },
  { tag: '#CampusPlacement', posts: '760' },
  { tag: '#FreelanceTips', posts: '650' },
  { tag: '#OpenSource', posts: '540' },
];

const recentPosts = [
  { title: 'Got placed at Google! Here\'s my complete preparation strategy (6 months)', author: 'Rohan K.', likes: 1240, views: '18k', tag: 'Placement' },
  { title: 'Best AI tools for students in 2025 – My tested list of 30 tools', author: 'Priya S.', likes: 890, views: '12k', tag: 'AI' },
  { title: 'How I built a SaaS in 2 weeks and got my first paying customer', author: 'Arjun M.', likes: 723, views: '9.4k', tag: 'Startup' },
  { title: 'My experience at Microsoft as a fresher SDE – Honest review', author: 'Sneha R.', likes: 645, views: '8.1k', tag: 'Experience' },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export function Community() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[0%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Users className="w-4 h-4" /> 150,000+ Members
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">The MB Career<br />Community</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            India's largest career-focused community. Ask questions, share wins, find study partners, and grow together.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 border-0 h-11 px-6">
              Join Community
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-11 px-6">
              Explore Discussions
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-10 justify-center md:justify-start">
            {[['150K+', 'Members'], ['45K+', 'Discussions'], ['2.1M+', 'Replies'], ['98%', 'Questions Answered']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-primary">{num}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-12">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Coming Soon Notice */}
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4 mb-8">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute h-2.5 w-2.5 rounded-full bg-primary opacity-50" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <p className="text-sm text-foreground font-medium">
                Interactive community features are launching soon. Join the waitlist for early access!
              </p>
            </div>

            {/* Community Sections */}
            <h2 className="text-2xl font-bold text-foreground mb-6">Community Spaces</h2>
            <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {sections.map(sec => (
                <motion.div key={sec.title} variants={item}
                  className="bg-card border border-border rounded-2xl p-5 card-hover group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${sec.color} flex items-center justify-center shrink-0`}>
                      <sec.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">{sec.title}</h3>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border shrink-0 ml-2">Soon</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{sec.desc}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {sec.posts} posts</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {sec.members} members</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Posts Preview */}
            <h2 className="text-2xl font-bold text-foreground mb-6">Trending Discussions <span className="text-sm text-muted-foreground font-normal ml-2">Preview</span></h2>
            <div className="space-y-3 mb-10">
              {recentPosts.map(post => (
                <div key={post.title} className="bg-card border border-border rounded-2xl p-5 card-hover group">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{post.tag}</span>
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug mb-2">{post.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {post.likes}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-primary h-auto py-1 px-2 text-xs shrink-0">Read</Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Join CTA */}
            <div className="glass-card rounded-3xl p-8 text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Join 150,000+ Learners</h3>
              <p className="text-muted-foreground mb-6">Get early access when community features launch.</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
                <Input type="email" placeholder="your@email.com" className="h-11 flex-1" />
                <Button type="submit" className="h-11 btn-glow px-6 shrink-0">Join Waitlist</Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            {/* Trending Tags */}
            <div className="bg-card border border-border rounded-2xl p-5 mb-5 sticky top-24">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Trending Topics
              </h3>
              <div className="space-y-2">
                {trendingTopics.map(t => (
                  <div key={t.tag} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <span className="text-sm text-primary font-medium flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5" /> {t.tag.replace('#', '')}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events Teaser */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Upcoming Meetups
              </h3>
              {[
                { title: 'Bangalore DSA Meetup', date: 'Jul 20', loc: 'Koramangala' },
                { title: 'Remote Startup Night', date: 'Jul 27', loc: 'Online' },
                { title: 'AI Builders Summit', date: 'Aug 3', loc: 'Hyderabad' },
              ].map(ev => (
                <div key={ev.title} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="text-center bg-primary/10 rounded-lg p-2 shrink-0 w-10">
                    <div className="text-xs font-bold text-primary leading-none">{ev.date.split(' ')[0]}</div>
                    <div className="text-xs text-primary/70 leading-none">{ev.date.split(' ')[1]}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{ev.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {ev.loc}
                    </p>
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full mt-3" variant="outline">View All Events <ChevronRight className="w-3.5 h-3.5 ml-1" /></Button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
