
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

type UserType = User | null;

interface AuthContextType {
  currentUser: UserType;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<UserType>;
  register: (email: string, password: string, displayName: string, userType: string) => Promise<UserType>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  loading: boolean;
}

interface UserProfile {
  displayName: string;
  email: string;
  userType: string;
  photoURL?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  phoneNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Success",
        description: "You have been logged in successfully",
        variant: "default",
      });
      return result.user;
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    }
  }

  async function register(email: string, password: string, displayName: string, userType: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile
      await updateProfile(result.user, {
        displayName: displayName
      });
      
      // Create a user profile
      const newProfile: UserProfile = {
        displayName,
        email,
        userType,
        photoURL: result.user.photoURL || "",
      };
      
      setUserProfile(newProfile);
      
      toast({
        title: "Success",
        description: "Your account has been created successfully",
        variant: "default",
      });
      
      return result.user;
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      toast({
        title: "Success",
        description: "You have been logged out successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    }
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Success",
        description: "Check your email for password reset instructions",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    }
  }

  async function updateUserProfile(data: Partial<UserProfile>) {
    try {
      if (!currentUser) throw new Error("No user is logged in");
      
      if (data.displayName) {
        await updateProfile(currentUser, {
          displayName: data.displayName
        });
      }
      
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: "Success",
        description: "Your profile has been updated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Create a user profile from auth data
        setUserProfile({
          displayName: user.displayName || "",
          email: user.email || "",
          userType: localStorage.getItem(`userType_${user.uid}`) || "individual",
          photoURL: user.photoURL || "",
        });
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
