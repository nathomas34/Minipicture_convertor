# Guide de Déploiement - Convertisseur d'Images Pro

Ce guide détaille toutes les méthodes de déploiement disponibles pour l'application Convertisseur d'Images Pro.

## 📋 Prérequis de Déploiement

### Environnement de Build
- Node.js 18+ installé
- npm 8+ ou yarn
- Git (pour certaines méthodes)

### Préparation du Build
```bash
# Installer les dépendances
npm install

# Créer le build de production
npm run build
```

Le build génère un dossier `dist/` contenant tous les fichiers statiques optimisés.

## 🚀 Méthodes de Déploiement

### 1. Netlify (Recommandé)

#### Option A : Déploiement par Glisser-Déposer
1. **Créer un compte** sur [netlify.com](https://netlify.com)
2. **Builder le projet** :
   ```bash
   npm run build
   ```
3. **Déployer** :
   - Connectez-vous à Netlify
   - Cliquez sur "Add new site" → "Deploy manually"
   - Glissez-déposez le dossier `dist/`
   - Votre site est en ligne !

#### Option B : Déploiement via Git
1. **Pousser votre code** sur GitHub/GitLab/Bitbucket
2. **Connecter à Netlify** :
   - "Add new site" → "Import from Git"
   - Sélectionnez votre repository
   - Configuration :
     - **Build command** : `npm run build`
     - **Publish directory** : `dist`
     - **Node version** : 18
3. **Déployer** : Netlify build et déploie automatiquement

#### Option C : Netlify CLI
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod --dir=dist
```

#### Configuration Netlify Avancée
Créez un fichier `netlify.toml` à la racine :
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Vercel

#### Option A : Vercel CLI
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

#### Option B : Vercel Dashboard
1. **Créer un compte** sur [vercel.com](https://vercel.com)
2. **Importer le projet** :
   - "Add New Project"
   - Connectez votre repository Git
   - Vercel détecte automatiquement Vite
3. **Déployer** : Automatique à chaque push

#### Configuration Vercel
Créez `vercel.json` :
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 3. GitHub Pages

#### Configuration
1. **Modifier `vite.config.ts`** :
   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     base: '/nom-de-votre-repo/', // Remplacez par le nom de votre repo
     optimizeDeps: {
       exclude: ['lucide-react'],
     },
   });
   ```

2. **Installer gh-pages** :
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Ajouter les scripts** dans `package.json` :
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Déployer** :
   ```bash
   npm run deploy
   ```

#### GitHub Actions (Automatique)
Créez `.github/workflows/deploy.yml` :
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 4. Firebase Hosting

#### Installation
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser
firebase init hosting
```

#### Configuration
Sélectionnez :
- **Public directory** : `dist`
- **Single-page app** : `Yes`
- **Automatic builds** : `No`

#### Déploiement
```bash
# Build
npm run build

# Déployer
firebase deploy
```

### 5. Surge.sh

#### Installation et Déploiement
```bash
# Installer Surge
npm install -g surge

# Build
npm run build

# Déployer
cd dist
surge
```

### 6. AWS S3 + CloudFront

#### Prérequis
- Compte AWS
- AWS CLI configuré

#### Étapes
1. **Créer un bucket S3** :
   ```bash
   aws s3 mb s3://votre-nom-de-bucket
   ```

2. **Configurer pour hébergement web** :
   ```bash
   aws s3 website s3://votre-nom-de-bucket --index-document index.html
   ```

3. **Uploader les fichiers** :
   ```bash
   npm run build
   aws s3 sync dist/ s3://votre-nom-de-bucket --delete
   ```

4. **Configurer CloudFront** (optionnel pour CDN)

### 7. Docker

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

#### Build et Run
```bash
# Build l'image
docker build -t convertisseur-images .

# Run le container
docker run -p 8080:80 convertisseur-images
```

## ⚙️ Configuration de Production

### Variables d'Environnement
Créez un fichier `.env.production` :
```env
VITE_APP_TITLE=Convertisseur d'Images Pro
VITE_APP_VERSION=1.0.0
```

### Optimisations de Build
Dans `vite.config.ts` :
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

## 🔧 Configuration des Domaines Personnalisés

### Netlify
1. **Ajouter le domaine** dans les paramètres du site
2. **Configurer DNS** :
   - Type A : `75.2.60.5`
   - CNAME www : `votre-site.netlify.app`

### Vercel
1. **Ajouter le domaine** dans les paramètres du projet
2. **Configurer DNS** selon les instructions Vercel

### GitHub Pages
1. **Ajouter CNAME** dans le repository
2. **Configurer DNS** :
   - CNAME : `username.github.io`

## 📊 Monitoring et Analytics

### Ajout de Google Analytics
Dans `index.html` :
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitoring d'Erreurs avec Sentry
```bash
npm install @sentry/react @sentry/tracing
```

## 🚨 Dépannage de Déploiement

### Erreurs Communes

#### Build Fails
```bash
# Nettoyer le cache
npm run build -- --force

# Vérifier les dépendances
npm audit fix
```

#### Routing Issues (404 sur refresh)
Configurez les redirections :
- **Netlify** : `_redirects` file
- **Apache** : `.htaccess`
- **Nginx** : `try_files`

#### Memory Issues
```bash
# Augmenter la mémoire Node.js
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## 📋 Checklist de Déploiement

- [ ] Tests passent localement
- [ ] Build réussit sans erreurs
- [ ] Variables d'environnement configurées
- [ ] Domaine personnalisé configuré (si applicable)
- [ ] HTTPS activé
- [ ] Analytics configuré
- [ ] Monitoring d'erreurs configuré
- [ ] Performance testée
- [ ] Compatibilité navigateurs vérifiée

## 🔄 CI/CD Automatique

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

**Choisissez la méthode de déploiement qui convient le mieux à vos besoins et à votre infrastructure !**