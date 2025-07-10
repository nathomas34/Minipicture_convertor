# Documentation API - Convertisseur d'Images Pro

Cette documentation détaille toutes les APIs internes, les hooks, les utilitaires et les interfaces de l'application.

## 📋 Table des Matières

- [Hook Principal](#-hook-principal-useimageprocessor)
- [Utilitaires d'Images](#-utilitaires-dimages-imageutilsts)
- [Types et Interfaces](#-types-et-interfaces)
- [Composants API](#-composants-api)
- [APIs du Navigateur](#-apis-du-navigateur)

## 🎣 Hook Principal : useImageProcessor

### Description
Hook personnalisé qui gère toute la logique de traitement d'images de l'application.

### Import
```typescript
import { useImageProcessor } from '../hooks/useImageProcessor';
```

### Utilisation
```typescript
const {
  images,
  isProcessing,
  isConverting,
  addImages,
  removeImage,
  convertImage,
  downloadOriginal,
  batchConvert
} = useImageProcessor();
```

### État Retourné

#### `images: ImageFile[]`
Liste de toutes les images chargées dans l'application.

**Type** : `ImageFile[]`
**Description** : Array contenant tous les objets ImageFile avec leurs métadonnées

#### `isProcessing: boolean`
Indique si des images sont en cours de traitement (upload/analyse).

**Type** : `boolean`
**Description** : `true` pendant l'ajout et l'analyse d'images

#### `isConverting: boolean`
Indique si une conversion est en cours.

**Type** : `boolean`
**Description** : `true` pendant les opérations de conversion

### Méthodes Retournées

#### `addImages(files: File[]): Promise<void>`
Ajoute de nouvelles images à la liste.

**Paramètres** :
- `files: File[]` - Array de fichiers à ajouter

**Processus** :
1. Validation des types de fichiers
2. Création des aperçus (Data URLs)
3. Extraction des dimensions
4. Calcul des ratios d'aspect
5. Génération d'IDs uniques
6. Mise à jour de l'état

**Exemple** :
```typescript
const handleFilesSelected = async (files: File[]) => {
  await addImages(files);
};
```

#### `removeImage(id: string): void`
Supprime une image de la liste.

**Paramètres** :
- `id: string` - Identifiant unique de l'image

**Exemple** :
```typescript
const handleRemove = (imageId: string) => {
  removeImage(imageId);
};
```

#### `convertImage(imageId: string, settings: ConversionSettings): Promise<void>`
Convertit une image individuelle selon les paramètres spécifiés.

**Paramètres** :
- `imageId: string` - ID de l'image à convertir
- `settings: ConversionSettings` - Paramètres de conversion

**Processus** :
1. Récupération de l'image par ID
2. Création d'un canvas temporaire
3. Chargement de l'image source
4. Application des transformations
5. Conversion au format cible
6. Déclenchement du téléchargement

**Exemple** :
```typescript
const handleConvert = async (imageId: string) => {
  const settings: ConversionSettings = {
    format: 'jpg',
    quality: 85,
    width: 1920,
    height: 1080,
    maintainAspectRatio: true
  };
  
  await convertImage(imageId, settings);
};
```

#### `downloadOriginal(imageId: string): void`
Télécharge l'image originale sans modification.

**Paramètres** :
- `imageId: string` - ID de l'image à télécharger

**Exemple** :
```typescript
const handleDownload = (imageId: string) => {
  downloadOriginal(imageId);
};
```

#### `batchConvert(settings: BatchConversionSettings): Promise<void>`
Convertit toutes les images avec les mêmes paramètres.

**Paramètres** :
- `settings: BatchConversionSettings` - Paramètres de conversion par lots

**Processus** :
1. Itération sur toutes les images
2. Application des paramètres de redimensionnement
3. Conversion selon le format spécifié
4. Téléchargement séquentiel
5. Mise à jour des dimensions dans l'état

**Exemple** :
```typescript
const handleBatchConvert = async () => {
  const settings: BatchConversionSettings = {
    format: 'webp',
    quality: 80,
    resizeMode: 'fit',
    maxWidth: 1920,
    maxHeight: 1080,
    compressionLevel: 'medium',
    maintainAspectRatio: true
  };
  
  await batchConvert(settings);
};
```

## 🛠️ Utilitaires d'Images (imageUtils.ts)

### createImagePreview(file: File): Promise<string>
Crée un aperçu Data URL d'un fichier image.

**Paramètres** :
- `file: File` - Fichier image à traiter

**Retour** : `Promise<string>` - Data URL de l'image

**Utilisation** :
```typescript
const preview = await createImagePreview(file);
// preview = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
```

**Implémentation** :
```typescript
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};
```

### getImageDimensions(file: File): Promise<{width: number, height: number}>
Extrait les dimensions d'un fichier image.

**Paramètres** :
- `file: File` - Fichier image à analyser

**Retour** : `Promise<{width: number, height: number}>` - Dimensions de l'image

**Utilisation** :
```typescript
const dimensions = await getImageDimensions(file);
// dimensions = { width: 1920, height: 1080 }
```

**Implémentation** :
```typescript
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
```

### resizeImage(canvas, sourceImage, targetWidth, targetHeight, quality): string
Redimensionne une image sur un canvas.

**Paramètres** :
- `canvas: HTMLCanvasElement` - Canvas de destination
- `sourceImage: HTMLImageElement` - Image source
- `targetWidth: number` - Largeur cible
- `targetHeight: number` - Hauteur cible
- `quality: number` - Qualité de compression (0.0-1.0)

**Retour** : `string` - Data URL de l'image redimensionnée

**Utilisation** :
```typescript
const canvas = document.createElement('canvas');
const img = new Image();
img.src = imageDataUrl;

img.onload = () => {
  const resizedDataUrl = resizeImage(canvas, img, 800, 600, 0.9);
};
```

### convertToFormat(canvas, format, quality): string | Blob
Convertit un canvas vers un format spécifique.

**Paramètres** :
- `canvas: HTMLCanvasElement` - Canvas source
- `format: OutputFormat` - Format de sortie
- `quality: number` - Qualité (0.0-1.0)

**Retour** : `string | Blob` - Données converties

**Formats supportés** :
- `'jpg'` : JPEG avec compression
- `'png'` : PNG sans perte
- `'webp'` : WebP avec compression
- `'pdf'` : Conversion basique vers PDF

**Utilisation** :
```typescript
const convertedData = convertToFormat(canvas, 'webp', 0.8);
```

### downloadFile(dataUrl, filename): void
Déclenche le téléchargement d'un fichier.

**Paramètres** :
- `dataUrl: string` - URL des données à télécharger
- `filename: string` - Nom du fichier

**Utilisation** :
```typescript
downloadFile(imageDataUrl, 'converted-image.jpg');
```

**Implémentation** :
```typescript
export const downloadFile = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

### formatFileSize(bytes: number): string
Formate une taille en octets en format lisible.

**Paramètres** :
- `bytes: number` - Taille en octets

**Retour** : `string` - Taille formatée

**Utilisation** :
```typescript
const formattedSize = formatFileSize(1048576);
// formattedSize = "1 MB"
```

**Exemples de sortie** :
- `1024` → `"1 KB"`
- `1048576` → `"1 MB"`
- `1073741824` → `"1 GB"`

## 📊 Types et Interfaces

### ImageFile
Interface représentant une image dans l'application.

```typescript
export interface ImageFile {
  id: string;                    // Identifiant unique généré
  file: File;                   // Objet File original
  preview: string;              // Data URL pour l'aperçu
  originalWidth: number;        // Largeur originale en pixels
  originalHeight: number;       // Hauteur originale en pixels
  currentWidth: number;         // Largeur actuelle (après modifications)
  currentHeight: number;        // Hauteur actuelle (après modifications)
  aspectRatio: number;          // Ratio d'aspect (largeur/hauteur)
}
```

**Exemple d'objet** :
```typescript
const imageFile: ImageFile = {
  id: "abc123def",
  file: File, // Objet File du navigateur
  preview: "data:image/jpeg;base64,/9j/4AAQ...",
  originalWidth: 1920,
  originalHeight: 1080,
  currentWidth: 1920,
  currentHeight: 1080,
  aspectRatio: 1.777777777777778
};
```

### OutputFormat
Type union des formats de sortie supportés.

```typescript
export type OutputFormat = 'pdf' | 'jpg' | 'png' | 'webp';
```

**Formats disponibles** :
- `'jpg'` : JPEG avec compression variable
- `'png'` : PNG sans perte, supporte transparence
- `'webp'` : WebP moderne avec compression efficace
- `'pdf'` : PDF basique (implémentation simplifiée)

### ConversionSettings
Interface pour les paramètres de conversion individuelle.

```typescript
export interface ConversionSettings {
  format: OutputFormat;         // Format de sortie
  quality: number;              // Qualité 10-100 (JPG/WebP uniquement)
  width?: number;               // Largeur cible (optionnelle)
  height?: number;              // Hauteur cible (optionnelle)
  maintainAspectRatio: boolean; // Maintenir les proportions
}
```

**Exemple d'utilisation** :
```typescript
const settings: ConversionSettings = {
  format: 'jpg',
  quality: 85,
  width: 1920,
  height: 1080,
  maintainAspectRatio: true
};
```

### BatchConversionSettings
Interface pour les paramètres de conversion par lots.

```typescript
export interface BatchConversionSettings {
  format: OutputFormat;                           // Format de sortie
  quality: number;                               // Qualité 10-100
  resizeMode: 'none' | 'fit' | 'fill';          // Mode de redimensionnement
  maxWidth?: number;                             // Largeur maximale
  maxHeight?: number;                            // Hauteur maximale
  compressionLevel: 'low' | 'medium' | 'high';  // Niveau de compression
  maintainAspectRatio: boolean;                  // Maintenir les proportions
}
```

**Modes de redimensionnement** :
- `'none'` : Aucun redimensionnement
- `'fit'` : Ajuster dans les limites sans déformation
- `'fill'` : Remplir les dimensions exactes

**Niveaux de compression** :
- `'low'` : Qualité maximale (85-100%)
- `'medium'` : Équilibré (70-85%)
- `'high'` : Taille minimale (50-70%)

## 🧩 Composants API

### FileUpload Props
```typescript
interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;  // Callback de sélection
  isProcessing: boolean;                     // État de traitement
}
```

### ImagePreview Props
```typescript
interface ImagePreviewProps {
  image: ImageFile;                          // Image à afficher
  onRemove: (id: string) => void;           // Callback de suppression
  onEdit: (id: string) => void;             // Callback d'édition
  onDownload: (id: string) => void;         // Callback de téléchargement
}
```

### ConversionPanel Props
```typescript
interface ConversionPanelProps {
  selectedImage: ImageFile | null;           // Image sélectionnée
  onConvert: (settings: ConversionSettings) => void; // Callback de conversion
  onClose: () => void;                       // Callback de fermeture
  isConverting: boolean;                     // État de conversion
}
```

### BatchConversionPanel Props
```typescript
interface BatchConversionPanelProps {
  imageCount: number;                        // Nombre d'images
  onBatchConvert: (settings: BatchConversionSettings) => void; // Callback
  onClose: () => void;                       // Callback de fermeture
  isConverting: boolean;                     // État de conversion
}
```

## 🌐 APIs du Navigateur

### File API
APIs utilisées pour la manipulation de fichiers.

#### FileReader
```typescript
const reader = new FileReader();
reader.onload = (event) => {
  const dataUrl = event.target?.result as string;
};
reader.readAsDataURL(file);
```

#### File Object
```typescript
interface File extends Blob {
  name: string;        // Nom du fichier
  size: number;        // Taille en octets
  type: string;        // Type MIME
  lastModified: number; // Timestamp de modification
}
```

### Canvas API
APIs pour la manipulation d'images.

#### HTMLCanvasElement
```typescript
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext('2d');
ctx.drawImage(image, 0, 0, 800, 600);

const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
```

#### CanvasRenderingContext2D
```typescript
interface CanvasRenderingContext2D {
  drawImage(image: HTMLImageElement, dx: number, dy: number, dw: number, dh: number): void;
  toDataURL(type?: string, quality?: number): string;
  imageSmoothingEnabled: boolean;
  imageSmoothingQuality: 'low' | 'medium' | 'high';
}
```

### Drag and Drop API
APIs pour le glisser-déposer.

#### DragEvent
```typescript
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer?.files || []);
  const imageFiles = files.filter(file => file.type.startsWith('image/'));
};
```

### URL API
APIs pour la gestion d'URLs temporaires.

#### createObjectURL / revokeObjectURL
```typescript
const url = URL.createObjectURL(file);
// Utilisation de l'URL
URL.revokeObjectURL(url); // Libération de mémoire
```

## 🔧 Utilitaires de Développement

### Génération d'ID Unique
```typescript
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
```

### Validation de Type MIME
```typescript
const isValidImageType = (file: File): boolean => {
  return file.type.startsWith('image/');
};
```

### Calcul de Ratio d'Aspect
```typescript
const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};
```

### Redimensionnement Proportionnel
```typescript
const calculateProportionalDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } => {
  const aspectRatio = originalWidth / originalHeight;
  
  let newWidth = maxWidth;
  let newHeight = maxWidth / aspectRatio;
  
  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = maxHeight * aspectRatio;
  }
  
  return {
    width: Math.round(newWidth),
    height: Math.round(newHeight)
  };
};
```

## 📝 Exemples d'Utilisation Complète

### Conversion Simple
```typescript
import { useImageProcessor } from './hooks/useImageProcessor';

