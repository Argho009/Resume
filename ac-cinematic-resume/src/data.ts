import { Experience, Project, SystemLog } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Creative Technical Architect',
    company: 'AC CINEMATIC ARTS',
    period: '2022 - PRESENT',
    location: 'TOKYO, JP',
    description: 'Lead design and development of immersive, high-performance visual frameworks, procedural canvases, and real-time interactive user interfaces for international cinema and AAA branding experiences.',
    achievements: [
      'Engineered interactive shader-based canvas modules resolving 60fps on low-tier mobile devices, boosting user session duration by 45%.',
      'Orchestrated UI guidelines for major cinematic interactive platforms integrating motion, React, and Canvas matrices.',
      'Redefined visual rendering pipelines utilizing customized WebGL shaders resulting in an 80% decrease in initial asset overhead.'
    ],
    technologies: ['React 19', 'WebGL / Shaders', 'Framer Motion', 'Tailwind CSS', 'TypeScript', 'Vite']
  },
  {
    id: 'exp-2',
    role: 'Senior Interaction Engineer',
    company: 'OPTIC LABS',
    period: '2020 - 2022',
    location: 'SAN FRANCISCO, CA',
    description: 'Devised fluid, stateful user experiences and high-fidelity interaction architectures for real-time telemetry analytics dashboards and visual telemetry feeds.',
    achievements: [
      'Spearheaded research and development of custom state synchronization hooks for high-bandwidth streaming endpoints.',
      'Designed and deployed responsive data visualization charts (using SVG + dynamic Canvas) mapping millions of telemetry coordinate sets.',
      'Collaborated closely with visual artists to translate complex custom designs and micro-animations into production-ready Web code.'
    ],
    technologies: ['React', 'D3.js', 'Canvas API', 'Tailwind', 'Redux Toolkit', 'Node.js']
  },
  {
    id: 'exp-3',
    role: 'Creative Frontend Developer',
    company: 'NEURAL NEXUS DESIGN',
    period: '2018 - 2020',
    location: 'REMOTE',
    description: 'Crafted bespoke digital experiences and websites for creative agencies, independent movies, and artistic collectives, pushing the boundaries of web UI.',
    achievements: [
      'Built custom 3D web layouts with interactive scroll mechanics and viewport triggers using vanilla Canvas and CSS 3D capabilities.',
      'Developed and published reusable React motion-preset libraries reducing animation development time by 30%.',
      'Optimized layout performance score to 100% on Lighthouse across all customer websites.'
    ],
    technologies: ['Vanilla JS', 'SASS / CSS 3D', 'React', 'TweenMax / GSAP', 'Web Audio API']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Project Nebula Core',
    category: 'Procedural Visual Engine',
    status: 'ACTIVE',
    description: 'An interactive WebGL cosmic starfield and cluster simulator that generates millions of stars dynamically reacting to audio frequencies.',
    imageSeed: 'nebula_core',
    metrics: [
      { label: 'RENDER TIME', value: '1.42ms' },
      { label: 'PARTICLE COUNT', value: '2.5M' },
      { label: 'BANDWIDTH', value: 'OPTIMAL' }
    ],
    tags: ['WebGL', 'Audio Analyzer', '3D Math']
  },
  {
    id: 'proj-2',
    title: 'Horizon HUD Frame',
    category: 'Telemetry Interface',
    status: 'ACTIVE',
    description: 'A React component ecosystem for sci-fi interface designers offering fully functional responsive vector grids, telemetry trackers, and high-contrast widgets.',
    imageSeed: 'horizon_hud',
    metrics: [
      { label: 'FPS RATIO', value: '60 / 60' },
      { label: 'UI DENSITY', value: 'HIGH' },
      { label: 'DEPENDENCIES', value: 'NONE' }
    ],
    tags: ['React 19', 'SVG Vectors', 'Tailwind']
  },
  {
    id: 'proj-3',
    title: 'Neural Decay Synth',
    category: 'Web Audio Synthesizer',
    status: 'STANDBY',
    description: 'A web-native monophonic synthesizer generating warm, dark cyberpunk-inspired square/saw wave basslines with adjustable lowpass filter sweeps.',
    imageSeed: 'decay_synth',
    metrics: [
      { label: 'SAMPLING', value: '48.0 kHz' },
      { label: 'LATENCY', value: '2.4ms' },
      { label: 'OSCILLATORS', value: 'TRI-CORE' }
    ],
    tags: ['Web Audio API', 'Oscillator Nodes', 'Filter Envelopes']
  }
];

export const SYSTEM_LOGS_MOCKED: SystemLog[] = [
  { id: '1', text: 'LOAD MODULE_ALPHA ... OK', status: 'OK', timestamp: '' },
  { id: '2', text: 'SYNC CHROMATIC_ABERRATION ... 98%', status: 'ACTIVE', timestamp: '' },
  { id: '3', text: 'RENDER LUNAR_SURFACE ... ACTIVE', status: 'ACTIVE', timestamp: '' },
  { id: '4', text: 'AWAITING USER INPUT_', status: 'PENDING', timestamp: '' },
];
