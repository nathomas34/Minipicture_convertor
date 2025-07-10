import React, { useState, useEffect } from 'react';
import { Download, Settings2, Lock, Unlock } from 'lucide-react';
import { ImageFile, ConversionSettings, OutputFormat } from '../types';

interface ConversionPanelProps {
  selectedImage: ImageFile | null;
  onConvert: (settings: ConversionSettings) => void;
  onClose: () => void;
  isConverting: boolean;
}

export const ConversionPanel: React.FC<ConversionPanelProps> = ({
  selectedImage,
  onConvert,
  onClose,
  isConverting
}) => {
  const [settings, setSettings] = useState<ConversionSettings>({
    format: 'jpg',
    quality: 90,
    width: selectedImage?.currentWidth,
    height: selectedImage?.currentHeight,
    maintainAspectRatio: true
  });

  useEffect(() => {
    if (selectedImage) {
      setSettings(prev => ({
        ...prev,
        width: selectedImage.currentWidth,
        height: selectedImage.currentHeight
      }));
    }
  }, [selectedImage]);

  const handleWidthChange = (width: number) => {
    if (settings.maintainAspectRatio && selectedImage) {
      const height = Math.round(width / selectedImage.aspectRatio);
      setSettings(prev => ({ ...prev, width, height }));
    } else {
      setSettings(prev => ({ ...prev, width }));
    }
  };

  const handleHeightChange = (height: number) => {
    if (settings.maintainAspectRatio && selectedImage) {
      const width = Math.round(height * selectedImage.aspectRatio);
      setSettings(prev => ({ ...prev, width, height }));
    } else {
      setSettings(prev => ({ ...prev, height }));
    }
  };

  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Convertir et Redimensionner
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Preview */}
          <div className="text-center">
            <img
              src={selectedImage.preview}
              alt={selectedImage.file.name}
              className="w-32 h-32 object-cover rounded-lg mx-auto shadow-sm"
            />
            <p className="mt-2 text-sm text-gray-600 truncate">
              {selectedImage.file.name}
            </p>
          </div>

          {/* Output Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Format de Sortie
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['jpg', 'png', 'webp', 'pdf'] as OutputFormat[]).map((format) => (
                <button
                  key={format}
                  onClick={() => setSettings(prev => ({ ...prev, format }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    settings.format === format
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className="font-medium uppercase">{format}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Slider */}
          {(settings.format === 'jpg' || settings.format === 'webp') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Qualité : {settings.quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={settings.quality}
                onChange={(e) => setSettings(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          )}

          {/* Dimensions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Dimensions
              </label>
              <button
                onClick={() => setSettings(prev => ({ ...prev, maintainAspectRatio: !prev.maintainAspectRatio }))}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                  settings.maintainAspectRatio
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {settings.maintainAspectRatio ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  <Unlock className="w-3 h-3" />
                )}
                <span>Ratio d'Aspect</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Largeur</label>
                <input
                  type="number"
                  value={settings.width || ''}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Largeur"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Hauteur</label>
                <input
                  type="number"
                  value={settings.height || ''}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hauteur"
                />
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Original : {selectedImage.originalWidth} × {selectedImage.originalHeight}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={() => onConvert(settings)}
              disabled={isConverting || !settings.width || !settings.height}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>{isConverting ? 'Conversion...' : 'Convertir et Télécharger'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};