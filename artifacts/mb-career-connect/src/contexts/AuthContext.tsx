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

interface AuthContextValue {
  user: User | null;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle Google redirect sign-in result (fires after redirect back from Google)
    handleGoogleRedirectResult().catch(() => undefined);

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
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
      },
    }),
    [loading, user],
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
