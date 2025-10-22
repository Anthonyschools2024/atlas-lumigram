import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// AuthProvider component to wrap the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (isLoggedIn && inAuthGroup) {
      // Redirect to the home screen if the user is logged in
      // and trying to access an auth screen.
      router.replace("/");
    } else if (!isLoggedIn && !inAuthGroup) {
      // Redirect to the login screen if the user is not logged in
      // and trying to access a protected screen.
      router.replace("/login");
    }
  }, [isLoggedIn, segments, router]);

  const authContextValue: AuthContextType = {
    isLoggedIn,
    login: () => {
      setLoggedIn(true);
    },
    logout: () => {
      setLoggedIn(false);
    },
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}