"use client";

import TaskHiveLoader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

interface AnalyticsStats {
  totalTask: number;
  completedTask: number;
  activeTask: number;
  totalProject: number;
  activeProject: number;
  archivedProject: number;
  totalFocusTime: string;
  pomodoroSession: number;
}

const Page = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get("analytics");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!stats)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <TaskHiveLoader />
      </div>
    );

  const cards = [
    { label: "Total Tasks", value: stats.totalTask },
    { label: "Completed Tasks", value: stats.completedTask },
    { label: "Active Tasks", value: stats.activeTask },
    { label: "Total Projects", value: stats.totalProject },
    { label: "Ongoing Projects", value: stats.activeProject },
    { label: "Archived Projects", value: stats.archivedProject },
    { label: "Total Focus Time", value: stats.totalFocusTime },
    { label: "Pomodoro Sessions", value: stats.pomodoroSession },
  ];

  return (
    <main className="p-12 space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Track your productivity and progress
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card
              className="hover:shadow-md transition-shadow duration-200"
              key={index}
            >
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
