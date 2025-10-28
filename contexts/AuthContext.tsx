import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Auth, onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, AuthError } from "firebase/auth"; // Import AuthError
import { auth } from "@/firebaseConfig";
import { Alert } from "react-native";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>; // Return true on success, false on failure
  register: (email: string, password: string) => Promise<boolean>; // Return true on success, false on failure
  logout: () => Promise<void>;
  authError: string | null;
  loadingAuthAction: boolean; // Add loading state specifically for login/register actions
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true); // For initial auth check
  const [loadingAuthAction, setLoadingAuthAction] = useState(false); // For login/register actions
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("[Auth] Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("[Auth] onAuthStateChanged triggered. User:", currentUser?.uid || null);
      setUser(currentUser);
      setInitialLoading(false);
    });
    return () => {
      console.log("[Auth] Cleaning up onAuthStateChanged listener.");
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    if (initialLoading) {
      console.log("[Auth] Initial auth state loading, skipping navigation logic.");
      return; // Don't redirect until auth state is known
    }

    const inAuthGroup = segments[0] === "(auth)";
    const isLoggedIn = !!user;
    console.log(`[Auth] Navigation check: isLoggedIn=${isLoggedIn}, inAuthGroup=${inAuthGroup}, segments=${segments.join('/')}`);


    if (isLoggedIn && inAuthGroup) {
      console.log("[Auth] User logged in, but in auth group. Redirecting to /");
      router.replace("/");
    } else if (!isLoggedIn && !inAuthGroup) {
      console.log("[Auth] User not logged in, not in auth group. Redirecting to /login");
      router.replace("/login");
    } else {
       console.log("[Auth] Navigation state is correct, no redirect needed.");
    }
  }, [user, segments, router, initialLoading]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthError(null);
    setLoadingAuthAction(true);
    console.log("[Auth] Attempting login...");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("[Auth] Login successful:", userCredential.user.uid);
      // Let onAuthStateChanged handle the state update and navigation effect
      return true;
    } catch (error: any) {
      const authError = error as AuthError; // Type cast for better error handling
      console.error("[Auth] Login Error Code:", authError.code);
      console.error("[Auth] Login Error Message:", authError.message);
      let friendlyMessage = "Failed to log in.";
      // Provide more specific feedback
      if (authError.code === 'auth/invalid-credential' || authError.code === 'auth/wrong-password' || authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-email') {
          friendlyMessage = "Invalid email or password.";
      } else if (authError.code === 'auth/too-many-requests') {
           friendlyMessage = "Too many login attempts. Please try again later.";
      }
      setAuthError(friendlyMessage);
      return false;
    } finally {
      setLoadingAuthAction(false);
      console.log("[Auth] Login attempt finished.");
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
     setAuthError(null);
     setLoadingAuthAction(true);
     console.log("[Auth] Attempting registration...");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("[Auth] Registration successful:", userCredential.user.uid);
      // Let onAuthStateChanged handle the state update and navigation effect
      return true;
    } catch (error: any) {
      const authError = error as AuthError;
      console.error("[Auth] Registration Error Code:", authError.code);
      console.error("[Auth] Registration Error Message:", authError.message);
       let friendlyMessage = "Failed to register.";
       if (authError.code === 'auth/email-already-in-use') {
           friendlyMessage = "This email address is already in use.";
       } else if (authError.code === 'auth/weak-password') {
           friendlyMessage = "Password should be at least 6 characters.";
       } else if (authError.code === 'auth/invalid-email') {
           friendlyMessage = "Please enter a valid email address.";
       }
      setAuthError(friendlyMessage);
      return false;
    } finally {
      setLoadingAuthAction(false);
      console.log("[Auth] Registration attempt finished.");
    }
  };


  const logout = async () => {
    setAuthError(null);
    console.log("[Auth] Attempting logout...");
    try {
      await signOut(auth);
      console.log("[Auth] Logout successful.");
      // Let onAuthStateChanged handle the state update and navigation effect
    } catch (error: any) {
       console.error("[Auth] Logout Error:", error);
       Alert.alert("Logout Failed", error.message || "Could not log out.");
    }
  };

  if (initialLoading) {
     console.log("[Auth] Initial load in progress...");
     return null; // Or your app's splash/loading screen
  }

  const authContextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    authError,
    loadingAuthAction // Expose loading state
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}