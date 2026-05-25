const GOOGLE_CLIENT_ID =
  (window as any).__ENV__?.VITE_GOOGLE_CLIENT_ID ||
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "";

const GEMINI_API_KEY =
  (window as any).__ENV__?.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || "";

export const config = {
  googleClientId: GOOGLE_CLIENT_ID,
  geminiApiKey: GEMINI_API_KEY,
  appVersion: import.meta.env.APP_VERSION || "0.1.0",
  environment: import.meta.env.MODE || "development",
};