const MyComponent = () => {
  const { addImages, convertImage, images } = useImageProcessor();
  
  const handleFileSelect = async (files: File[]) => {
    await addImages(files);
  };
  
  const handleConvert = async (imageId: string) => {
    const settings: ConversionSettings = {
      format: 'jpg',
      quality: 85,
      maintainAspectRatio: true
    };
    
    await convertImage(imageId, settings);
  };
  
  return (
    <div>
      <input 
        type="file" 
        multiple 
        accept="image/*"
        onChange={(e) => handleFileSelect(Array.from(e.target.files || []))}
      />
      
      {images.map(image => (
        <div key={image.id}>
          <img src={image.preview} alt={image.file.name} />
          <button onClick={() => handleConvert(image.id)}>
            Convertir
          </button>
        </div>
      ))}
    </div>
  );
};
```

### Conversion par Lots
```typescript
const handleBatchConvert = async () => {
  const settings: BatchConversionSettings = {
    format: 'webp',
    quality: 80,
    resizeMode: 'fit',
    maxWidth: 1920,
    maxHeight: 1080,
    compressionLevel: 'medium',
    maintainAspectRatio: true
  };
  
  await batchConvert(settings);
};
```

---

**Cette API documentation fournit tous les détails nécessaires pour utiliser et étendre les fonctionnalités de l'application.**