import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import CryptoJS from 'crypto-js';

const JSONFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('JSON invalide: ' + e.message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError('JSON invalide: ' + e.message);
      setOutput('');
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "example", "value": 123}' className="w-full h-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm" />

      <div className="flex gap-3">
        <button onClick={format} className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Formater</button>
        <button onClick={minify} className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">Minifier</button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

      {output && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Résultat:</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
              <Copy className="w-4 h-4" />
              <span>Copier</span>
            </button>
          </div>
          <pre className="text-sm overflow-auto font-mono">{output}</pre>
        </div>
      )}
    </div>
  );
};

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Erreur: ' + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('encode')} className={`flex-1 px-6 py-3 rounded-lg font-medium ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Encoder</button>
        <button onClick={() => setMode('decode')} className={`flex-1 px-6 py-3 rounded-lg font-medium ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Décoder</button>
      </div>

      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Texte à encoder...' : 'Base64 à décoder...'} className="w-full h-32 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm" />

      <button onClick={process} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">{mode === 'encode' ? 'Encoder' : 'Décoder'}</button>

      {output && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Résultat:</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
              <Copy className="w-4 h-4" />
              <span>Copier</span>
            </button>
          </div>
          <pre className="text-sm overflow-auto font-mono break-all">{output}</pre>
        </div>
      )}
    </div>
  );
};

const URLEncoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput('Erreur: ' + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMode('encode')} className={`flex-1 px-6 py-3 rounded-lg font-medium ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Encoder</button>
        <button onClick={() => setMode('decode')} className={`flex-1 px-6 py-3 rounded-lg font-medium ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Décoder</button>
      </div>

      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'URL à encoder...' : 'URL à décoder...'} className="w-full h-32 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm" />

      <button onClick={process} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">{mode === 'encode' ? 'Encoder' : 'Décoder'}</button>

      {output && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Résultat:</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
              <Copy className="w-4 h-4" />
              <span>Copier</span>
            </button>
          </div>
          <pre className="text-sm overflow-auto font-mono break-all">{output}</pre>
        </div>
      )}
    </div>
  );
};

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({});

  const generate = () => {
    if (!input) return;
    setHashes({
      md5: CryptoJS.MD5(input).toString(),
      sha1: CryptoJS.SHA1(input).toString(),
      sha256: CryptoJS.SHA256(input).toString(),
      sha512: CryptoJS.SHA512(input).toString(),
    });
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Texte à hasher..." className="w-full h-32 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none" />

      <button onClick={generate} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Générer les Hash</button>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 uppercase">{algo}:</span>
                <button onClick={() => navigator.clipboard.writeText(hash)} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
                  <Copy className="w-4 h-4" />
                  <span>Copier</span>
                </button>
              </div>
              <pre className="text-xs overflow-auto font-mono break-all">{hash}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const JWTDecoder = () => {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState('');

  const decode = () => {
    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) throw new Error('JWT invalide');
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      setDecoded({ header, payload });
      setError('');
    } catch (e) {
      setError('Erreur: ' + e.message);
      setDecoded(null);
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={jwt} onChange={(e) => setJwt(e.target.value)} placeholder="Collez votre JWT ici..." className="w-full h-32 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm" />

      <button onClick={decode} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Décoder JWT</button>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

      {decoded && (
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Header:</h4>
            <pre className="text-sm overflow-auto font-mono">{JSON.stringify(decoded.header, null, 2)}</pre>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Payload:</h4>
            <pre className="text-sm overflow-auto font-mono">{JSON.stringify(decoded.payload, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState([]);

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = [...testString.matchAll(regex)];
      setMatches(found.map((m) => ({ match: m[0], index: m.index })));
    } catch (e) {
      setMatches([{ error: e.message }]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Pattern regex..." className="col-span-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono" />
        <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="Flags" className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono" />
      </div>

      <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Texte à tester..." className="w-full h-32 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none" />

      <button onClick={test} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Tester Regex</button>

      {matches.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">{matches[0].error ? 'Erreur:' : `${matches.length} correspondance(s):`}</h4>
          {matches[0].error ? (
            <p className="text-red-600 text-sm">{matches[0].error}</p>
          ) : (
            <ul className="space-y-2">
              {matches.map((m, i) => (
                <li key={i} className="text-sm">
                  <span className="font-mono bg-indigo-100 px-2 py-1 rounded">{m.match}</span>
                  <span className="text-gray-600 ml-2">à la position {m.index}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export const DevTools = {
  JSONFormatter,
  Base64Tool,
  URLEncoder,
  HashGenerator,
  JWTDecoder,
  RegexTester,
};
