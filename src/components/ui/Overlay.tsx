import type { ViewState } from '../../App';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { resumeData } from '../../data/resumeData';
import { ExternalLink, ChevronLeft } from 'lucide-react';

interface OverlayProps {
  currentView: ViewState;
  selectedProjectId: string | null;
  onNavigate: (view: ViewState, projectId?: string) => void;
}

export default function Overlay({ currentView, selectedProjectId, onNavigate }: OverlayProps) {
  
  const panelVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  const project = selectedProjectId ? resumeData.projects.find(p => p.id === selectedProjectId) : null;

  return (
    <div className="w-full h-full p-8 flex justify-end items-center pointer-events-none">
      <AnimatePresence mode="wait">
        
        {/* Personal Details */}
        {currentView === 'personal' && (
          <motion.div 
            key="personal"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-700 max-w-lg w-full shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-blossom-300 mb-2">{resumeData.name}</h2>
            <p className="text-xl text-slate-300 mb-6">{resumeData.title}</p>
            
            <h3 className="text-lg font-semibold text-white mb-2">Objective</h3>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">{resumeData.objective}</p>

            <h3 className="text-lg font-semibold text-white mb-2">Education</h3>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium text-blossom-200">{edu.institution}</p>
                <p className="text-sm text-slate-400">{edu.degree} | {edu.duration}</p>
              </div>
            ))}

            <h3 className="text-lg font-semibold text-white mb-2 mt-4">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.slice(0, 3).map(category => (
                category.skills.slice(0, 3).map((skill, idx) => (
                  <span key={`${category.category}-${idx}`} className="bg-slate-800 text-blossom-200 px-3 py-1 rounded-full text-xs border border-slate-700">
                    {skill}
                  </span>
                ))
              ))}
            </div>
          </motion.div>
        )}

        {/* Internship / Experience */}
        {currentView === 'internship' && (
          <motion.div 
            key="internship"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-700 max-w-lg w-full shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-blossom-300 mb-6">Experience</h2>
            <p className="text-slate-300">Seeking a software internship to apply engineering concepts and enhance operational efficiency.</p>
            <div className="mt-6 p-4 border border-blossom-500/30 bg-blossom-500/10 rounded-xl">
              <p className="text-sm text-blossom-100">Currently building extensive project portfolio and available for Fall 2026 Internships.</p>
            </div>
          </motion.div>
        )}

        {/* Projects Summary */}
        {currentView === 'projects' && (
          <motion.div 
            key="projects"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-700 max-w-lg w-full shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-blossom-300 mb-2">Projects</h2>
            <p className="text-slate-300 mb-6">Select a branch on the tree to view project details, or select from below.</p>
            
            <div className="flex flex-col gap-4">
              {resumeData.projects.map((proj) => (
                <button 
                  key={proj.id}
                  onClick={() => onNavigate('project-detail', proj.id)}
                  className="text-left p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-colors flex justify-between items-center"
                >
                  <span className="font-medium text-white">{proj.title}</span>
                  <ChevronLeft className="w-5 h-5 text-blossom-400 rotate-180" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Detail */}
        {currentView === 'project-detail' && project && (
          <motion.div 
            key={`project-${project.id}`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-700 max-w-lg w-full shadow-2xl flex flex-col max-h-[80vh] overflow-y-auto"
          >
            <button 
              onClick={() => onNavigate('projects')}
              className="mb-6 flex items-center text-sm text-slate-400 hover:text-white transition-colors self-start"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Projects
            </button>
            
            <h2 className="text-2xl font-bold text-blossom-300 mb-4">{project.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="bg-blossom-500/20 text-blossom-200 px-2 py-1 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>

            <ul className="list-disc pl-5 space-y-3 text-slate-300 text-sm mb-6">
              {project.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>

            {project.link && (
              <a 
                href={project.link === 'GitHub' ? `https://github.com/arghodeep` : project.link} 
                target="_blank" 
                rel="noreferrer"
                className="mt-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white py-3 rounded-xl transition-all"
              >
                View Project <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
