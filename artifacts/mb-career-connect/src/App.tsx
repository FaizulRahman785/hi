import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress, BackToTop } from '@/components/ScrollEffects';

// Existing pages
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Onboarding } from '@/pages/Onboarding';
import { Jobs } from '@/pages/Jobs';
import { Internships } from '@/pages/Internships';
import { Courses } from '@/pages/Courses';
import { Mentors } from '@/pages/Mentors';
import { HiringPartners } from '@/pages/HiringPartners';
import { Resources } from '@/pages/Resources';
import { Blog } from '@/pages/Blog';
import { Events } from '@/pages/Events';
import { Scholarships } from '@/pages/Scholarships';
import { Dashboard, Profile, Notifications, Settings, MyApplications, SavedJobs, SavedCourses, Bookmarks, Certificates, Messages, Activity } from '@/pages/Dashboard';
import { Login, Register } from '@/pages/Auth';
import { Contact } from '@/pages/Contact';
import { FAQ } from '@/pages/FAQ';
import { Privacy, Terms } from '@/pages/Legal';
import { NotFound } from '@/pages/not-found';

// New pages
import { StudentResources } from '@/pages/StudentResources';
import { CollegeHub } from '@/pages/CollegeHub';
import { Alumni } from '@/pages/Alumni';
import { Toppers } from '@/pages/Toppers';
import { Freelance } from '@/pages/Freelance';
import { Community } from '@/pages/Community';
import { Hackathons } from '@/pages/Hackathons';
import { SuccessStories } from '@/pages/SuccessStories';
import { CareerTools } from '@/pages/CareerTools';

import { ComingSoon } from '@/components/ComingSoon';
import {
  ClipboardList, FileText, CheckSquare, PenTool, DollarSign,
  Calculator, MessageSquare, Map, Rocket
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isFirebaseConfigured } from '@/firebase/config';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user && isFirebaseConfigured) {
      setLocation('/login');
    }
  }, [loading, user, setLocation]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;
  }

  if (!user && isFirebaseConfigured) {
    return null;
  }

  return <>{children}</>;
}

const queryClient = new QueryClient();

