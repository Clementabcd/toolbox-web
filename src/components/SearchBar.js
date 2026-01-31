import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un outil... (PDF, image, texte, code...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-5 pl-14 bg-white rounded-2xl shadow-xl border-2 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-lg transition-all"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
