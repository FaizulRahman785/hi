import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  confirmPasswordReset,
} from 'firebase/auth';

import { auth, isFirebaseConfigured } from './config';

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithEmail(email: string, password: string) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Set the VITE_FIREBASE_* environment variables.');
  }

  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email: string, password: string) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Set the VITE_FIREBASE_* environment variables.');
  }

  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (credential.user) {
    await sendEmailVerification(credential.user);
  }
  return credential;
}

export async function signInWithGoogle() {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Set the VITE_FIREBASE_* environment variables.');
  }

  try {
    // Try popup first (works in most browsers)
    return await signInWithPopup(auth, googleProvider);
  } catch (err: any) {
    // Fallback to redirect for popup-blocked or cross-origin scenarios
    if (
      err.code === 'auth/popup-blocked' ||
      err.code === 'auth/popup-closed-by-user' ||
      err.code === 'auth/cancelled-popup-request'
    ) {
      await signInWithRedirect(auth, googleProvider);
      return null; // redirect will reload the page
    }
    throw err;
  }
}

export async function handleGoogleRedirectResult() {
  if (!isFirebaseConfigured) return null;
  try {
    return await getRedirectResult(auth);
  } catch {
    return null;
  }
}

export async function resetPassword(email: string) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Set the VITE_FIREBASE_* environment variables.');
  }

  return sendPasswordResetEmail(auth, email);
}

export async function confirmResetPassword(oobCode: string, newPassword: string) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Set the VITE_FIREBASE_* environment variables.');
  }

  return confirmPasswordReset(auth, oobCode, newPassword);
}

export async function signOut() {
  return firebaseSignOut(auth);
}
