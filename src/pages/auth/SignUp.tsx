import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const SignUp = () => {
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = (): boolean => {
        if (!formData.displayName || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            return false;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        if (!agreedToTerms) {
            toast.error("Please agree to the terms and conditions");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            await signUp(formData.email, formData.password, formData.displayName);
            toast.success("Account created successfully!");
            navigate("/dashboard", { replace: true });
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = (password: string): string => {
        if (password.length === 0) return "";
        if (password.length < 6) return "Weak";
        if (password.length < 10) return "Medium";
        return "Strong";
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground">Create Account</h1>
                    <p className="mt-2 text-muted-foreground">
                        Start your algorithm learning journey today
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="displayName">Full Name</Label>
                            <Input
                                id="displayName"
                                name="displayName"
                                type="text"
                                placeholder="John Doe"
                                value={formData.displayName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="h-12"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
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
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
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
                            {formData.password && (
                                <p className={`text-xs ${passwordStrength === "Strong" ? "text-green-600" :
                                        passwordStrength === "Medium" ? "text-yellow-600" :
                                            "text-red-600"
                                    }`}>
                                    Password strength: {passwordStrength}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="h-12"
                            />
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id="terms"
                            checked={agreedToTerms}
                            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                            disabled={loading}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the{" "}
                            <Link to="/terms" className="text-primary hover:underline">
                                Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                            </Link>
                        </label>
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
                                Creating account...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <UserPlus className="w-5 h-5" />
                                Create Account
                            </div>
                        )}
                    </Button>
                </form>

                {/* Sign In Link */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-semibold hover:underline">
                            Sign in
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

export default SignUp;
