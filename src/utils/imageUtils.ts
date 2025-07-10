import { ImageFile, OutputFormat } from '../types';

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  });
};

export const resizeImage = (
  canvas: HTMLCanvasElement,
  sourceImage: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  quality: number = 0.9
): string => {
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  ctx.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);
  
  return canvas.toDataURL('image/jpeg', quality);
};

export const convertToFormat = (
  canvas: HTMLCanvasElement,
  format: OutputFormat,
  quality: number = 0.9
): string | Blob => {
  const ctx = canvas.getContext('2d')!;
  
  switch (format) {
    case 'jpg':
      return canvas.toDataURL('image/jpeg', quality);
    case 'png':
      return canvas.toDataURL('image/png');
    case 'webp':
      return canvas.toDataURL('image/webp', quality);
    case 'pdf':
      // For PDF, we'll return the canvas as a data URL and handle PDF creation in the component
      return canvas.toDataURL('image/jpeg', quality);
    default:
      return canvas.toDataURL('image/png');
  }
};

export const downloadFile = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};