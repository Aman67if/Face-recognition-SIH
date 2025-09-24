"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Star,
  VideoIcon,
  FileText
} from 'lucide-react';
import { AttendanceScanner } from '../AttendanceScanner';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';


export function StudentPage() {
  const { user } = useAuth();
  const [scannerEnabled] = useState(true); // This would come from teacher settings

  const attendanceData = {
    today: 85,
    thisWeek: 78,
    thisMonth: 82,
    streak: 5
  };

  const suggestedContent = [
    {
      id: '1',
      title: 'Introduction to Calculus - Limits and Derivatives',
      type: 'video',
      duration: '15 min',
      subject: 'Mathematics',
      difficulty: 'medium',
      description: 'Learn the fundamental concepts of calculus including limits and basic derivatives.'
    },
    {
      id: '2',
      title: 'Physics: Understanding Wave Motion',
      type: 'video',
      duration: '12 min',
      subject: 'Physics',
      difficulty: 'easy',
      description: 'Explore the principles of wave motion and how waves transfer energy.'
    },
    {
      id: '3',
      title: 'Chemistry Lab Safety Guidelines',
      type: 'article',
      duration: '8 min',
      subject: 'Chemistry',
      difficulty: 'easy',
      description: 'Essential safety protocols and procedures for chemistry laboratory work.'
    },
    {
      id: '4',
      title: 'Advanced Organic Chemistry Reactions',
      type: 'tutorial',
      duration: '25 min',
      subject: 'Chemistry',
      difficulty: 'hard',
      description: 'Deep dive into complex organic reactions and mechanisms.'
    },
    {
      id: '5',
      title: 'Linear Algebra: Matrix Operations',
      type: 'video',
      duration: '18 min',
      subject: 'Mathematics',
      difficulty: 'medium',
      description: 'Master matrix multiplication, determinants, and inverse operations.'
    }
  ];

  const upcomingClasses = [
    { subject: 'Mathematics', time: '10:00 AM', room: 'Room 301', status: 'next' },
    { subject: 'Physics', time: '11:30 AM', room: 'Lab 201', status: 'upcoming' },
    { subject: 'Chemistry', time: '2:00 PM', room: 'Lab 105', status: 'upcoming' },
  ];

  const getContentIcon = (type) => {
    switch (type) {
      case 'video': return VideoIcon;
      case 'article': return FileText;
      case 'tutorial': return Play;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gradient-light-start)] to-[var(--gradient-light-end)] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8"
        >
          <h1 className="text-3xl font-semibold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-lg opacity-80">Ready to learn something new today?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Attendance & Quick Stats */}
          <div className="space-y-6">
            {/* Attendance Scanner */}
            <AttendanceScanner isEnabled={scannerEnabled} />

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Today's Attendance</span>
                    <span>{attendanceData.today}%</span>
                  </div>
                  <Progress value={attendanceData.today} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>This Week</span>
                    <span>{attendanceData.thisWeek}%</span>
                  </div>
                  <Progress value={attendanceData.thisWeek} />
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <span>Current Streak</span>
                  <Badge variant="default">{attendanceData.streak} days</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingClasses.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{cls.subject}</p>
                      <p className="text-sm text-muted-foreground">{cls.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{cls.time}</p>
                      <Badge variant={cls.status === 'next' ? 'default' : 'secondary'} className="text-xs">
                        {cls.status === 'next' ? 'Next' : 'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Content Suggestions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Suggested Content for You</span>
                </CardTitle>
                <CardDescription>
                  Personalized learning content based on your current subjects and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {suggestedContent.map((content) => {
                    const Icon = getContentIcon(content.type);
                    return (
                      <motion.div
                        key={content.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * parseInt(content.id) }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-medium group-hover:text-primary transition-colors">
                                {content.title}
                              </h3>
                              <div className="flex items-center space-x-2 ml-4">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{content.duration}</span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {content.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{content.subject}</Badge>
                                <Badge className={getDifficultyColor(content.difficulty)}>
                                  {content.difficulty}
                                </Badge>
                              </div>
                              
                              <Button size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Play className="h-4 w-4 mr-2" />
                                Start Learning
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-6 text-center p-6 bg-muted/50 rounded-lg">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    More personalized content recommendations coming soon!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our AI will suggest videos and articles based on your learning progress and interests.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}