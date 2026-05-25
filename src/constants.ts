export const APP_NAME = "Task Flow App";
export const APP_VERSION = "0.1.0";

export const TASK_STATUS_LABELS: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export const PRIORITY_LABELS: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const PRIORITY_COLORS: Record<string, string> = {
  low: "text-green-500",
  medium: "text-amber-500",
  high: "text-red-500",
};
