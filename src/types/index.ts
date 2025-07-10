export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  originalWidth: number;
  originalHeight: number;
  currentWidth: number;
  currentHeight: number;
  aspectRatio: number;
}

export type OutputFormat = 'pdf' | 'jpg' | 'png' | 'webp';

export interface ConversionSettings {
  format: OutputFormat;
  quality: number;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}

export interface BatchConversionSettings {
  format: OutputFormat;
  quality: number;
  resizeMode: 'none' | 'fit' | 'fill';
  maxWidth?: number;
  maxHeight?: number;
  compressionLevel: 'low' | 'medium' | 'high';
  maintainAspectRatio: boolean;
}