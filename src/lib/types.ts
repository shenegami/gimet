export type Role = "admin" | "manager" | "viewer";

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  status: "on-track" | "at-risk" | "delayed";
  progress: number;
  dueDate: string;
  summary: string;
  ownerId: string;
  members: TeamMember[];
  issues: string[];
  files: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
  size: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  createdAt: string;
}

export interface AIInsight {
  id: string;
  type: "risk" | "summary" | "recommendation";
  title: string;
  description: string;
  relatedProjectId?: string;
}

export interface Report {
  id: string;
  weekOf: string;
  highlights: string[];
  risks: string[];
  recommendations: string[];
  summary: string;
}

export interface WorkspaceSnapshot {
  metrics: {
    totalProjects: number;
    activeAlerts: number;
    completionRate: number;
    aiReports: number;
  };
  projects: Project[];
  insights: AIInsight[];
  notifications: NotificationItem[];
  reports: Report[];
  members: TeamMember[];
}
