import React, { useState, useRef } from 'react';
import { Upload, Download, Trash2, FileText } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { jsPDF } from 'jspdf';

const Merger = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert('Veuillez sélectionner au moins 2 fichiers PDF');
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
      URL.revokeObjectURL(url);

      alert('PDF fusionné avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la fusion des PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf"
          multiple
          className="hidden"
        />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
        >
          Sélectionner des PDF
        </button>
        <p className="text-sm text-gray-500 mt-2">Ou glissez-déposez vos fichiers ici</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
              <button onClick={() => removeFile(index)} className="text-red-600 hover:text-red-700 p-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button 
            onClick={mergePDFs} 
            disabled={isProcessing}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium mt-4 disabled:opacity-50"
          >
            <Download className="w-5 h-5 inline mr-2" />
            {isProcessing ? 'Fusion en cours...' : `Fusionner les PDF (${files.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

const Compressor = () => {
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const compressPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Note: La compression réelle dépend du niveau choisi
      // Pour une vraie compression d'images dans le PDF, il faudrait une librairie plus avancée
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: compressionLevel === 'high',
      });

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed-${file.name}`;
      link.click();
      URL.revokeObjectURL(url);

      alert('PDF compressé avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la compression');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input type="file" onChange={handleFileSelect} accept=".pdf" className="hidden" id="pdf-compress" />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label htmlFor="pdf-compress" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium cursor-pointer inline-block">
          Sélectionner un PDF
        </label>
      </div>

      {file && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Niveau de compression</label>
            <select value={compressionLevel} onChange={(e) => setCompressionLevel(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option value="low">Faible (meilleure qualité)</option>
              <option value="medium">Moyen (recommandé)</option>
              <option value="high">Élevé (taille minimale)</option>
            </select>
          </div>

          <button 
            onClick={compressPDF}
            disabled={isProcessing}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium disabled:opacity-50"
          >
            <Download className="w-5 h-5 inline mr-2" />
            {isProcessing ? 'Compression en cours...' : 'Compresser le PDF'}
          </button>
        </div>
      )}
    </div>
  );
};

const ToImages = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('png');

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf" className="hidden" id="pdf-to-img" />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label htmlFor="pdf-to-img" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium cursor-pointer inline-block">
          Sélectionner un PDF
        </label>
      </div>

      {file && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">{file.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Format de sortie</label>
            <div className="flex gap-3">
              {['png', 'jpg', 'webp'].map((fmt) => (
                <button key={fmt} onClick={() => setFormat(fmt)} className={`flex-1 py-2 rounded-lg font-medium ${format === fmt ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              ℹ️ Cette fonctionnalité nécessite un rendu côté serveur. Pour une implémentation complète, utilisez pdf.js avec canvas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const FromImages = () => {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = (e) => {
    const newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]);
  };

  const createPDF = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(img);
        });

        if (i > 0) pdf.addPage();
        
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save('images-to-pdf.pdf');
      alert('PDF créé avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <input type="file" onChange={handleImageSelect} accept="image/*" multiple className="hidden" id="img-to-pdf" />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <label htmlFor="img-to-pdf" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium cursor-pointer inline-block">
          Sélectionner des Images
        </label>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={URL.createObjectURL(img)} alt={`Preview ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <button 
            onClick={createPDF}
            disabled={isProcessing}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium disabled:opacity-50"
          >
            <Download className="w-5 h-5 inline mr-2" />
            {isProcessing ? 'Création en cours...' : `Créer le PDF (${images.length} images)`}
          </button>
        </div>
      )}
    </div>
  );
};

export const PDFTools = {
  Merger,
  Compressor,
  ToImages,
  FromImages,
};
