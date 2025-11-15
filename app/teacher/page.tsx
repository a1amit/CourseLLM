'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  BarChart3,
  Download,
  BookOpen,
  ChevronLeft,
  TrendingDown,
  Upload,
  Network,
  ClipboardCheck,
  PenTool,
  Shield,
  Menu,
  X,
} from 'lucide-react';

// Mock data for demo
const mockStudents = [
  { id: 's1', name: 'Alice Johnson', email: 'alice@uni.edu', progressBehind: false },
  { id: 's2', name: 'Bob Smith', email: 'bob@uni.edu', progressBehind: true },
  { id: 's3', name: 'Carol Davis', email: 'carol@uni.edu', progressBehind: false },
  { id: 's4', name: 'David Lee', email: 'david@uni.edu', progressBehind: true },
  { id: 's5', name: 'Emma Wilson', email: 'emma@uni.edu', progressBehind: false },
  { id: 's6', name: 'Frank Brown', email: 'frank@uni.edu', progressBehind: false },
  { id: 's7', name: 'Grace Martinez', email: 'grace@uni.edu', progressBehind: true },
  { id: 's8', name: 'Henry Taylor', email: 'henry@uni.edu', progressBehind: false },
];

const mockTopics = [
  'Arrays & Lists',
  'Linked Lists',
  'Stacks & Queues',
  'Trees',
  'Graphs',
  'Sorting',
  'Searching',
  'Hash Tables',
  'Dynamic Programming',
  'Recursion',
];

// Mastery levels: 0 = Not Started, 25 = In Progress, 50 = Mostly Complete, 75 = Mastered, 100 = Expert
const generateMasteryData = () => {
  const data: { [key: string]: number } = {};
  mockStudents.forEach((student) => {
    mockTopics.forEach((topic) => {
      const seed = student.id.charCodeAt(0) + topic.charCodeAt(0);
      const random = ((Math.sin(seed) * 10000) % 1) * 100;
      data[`${student.id}-${topic}`] = Math.floor((random / 100) * 5) * 25;
    });
  });
  return data;
};

const getMasteryColor = (level: number) => {
  if (level === 0) return 'bg-gray-100 dark:bg-gray-700';
  if (level <= 25) return 'bg-red-200 dark:bg-red-900';
  if (level <= 50) return 'bg-yellow-200 dark:bg-yellow-900';
  if (level <= 75) return 'bg-blue-200 dark:bg-blue-900';
  return 'bg-green-200 dark:bg-green-900';
};

const getMasteryLabel = (level: number) => {
  if (level === 0) return 'Not Started';
  if (level <= 25) return 'Struggling';
  if (level <= 50) return 'In Progress';
  if (level <= 75) return 'Mastered';
  return 'Expert';
};

// Teacher features based on user stories
const teacherFeatures = [
  {
    id: 'content-upload',
    name: 'Content Upload & Indexing',
    description: 'Upload slides, notes, exams, and exercises. Manage RAG indexing.',
    icon: Upload,
    color: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600',
    userStories: ['US-T1.1', 'US-T1.2', 'US-T1.3'],
    features: [
      'Batch upload materials (PDF, PPTX, DOCX, Markdown)',
      'Content consistency review',
      'RAG indexing & search',
      'Indexing status & statistics',
    ],
  },
  {
    id: 'trajectories',
    name: 'Learning Trajectories',
    description: 'Define topic dependencies and mastery criteria for your course.',
    icon: Network,
    color: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600',
    userStories: ['US-T2.1', 'US-T2.2'],
    features: [
      'Visual dependency graph editor',
      'Drag-and-drop topic management',
      'Cycle detection',
      'Set mastery thresholds',
    ],
  },
  {
    id: 'assignments',
    name: 'Assignment Validation',
    description: 'Generate and validate assignments for testability and LLM resilience.',
    icon: ClipboardCheck,
    color: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600',
    userStories: ['US-T3.1', 'US-T3.2'],
    features: [
      'Generate assignment templates',
      'LLM resilience testing',
      'Ambiguity detection',
      'Rubric suggestions',
    ],
  },
  {
    id: 'grading',
    name: 'Grading Assistance',
    description: 'Automated code validation, plagiarism detection, and AI-assisted grading.',
    icon: PenTool,
    color: 'bg-orange-100 dark:bg-orange-900',
    iconColor: 'text-orange-600',
    userStories: ['US-T5.1', 'US-T5.2', 'US-T5.3'],
    features: [
      'Automated unit test execution',
      'Code style & efficiency metrics',
      'Suspicious submission flagging',
      'AI-assisted essay grading',
    ],
  },
  {
    id: 'cheating-detection',
    name: 'Cheating Detection',
    description: 'Detect AI-generated submissions and plagiarism patterns.',
    icon: Shield,
    color: 'bg-red-100 dark:bg-red-900',
    iconColor: 'text-red-600',
    userStories: ['US-T6.1', 'US-T6.2'],
    features: [
      'AI generation detection',
      'Plagiarism similarity matrix',
      'Suspicious section highlighting',
      'Diff view for suspected pairs',
    ],
  },
];

