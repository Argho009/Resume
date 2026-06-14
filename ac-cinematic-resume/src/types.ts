export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  location: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'STANDBY';
  description: string;
  imageSeed: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface SystemLog {
  id: string;
  text: string;
  status: 'OK' | 'WARNING' | 'ACTIVE' | 'PENDING' | 'ERROR';
  timestamp: string;
}

export interface TelemetryData {
  latitude: string;
  longitude: string;
  elevation: string;
  temperature: string;
  pressure: string;
  status: string;
  fps: number;
}
