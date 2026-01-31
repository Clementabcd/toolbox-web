import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = ({ toolCount }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ToolBox Web
              </h1>
              <p className="text-sm text-gray-600 mt-1">La boîte à outils ultime · 30+ outils gratuits</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <div className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium">
              {toolCount} outils
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
