import { useState, useCallback } from 'react';
import { ImageFile, ConversionSettings, BatchConversionSettings } from '../types';
import { createImagePreview, getImageDimensions, resizeImage, convertToFormat, downloadFile } from '../utils/imageUtils';

export const useImageProcessor = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const addImages = useCallback(async (files: File[]) => {
    setIsProcessing(true);
    
    try {
      const newImages: ImageFile[] = [];
      
      for (const file of files) {
        const preview = await createImagePreview(file);
        const dimensions = await getImageDimensions(file);
        
        const imageFile: ImageFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          originalWidth: dimensions.width,
          originalHeight: dimensions.height,
          currentWidth: dimensions.width,
          currentHeight: dimensions.height,
          aspectRatio: dimensions.width / dimensions.height
        };
        
        newImages.push(imageFile);
      }
      
      setImages(prev => [...prev, ...newImages]);
    } catch (error) {
      console.error('Error processing images:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const convertImage = useCallback(async (imageId: string, settings: ConversionSettings) => {
    const image = images.find(img => img.id === imageId);
    if (!image) return;

    setIsConverting(true);

    try {
      const canvas = document.createElement('canvas');
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image.preview;
      });

      const targetWidth = settings.width || image.currentWidth;
      const targetHeight = settings.height || image.currentHeight;

      if (settings.format === 'pdf') {
        // For PDF conversion, we'll create a simple PDF with the image
        const resizedDataUrl = resizeImage(canvas, img, targetWidth, targetHeight, settings.quality / 100);
        
        // Create a simple PDF-like structure (this is a simplified approach)
        // In a real application, you might want to use a library like jsPDF
        const pdfContent = createSimplePDF(resizedDataUrl, targetWidth, targetHeight);
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        downloadFile(url, `${image.file.name.split('.')[0]}.pdf`);
        URL.revokeObjectURL(url);
      } else {
        const resizedDataUrl = resizeImage(canvas, img, targetWidth, targetHeight, settings.quality / 100);
        let finalDataUrl = resizedDataUrl;

        if (settings.format !== 'jpg') {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d')!;
          
          if (settings.format === 'png') {
            ctx.clearRect(0, 0, targetWidth, targetHeight);
          }
          
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          finalDataUrl = convertToFormat(canvas, settings.format, settings.quality / 100) as string;
        }

        const extension = settings.format === 'jpg' ? 'jpg' : settings.format;
        downloadFile(finalDataUrl, `${image.file.name.split('.')[0]}.${extension}`);
      }

      // Update the image dimensions in state
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, currentWidth: targetWidth, currentHeight: targetHeight }
          : img
      ));

    } catch (error) {
      console.error('Error converting image:', error);
    } finally {
      setIsConverting(false);
    }
  }, [images]);

  const downloadOriginal = useCallback((imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (!image) return;

    downloadFile(image.preview, image.file.name);
  }, [images]);

  const batchConvert = useCallback(async (settings: BatchConversionSettings) => {
    if (images.length === 0) return;

    setIsConverting(true);

    try {
      for (const image of images) {
        const canvas = document.createElement('canvas');
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = image.preview;
        });

        let targetWidth = image.currentWidth;
        let targetHeight = image.currentHeight;

        // Calculer les nouvelles dimensions selon le mode de redimensionnement
        if (settings.resizeMode !== 'none' && settings.maxWidth && settings.maxHeight) {
          const aspectRatio = image.aspectRatio;
          
          if (settings.resizeMode === 'fit') {
            // Ajuster pour s'adapter aux limites en maintenant le ratio
            const scaleWidth = settings.maxWidth / image.currentWidth;
            const scaleHeight = settings.maxHeight / image.currentHeight;
            const scale = Math.min(scaleWidth, scaleHeight);
            
            if (scale < 1) {
              targetWidth = Math.round(image.currentWidth * scale);
              targetHeight = Math.round(image.currentHeight * scale);
            }
          } else if (settings.resizeMode === 'fill') {
            // Remplir exactement les dimensions spécifiées
            if (settings.maintainAspectRatio) {
              const scaleWidth = settings.maxWidth / image.currentWidth;
              const scaleHeight = settings.maxHeight / image.currentHeight;
              const scale = Math.max(scaleWidth, scaleHeight);
              
              targetWidth = Math.round(image.currentWidth * scale);
              targetHeight = Math.round(image.currentHeight * scale);
            } else {
              targetWidth = settings.maxWidth;
              targetHeight = settings.maxHeight;
            }
          }
        }

        // Ajuster la qualité selon le niveau de compression
        let quality = settings.quality;
        switch (settings.compressionLevel) {
          case 'low':
            quality = Math.max(quality, 85);
            break;
          case 'medium':
            quality = Math.min(Math.max(quality, 70), 85);
            break;
          case 'high':
            quality = Math.min(quality, 70);
            break;
        }

        if (settings.format === 'pdf') {
          const resizedDataUrl = resizeImage(canvas, img, targetWidth, targetHeight, quality / 100);
          const pdfContent = createSimplePDF(resizedDataUrl, targetWidth, targetHeight);
          const blob = new Blob([pdfContent], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          downloadFile(url, `${image.file.name.split('.')[0]}.pdf`);
          URL.revokeObjectURL(url);
        } else {
          const resizedDataUrl = resizeImage(canvas, img, targetWidth, targetHeight, quality / 100);
          let finalDataUrl = resizedDataUrl;

          if (settings.format !== 'jpg') {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d')!;
            
            if (settings.format === 'png') {
              ctx.clearRect(0, 0, targetWidth, targetHeight);
            }
            
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            finalDataUrl = convertToFormat(canvas, settings.format, quality / 100) as string;
          }

          const extension = settings.format === 'jpg' ? 'jpg' : settings.format;
          downloadFile(finalDataUrl, `${image.file.name.split('.')[0]}_converted.${extension}`);
        }

        // Petite pause pour éviter de surcharger le navigateur
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Mettre à jour les dimensions dans l'état si nécessaire
      if (settings.resizeMode !== 'none') {
        setImages(prev => prev.map(img => {
          let newWidth = img.currentWidth;
          let newHeight = img.currentHeight;
          
          if (settings.maxWidth && settings.maxHeight) {
            if (settings.resizeMode === 'fit') {
              const scaleWidth = settings.maxWidth / img.currentWidth;
              const scaleHeight = settings.maxHeight / img.currentHeight;
              const scale = Math.min(scaleWidth, scaleHeight);
              
              if (scale < 1) {
                newWidth = Math.round(img.currentWidth * scale);
                newHeight = Math.round(img.currentHeight * scale);
              }
            } else if (settings.resizeMode === 'fill') {
              if (settings.maintainAspectRatio) {
                const scaleWidth = settings.maxWidth / img.currentWidth;
                const scaleHeight = settings.maxHeight / img.currentHeight;
                const scale = Math.max(scaleWidth, scaleHeight);
                
                newWidth = Math.round(img.currentWidth * scale);
                newHeight = Math.round(img.currentHeight * scale);
              } else {
                newWidth = settings.maxWidth;
                newHeight = settings.maxHeight;
              }
            }
          }
          
          return { ...img, currentWidth: newWidth, currentHeight: newHeight };
        }));
      }

    } catch (error) {
      console.error('Erreur lors de la conversion par lots:', error);
    } finally {
      setIsConverting(false);
    }
  }, [images]);

  return {
    images,
    isProcessing,
    isConverting,
    addImages,
    removeImage,
    convertImage,
    downloadOriginal,
    batchConvert
  };
};

// Simple PDF creation function (basic implementation)
const createSimplePDF = (imageDataUrl: string, width: number, height: number): string => {
  // This is a very basic PDF structure - in production, use a proper PDF library
  const pdfHeader = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 ${width} ${height}]
/Contents 4 0 R
/Resources <<
  /XObject <<
    /Im1 5 0 R
  >>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
q
${width} 0 0 ${height} 0 0 cm
/Im1 Do
Q
endstream
endobj

5 0 obj
<<
/Type /XObject
/Subtype /Image
/Width ${width}
/Height ${height}
/ColorSpace /DeviceRGB
/BitsPerComponent 8
/Filter /DCTDecode
/Length ${imageDataUrl.length}
>>
stream
${imageDataUrl}
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${500 + imageDataUrl.length}
%%EOF`;

  return pdfHeader;
};