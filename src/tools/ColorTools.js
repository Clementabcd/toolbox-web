import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

const PaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#6366f1');
  const [palette, setPalette] = useState([]);

  const generatePalette = () => {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const colors = [];
    for (let i = 0; i < 5; i++) {
      const factor = 0.3 + i * 0.175;
      colors.push({
        hex: `#${Math.round(r * factor).toString(16).padStart(2, '0')}${Math.round(g * factor).toString(16).padStart(2, '0')}${Math.round(b * factor).toString(16).padStart(2, '0')}`,
        name: `Shade ${i + 1}`,
      });
    }
    colors.push({
      hex: `#${(255 - r).toString(16).padStart(2, '0')}${(255 - g).toString(16).padStart(2, '0')}${(255 - b).toString(16).padStart(2, '0')}`,
      name: 'Complémentaire',
    });
    setPalette(colors);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-24 h-24 rounded-lg border-4 border-white shadow-lg cursor-pointer" />
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Couleur de base</label>
          <input type="text" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono" />
          <button onClick={generatePalette} className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Générer Palette</button>
        </div>
      </div>

      {palette.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {palette.map((color, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={() => navigator.clipboard.writeText(color.hex)}>
              <div className="h-32" style={{ backgroundColor: color.hex }} />
              <div className="bg-white p-3">
                <p className="font-mono text-sm font-bold">{color.hex}</p>
                <p className="text-xs text-gray-600">{color.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Converter = () => {
  const [color, setColor] = useState('#6366f1');
  const [conversions, setConversions] = useState(null);

  useEffect(() => {
    if (!color) return;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === rNorm) h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
      else if (max === gNorm) h = ((bNorm - rNorm) / d + 2) / 6;
      else if (max === bNorm) h = ((rNorm - gNorm) / d + 4) / 6;
      else h = 0; // default fallback
    }

    setConversions({
      hex: color.toUpperCase(),
      rgb: `rgb(${r}, ${g}, ${b})`,
      rgba: `rgba(${r}, ${g}, ${b}, 1)`,
      hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      hsla: `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, 1)`,
    });
  }, [color]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-start">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-24 h-24 rounded-lg border-4 border-white shadow-lg cursor-pointer" />
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Couleur</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono" />
        </div>
      </div>

      {conversions && (
        <div className="space-y-3">
          {Object.entries(conversions).map(([format, value]) => (
            <div key={format} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-700 uppercase">{format}:</span>
                  <p className="font-mono text-gray-900 mt-1">{value}</p>
                </div>
                <button onClick={() => navigator.clipboard.writeText(value)} className="text-indigo-600 hover:text-indigo-700 p-2">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const GradientGenerator = () => {
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#a855f7');
  const [direction, setDirection] = useState('to right');
  const [css, setCss] = useState('');

  useEffect(() => {
    setCss(`background: linear-gradient(${direction}, ${color1}, ${color2});`);
  }, [color1, color2, direction]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Couleur 1</label>
          <div className="flex gap-2">
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-16 h-12 rounded-lg border-2 border-white shadow cursor-pointer" />
            <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Couleur 2</label>
          <div className="flex gap-2">
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-16 h-12 rounded-lg border-2 border-white shadow cursor-pointer" />
            <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Direction</label>
        <select value={direction} onChange={(e) => setDirection(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="to right">Horizontal →</option>
          <option value="to left">Horizontal ←</option>
          <option value="to bottom">Vertical ↓</option>
          <option value="to top">Vertical ↑</option>
          <option value="to bottom right">Diagonal ↘</option>
          <option value="to top right">Diagonal ↗</option>
        </select>
      </div>

      <div className="h-48 rounded-lg shadow-lg" style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }} />

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Code CSS:</span>
          <button onClick={() => navigator.clipboard.writeText(css)} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center space-x-1">
            <Copy className="w-4 h-4" />
            <span>Copier</span>
          </button>
        </div>
        <pre className="text-sm font-mono text-gray-900">{css}</pre>
      </div>
    </div>
  );
};

const ContrastChecker = () => {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [ratio, setRatio] = useState(null);

  useEffect(() => {
    const getLuminance = (hex) => {
      const rgb = parseInt(hex.replace('#', ''), 16);
      const r = ((rgb >> 16) & 0xff) / 255;
      const g = ((rgb >> 8) & 0xff) / 255;
      const b = (rgb & 0xff) / 255;
      const [rs, gs, bs] = [r, g, b].map((c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const contrastRatio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    setRatio({
      value: contrastRatio.toFixed(2),
      wcagAA: contrastRatio >= 4.5,
      wcagAAA: contrastRatio >= 7,
      wcagAALarge: contrastRatio >= 3,
      wcagAAALarge: contrastRatio >= 4.5,
    });
  }, [foreground, background]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Texte</label>
          <div className="flex gap-2">
            <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} className="w-16 h-12 rounded-lg border-2 border-white shadow cursor-pointer" />
            <input type="text" value={foreground} onChange={(e) => setForeground(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Fond</label>
          <div className="flex gap-2">
            <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} className="w-16 h-12 rounded-lg border-2 border-white shadow cursor-pointer" />
            <input type="text" value={background} onChange={(e) => setBackground(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm" />
          </div>
        </div>
      </div>

      <div className="p-8 rounded-lg text-center" style={{ backgroundColor: background, color: foreground }}>
        <h3 className="text-2xl font-bold mb-2">Exemple de texte</h3>
        <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
      </div>

      {ratio && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-2">{ratio.value}:1</div>
            <div className="text-sm text-gray-600">Ratio de contraste</div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'WCAG AA (texte normal)', passes: ratio.wcagAA },
              { label: 'WCAG AAA (texte normal)', passes: ratio.wcagAAA }
            ].map((test, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{test.label}</span>
                {test.passes ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                    <Check className="w-4 h-4 mr-1" /> Conforme
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Non conforme</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ColorTools = {
  PaletteGenerator,
  Converter,
  GradientGenerator,
  ContrastChecker,
};
