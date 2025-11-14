"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, TrendingUp, Award, Lightbulb, Code, FileText, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  const [selectedCourse, setSelectedCourse] = useState("Data Structures & Algorithms");

  // Mock data - will be replaced with real data from Supabase
  const courses = [
    { id: 1, name: "Data Structures & Algorithms", progress: 65 },
    { id: 2, name: "Introduction to Python", progress: 85 },
    { id: 3, name: "Web Development", progress: 40 },
  ];

  const studentFeatures = [
    {
      icon: MessageSquare,
      title: "Course Material Chatbot",
      description: "Ask questions about course material and get contextual, socratic-guided answers.",
      href: "/student/chatbot",
      status: "Available",
      color: "bg-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Learning Trajectories",
      description: "Visual skill trees showing your progress through topics with prerequisite tracking.",
      href: "/student/trajectories",
      status: "Available",
      color: "bg-green-500",
    },
    {
      icon: Award,
      title: "Practice & Assessment",
      description: "Adaptive quizzes with progressive difficulty and instant feedback.",
      href: "/student/practice",
      status: "Available",
      color: "bg-purple-500",
    },
    {
      icon: Lightbulb,
      title: "Motivation & Context",
      description: "Discover why topics matter with real-world applications and historical context.",
      href: "/student/motivation",
      status: "Available",
      color: "bg-yellow-500",
    },
    {
      icon: Code,
      title: "Technical Support",
      description: "Get help with installations, debugging, and assignment submissions.",
      href: "/student/support",
      status: "Available",
      color: "bg-red-500",
    },
    {
      icon: FileText,
      title: "Additional Resources",
      description: "Curated papers, videos, and tutorials for deeper learning.",
      href: "/student/resources",
      status: "Available",
      color: "bg-indigo-500",
    },
  ];

  const recentActivity = [
    { type: "quiz", topic: "Binary Trees", score: 85, date: "2 hours ago" },
    { type: "chat", topic: "Graph Algorithms", messages: 12, date: "Yesterday" },
    { type: "practice", topic: "Sorting Algorithms", completed: true, date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span className="font-bold text-xl">CourseLLM</span>
              </Link>
              <Badge variant="outline">Student View</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, Alex!</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Course Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className={`cursor-pointer transition-all ${
                  selectedCourse === course.name
                    ? "ring-2 ring-primary"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedCourse(course.name)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <CardDescription>Progress: {course.progress}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Course Context */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Current Course:</h3>
          <p className="text-2xl font-bold text-primary">{selectedCourse}</p>
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Learning Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-lg ${feature.color} bg-opacity-10`}>
                          <Icon className={`h-6 w-6 ${feature.color.replace('bg-', 'text-')}`} />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {feature.status}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-semibold">{activity.topic}</span>
                        <span className="text-sm text-muted-foreground">
                          {activity.type === "quiz" && `Score: ${activity.score}%`}
                          {activity.type === "chat" && `${activity.messages} messages`}
                          {activity.type === "practice" && "Completed"}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
