import { useState } from 'react';
import { TicketGenerator } from './components/TicketGenerator';
import { VerifiedCommentGenerator } from './components/VerifiedCommentGenerator';
import { FileText, ClipboardCheck, Moon, Sun } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
  const [activeView, setActiveView] = useState<'ticket' | 'comment'>('ticket');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              JiraGen
            </h1>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={activeView === 'ticket' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('ticket')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Ticket Templates
            </Button>
            <Button
              variant={activeView === 'comment' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveView('comment')}
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Verified Comment
            </Button>
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-3">
                {activeView === 'ticket' ? <FileText className="h-8 w-8 text-blue-600" /> : <ClipboardCheck className="h-8 w-8 text-green-600" />}
                {activeView === 'ticket' ? 'Ticket Templates' : 'Verified Comment Generator'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                {activeView === 'ticket'
                  ? 'Generate standardized descriptions for Bugs, Stories, Tasks, and Epics.'
                  : 'Create consistent verification reports for your QA process.'}
              </p>
            </div>

            {activeView === 'ticket' ? <TicketGenerator /> : <VerifiedCommentGenerator />}

            <footer className="pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              <p>&copy; {new Date().getFullYear()} Jira Report Generator. Built for QA Excellence.</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
