import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const CalendarTab = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    // Load events from localStorage
    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('calendar_events');
        if (saved) {
            try { return JSON.parse(saved) as any[]; } catch (e) { console.error(e); }
        }
        return [];
    });

    // Persist events
    useEffect(() => {
        localStorage.setItem('calendar_events', JSON.stringify(events));
    }, [events]);

    // Simple prompt‑based add event
    const addEvent = () => {
        const title = window.prompt('Event title');
        if (!title) return;
        const description = window.prompt('Event description') ?? '';
        const time = window.prompt('Time (e.g., 10:00)') ?? '';
        const newEvent = {
            id: Date.now(),
            title,
            description,
            time,
        };
        setEvents(prev => [...prev, newEvent]);
    };

    // Delete an event
    const deleteEvent = (id: number) => {
        setEvents(prev => prev.filter(ev => ev.id !== id));
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
                    <p className="text-muted-foreground">Manage your classes and events.</p>
                </div>
                <Button onClick={addEvent} className="bg-black text-white hover:bg-gray-800">
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
                            {events.map(ev => (
                                <div key={ev.id} className="p-3 bg-gray-50 border-l-4 border-gray-500 rounded-r-md flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-gray-600 mb-1">{ev.title}</p>
                                        <p className="text-[10px] text-gray-500">{ev.time}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => deleteEvent(ev.id)}>
                                        ✕
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area - placeholder day view */}
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

                        <div className="relative border rounded-lg h-[600px] overflow-y-auto bg-gray-50/30">
                            {[9,10,11,12,13,14,15,16,17].map((hour) => (
                                <div key={hour} className="flex border-b h-20 group hover:bg-gray-50 transition-colors">
                                    <div className="w-16 flex-none text-xs text-gray-400 p-2 text-right border-r">
                                        {hour > 12 ? `${hour-12} PM` : `${hour} AM`}
                                    </div>
                                    <div className="flex-1 relative p-1">
                                        {/* Render any events that match this hour */}
                                        {events.filter(ev => {
                                            const [h] = ev.time.split(':');
                                            return Number(h) === hour;
                                        }).map(ev => (
                                            <div key={ev.id} className="absolute top-2 left-2 right-2 bottom-2 bg-blue-100 border border-blue-200 rounded p-2 text-blue-700 text-xs shadow-sm">
                                                <strong>{ev.title}</strong>
                                            </div>
                                        ))}
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
