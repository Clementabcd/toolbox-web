import React from 'react';
import { ChevronRight } from 'lucide-react';

const ToolGrid = ({ tools, onSelectTool }) => {
  if (tools.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun outil trouvé</h3>
        <p className="text-gray-500">Essayez un autre terme de recherche</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map(tool => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1 text-left group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Icon className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">{tool.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{tool.desc}</p>
            <div className="text-xs text-indigo-600 font-medium flex items-center space-x-1">
              <span>Ouvrir l'outil</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ToolGrid;
