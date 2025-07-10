# Guide d'Utilisation - Convertisseur d'Images Pro

Ce guide détaille toutes les fonctionnalités de l'application et comment les utiliser efficacement.

## 🎯 Vue d'Ensemble

Le Convertisseur d'Images Pro est une application web qui permet de :
- Convertir des images entre différents formats (JPG, PNG, WebP, PDF)
- Redimensionner et optimiser les images
- Traiter plusieurs images simultanément
- Tout cela directement dans votre navigateur, sans téléchargement vers des serveurs

## 🚀 Démarrage Rapide

### Première Utilisation
1. **Ouvrez l'application** dans votre navigateur
2. **Ajoutez des images** en les glissant-déposant ou en cliquant sur "Sélectionner Images"
3. **Choisissez vos paramètres** de conversion
4. **Téléchargez** vos images converties

### Interface Principale
L'interface se compose de :
- **En-tête** : Titre et fonctionnalités principales
- **Zone de téléchargement** : Pour ajouter vos images
- **Grille d'images** : Aperçu de toutes vos images
- **Panneaux de conversion** : Pour configurer les paramètres

## 📁 Ajouter des Images

### Méthode 1 : Glisser-Déposer
1. **Ouvrez votre explorateur de fichiers**
2. **Sélectionnez une ou plusieurs images**
3. **Faites-les glisser** vers la zone de téléchargement
4. **Relâchez** pour les ajouter

**Formats supportés** : JPG, JPEG, PNG, GIF, BMP, TIFF, WebP, SVG

### Méthode 2 : Sélection de Fichiers
1. **Cliquez** sur le bouton "Sélectionner Images"
2. **Parcourez** vos dossiers dans la boîte de dialogue
3. **Sélectionnez** une ou plusieurs images (Ctrl+clic pour sélection multiple)
4. **Confirmez** avec "Ouvrir"

### Méthode 3 : Ajouter Plus d'Images
Une fois des images chargées :
1. **Cliquez** sur le bouton "Ajouter plus d'images" dans la barre d'actions
2. **Répétez** le processus de sélection
3. Les nouvelles images s'ajoutent à votre collection existante

## 🔄 Conversion Individuelle

### Accéder aux Paramètres
1. **Survolez** une image dans la grille
2. **Cliquez** sur l'icône "Paramètres" (roue dentée)
3. Le panneau de conversion s'ouvre

### Configuration des Paramètres

#### Format de Sortie
- **JPG** : Format compressé, idéal pour photos
- **PNG** : Format sans perte, supporte la transparence
- **WebP** : Format moderne, excellent compromis taille/qualité
- **PDF** : Document portable, idéal pour archivage

#### Qualité (JPG et WebP uniquement)
- **Curseur de 10 à 100%**
- **10-30%** : Très compressé, petite taille
- **50-70%** : Bon compromis qualité/taille
- **80-100%** : Haute qualité, taille plus importante

#### Redimensionnement
1. **Dimensions actuelles** : Affichées en bas du panneau
2. **Nouvelles dimensions** :
   - Modifiez la largeur et/ou hauteur
   - Les champs acceptent uniquement des nombres entiers
3. **Ratio d'aspect** :
   - **Verrouillé** (🔒) : Les proportions sont maintenues
   - **Déverrouillé** (🔓) : Modification libre des dimensions

### Lancer la Conversion
1. **Vérifiez** tous vos paramètres
2. **Cliquez** sur "Convertir et Télécharger"
3. **Attendez** la fin du traitement
4. Le fichier se télécharge automatiquement

## 📦 Conversion par Lots

### Accéder au Mode Lots
1. **Ajoutez** au moins 2 images
2. **Cliquez** sur "Convertir par lots" dans la barre d'actions
3. Le panneau de conversion par lots s'ouvre

### Configuration Avancée

#### Format de Sortie
Sélectionnez le format pour toutes les images :
- Même principe que la conversion individuelle
- S'applique à toutes les images sélectionnées

#### Qualité Globale
- **Curseur unique** pour toutes les images
- **Recommandations** :
  - Photos : 80-90%
  - Images web : 70-80%
  - Archivage : 90-100%

#### Modes de Redimensionnement

##### Aucun Redimensionnement
- **Utilisation** : Conversion de format uniquement
- **Résultat** : Tailles originales conservées

##### Ajuster aux Dimensions
- **Principe** : Les images s'adaptent aux limites sans déformation
- **Exemple** : Limite 1920×1080
  - Image 2000×1500 → 1440×1080 (ratio maintenu)
  - Image 800×600 → 800×600 (pas de changement)

##### Remplir les Dimensions
- **Principe** : Les images remplissent exactement les dimensions
- **Options** :
  - **Avec ratio** : Redimensionnement proportionnel (peut dépasser)
  - **Sans ratio** : Étirement pour correspondre exactement

#### Dimensions Maximales
- **Largeur Max** : Limite en pixels (ex: 1920)
- **Hauteur Max** : Limite en pixels (ex: 1080)
- **Champs optionnels** : Laissez vide pour pas de limite

#### Niveaux de Compression

##### Faible Compression
- **Qualité** : Maximale (85-100%)
- **Taille** : Plus importante
- **Usage** : Impression, archivage

##### Compression Moyenne
- **Qualité** : Équilibrée (70-85%)
- **Taille** : Modérée
- **Usage** : Web, partage

##### Compression Élevée
- **Qualité** : Optimisée (50-70%)
- **Taille** : Minimale
- **Usage** : Email, stockage limité

