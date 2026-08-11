import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInAnonymously,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

export interface UserProfileData {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  provider: string;
  createdAt?: string;
  updatedAt?: string;
  favoriteItems?: string[];
  orderCount?: number;
}

interface AuthContextType {
  user: User | null;
  userData: UserProfileData | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInAsGuest: (guestName?: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Helper to sync user profile to Firestore
  const syncUserProfile = async (currentUser: User, providerName: string, extraName?: string, extraPhone?: string) => {
    const displayName = extraName || currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'Waffle Fan');
    const phoneNumber = extraPhone || currentUser.phoneNumber || null;

    const profilePayload: UserProfileData = {
      uid: currentUser.uid,
      displayName,
      email: currentUser.email || null,
      phoneNumber,
      photoURL: currentUser.photoURL || null,
      provider: providerName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favoriteItems: [],
      orderCount: 0,
    };

    // Always populate local user state immediately
    setUserData(profilePayload);

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, profilePayload);
      } else {
        const existingData = userSnap.data() as UserProfileData;
        const mergedPayload = {
          ...existingData,
          displayName,
          email: currentUser.email || existingData.email,
          phoneNumber: phoneNumber || existingData.phoneNumber,
          photoURL: currentUser.photoURL || existingData.photoURL,
          updatedAt: new Date().toISOString(),
        };
        await updateDoc(userRef, mergedPayload);
        setUserData(mergedPayload);
      }
    } catch (err) {
      console.warn('Firestore sync optional warning (falling back to local profile):', err);
    }
  };

  useEffect(() => {
    // Check for redirect result from Google sign-in
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        await syncUserProfile(result.user, 'google.com');
      }
    }).catch((err) => {
      console.warn('Google redirect result error:', err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data() as UserProfileData;
            setUserData(data);
            // Ensure email and displayName are up to date in Firestore
            await setDoc(userRef, {
              displayName: currentUser.displayName || data.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'Waffle Customer'),
              email: currentUser.email || data.email,
              photoURL: currentUser.photoURL || data.photoURL,
              updatedAt: new Date().toISOString(),
            }, { merge: true });
          } else {
            await syncUserProfile(currentUser, currentUser.providerData[0]?.providerId || 'google.com');
          }
        } catch (err) {
          console.warn('Failed fetching/syncing profile doc:', err);
          // Fallback sync
          await syncUserProfile(currentUser, currentUser.providerData[0]?.providerId || 'google.com');
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserProfile(result.user, 'google.com');
        setIsAuthModalOpen(false);
      }
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
        console.info('Google Sign-In popup closed by user.');
        throw error;
      }
      // If popup is blocked or fails on mobile/embedded browsers, fallback to redirect
      if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/operation-not-allowed' || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          console.error('Redirect sign in error:', redirectErr);
          throw redirectErr;
        }
      }
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      if (result.user) {
        await syncUserProfile(result.user, 'password');
        setIsAuthModalOpen(false);
      }
    } catch (error) {
      console.error('Email Sign-In Error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      if (result.user) {
        await updateProfile(result.user, { displayName: name });
        await syncUserProfile(result.user, 'password', name);
        setIsAuthModalOpen(false);
      }
    } catch (error) {
      console.error('Email Sign-Up Error:', error);
      throw error;
    }
  };

  const signInAsGuest = async (guestName?: string) => {
    try {
      const result = await signInAnonymously(auth);
      if (result.user) {
        const name = guestName || `Mobile Guest ${Math.floor(1000 + Math.random() * 9000)}`;
        await updateProfile(result.user, { displayName: name });
        await syncUserProfile(result.user, 'anonymous', name);
        setIsAuthModalOpen(false);
      }
    } catch (error) {
      console.error('Guest Sign-In Error:', error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Sign-Out Error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInAsGuest,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
