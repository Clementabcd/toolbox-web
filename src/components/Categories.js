import React from 'react';

const Categories = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {categories.map(cat => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
