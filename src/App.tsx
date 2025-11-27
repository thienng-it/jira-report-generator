import { useState, useEffect } from 'react';
import { TicketGenerator } from './components/TicketGenerator';
import { VerifiedCommentGenerator } from './components/VerifiedCommentGenerator';
import { FileText, ClipboardCheck, Moon, Sun } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
  const [activeView, setActiveView] = useState<'ticket' | 'comment'>('ticket');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? 'dark gradient-bg-dark' : 'gradient-bg'} relative px-4 py-6 sm:p-6 md:p-8`}>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header with Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-white/30 backdrop-blur-xl shadow-lg">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight drop-shadow-lg">
              JiraGen
            </h1>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl text-white hover:bg-white/20 hover:text-white transition-all duration-300 hover:shadow-md"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <Button
            variant={activeView === 'ticket' ? 'default' : 'outline'}
            className={`flex items-center justify-center gap-2 h-11 md:h-12 px-4 md:px-6 rounded-xl transition-all duration-300 ${
              activeView === 'ticket'
                ? 'bg-white/35 hover:bg-white/45 text-white shadow-lg backdrop-blur-xl border border-white/40'
                : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-xl'
            }`}
            onClick={() => setActiveView('ticket')}
          >
            <FileText className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-semibold text-sm md:text-base">Ticket Templates</span>
          </Button>
          <Button
            variant={activeView === 'comment' ? 'default' : 'outline'}
            className={`flex items-center justify-center gap-2 h-11 md:h-12 px-4 md:px-6 rounded-xl transition-all duration-300 ${
              activeView === 'comment'
                ? 'bg-white/35 hover:bg-white/45 text-white shadow-lg backdrop-blur-xl border border-white/40'
                : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-xl'
            }`}
            onClick={() => setActiveView('comment')}
          >
            <ClipboardCheck className="h-4 w-4 md:h-5 md:w-5" />
            <span className="font-semibold text-sm md:text-base">Verified Comment</span>
          </Button>
        </div>

        {/* Page Title */}
        <div className="space-y-2 md:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
            {activeView === 'ticket' ? 'Ticket Templates' : 'Verified Comment Generator'}
          </h2>
          <p className="text-white/90 text-base md:text-lg font-normal tracking-tight">
            {activeView === 'ticket'
              ? 'Generate standardized descriptions for Bugs, Stories, Tasks, and Epics.'
              : 'Create consistent verification reports for your QA process.'}
          </p>
        </div>

        {/* Content */}
        {activeView === 'ticket' ? <TicketGenerator /> : <VerifiedCommentGenerator />}

        {/* Footer */}
        <footer className="pt-8 md:pt-12 text-center text-xs md:text-sm text-white/60 font-normal">
          <p>&copy; {new Date().getFullYear()} Jira Report Generator. Built for QA Excellence.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
