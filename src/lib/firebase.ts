import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import appletConfig from "../../firebase-applet-config.json";

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};

// Firebase configuration loaded directly from auto-provisioned firebase-applet-config.json
const firebaseConfig = {
  apiKey: appletConfig.apiKey || env.VITE_FIREBASE_API_KEY,
  authDomain: appletConfig.authDomain || env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: appletConfig.projectId || env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: appletConfig.storageBucket || env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: appletConfig.messagingSenderId || env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: appletConfig.appId || env.VITE_FIREBASE_APP_ID,
  measurementId: appletConfig.measurementId || env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = appletConfig.firestoreDatabaseId
  ? getFirestore(app, appletConfig.firestoreDatabaseId)
  : getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Analytics conditionally based on browser support
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Firebase Analytics initialization skipped:", err);
  });
}

