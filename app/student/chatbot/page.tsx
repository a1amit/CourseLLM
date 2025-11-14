"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BookOpen, Send, Loader2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createBrowserClient } from "@supabase/ssr";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Question {
  id: string;
  question_text: string;
  topic: string;
  difficulty: string;
  answer: string | null;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your course assistant. Ask me anything about your course material, and I'll help guide you through socratic questioning.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch questions from Supabase
  useEffect(() => {
    const fetchQuestions = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );

      const { data, error } = await supabase
        .from("teacher_questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching questions:", error);
      } else if (data) {
        setQuestions(data);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response - for now, we'll check if the question matches any in the database
    setTimeout(() => {
      const matchingQuestion = questions.find((q) =>
        q.question_text.toLowerCase().includes(input.toLowerCase()) ||
        input.toLowerCase().includes(q.topic.toLowerCase())
      );

      let responseContent = "";

      if (matchingQuestion) {
        responseContent = `Great question about ${matchingQuestion.topic}! Let me help you understand this better.\n\n`;
        responseContent += `This is a ${matchingQuestion.difficulty} level topic. `;
        responseContent += `Before I give you a direct answer, let me ask: What do you already know about ${matchingQuestion.topic}? `;
        responseContent += `This will help me tailor my explanation to your current understanding.\n\n`;
        
        // If the question has an answer, provide it after socratic guidance
        if (matchingQuestion.answer) {
          responseContent += `\n**Answer:**\n${matchingQuestion.answer}`;
        }
      } else {
        // Generic socratic response
        responseContent = `That's an interesting question! Before I answer, let me understand your thinking better:\n\n`;
        responseContent += `1. What have you tried so far?\n`;
        responseContent += `2. What specific part is confusing you?\n`;
        responseContent += `3. Can you relate this to any concepts you've already learned?\n\n`;
        responseContent += `This will help me give you a more personalized explanation.`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const suggestedQuestions = questions.slice(0, 3);

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/student" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-foreground/10" />
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span className="font-bold text-xl">CourseLLM Chatbot</span>
              </div>
              <Badge variant="outline">Student View</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Data Structures & Algorithms</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">
                        {message.role === "user" ? "You" : "Assistant"}
                      </span>
                      {mounted && (
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-muted">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Assistant is typing...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {suggestedQuestions.length > 0 && messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <Button
                  key={q.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(q.question_text)}
                  className="text-xs"
                >
                  <Badge variant="secondary" className="mr-2 text-xs">
                    {q.difficulty}
                  </Badge>
                  {q.question_text.substring(0, 50)}...
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your course material..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-2">
          Using Socratic method to guide your learning • {questions.length} questions available
        </p>
      </div>
    </div>
  );
}
