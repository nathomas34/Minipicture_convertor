import React from 'react';
import { X, Download, Settings } from 'lucide-react';
import { ImageFile } from '../types';
import { formatFileSize } from '../utils/imageUtils';

interface ImagePreviewProps {
  image: ImageFile;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
  onDownload: (id: string) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  onRemove,
  onEdit,
  onDownload
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="relative group">
        <img
          src={image.preview}
          alt={image.file.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
            <button
              onClick={() => onEdit(image.id)}
              className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Modifier l'image"
              aria-label="Modifier l'image"
            >
              <Settings className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
            <button
              onClick={() => onDownload(image.id)}
              className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Télécharger l'image"
              aria-label="Télécharger l'image"
            >
              <Download className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
            <button
              onClick={() => onRemove(image.id)}
              className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              title="Supprimer l'image"
              aria-label="Supprimer l'image"
            >
              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white truncate mb-2">
          {image.file.name}
        </h3>
        <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Taille :</span>
            <span>{formatFileSize(image.file.size)}</span>
          </div>
          <div className="flex justify-between">
            <span>Dimensions :</span>
            <span>{image.currentWidth} × {image.currentHeight}</span>
          </div>
          <div className="flex justify-between">
            <span>Format :</span>
            <span className="uppercase font-medium">{image.file.type.split('/')[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};