export default function TeacherDashboard() {
  const masteryData = generateMasteryData();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate struggling topics (>30% of students at level 0 or 25)
  const strugglingTopics = mockTopics.filter((topic) => {
    const strugglingCount = mockStudents.filter((student) => {
      const level = masteryData[`${student.id}-${topic}`];
      return level <= 25;
    }).length;
    return (strugglingCount / mockStudents.length) * 100 > 30;
  });

  // Get at-risk students
  const atRiskStudents = mockStudents.filter((s) => s.progressBehind);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-b-foreground/10 h-16 px-6 sticky top-0 bg-background/95 backdrop-blur z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm hover:text-foreground/70 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>
        <h1 className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="w-6 h-6 text-green-600" />
          Teacher Portal
        </h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-foreground/5 rounded transition"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar - Features Navigation */}
        <div
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:block w-full md:w-64 border-r border-r-foreground/10 bg-card/50 p-4 space-y-2 fixed md:relative left-0 top-16 md:top-auto h-[calc(100vh-64px)] md:h-auto overflow-y-auto z-40`}
        >
          <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider px-4 py-2">
            Teacher Features
          </h3>
          {teacherFeatures.map((feature) => (
            <Link
              key={feature.id}
              href={`/teacher/${feature.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-foreground/5 transition border border-transparent hover:border-foreground/20 block"
            >
              <div className={`${feature.color} p-2 rounded-lg flex-shrink-0`}>
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{feature.name}</p>
                <p className="text-xs text-foreground/60 line-clamp-2">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Course Progress Monitor</h2>
              <p className="text-foreground/70">
                Track student progress, identify struggles, and monitor at-risk students
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-lg border border-foreground/20 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground/60">Total Students</p>
                    <p className="text-3xl font-bold">{mockStudents.length}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-500 opacity-20" />
                </div>
              </div>
              <div className="p-6 rounded-lg border border-foreground/20 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground/60">At-Risk Students</p>
                    <p className="text-3xl font-bold">{atRiskStudents.length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-500 opacity-20" />
                </div>
              </div>
              <div className="p-6 rounded-lg border border-foreground/20 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground/60">Struggling Topics</p>
                    <p className="text-3xl font-bold">{strugglingTopics.length}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-yellow-500 opacity-20" />
                </div>
              </div>
            </div>

            {/* At-Risk Students Alert */}
            {atRiskStudents.length > 0 && (
              <div className="p-6 rounded-lg border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                      At-Risk Students (2+ weeks behind)
                    </h3>
                    <div className="space-y-2">
                      {atRiskStudents.map((student) => (
                        <div key={student.id} className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-foreground/60">{student.email}</p>
                          </div>
                          <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition">
                            Contact
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Struggling Topics */}
            {strugglingTopics.length > 0 && (
              <div className="p-6 rounded-lg border border-foreground/20 bg-card">
                <h3 className="font-semibold text-lg mb-4">Topics Needing Attention</h3>
                <p className="text-sm text-foreground/60 mb-4">
                  More than 30% of students are struggling with these topics:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strugglingTopics.map((topic) => {
                    const strugglingCount = mockStudents.filter((student) => {
                      const level = masteryData[`${student.id}-${topic}`];
                      return level <= 25;
                    }).length;
                    return (
                      <div
                        key={topic}
                        className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                      >
                        <p className="font-medium mb-2">{topic}</p>
                        <p className="text-sm text-foreground/70">
                          {strugglingCount} of {mockStudents.length} students struggling (
                          {Math.round((strugglingCount / mockStudents.length) * 100)}%)
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mastery Heatmap */}
            <div className="p-6 rounded-lg border border-foreground/20 bg-card overflow-x-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Student Mastery Heatmap</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm border border-foreground/20 rounded hover:bg-foreground/5 transition">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mb-6 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded" />
                  <span>Not Started</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-200 dark:bg-red-900 rounded" />
                  <span>Struggling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-200 dark:bg-yellow-900 rounded" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-200 dark:bg-blue-900 rounded" />
                  <span>Mastered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-200 dark:bg-green-900 rounded" />
                  <span>Expert</span>
                </div>
              </div>

              {/* Heatmap Table */}
              <div className="inline-block min-w-full border border-foreground/10 rounded-lg overflow-hidden">
                <table className="text-sm">
                  <thead>
                    <tr className="bg-foreground/5">
                      <th className="px-4 py-3 text-left font-semibold border-r border-foreground/10 sticky left-0 bg-foreground/5 min-w-[180px]">
                        Student
                      </th>
                      {mockTopics.map((topic) => (
                        <th
                          key={topic}
                          className="px-3 py-3 text-center font-semibold border-r border-foreground/10 min-w-[100px]"
                        >
                          <div className="text-xs">{topic}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-foreground/5 transition">
                        <td className="px-4 py-3 font-medium border-r border-foreground/10 sticky left-0 bg-background z-10">
                          <button
                            onClick={() => setSelectedStudent(selectedStudent === student.id ? null : student.id)}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition text-left w-full"
                          >
                            {student.name}
                          </button>
                          {student.progressBehind && (
                            <p className="text-xs text-red-600 dark:text-red-400 font-semibold">At Risk</p>
                          )}
                        </td>
                        {mockTopics.map((topic) => {
                          const level = masteryData[`${student.id}-${topic}`];
                          return (
                            <td
                              key={`${student.id}-${topic}`}
                              className={`${getMasteryColor(level)} border-r border-foreground/10 px-3 py-3 text-center cursor-help`}
                              title={getMasteryLabel(level)}
                            >
                              <span className="text-xs font-semibold">{level}%</span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Student Details Panel */}
            {selectedStudent && (
              <div className="p-6 rounded-lg border border-foreground/20 bg-card">
                <h3 className="font-semibold text-lg mb-4">
                  {mockStudents.find((s) => s.id === selectedStudent)?.name} - Detailed View
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockTopics.map((topic) => {
                    const level = masteryData[`${selectedStudent}-${topic}`];
                    return (
                      <div key={topic} className={`p-4 rounded-lg ${getMasteryColor(level)}`}>
                        <p className="font-medium text-sm mb-2">{topic}</p>
                        <div className="w-full bg-foreground/10 rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full"
                            style={{ width: `${level}%` }}
                          />
                        </div>
                        <p className="text-xs text-foreground/70">{getMasteryLabel(level)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
