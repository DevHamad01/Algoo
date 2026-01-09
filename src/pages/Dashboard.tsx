import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTab } from "./dashboard/DashboardTab";
import { UserTab } from "./dashboard/UserTab";
import { CalendarTab } from "./dashboard/CalendarTab";
import { LayoutDashboard, User, CalendarDays } from "lucide-react";

/**
 * Dashboard Page - Tabbed Interface
 * Replaces the old visualizer dashboard.
 */
const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Portal</h1>
                        <p className="text-muted-foreground mt-1">Welcome back to your dashboard.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Academic Year 2025-2026</span>
                    </div>
                </div>

                <Tabs defaultValue="dashboard" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="dashboard" className="gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger value="user" className="gap-2">
                            <User className="h-4 w-4" />
                            User
                        </TabsTrigger>
                        <TabsTrigger value="calendar" className="gap-2">
                            <CalendarDays className="h-4 w-4" />
                            Calendar
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard" className="space-y-4 animate-in fade-in-50 duration-500">
                        <DashboardTab />
                    </TabsContent>

                    <TabsContent value="user" className="space-y-4 animate-in fade-in-50 duration-500">
                        <UserTab />
                    </TabsContent>

                    <TabsContent value="calendar" className="space-y-4 animate-in fade-in-50 duration-500 h-[calc(100vh-250px)]">
                        <CalendarTab />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
