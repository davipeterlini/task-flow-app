# Task Flow App

AI-powered task management inspired by Notion/Linear. Kanban boards, smart task breakdown, AI-enhanced descriptions, and productivity tools (Pomodoro timer).

## Tech Stack

- **React 19** + TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Vitest** + Testing Library for tests
- **Google OAuth** for authentication
- **Google Gemini** for AI features
- **Cloud Run** for deployment

## Features

- Kanban board with drag-and-drop
- List, Calendar, and Today views
- AI-powered task breakdown
- Pomodoro timer with idle tracking
- Google Calendar and GitHub integrations

## Setup Local

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## Deployment

The app deploys automatically to Google Cloud Run via GitHub Actions:

- Push to `develop` branch triggers tests
- Manual workflow dispatch for dev deployment
- Tag push (`v*`) triggers production deployment

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login screen
│   ├── layout/         # Header, Sidebar
│   └── views/          # Page components
├── contexts/           # React contexts (Auth, Toast, Language)
├── services/           # Storage service
└── types.ts           # TypeScript types
```
