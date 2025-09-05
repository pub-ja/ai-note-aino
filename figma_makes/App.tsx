import { useState } from 'react';
import { Onboarding } from './components/onboarding';
import { MainSelection } from './components/main-selection';
import { Chat } from './components/chat';
import { Notes } from './components/notes';
import { Diary } from './components/diary';
import { Calendar } from './components/calendar';
import { BottomNavigation } from './components/bottom-navigation';

type Page = 'onboarding' | 'main-selection' | 'chat' | 'notes' | 'diary' | 'calendar';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('onboarding');

  const handleOnboardingComplete = () => {
    setCurrentPage('main-selection');
  };

  const handleFeatureSelect = (feature: 'chat' | 'notes' | 'diary') => {
    setCurrentPage(feature);
  };

  const handlePageChange = (page: 'chat' | 'notes' | 'diary' | 'calendar') => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'main-selection':
        return <MainSelection onFeatureSelect={handleFeatureSelect} />;
      case 'chat':
        return <Chat />;
      case 'notes':
        return <Notes />;
      case 'diary':
        return <Diary />;
      case 'calendar':
        return <Calendar />;
      default:
        return <Chat />;
    }
  };

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto bg-background border-x border-gray-200">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderPage()}
      </div>

      {/* Bottom Navigation - Hidden during onboarding and main selection */}
      {currentPage !== 'onboarding' && currentPage !== 'main-selection' && (
        <BottomNavigation 
          currentPage={currentPage as 'chat' | 'notes' | 'diary' | 'calendar'} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
}