function AnimatedSwitch() {
  const [location] = useLocation();
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-grow flex flex-col"
      >
        <Switch location={location}>
          {/* Core pages */}
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/internships" component={Internships} />
          <Route path="/courses" component={Courses} />
          <Route path="/mentors" component={Mentors} />
          <Route path="/resources" component={Resources} />

          {/* New main sections */}
          <Route path="/student-resources" component={StudentResources} />
          <Route path="/college-hub" component={CollegeHub} />
          <Route path="/alumni" component={Alumni} />
          <Route path="/toppers" component={Toppers} />
          <Route path="/freelance" component={Freelance} />
          <Route path="/community" component={Community} />
          <Route path="/hackathons" component={Hackathons} />
          <Route path="/success-stories" component={SuccessStories} />
          <Route path="/career-tools" component={CareerTools} />

          {/* Companies alias */}
          <Route path="/companies" component={HiringPartners} />
          <Route path="/hiring-partners" component={HiringPartners} />

          {/* Blog / Events / Scholarships */}
          <Route path="/blog" component={Blog} />
          <Route path="/events" component={Events} />
          <Route path="/scholarships" component={Scholarships} />

          {/* Dashboard pages */}
          <Route path="/onboarding">
            {() => (
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            )}
          </Route>

          <Route path="/dashboard">
            {() => (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/profile">
            {() => (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/notifications">
            {() => (
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/settings">
            {() => (
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/my-applications">
            {() => (
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/saved-jobs">
            {() => (
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/saved-courses">
            {() => (
              <ProtectedRoute>
                <SavedCourses />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/bookmarks">
            {() => (
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/certificates">
            {() => (
              <ProtectedRoute>
                <Certificates />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/messages">
            {() => (
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/activity">
            {() => (
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            )}
          </Route>

          {/* Auth */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {/* Info pages */}
          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={FAQ} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />

          {/* Apply */}
          <Route path="/apply">
            {() => (
              <ComingSoon
                title="Apply for This Role"
                description="Our application system is under active development. Drop your email and we'll notify you the moment it launches so you can apply instantly."
                icon={ClipboardList}
                expectedDate="Q3 2025"
                relatedFeatures={[
                  { label: 'Browse More Jobs', href: '/jobs' },
                  { label: 'Find Internships', href: '/internships' },
                  { label: 'Skill Courses', href: '/courses' },
                  { label: 'Find a Mentor', href: '/mentors' },
                ]}
              />
            )}
          </Route>

          {/* Career Tools sub-pages */}
          <Route path="/resume-builder">
            {() => (
              <ComingSoon
                title="Resume Builder"
                description="Create a stunning, ATS-friendly resume in minutes with our guided builder. We'll notify you when it launches."
                icon={FileText}
                expectedDate="Q3 2025"
                relatedFeatures={[
                  { label: 'All Career Tools', href: '/career-tools' },
                  { label: 'Student Resources', href: '/student-resources' },
                  { label: 'Browse Jobs', href: '/jobs' },
                  { label: 'Find Mentors', href: '/mentors' },
                ]}
              />
            )}
          </Route>
          <Route path="/ats-checker">
            {() => (
              <ComingSoon
                title="ATS Resume Checker"
                description="Upload your resume and paste any job description to get an instant ATS compatibility score and keyword gap analysis."
                icon={CheckSquare}
                expectedDate="Q4 2025"
                relatedFeatures={[
                  { label: 'Resume Builder', href: '/resume-builder' },
                  { label: 'Career Tools', href: '/career-tools' },
                  { label: 'Student Resources', href: '/student-resources' },
                  { label: 'Browse Jobs', href: '/jobs' },
                ]}
              />
            )}
          </Route>
          <Route path="/cover-letter">
            {() => (
              <ComingSoon
                title="Cover Letter Builder"
                description="Generate personalized, compelling cover letters tailored to any job description using AI assistance."
                icon={PenTool}
                expectedDate="Q4 2025"
                relatedFeatures={[
                  { label: 'Resume Builder', href: '/resume-builder' },
                  { label: 'Career Tools', href: '/career-tools' },
                  { label: 'Browse Jobs', href: '/jobs' },
                  { label: 'Student Resources', href: '/student-resources' },
                ]}
              />
            )}
          </Route>
          <Route path="/salary-calculator">
            {() => (
              <ComingSoon
                title="Salary Calculator"
                description="Know your market worth. Compare salaries by role, experience, city, and company across India."
                icon={DollarSign}
                expectedDate="Q4 2025"
                relatedFeatures={[
                  { label: 'Career Tools', href: '/career-tools' },
                  { label: 'Browse Jobs', href: '/jobs' },
                  { label: 'Success Stories', href: '/success-stories' },
                  { label: 'Find Mentors', href: '/mentors' },
                ]}
              />
            )}
          </Route>
          <Route path="/cgpa-calculator">
            {() => (
              <ComingSoon
                title="CGPA Calculator"
                description="Calculate your semester GPA, cumulative CGPA, and predict what grades you need to hit your targets."
                icon={Calculator}
                expectedDate="Q3 2025"
                relatedFeatures={[
                  { label: 'Student Resources', href: '/student-resources' },
                  { label: 'Career Tools', href: '/career-tools' },
                  { label: 'College Hub', href: '/college-hub' },
                  { label: 'Browse Courses', href: '/courses' },
                ]}
              />
            )}
          </Route>
          <Route path="/interview-prep">
            {() => (
              <ComingSoon
                title="Interview Preparation"
                description="Practice HR, technical, and behavioral interviews with AI feedback, scoring, and domain-specific question banks."
                icon={MessageSquare}
                expectedDate="Q4 2025"
                relatedFeatures={[
                  { label: 'Career Tools', href: '/career-tools' },
                  { label: 'Student Resources', href: '/student-resources' },
                  { label: 'Find Mentors', href: '/mentors' },
                  { label: 'Browse Jobs', href: '/jobs' },
                ]}
              />
            )}
          </Route>
          <Route path="/career-roadmaps">
            {() => (
              <ComingSoon
                title="Career Roadmaps"
                description="Step-by-step visual roadmaps for 50+ career paths — from fresher to senior, with milestones and curated resources."
                icon={Map}
                expectedDate="Q3 2025"
                relatedFeatures={[
                  { label: 'Career Tools', href: '/career-tools' },
                  { label: 'Student Resources', href: '/student-resources' },
                  { label: 'Browse Courses', href: '/courses' },
                  { label: 'Find Mentors', href: '/mentors' },
                ]}
              />
            )}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <CustomCursor />
          <ScrollProgress />
          <BackToTop />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <div className="min-h-[100dvh] flex flex-col relative overflow-x-hidden">
              <AnimatedSwitch />
            </div>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
