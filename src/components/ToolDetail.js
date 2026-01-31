import React from 'react';
import { ChevronLeft } from 'lucide-react';

const ToolDetail = ({ tool, onBack }) => {
  const ToolComponent = tool.component;
  const Icon = tool.icon;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 pb-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
            <Icon className="w-7 h-7 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{tool.name}</h2>
            <p className="text-gray-600">{tool.desc}</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all flex items-center space-x-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>
      </div>
      
      <div className="py-6">
        <ToolComponent />
      </div>
    </div>
  );
};

export default ToolDetail;
