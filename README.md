# Convertisseur d'Images Pro

Une application web moderne et intuitive pour convertir, redimensionner et optimiser vos images directement dans votre navigateur. Aucun téléchargement vers des serveurs externes - tout le traitement se fait localement pour garantir la confidentialité de vos données.

## 🚀 Fonctionnalités

### Conversion de Formats
- **Formats d'entrée supportés** : JPG, PNG, GIF, BMP, TIFF, WebP et plus
- **Formats de sortie** : JPG, PNG, WebP, PDF
- **Qualité ajustable** : Contrôle précis de la compression (10-100%)

### Redimensionnement Intelligent
- **Redimensionnement manuel** : Spécifiez les dimensions exactes
- **Maintien du ratio d'aspect** : Option pour préserver les proportions
- **Redimensionnement par lots** : Appliquez les mêmes paramètres à plusieurs images

### Traitement par Lots
- **Conversion multiple** : Traitez plusieurs images simultanément
- **Modes de redimensionnement** :
  - **Aucun** : Conserver les tailles originales
  - **Ajuster** : Redimensionner pour s'adapter aux limites
  - **Remplir** : Redimensionner pour remplir exactement les dimensions
- **Niveaux de compression** : Faible, Moyen, Élevé

### Interface Utilisateur
- **Glisser-déposer** : Interface intuitive pour ajouter des images
- **Aperçu en temps réel** : Visualisez vos images avant conversion
- **Mode sombre** : Interface adaptée avec basculement automatique/manuel
- **Design responsive** : Fonctionne sur desktop, tablette et mobile
- **Interface en français** : Application entièrement localisée
- **Accessibilité complète** : Conforme WCAG 2.1 AA, navigation clavier, lecteurs d'écran

## 📋 Prérequis

- **Node.js** : Version 18.0 ou supérieure
- **npm** : Version 8.0 ou supérieure
- **Navigateur moderne** : Chrome, Firefox, Safari, Edge (versions récentes)

## 🛠️ Installation

### 1. Cloner le projet
```bash
git clone <url-du-repository>
cd convertisseur-images-pro
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer en mode développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📖 Guide d'Utilisation

### Ajouter des Images

#### Méthode 1 : Glisser-Déposer
1. Faites glisser vos images depuis votre explorateur de fichiers
2. Déposez-les dans la zone de téléchargement
3. Les images sont automatiquement traitées et affichées

#### Méthode 2 : Sélection de Fichiers
1. Cliquez sur le bouton "Sélectionner Images"
2. Choisissez une ou plusieurs images dans la boîte de dialogue
3. Confirmez votre sélection

### Conversion Individuelle

1. **Sélectionner une image** : Cliquez sur l'icône "Paramètres" sur l'image désirée
2. **Choisir le format** : Sélectionnez JPG, PNG, WebP ou PDF
3. **Ajuster la qualité** : Utilisez le curseur pour JPG et WebP (10-100%)
4. **Redimensionner** (optionnel) :
   - Modifiez la largeur et/ou hauteur
   - Activez/désactivez le maintien du ratio d'aspect
5. **Convertir** : Cliquez sur "Convertir et Télécharger"

### Conversion par Lots

1. **Ajouter plusieurs images** : Téléchargez au moins 2 images
2. **Ouvrir le panneau de lots** : Cliquez sur "Convertir par lots"
3. **Configurer les paramètres** :
   - **Format de sortie** : Choisissez le format pour toutes les images
   - **Qualité** : Définissez la qualité de compression
   - **Redimensionnement** : Sélectionnez le mode de redimensionnement
   - **Dimensions** : Spécifiez les dimensions maximales si nécessaire
   - **Compression** : Choisissez le niveau de compression
4. **Lancer la conversion** : Cliquez sur "Convertir X images"

### Gestion des Images

- **Supprimer** : Cliquez sur l'icône "X" pour retirer une image
- **Télécharger l'original** : Cliquez sur l'icône "Télécharger" pour sauvegarder l'image originale
- **Voir les détails** : Les informations (taille, dimensions, format) sont affichées sous chaque image

## 🚀 Déploiement

### Déploiement sur Netlify (Recommandé)

#### Méthode Automatique
1. **Build du projet** :
   ```bash
   npm run build
   ```

2. **Déployer** : Utilisez le bouton de déploiement intégré dans l'interface de développement

#### Méthode Manuelle
1. **Créer un compte Netlify** : [netlify.com](https://netlify.com)

2. **Build du projet** :
   ```bash
   npm run build
   ```

3. **Déployer le dossier dist** :
   - Connectez-vous à Netlify
   - Glissez-déposez le dossier `dist` sur l'interface Netlify
   - Ou utilisez Netlify CLI :
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

### Déploiement sur Vercel

1. **Installer Vercel CLI** :
   ```bash
   npm install -g vercel
   ```

2. **Déployer** :
   ```bash
   vercel --prod
   ```

### Déploiement sur GitHub Pages

1. **Installer gh-pages** :
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Ajouter les scripts dans package.json** :
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Configurer Vite pour GitHub Pages** dans `vite.config.ts` :
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/nom-de-votre-repo/',
     optimizeDeps: {
       exclude: ['lucide-react'],
     },
   });
   ```

