import React, { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generate = async () => {
    if (!text) return;
    try {
      const url = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: { dark: '#000000', light: '#FFFFFF' }
      });
      setQrCode(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="URL, texte, vCard, WiFi..." className="w-full h-32 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none" />

      <button onClick={generate} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-medium">Générer QR Code</button>

      {qrCode && (
        <div className="bg-white p-8 rounded-lg text-center shadow-lg">
          <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
          <a href={qrCode} download="qrcode.png" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium inline-flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Télécharger</span>
          </a>
        </div>
      )}
    </div>
  );
};

const BarcodeGenerator = () => {
  const [text, setText] = useState('');
  const [format, setFormat] = useState('CODE128');
  const canvasRef = useRef(null);
  const [barcodeGenerated, setBarcodeGenerated] = useState(false);

  useEffect(() => {
    if (text && canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, text, {
          format: format,
          width: 2,
          height: 100,
          displayValue: true
        });
        setBarcodeGenerated(true);
      } catch (err) {
        console.error('Erreur génération code-barres:', err);
        setBarcodeGenerated(false);
      }
    }
  }, [text, format]);

  const downloadBarcode = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'barcode.png';
    link.click();
  };

  return (
    <div className="space-y-4">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Texte ou numéro pour code-barres..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />

      <div>
        <label className="block text-sm font-medium mb-2">Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
          <option value="CODE128">Code 128</option>
          <option value="EAN13">EAN-13 (13 chiffres)</option>
          <option value="UPC">UPC (12 chiffres)</option>
          <option value="CODE39">Code 39</option>
        </select>
      </div>

      {text && (
        <div className="bg-white p-8 rounded-lg text-center shadow-lg">
          <canvas ref={canvasRef} className="mx-auto mb-4"></canvas>
          <p className="text-sm text-gray-600 mb-4">Format: {format}</p>
          {barcodeGenerated && (
            <button onClick={downloadBarcode} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium inline-flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Télécharger</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const QRTools = {
  QRGenerator,
  BarcodeGenerator,
};
