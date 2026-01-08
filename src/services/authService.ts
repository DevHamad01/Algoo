import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    updateProfile,
    User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/config/firebase";

/**
 * Auth Service Layer
 * Centralizes all Firebase authentication operations
 * Provides clean error handling and abstraction
 */

class AuthService {
    /**
     * Register a new user with email and password
     */
    async signUp(email: string, password: string, displayName: string): Promise<FirebaseUser> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile with display name
            if (userCredential.user) {
                await updateProfile(userCredential.user, { displayName });
            }

            return userCredential.user;
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Sign in existing user with email and password
     */
    async signIn(email: string, password: string): Promise<FirebaseUser> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Sign out current user
     */
    async signOut(): Promise<void> {
        try {
            await firebaseSignOut(auth);
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Send password reset email
     */
    async resetPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Update user profile information
     */
    async updateUserProfile(data: { displayName?: string; photoURL?: string }): Promise<void> {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("No user is currently signed in");
            }
            await updateProfile(user, data);
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    /**
     * Get current user
     */
    getCurrentUser(): FirebaseUser | null {
        return auth.currentUser;
    }

    /**
     * Handle Firebase auth errors and return user-friendly messages
     */
    private handleAuthError(error: any): Error {
        let message = "An error occurred. Please try again.";

        switch (error.code) {
            case "auth/email-already-in-use":
                message = "This email is already registered. Please sign in instead.";
                break;
            case "auth/invalid-email":
                message = "Invalid email address.";
                break;
            case "auth/operation-not-allowed":
                message = "Email/password accounts are not enabled.";
                break;
            case "auth/weak-password":
                message = "Password should be at least 6 characters.";
                break;
            case "auth/user-disabled":
                message = "This account has been disabled.";
                break;
            case "auth/user-not-found":
                message = "No account found with this email.";
                break;
            case "auth/wrong-password":
                message = "Incorrect password.";
                break;
            case "auth/invalid-credential":
                message = "Invalid email or password.";
                break;
            case "auth/too-many-requests":
                message = "Too many failed attempts. Please try again later.";
                break;
            case "auth/network-request-failed":
                message = "Network error. Please check your connection.";
                break;
            default:
                message = error.message || message;
        }

        return new Error(message);
    }
}

export const authService = new AuthService();