4. **Déployer** :
   ```bash
   npm run deploy
   ```

## 🏗️ Architecture du Projet

### Structure des Dossiers
```
src/
├── components/           # Composants React réutilisables
│   ├── FileUpload.tsx   # Composant de téléchargement de fichiers
│   ├── ImagePreview.tsx # Aperçu des images individuelles
│   ├── ConversionPanel.tsx # Panneau de conversion individuelle
│   └── BatchConversionPanel.tsx # Panneau de conversion par lots
├── hooks/               # Hooks React personnalisés
│   └── useImageProcessor.ts # Logique de traitement des images
├── types/               # Définitions TypeScript
│   └── index.ts        # Types et interfaces
├── utils/               # Fonctions utilitaires
│   └── imageUtils.ts   # Utilitaires de traitement d'images
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée de l'application
└── index.css           # Styles globaux
```

### Technologies Utilisées

#### Frontend
- **React 18** : Bibliothèque UI avec hooks et composants fonctionnels
- **TypeScript** : Typage statique pour une meilleure robustesse
- **Tailwind CSS** : Framework CSS utilitaire pour le styling
- **Lucide React** : Bibliothèque d'icônes modernes

#### Outils de Développement
- **Vite** : Bundler et serveur de développement rapide
- **ESLint** : Linter pour la qualité du code
- **PostCSS** : Traitement CSS avec Autoprefixer

#### APIs du Navigateur
- **Canvas API** : Manipulation et redimensionnement d'images
- **File API** : Lecture des fichiers locaux
- **Blob API** : Création de fichiers pour téléchargement

## 🔧 Configuration

### Variables d'Environnement
Aucune variable d'environnement n'est requise pour le fonctionnement de base. Le mode sombre utilise les préférences système et localStorage pour la persistance.

### Configuration Vite
Le fichier `vite.config.ts` contient la configuration du bundler :
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Configuration Tailwind
Le fichier `tailwind.config.js` définit la configuration CSS :
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 🧪 Tests et Qualité

### Linting
```bash
npm run lint
```

### Build de Production
```bash
npm run build
```

### Prévisualisation de Production
```bash
npm run preview
```

## 🔒 Sécurité et Confidentialité

### Traitement Local
- **Aucun téléchargement** : Toutes les images restent sur votre appareil
- **Traitement côté client** : Utilisation des APIs du navigateur uniquement
- **Pas de serveur** : Aucune donnée n'est envoyée vers des serveurs externes

### Formats Supportés
- **Lecture** : JPG, PNG, GIF, BMP, TIFF, WebP, SVG
- **Écriture** : JPG, PNG, WebP, PDF (basique)

### Accessibilité
- **Navigation clavier** : Support complet avec indicateurs de focus
- **Lecteurs d'écran** : Compatible NVDA, JAWS, VoiceOver
- **Contraste** : Ratios conformes WCAG 2.1 AA en modes clair et sombre
- **Responsive** : Zones de touch 44px minimum, zoom 200% supporté

## 🐛 Dépannage

### Problèmes Courants

#### Images ne se chargent pas
- Vérifiez que le format est supporté
- Assurez-vous que le fichier n'est pas corrompu
- Vérifiez la taille du fichier (limite navigateur ~100MB)

#### Conversion PDF ne fonctionne pas
- La conversion PDF est basique et peut ne pas fonctionner avec tous les navigateurs
- Utilisez Chrome ou Firefox pour de meilleurs résultats

#### Performance lente
- Réduisez le nombre d'images traitées simultanément
- Utilisez des images de taille raisonnable (<10MB par image)
- Fermez les autres onglets pour libérer de la mémoire

### Problèmes d'accessibilité
- Vérifiez que JavaScript est activé pour la navigation clavier
- Utilisez un navigateur récent pour le support ARIA complet
- Activez les annonces de lecteur d'écran si nécessaire

### Logs de Débogage
Ouvrez la console du navigateur (F12) pour voir les messages d'erreur détaillés.

## 📝 Contribution

### Développement Local
1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

### Standards de Code
- Utilisez TypeScript pour tous les nouveaux fichiers
- Suivez les conventions ESLint configurées
- Documentez les fonctions complexes
- Testez sur plusieurs navigateurs

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour obtenir de l'aide :
1. Consultez cette documentation
2. Vérifiez les issues GitHub existantes
3. Ouvrez une nouvelle issue avec :
   - Description du problème
   - Étapes pour reproduire
   - Navigateur et version
   - Captures d'écran si applicable

## 🔄 Changelog

### Version 1.0.0
- ✅ Conversion de formats (JPG, PNG, WebP, PDF)
- ✅ Redimensionnement intelligent
- ✅ Traitement par lots
- ✅ Interface glisser-déposer
- ✅ Mode sombre avec détection automatique
- ✅ Design responsive
- ✅ Interface en français
- ✅ Accessibilité WCAG 2.1 AA complète

---

**Développé avec ❤️ en utilisant React, TypeScript et Tailwind CSS**