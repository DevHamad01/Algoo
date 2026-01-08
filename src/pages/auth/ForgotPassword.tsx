import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
    const { resetPassword } = useAuth();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        setLoading(true);
        try {
            await resetPassword(email);
            setEmailSent(true);
            toast.success("Password reset email sent!");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
                <div className="w-full max-w-md space-y-8 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-green-600" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-foreground">Check Your Email</h1>
                        <p className="text-muted-foreground">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Click the link in the email to reset your password. If you don't see it, check your spam folder.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <Link to="/login">
                            <Button className="w-full h-12 bg-black hover:bg-black/90">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Login
                            </Button>
                        </Link>

                        <button
                            onClick={() => setEmailSent(false)}
                            className="text-sm text-primary hover:underline"
                        >
                            Didn't receive the email? Try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground">Reset Password</h1>
                    <p className="mt-2 text-muted-foreground">
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 text-base bg-black hover:bg-black/90"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Send Reset Link
                            </div>
                        )}
                    </Button>
                </form>

                {/* Back to Login */}
                <div className="text-center">
                    <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" />
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
