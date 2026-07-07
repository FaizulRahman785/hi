import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import {
  getDefaultProfile,
  getMissingRequiredProfileFields,
  getProfileCompletion,
  loadProfileFromStorage,
  saveProfile,
  type UserProfile,
} from '@/lib/profile';
import { isFirebaseConfigured } from '@/firebase/config';
import { uploadToCloudinary } from '@/lib/cloudinary';

const steps = ['Personal', 'Education', 'Career', 'Professional', 'About'];

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

function getMissingFieldsForStep(profile: UserProfile, step: number) {
  const checks: Record<number, Array<[string, boolean]>> = {
    0: [
      ['Full Name', hasText(profile.fullName)],
      ['Phone Number', hasText(profile.phone)],
      ['Country', hasText(profile.country)],
      ['State', hasText(profile.state)],
      ['City', hasText(profile.city)],
      ['Profile Photo', hasText(profile.profilePhotoUrl)],
    ],
    1: [
      ['College', hasText(profile.college)],
      ['Degree', hasText(profile.degree)],
      ['Branch', hasText(profile.branch)],
      ['Semester', hasText(profile.semester)],
      ['Passing Year', hasText(profile.graduationYear)],
      ['CGPA', hasText(profile.cgpa)],
    ],
    2: [
      ['Skills', profile.skills.length > 0],
      ['Interests', hasText(profile.interests)],
      ['Preferred Job Role', hasText(profile.preferredCareerPaths)],
      ['Preferred Work Mode', hasText(profile.workMode)],
      ['Preferred Location', hasText(profile.preferredJobLocations)],
    ],
    3: [
      ['Resume Upload', hasText(profile.resumeUrl)],
      ['GitHub', hasText(profile.githubUrl)],
      ['LinkedIn', hasText(profile.linkedinUrl)],
      ['Portfolio', hasText(profile.portfolioUrl)],
    ],
    4: [
      ['Bio', hasText(profile.bio)],
      ['Languages', profile.languages.length > 0],
      ['Certifications', profile.certifications.length > 0],
      ['Achievements', profile.achievements.length > 0],
    ],
  };

  return (checks[step] ?? [])
    .filter(([, complete]) => !complete)
    .map(([label]) => label);
}

function RequiredMark() {
  return <span className="text-destructive">*</span>;
}

