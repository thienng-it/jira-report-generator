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
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'gradient-bg-dark' : 'gradient-bg'}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-64 ${darkMode ? 'glass-dark' : 'glass'} border-r ${darkMode ? 'border-white/10' : 'border-white/30'} flex flex-col shadow-2xl`}>
          <div className={`p-6 border-b ${darkMode ? 'border-white/10' : 'border-white/30'}`}>
            <h1 className="text-xl font-bold text-white flex items-center gap-2 drop-shadow-lg">
              <FileText className="h-6 w-6 text-blue-400" />
              JiraGen
            </h1>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={activeView === 'ticket' ? 'default' : 'ghost'}
              className={`w-full justify-start ${activeView === 'ticket' ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              onClick={() => setActiveView('ticket')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Ticket Templates
            </Button>
            <Button
              variant={activeView === 'comment' ? 'default' : 'ghost'}
              className={`w-full justify-start ${activeView === 'comment' ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              onClick={() => setActiveView('comment')}
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Verified Comment
            </Button>
          </nav>

          <div className={`p-4 border-t ${darkMode ? 'border-white/10' : 'border-white/30'}`}>
            <div className="flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3 drop-shadow-lg">
                {activeView === 'ticket' ? <FileText className="h-8 w-8 text-blue-400" /> : <ClipboardCheck className="h-8 w-8 text-green-400" />}
                {activeView === 'ticket' ? 'Ticket Templates' : 'Verified Comment Generator'}
              </h2>
              <p className={`${darkMode ? 'text-white/70' : 'text-white/80'} drop-shadow`}>
                {activeView === 'ticket'
                  ? 'Generate standardized descriptions for Bugs, Stories, Tasks, and Epics.'
                  : 'Create consistent verification reports for your QA process.'}
              </p>
            </div>

            {activeView === 'ticket' ? <TicketGenerator /> : <VerifiedCommentGenerator />}

            <footer className={`pt-8 text-center text-sm ${darkMode ? 'text-white/50' : 'text-white/60'}`}>
              <p>&copy; {new Date().getFullYear()} Jira Report Generator. Built for QA Excellence.</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
