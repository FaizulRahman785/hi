import { auth, db } from '@/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  uid?: string | null;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  college: string;
  degree: string;
  branch: string;
  graduationYear: string;
  semester: string;
  cgpa: string;
  currentStatus: string;
  skills: string[];
  interests: string;
  preferredCareerPaths: string;
  preferredJobLocations: string;
  workMode: string;
  bio: string;
  resumeUrl: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  profilePhotoUrl: string;
  profilePhotoPublicId: string;
  profilePhotoResourceType: string;
  profilePhotoBytes: number;
  resumePublicId: string;
  resumeResourceType: string;
  resumeBytes: number;
  coverImageUrl?: string;
  coverImagePublicId?: string;
  coverImageResourceType?: string;
  coverImageBytes?: number;
  languages: string[];
  certifications: string[];
  achievements: string[];
  onboardingCompleted: boolean;
  profileCompletion: number;
  updatedAt: string;
}

const STORAGE_KEY = 'mb-profile';

const requiredProfileChecks: Array<{
  label: string;
  isComplete: (profile: UserProfile) => boolean;
}> = [
  { label: 'Full Name', isComplete: (profile) => hasText(profile.fullName) },
  { label: 'Phone Number', isComplete: (profile) => hasText(profile.phone) },
  { label: 'Country', isComplete: (profile) => hasText(profile.country) },
  { label: 'State', isComplete: (profile) => hasText(profile.state) },
  { label: 'City', isComplete: (profile) => hasText(profile.city) },
  { label: 'Profile Photo', isComplete: (profile) => hasText(profile.profilePhotoUrl) },
  { label: 'College', isComplete: (profile) => hasText(profile.college) },
  { label: 'Degree', isComplete: (profile) => hasText(profile.degree) },
  { label: 'Branch', isComplete: (profile) => hasText(profile.branch) },
  { label: 'Semester', isComplete: (profile) => hasText(profile.semester) },
  { label: 'Passing Year', isComplete: (profile) => hasText(profile.graduationYear) },
  { label: 'CGPA', isComplete: (profile) => hasText(profile.cgpa) },
  { label: 'Skills', isComplete: (profile) => profile.skills.length > 0 },
  { label: 'Interests', isComplete: (profile) => hasText(profile.interests) },
  { label: 'Preferred Job Role', isComplete: (profile) => hasText(profile.preferredCareerPaths) },
  { label: 'Preferred Work Mode', isComplete: (profile) => hasText(profile.workMode) },
  { label: 'Preferred Location', isComplete: (profile) => hasText(profile.preferredJobLocations) },
  { label: 'Resume Upload', isComplete: (profile) => hasText(profile.resumeUrl) },
  { label: 'GitHub', isComplete: (profile) => hasText(profile.githubUrl) },
  { label: 'LinkedIn', isComplete: (profile) => hasText(profile.linkedinUrl) },
  { label: 'Portfolio', isComplete: (profile) => hasText(profile.portfolioUrl) },
  { label: 'Bio', isComplete: (profile) => hasText(profile.bio) },
  { label: 'Languages', isComplete: (profile) => profile.languages.length > 0 },
  { label: 'Certifications', isComplete: (profile) => profile.certifications.length > 0 },
  { label: 'Achievements', isComplete: (profile) => profile.achievements.length > 0 },
];

function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

function getStorageKey(uid?: string | null) {
  return uid ? `${STORAGE_KEY}:${uid}` : STORAGE_KEY;
}

export function getDefaultProfile(email = ''): UserProfile {
  return {
    uid: null,
    fullName: '',
    email,
    phone: '',
    city: '',
    state: '',
    country: '',
    college: '',
    degree: '',
    branch: '',
    graduationYear: '',
    semester: '',
    cgpa: '',
    currentStatus: 'Student',
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
    profilePhotoPublicId: '',
    profilePhotoResourceType: '',
    profilePhotoBytes: 0,
    resumePublicId: '',
    resumeResourceType: '',
    resumeBytes: 0,
    coverImageUrl: '',
    coverImagePublicId: '',
    coverImageResourceType: '',
    coverImageBytes: 0,
    languages: [],
    certifications: [],
    achievements: [],
    onboardingCompleted: false,
    profileCompletion: 0,
    updatedAt: new Date().toISOString(),
  };
}

