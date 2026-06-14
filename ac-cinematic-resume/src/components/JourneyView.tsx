import React, { useState } from 'react';
import { EXPERIENCES, PROJECTS } from '../data';
import { Experience, Project } from '../types';
import { Briefcase, Layers, Cpu, ShieldAlert, CheckCircle, ExternalLink, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JourneyViewProps {}

export const JourneyView: React.FC<JourneyViewProps> = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [activeExpTab, setActiveExpTab] = useState<string>(EXPERIENCES[0].id);

  const accents = {
    textPink: 'text-primary',
    textMuted: 'text-text-muted',
    borderActive: 'border-primary/50',
    shadowActive: 'shadow-[0_0_15px_rgba(255,180,206,0.1)]',
    badgeActive: 'bg-primary/20 text-primary border-primary/40',
    timelinePulse: 'bg-primary shadow-[0_0_8px_rgba(255,180,206,0.8)]',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left" id="journey-tab-main-viewport">
      
      {/* LEFT SECTION (Col 1 to 7): Work Experience Timeline */}
      <div className="lg:col-span-7 space-y-6" id="journey-career-timeline-deck">
        <div className="glass-panel whisper-border rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-sans tracking-widest text-text-primary font-medium uppercase inline-flex items-center gap-2">
            <Briefcase className={`w-3.5 h-3.5 ${accents.textPink}`} />
            CAREER CHRONOLOGY
          </h3>

          <div className="relative pl-6 border-l border-slate-800/60 ml-3 space-y-8" id="experience-vertical-tree">
            {EXPERIENCES.map((exp, index) => {
              const isActive = activeExpTab === exp.id;
              return (
                <div key={exp.id} className="relative group cursor-pointer" onClick={() => setActiveExpTab(exp.id)}>
                  
                  {/* Timeline bullet nodes with pulse */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-35 ${isActive ? accents.timelinePulse : 'bg-slate-700'}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? accents.timelinePulse : 'bg-slate-800'}`} />
                  </span>

                  <div className={`p-4 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? `bg-surface-bright border-primary/20 ${accents.shadowActive}` 
                      : 'border-transparent hover:bg-surface/40 hover:border-outline-variant/20'
                  }`}>
                    {/* Position Headers */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                      <div>
                        <h4 className="text-sm font-sans font-medium text-text-primary group-hover:text-primary transition-colors">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-text-muted">
                          <span className={accents.textPink}>{exp.company}</span>
                          <span className="text-outline">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-surface whisper-border px-2.5 py-0.5 rounded-lg text-text-muted">
                        {exp.period}
                      </span>
                    </div>

                    {/* Timeline Achievements - animated drawer */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 space-y-3"
                        >
                          <p className="text-xs text-text-muted font-sans leading-relaxed border-t border-whisper-border pt-3">
                            {exp.description}
                          </p>

                          <ul className="space-y-1.5 pl-1.5">
                            {exp.achievements.map((ach, ai) => (
                              <li key={ai} className="text-[11px] text-text-muted leading-relaxed font-sans flex items-start gap-2">
                                <span className={`text-base leading-none select-none mt-0.5 shrink-0 ${accents.textPink}`}>›</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech capsules */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.technologies.map((t) => (
                              <span key={t} className="text-[10px] font-mono uppercase bg-surface whisper-border px-2 py-0.5 text-text-muted rounded-lg text-center">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credentials / Core Accomplishments Box */}
        <div className="glass-panel whisper-border rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" id="certifications-quick-telemetry">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-surface whisper-border rounded-lg">
              <Award className={`w-4 h-4 ${accents.textPink}`} />
            </div>
            <div>
              <h4 className="text-xs font-sans font-medium uppercase text-text-primary">
                LATEST CREDENTIALS UNLOCKED
              </h4>
              <p className="text-[10px] font-mono text-text-muted">
                SECURE AUTH: COMPLIANT_CORE_W3 // AWS_CLOUD_ARCH
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-[10px] font-mono text-text-muted">
            <span className="py-1 px-2 bg-surface whisper-border rounded-lg">
              VITE_ARCH_2026
            </span>
            <span className="py-1 px-2 bg-surface whisper-border rounded-lg text-secondary">
              SYSSEC_OK
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (Col 8 to 12): Interactive Project diagnostic selector */}
      <div className="lg:col-span-5 space-y-6" id="projects-diagnostic-lab">
        <div className="glass-panel whisper-border rounded-2xl p-6 flex flex-col justify-between h-full space-y-4">
          
          <div className="space-y-4">
            <h3 className="text-sm font-sans tracking-widest text-text-primary font-medium uppercase inline-flex items-center gap-2">
              <Layers className={`w-3.5 h-3.5 ${accents.textPink}`} />
              PROJECT DIAGNOSTICS
            </h3>

            <p className="text-xs text-text-muted leading-relaxed">
              Select an experimental project node below to initialize full software telemetry logs and stack parameters.
            </p>

            {/* Flat node list for project selectors */}
            <div className="space-y-2 pt-2">
              {PROJECTS.map((proj) => {
                const isActive = selectedProject.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`w-full text-left p-3 rounded-xl font-mono transition-all outline-none duration-300 border flex items-center justify-between cursor-pointer ${
                      isActive
                        ? `bg-surface-bright ${accents.borderActive} ${accents.shadowActive}`
                        : 'bg-surface/60 whisper-border text-text-muted hover:bg-surface-bright hover:text-text-primary'
                    }`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] tracking-widest font-sans font-medium uppercase text-text-primary">
                        {proj.title}
                      </span>
                      <span className="text-[10px] text-text-muted tracking-wider">
                        {proj.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border leading-none ${
                        proj.status === 'ACTIVE' 
                          ? 'border-secondary/30 text-secondary bg-secondary/10' 
                          : 'border-tertiary/30 text-tertiary bg-tertiary/10'
                      }`}>
                        {proj.status}
                      </span>
                      <span className="text-outline-variant text-xs text-right select-none">&gt;</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Holographic Diagnostic report representing chosen project */}
          <div className="glass-panel whisper-border rounded-xl p-4 space-y-4 text-left" id="selected-telemetry-viewplate bg-[#db2777]/30">
            <div className="flex justify-between items-center border-b border-whisper-border pb-2 text-[10px] font-mono text-text-muted">
              <span className="tracking-widest">DIAG_SYS_v1.07</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-2.5 h-2.5 text-secondary" />
                INTEGRITY_STABLE
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-sans font-semibold text-text-primary tracking-wide uppercase">
                {selectedProject.title}
              </h4>
              <p className="text-[10px] text-text-muted font-sans leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Metrics data array */}
            <div className="grid grid-cols-3 gap-2 border-t border-whisper-border pt-3 text-[10px] font-mono">
              {selectedProject.metrics.map((met, mi) => (
                <div key={mi} className="bg-surface p-1.5 rounded-lg whisper-border flex flex-col items-start">
                  <span className="text-text-muted block">{met.label}</span>
                  <span className={`font-semibold block ${accents.textPink}`}>{met.value}</span>
                </div>
              ))}
            </div>

            {/* Project Stack Tags */}
            <div className="flex flex-wrap gap-1">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono tracking-widest bg-surface/40 text-text-muted whisper-border px-2 py-0.5 rounded-lg uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
