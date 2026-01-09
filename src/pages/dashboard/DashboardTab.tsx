import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, Clock, CheckCircle2, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";

export const DashboardTab = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const tasks = [
    {
      id: 1,
      title: "Complete Marketing Presentation",
      description: "Update slides with your team members",
      time: "10 PM",
      status: "completed",
      priority: "high",
    },
    {
      id: 2,
      title: "Finance Discussions",
      description: "Prepare the annual income statement",
      time: "2 PM",
      status: "submitted",
      priority: "medium",
    },
    {
      id: 3,
      title: "ERP in Businesses",
      description: "Write a report on how erp leads to high efficiency",
      time: "3:30 PM",
      status: "incomplete",
      priority: "low",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GPA Card */}
        <Card className="bg-gray-100/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-5xl font-bold">4.7</div>
              <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                High
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Performance is up <span className="text-black font-semibold">4%</span> since last semester.
            </p>
          </CardContent>
        </Card>

        {/* Progress Rate Card */}
        <Card className="bg-gray-100/50 border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Progress Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex-none">
                {/* Simple SVG Circle Progress for cleanliness */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - 0.96)}
                    className="text-green-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                  96%
                </div>
              </div>
              <div>
                 <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white w-fit mb-2">
                  +12%
                </div>
                <p className="text-xs text-muted-foreground">
                  Score increased by 12% since last semester.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance / Calendar Widget */}
        <Card className="bg-white border-none shadow-sm h-full row-span-2 md:col-span-1 lg:col-span-1">
          <CardHeader className="pb-0">
             <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-lg font-medium">Calendar</CardTitle>
                 <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground">Today</span>
                    <span className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                 </div>
             </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm w-full flex justify-center"
            />
          </CardContent>
        </Card>

        {/* Tasks Section */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Tasks</CardTitle>
            <div className="flex gap-2">
                 <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200">
                    <Plus className="h-4 w-4" />
                 </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200">
                    <MoreHorizontal className="h-4 w-4" />
                 </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
             {/* Filter Tabs Mock */}
             <div className="flex gap-2 mb-6">
                <div className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">All tasks</div>
                <div className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium">To Do</div>
                <div className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium">Completed</div>
                <div className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-sm font-medium">In Progress</div>
             </div>

             <Button variant="outline" className="w-full justify-start border-dashed h-14 text-muted-foreground items-center gap-2">
                <Plus className="h-4 w-4" /> Add New Tasks
             </Button>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start p-4 rounded-xl border-l-[6px] ${
                    task.status === "completed"
                      ? "bg-green-50/50 border-green-500"
                      : task.status === "submitted"
                      ? "bg-blue-50/50 border-blue-500"
                      : "bg-gray-50/50 border-yellow-500"
                  }`}
                >
                    <div className="flex flex-col items-center justify-center mr-4 pt-1">
                         <span className="text-xs font-bold text-gray-400">{task.time.split(' ')[0]}</span>
                         <span className="text-[10px] text-gray-400 uppercase">{task.time.split(' ')[1]}</span>
                    </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                         <div className={`px-3 py-0.5 rounded-full text-[10px] uppercase font-bold text-white ${
                             task.status === "completed" ? "bg-black" : task.status === "submitted" ? "bg-black" : "bg-black"
                         }`}>
                             {task.status}
                         </div>
                         <Progress value={task.status === 'completed' ? 100 : task.status === 'submitted' ? 70 : 30} className="h-2 w-24" />
                         <div className="flex -space-x-2">
                             <Avatar className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-[10px]">MJ</AvatarFallback>
                             </Avatar>
                             <Avatar className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-[10px]">+2</AvatarFallback>
                             </Avatar>
                         </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                     <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
