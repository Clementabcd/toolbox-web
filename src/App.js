import React, { useState } from 'react';
import { Sparkles, FileText, Image, Type, Code, Calculator, QrCode, Palette } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import ToolGrid from './components/ToolGrid';
import ToolDetail from './components/ToolDetail';
import Footer from './components/Footer';

// Import des outils
import { PDFTools } from './tools/PDFTools';
import { ImageTools } from './tools/ImageTools';
import { TextTools } from './tools/TextTools';
import { DevTools } from './tools/DevTools';
import { CalcTools } from './tools/CalcTools';
import { QRTools } from './tools/QRTools';
import { ColorTools } from './tools/ColorTools';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTool, setActiveTool] = useState(null);

  const categories = [
    { id: 'all', name: 'Tous', icon: Sparkles },
    { id: 'pdf', name: 'PDF', icon: FileText },
    { id: 'image', name: 'Images', icon: Image },
    { id: 'text', name: 'Texte', icon: Type },
    { id: 'dev', name: 'Dev Tools', icon: Code },
    { id: 'calc', name: 'Calculs', icon: Calculator },
    { id: 'qr', name: 'QR & Codes', icon: QrCode },
    { id: 'color', name: 'Couleurs', icon: Palette },
  ];

  const tools = [
    { id: 'pdf-merge', name: 'Fusionner PDF', category: 'pdf', icon: FileText, desc: 'Combinez plusieurs PDFs', component: PDFTools.Merger },
    { id: 'pdf-compress', name: 'Compresser PDF', category: 'pdf', icon: FileText, desc: 'Réduisez la taille', component: PDFTools.Compressor },
    { id: 'pdf-to-images', name: 'PDF vers Images', category: 'pdf', icon: Image, desc: 'Convertissez en images', component: PDFTools.ToImages },
    { id: 'images-to-pdf', name: 'Images vers PDF', category: 'pdf', icon: FileText, desc: 'Créez un PDF', component: PDFTools.FromImages },
    
    { id: 'image-compress', name: 'Compresser Image', category: 'image', icon: Image, desc: 'Réduisez la taille', component: ImageTools.Compressor },
    { id: 'image-resize', name: 'Redimensionner', category: 'image', icon: Image, desc: 'Changez les dimensions', component: ImageTools.Resizer },
    { id: 'image-convert', name: 'Convertir Format', category: 'image', icon: Image, desc: 'PNG, JPG, WEBP...', component: ImageTools.Converter },
    { id: 'image-filters', name: 'Filtres Photo', category: 'image', icon: Palette, desc: 'Appliquez des filtres', component: ImageTools.Filters },
    
    { id: 'word-counter', name: 'Compteur Mots', category: 'text', icon: Type, desc: 'Comptez mots, caractères', component: TextTools.WordCounter },
    { id: 'text-case', name: 'Casse Texte', category: 'text', icon: Type, desc: 'MAJUSCULES, minuscules', component: TextTools.CaseConverter },
    { id: 'text-diff', name: 'Différence Texte', category: 'text', icon: Code, desc: 'Comparez deux textes', component: TextTools.Diff },
    { id: 'lorem-generator', name: 'Lorem Ipsum', category: 'text', icon: FileText, desc: 'Texte de remplissage', component: TextTools.LoremGenerator },
    
    { id: 'json-formatter', name: 'JSON Formatter', category: 'dev', icon: Code, desc: 'Formatez JSON', component: DevTools.JSONFormatter },
    { id: 'base64', name: 'Base64', category: 'dev', icon: Code, desc: 'Encode/Décode', component: DevTools.Base64Tool },
    { id: 'url-encoder', name: 'URL Encoder', category: 'dev', icon: Code, desc: 'Encode/Décode URLs', component: DevTools.URLEncoder },
    { id: 'hash-generator', name: 'Hash Generator', category: 'dev', icon: Code, desc: 'SHA-256, MD5...', component: DevTools.HashGenerator },
    { id: 'jwt-decoder', name: 'JWT Decoder', category: 'dev', icon: Code, desc: 'Décodez JWT', component: DevTools.JWTDecoder },
    { id: 'regex-tester', name: 'RegEx Tester', category: 'dev', icon: Code, desc: 'Testez regex', component: DevTools.RegexTester },
    
    { id: 'calculator', name: 'Calculatrice', category: 'calc', icon: Calculator, desc: 'Calculatrice avancée', component: CalcTools.Calculator },
    { id: 'unit-converter', name: 'Convertisseur', category: 'calc', icon: Calculator, desc: 'Unités diverses', component: CalcTools.UnitConverter },
    { id: 'percentage', name: 'Pourcentage', category: 'calc', icon: Calculator, desc: 'Calculez %', component: CalcTools.PercentageCalc },
    { id: 'vat-calculator', name: 'TVA Calculator', category: 'calc', icon: Calculator, desc: 'Ajouter/retirer TVA', component: CalcTools.VATCalculator },
    { id: 'bmi-calculator', name: 'IMC Calculator', category: 'calc', icon: Calculator, desc: 'Calculez IMC', component: CalcTools.BMICalculator },
    
    { id: 'qr-generator', name: 'Générateur QR', category: 'qr', icon: QrCode, desc: 'Créez QR codes', component: QRTools.QRGenerator },
    { id: 'barcode-generator', name: 'Code-Barres', category: 'qr', icon: QrCode, desc: 'Codes-barres', component: QRTools.BarcodeGenerator },
    
    { id: 'color-palette', name: 'Palette Couleurs', category: 'color', icon: Palette, desc: 'Générez palettes', component: ColorTools.PaletteGenerator },
    { id: 'color-converter', name: 'Convertisseur', category: 'color', icon: Palette, desc: 'HEX, RGB, HSL', component: ColorTools.Converter },
    { id: 'gradient-generator', name: 'Dégradé CSS', category: 'color', icon: Palette, desc: 'Créez dégradés', component: ColorTools.GradientGenerator },
    { id: 'contrast-checker', name: 'Contraste Checker', category: 'color', icon: Palette, desc: 'WCAG accessibilité', component: ColorTools.ContrastChecker },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header toolCount={filteredTools.length} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeTool ? (
          <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <ToolGrid tools={filteredTools} onSelectTool={setActiveTool} />
          </>
        ) : (
          <ToolDetail tool={activeTool} onBack={() => setActiveTool(null)} />
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
