import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Shield, Smartphone } from "lucide-react";

export const UserTab = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto py-8">
            <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Header with Avatar */}
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-gray-100">
                            <AvatarFallback className="text-2xl font-bold bg-black text-white">
                                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user?.displayName || "Student User"}</h2>
                            <p className="text-gray-500">Computer Science Student</p>
                        </div>
                        <div className="ml-auto">
                            <Button className="bg-black text-white hover:bg-gray-800">Edit Profile</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded-full">
                                        <User className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Full Name</p>
                                        <p className="font-medium">{user?.displayName || "Student User"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded-full">
                                        <Mail className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email Address</p>
                                        <p className="font-medium">{user?.email || "student@university.edu"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded-full">
                                        <Smartphone className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <p className="font-medium">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Account Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded-full">
                                        <Shield className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Security</p>
                                        <Button variant="link" className="p-0 h-auto text-black font-semibold">Change Password</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
