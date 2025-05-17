
import React, { createContext, useContext, useState } from "react";

// Define types for user profile and auth context
interface UserProfile {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  skills?: string[];
  userType?: 'individual' | 'company';
}

interface AuthContextType {
  currentUser: any | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  isAuthenticated: false,
  updateUserProfile: async () => {},
});

// Mock user data for development
const mockUserProfile: UserProfile = {
  displayName: "John Doe",
  email: "john.doe@example.com",
  photoURL: "/placeholder.svg",
  uid: "1",
  bio: "Professional guitarist with 10 years of experience",
  location: "Los Angeles, CA",
  phoneNumber: "+1 (555) 123-4567",
  skills: ["Guitar", "Vocals", "Sound Engineering"],
  userType: "individual",
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(mockUserProfile);
  
  // Mock update profile function
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...data } : data);
      
      console.log("Profile updated:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };
  
  const value = {
    currentUser: { uid: mockUserProfile.uid },
    userProfile,
    isAuthenticated: true, // Always authenticated in this mock version
    updateUserProfile,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Default export
export default AuthProvider;
