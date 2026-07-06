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

export async function loadProfileFromApi(emailOrUid = ''): Promise<UserProfile | null> {
  if (typeof window === 'undefined') return null;

  // Don't attempt Firestore reads if user is not authenticated — avoids permission errors
  const currentUser = auth.currentUser;
  if (!currentUser && !emailOrUid) return null;

  try {
    const refId = currentUser?.uid || emailOrUid;
    if (!refId) return null;

    const docRef = doc(db, 'profiles', refId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Query by email if refId is an email and doc was not found by UID
      if (emailOrUid.includes('@')) {
        const docRefEmail = doc(db, 'profiles', emailOrUid);
        const docSnapEmail = await getDoc(docRefEmail);
        if (docSnapEmail.exists()) {
          const data = docSnapEmail.data();
          return {
            ...getDefaultProfile(emailOrUid),
            ...data,
            skills: Array.isArray(data.skills) ? data.skills : [],
            languages: Array.isArray(data.languages) ? data.languages : [],
            certifications: Array.isArray(data.certifications) ? data.certifications : [],
            achievements: Array.isArray(data.achievements) ? data.achievements : [],
            onboardingCompleted: Boolean(data.onboardingCompleted),
          } as UserProfile;
        }
      }
      return null;
    }

    const data = docSnap.data();
    return {
      ...getDefaultProfile(data.email ?? currentUser?.email ?? ''),
      ...data,
      skills: Array.isArray(data.skills) ? data.skills : [],
      languages: Array.isArray(data.languages) ? data.languages : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      achievements: Array.isArray(data.achievements) ? data.achievements : [],
      onboardingCompleted: Boolean(data.onboardingCompleted),
    } as UserProfile;
  } catch (error: any) {
    // Suppress expected permissions errors when user is unauthenticated
    if (error?.code !== 'permission-denied') {
      console.error('Error loading profile from Firestore:', error);
    }
    return null;
  }
}

export async function saveProfile(profile: UserProfile) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  try {
    const refId = auth.currentUser?.uid || profile.email;
    if (!refId) return profile;

    const docRef = doc(db, 'profiles', refId);
    await setDoc(docRef, {
      ...profile,
      uid: auth.currentUser?.uid || null,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (_error) {
    // Firestore save is best-effort — localStorage is the primary store.
    // Errors here are expected if Firestore rules aren't deployed yet.
  }

  return profile;
}
