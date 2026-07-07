import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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

/** Translate Firebase Auth error codes into human-readable messages */
function humanizeAuthError(err: any): Error {
  const code: string = err?.code ?? '';
  const map: Record<string, string> = {
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/user-not-found': 'No account found with this email. Please register first.',
    'auth/wrong-password': 'Incorrect password. Please try again or reset your password.',
    'auth/invalid-login-credentials': 'Invalid email or password. Please check your credentials.',
    'auth/invalid-credential': 'Invalid email or password. Please check your credentials.',
    'auth/too-many-requests': 'Too many failed attempts. Please wait a few minutes and try again.',
    'auth/email-already-in-use': 'An account with this email already exists. Please sign in instead.',
    'auth/weak-password': 'Password must be at least 6 characters long.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/popup-blocked': 'Popup was blocked by your browser. Please allow popups and try again.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/cancelled-popup-request': 'Only one popup can be open at a time.',
    'auth/unauthorized-domain': 'This domain is not authorized for Firebase Authentication. Please contact support.',
    'auth/operation-not-allowed': 'Email/password sign-in is not enabled. Please contact support.',
    'auth/requires-recent-login': 'Please sign out and sign in again to perform this action.',
  };
  const message = map[code] ?? err?.message ?? 'An unexpected error occurred. Please try again.';
  return new Error(message);
}

export async function signInWithEmail(email: string, password: string) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please contact support.');
  }
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw humanizeAuthError(err);
  }
}

export async function signUpWithEmail(email: string, password: string) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please contact support.');
  }
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential;
  } catch (err) {
    throw humanizeAuthError(err);
  }
}

export async function signInWithGoogle() {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please contact support.');
  }
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (err: any) {
    if (
      err.code === 'auth/popup-blocked' ||
      err.code === 'auth/popup-closed-by-user' ||
      err.code === 'auth/cancelled-popup-request'
    ) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw humanizeAuthError(err);
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
    throw new Error('Firebase is not configured. Please contact support.');
  }
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw humanizeAuthError(err);
  }
}

export async function confirmResetPassword(oobCode: string, newPassword: string) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Please contact support.');
  }
  try {
    return await confirmPasswordReset(auth, oobCode, newPassword);
  } catch (err) {
    throw humanizeAuthError(err);
  }
}

export async function signOut() {
  return firebaseSignOut(auth);
}
