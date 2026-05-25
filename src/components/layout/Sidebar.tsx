import React from "react";
import { Home, Calendar, List, Kanban, Target, Settings } from "lucide-react";
import type { View } from "../../types";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems: { id: View; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "kanban", label: "Kanban", icon: Kanban },
    { id: "list", label: "Lista", icon: List },
    { id: "calendar", label: "Calendario", icon: Calendar },
    { id: "today", label: "Hoje", icon: Target },
    { id: "settings", label: "Configuracoes", icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-56 bg-gray-800 border-r border-gray-700 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-700">
        <span className="hidden md:block font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Task Flow
        </span>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              currentView === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <item.icon size={18} />
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
