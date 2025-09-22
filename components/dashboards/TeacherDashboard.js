import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  Camera, 
  Calendar, 
  CheckCircle, 
  XCircle,
  BarChart3,
  Settings,
  UserCheck
} from 'lucide-react';
import { AttendanceScanner } from '../AttendanceScanner';
import { motion } from 'motion/react';

export function TeacherDashboard() {
  const [scannerEnabled, setScannerEnabled] = useState(false);
  const [currentClassStrength] = useState({ present: 28, total: 35 });
  
  const todayAttendance = [
    { id: '1', studentName: 'Alice Johnson', studentId: 'ST001', date: '2024-01-20', time: '09:15', status: 'present', subject: 'Mathematics' },
    { id: '2', studentName: 'Bob Smith', studentId: 'ST002', date: '2024-01-20', time: '09:18', status: 'present', subject: 'Mathematics' },
    { id: '3', studentName: 'Carol Davis', studentId: 'ST003', date: '2024-01-20', time: '09:22', status: 'present', subject: 'Mathematics' },
    { id: '4', studentName: 'David Wilson', studentId: 'ST004', date: '2024-01-20', time: '-', status: 'absent', subject: 'Mathematics' },
  ];

  const previousDayAttendance = [
    { id: '5', studentName: 'Alice Johnson', studentId: 'ST001', date: '2024-01-19', time: '09:12', status: 'present', subject: 'Physics' },
    { id: '6', studentName: 'Bob Smith', studentId: 'ST002', date: '2024-01-19', time: '09:25', status: 'present', subject: 'Physics' },
    { id: '7', studentName: 'Carol Davis', studentId: 'ST003', date: '2024-01-19', time: '-', status: 'absent', subject: 'Physics' },
    { id: '8', studentName: 'David Wilson', studentId: 'ST004', date: '2024-01-19', time: '09:30', status: 'present', subject: 'Physics' },
  ];

  const handleScannerToggle = (enabled) => {
    setScannerEnabled(enabled);
  };

  const handleScanComplete = (success, studentId) => {
    if (success && studentId) {
      console.log(`Attendance marked for student: ${studentId}`);
      // Here you would update the attendance records
    }
  };

  const attendancePercentage = Math.round((currentClassStrength.present / currentClassStrength.total) * 100);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#b2f1ff] to-[#c0f3c9] dark:from-[#1a2c2f] dark:to-[#22372a] rounded-2xl p-6"
      >
        <h1 className="text-2xl font-semibold mb-2">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Manage attendance, monitor students, and control scanning</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Class Strength</p>
                <p className="text-2xl font-semibold">{currentClassStrength.present}/{currentClassStrength.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Attendance</p>
                <p className="text-2xl font-semibold">{attendancePercentage}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scanner Status</p>
                <p className="text-2xl font-semibold">{scannerEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="controls" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="controls">Scanner Control</TabsTrigger>
          <TabsTrigger value="today">Today's Attendance</TabsTrigger>
          <TabsTrigger value="previous">Previous Day</TabsTrigger>
        </TabsList>

        <TabsContent value="controls" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Scanner Control</span>
                </CardTitle>
                <CardDescription>
                  Enable or disable the attendance scanner for students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Enable Scanner</label>
                    <p className="text-sm text-muted-foreground">
                      Allow students to scan their faces for attendance
                    </p>
                  </div>
                  <Switch
                    checked={scannerEnabled}
                    onCheckedChange={handleScannerToggle}
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Scanner Status:</p>
                  <Badge variant={scannerEnabled ? "default" : "secondary"}>
                    {scannerEnabled ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <AttendanceScanner 
              isEnabled={scannerEnabled} 
              onScanComplete={handleScanComplete}
            />
          </div>
        </TabsContent>

        <TabsContent value="today" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Today's Attendance - January 20, 2024</span>
              </CardTitle>
              <CardDescription>
                Current attendance records for today's classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.studentId}</TableCell>
                      <TableCell>{record.time}</TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {record.status === 'present' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <Badge variant={record.status === 'present' ? 'default' : 'destructive'}>
                            {record.status === 'present' ? 'Present' : 'Absent'}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previous" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <span>Previous Day Attendance - January 19, 2024</span>
              </CardTitle>
              <CardDescription>
                Yesterday's attendance records for reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previousDayAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.studentName}</TableCell>
                      <TableCell>{record.studentId}</TableCell>
                      <TableCell>{record.time}</TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {record.status === 'present' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <Badge variant={record.status === 'present' ? 'default' : 'destructive'}>
                            {record.status === 'present' ? 'Present' : 'Absent'}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}