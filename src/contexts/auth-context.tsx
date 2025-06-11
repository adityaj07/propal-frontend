"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const hashedInput = await hashPassword(password);
  return hashedInput === hashedPassword;
};

interface User {
  username: string;
  email: string;
  password: string;
  phone?: string;
}

interface UserWithoutPassword {
  username: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: UserWithoutPassword | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: User) => Promise<boolean>;
  logout: () => void;
  logoutWithConfirmation: () => Promise<boolean>;
  updateUser: (userData: UserWithoutPassword) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const authUser = localStorage.getItem("authUser");
        if (authUser) {
          setUser(JSON.parse(authUser));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("authUser");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Handle empty users array
      if (users.length === 0) {
        toast.error("No accounts found. Please sign up first.");
        return false;
      }

      // Find user by email first
      const foundUser = users.find((u: User) => u.email === email);

      if (foundUser) {
        // Verify password using hash comparison
        const isPasswordValid = await verifyPassword(
          password,
          foundUser.password
        );

        if (isPasswordValid) {
          // Don't store password in auth state
          const { ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword as UserWithoutPassword);
          localStorage.setItem("authUser", JSON.stringify(userWithoutPassword));
          toast.success("Login successful! Welcome back.");
          return true;
        }
      }

      toast.error("Invalid email or password. Please try again.");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
      return false;
    }
  };

  const signup = async (userData: User): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if user already exists
      const existingUser = users.find((u: User) => u.email === userData.email);
      if (existingUser) {
        toast.error("An account with this email already exists.");
        return false;
      }

      // Hash the password before storing
      const hashedPassword = await hashPassword(userData.password);
      const userWithHashedPassword = {
        ...userData,
        password: hashedPassword,
      };

      // Add new user to users array
      users.push(userWithHashedPassword);
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Account created successfully! Please login to continue.");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup. Please try again.");
      return false;
    }
  };

  const updateUser = (userData: UserWithoutPassword) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    toast.success("Logged out successfully. See you next time!");
    router.push("/login");
  };

  const logoutWithConfirmation = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const confirmed = window.confirm(
        "Are you sure you want to logout? You'll need to login again to access your account."
      );

      if (confirmed) {
        logout();
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        logoutWithConfirmation,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
