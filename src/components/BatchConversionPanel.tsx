import React, { useState } from 'react';
import { Download, Settings2, Layers, Minimize2, Compass as Compress } from 'lucide-react';
import { OutputFormat, BatchConversionSettings } from '../types';

interface BatchConversionPanelProps {
  imageCount: number;
  onBatchConvert: (settings: BatchConversionSettings) => void;
  onClose: () => void;
  isConverting: boolean;
}

export const BatchConversionPanel: React.FC<BatchConversionPanelProps> = ({
  imageCount,
  onBatchConvert,
  onClose,
  isConverting
}) => {
  const [settings, setSettings] = useState<BatchConversionSettings>({
    format: 'jpg',
    quality: 85,
    resizeMode: 'none',
    maxWidth: 1920,
    maxHeight: 1080,
    compressionLevel: 'medium',
    maintainAspectRatio: true
  });

  const handleSubmit = () => {
    onBatchConvert(settings);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Conversion par Lots
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
              aria-label="Fermer le panneau"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Convertir {imageCount} image{imageCount > 1 ? 's' : ''} avec les mêmes paramètres
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Format de sortie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Format de Sortie
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['jpg', 'png', 'webp', 'pdf'] as OutputFormat[]).map((format) => (
                <button
                  key={format}
                  onClick={() => setSettings(prev => ({ ...prev, format }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    settings.format === format
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="font-medium uppercase">{format}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Qualité */}
          {(settings.format === 'jpg' || settings.format === 'webp') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Qualité : {settings.quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={settings.quality}
                onChange={(e) => setSettings(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Faible</span>
                <span>Élevée</span>
              </div>
            </div>
          )}

          {/* Mode de redimensionnement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Minimize2 className="w-4 h-4 inline mr-2" />
              Redimensionnement
            </label>
            <div className="space-y-2">
              {[
                { value: 'none', label: 'Aucun redimensionnement', desc: 'Garder les tailles originales' },
                { value: 'fit', label: 'Ajuster aux dimensions', desc: 'Redimensionner pour s\'adapter aux limites' },
                { value: 'fill', label: 'Remplir les dimensions', desc: 'Redimensionner pour remplir exactement' }
              ].map((mode) => (
                <label key={mode.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="resizeMode"
                    value={mode.value}
                    checked={settings.resizeMode === mode.value}
                    onChange={(e) => setSettings(prev => ({ ...prev, resizeMode: e.target.value as any }))}
                    className="mt-1 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{mode.label}</div>
                    <div className="text-xs text-gray-500">{mode.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Dimensions maximales */}
          {settings.resizeMode !== 'none' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dimensions Maximales
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Largeur Max</label>
                  <input
                    type="number"
                    value={settings.maxWidth || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxWidth: parseInt(e.target.value) || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1920"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hauteur Max</label>
                  <input
                    type="number"
                    value={settings.maxHeight || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxHeight: parseInt(e.target.value) || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1080"
                  />
                </div>
              </div>
              <label className="flex items-center space-x-2 mt-3">
                <input
                  type="checkbox"
                  checked={settings.maintainAspectRatio}
                  onChange={(e) => setSettings(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Maintenir le ratio d'aspect</span>
              </label>
            </div>
          )}

          {/* Niveau de compression */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Compress className="w-4 h-4 inline mr-2" />
              Niveau de Compression
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'low', label: 'Faible', desc: 'Qualité maximale' },
                { value: 'medium', label: 'Moyen', desc: 'Équilibré' },
                { value: 'high', label: 'Élevé', desc: 'Taille minimale' }
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSettings(prev => ({ ...prev, compressionLevel: level.value as any }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    settings.compressionLevel === level.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-medium text-sm">{level.label}</div>
                  <div className="text-xs opacity-75">{level.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={isConverting}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <Download className="w-4 h-4" />
              <span>
                {isConverting 
                  ? 'Conversion en cours...' 
                  : `Convertir ${imageCount} image${imageCount > 1 ? 's' : ''}`
                }
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};