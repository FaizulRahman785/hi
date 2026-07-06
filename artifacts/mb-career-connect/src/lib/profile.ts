import { auth, db } from '@/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
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
  languages: string[];
  certifications: string[];
  achievements: string[];
  onboardingCompleted: boolean;
  profileCompletion: number;
  updatedAt: string;
}

const STORAGE_KEY = 'mb-profile';

export function getDefaultProfile(email = ''): UserProfile {
  return {
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
  const fields = [
    profile.fullName,
    profile.phone,
    profile.city,
    profile.college,
    profile.degree,
    profile.graduationYear,
    profile.semester,
    profile.cgpa,
    profile.currentStatus,
    profile.skills.length > 0 ? 'skills' : '',
    profile.bio,
    profile.resumeUrl,
  ];

  const filled = fields.filter(Boolean).length;
  return Math.min(100, Math.round((filled / fields.length) * 100));
}

/** Cache helper — localStorage is read-only secondary source */
function cacheToStorage(profile: UserProfile) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  } catch {
    // Storage quota exceeded — ignore
  }
}

/** Fast read from localStorage cache (used only as offline fallback) */
export function loadProfileFromStorage(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
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

/**
 * PRIMARY READ — loads profile from Firestore (source of truth).
 * Falls back to localStorage if Firestore is unreachable.
 * Pass the user's UID for authenticated reads.
 */
export async function loadProfileFromApi(uidOrEmail = ''): Promise<UserProfile | null> {
  if (typeof window === 'undefined') return null;

  const currentUser = auth.currentUser;
  const refId = currentUser?.uid || uidOrEmail;
  if (!refId) return null;

  // Must be authenticated for Firestore reads
  if (!currentUser) return loadProfileFromStorage();

  try {
    // Primary lookup by UID
    const docRef = doc(db, 'profiles', refId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const profile: UserProfile = {
        ...getDefaultProfile(data.email ?? currentUser.email ?? ''),
        ...data,
        skills: Array.isArray(data.skills) ? data.skills : [],
        languages: Array.isArray(data.languages) ? data.languages : [],
        certifications: Array.isArray(data.certifications) ? data.certifications : [],
        achievements: Array.isArray(data.achievements) ? data.achievements : [],
        onboardingCompleted: Boolean(data.onboardingCompleted),
      } as UserProfile;
      // Update local cache
      cacheToStorage(profile);
      return profile;
    }

    // Fallback: try email-keyed doc (legacy)
    if (currentUser.email) {
      const emailDocRef = doc(db, 'profiles', currentUser.email);
      const emailDocSnap = await getDoc(emailDocRef);
      if (emailDocSnap.exists()) {
        const data = emailDocSnap.data();
        const profile: UserProfile = {
          ...getDefaultProfile(currentUser.email),
          ...data,
          skills: Array.isArray(data.skills) ? data.skills : [],
          languages: Array.isArray(data.languages) ? data.languages : [],
          certifications: Array.isArray(data.certifications) ? data.certifications : [],
          achievements: Array.isArray(data.achievements) ? data.achievements : [],
          onboardingCompleted: Boolean(data.onboardingCompleted),
        } as UserProfile;
        cacheToStorage(profile);
        return profile;
      }
    }

    return null; // No profile yet (new user)
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      // Firestore rules not deployed yet — fall back to localStorage cache silently
      return loadProfileFromStorage();
    }
    console.error('Firestore profile read error:', error);
    return loadProfileFromStorage();
  }
}

/**
 * PRIMARY WRITE — saves profile to Firestore (source of truth).
 * Also writes to localStorage cache.
 * Throws if Firestore write fails (caller should handle / show error).
 */
export async function saveProfile(profile: UserProfile): Promise<UserProfile> {
  // Always update localStorage cache immediately
  cacheToStorage(profile);

  const currentUser = auth.currentUser;
  const refId = currentUser?.uid || profile.email;
  if (!refId) return profile;

  const docRef = doc(db, 'profiles', refId);
  await setDoc(
    docRef,
    {
      ...profile,
      uid: currentUser?.uid ?? null,
      email: currentUser?.email ?? profile.email,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );

  return profile;
}
