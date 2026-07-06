import { Link } from 'wouter';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="py-20 mt-auto relative overflow-hidden bg-card text-card-foreground border-t border-border transition-colors duration-500">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-6 mb-16">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">MB Career Connect</span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed text-sm">
              India's complete career ecosystem for students and professionals. Discover jobs, internships, courses, mentors, and build your future.
            </p>
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Newsletter</h4>
              <form className="flex flex-col sm:flex-row gap-2 max-w-sm" onSubmit={e => e.preventDefault()}>
                <Input type="email" placeholder="Enter your email" className="flex-1 h-10 bg-background text-sm" />
                <Button type="submit" className="h-10 px-5 bg-primary text-primary-foreground font-semibold shrink-0 text-sm">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-bold mb-5 text-sm text-foreground uppercase tracking-wider">For Students</h4>
            <ul className="space-y-3">
              {[
                { label: 'Jobs', href: '/jobs' },
                { label: 'Internships', href: '/internships' },
                { label: 'Courses', href: '/courses' },
                { label: 'Scholarships', href: '/scholarships' },
                { label: 'Hackathons', href: '/hackathons' },
                { label: 'Student Resources', href: '/student-resources' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Grow & Network */}
          <div>
            <h4 className="font-bold mb-5 text-sm text-foreground uppercase tracking-wider">Grow & Network</h4>
            <ul className="space-y-3">
              {[
                { label: 'Mentors', href: '/mentors' },
                { label: 'Alumni Network', href: '/alumni' },
                { label: 'College Hub', href: '/college-hub' },
                { label: 'Community', href: '/community' },
                { label: 'Events', href: '/events' },
                { label: 'Success Stories', href: '/success-stories' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="font-bold mb-5 text-sm text-foreground uppercase tracking-wider">Tools</h4>
            <ul className="space-y-3">
              {[
                { label: 'Resume Builder', href: '/resume-builder' },
                { label: 'ATS Checker', href: '/ats-checker' },
                { label: 'Career Tools', href: '/career-tools' },
                { label: 'Career Resources', href: '/resources' },
                { label: 'Blog', href: '/blog' },
                { label: 'Toppers', href: '/toppers' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-5 text-sm text-foreground uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Hiring Partners', href: '/companies' },
                { label: 'Freelance Hub', href: '/freelance' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground font-medium flex flex-wrap gap-x-4 gap-y-2 items-center">
            <span>© {new Date().getFullYear()} MB Career Connect. All rights reserved.</span>
            <span className="hidden md:inline">|</span>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <span className="hidden md:inline">|</span>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </p>
          <div className="flex items-center gap-4">
            {[
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Linkedin, label: 'LinkedIn' },
              { Icon: Youtube, label: 'YouTube' },
            ].map(({ Icon, label }, i) => (
              <a key={i} href="#" aria-label={label} rel="noopener noreferrer" target="_blank"
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all border border-border hover:border-primary/50">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
