import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/firebase/config';
import {
  resetPassword,
  signInWithEmail,
  signInWithGoogle,
  signOut,
  signUpWithEmail,
  confirmResetPassword,
  handleGoogleRedirectResult,
} from '@/firebase/auth';
import {
  loadProfileFromApi,
  loadProfileFromStorage,
  type UserProfile,
} from '@/lib/profile';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  refreshProfile: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  reset: (email: string) => Promise<void>;
  resetPasswordWithCode: (oobCode: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  /** Load / reload profile from Firestore (source of truth) */
  const fetchProfile = async (firebaseUser: User) => {
    setProfileLoading(true);
    try {
      const firestoreProfile = await loadProfileFromApi(firebaseUser.uid);
      setProfile(firestoreProfile ?? loadProfileFromStorage());
    } catch {
      setProfile(loadProfileFromStorage());
    } finally {
      setProfileLoading(false);
    }
  };

  /** Manually re-fetch profile (call after saving changes) */
  const refreshProfile = async () => {
    if (user) await fetchProfile(user);
  };

  useEffect(() => {
    // Handle Google redirect sign-in result (fires after redirect back from Google)
    handleGoogleRedirectResult().catch(() => undefined);

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        await fetchProfile(nextUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      profileLoading,
      refreshProfile,
      signIn: async (email, password) => {
        await signInWithEmail(email, password);
      },
      signUp: async (email, password) => {
        await signUpWithEmail(email, password);
      },
      signInGoogle: async () => {
        await signInWithGoogle();
      },
      reset: async (email) => {
        await resetPassword(email);
      },
      resetPasswordWithCode: async (oobCode, newPassword) => {
        await confirmResetPassword(oobCode, newPassword);
      },
      logout: async () => {
        await signOut();
        setProfile(null);
        // Clear localStorage cache on logout
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('mb-profile');
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, profileLoading, user, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
