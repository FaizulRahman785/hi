import React from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { loadProfileFromApi } from '@/lib/profile';

/** After sign-in, check Firestore for whether onboarding is complete */
async function getPostLoginRoute(): Promise<string> {
  const profile = await loadProfileFromApi();
  return profile?.onboardingCompleted ? '/dashboard' : '/onboarding';
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Navbar />

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-orb aurora-orb-1 w-[600px] h-[600px] top-[-20%] left-[-10%] opacity-30" />
        <div className="aurora-orb aurora-orb-2 w-[500px] h-[500px] bottom-[-20%] right-[-10%] opacity-25" />
      </div>

      <main className="flex-grow flex items-center justify-center pt-28 pb-16 px-4 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const { signIn, signInGoogle, reset } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Required Fields",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
      setLocation(await getPostLoginRoute());
    } catch (err: any) {
      toast({
        title: "Sign In Failed",
        description: err.message || "Invalid credentials or system error.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInGoogle();
      toast({
        title: "Success",
        description: "Signed in with Google successfully!",
      });
      setLocation(await getPostLoginRoute());
    } catch (err: any) {
      toast({
        title: "Google Sign In Failed",
        description: err.message || "An error occurred during Google sign in.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive the password reset link.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await reset(email);
      toast({
        title: "Reset Link Sent",
        description: "Please check your inbox for password reset instructions.",
      });
    } catch (err: any) {
      toast({
        title: "Reset Failed",
        description: err.message || "Could not send password reset email.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-card rounded-3xl shadow-2xl overflow-hidden border border-border">
          <div className="p-8 md:p-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className={`p-3 rounded-2xl mb-4 shadow-lg ${theme === 'blue' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Welcome Back</h1>
              <p className="text-muted-foreground text-sm text-center">Sign in to continue your career journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    autoComplete="email" 
                    placeholder="you@example.com" 
                    className="pl-10 h-12 bg-background/60 border-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-foreground">Password</label>
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    className="text-sm font-medium text-primary hover:underline bg-transparent border-0 cursor-pointer p-0"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 bg-background/60 border-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-bold btn-glow shadow-lg mt-2" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-grow border-t border-border" />
              <span className="text-xs text-muted-foreground font-medium">or continue with</span>
              <div className="flex-grow border-t border-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleGoogleSignIn}
                className="h-11 w-full border-border text-muted-foreground hover:text-foreground hover:bg-muted gap-2 cursor-pointer"
                disabled={isLoading}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={() => toast({ title: "Coming Soon", description: "LinkedIn integration is under development." })}
                className="h-11 w-full border-border text-muted-foreground hover:text-foreground hover:bg-muted gap-2 cursor-pointer"
                disabled={isLoading}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="bg-muted/50 border-t border-border p-5 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="font-bold text-primary hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState('Student');
  const { theme } = useTheme();
  const { signUp } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = ['Student', 'Fresher', 'Professional'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields (First Name, Last Name, Email, and Password).",
        variant: "destructive"
      });
      return;
    }

    if (!agreed) {
      toast({
        title: "Terms and Conditions",
        description: "You must agree to the Terms of Service and Privacy Policy to register.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);

      // Create and persist initial profile data
      const fullName = `${firstName} ${lastName}`.trim();
      const initialProfile = {
        fullName,
        email,
        phone,
        city: '',
        state: '',
        country: '',
        college: '',
        degree: '',
        branch: '',
        graduationYear: '',
        currentStatus: activeRole,
        skills: [],
        interests: '',
        preferredCareerPaths: '',
        preferredJobLocations: '',
        workMode: 'Hybrid',
        bio: '',
        resumeUrl: '',
        portfolioUrl: '',
        githubUrl: '',
        linkedinUrl: '',
        profilePhotoUrl: '',
        onboardingCompleted: false,
        profileCompletion: 0,
        updatedAt: new Date().toISOString(),
      };

      // Store locally
      localStorage.setItem('mb-profile', JSON.stringify(initialProfile));

      // Attempt to store in API
      const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';
      if (apiBase) {
        try {
          await fetch(`${apiBase}/api/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initialProfile),
          });
        } catch {
          // Fail silently
        }
      }

      toast({
        title: "Success",
        description: "Verification link sent! Let's get you set up.",
      });
      setLocation('/onboarding');
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.message || "An error occurred during sign up.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="glass-card rounded-3xl shadow-2xl overflow-hidden border border-border">
          <div className="p-8 md:p-10">
            <div className="flex flex-col items-center mb-8">
              <div className={`p-3 rounded-2xl mb-4 shadow-lg ${theme === 'blue' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Create Your Account</h1>
              <p className="text-muted-foreground text-sm text-center">Join thousands of professionals finding their dream roles</p>
            </div>

            {/* Role Selector */}
            <div className="grid grid-cols-3 gap-2 mb-7">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setActiveRole(role)}
                  className={`border rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                    activeRole === role
                      ? 'bg-primary/10 border-primary text-primary shadow-sm'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                  disabled={isLoading}
                >
                  {role}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="John" 
                      autoComplete="given-name" 
                      className="pl-10 h-12 bg-background/60 border-input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                  <Input 
                    placeholder="Doe" 
                    autoComplete="family-name" 
                    className="h-12 bg-background/60 border-input" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    autoComplete="email" 
                    placeholder="you@example.com" 
                    className="pl-10 h-12 bg-background/60 border-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="tel" 
                    autoComplete="tel" 
                    placeholder="+91 98765 43210" 
                    className="pl-10 h-12 bg-background/60 border-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-12 bg-background/60 border-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 accent-primary"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary font-medium hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-bold btn-glow shadow-lg pt-1" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </div>

          <div className="bg-muted/50 border-t border-border p-5 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
