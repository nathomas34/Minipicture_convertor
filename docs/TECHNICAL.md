# Documentation Technique - Convertisseur d'Images Pro

Cette documentation détaille l'architecture technique, les APIs utilisées et les détails d'implémentation de l'application.

## 🏗️ Architecture Générale

### Stack Technique
- **Frontend** : React 18 + TypeScript
- **Styling** : Tailwind CSS
- **Build Tool** : Vite
- **Icons** : Lucide React
- **Traitement d'images** : Canvas API + File API

### Principe de Fonctionnement
L'application fonctionne entièrement côté client :
1. **Upload** : Lecture des fichiers via File API
2. **Traitement** : Manipulation via Canvas API
3. **Conversion** : Génération de nouveaux formats
4. **Download** : Création de Blob et téléchargement

## 📁 Structure du Projet

```
src/
├── components/              # Composants React
│   ├── FileUpload.tsx      # Gestion upload de fichiers
│   ├── ImagePreview.tsx    # Aperçu des images
│   ├── ConversionPanel.tsx # Panneau conversion individuelle
│   └── BatchConversionPanel.tsx # Panneau conversion par lots
├── hooks/                  # Hooks personnalisés
│   └── useImageProcessor.ts # Logique métier principale
├── types/                  # Définitions TypeScript
│   └── index.ts           # Types et interfaces
├── utils/                 # Utilitaires
│   └── imageUtils.ts      # Fonctions de traitement d'images
├── App.tsx                # Composant racine
├── main.tsx              # Point d'entrée
└── index.css             # Styles globaux
```

## 🔧 Composants Principaux

### App.tsx
**Responsabilité** : Composant racine et orchestration générale

```typescript
interface AppState {
  images: ImageFile[];
  selectedImage: ImageFile | null;
  showBatchPanel: boolean;
}
```

**Fonctionnalités** :
- Gestion de l'état global
- Coordination entre composants
- Interface utilisateur principale

### FileUpload.tsx
**Responsabilité** : Gestion du téléchargement de fichiers

```typescript
interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}
```

**Fonctionnalités** :
- Drag & Drop
- Sélection de fichiers
- Validation des formats
- Feedback utilisateur

**APIs utilisées** :
- `DragEvent` API
- `FileList` API
- `File` API

### ImagePreview.tsx
**Responsabilité** : Affichage et gestion des images individuelles

```typescript
interface ImagePreviewProps {
  image: ImageFile;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
  onDownload: (id: string) => void;
}
```

**Fonctionnalités** :
- Aperçu des images
- Informations métadonnées
- Actions rapides (éditer, supprimer, télécharger)

### ConversionPanel.tsx
**Responsabilité** : Configuration de conversion individuelle

```typescript
interface ConversionSettings {
  format: OutputFormat;
  quality: number;
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
}
```

**Fonctionnalités** :
- Sélection du format de sortie
- Contrôle de la qualité
- Redimensionnement avec ratio d'aspect
- Aperçu en temps réel

### BatchConversionPanel.tsx
**Responsabilité** : Configuration de conversion par lots

```typescript
interface BatchConversionSettings {
  format: OutputFormat;
  quality: number;
  resizeMode: 'none' | 'fit' | 'fill';
  maxWidth?: number;
  maxHeight?: number;
  compressionLevel: 'low' | 'medium' | 'high';
  maintainAspectRatio: boolean;
}
```

**Fonctionnalités** :
- Paramètres globaux pour toutes les images
- Modes de redimensionnement avancés
- Niveaux de compression prédéfinis

## 🎣 Hook Principal : useImageProcessor

### Responsabilité
Gestion centralisée de toute la logique de traitement d'images.

### État Interne
```typescript
interface ProcessorState {
  images: ImageFile[];
  isProcessing: boolean;
  isConverting: boolean;
}
```

### Méthodes Exposées

#### addImages(files: File[])
```typescript
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
```

**Processus** :
1. Création d'aperçus via `FileReader`
2. Extraction des dimensions via `Image`
3. Calcul du ratio d'aspect
4. Génération d'ID unique
5. Mise à jour de l'état

#### convertImage(imageId, settings)
```typescript
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

    // Traitement selon le format
    if (settings.format === 'pdf') {
      // Conversion PDF
    } else {
      // Conversion image standard
    }
  } catch (error) {
    console.error('Error converting image:', error);
  } finally {
    setIsConverting(false);
  }
}, [images]);
```

**Processus** :
1. Création d'un canvas temporaire
2. Chargement de l'image source
3. Redimensionnement si nécessaire
4. Conversion au format cible
5. Génération du fichier de sortie
6. Déclenchement du téléchargement

#### batchConvert(settings)
Traitement similaire à `convertImage` mais appliqué à toutes les images avec gestion des modes de redimensionnement avancés.

## 🛠️ Utilitaires (imageUtils.ts)

### createImagePreview(file: File)
```typescript
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};
```

**Utilisation** : Génération d'aperçus pour l'interface utilisateur

### getImageDimensions(file: File)
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

**Utilisation** : Extraction des dimensions originales des images

### resizeImage(canvas, sourceImage, targetWidth, targetHeight, quality)
```typescript
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
```

