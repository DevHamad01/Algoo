import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Get the page user was trying to access, or default to dashboard
    const from = (location.state as any)?.from?.pathname || "/dashboard";

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
            toast.success("Welcome back!");
            navigate(from, { replace: true });
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
                    <p className="mt-2 text-muted-foreground">
                        Sign in to continue your learning journey
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="h-12"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="h-12 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex items-center justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-primary hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 text-base bg-black hover:bg-black/90"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Signing in...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <LogIn className="w-5 h-5" />
                                Sign In
                            </div>
                        )}
                    </Button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
