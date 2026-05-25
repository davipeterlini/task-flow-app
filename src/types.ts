export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  tags?: string[];
  status: TaskStatus;
  dueDate?: string;
  subtasks?: Task[];
  linkedRepos?: string[];
  timeSpent?: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface PomodoroSession {
  taskId?: string;
  startedAt: Date;
  duration: number;
  type: "work" | "break";
  completed: boolean;
}

export type View = "home" | "kanban" | "list" | "calendar" | "today" | "settings";

export interface AppSettings {
  theme: "dark" | "light";
  language: "pt-BR" | "en";
}