### Lancement du Traitement
1. **Vérifiez** la configuration
2. **Cliquez** sur "Convertir X images"
3. **Attendez** le traitement (barre de progression)
4. **Téléchargements automatiques** de tous les fichiers

## 🖼️ Gestion des Images

### Informations Affichées
Pour chaque image :
- **Nom du fichier** original
- **Taille du fichier** (Ko, Mo)
- **Dimensions** actuelles (largeur × hauteur)
- **Format** original

### Actions Disponibles

#### Modifier (Icône Paramètres)
- Ouvre le panneau de conversion individuelle
- Permet la personnalisation fine

#### Télécharger (Icône Téléchargement)
- Télécharge l'image dans son état actuel
- Aucune conversion appliquée

#### Supprimer (Icône X)
- Retire l'image de la liste
- Action irréversible (rechargement nécessaire pour récupérer)

## 💡 Conseils d'Utilisation

### Optimisation des Performances
- **Limitez** le nombre d'images simultanées (recommandé : <20)
- **Réduisez** la taille des images très volumineuses avant traitement
- **Fermez** les autres onglets pour libérer de la mémoire

### Choix du Format

#### Quand utiliser JPG
- **Photos** avec beaucoup de couleurs
- **Taille de fichier** importante
- **Pas de transparence** nécessaire

#### Quand utiliser PNG
- **Images** avec transparence
- **Graphiques** avec peu de couleurs
- **Qualité** sans perte requise

#### Quand utiliser WebP
- **Usage web** moderne
- **Meilleur compromis** taille/qualité
- **Support navigateur** récent

#### Quand utiliser PDF
- **Archivage** de documents
- **Impression** professionnelle
- **Partage** multi-plateforme

### Redimensionnement Intelligent

#### Maintenir les Proportions
- **Activé** : Évite la déformation
- **Recommandé** pour la plupart des cas

#### Dimensions Communes
- **HD** : 1920×1080
- **Full HD** : 1920×1080
- **4K** : 3840×2160
- **Carré Instagram** : 1080×1080
- **Story Instagram** : 1080×1920

### Qualité vs Taille

#### Haute Qualité (90-100%)
- **Avantages** : Qualité maximale
- **Inconvénients** : Fichiers volumineux
- **Usage** : Impression, archivage

#### Qualité Moyenne (70-85%)
- **Avantages** : Bon compromis
- **Inconvénients** : Légère perte de qualité
- **Usage** : Web, partage général

#### Qualité Faible (50-70%)
- **Avantages** : Fichiers légers
- **Inconvénients** : Qualité réduite
- **Usage** : Email, aperçus

## 🔧 Dépannage

### Problèmes Courants

#### Image ne se Charge Pas
**Causes possibles** :
- Format non supporté
- Fichier corrompu
- Taille excessive (>100MB)

**Solutions** :
- Vérifiez le format
- Testez avec une autre image
- Réduisez la taille du fichier

#### Conversion Échoue
**Causes possibles** :
- Mémoire insuffisante
- Dimensions trop importantes
- Navigateur non compatible

**Solutions** :
- Fermez les autres onglets
- Réduisez les dimensions
- Utilisez Chrome ou Firefox

#### Téléchargement ne Fonctionne Pas
**Causes possibles** :
- Bloqueur de pop-ups actif
- Paramètres de téléchargement restrictifs

**Solutions** :
- Autorisez les téléchargements
- Vérifiez les paramètres du navigateur

### Limites Techniques

#### Taille des Fichiers
- **Maximum recommandé** : 50MB par image
- **Limite navigateur** : ~100MB
- **Performance optimale** : <10MB

#### Nombre d'Images
- **Recommandé** : <20 images simultanées
- **Maximum pratique** : 50 images
- **Dépend** de la mémoire disponible

#### Formats de Sortie
- **PDF** : Implémentation basique
- **WebP** : Nécessite navigateur récent
- **Transparence** : Uniquement PNG et WebP

## 📱 Utilisation Mobile

### Interface Adaptée
- **Design responsive** : S'adapte à tous les écrans
- **Boutons tactiles** : Optimisés pour le touch
- **Navigation simplifiée** : Interface épurée

### Fonctionnalités Mobiles
- **Glisser-déposer** : Fonctionne sur tablettes
- **Sélection de fichiers** : Accès à la galerie photo
- **Téléchargements** : Sauvegarde dans les téléchargements

### Limitations Mobiles
- **Mémoire limitée** : Moins d'images simultanées
- **Performance réduite** : Traitement plus lent
- **Stockage** : Espace de téléchargement limité

## 🔒 Confidentialité et Sécurité

### Traitement Local
- **Aucun téléchargement** : Images restent sur votre appareil
- **Pas de serveur** : Traitement 100% côté client
- **Confidentialité totale** : Vos données ne quittent jamais votre navigateur

### Données Temporaires
- **Cache navigateur** : Images en mémoire temporaire
- **Nettoyage automatique** : Suppression à la fermeture
- **Pas de stockage** : Aucune sauvegarde permanente

## 📞 Support

### Aide en Ligne
- **Documentation** : Guide complet disponible
- **FAQ** : Réponses aux questions courantes
- **Tutoriels** : Guides pas à pas

### Signaler un Problème
1. **Décrivez** le problème rencontré
2. **Précisez** votre navigateur et version
3. **Joignez** des captures d'écran si possible
4. **Indiquez** les étapes pour reproduire

---

**Profitez de votre expérience de conversion d'images ! 🎨**