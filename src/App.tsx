import React, { useState } from 'react';
import { ImageIcon, Zap, Download, Settings } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { ImagePreview } from './components/ImagePreview';
import { ConversionPanel } from './components/ConversionPanel';
import { BatchConversionPanel } from './components/BatchConversionPanel';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useImageProcessor } from './hooks/useImageProcessor';
import { useDarkMode } from './hooks/useDarkMode';
import { ImageFile } from './types';

function App() {
  const {
    images,
    isProcessing,
    isConverting,
    addImages,
    removeImage,
    convertImage,
    batchConvert,
    downloadOriginal
  } = useImageProcessor();

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [showBatchPanel, setShowBatchPanel] = useState(false);

  const handleEdit = (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (image) {
      setSelectedImage(image);
    }
  };

  const handleConvert = (settings: any) => {
    if (selectedImage) {
      convertImage(selectedImage.id, settings);
      setSelectedImage(null);
    }
  };

  const handleBatchConvert = (settings: any) => {
    batchConvert(settings);
    setShowBatchPanel(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Convertisseur d'Images Pro
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Convertissez, redimensionnez et optimisez vos images
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
              
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Traitement Rapide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-blue-500" />
                  <span>Options Avancées</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-green-500" />
                  <span>Formats Multiples</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {images.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFilesSelected={addImages} isProcessing={isProcessing} />
            
            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Formats Multiples</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Convertissez en JPG, PNG, WebP ou PDF avec une sortie haute qualité
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Redimensionnement Intelligent</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Redimensionnez les images avec contrôle du ratio et paramètres de qualité
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Traitement par Lots</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Téléchargez et traitez plusieurs images à la fois pour plus d'efficacité
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {images.length} image{images.length !== 1 ? 's' : ''} chargée{images.length !== 1 ? 's' : ''}
                </span>
                {images.length > 1 && (
                  <button
                    onClick={() => setShowBatchPanel(true)}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                  >
                    Convertir par lots
                  </button>
                )}
              </div>
              
              <FileUpload onFilesSelected={addImages} isProcessing={isProcessing} />
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <ImagePreview
                  key={image.id}
                  image={image}
                  onRemove={removeImage}
                  onEdit={handleEdit}
                  onDownload={downloadOriginal}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Conversion Panel */}
      {selectedImage && (
        <ConversionPanel
          selectedImage={selectedImage}
          onConvert={handleConvert}
          onClose={() => setSelectedImage(null)}
          isConverting={isConverting}
        />
      )}

      {/* Batch Conversion Panel */}
      {showBatchPanel && (
        <BatchConversionPanel
          imageCount={images.length}
          onBatchConvert={handleBatchConvert}
          onClose={() => setShowBatchPanel(false)}
          isConverting={isConverting}
        />
      )}
      {/* Footer */}
      <footer className="mt-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p className="text-sm">
              Développé avec React, TypeScript et Tailwind CSS. 
              Tout le traitement se fait dans votre navigateur - vos images ne quittent jamais votre appareil.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;