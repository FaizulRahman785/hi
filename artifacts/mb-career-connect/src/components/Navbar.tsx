import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Briefcase, Menu, X, ChevronDown, Sun, Moon, Sparkles,
  Zap, BookOpen, Users, Info, GraduationCap, Building,
  MessageSquare, Trophy, Star, DollarSign, Calendar,
  Map, FileText, Rocket, Code2, Globe2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DropdownItem {
  name: string;
  path: string;
  icon: React.ElementType;
  desc?: string;
}

interface DropdownGroup {
  id: string;
  label: string;
  items: DropdownItem[];
}

const primaryLinks = [
  { name: 'Home', path: '/' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'Internships', path: '/internships' },
  { name: 'Courses', path: '/courses' },
  { name: 'Mentors', path: '/mentors' },
];

const dropdownGroups: DropdownGroup[] = [
  {
    id: 'opportunities',
    label: 'Opportunities',
    items: [
      { name: 'Freelance', path: '/freelance', icon: DollarSign, desc: 'Find or offer freelance projects' },
      { name: 'Hackathons', path: '/hackathons', icon: Zap, desc: 'Competitions & coding contests' },
      { name: 'Scholarships', path: '/scholarships', icon: GraduationCap, desc: 'Govt & private scholarships' },
      { name: 'Events', path: '/events', icon: Calendar, desc: 'Webinars, workshops & career fairs' },
      { name: 'Companies', path: '/companies', icon: Building, desc: 'Explore hiring companies' },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    items: [
      { name: 'Student Resources', path: '/student-resources', icon: BookOpen, desc: 'Notes, papers, DSA & AI tools' },
      { name: 'Career Resources', path: '/resources', icon: FileText, desc: 'Templates, guides & tips' },
      { name: 'Career Tools', path: '/career-tools', icon: Rocket, desc: 'Resume builder, ATS & more' },
      { name: 'Blog', path: '/blog', icon: MessageSquare, desc: 'Career tips & industry news' },
    ],
  },
  {
    id: 'network',
    label: 'Network',
    items: [
      { name: 'Alumni Network', path: '/alumni', icon: Users, desc: 'Connect with successful alumni' },
      { name: 'College Hub', path: '/college-hub', icon: Globe2, desc: 'College profiles & placement data' },
      { name: 'Community', path: '/community', icon: MessageSquare, desc: 'Forums, study groups & meetups' },
      { name: 'Success Stories', path: '/success-stories', icon: Star, desc: 'Real placement & startup stories' },
      { name: 'Toppers', path: '/toppers', icon: Trophy, desc: 'Hall of fame & achievers' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    items: [
      { name: 'About Us', path: '/about', icon: Info, desc: 'Our mission & team' },
      { name: 'Contact', path: '/contact', icon: MessageSquare, desc: 'Get in touch with us' },
      { name: 'FAQ', path: '/faq', icon: Code2, desc: 'Common questions answered' },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setOpenMenu(null);
    setIsOpen(false);
  }, [location]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location === path;
  const isGroupActive = (group: DropdownGroup) => group.items.some(item => location === item.path);

  const linkClass = (active: boolean) =>
    `relative py-2 text-sm font-medium transition-colors group ${
      active
        ? 'text-primary'
        : scrolled || location !== '/'
          ? 'text-muted-foreground hover:text-foreground'
          : 'text-gray-100 hover:text-white'
    }`;

  const dropdownBtnClass = (groupId: string) => {
    const active = isGroupActive(dropdownGroups.find(g => g.id === groupId)!);
    return `flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
      active || openMenu === groupId
        ? 'text-primary'
        : scrolled || location !== '/'
          ? 'text-muted-foreground hover:text-foreground'
          : 'text-gray-100 hover:text-white'
    }`;
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative group shrink-0" data-cursor="pointer">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Briefcase className="w-6 h-6 relative z-10" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled || location !== '/' ? 'text-foreground' : 'text-foreground lg:text-white'} ${theme === 'emerald' ? 'group-hover:text-emerald-400' : ''}`}>
              MB Career Phagwara
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Primary Links */}
            {primaryLinks.map((link) => (
              <Link key={link.name} href={link.path} className={`px-3 ${linkClass(isActive(link.path))}`} data-cursor="pointer">
                {link.name}
                {isActive(link.path) && (
                  <motion.div layoutId="active-nav" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </Link>
            ))}

            {/* Dropdown Groups */}
            {dropdownGroups.map((group) => (
              <div key={group.id} className="relative">
                <button
                  className={`px-3 ${dropdownBtnClass(group.id)}`}
                  onClick={() => setOpenMenu(openMenu === group.id ? null : group.id)}
                  data-cursor="pointer"
                  aria-haspopup="true"
                  aria-expanded={openMenu === group.id}
                >
                  {group.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === group.id ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openMenu === group.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2 z-50"
                      style={{ minWidth: '220px' }}
                    >
                      <div className="bg-popover rounded-2xl shadow-2xl border border-border p-2 backdrop-blur-xl">
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors group/item ${
                              location === item.path
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                            onClick={() => setOpenMenu(null)}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              location === item.path ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary'
                            }`}>
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className={`text-sm font-semibold truncate ${location === item.path ? 'text-primary' : 'text-foreground'}`}>
                                {item.name}
                              </div>
                              {item.desc && <div className="text-xs text-muted-foreground truncate">{item.desc}</div>}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleTheme}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                    theme === 'blue'
                      ? 'bg-white border-2 border-blue-500 text-blue-900 hover:bg-blue-50'
                      : 'bg-[#0d1210] border-2 border-emerald-500 text-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:bg-[#111814]'
                  }`}
                  data-cursor="pointer"
                >
                  <motion.div initial={false} animate={{ rotate: theme === 'emerald' ? 360 : 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
                    {theme === 'blue' ? <Sun className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </motion.div>
                  <span className="text-xs font-bold whitespace-nowrap">{theme === 'blue' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Switch to {theme === 'blue' ? 'Emerald Dark' : 'Professional Blue'}</p>
              </TooltipContent>
            </Tooltip>

            {user ? (
              <>
                <Link href="/dashboard" data-cursor="pointer">
                  <Button variant={scrolled || location !== '/' ? 'outline' : 'secondary'}
                    className={`hover-elevate transition-all ${!scrolled && location === '/' ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'hover:border-primary/50'}`}>
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={() => logout()} 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-95 border-0 cursor-pointer"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" data-cursor="pointer">
                  <Button variant={scrolled || location !== '/' ? 'outline' : 'secondary'}
                    className={`hover-elevate transition-all ${!scrolled && location === '/' ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'hover:border-primary/50'}`}>
                    Login
                  </Button>
                </Link>
                <Link href="/register" data-cursor="pointer">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-95 border-0 cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${theme === 'blue' ? 'bg-white text-blue-600 shadow-sm border' : 'bg-[#111814] text-emerald-400 border border-emerald-900'}`}
              aria-label="Toggle theme"
            >
              {theme === 'blue' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2 text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b shadow-2xl lg:hidden overflow-hidden flex flex-col"
          >
            <div className="p-4 flex flex-col gap-1 flex-grow overflow-y-auto">
              {/* Primary links */}
              {primaryLinks.map(link => (
                <Link key={link.name} href={link.path}
                  className={`text-base font-semibold px-4 py-3.5 rounded-xl transition-colors ${location === link.path ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                  onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}

              {/* Grouped mobile links */}
              {dropdownGroups.map(group => (
                <div key={group.id}>
                  <div className="px-4 pt-4 pb-1 text-xs font-bold text-muted-foreground uppercase tracking-widest">{group.label}</div>
                  {group.items.map(item => (
                    <Link key={item.path} href={item.path}
                      className={`flex items-center gap-3 text-sm font-medium px-4 py-3 rounded-xl transition-colors ${location === item.path ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                      onClick={() => setIsOpen(false)}>
                      <item.icon className="w-4 h-4 shrink-0 text-muted-foreground" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="mt-auto pt-6 pb-20 flex flex-col gap-3 px-2">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center h-12 text-base rounded-xl">Dashboard</Button>
                    </Link>
                    <Button 
                      onClick={() => { logout(); setIsOpen(false); }} 
                      className="w-full justify-center h-12 text-base rounded-xl bg-gradient-to-r from-primary to-accent border-0 cursor-pointer"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center h-12 text-base rounded-xl">Login</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-center h-12 text-base rounded-xl bg-gradient-to-r from-primary to-accent border-0 cursor-pointer">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
