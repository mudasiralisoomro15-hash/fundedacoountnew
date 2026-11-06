// ─────────────────────────────────────────────────────────────
// AUTH STUBS — UI works today, backend comes later.
// Swap the bodies below with Firebase Auth. Components only depend on
// the function signatures + AuthResult, so no UI changes are needed.
//
// Setup:   npm i firebase
// Env:     see .env.example (NEXT_PUBLIC_FIREBASE_*)
//
// lib/firebase.ts (create this file):
//   import { initializeApp, getApps } from "firebase/app";
//   import { getAuth } from "firebase/auth";
//   const app = getApps()[0] ?? initializeApp({
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   });
//   export const auth = getAuth(app);
// ─────────────────────────────────────────────────────────────

export interface AuthResult {
  ok: boolean;
  /** true while the function is still a placeholder */
  stub: boolean;
  message: string;
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function signInWithGoogle(): Promise<AuthResult> {
  // TODO(firebase):
  //   import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  //   const cred = await signInWithPopup(auth, new GoogleAuthProvider());
  //   return { ok: true, stub: false, message: `Welcome ${cred.user.displayName}` };
  await wait(700);
  return {
    ok: true,
    stub: true,
    message: "Google sign-in is a UI stub. Connect Firebase Auth in lib/auth.ts.",
  };
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  // TODO(firebase):
  //   import { signInWithEmailAndPassword } from "firebase/auth";
  //   await signInWithEmailAndPassword(auth, email, password);
  void email;
  void password;
  await wait(700);
  return {
    ok: true,
    stub: true,
    message: "Sign-in is a UI stub. Connect Firebase Auth in lib/auth.ts.",
  };
}

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  // TODO(firebase):
  //   import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  //   const cred = await createUserWithEmailAndPassword(auth, email, password);
  //   await updateProfile(cred.user, { displayName: name });
  void name;
  void email;
  void password;
  await wait(900);
  return {
    ok: true,
    stub: true,
    message: "Account creation is a UI stub. Connect Firebase Auth in lib/auth.ts.",
  };
}
