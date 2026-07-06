import React, { useEffect, useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, User, Briefcase, Bookmark, Award,
  Settings as SettingsIcon, Bell, LogOut, FileText, BookOpen,
  MessageSquare, Activity as ActivityIcon, Star, ChevronRight,
  TrendingUp, CheckCircle2, Clock, MapPin, Zap, Eye,
  Edit3, Download, Upload, Plus, Search, Filter, MoreHorizontal,
  ArrowUpRight, Building2, GraduationCap, Cpu, Mail, Phone,
  Github, Globe, Linkedin, Shield, Lock, Moon, Sun, Smartphone,
  Send, Circle, CheckCheck, Users, Heart, Share2, AlertCircle,
  CalendarDays, Target, BarChart2, Trophy, Layers, X, DollarSign
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getProfileCompletion, saveProfile, type UserProfile } from '@/lib/profile';
import { uploadToCloudinary } from '@/lib/cloudinary';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', id: 'overview' },
  { icon: User, label: 'My Profile', path: '/profile', id: 'profile' },
  { icon: FileText, label: 'My Applications', path: '/my-applications', id: 'applications' },
  { icon: Briefcase, label: 'Saved Jobs', path: '/saved-jobs', id: 'saved-jobs' },
  { icon: BookOpen, label: 'Saved Courses', path: '/saved-courses', id: 'saved-courses' },
  { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks', id: 'bookmarks' },
  { icon: Award, label: 'Certificates', path: '/certificates', id: 'certificates' },
  { icon: MessageSquare, label: 'Messages', path: '/messages', id: 'messages' },
  { icon: Bell, label: 'Notifications', path: '/notifications', id: 'notifications' },
  { icon: ActivityIcon, label: 'Activity', path: '/activity', id: 'activity' },
  { icon: SettingsIcon, label: 'Settings', path: '/settings', id: 'settings' },
];

