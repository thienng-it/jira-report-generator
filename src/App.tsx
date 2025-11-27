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
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? 'gradient-bg-dark' : 'gradient-bg'} relative`}>
      <div className="flex h-screen overflow-hidden">
        {/* Apple-style Glass Sidebar */}
        <aside className={`w-72 ${darkMode ? 'bg-white/20 backdrop-blur-2xl' : 'bg-white/75 backdrop-blur-2xl'} border-r ${darkMode ? 'border-white/20' : 'border-white/40'} flex flex-col m-4 rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl`}>
          <div className={`p-8 border-b ${darkMode ? 'border-white/20' : 'border-white/30'}`}>
            <h1 className="text-2xl font-semibold text-white flex items-center gap-3 tracking-tight drop-shadow-lg">
              <div className="p-2 rounded-xl bg-white/30 backdrop-blur-xl shadow-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              JiraGen
            </h1>
          </div>

          <nav className="flex-1 p-6 space-y-3">
            <Button
              variant={activeView === 'ticket' ? 'default' : 'ghost'}
              className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${
                activeView === 'ticket' 
                  ? 'bg-white/35 hover:bg-white/45 text-white shadow-lg backdrop-blur-xl border border-white/40' 
                  : 'text-white/90 hover:bg-white/20 hover:text-white hover:shadow-md'
              }`}
              onClick={() => setActiveView('ticket')}
            >
              <FileText className="mr-3 h-5 w-5" />
              <span className="font-semibold">Ticket Templates</span>
            </Button>
            <Button
              variant={activeView === 'comment' ? 'default' : 'ghost'}
              className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${
                activeView === 'comment' 
                  ? 'bg-white/35 hover:bg-white/45 text-white shadow-lg backdrop-blur-xl border border-white/40' 
                  : 'text-white/90 hover:bg-white/20 hover:text-white hover:shadow-md'
              }`}
              onClick={() => setActiveView('comment')}
            >
              <ClipboardCheck className="mr-3 h-5 w-5" />
              <span className="font-semibold">Verified Comment</span>
            </Button>
          </nav>

          <div className={`p-6 border-t ${darkMode ? 'border-white/20' : 'border-white/30'}`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="w-full h-12 rounded-xl text-white hover:bg-white/20 hover:text-white transition-all duration-300 hover:shadow-md"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </aside>

        {/* Main Content with Apple-style spacing */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3 mb-8">
              <h2 className="text-4xl font-semibold tracking-tight text-white flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${darkMode ? 'bg-white/10' : 'bg-white/20'} backdrop-blur-xl`}>
                  {activeView === 'ticket' ? <FileText className="h-7 w-7 text-white" /> : <ClipboardCheck className="h-7 w-7 text-white" />}
                </div>
                {activeView === 'ticket' ? 'Ticket Templates' : 'Verified Comment Generator'}
              </h2>
              <p className="text-white/90 text-lg font-normal tracking-tight pl-1">
                {activeView === 'ticket'
                  ? 'Generate standardized descriptions for Bugs, Stories, Tasks, and Epics.'
                  : 'Create consistent verification reports for your QA process.'}
              </p>
            </div>

            {activeView === 'ticket' ? <TicketGenerator /> : <VerifiedCommentGenerator />}

            <footer className="pt-12 text-center text-sm text-white/60 font-normal">
              <p>&copy; {new Date().getFullYear()} Jira Report Generator. Built for QA Excellence.</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
