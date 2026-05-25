import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";

export const HomeView: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Bem-vindo, {user?.name?.split(" ")[0] || "Usuario"}!
        </h2>
        <p className="text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Continue de onde parou ou inicie uma nova sessao de trabalho.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <CheckCircle className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Tarefas Concluidas</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-violet-500/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-violet-500/20 p-3 rounded-lg">
              <Clock className="text-violet-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Horas em Pomodoro</p>
              <p className="text-2xl font-bold text-white">0h</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Produtividade</p>
              <p className="text-2xl font-bold text-white">+0%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Inicie um Pomodoro
        </h3>
        <p className="text-gray-400 mb-4">
          Foque em suas tarefas com intervalos de trabalho e descanso.
        </p>
        <button className="bg-gradient-to-r from-blue-500 to-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Comecar Sessao
        </button>
      </div>
    </div>
  );
};