export function getProfileCompletion(profile: UserProfile | null | undefined) {
  if (!profile) return 0;
  const filled = requiredProfileChecks.filter(({ isComplete }) => isComplete(profile)).length;
  return Math.min(100, Math.round((filled / requiredProfileChecks.length) * 100));
}

export function getMissingRequiredProfileFields(profile: UserProfile | null | undefined) {
  if (!profile) return requiredProfileChecks.map(({ label }) => label);
  return requiredProfileChecks
    .filter(({ isComplete }) => !isComplete(profile))
    .map(({ label }) => label);
}

export function isProfileComplete(profile: UserProfile | null | undefined) {
  return getMissingRequiredProfileFields(profile).length === 0;
}

function cacheToStorage(profile: UserProfile, uid?: string | null) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(getStorageKey(uid ?? profile.uid), JSON.stringify(profile));
    }
  } catch {
    // Storage quota exceeded - ignore cache failure.
  }
}

export function loadProfileFromStorage(uid?: string | null): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(getStorageKey(uid));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as UserProfile;
    return {
      ...getDefaultProfile(parsed.email),
      ...parsed,
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      languages: Array.isArray(parsed.languages) ? parsed.languages : [],
      certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
      onboardingCompleted: Boolean(parsed.onboardingCompleted),
    };
  } catch {
    return null;
  }
}

export function clearProfileCache(uid?: string | null) {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
  if (uid) {
    window.localStorage.removeItem(getStorageKey(uid));
  }
}

export async function loadProfileFromApi(uid = ''): Promise<UserProfile | null> {
  if (typeof window === 'undefined') return null;

  const currentUser = auth.currentUser;
  const refId = currentUser?.uid || uid;
  if (!refId || !currentUser) return null;

  try {
    const docRef = doc(db, 'profiles', refId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const profile: UserProfile = {
        ...getDefaultProfile(data.email ?? currentUser.email ?? ''),
        ...data,
        uid: refId,
        skills: Array.isArray(data.skills) ? data.skills : [],
        languages: Array.isArray(data.languages) ? data.languages : [],
        certifications: Array.isArray(data.certifications) ? data.certifications : [],
        achievements: Array.isArray(data.achievements) ? data.achievements : [],
        onboardingCompleted: Boolean(data.onboardingCompleted),
      } as UserProfile;
      cacheToStorage(profile, refId);
      return profile;
    }

    return null;
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      return loadProfileFromStorage(refId);
    }
    console.error('Firestore profile read error:', error);
    return loadProfileFromStorage(refId);
  }
}

export async function saveProfile(profile: UserProfile, uid?: string): Promise<UserProfile> {
  const currentUser = auth.currentUser;
  const refId = uid ?? currentUser?.uid;
  if (!refId) {
    throw new Error('You must be signed in before saving your profile.');
  }

  const missingFields = profile.onboardingCompleted ? getMissingRequiredProfileFields(profile) : [];
  if (missingFields.length > 0) {
    throw new Error(`Complete required profile fields first: ${missingFields.join(', ')}.`);
  }

  const nextProfile: UserProfile = {
    ...profile,
    uid: refId,
    email: currentUser?.email ?? profile.email,
    profileCompletion: getProfileCompletion(profile),
    updatedAt: new Date().toISOString(),
  };

  const docRef = doc(db, 'profiles', refId);
  await setDoc(docRef, nextProfile, { merge: true });

  cacheToStorage(nextProfile, refId);
  return nextProfile;
}
