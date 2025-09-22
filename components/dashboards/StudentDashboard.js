import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Calendar, 
  BookOpen, 
  Upload, 
  FileText, 
  Image as ImageIcon,
  Download,
  Trash2,
  Play,
  Clock
} from 'lucide-react';
import { AttendanceScanner } from '../AttendanceScanner';
import { motion } from 'motion/react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document';
  size: string;
  uploadDate: string;
}

export function StudentDashboard() {
  const [scannerEnabled] = useState(true); // This would come from teacher settings
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Academic Certificate.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'ID Card.jpg',
      type: 'image',
      size: '1.2 MB',
      uploadDate: '2024-01-10'
    }
  ]);

  const attendanceData = {
    today: 85,
    thisWeek: 78,
    thisMonth: 82,
    overall: 85
  };

  const topics = [
    { subject: 'Mathematics', covered: 8, total: 12, pending: ['Calculus', 'Statistics', 'Algebra II', 'Geometry'] },
    { subject: 'Physics', covered: 6, total: 10, pending: ['Quantum Mechanics', 'Thermodynamics', 'Optics', 'Waves'] },
    { subject: 'Chemistry', covered: 9, total: 12, pending: ['Organic Chemistry', 'Physical Chemistry', 'Biochemistry'] },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDoc: Document = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'document',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0]
        };
        setDocuments(prev => [...prev, newDoc]);
      });
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'pdf': return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#b2f1ff] to-[#c0f3c9] dark:from-[#1a2c2f] dark:to-[#22372a] rounded-2xl p-6 text-center"
      >
        <h1 className="text-2xl font-semibold mb-2">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground">Track your attendance, manage your portfolio, and stay updated with your progress</p>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Attendance</p>
                    <p className="text-2xl font-semibold">{attendanceData.today}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-2xl font-semibold">{attendanceData.thisWeek}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-semibold">{attendanceData.thisMonth}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall</p>
                    <p className="text-2xl font-semibold">{attendanceData.overall}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceScanner isEnabled={scannerEnabled} />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Free Classes</span>
                </CardTitle>
                <CardDescription>
                  Recommended content for your free periods
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Automatic video suggestions coming soon!</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceScanner isEnabled={scannerEnabled} />
            
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Today</span>
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
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>This Month</span>
                    <span>{attendanceData.thisMonth}%</span>
                  </div>
                  <Progress value={attendanceData.thisMonth} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Overall</span>
                    <span>{attendanceData.overall}%</span>
                  </div>
                  <Progress value={attendanceData.overall} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topics" className="space-y-6">
          <div className="grid gap-6">
            {topics.map((topic, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>{topic.subject}</span>
                    </span>
                    <Badge variant="secondary">
                      {topic.covered}/{topic.total} completed
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Progress</span>
                      <span>{Math.round((topic.covered / topic.total) * 100)}%</span>
                    </div>
                    <Progress value={(topic.covered / topic.total) * 100} />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Pending Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.pending.map((pendingTopic, idx) => (
                        <Badge key={idx} variant="outline">
                          {pendingTopic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Document Upload</span>
              </CardTitle>
              <CardDescription>
                Upload certificates, ID cards, and academic achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Drop files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Documents</CardTitle>
              <CardDescription>
                {documents.length} documents uploaded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => {
                  const Icon = getFileIcon(doc.type);
                  return (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.size} • Uploaded {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                {documents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No documents uploaded yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}