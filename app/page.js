import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SimpleNavigation } from './components/SimpleNavigation';
import { AuthForm } from './components/auth/AuthForm';
import { StudentPage } from './components/pages/StudentPage';
import { TeacherPage } from './components/pages/TeacherPage';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [showTeacherProfile, setShowTeacherProfile] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderPage = () => {
    switch (user.role) {
      case 'student':
        return <StudentPage />;
      case 'teacher':
        return <TeacherPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentPage />;
    }
  };

  const handleProfileClick = () => {
    if (user?.role === 'teacher') {
      setShowTeacherProfile(true);
    }
  };

  return (
    <div className="min-h-screen">
      <SimpleNavigation onProfileClick={handleProfileClick} />
      <main>
        {renderPage()}
      </main>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}