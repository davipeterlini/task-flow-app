import React, { useState, lazy, Suspense } from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { LoginScreen } from "./components/auth/LoginScreen";
import { useAuth } from "./contexts/AuthContext";
import type { View } from "./types";

const HomeView = lazy(() =>
  import("./components/views/HomeView").then((m) => ({ default: m.HomeView })),
);

const App: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<View>("home");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            {currentView === "home" && <HomeView />}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
