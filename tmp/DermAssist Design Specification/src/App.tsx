import React, { useState } from 'react';
import { LandingPage } from './components/landing-page';
import { SubmissionFlow } from './components/submission-flow';
import { PracticeFeed } from './components/practice-feed';
import { AdminPortal } from './components/admin-portal';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'submission' | 'feed' | 'admin'>('landing');
  const [userType, setUserType] = useState<'provider' | 'admin' | null>(null);

  const handleNavigation = (view: 'landing' | 'submission' | 'feed' | 'admin', type?: 'provider' | 'admin') => {
    setCurrentView(view);
    if (type) setUserType(type);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigation} />;
      case 'submission':
        return <SubmissionFlow onNavigate={handleNavigation} />;
      case 'feed':
        return <PracticeFeed onNavigate={handleNavigation} />;
      case 'admin':
        return <AdminPortal onNavigate={handleNavigation} />;
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentView()}
    </div>
  );
}