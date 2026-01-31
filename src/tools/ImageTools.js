import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';

const Compressor = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [quality, setQuality] = useState(80);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const compressImage = () => {
    if (!image || !preview) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `compressed-${image.name}`;
          link.click();
          URL.revokeObjectURL(url);
        },
        'image/jpeg',
        quality / 100
      );
    };
    img.src = preview;
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input type="file" onChange={handleImageSelect} accept="image/*" className="hidden" id="img-compress" />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label htmlFor="img-compress" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium cursor-pointer inline-block">
          Sélectionner une Image
        </label>
      </div>

      {preview && (
        <div className="space-y-4">
          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-lg" />

          <div>
            <label className="block text-sm font-medium mb-2">Qualité: {quality}%</label>
            <input type="range" min="1" max="100" value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full" />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Taille originale:</span>
              <span className="font-medium">{(image.size / 1024).toFixed(2)} KB</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Taille estimée:</span>
              <span className="font-medium text-green-600">{((image.size / 1024) * (quality / 100)).toFixed(2)} KB</span>
            </div>
          </div>

          <button onClick={compressImage} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">
            <Download className="w-5 h-5 inline mr-2" />
            Compresser l'Image
          </button>
        </div>
      )}
    </div>
  );
};

const Resizer = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [maintainRatio, setMaintainRatio] = useState(true);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
      };
      img.src = URL.createObjectURL(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleWidthChange = (newWidth) => {
    setWidth(newWidth);
    if (maintainRatio && originalWidth && originalHeight) {
      setHeight(Math.round((newWidth / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (newHeight) => {
    setHeight(newHeight);
    if (maintainRatio && originalWidth && originalHeight) {
      setWidth(Math.round((newHeight / originalHeight) * originalWidth));
    }
  };

  const resizeImage = () => {
    if (!image || !preview) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, parseInt(width), parseInt(height));

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resized-${image.name}`;
        link.click();
        URL.revokeObjectURL(url);
      });
    };
    img.src = preview;
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input type="file" onChange={handleImageSelect} accept="image/*" className="hidden" id="img-resize" />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label htmlFor="img-resize" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium cursor-pointer inline-block">
          Sélectionner une Image
        </label>
      </div>

      {preview && (
        <div className="space-y-4">
          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-lg" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Largeur (px)</label>
              <input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hauteur (px)</label>
              <input type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm">Conserver les proportions</span>
          </label>

          <button onClick={resizeImage} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">
            <Download className="w-5 h-5 inline mr-2" />
            Redimensionner
          </button>
        </div>
      )}
    </div>
  );
};

const Converter = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState('png');

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const convertImage = () => {
    if (!image || !preview) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `converted.${format}`;
        link.click();
        URL.revokeObjectURL(url);
      }, mimeType);
    };
    img.src = preview;
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input type="file" onChange={handleImageSelect} accept="image/*" className="hidden" id="img-convert" />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label htmlFor="img-convert" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium cursor-pointer inline-block">
          Sélectionner une Image
        </label>
      </div>

      {preview && (
        <div className="space-y-4">
          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-lg" />

          <div>
            <label className="block text-sm font-medium mb-2">Convertir en</label>
            <div className="grid grid-cols-4 gap-3">
              {['png', 'jpg', 'webp', 'bmp'].map((fmt) => (
                <button key={fmt} onClick={() => setFormat(fmt)} className={`py-2 rounded-lg font-medium ${format === fmt ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button onClick={convertImage} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">
            <Download className="w-5 h-5 inline mr-2" />
            Convertir en {format.toUpperCase()}
          </button>
        </div>
      )}
    </div>
  );
};

const Filters = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [filter, setFilter] = useState('none');

  const filters = [
    { name: 'none', label: 'Original', css: '' },
    { name: 'grayscale', label: 'N&B', css: 'grayscale(100%)' },
    { name: 'sepia', label: 'Sépia', css: 'sepia(100%)' },
    { name: 'blur', label: 'Flou', css: 'blur(5px)' },
    { name: 'brightness', label: 'Lumineux', css: 'brightness(150%)' },
    { name: 'contrast', label: 'Contraste', css: 'contrast(150%)' },
    { name: 'saturate', label: 'Saturé', css: 'saturate(200%)' },
    { name: 'invert', label: 'Inversé', css: 'invert(100%)' },
  ];

  const applyFilter = () => {
    if (!image || !preview) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.filter = filters.find((f) => f.name === filter)?.css || '';
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `filtered-${image.name}`;
        link.click();
        URL.revokeObjectURL(url);
      });
    };
    img.src = preview;
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input type="file" onChange={(e) => { const file = e.target.files[0]; if (file) { setImage(file); setPreview(URL.createObjectURL(file)); } }} accept="image/*" className="hidden" id="img-filter" />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label htmlFor="img-filter" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium cursor-pointer inline-block">
          Sélectionner une Image
        </label>
      </div>

      {preview && (
        <div className="space-y-4">
          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-lg transition-all" style={{ filter: filters.find((f) => f.name === filter)?.css }} />

          <div className="grid grid-cols-4 gap-2">
            {filters.map((f) => (
              <button key={f.name} onClick={() => setFilter(f.name)} className={`py-2 px-3 rounded-lg text-sm font-medium ${filter === f.name ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {f.label}
              </button>
            ))}
          </div>

          <button onClick={applyFilter} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">
            <Download className="w-5 h-5 inline mr-2" />
            Télécharger avec Filtre
          </button>
        </div>
      )}
    </div>
  );
};

export const ImageTools = {
  Compressor,
  Resizer,
  Converter,
  Filters,
};
