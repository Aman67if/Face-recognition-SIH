import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  BookOpen, 
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';


export function StudentDetailPage({ studentId, onBack }) {
  // Mock student data - in real app, this would come from API
  const studentInfo = {
    id: studentId,
    name: studentId === 'ST001' ? 'Alice Johnson' : 
          studentId === 'ST002' ? 'Bob Smith' : 
          studentId === 'ST003' ? 'Carol Davis' : 'David Wilson',
    age: 20,
    course: 'Computer Science Engineering',
    email: `${studentId.toLowerCase()}@student.edu`,
    enrollmentDate: '2023-08-15',
    currentAttendanceRate: 85,
    totalClassesTaken: 120,
    totalClassesAttended: 102,
    totalClassesMissed: 18
  };

  // Mock monthly attendance data for the past 6 months
  const monthlyAttendanceData = [
    {
      month: 'August',
      year: 2023,
      totalClasses: 20,
      attended: 18,
      missed: 2,
      percentage: 90
    },
    {
      month: 'September',
      year: 2023,
      totalClasses: 22,
      attended: 19,
      missed: 3,
      percentage: 86
    },
    {
      month: 'October',
      year: 2023,
      totalClasses: 20,
      attended: 16,
      missed: 4,
      percentage: 80
    },
    {
      month: 'November',
      year: 2023,
      totalClasses: 18,
      attended: 15,
      missed: 3,
      percentage: 83
    },
    {
      month: 'December',
      year: 2023,
      totalClasses: 15,
      attended: 13,
      missed: 2,
      percentage: 87
    },
    {
      month: 'January',
      year: 2024,
      totalClasses: 25,
      attended: 21,
      missed: 4,
      percentage: 84
    }
  ];

  const recentAttendance = [
    { date: '2024-01-20', subject: 'Mathematics', status: 'present', time: '09:15 AM' },
    { date: '2024-01-19', subject: 'Physics', status: 'present', time: '11:30 AM' },
    { date: '2024-01-18', subject: 'Chemistry', status: 'absent', time: '-' },
    { date: '2024-01-17', subject: 'Mathematics', status: 'present', time: '09:10 AM' },
    { date: '2024-01-16', subject: 'Physics', status: 'present', time: '11:25 AM' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`${label} ${payload[0].payload.year}`}</p>
          <p className="text-green-600">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            {`Attended: ${payload[0].value}`}
          </p>
          <p className="text-red-600">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            {`Missed: ${payload[1].value}`}
          </p>
          <p className="text-muted-foreground">
            {`Percentage: ${payload[0].payload.percentage}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gradient-light-start)] to-[var(--gradient-light-end)] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Attendance Records
          </Button>
        </motion.div>

        {/* Student Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8"
        >
          <div className="flex items-center space-x-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold mb-2">{studentInfo.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm opacity-80">
                <span>Age: {studentInfo.age}</span>
                <span>•</span>
                <span>ID: {studentInfo.id}</span>
                <span>•</span>
                <span>Course: {studentInfo.course}</span>
              </div>
              <div className="mt-3">
                <Badge variant="default" className="mr-2">
                  {studentInfo.currentAttendanceRate}% Attendance
                </Badge>
                <Badge variant="outline">
                  Enrolled since {new Date(studentInfo.enrollmentDate).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Attendance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-primary mb-2">
                    {studentInfo.currentAttendanceRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Attendance Rate</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Classes Attended</span>
                    <span className="font-medium text-green-600">{studentInfo.totalClassesAttended}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Classes Missed</span>
                    <span className="font-medium text-red-600">{studentInfo.totalClassesMissed}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="text-sm">Total Classes</span>
                    <span className="font-medium">{studentInfo.totalClassesTaken}</span>
                  </div>
                </div>

                <Progress value={studentInfo.currentAttendanceRate} className="mt-4" />
              </CardContent>
            </Card>

            {/* Recent Attendance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Attendance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAttendance.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{record.subject}</p>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {record.status === 'present' ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-600">{record.time}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-xs text-red-600">Absent</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Charts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Monthly Attendance Breakdown</span>
                </CardTitle>
                <CardDescription>
                  Attendance data for the past 6 months showing classes attended vs missed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyAttendanceData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="attended" 
                        stackId="a" 
                        fill="hsl(var(--chart-1))"
                        radius={[0, 0, 4, 4]}
                        name="Attended"
                      />
                      <Bar 
                        dataKey="missed" 
                        stackId="a" 
                        fill="hsl(var(--chart-2))"
                        radius={[4, 4, 0, 0]}
                        name="Missed"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Monthly Stats Grid */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {monthlyAttendanceData.map((month, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="text-center">
                        <p className="font-medium text-sm">{month.month} {month.year}</p>
                        <p className="text-2xl font-semibold text-primary my-1">{month.percentage}%</p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Attended: {month.attended}/{month.totalClasses}</p>
                          <Progress value={month.percentage} className="h-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}