function DashboardLayout({ children, active, profile, user, onLogout }: { children: React.ReactNode; active: string; profile: UserProfile | null; user: { email?: string | null; displayName?: string | null } | null; onLogout: () => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb aurora-orb-1 w-[500px] h-[500px] top-[-20%] left-[-10%] opacity-20" />
        <div className="aurora-orb aurora-orb-2 w-[400px] h-[400px] bottom-[-15%] right-[-10%] opacity-15" />
      </div>

      <main className="flex-grow pt-28 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-card border border-border rounded-2xl p-4 sticky top-28 shadow-sm">
                <div className="flex items-center gap-3 p-2 mb-5 border-b border-border pb-5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                    {profile?.fullName?.slice(0, 2).toUpperCase() ?? user?.email?.slice(0, 2).toUpperCase() ?? 'MB'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground text-sm truncate">{profile?.fullName || user?.displayName || user?.email || 'New Member'}</h3>
                    <p className="text-xs text-muted-foreground truncate">{profile?.degree || 'Career seeker'}{profile?.college ? ` · ${profile.college}` : ''}</p>
                  </div>
                </div>

                <nav className="space-y-0.5 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1">
                  {navItems.map((item) => (
                    <Link key={item.id} href={item.path}>
                      <span
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                          active === item.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {item.label}
                        {item.id === 'messages' && (
                          <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
                        )}
                        {item.id === 'notifications' && (
                          <span className="ml-auto text-xs bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center font-bold">5</span>
                        )}
                      </span>
                    </Link>
                  ))}
                  <div className="pt-3 mt-3 border-t border-border">
                    <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ─── OVERVIEW ──────────────────────────────────────────────────────────────────
const recentApplications = [
  { company: 'Google', role: 'Software Engineer L3', status: 'Interview', statusColor: 'bg-blue-500/10 text-blue-600 border-blue-200', date: 'Jun 28', logo: 'G' },
  { company: 'Razorpay', role: 'Frontend Developer', status: 'Under Review', statusColor: 'bg-amber-500/10 text-amber-600 border-amber-200', date: 'Jun 25', logo: 'R' },
  { company: 'Swiggy', role: 'SDE-II', status: 'Applied', statusColor: 'bg-secondary text-secondary-foreground border-border', date: 'Jun 22', logo: 'S' },
  { company: 'Atlassian', role: 'Software Engineer', status: 'Rejected', statusColor: 'bg-destructive/10 text-destructive border-destructive/20', date: 'Jun 18', logo: 'A' },
];

const upcomingEvents = [
  { title: 'Google Interview — Round 2', date: 'Jul 10', type: 'Interview', color: 'text-blue-500' },
  { title: 'Full Stack Workshop', date: 'Jul 20', type: 'Event', color: 'text-emerald-500' },
  { title: 'PM Scholarship Deadline', date: 'Aug 31', type: 'Deadline', color: 'text-orange-500' },
];

export function Dashboard() {
  const { user, logout, profile: authProfile, profileLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (authProfile) {
      setProfile(authProfile);
      if (!authProfile.onboardingCompleted) {
        setLocation('/onboarding');
      }
    } else if (!profileLoading && user) {
      // No profile found at all → send to onboarding
      setLocation('/onboarding');
    }
  }, [authProfile, profileLoading, user, setLocation]);

  const completion = useMemo(() => {
    if (!profile) return 0;
    const values = [profile.fullName, profile.phone, profile.city, profile.college, profile.degree, profile.skills.length > 0 ? 'skills' : '', profile.bio];
    return Math.min(100, Math.round((values.filter(Boolean).length / 7) * 100));
  }, [profile]);

  return (
    <DashboardLayout active="overview" profile={profile} user={user} onLogout={() => logout()}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Welcome back 👋</p>
              <h1 className="text-2xl font-extrabold text-foreground">{profile?.fullName || user?.displayName || 'Welcome'}</h1>
              <p className="text-sm text-muted-foreground mt-1">{profile?.degree || 'Career seeker'}{profile?.college ? ` · ${profile.college}` : ''}</p>
            </div>
            <Button size="sm" variant="outline" className="border-border gap-2 text-xs">
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-2.5 py-1 rounded-lg text-xs bg-primary/10 text-primary font-medium border border-primary/20">React</span>
            <span className="px-2.5 py-1 rounded-lg text-xs bg-primary/10 text-primary font-medium border border-primary/20">Node.js</span>
            <span className="px-2.5 py-1 rounded-lg text-xs bg-primary/10 text-primary font-medium border border-primary/20">TypeScript</span>
            <span className="px-2.5 py-1 rounded-lg text-xs bg-muted text-muted-foreground font-medium border border-border">+5 more</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Applications', value: '12', icon: FileText, delta: '+3 this week', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Saved Jobs', value: '28', icon: Briefcase, delta: '4 expiring soon', color: 'text-violet-500', bg: 'bg-violet-500/10' },
            { label: 'Profile Views', value: '145', icon: Eye, delta: '+22 this week', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'Certificates', value: '3', icon: Award, delta: '1 in progress', color: 'text-amber-500', bg: 'bg-amber-500/10' },
          ].map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
              <div className="text-xs font-medium text-foreground mt-0.5">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.delta}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-foreground">Recent Applications</h2>
              <Link href="/my-applications">
                <span className="text-xs text-primary font-semibold hover:underline cursor-pointer flex items-center gap-1">View all <ArrowUpRight className="w-3 h-3" /></span>
              </Link>
            </div>
            <div className="space-y-3">
              {recentApplications.map((app, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                    {app.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{app.role}</p>
                    <p className="text-xs text-muted-foreground">{app.company} · {app.date}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${app.statusColor} whitespace-nowrap`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Upcoming */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-bold text-foreground mb-4">Upcoming</h2>
              <div className="space-y-3">
                {upcomingEvents.map((ev, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-snug">{ev.title}</p>
                      <p className={`text-xs font-semibold ${ev.color}`}>{ev.date} · {ev.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Strength */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-bold text-foreground mb-1">Profile Strength</h2>
              <p className="text-xs text-muted-foreground mb-3">Complete your profile to get more views</p>
              <div className="w-full bg-muted rounded-full h-2 mb-3">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${completion}%` }} />
              </div>
              <p className="text-sm font-semibold text-foreground mb-3">{completion}% Complete</p>
              <div className="space-y-2">
                {[
                  { label: 'Add profile photo', done: false },
                  { label: 'Upload resume', done: false },
                  { label: 'Add 3+ skills', done: true },
                  { label: 'Complete education', done: true },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs ${item.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${item.done ? 'text-emerald-500' : 'text-border'}`} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Browse Jobs', href: '/jobs', icon: Briefcase, color: 'text-blue-500' },
              { label: 'Find Mentors', href: '/mentors', icon: Users, color: 'text-violet-500' },
              { label: 'Career Tools', href: '/career-tools', icon: Target, color: 'text-emerald-500' },
              { label: 'View Courses', href: '/courses', icon: BookOpen, color: 'text-amber-500' },
            ].map(action => (
              <Link key={action.href} href={action.href}>
                <div className="flex flex-col items-center gap-2 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors cursor-pointer group text-center">
                  <div className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center group-hover:border-primary/40 transition-colors">
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── PROFILE ───────────────────────────────────────────────────────────────────
export function Profile() {
  const { user, logout, profile: authProfile, refreshProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Initialize local edit state from Firestore-backed AuthContext profile
  useEffect(() => {
    if (authProfile) setProfile(authProfile);
  }, [authProfile]);

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    setMessage('');

    try {
      const finalizedProfile = {
        ...profile,
        profileCompletion: getProfileCompletion(profile),
        updatedAt: new Date().toISOString(),
      };

      const savedProfile = await saveProfile(finalizedProfile);
      setProfile(savedProfile);
      await refreshProfile(); // Re-sync AuthContext from Firestore
      setEditing(false);
      setMessage('Profile saved successfully.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout active="profile" profile={profile} user={user} onLogout={() => logout()}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">My Profile</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Keep your profile current for recruiters and mentors.</p>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="border-border text-xs">Cancel</Button>
            ) : null}
            <Button size="sm" className="btn-glow gap-2 text-xs" onClick={() => (editing ? handleSave() : setEditing(true))} disabled={isSaving}>
              <Edit3 className="w-3.5 h-3.5" /> {editing ? (isSaving ? 'Saving...' : 'Save Profile') : 'Edit Profile'}
            </Button>
          </div>
        </div>

        {message ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary/30 via-primary/20 to-transparent" />
          <div className="px-6 pb-6">
            <div className="-mt-10 flex items-end justify-between mb-5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-card shadow-lg shrink-0">
                {profile?.profilePhotoUrl ? (
                  <img src={profile.profilePhotoUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-extrabold text-2xl">
                    {profile?.fullName?.slice(0, 2).toUpperCase() ?? 'MB'}
                  </div>
                )}
              </div>
              <div className="flex gap-2 pb-1">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-border h-8 text-xs gap-1.5"
                  onClick={() => {
                    if (profile?.resumeUrl) {
                      window.open(profile.resumeUrl, '_blank');
                    } else {
                      alert('No resume uploaded yet.');
                    }
                  }}
                >
                  <Download className="w-3.5 h-3.5" /> Resume
                </Button>
                <Button size="sm" variant="outline" className="border-border h-8 text-xs gap-1.5">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </Button>
              </div>
            </div>
            <div className="mb-4">
              {editing ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Full name</label>
                    <input value={profile?.fullName ?? ''} onChange={(e) => updateField('fullName', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Profile Photo</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const url = await uploadToCloudinary(file, 'profile-photos');
                          updateField('profilePhotoUrl', url);
                        } catch (err: any) {
                          alert(`Upload failed: ${err.message}`);
                        }
                      }} 
                      className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <input value={profile?.email ?? ''} onChange={(e) => updateField('email', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" disabled />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Phone</label>
                    <input value={profile?.phone ?? ''} onChange={(e) => updateField('phone', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">College</label>
                    <input value={profile?.college ?? ''} onChange={(e) => updateField('college', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Degree</label>
                    <input value={profile?.degree ?? ''} onChange={(e) => updateField('degree', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Bio</label>
                    <textarea value={profile?.bio ?? ''} onChange={(e) => updateField('bio', e.target.value)} className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-extrabold text-foreground">{profile?.fullName || user?.displayName || 'Your name'}</h2>
                  <p className="text-sm text-muted-foreground">{profile?.degree || 'Career seeker'}{profile?.college ? ` · ${profile.college}` : ''}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Building2 className="w-3.5 h-3.5 shrink-0" /> {profile?.city || 'Your city'}{profile?.state ? `, ${profile.state}` : ''}
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
              <a className="flex items-center gap-1.5 hover:text-primary transition-colors"><Mail className="w-3.5 h-3.5" /> {profile?.email || user?.email || 'Add your email'}</a>
              <a className="flex items-center gap-1.5 hover:text-primary transition-colors"><Phone className="w-3.5 h-3.5" /> {profile?.phone || 'Add phone'}</a>
              <a className="flex items-center gap-1.5 hover:text-primary transition-colors"><Linkedin className="w-3.5 h-3.5" /> {profile?.linkedinUrl || 'Add LinkedIn'}</a>
              <a className="flex items-center gap-1.5 hover:text-primary transition-colors"><Github className="w-3.5 h-3.5" /> {profile?.githubUrl || 'Add GitHub'}</a>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {profile?.bio || 'Tell recruiters about your goals, strengths, and the kind of opportunities you want.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">Skills</h3>
              </div>
              {editing ? (
                <textarea value={(profile?.skills ?? []).join(', ')} onChange={(e) => updateField('skills', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="React, Node.js, TypeScript" />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(profile?.skills?.length ? profile.skills : ['Add your strongest skills']).map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg text-sm bg-primary/10 text-primary border border-primary/20 font-medium">{skill}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-4">Education</h3>
              {editing ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Degree</label>
                    <input value={profile?.degree ?? ''} onChange={(e) => updateField('degree', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">College</label>
                    <input value={profile?.college ?? ''} onChange={(e) => updateField('college', e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{profile?.degree || 'Degree not set'}</h4>
                      <p className="text-xs text-muted-foreground">{profile?.college || 'College not set'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-3">Resume</h3>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center mb-3">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-xs text-muted-foreground truncate">{profile?.resumeUrl ? profile.resumeUrl.split('/').pop() : 'Upload your resume'}</p>
              </div>
              <input
                type="file"
                id="resume-upload-input"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await uploadToCloudinary(file, 'resumes');
                    if (profile) {
                      const updated = { ...profile, resumeUrl: url };
                      setProfile(updated);
                      await saveProfile(updated);
                    }
                  } catch (err: any) {
                    alert(`Upload failed: ${err.message}`);
                  }
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-border text-xs h-9 gap-1.5"
                  onClick={() => {
                    if (profile?.resumeUrl) {
                      window.open(profile.resumeUrl, '_blank');
                    } else {
                      alert('No resume uploaded yet.');
                    }
                  }}
                >
                  <Download className="w-3.5 h-3.5" />Download
                </Button>
                <Button 
                  size="sm" 
                  className="btn-glow text-xs h-9 gap-1.5"
                  onClick={() => document.getElementById('resume-upload-input')?.click()}
                >
                  <Upload className="w-3.5 h-3.5" />Replace
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── MY APPLICATIONS ─────────────────────────────────────────────────────────
const applications = [
  { id: 1, role: 'Software Engineer L3', company: 'Google', location: 'Bangalore', type: 'Full-time', salary: '₹25–35 LPA', status: 'Interview Scheduled', statusColor: 'bg-blue-500/10 text-blue-600 border-blue-200', appliedDate: 'Jun 28, 2025', nextAction: 'Round 2 on Jul 10', logo: 'G' },
  { id: 2, role: 'Frontend Developer', company: 'Razorpay', location: 'Bangalore (Hybrid)', type: 'Full-time', salary: '₹18–24 LPA', status: 'Under Review', statusColor: 'bg-amber-500/10 text-amber-600 border-amber-200', appliedDate: 'Jun 25, 2025', nextAction: 'Awaiting HR response', logo: 'R' },
  { id: 3, role: 'SDE-II', company: 'Swiggy', location: 'Bangalore', type: 'Full-time', salary: '₹22–30 LPA', status: 'Applied', statusColor: 'bg-secondary text-secondary-foreground border-border', appliedDate: 'Jun 22, 2025', nextAction: 'Application in queue', logo: 'S' },
  { id: 4, role: 'Software Engineer', company: 'Atlassian', location: 'Remote', type: 'Full-time', salary: '$120K', status: 'Rejected', statusColor: 'bg-destructive/10 text-destructive border-destructive/20', appliedDate: 'Jun 18, 2025', nextAction: '—', logo: 'A' },
  { id: 5, role: 'Product Engineer', company: 'CRED', location: 'Bangalore', type: 'Full-time', salary: '₹20–28 LPA', status: 'Applied', statusColor: 'bg-secondary text-secondary-foreground border-border', appliedDate: 'Jun 15, 2025', nextAction: 'Screening round pending', logo: 'C' },
  { id: 6, role: 'Backend Intern', company: 'Zepto', location: 'Mumbai', type: 'Internship', salary: '₹60K/month', status: 'Offer Received', statusColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200', appliedDate: 'Jun 5, 2025', nextAction: 'Accept by Jul 15', logo: 'Z' },
];

const statusFilters = ['All', 'Applied', 'Under Review', 'Interview Scheduled', 'Offer Received', 'Rejected'];

export function MyApplications() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? applications : applications.filter(a => a.status === filter);

  return (
    <DashboardLayout active="applications" profile={null} user={null} onLogout={() => {}}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">My Applications</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{applications.length} total applications</p>
          </div>
          <Link href="/jobs">
            <Button size="sm" className="btn-glow gap-2 text-xs"><Plus className="w-3.5 h-3.5" /> Apply to Jobs</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: applications.length, color: 'text-foreground' },
            { label: 'In Progress', value: applications.filter(a => ['Under Review', 'Interview Scheduled'].includes(a.status)).length, color: 'text-blue-500' },
            { label: 'Offers', value: applications.filter(a => a.status === 'Offer Received').length, color: 'text-emerald-500' },
            { label: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length, color: 'text-destructive' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                filter === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.map(app => (
            <div key={app.id} className="bg-card border border-border rounded-2xl p-5 group hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold shrink-0">
                  {app.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-foreground">{app.role}</h3>
                      <p className="text-sm text-muted-foreground">{app.company} · {app.location}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{app.type}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{app.salary}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />Applied: {app.appliedDate}</span>
                  </div>
                  {app.nextAction !== '—' && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-primary font-medium">
                      <Zap className="w-3.5 h-3.5" /> {app.nextAction}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── SAVED JOBS ───────────────────────────────────────────────────────────────
const savedJobs = [
  { id: 1, role: 'Staff Engineer', company: 'Stripe', location: 'Remote', salary: '$180K', type: 'Full-time', saved: 'Jun 30', expires: 'Jul 25', logo: 'S', hot: true },
  { id: 2, role: 'SDE-III', company: 'Microsoft', location: 'Hyderabad', salary: '₹45–60 LPA', type: 'Full-time', saved: 'Jun 28', expires: 'Aug 10', logo: 'M', hot: false },
  { id: 3, role: 'React Native Developer', company: 'PhonePe', location: 'Bangalore', salary: '₹20–30 LPA', type: 'Full-time', saved: 'Jun 25', expires: 'Jul 20', logo: 'P', hot: true },
  { id: 4, role: 'Data Scientist', company: 'Flipkart', location: 'Bangalore (Hybrid)', salary: '₹22–32 LPA', type: 'Full-time', saved: 'Jun 20', expires: 'Aug 1', logo: 'F', hot: false },
  { id: 5, role: 'DevOps Engineer', company: 'Freshworks', location: 'Chennai', salary: '₹18–25 LPA', type: 'Full-time', saved: 'Jun 18', expires: 'Aug 5', logo: 'F', hot: false },
];

export function SavedJobs() {
  return (
    <DashboardLayout active="saved-jobs" profile={null} user={null} onLogout={() => {}}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Saved Jobs</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{savedJobs.length} saved · 2 expiring soon</p>
          </div>
          <Link href="/jobs">
            <Button size="sm" className="btn-glow gap-2 text-xs"><Search className="w-3.5 h-3.5" /> Find More Jobs</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {savedJobs.map(job => (
            <div key={job.id} className="bg-card border border-border rounded-2xl p-5 group hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold shrink-0">
                  {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground">{job.role}</h3>
                      {job.hot && <span className="px-2 py-0.5 rounded-full text-xs bg-destructive/10 text-destructive border border-destructive/20 font-medium">🔥 Hot</span>}
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company} · {job.location}</p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                    <span>{job.type}</span>
                    <span className="font-semibold text-foreground">{job.salary}</span>
                    <span>Saved {job.saved}</span>
                    <span className="text-orange-500 font-medium">Expires {job.expires}</span>
                  </div>
                </div>
                <Button size="sm" className="btn-glow text-xs shrink-0 pointer-events-none opacity-80 h-9">Apply Soon</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── SAVED COURSES ─────────────────────────────────────────────────────────────
const savedCourses = [
  { id: 1, title: 'Full Stack Web Development Bootcamp', provider: 'MB Career Phagwara', duration: '6 months', progress: 35, enrolled: true, logo: 'F' },
  { id: 2, title: 'System Design Masterclass', provider: 'Design Gurus', duration: '8 weeks', progress: 0, enrolled: false, logo: 'S' },
  { id: 3, title: 'AWS Cloud Practitioner', provider: 'Amazon', duration: '3 months', progress: 72, enrolled: true, logo: 'A' },
  { id: 4, title: 'Machine Learning Fundamentals', provider: 'Coursera (Stanford)', duration: '4 months', progress: 0, enrolled: false, logo: 'M' },
];

export function SavedCourses() {
  return (
    <DashboardLayout active="saved-courses" profile={null} user={null} onLogout={() => {}}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Saved Courses</h1>
            <p className="text-sm text-muted-foreground mt-0.5">2 enrolled · 2 saved for later</p>
          </div>
          <Link href="/courses">
            <Button size="sm" className="btn-glow gap-2 text-xs"><Search className="w-3.5 h-3.5" /> Explore Courses</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedCourses.map(course => (
            <div key={course.id} className="bg-card border border-border rounded-2xl p-5 group hover:border-primary/30 transition-colors flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold shrink-0">
                  {course.logo}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm leading-snug">{course.title}</h3>
                  <p className="text-xs text-muted-foreground">{course.provider} · {course.duration}</p>
                </div>
              </div>

              {course.enrolled ? (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-semibold text-foreground">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <span className="text-xs text-muted-foreground">Not started yet</span>
                </div>
              )}

              <div className="mt-auto flex gap-2">
                {course.enrolled ? (
                  <Button size="sm" className="btn-glow text-xs h-9 flex-1 pointer-events-none opacity-80">Continue Learning</Button>
                ) : (
                  <Button size="sm" className="btn-glow text-xs h-9 flex-1 pointer-events-none opacity-80">Enroll Now</Button>
                )}
                <Button size="sm" variant="ghost" className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── BOOKMARKS ─────────────────────────────────────────────────────────────────
const bookmarks = [
  { id: 1, type: 'Article', title: 'How to Crack FAANG Interviews in 2025', source: 'MB Blog', date: 'Jun 30', icon: BookOpen },
  { id: 2, type: 'Mentor', title: 'Siddharth Rao — Engineering Manager at Google', source: 'Mentors', date: 'Jun 28', icon: User },
  { id: 3, type: 'Resource', title: 'DSA Sheet by Striver — 450 Problems', source: 'Student Resources', date: 'Jun 25', icon: FileText },
  { id: 4, type: 'Event', title: 'Full Stack Web Dev Workshop — Jul 20', source: 'Events', date: 'Jun 22', icon: CalendarDays },
  { id: 5, type: 'Company', title: 'Zepto — Hiring Software Engineers', source: 'Companies', date: 'Jun 18', icon: Building2 },
];

export function Bookmarks() {
  return (
    <DashboardLayout active="bookmarks" profile={null} user={null} onLogout={() => {}}>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-foreground">Bookmarks</h1>

        <div className="space-y-3">
          {bookmarks.map(b => (
            <div key={b.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 group hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.type} · {b.source} · Saved {b.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 text-destructive">
                  <X className="w-4 h-4" />
                </Button>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────
const certificates = [
  { id: 1, title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'May 2025', id_no: 'AWS-CLF-C02-2025-JD', in_progress: false },
  { id: 2, title: 'Full Stack Web Development', issuer: 'MB Career Phagwara', date: 'Mar 2025', id_no: 'MB-FSWD-2025-0842', in_progress: false },
  { id: 3, title: 'System Design Masterclass', issuer: 'Design Gurus', date: 'In Progress', id_no: '—', in_progress: true },
];

export function Certificates() {
  return (
    <DashboardLayout active="certificates" profile={null} user={null} onLogout={() => {}}>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-foreground">My Certificates</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certificates.map(cert => (
            <div key={cert.id} className={`bg-card border rounded-2xl p-6 ${cert.in_progress ? 'border-dashed border-primary/40' : 'border-border'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${cert.in_progress ? 'bg-muted' : 'bg-amber-500/10'}`}>
                  <Award className={`w-6 h-6 ${cert.in_progress ? 'text-muted-foreground' : 'text-amber-500'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.in_progress ? 'In Progress' : `Issued: ${cert.date}`}</p>
                  {!cert.in_progress && (
                    <p className="text-xs text-muted-foreground">ID: {cert.id_no}</p>
                  )}
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                {cert.in_progress ? (
                  <Button size="sm" className="btn-glow text-xs h-9 pointer-events-none opacity-80">Continue Course</Button>
                ) : (
                  <>
                    <Button size="sm" variant="outline" className="border-border text-xs h-9 gap-1.5"><Download className="w-3.5 h-3.5" /> Download</Button>
                    <Button size="sm" variant="outline" className="border-border text-xs h-9 gap-1.5"><Linkedin className="w-3.5 h-3.5" /> Share</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State CTA */}
        <div className="bg-card border border-dashed border-border rounded-2xl p-8 text-center">
          <Award className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="font-semibold text-foreground mb-1">Earn More Certificates</p>
          <p className="text-sm text-muted-foreground mb-4">Complete courses, hackathons, and workshops to grow your credential portfolio.</p>
          <Link href="/courses">
            <Button size="sm" className="btn-glow text-xs h-9">Browse Courses</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── MESSAGES ─────────────────────────────────────────────────────────────────
const conversations = [
  { id: 1, name: 'Priya Nair', role: 'Ex-Google SWE · Mentor', lastMsg: "Sure, let's schedule a 1:1 session on Friday!", time: '2h ago', unread: 2, online: true },
  { id: 2, name: 'Razorpay HR', role: 'Recruiter at Razorpay', lastMsg: "We'd like to schedule a technical round for you.", time: '5h ago', unread: 1, online: false },
  { id: 3, name: 'Rohan Mehta', role: 'Study Partner — IIT Bombay', lastMsg: 'Did you solve the DP problem from yesterday?', time: '1d ago', unread: 0, online: true },
  { id: 4, name: 'MB Career Phagwara', role: 'Platform Updates', lastMsg: 'Your profile was viewed by 3 companies this week!', time: '2d ago', unread: 0, online: false },
];

export function Messages() {
  const [active, setActive] = useState<number | null>(1);

  return (
    <DashboardLayout active="messages" profile={null} user={null} onLogout={() => {}}>
      <div className="h-[600px] flex border border-border rounded-2xl overflow-hidden bg-card">
        {/* Conversation List */}
        <div className="w-72 shrink-0 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-foreground">Messages</h2>
              <button className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-primary" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-muted border border-border focus:outline-none" placeholder="Search messages…" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(c => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className={`w-full flex items-start gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors text-left ${active === c.id ? 'bg-primary/5' : ''}`}>
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {active ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {conversations.find(c => c.id === active)?.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {conversations.find(c => c.id === active)?.online && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{conversations.find(c => c.id === active)?.name}</p>
                  <p className="text-xs text-muted-foreground">{conversations.find(c => c.id === active)?.role}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">PN</div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm p-3 max-w-xs">
                    <p className="text-sm text-foreground">Hi John! I saw your profile on MB Career Phagwara. Your projects look impressive 🙌</p>
                    <p className="text-xs text-muted-foreground mt-1">10:32 AM</p>
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs shrink-0">JD</div>
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 max-w-xs">
                    <p className="text-sm">Thanks Priya! I've been looking for a mentor for system design prep. Would you be available?</p>
                    <p className="text-xs text-primary-foreground/70 mt-1">10:45 AM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">PN</div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm p-3 max-w-xs">
                    <p className="text-sm text-foreground">Sure, let's schedule a 1:1 session on Friday!</p>
                    <p className="text-xs text-muted-foreground mt-1">11:02 AM</p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border flex gap-2">
                <input className="flex-1 h-10 px-4 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary placeholder-muted-foreground" placeholder="Type a message…" />
                <Button size="sm" className="btn-glow h-10 w-10 p-0 pointer-events-none opacity-80"><Send className="w-4 h-4" /></Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── NOTIFICATIONS ─────────────────────────────────────────────────────────────
const notifs = [
  { id: 1, type: 'success', icon: CheckCircle2, iconColor: 'text-emerald-500', title: 'Application Shortlisted!', desc: 'Zepto has shortlisted you for Backend Intern. Check your email for next steps.', time: '2h ago', unread: true },
  { id: 2, type: 'info', icon: Eye, iconColor: 'text-blue-500', title: 'Profile Viewed', desc: 'A recruiter from Google viewed your profile.', time: '4h ago', unread: true },
  { id: 3, type: 'alert', icon: Clock, iconColor: 'text-orange-500', title: 'Scholarship Deadline', desc: "PM Scholarship Scheme closes in 5 days. Don't miss it!", time: '1d ago', unread: true },
  { id: 4, type: 'info', icon: MessageSquare, iconColor: 'text-violet-500', title: 'New Message from Priya Nair', desc: "Sure, let's schedule a 1:1 session on Friday!", time: '2d ago', unread: false },
  { id: 5, type: 'success', icon: Award, iconColor: 'text-amber-500', title: 'Certificate Earned!', desc: "You've completed Full Stack Web Development. Download your certificate now.", time: '3d ago', unread: false },
  { id: 6, type: 'info', icon: CalendarDays, iconColor: 'text-primary', title: 'Event Reminder', desc: "Full Stack Web Dev Workshop is tomorrow at 10 AM. Don't forget!", time: '4d ago', unread: false },
];

export function Notifications() {
  return (
    <DashboardLayout active="notifications" profile={null} user={null} onLogout={() => {}}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground mt-0.5">3 unread notifications</p>
          </div>
          <Button size="sm" variant="outline" className="border-border text-xs h-9">Mark all read</Button>
        </div>

        <div className="space-y-3">
          {notifs.map(n => (
            <div key={n.id} className={`bg-card border rounded-2xl p-4 flex items-start gap-4 ${n.unread ? 'border-primary/30 bg-primary/5' : 'border-border'}`}>
              <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0`}>
                <n.icon className={`w-5 h-5 ${n.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
              </div>
              {n.unread && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── ACTIVITY ─────────────────────────────────────────────────────────────────
const activities = [
  { id: 1, action: 'Applied to Software Engineer at Google', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10', time: 'Jun 28, 2025' },
  { id: 2, action: 'Saved Frontend Developer role at Razorpay', icon: Bookmark, color: 'text-violet-500', bg: 'bg-violet-500/10', time: 'Jun 25, 2025' },
  { id: 3, action: 'Enrolled in Full Stack Web Development course', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-500/10', time: 'Jun 20, 2025' },
  { id: 4, action: 'Completed AWS Cloud Practitioner certification', icon: Award, color: 'text-amber-500', bg: 'bg-amber-500/10', time: 'May 30, 2025' },
  { id: 5, action: 'Bookmarked DSA Sheet by Striver', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-500/10', time: 'May 25, 2025' },
  { id: 6, action: 'Connected with Priya Nair (Mentor)', icon: User, color: 'text-primary', bg: 'bg-primary/10', time: 'May 20, 2025' },
  { id: 7, action: 'Registered for National Career Fair 2025', icon: CalendarDays, color: 'text-cyan-500', bg: 'bg-cyan-500/10', time: 'May 15, 2025' },
];

export function Activity() {
  return (
    <DashboardLayout active="activity" profile={null} user={null} onLogout={() => {}}>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-foreground">Activity Feed</h1>

        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {activities.map((a, i) => (
                <div key={a.id} className="flex items-start gap-4 relative">
                  <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center shrink-0 relative z-10`}>
                    <a.icon className={`w-5 h-5 ${a.color}`} />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm text-foreground font-medium">{a.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
export function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative ${on ? 'bg-primary' : 'bg-muted border border-border'}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow ${on ? 'left-6' : 'left-1'}`} />
    </button>
  );

  return (
    <DashboardLayout active="settings" profile={null} user={null} onLogout={() => {}}>
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-foreground">Settings</h1>

        {/* Account */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-5 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Account</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                <input defaultValue="John Doe" className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                <input defaultValue="john.doe@iitd.ac.in" className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number</label>
                <input defaultValue="+91 98765 43210" className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Location</label>
                <input defaultValue="New Delhi, India" className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
            <Button size="sm" className="btn-glow text-xs h-9 pointer-events-none opacity-80">Save Changes</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-5 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive job alerts, updates, and weekly digest', on: emailNotifs, toggle: () => setEmailNotifs(!emailNotifs) },
              { label: 'Push Notifications', desc: 'Get real-time alerts in browser', on: pushNotifs, toggle: () => setPushNotifs(!pushNotifs) },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Toggle on={item.on} onToggle={item.toggle} />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-5 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Privacy & Security</h2>
          <div className="space-y-4">
            {[
              { label: 'Public Profile', desc: 'Allow recruiters to find your profile', on: profileVisible, toggle: () => setProfileVisible(!profileVisible) },
              { label: 'Two-Factor Authentication', desc: 'Add extra security to your account', on: twoFA, toggle: () => setTwoFA(!twoFA) },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Toggle on={item.on} onToggle={item.toggle} />
              </div>
            ))}
            <div className="pt-2 border-t border-border">
              <Button size="sm" variant="outline" className="border-border text-xs h-9 gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5">
                <Lock className="w-3.5 h-3.5" /> Change Password
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card border border-destructive/30 rounded-2xl p-6">
          <h2 className="font-bold text-destructive mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
          <Button size="sm" variant="outline" className="border-destructive/50 text-destructive text-xs h-9 hover:bg-destructive/5">
            Delete Account
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
