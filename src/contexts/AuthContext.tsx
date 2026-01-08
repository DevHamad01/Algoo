import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/config/firebase";
import { authService } from "@/services/authService";
import { AuthContextType, User } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to use auth context
 * Must be used within AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * AuthProvider Component
 * Manages authentication state and provides auth methods to the app
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                // Map Firebase user to our User type
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    emailVerified: firebaseUser.emailVerified,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    /**
     * Sign up a new user
     */
    const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
        try {
            await authService.signUp(email, password, displayName);
            // User state will be updated automatically by onAuthStateChanged
        } catch (error) {
            throw error;
        }
    };

    /**
     * Sign in existing user
     */
    const signIn = async (email: string, password: string): Promise<void> => {
        try {
            await authService.signIn(email, password);
            // User state will be updated automatically by onAuthStateChanged
        } catch (error) {
            throw error;
        }
    };

    /**
     * Sign out current user
     */
    const signOut = async (): Promise<void> => {
        try {
            await authService.signOut();
            // User state will be updated automatically by onAuthStateChanged
        } catch (error) {
            throw error;
        }
    };

    /**
     * Send password reset email
     */
    const resetPassword = async (email: string): Promise<void> => {
        try {
            await authService.resetPassword(email);
        } catch (error) {
            throw error;
        }
    };

    /**
     * Update user profile
     */
    const updateUserProfile = async (data: { displayName?: string; photoURL?: string }): Promise<void> => {
        try {
            await authService.updateUserProfile(data);
            // Manually update local state since profile updates don't trigger onAuthStateChanged
            if (user) {
                setUser({
                    ...user,
                    displayName: data.displayName ?? user.displayName,
                    photoURL: data.photoURL ?? user.photoURL,
                });
            }
        } catch (error) {
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateUserProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
