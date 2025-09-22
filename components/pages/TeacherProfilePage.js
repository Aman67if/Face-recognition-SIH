import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  BookOpen, 
  Award,
  Camera,
  Edit3,
  Save,
  X,
  GraduationCap,
  Clock,
  Target,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';


export function TeacherProfilePage({ onBack }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);

  const [teacherInfo, setTeacherInfo] = useState<TeacherInfo>({
    id: 'T001',
    name: 'Dr. Sarah Mitchell',
    email: 'teacher@demo.com',
    profilePicture: '',
    specialization: ['Machine Learning', 'Data Science', 'Artificial Intelligence'],
    experienceYears: 8,
    researchInterests: [
      'Deep Learning Applications',
      'Computer Vision',
      'Natural Language Processing',
      'Educational Technology'
    ],
    subjects: ['Mathematics', 'Physics', 'Computer Science', 'Statistics'],
    education: 'Ph.D. in Computer Science, MIT',
    department: 'Computer Science & Engineering',
    joinDate: '2019-08-15',
    phoneNumber: '+1 (555) 123-4567',
    officeLocation: 'Room 302, Engineering Building',
    bio: 'Passionate educator with expertise in machine learning and data science. Committed to innovative teaching methods and student success through hands-on learning experiences.'
  });

  const [editedInfo, setEditedInfo] = useState(teacherInfo);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        setProfilePicturePreview(imageUrl);
        setEditedInfo(prev => ({ ...prev, profilePicture: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setTeacherInfo(editedInfo);
    setIsEditing(false);
    setProfilePicturePreview(null);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedInfo(teacherInfo);
    setIsEditing(false);
    setProfilePicturePreview(null);
  };

  const handleArrayFieldChange = (field, value) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    setEditedInfo(prev => ({ ...prev, [field]: arrayValue }));
  };

  const currentInfo = isEditing ? editedInfo : teacherInfo;
  const displayImage = profilePicturePreview || currentInfo.profilePicture;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gradient-light-start)] to-[var(--gradient-light-end)] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white/50">
                <AvatarImage src={displayImage} alt={currentInfo.name} />
                <AvatarFallback className="text-lg">
                  {currentInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <div className="absolute -bottom-2 -right-2">
                  <label htmlFor="profile-picture" className="cursor-pointer">
                    <div className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                    </div>
                    <input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  {isEditing ? (
                    <Input
                      value={editedInfo.name}
                      onChange={(e) => setEditedInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-semibold mb-2 bg-white/50 dark:bg-black/50"
                    />
                  ) : (
                    <h1 className="text-3xl font-semibold mb-2">{currentInfo.name}</h1>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="default">{currentInfo.department}</Badge>
                    <Badge variant="outline">{currentInfo.experienceYears} years experience</Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{currentInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(currentInfo.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>{currentInfo.education}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>{currentInfo.officeLocation}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Specialization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Specializations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedInfo.specialization.join(', ')}
                    onChange={(e) => handleArrayFieldChange('specialization', e.target.value)}
                    placeholder="Enter specializations separated by commas"
                    className="min-h-[80px]"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {currentInfo.specialization.map((spec, index) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subjects Taught */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Subjects Taught</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedInfo.subjects.join(', ')}
                    onChange={(e) => handleArrayFieldChange('subjects', e.target.value)}
                    placeholder="Enter subjects separated by commas"
                    className="min-h-[80px]"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {currentInfo.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Experience Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Years of Experience</label>
                      <Input
                        type="number"
                        value={editedInfo.experienceYears}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, experienceYears: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Education</label>
                      <Input
                        value={editedInfo.education}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, education: e.target.value }))}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-semibold text-primary mb-2">
                        {currentInfo.experienceYears}
                      </div>
                      <p className="text-sm text-muted-foreground">Years of Teaching Experience</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-1">Education</p>
                      <p className="font-medium">{currentInfo.education}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Research Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Research Interests</span>
                </CardTitle>
                <CardDescription>
                  Areas of research and academic interest
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedInfo.researchInterests.join(', ')}
                    onChange={(e) => handleArrayFieldChange('researchInterests', e.target.value)}
                    placeholder="Enter research interests separated by commas"
                    className="min-h-[120px]"
                  />
                ) : (
                  <div className="space-y-2">
                    {currentInfo.researchInterests.map((interest, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{interest}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Biography</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedInfo.bio}
                    onChange={(e) => setEditedInfo(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Enter your biography"
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="text-sm leading-relaxed">{currentInfo.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number</label>
                      <Input
                        value={editedInfo.phoneNumber}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Office Location</label>
                      <Input
                        value={editedInfo.officeLocation}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, officeLocation: e.target.value }))}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{currentInfo.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Office</p>
                      <p className="font-medium">{currentInfo.officeLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{currentInfo.email}</p>
                    </div>
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