import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'wouter';
import {
  BookOpen, Clock, User, TrendingUp, Star, ArrowRight,
  Search, Rss, ChevronRight, Tag, Flame, Sparkles, Code2,
  FileText, Briefcase, Lightbulb, Cpu, BarChart2, Rocket
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Flame },
  { id: 'career', label: 'Career Tips', icon: TrendingUp },
  { id: 'interview', label: 'Interview Tips', icon: User },
  { id: 'ai', label: 'AI & Tools', icon: Cpu },
  { id: 'programming', label: 'Programming', icon: Code2 },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'freelancing', label: 'Freelancing', icon: Briefcase },
  { id: 'startup', label: 'Startup', icon: Rocket },
  { id: 'productivity', label: 'Productivity', icon: BarChart2 },
  { id: 'technology', label: 'Tech News', icon: Sparkles },
];

const articles = [
  {
    id: 1,
    title: 'How to Crack FAANG Interviews in 2025: A Complete Roadmap',
    excerpt: 'From DSA fundamentals to system design and behavioral rounds — a step-by-step strategy used by candidates who landed offers at Google, Amazon, and Meta.',
    category: 'interview',
    categoryLabel: 'Interview Tips',
    author: 'Priya Nair',
    authorRole: 'Ex-Google SWE',
    readTime: '12 min read',
    date: 'Jun 28, 2025',
    featured: true,
    tags: ['FAANG', 'DSA', 'System Design'],
    color: 'from-blue-500/20 to-violet-500/20',
  },
  {
    id: 2,
    title: '10 AI Tools Every Developer Must Know in 2025',
    excerpt: 'From Copilot to Cursor to Claude — discover the AI stack that 10x developers are using to ship faster and think smarter.',
    category: 'ai',
    categoryLabel: 'AI & Tools',
    author: 'Rahul Verma',
    authorRole: 'AI Engineer at Startup',
    readTime: '8 min read',
    date: 'Jun 22, 2025',
    featured: false,
    tags: ['AI', 'Tools', 'Developer'],
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 3,
    title: 'Build a Resume That Beats ATS and Gets You Shortlisted',
    excerpt: 'Most resumes are rejected before a human reads them. Learn exactly how ATS systems work and how to format, keyword-optimize, and structure your resume.',
    category: 'resume',
    categoryLabel: 'Resume',
    author: 'Sneha Kapoor',
    authorRole: 'HR Manager, TCS',
    readTime: '10 min read',
    date: 'Jun 18, 2025',
    featured: false,
    tags: ['ATS', 'Resume', 'Job Search'],
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 4,
    title: 'The Freshers Guide to Landing Your First Tech Job in India',
    excerpt: 'Confused where to start after graduation? This guide covers everything from building your first portfolio to acing your first technical interview.',
    category: 'career',
    categoryLabel: 'Career Tips',
    author: 'Arjun Sharma',
    authorRole: 'Software Developer, Infosys',
    readTime: '15 min read',
    date: 'Jun 14, 2025',
    featured: false,
    tags: ['Freshers', 'Tech Jobs', 'Portfolio'],
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 5,
    title: 'React vs Next.js in 2025: Which Should You Learn First?',
    excerpt: 'The age-old debate for frontend developers. We break down when to use React, when Next.js shines, and how to position yourself for the job market.',
    category: 'programming',
    categoryLabel: 'Programming',
    author: 'Dev Malik',
    authorRole: 'Senior Frontend Engineer',
    readTime: '9 min read',
    date: 'Jun 10, 2025',
    featured: false,
    tags: ['React', 'Next.js', 'Frontend'],
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 6,
    title: 'How I Earned ₹2 Lakh Freelancing as a College Student',
    excerpt: 'A real story from a B.Tech final year student who built a freelance career on Fiverr and Upwork while attending classes. Here is exactly what worked.',
    category: 'freelancing',
    categoryLabel: 'Freelancing',
    author: 'Ananya Joshi',
    authorRole: 'Freelance Designer & Dev',
    readTime: '11 min read',
    date: 'Jun 6, 2025',
    featured: false,
    tags: ['Freelancing', 'Income', 'Student'],
    color: 'from-violet-500/20 to-purple-500/20',
  },
  {
    id: 7,
    title: 'The Second Brain System: How Top Students Study Smarter',
    excerpt: 'Stop re-reading your notes five times. Learn the Zettelkasten method, Notion templates, and Anki workflows that turn studying into long-term retention.',
    category: 'productivity',
    categoryLabel: 'Productivity',
    author: 'Kiran Patel',
    authorRole: 'IIT Alumni',
    readTime: '7 min read',
    date: 'Jun 2, 2025',
    featured: false,
    tags: ['Productivity', 'Study', 'Notes'],
    color: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    id: 8,
    title: 'From Idea to ₹1 Crore ARR: Lessons from 5 Student Startups',
    excerpt: 'Five founders who built their first company while still in college share the mistakes, pivots, and mindset shifts that made the difference.',
    category: 'startup',
    categoryLabel: 'Startup',
    author: 'MB Editorial Team',
    authorRole: 'MB Career Connect',
    readTime: '14 min read',
    date: 'May 28, 2025',
    featured: false,
    tags: ['Startup', 'Founder', 'Student'],
    color: 'from-green-500/20 to-emerald-500/20',
  },
];

