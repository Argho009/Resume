import { useState } from 'react';
import type { ViewState } from '../../App';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Download } from 'lucide-react';

interface NavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState, projectId?: string) => void;
}

export default function NavigationControls({ currentView, onNavigate }: NavProps) {
  const [downloadCount, setDownloadCount] = useState(0);

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    // In a real app, this would trigger an actual download or link to the PDF in public folder.
    const link = document.createElement('a');
    link.href = '/ARGHODEEP CHOWDHURY_Software Intern Fall 2026_20260525.pdf';
    link.download = 'Arghodeep_Chowdhury_Resume.pdf';
    link.click();
  };

  return (
    <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none">
      
      {/* Home / Back Button */}
      <div className="pointer-events-auto">
        <AnimatePresence>
          {currentView !== 'home' && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => onNavigate('home')}
              className="bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-white p-3 rounded-full shadow-lg backdrop-blur-md transition-all flex items-center justify-center"
              title="Return Home"
            >
              <Home className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Download Button */}
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        <button
          onClick={handleDownload}
          className="group bg-blossom-600 hover:bg-blossom-500 text-white px-5 py-3 rounded-full shadow-lg shadow-blossom-500/20 transition-all flex items-center gap-2 font-medium"
        >
          <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span>Download Resume</span>
        </button>
        {downloadCount > 0 && (
          <span className="text-xs text-slate-400 bg-slate-900/80 px-2 py-1 rounded-md backdrop-blur-sm">
            Downloaded {downloadCount} time{downloadCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

    </div>
  );
}
