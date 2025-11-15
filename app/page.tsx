import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { BookOpen, Users, Award } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5">
          <div className="flex items-center gap-2 font-bold text-lg">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>CourseLLM</span>
          </div>
          <ThemeSwitcher />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-5 py-20">
        <div className="w-full max-w-4xl space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Welcome to CourseLLM
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              AI-enhanced learning grounded in your course context. Select your role to get started.
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid md:grid-cols-2 gap-8 pt-12">
            {/* Student Card */}
            <Link
              href="/student"
              className="p-8 rounded-lg border-2 border-foreground/20 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">I'm a Student</h2>
                <p className="text-foreground/70">
                  Access your learning tools, chatbot, practice exercises, and progress tracking.
                </p>
                <div className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                  Enter as Student
                </div>
              </div>
            </Link>

            {/* Teacher Card */}
            <Link
              href="/teacher"
              className="p-8 rounded-lg border-2 border-foreground/20 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">I'm a Teacher</h2>
                <p className="text-foreground/70">
                  Manage your course, track student progress, validate assignments, and assist with grading.
                </p>
                <div className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                  Enter as Teacher
                </div>
              </div>
            </Link>
          </div>

          {/* Features Preview */}
          <div className="pt-12 border-t border-t-foreground/10">
            <h3 className="text-2xl font-bold mb-8">What You'll Get</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="font-semibold">🎯 Personalized Learning</p>
                <p className="text-sm text-foreground/70">AI-powered assistance tailored to your needs</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">📊 Progress Tracking</p>
                <p className="text-sm text-foreground/70">Visualize your growth and mastery</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">🔒 Academic Integrity</p>
                <p className="text-sm text-foreground/70">Designed for responsible AI use</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex items-center justify-center border-t border-t-foreground/10 py-8">
        <p className="text-sm text-foreground/60">
          © 2025 CourseLLM. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
