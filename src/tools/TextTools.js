import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const WordCounter = () => {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.split('\n').length,
    paragraphs: text.trim() ? text.split(/\n\n+/).length : 0,
    readingTime: Math.ceil((text.trim().split(/\s+/).length || 0) / 200),
  };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Écrivez ou collez votre texte ici..." className="w-full h-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600">{stats.words}</div>
          <div className="text-sm text-gray-600">Mots</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{stats.characters}</div>
          <div className="text-sm text-gray-600">Caractères</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-pink-600">{stats.charactersNoSpaces}</div>
          <div className="text-sm text-gray-600">Sans espaces</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.lines}</div>
          <div className="text-sm text-gray-600">Lignes</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.paragraphs}</div>
          <div className="text-sm text-gray-600">Paragraphes</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{stats.readingTime} min</div>
          <div className="text-sm text-gray-600">Temps lecture</div>
        </div>
      </div>
    </div>
  );
};

const CaseConverter = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const transform = (type) => {
    switch (type) {
      case 'upper': setResult(text.toUpperCase()); break;
      case 'lower': setResult(text.toLowerCase()); break;
      case 'title': setResult(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())); break;
      case 'sentence': setResult(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()); break;
      case 'camel': setResult(text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '')); break;
      case 'snake': setResult(text.toLowerCase().replace(/\s+/g, '_')); break;
      default: break;
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Entrez votre texte..." className="w-full h-32 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button onClick={() => transform('upper')} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 font-medium">MAJUSCULES</button>
        <button onClick={() => transform('lower')} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium">minuscules</button>
        <button onClick={() => transform('title')} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 font-medium">Title Case</button>
        <button onClick={() => transform('sentence')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium">Sentence case</button>
        <button onClick={() => transform('camel')} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium">camelCase</button>
        <button onClick={() => transform('snake')} className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 font-medium">snake_case</button>
      </div>

      {result && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Résultat:</span>
            <button onClick={() => navigator.clipboard.writeText(result)} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
              <Copy className="w-4 h-4" />
              <span>Copier</span>
            </button>
          </div>
          <p className="text-gray-900">{result}</p>
        </div>
      )}
    </div>
  );
};

const Diff = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Texte 1</label>
          <textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Premier texte..." className="w-full h-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Texte 2</label>
          <textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Deuxième texte..." className="w-full h-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>
      </div>

      {text1 && text2 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">Statistiques:</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Texte 1: {text1.length} caractères</div>
            <div>Texte 2: {text2.length} caractères</div>
            <div className="col-span-2">Similarité: {text1 === text2 ? '100%' : Math.round((1 - Math.abs(text1.length - text2.length) / Math.max(text1.length, text2.length)) * 100) + '%'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoremGenerator = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [generated, setGenerated] = useState('');

  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  const generate = () => {
    let result = '';
    if (type === 'paragraphs') {
      result = Array(parseInt(count)).fill(lorem).join('\n\n');
    } else if (type === 'sentences') {
      const sentences = lorem.split('. ');
      result = Array(parseInt(count)).fill(null).map(() => sentences[Math.floor(Math.random() * sentences.length)]).join('. ') + '.';
    } else {
      const words = lorem.split(' ');
      result = Array(parseInt(count)).fill(null).map(() => words[Math.floor(Math.random() * words.length)]).join(' ');
    }
    setGenerated(result);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="100" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="paragraphs">Paragraphes</option>
            <option value="sentences">Phrases</option>
            <option value="words">Mots</option>
          </select>
        </div>
      </div>

      <button onClick={generate} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Générer Lorem Ipsum</button>

      {generated && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Résultat:</span>
            <button onClick={() => navigator.clipboard.writeText(generated)} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
              <Copy className="w-4 h-4" />
              <span>Copier</span>
            </button>
          </div>
          <p className="text-gray-900 whitespace-pre-wrap">{generated}</p>
        </div>
      )}
    </div>
  );
};

export const TextTools = {
  WordCounter,
  CaseConverter,
  Diff,
  LoremGenerator,
};
