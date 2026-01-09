import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const CalendarTab = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
                    <p className="text-muted-foreground">Manage your classes and events.</p>
                </div>
                <Button className="bg-black text-white hover:bg-gray-800">
                    <Plus className="h-4 w-4 mr-2" /> New Event
                </Button>
            </div>

            <Card className="flex-1 bg-white border-none shadow-sm">
                <CardContent className="p-6 h-full flex flex-col md:flex-row gap-6">
                    {/* Sidebar Calendar for quick calc */}
                    <div className="w-full md:w-auto flex-none border-r pr-6">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow-none"
                        />
                        <div className="mt-6 space-y-4">
                            <h3 className="font-semibold text-sm">Upcoming Events</h3>
                            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
                                <p className="text-xs font-bold text-red-600 mb-1">Physics Class</p>
                                <p className="text-[10px] text-gray-500">10:00 AM - 11:30 AM</p>
                            </div>
                            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
                                <p className="text-xs font-bold text-blue-600 mb-1">Math Tutorial</p>
                                <p className="text-[10px] text-gray-500">1:00 PM - 2:30 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area - Just a placeholder for a full day/week view if we had a complex calendar lib */}
                    <div className="flex-1 min-w-0 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">
                                {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </h3>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">Day</Button>
                                <Button variant="outline" size="sm">Week</Button>
                                <Button variant="outline" size="sm">Month</Button>
                            </div>
                        </div>

                        {/* Time Grid Mockup */}
                        <div className="relative border rounded-lg h-[600px] overflow-y-auto bg-gray-50/30">
                            {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
                                <div key={hour} className="flex border-b h-20 group hover:bg-gray-50 transition-colors">
                                    <div className="w-16 flex-none text-xs text-gray-400 p-2 text-right border-r">
                                        {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                                    </div>
                                    <div className="flex-1 relative p-1">
                                        {/* Mock Event */}
                                        {hour === 10 && date?.getDate() === new Date().getDate() && (
                                            <div className="absolute top-2 left-2 right-2 bottom-2 bg-red-100 border border-red-200 rounded p-2 text-red-700 text-xs shadow-sm">
                                                <strong>Physics Class</strong>
                                            </div>
                                        )}
                                        {hour === 14 && date?.getDate() === new Date().getDate() && (
                                            <div className="absolute top-2 left-2 right-2 bottom-2 bg-green-100 border border-green-200 rounded p-2 text-green-700 text-xs shadow-sm">
                                                <strong>Finance Discussions</strong>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