const trendingTags = ['DSA', 'FAANG', 'Resume', 'AI Tools', 'Next.js', 'Freelancing', 'Startup', 'Internship', 'Placement', 'System Design'];

const categoryColorMap: Record<string, string> = {
  career: 'bg-blue-500/10 text-blue-600 border-blue-200',
  interview: 'bg-violet-500/10 text-violet-600 border-violet-200',
  ai: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  programming: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
  resume: 'bg-orange-500/10 text-orange-600 border-orange-200',
  freelancing: 'bg-purple-500/10 text-purple-600 border-purple-200',
  productivity: 'bg-amber-500/10 text-amber-600 border-amber-200',
  startup: 'bg-green-500/10 text-green-600 border-green-200',
  technology: 'bg-pink-500/10 text-pink-600 border-pink-200',
};

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'all' || a.category === activeCategory;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = articles.find(a => a.featured);
  const rest = filtered.filter(a => !a.featured || activeCategory !== 'all' || search);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-4" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-20%] left-[-10%] opacity-50" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-20%] right-[-5%] opacity-30" />
        <div className="relative z-10 container mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            <Rss className="w-4 h-4" /> Knowledge Center
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Blog & Insights</h1>
          <p className="text-white/80 text-lg max-w-2xl mb-8">
            Career advice, interview prep, industry trends, and student success stories — written by professionals who've been there.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {[['100+', 'Articles'], ['10', 'Categories'], ['50+', 'Expert Authors'], ['Weekly', 'New Posts']].map(([num, label]) => (
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
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Article */}
            {featured && activeCategory === 'all' && !search && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative rounded-3xl bg-gradient-to-br ${featured.color} border border-border overflow-hidden p-8 group card-hover`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColorMap[featured.category]}`}>
                    {featured.categoryLabel}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {featured.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{featured.author}</p>
                      <p className="text-xs text-muted-foreground">{featured.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                    <span>{featured.date}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="btn-glow gap-2 pointer-events-none opacity-80" size="sm">
                    Read Article <ArrowRight className="w-4 h-4" />
                    <span className="ml-1 text-xs opacity-70">(Coming Soon)</span>
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(activeCategory === 'all' && !search ? rest : filtered).map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden group card-hover flex flex-col"
                >
                  {/* Color Strip */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${article.color}`} />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColorMap[article.category]}`}>
                        {article.categoryLabel}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {article.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-medium text-foreground">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                      <button className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
                <p className="text-muted-foreground">No articles found. Try a different search or category.</p>
              </div>
            )}

            {/* Load More - Coming Soon */}
            <div className="text-center pt-4">
              <Button variant="outline" className="border-border gap-2 pointer-events-none opacity-70">
                Load More Articles <span className="text-xs text-muted-foreground">(Coming Soon)</span>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Newsletter */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Rss className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Weekly Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the best career articles delivered to your inbox every Monday.</p>
              <div className="space-y-2">
                <Input placeholder="your@email.com" className="h-10" />
                <Button className="w-full btn-glow h-10 text-sm">Subscribe Free</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">Join 12,000+ readers. No spam, ever.</p>
            </div>

            {/* Trending Tags */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-foreground">Trending Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map(tag => (
                  <button key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-foreground">Popular This Week</h3>
              </div>
              <div className="space-y-4">
                {articles.slice(0, 4).map((a, i) => (
                  <div key={a.id} className="flex items-start gap-3 group cursor-pointer">
                    <span className="text-2xl font-extrabold text-muted-foreground/30 leading-none mt-0.5 w-6 text-right shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{a.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore More */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-4">Explore More</h3>
              <div className="space-y-2">
                {[
                  { label: 'Browse Jobs', href: '/jobs', icon: Briefcase },
                  { label: 'Career Tools', href: '/career-tools', icon: Lightbulb },
                  { label: 'Student Resources', href: '/student-resources', icon: BookOpen },
                  { label: 'Success Stories', href: '/success-stories', icon: Star },
                ].map(link => (
                  <Link key={link.href} href={link.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm bg-muted/50 hover:bg-muted transition-colors group">
                    <link.icon className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">{link.label}</span>
                    <ChevronRight className="w-3 h-3 text-muted-foreground ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
