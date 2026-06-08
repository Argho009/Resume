export interface Project {
  id: string;
  title: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  objective: string;
  education: {
    institution: string;
    degree: string;
    duration: string;
    location: string;
  }[];
  certifications: string[];
  skills: SkillCategory[];
  projects: Project[];
}

export const resumeData: ResumeData = {
  name: "Arghodeep Chowdhury",
  title: "Software Engineer",
  contact: {
    location: "Raipur, C.G",
    phone: "(+91) 9031269629",
    email: "arghodeep2006@gmail.com",
    linkedin: "LinkedIn",
    github: "GitHub"
  },
  objective: "Computer Science student at Shri Shankaracharya Institute of Professional Management & Technology, graduating in 2026, with hands-on experience in full-stack and AI/ML development. Proficient in Python, TypeScript, C++, and frameworks including FastAPI and React. Built and deployed an AI-driven volunteer coordination platform and an automated data cleaning agent. Seeking a software internship to apply engineering concepts and enhance operational efficiency.",
  education: [
    {
      institution: "Shri Shankaracharya Institute of Professional Management & Technology",
      degree: "Computer Science Engineering",
      duration: "2022 - 2026",
      location: "Raipur, C.G"
    }
  ],
  certifications: [
    "Machine Learning with AI Training – Internshala Trainings: Oct 2025 - Score: 78% - Certificate No.: 79s5vaff7m0",
    "Project Development Competition Finalist – SSIPMT, Raipur: Aug 2023"
  ],
  skills: [
    {
      category: "Languages",
      skills: ["Python", "JavaScript", "TypeScript", "C/C++"]
    },
    {
      category: "Frontend",
      skills: ["React 19", "Next.js 14", "Tailwind CSS", "Vite", "Svelte"]
    },
    {
      category: "Backend",
      skills: ["FastAPI", "Hono (Cloudflare Workers)", "Express.js"]
    },
    {
      category: "Database",
      skills: ["MongoDB", "SQLite", "Cloudflare D1", "Supabase"]
    },
    {
      category: "AI/ML",
      skills: ["Google Gemini API", "Groq Llama 3.3", "TensorFlow", "Data Analytics"]
    },
    {
      category: "Infrastructure & DevOps",
      skills: ["Cloudflare Workers", "Google Cloud Run", "Docker", "Git", "Version Control Systems"]
    },
    {
      category: "Practices",
      skills: ["Testing", "Code Reviews", "Debugging"]
    }
  ],
  projects: [
    {
      id: "aegis",
      title: "Aegis: Predictive Volunteer Coordination Platform",
      description: [
        "Implemented FastAPI backend and Next.js 14 frontend, leveraging Git for version control and conducting code reviews.",
        "Dual AI models: Gemini 2.0 Flash (multimodal) and Groq Llama 3.3 70B (text reasoning).",
        "Emotion-triggered escalation and 72-hour crisis prediction with offline SMS fallback.",
        "Containerized deployment on Google Cloud Run using Docker, integrated geospatial features and Redis caching."
      ],
      technologies: ["FastAPI", "Next.js 14", "Gemini 2.0 Flash", "Groq Llama 3.3", "Docker", "Google Cloud Run", "Redis"],
      link: "GitHub"
    },
    {
      id: "attendance",
      title: "College Attendance Management System",
      description: [
        "Built a multi-role web app using React 19 with TypeScript and Tailwind CSS for Admin, HOD, Teacher, and Student interfaces.",
        "Complete attendance tracking with condonation workflow and OCR integration.",
        "Implemented JWT authentication with role-based access control and wrote unit tests to validate authorization flows.",
        "Deployed on Cloudflare Workers with D1 database and R2 storage."
      ],
      technologies: ["React 19", "TypeScript", "Tailwind CSS", "JWT", "Cloudflare Workers", "D1", "R2", "OCR"],
      link: "GitHub"
    },
    {
      id: "data-cleaning",
      title: "Data Cleaning Agent (OpenEnv)",
      description: [
        "FastAPI environment for real-world data quality benchmarking.",
        "Procedural data scenarios with automated graders and interpretable rewards.",
        "Actions: fix_dates, remove_duplicates, fill_nulls, standardize, detect_outliers.",
        "Docker containerized for Hugging Face Spaces deployment."
      ],
      technologies: ["FastAPI", "Python", "Data Analytics", "Docker", "Hugging Face Spaces"],
      link: "GitHub"
    }
  ]
};
