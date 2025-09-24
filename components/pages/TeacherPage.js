"use client"

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Users,
  Camera,
  Calendar,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  UserCheck,
  Plus,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { AttendanceScanner } from "../AttendanceScanner";
import { StudentDetailPage } from "./StudentDetailPage";
import { TeacherProfilePage } from "./TeacherProfilePage";
import { motion } from "motion/react";
import { useAuth } from "../../contexts/AuthContext";


export function TeacherPage() {
  const { user } = useAuth();
  const [globalScannerEnabled, setGlobalScannerEnabled] =
    useState(false);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDate, setSelectedDate] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const [classSessions, setClassSessions] = useState([
    {
      id: "1",
      subject: "Mathematics",
      time: "10:00 AM",
      room: "Room 301",
      totalStudents: 35,
      presentStudents: 28,
      scannerEnabled: false,
    },
    {
      id: "2",
      subject: "Physics",
      time: "11:30 AM",
      room: "Lab 201",
      totalStudents: 30,
      presentStudents: 25,
      scannerEnabled: false,
    },
    {
      id: "3",
      subject: "Chemistry",
      time: "2:00 PM",
      room: "Lab 105",
      totalStudents: 28,
      presentStudents: 22,
      scannerEnabled: false,
    },
  ]);

  const attendanceRecords = [
    {
      id: "1",
      studentName: "Alice Johnson",
      studentId: "ST001",
      date: "2024-01-20",
      time: "09:15",
      status: "present",
      subject: "Mathematics",
    },
    {
      id: "2",
      studentName: "Bob Smith",
      studentId: "ST002",
      date: "2024-01-20",
      time: "09:18",
      status: "present",
      subject: "Mathematics",
    },
    {
      id: "3",
      studentName: "Carol Davis",
      studentId: "ST003",
      date: "2024-01-20",
      time: "09:22",
      status: "present",
      subject: "Mathematics",
    },
    {
      id: "4",
      studentName: "David Wilson",
      studentId: "ST004",
      date: "2024-01-20",
      time: "-",
      status: "absent",
      subject: "Mathematics",
    },
    {
      id: "5",
      studentName: "Emma Brown",
      studentId: "ST005",
      date: "2024-01-20",
      time: "09:25",
      status: "present",
      subject: "Mathematics",
    },
    {
      id: "6",
      studentName: "Frank Miller",
      studentId: "ST006",
      date: "2024-01-19",
      time: "11:35",
      status: "present",
      subject: "Physics",
    },
    {
      id: "7",
      studentName: "Grace Lee",
      studentId: "ST007",
      date: "2024-01-19",
      time: "11:40",
      status: "present",
      subject: "Physics",
    },
    {
      id: "8",
      studentName: "Henry Clark",
      studentId: "ST008",
      date: "2024-01-19",
      time: "-",
      status: "absent",
      subject: "Physics",
    },
  ];

  const handleGlobalScannerToggle = (enabled) => {
    setGlobalScannerEnabled(enabled);
    setClassSessions((sessions) =>
      sessions.map((session) => ({
        ...session,
        scannerEnabled: enabled,
      })),
    );
  };

  const handleClassScannerToggle = (
    classId,
    enabled,
  ) => {
    setClassSessions((sessions) =>
      sessions.map((session) =>
        session.id === classId
          ? { ...session, scannerEnabled: enabled }
          : session,
      ),
    );
  };

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.studentId
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesClass =
      selectedClass === "all" ||
      record.subject === selectedClass;
    const matchesDate =
      selectedDate === "all" ||
      (selectedDate === "today" &&
        record.date === "2024-01-20") ||
      (selectedDate === "yesterday" &&
        record.date === "2024-01-19");

    return matchesSearch && matchesClass && matchesDate;
  });

  const overallStats = {
    totalClasses: classSessions.length,
    activeClasses: classSessions.filter((c) => c.scannerEnabled)
      .length,
    totalStudents: classSessions.reduce(
      (sum, c) => sum + c.totalStudents,
      0,
    ),
    presentStudents: classSessions.reduce(
      (sum, c) => sum + c.presentStudents,
      0,
    ),
  };

  const attendancePercentage = Math.round(
    (overallStats.presentStudents /
      overallStats.totalStudents) *
      100,
  );

  const handleStudentClick = (studentId) => {
    setSelectedStudentId(studentId);
  };

  const handleBackToTeacherPage = () => {
    setSelectedStudentId(null);
    setShowProfile(false);
  };

  // If a student is selected, show their detail page
  if (selectedStudentId) {
    return (
      <StudentDetailPage
        studentId={selectedStudentId}
        onBack={handleBackToTeacherPage}
      />
    );
  }

  // If profile is selected, show teacher profile page
  if (showProfile) {
    return (
      <TeacherProfilePage onBack={handleBackToTeacherPage} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gradient-light-start)] to-[var(--gradient-light-end)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-semibold mb-2">
                Teacher Management Center
              </h1>
              <p className="text-lg opacity-80">
                Control attendance scanning and monitor your
                classes
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowProfile(true)}
              className="bg-white/10 hover:bg-white/20 border-white/20"
            >
              <Users className="mr-2 h-4 w-4" />
              View Profile
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Classes
                  </p>
                  <p className="text-2xl font-semibold">
                    {overallStats.totalClasses}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Scanners
                  </p>
                  <p className="text-2xl font-semibold">
                    {overallStats.activeClasses}
                  </p>
                </div>
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Students Present
                  </p>
                  <p className="text-2xl font-semibold">
                    {overallStats.presentStudents}/
                    {overallStats.totalStudents}
                  </p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Attendance Rate
                  </p>
                  <p className="text-2xl font-semibold">
                    {attendancePercentage}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Scanner Controls */}
          <div className="space-y-6">
            {/* Global Scanner Control */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Scanner Control</span>
                </CardTitle>
                <CardDescription>
                  Manage attendance scanning for all your
                  classes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">
                      Enable All Scanners
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Turn on attendance scanning for all
                      classes
                    </p>
                  </div>
                  <Switch
                    checked={globalScannerEnabled}
                    onCheckedChange={handleGlobalScannerToggle}
                  />
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Global Status:
                  </p>
                  <Badge
                    variant={
                      globalScannerEnabled
                        ? "default"
                        : "secondary"
                    }
                  >
                    {globalScannerEnabled
                      ? "All Scanners Active"
                      : "Scanners Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Class-specific Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Class Sessions</CardTitle>
                <CardDescription>
                  Individual scanner controls for each class
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {classSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">
                          {session.subject}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.time} • {session.room}
                        </p>
                      </div>
                      <Switch
                        checked={session.scannerEnabled}
                        onCheckedChange={(enabled) =>
                          handleClassScannerToggle(
                            session.id,
                            enabled,
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {session.presentStudents}/
                        {session.totalStudents} present
                      </span>
                      <Badge
                        variant={
                          session.scannerEnabled
                            ? "default"
                            : "secondary"
                        }
                      >
                        {session.scannerEnabled
                          ? "Active"
                          : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Scanner Demo */}
            <AttendanceScanner
              isEnabled={globalScannerEnabled}
              onScanComplete={(success, studentId) => {
                console.log("Scan result:", success, studentId);
              }}
            />
          </div>

          {/* Right Column - Attendance Records */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5" />
                  <span>Attendance Records</span>
                </CardTitle>
                <CardDescription>
                  View and manage student attendance data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                    />
                  </div>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All Classes
                      </SelectItem>
                      <SelectItem value="Mathematics">
                        Mathematics
                      </SelectItem>
                      <SelectItem value="Physics">
                        Physics
                      </SelectItem>
                      <SelectItem value="Chemistry">
                        Chemistry
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All Dates
                      </SelectItem>
                      <SelectItem value="today">
                        Today
                      </SelectItem>
                      <SelectItem value="yesterday">
                        Yesterday
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Attendance Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow
                          key={record.id}
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() =>
                            handleStudentClick(record.studentId)
                          }
                        >
                          <TableCell className="font-medium hover:text-primary transition-colors">
                            {record.studentName}
                          </TableCell>
                          <TableCell>
                            {record.studentId}
                          </TableCell>
                          <TableCell>
                            {record.subject}
                          </TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.time}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {record.status === "present" ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                              <Badge
                                variant={
                                  record.status === "present"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {record.status === "present"
                                  ? "Present"
                                  : "Absent"}
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredRecords.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No attendance records found matching your
                    filters.
                  </div>
                )}

                {filteredRecords.length > 0 && (
                  <div className="mt-4 text-sm text-muted-foreground text-center">
                    💡 Tip: Click on any student name to view
                    their detailed attendance profile
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}