**Utilisation** : Redimensionnement avec qualité optimisée

### convertToFormat(canvas, format, quality)
```typescript
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
      return canvas.toDataURL('image/jpeg', quality);
    default:
      return canvas.toDataURL('image/png');
  }
};
```

**Utilisation** : Conversion entre formats avec gestion de la qualité

### downloadFile(dataUrl, filename)
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

**Utilisation** : Déclenchement du téléchargement côté client

## 📊 Types et Interfaces

### ImageFile
```typescript
export interface ImageFile {
  id: string;                    // Identifiant unique
  file: File;                   // Fichier original
  preview: string;              // Data URL pour aperçu
  originalWidth: number;        // Largeur originale
  originalHeight: number;       // Hauteur originale
  currentWidth: number;         // Largeur actuelle
  currentHeight: number;        // Hauteur actuelle
  aspectRatio: number;          // Ratio d'aspect (w/h)
}
```

### OutputFormat
```typescript
export type OutputFormat = 'pdf' | 'jpg' | 'png' | 'webp';
```

### ConversionSettings
```typescript
export interface ConversionSettings {
  format: OutputFormat;         // Format de sortie
  quality: number;              // Qualité (10-100)
  width?: number;               // Largeur cible
  height?: number;              // Hauteur cible
  maintainAspectRatio: boolean; // Maintien du ratio
}
```

### BatchConversionSettings
```typescript
export interface BatchConversionSettings {
  format: OutputFormat;
  quality: number;
  resizeMode: 'none' | 'fit' | 'fill';
  maxWidth?: number;
  maxHeight?: number;
  compressionLevel: 'low' | 'medium' | 'high';
  maintainAspectRatio: boolean;
}
```

## 🌐 APIs du Navigateur Utilisées

### File API
- **FileReader** : Lecture des fichiers locaux
- **File** : Manipulation des objets fichier
- **FileList** : Gestion des listes de fichiers

### Canvas API
- **HTMLCanvasElement** : Manipulation d'images
- **CanvasRenderingContext2D** : Dessin et transformation
- **toDataURL()** : Conversion en format de données

### Drag and Drop API
- **DragEvent** : Gestion des événements de glisser-déposer
- **DataTransfer** : Accès aux fichiers glissés

### URL API
- **createObjectURL()** : Création d'URLs temporaires
- **revokeObjectURL()** : Libération de mémoire

### Blob API
- **Blob** : Création d'objets binaires
- **URL.createObjectURL()** : Génération d'URLs de téléchargement

## ⚡ Optimisations de Performance

### Gestion Mémoire
```typescript
// Libération des URLs temporaires
URL.revokeObjectURL(url);

// Nettoyage des canvas
canvas.width = canvas.height = 0;
```

### Traitement Asynchrone
```typescript
// Éviter le blocage de l'UI
await new Promise(resolve => setTimeout(resolve, 100));
```

### Optimisation Canvas
```typescript
// Qualité de lissage optimisée
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';
```

## 🔒 Sécurité

### Validation des Fichiers
```typescript
// Vérification du type MIME
const isValidImage = file.type.startsWith('image/');

// Limitation de taille
const maxSize = 100 * 1024 * 1024; // 100MB
const isValidSize = file.size <= maxSize;
```

### Traitement Local
- Aucune donnée envoyée vers des serveurs
- Traitement 100% côté client
- Pas de stockage permanent

## 🐛 Gestion d'Erreurs

### Try-Catch Blocks
```typescript
try {
  // Traitement d'image
} catch (error) {
  console.error('Error processing image:', error);
  // Gestion gracieuse de l'erreur
} finally {
  setIsProcessing(false);
}
```

### Validation des Entrées
```typescript
// Vérification des dimensions
if (!settings.width || !settings.height) {
  throw new Error('Invalid dimensions');
}

// Vérification de la qualité
if (settings.quality < 10 || settings.quality > 100) {
  throw new Error('Invalid quality range');
}
```

## 📈 Métriques et Monitoring

### Performance Tracking
```typescript
// Mesure du temps de traitement
const startTime = performance.now();
// ... traitement
const endTime = performance.now();
console.log(`Processing took ${endTime - startTime} milliseconds`);
```

### Memory Usage
```typescript
// Surveillance de la mémoire (si disponible)
if ('memory' in performance) {
  console.log('Memory usage:', performance.memory);
}
```

## 🔧 Configuration de Build

### Vite Configuration
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

## 🧪 Tests (Recommandations)

### Tests Unitaires
```typescript
// Test des utilitaires
describe('imageUtils', () => {
  test('formatFileSize should format bytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
  });
});
```

### Tests d'Intégration
```typescript
// Test des composants
describe('FileUpload', () => {
  test('should handle file selection', () => {
    // Test de sélection de fichiers
  });
});
```

### Tests E2E
```typescript
// Test du workflow complet
describe('Image Conversion Workflow', () => {
  test('should convert image from upload to download', () => {
    // Test du processus complet
  });
});
```

## 📚 Ressources Externes

### Documentation APIs
- [Canvas API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [File API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/File_API)
- [Drag and Drop API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

### Outils de Développement
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Cette documentation technique fournit tous les détails nécessaires pour comprendre, maintenir et étendre l'application.**