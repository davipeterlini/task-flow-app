import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center px-6 justify-between flex-shrink-0">
      <h1 className="text-lg font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Task Flow App
      </h1>
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{user.email}</span>
          <button
            onClick={signOut}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
};
