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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
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
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              title="Modifier l'image"
            >
              <Settings className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => onDownload(image.id)}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              title="Télécharger l'image"
            >
              <Download className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => onRemove(image.id)}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
              title="Supprimer l'image"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate mb-2">
          {image.file.name}
        </h3>
        <div className="space-y-1 text-sm text-gray-500">
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
            <span className="uppercase">{image.file.type.split('/')[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};