export function Onboarding() {
  const [, setLocation] = useLocation();
  const { user, profile: authProfile, refreshProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(() => getDefaultProfile(user?.email ?? ''));
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPhoto(true);
    setMessage('');
    try {
      const upload = await uploadToCloudinary(file, 'profile-photos');
      setProfile((prev) => ({
        ...prev,
        profilePhotoUrl: upload.secureUrl,
        profilePhotoPublicId: upload.publicId,
        profilePhotoResourceType: upload.resourceType,
        profilePhotoBytes: upload.bytes,
      }));
      setMessage('Profile photo uploaded successfully.');
    } catch (err: any) {
      setMessage(`Photo upload failed: ${err.message}`);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingResume(true);
    setMessage('');
    try {
      const upload = await uploadToCloudinary(file, 'resumes');
      setProfile((prev) => ({
        ...prev,
        resumeUrl: upload.secureUrl,
        resumePublicId: upload.publicId,
        resumeResourceType: upload.resourceType,
        resumeBytes: upload.bytes,
      }));
      setMessage('Resume uploaded successfully.');
    } catch (err: any) {
      setMessage(`Resume upload failed: ${err.message}`);
    } finally {
      setIsUploadingResume(false);
    }
  };

  useEffect(() => {
    const source = authProfile ?? loadProfileFromStorage(user?.uid);
    if (source) {
      setProfile({ ...getDefaultProfile(user?.email ?? ''), ...source, email: user?.email ?? source.email, uid: user?.uid ?? source.uid });
    }
  }, [authProfile, user?.email, user?.uid]);

  const completion = useMemo(() => getProfileCompletion(profile), [profile]);

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    const missingForStep = getMissingFieldsForStep(profile, step);
    if (missingForStep.length > 0) {
      setMessage(`Please complete: ${missingForStep.join(', ')}.`);
      return;
    }

    setMessage('');

    if (step < steps.length - 1) {
      setStep((value) => value + 1);
      return;
    }

    const missingFields = getMissingRequiredProfileFields(profile);
    if (missingFields.length > 0) {
      setMessage(`Please complete: ${missingFields.join(', ')}.`);
      return;
    }

    const finalizedProfile: UserProfile = {
      ...profile,
      onboardingCompleted: true,
      profileCompletion: getProfileCompletion(profile),
      updatedAt: new Date().toISOString(),
    };

    setIsSaving(true);
    setMessage('Saving your profile...');
    try {
      await saveProfile(finalizedProfile, user?.uid ?? undefined);
      await refreshProfile();
      setMessage('Profile saved. Taking you to your dashboard...');
      setTimeout(() => setLocation('/dashboard'), 600);
    } catch (err: any) {
      setMessage(`Save failed: ${err.message || 'Please check your connection and try again.'}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-24">
          <div className="max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
            <h1 className="text-2xl font-bold">Firebase is not configured yet</h1>
            <p className="mt-3 text-sm text-muted-foreground">Add your Firebase environment variables and reload the app to enable onboarding.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow px-4 py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Welcome to MB Career Phagwara</p>
                <h1 className="text-2xl font-bold">Complete your profile to unlock the platform</h1>
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                {completion}% complete
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {steps.map((label, index) => (
                <div key={label} className={`min-w-28 flex-1 rounded-full px-3 py-2 text-center text-sm ${step === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            {step === 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Full Name <RequiredMark /></label>
                  <Input value={profile.fullName} onChange={(e) => updateField('fullName', e.target.value)} placeholder="Asha Verma" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Profile Photo <RequiredMark /></label>
                  <div className="flex gap-2">
                    <Input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={isUploadingPhoto} className="bg-background/60 border-input" />
                    {isUploadingPhoto && <span className="text-xs text-muted-foreground self-center">Uploading...</span>}
                  </div>
                  {profile.profilePhotoUrl && (
                    <img src={profile.profilePhotoUrl} alt="Profile preview" className="mt-2 w-12 h-12 rounded-full object-cover border" />
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Phone <RequiredMark /></label>
                  <Input value={profile.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="+91 99999 88888" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">City <RequiredMark /></label>
                  <Input value={profile.city} onChange={(e) => updateField('city', e.target.value)} placeholder="Mumbai" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">State <RequiredMark /></label>
                  <Input value={profile.state} onChange={(e) => updateField('state', e.target.value)} placeholder="Maharashtra" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Country <RequiredMark /></label>
                  <Input value={profile.country} onChange={(e) => updateField('country', e.target.value)} placeholder="India" required />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">College <RequiredMark /></label>
                  <Input value={profile.college} onChange={(e) => updateField('college', e.target.value)} placeholder="IIT Delhi" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Degree <RequiredMark /></label>
                  <Input value={profile.degree} onChange={(e) => updateField('degree', e.target.value)} placeholder="B.Tech" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Branch <RequiredMark /></label>
                  <Input value={profile.branch} onChange={(e) => updateField('branch', e.target.value)} placeholder="Computer Science" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Passing Year <RequiredMark /></label>
                  <Input value={profile.graduationYear} onChange={(e) => updateField('graduationYear', e.target.value)} placeholder="2026" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Semester <RequiredMark /></label>
                  <Input value={profile.semester} onChange={(e) => updateField('semester', e.target.value)} placeholder="7th" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">CGPA <RequiredMark /></label>
                  <Input value={profile.cgpa} onChange={(e) => updateField('cgpa', e.target.value)} placeholder="9.2" required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Current Status</label>
                  <Input value={profile.currentStatus} onChange={(e) => updateField('currentStatus', e.target.value)} placeholder="Student" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Skills (comma separated) <RequiredMark /></label>
                  <Input value={profile.skills.join(', ')} onChange={(e) => updateField('skills', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} placeholder="React, Node.js, TypeScript" required />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Interests <RequiredMark /></label>
                  <Input value={profile.interests} onChange={(e) => updateField('interests', e.target.value)} placeholder="Product design, AI development" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Preferred Job Role <RequiredMark /></label>
                  <Input value={profile.preferredCareerPaths} onChange={(e) => updateField('preferredCareerPaths', e.target.value)} placeholder="Software Engineer" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Preferred Location <RequiredMark /></label>
                  <Input value={profile.preferredJobLocations} onChange={(e) => updateField('preferredJobLocations', e.target.value)} placeholder="Bangalore, Remote" required />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Preferred Work Mode <RequiredMark /></label>
                  <Input value={profile.workMode} onChange={(e) => updateField('workMode', e.target.value)} placeholder="Hybrid" required />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Resume (PDF/DOC) <RequiredMark /></label>
                  <div className="flex gap-2">
                    <Input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={isUploadingResume} className="bg-background/60 border-input" />
                    {isUploadingResume && <span className="text-xs text-muted-foreground self-center">Uploading...</span>}
                  </div>
                  {profile.resumeUrl && (
                    <p className="mt-1 text-xs text-emerald-500 truncate">Uploaded: {profile.resumeUrl.split('/').pop()}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Portfolio URL <RequiredMark /></label>
                  <Input value={profile.portfolioUrl} onChange={(e) => updateField('portfolioUrl', e.target.value)} placeholder="https://portfolio.dev" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">GitHub URL <RequiredMark /></label>
                  <Input value={profile.githubUrl} onChange={(e) => updateField('githubUrl', e.target.value)} placeholder="https://github.com/username" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">LinkedIn URL <RequiredMark /></label>
                  <Input value={profile.linkedinUrl} onChange={(e) => updateField('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/username" required />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Bio <RequiredMark /></label>
                  <textarea value={profile.bio} onChange={(e) => updateField('bio', e.target.value)} className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Tell us about your goals and experience" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Languages (comma separated) <RequiredMark /></label>
                  <Input value={profile.languages.join(', ')} onChange={(e) => updateField('languages', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} placeholder="English, Hindi, Spanish" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Certifications (comma separated) <RequiredMark /></label>
                  <Input value={profile.certifications.join(', ')} onChange={(e) => updateField('certifications', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} placeholder="AWS Cloud Practitioner, GCP Architect" required />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Achievements (comma separated) <RequiredMark /></label>
                  <Input value={profile.achievements.join(', ')} onChange={(e) => updateField('achievements', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} placeholder="1st place at Smart India Hackathon, Top 10% in LeetCode" required />
                </div>
              </div>
            )}

            {message ? (
              <p className={`mt-4 text-sm ${message.startsWith('Save failed') || message.startsWith('Please') || message.includes('failed') ? 'text-destructive' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {message}
              </p>
            ) : null}

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0 || isSaving}>Back</Button>
              <Button onClick={handleNext} disabled={isSaving || isUploadingPhoto || isUploadingResume}>
                {step === steps.length - 1
                  ? (isSaving ? 'Saving...' : 'Finish onboarding')
                  : 'Continue'}
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
