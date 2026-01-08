import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 * Preserves intended destination for post-login redirect
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated, preserving intended destination
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render protected content
    return <>{children}</>;
};
