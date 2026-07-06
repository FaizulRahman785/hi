import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

function LegalLayout({ title, icon: Icon, lastUpdated, children }: {
  title: string;
  icon: React.ElementType;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <div className="relative pt-28 pb-12 overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
        <div className="aurora-orb aurora-orb-1 absolute w-80 h-80 top-[-40%] left-[-8%] opacity-40" />
        <div className="aurora-orb aurora-orb-2 absolute w-64 h-64 bottom-[-50%] right-[-5%] opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
              <Icon className="w-3.5 h-3.5" />
              Legal Document
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
            <p className="text-white/60 text-sm">Last Updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow pb-20">
        <div className="container mx-auto px-4 max-w-4xl mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm"
          >
            <div className="prose prose-neutral max-w-none
              prose-headings:text-foreground prose-p:text-muted-foreground
              prose-li:text-muted-foreground prose-strong:text-foreground
              prose-a:text-primary prose-hr:border-border
              prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground
            ">
              {children}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" icon={Shield} lastUpdated="May 1, 2024">
      <p>At MB Career Phagwara, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

      <h2>1. Information We Collect</h2>
      <p>We collect information that you provide directly to us when you:</p>
      <ul>
        <li>Register for an account</li>
        <li>Create or update your professional profile</li>
        <li>Apply for jobs or internships</li>
        <li>Enroll in courses</li>
        <li>Contact our support team</li>
      </ul>
      <p>This may include your name, email address, phone number, resume details, educational background, and employment history.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Match you with relevant job opportunities</li>
        <li>Share your profile with employers (only when you apply or opt-in)</li>
        <li>Process payments for courses</li>
        <li>Send you technical notices, updates, and support messages</li>
      </ul>

      <h2>3. Information Sharing and Disclosure</h2>
      <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
      <ul>
        <li><strong>With Employers:</strong> When you apply for a job, your profile and resume are shared with that specific employer.</li>
        <li><strong>Service Providers:</strong> We share info with vendors who perform services on our behalf (like payment processing).</li>
        <li><strong>Legal Requirements:</strong> If required by law or subpoena.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>We use industry-standard encryption and security practices to protect your data. However, no method of transmission over the internet is 100% secure.</p>

      <h2>5. Your Rights</h2>
      <p>You have the right to access, update, or delete your personal information at any time. Contact us at privacy@mbcareerconnect.com to make such a request.</p>

      <h2>6. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at privacy@mbcareerconnect.com or visit our <a href="/contact">Contact page</a>.</p>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout title="Terms of Service" icon={FileText} lastUpdated="May 1, 2024">
      <p>Please read these Terms of Service carefully before using MB Career Phagwara. By accessing or using our platform, you agree to be bound by these terms.</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using MB Career Phagwara, you accept and agree to be bound by these Terms of Service and our Privacy Policy.</p>

      <h2>2. User Accounts</h2>
      <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

      <h2>3. Prohibited Uses</h2>
      <p>You may not use our platform to:</p>
      <ul>
        <li>Post fake job listings or misrepresent your identity</li>
        <li>Collect user data without consent</li>
        <li>Spam or send unsolicited communications</li>
        <li>Violate any applicable laws or regulations</li>
      </ul>

      <h2>4. Employer Responsibilities</h2>
      <p>Employers who post jobs on our platform agree that all listings are genuine, legally compliant opportunities. We reserve the right to remove any listing that violates our community standards.</p>

      <h2>5. Intellectual Property</h2>
      <p>The MB Career Phagwara platform, its content, features, and functionality are owned by MB Career Phagwara and are protected by copyright, trademark, and other intellectual property laws.</p>

      <h2>6. Limitation of Liability</h2>
      <p>MB Career Phagwara shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of (or inability to use) our services.</p>

      <h2>7. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. We will notify users of significant changes via email or a prominent notice on our platform.</p>

      <h2>8. Contact Us</h2>
      <p>If you have questions about these Terms of Service, please contact us at legal@mbcareerconnect.com.</p>
    </LegalLayout>
  );
}
