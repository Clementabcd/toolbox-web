# 🧰 ToolBox Web - La boîte à outils ultime

<div align="center">

![ToolBox Web](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**Une application React moderne avec 30+ outils gratuits pour manipuler des PDFs, images, texte, code, calculs, QR codes et couleurs.**

[Démo](#demo) • [Fonctionnalités](#fonctionnalités) • [Installation](#installation) • [Utilisation](#utilisation) • [Technologies](#technologies)

</div>

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Architecture](#architecture)
- [Technologies utilisées](#technologies-utilisées)
- [Scripts disponibles](#scripts-disponibles)
- [Contribution](#contribution)
- [License](#license)

---

## 🎯 Aperçu

**ToolBox Web** est une application web tout-en-un qui regroupe plus de 30 outils professionnels pour faciliter vos tâches quotidiennes. Plus besoin de jongler entre plusieurs sites web - tous vos outils favoris sont maintenant au même endroit !

### ✨ Points forts

- ✅ **100% Gratuit** - Aucun abonnement, aucune inscription
- 🔒 **Privé & Sécurisé** - Tout fonctionne localement dans votre navigateur
- ⚡ **Rapide & Performant** - Traitement instantané
- 🎨 **Interface moderne** - Design élégant avec Tailwind CSS
- 📱 **Responsive** - Fonctionne sur mobile, tablette et desktop
- 🌐 **Hors ligne** - Peut fonctionner sans connexion internet

---

## 🚀 Fonctionnalités

### 📄 Outils PDF (4 outils)

| Outil | Description | Librairie |
|-------|-------------|-----------|
| **Fusionner PDF** | Combinez plusieurs fichiers PDF en un seul | `pdf-lib` |
| **Compresser PDF** | Réduisez la taille de vos PDFs | `pdf-lib` |
| **PDF vers Images** | Convertissez les pages PDF en images | `pdfjs-dist` |
| **Images vers PDF** | Créez un PDF à partir de plusieurs images | `jspdf` |

**Fonctionnalités détaillées :**
- Fusion de multiples PDFs avec préservation de la qualité
- Compression avec 3 niveaux (faible, moyen, élevé)
- Support des formats PNG, JPG, WEBP pour la conversion
- Aperçu en temps réel des images sélectionnées

---

### 🖼️ Outils Image (4 outils)

| Outil | Description | Technologie |
|-------|-------------|-------------|
| **Compresser Image** | Réduisez la taille avec contrôle de qualité | Canvas API |
| **Redimensionner** | Changez les dimensions avec ratio | Canvas API |
| **Convertir Format** | PNG ↔ JPG ↔ WEBP ↔ BMP | Canvas API |
| **Filtres Photo** | 8 filtres appliqués en temps réel | CSS Filters + Canvas |

**Fonctionnalités détaillées :**
- **Compression** : Slider de qualité 1-100%, calcul estimatif de taille
- **Redimensionnement** : Conservation du ratio automatique, dimensions personnalisées
- **Conversion** : Support de 4 formats majeurs
- **Filtres** : N&B, Sépia, Flou, Luminosité, Contraste, Saturation, Inversé

---

### 📝 Outils Texte (4 outils)

| Outil | Description | Fonction |
|-------|-------------|----------|
| **Compteur de Mots** | Statistiques complètes du texte | Analyse en temps réel |
| **Casse Texte** | 6 transformations de casse | RegEx |
| **Différence Texte** | Comparaison de deux textes | Algorithme de similarité |
| **Lorem Ipsum** | Générateur de texte de remplissage | Générateur aléatoire |

**Fonctionnalités détaillées :**
- **Compteur** : Mots, caractères (avec/sans espaces), lignes, paragraphes, temps de lecture
- **Casse** : MAJUSCULES, minuscules, Title Case, Sentence case, camelCase, snake_case
- **Différence** : Pourcentage de similarité, statistiques comparatives
- **Lorem** : Génération par paragraphes, phrases ou mots

---

### 💻 Dev Tools (6 outils)

| Outil | Description | Librairie |
|-------|-------------|-----------|
| **JSON Formatter** | Formatage et minification JSON | Native JS |
| **Base64** | Encode/Décode Base64 | `btoa/atob` |
| **URL Encoder** | Encode/Décode URLs | `encodeURIComponent` |
| **Hash Generator** | MD5, SHA-1, SHA-256, SHA-512 | `crypto-js` |
| **JWT Decoder** | Décodage de tokens JWT | Native JS |
| **RegEx Tester** | Testeur d'expressions régulières | RegExp API |

**Fonctionnalités détaillées :**
- **JSON** : Validation, formatage avec indentation, minification
- **Base64** : Bidirectionnel, gestion des erreurs
- **URL** : Encodage/décodage complet des URLs
- **Hash** : 4 algorithmes de hashing simultanés
- **JWT** : Décodage header + payload, affichage formaté
- **RegEx** : Test en temps réel, affichage des correspondances avec position

---

### 🔢 Outils de Calcul (5 outils)

| Outil | Description | Fonction |
|-------|-------------|----------|
| **Calculatrice** | Calculatrice scientifique | `eval()` sécurisé |
| **Convertisseur Unités** | Longueur, poids, température | Formules de conversion |
| **Pourcentage** | Calculs de pourcentages | Algorithmes mathématiques |
| **TVA Calculator** | Ajouter/retirer la TVA | Calculs fiscaux |
| **IMC Calculator** | Indice de masse corporelle | Formule OMS |

**Fonctionnalités détaillées :**
- **Calculatrice** : Interface tactile, historique des calculs
- **Convertisseur** : 6 unités de longueur, 4 unités de poids
- **Pourcentage** : Calcul direct, avec augmentation, avec réduction
- **TVA** : Support de 3 taux (5.5%, 10%, 20%), calcul HT/TTC
- **IMC** : Classification selon l'OMS, indicateur visuel

---

### 📱 QR & Codes-Barres (2 outils)

| Outil | Description | Librairie |
|-------|-------------|-----------|
| **Générateur QR** | QR codes personnalisés | `qrcode` |
| **Code-Barres** | Codes-barres multiformats | `jsbarcode` |

**Fonctionnalités détaillées :**
- **QR Code** : Génération haute résolution, personnalisation couleurs
- **Code-Barres** : Support de CODE128, EAN-13, UPC, CODE39
- Téléchargement en PNG haute qualité

---

### 🎨 Outils Couleur (4 outils)

| Outil | Description | Technologie |
|-------|-------------|-------------|
| **Palette Couleurs** | Génération de palettes harmonieuses | Algorithme HSL |
| **Convertisseur** | HEX ↔ RGB ↔ HSL ↔ RGBA ↔ HSLA | Algorithmes de conversion |
| **Dégradé CSS** | Créateur de dégradés CSS | Linear Gradient |
| **Contraste Checker** | Vérification accessibilité WCAG | Ratio de luminance |

**Fonctionnalités détaillées :**
- **Palette** : 5 nuances + couleur complémentaire, copie en un clic
- **Convertisseur** : 5 formats, conversion en temps réel
- **Dégradé** : 8 directions, génération de code CSS
- **Contraste** : Conformité WCAG AA/AAA, ratio de contraste

---

## 📥 Installation

### Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** (installé avec Node.js)

### Vérifier l'installation
```bash
node --version
npm --version
```

### Installation de Node.js sur macOS
```bash
# Avec Homebrew
brew install node

# Ou téléchargez depuis https://nodejs.org/
```

### Installation du projet
```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/toolbox-app.git

# 2. Aller dans le dossier
cd toolbox-app

# 3. Installer les dépendances
npm install

# 4. Lancer l'application
npm start
```

L'application s'ouvrira automatiquement à `http://localhost:3000`

---

## 🎮 Utilisation

### Démarrage rapide

1. **Lancez l'application** : `npm start`
2. **Choisissez une catégorie** : PDF, Images, Texte, Dev, Calculs, QR, Couleurs
3. **Sélectionnez un outil** : Cliquez sur la carte de l'outil désiré
4. **Utilisez l'outil** : Suivez les instructions à l'écran
5. **Téléchargez le résultat** : Cliquez sur le bouton de téléchargement

### Exemple d'utilisation : Fusionner des PDFs
```
1. Cliquez sur "PDF" dans la barre de catégories
2. Sélectionnez "Fusionner PDF"
3. Cliquez sur "Sélectionner des PDF"
4. Choisissez 2 ou plusieurs fichiers PDF
5. Cliquez sur "Fusionner les PDF"
6. Le PDF fusionné se télécharge automatiquement
```

### Raccourcis clavier

- `Cmd/Ctrl + K` : Rechercher un outil
- `Esc` : Retour à l'accueil
- `Cmd/Ctrl + C` : Copier le résultat (quand disponible)

---

## 🏗️ Architecture
```
toolbox-app/
├── public/
│   └── index.html              # Point d'entrée HTML
├── src/
│   ├── components/             # Composants réutilisables
│   │   ├── Header.js          # En-tête de l'application
│   │   ├── SearchBar.js       # Barre de recherche
│   │   ├── Categories.js      # Filtres par catégorie
│   │   ├── ToolGrid.js        # Grille d'outils
│   │   ├── ToolDetail.js      # Vue détaillée d'un outil
│   │   └── Footer.js          # Pied de page
│   ├── tools/                  # Modules d'outils
│   │   ├── PDFTools.js        # 4 outils PDF
│   │   ├── ImageTools.js      # 4 outils Image
│   │   ├── TextTools.js       # 4 outils Texte
│   │   ├── DevTools.js        # 6 outils Dev
│   │   ├── CalcTools.js       # 5 outils Calcul
│   │   ├── QRTools.js         # 2 outils QR/Codes
│   │   └── ColorTools.js      # 4 outils Couleur
│   ├── App.js                  # Composant principal
│   ├── index.js                # Point d'entrée React
│   └── index.css               # Styles globaux + Tailwind
├── package.json                # Dépendances du projet
├── tailwind.config.js          # Configuration Tailwind
└── README.md                   # Ce fichier
```

### Patterns de conception utilisés

- **Component-Based Architecture** : Composants React réutilisables
- **Module Pattern** : Chaque catégorie d'outils dans son propre module
- **Hooks Pattern** : `useState`, `useRef`, `useEffect` pour la gestion d'état
- **Controlled Components** : Formulaires contrôlés pour une meilleure UX

---

## 🛠️ Technologies utilisées

### Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| **React** | 18.2.0 | Framework principal |
| **Tailwind CSS** | 3.3.0 | Styling et design |
| **Lucide React** | 0.263.1 | Icônes |

### Librairies de manipulation

| Librairie | Version | Usage |
|-----------|---------|-------|
| **pdf-lib** | 1.17.1 | Manipulation de PDFs |
| **jspdf** | - | Création de PDFs |
| **pdfjs-dist** | - | Rendu de PDFs |
| **qrcode** | 1.5.3 | Génération de QR codes |
| **jsbarcode** | - | Génération de codes-barres |
| **crypto-js** | 4.2.0 | Hashing (MD5, SHA) |
| **html2canvas** | 1.4.1 | Capture d'écran |
| **jszip** | 3.10.1 | Compression ZIP |
| **file-saver** | 2.0.5 | Téléchargement de fichiers |

### APIs du navigateur

- **Canvas API** : Manipulation d'images
- **File API** : Lecture de fichiers
- **Blob API** : Création de fichiers
- **Web Crypto API** : Hashing supplémentaire

---

## 📜 Scripts disponibles
```bash
# Lancer en mode développement
npm start

# Compiler pour la production
npm run build

# Lancer les tests
npm test

# Éjecter la configuration (irréversible)
npm run eject

# Analyser le bundle
npm run analyze
```

### Compilation pour la production
```bash
npm run build
```

Crée un dossier `build/` optimisé et minifié prêt pour le déploiement.

### Déploiement

**Sur Netlify :**
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Déployer
npm run build
netlify deploy --prod --dir=build
```

**Sur Vercel :**
```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

---

## 🔧 Configuration

### Personnalisation des couleurs

Éditez `tailwind.config.js` :
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',    // Indigo
        secondary: '#a855f7',  // Purple
        accent: '#ec4899',     // Pink
      },
    },
  },
}
```

### Ajout d'un nouvel outil

1. **Créez votre composant** dans le fichier approprié (ex: `src/tools/PDFTools.js`)
```javascript
const MonNouvelOutil = () => {
  // Votre logique ici
  return <div>Mon outil</div>;
};

// Exportez-le
export const PDFTools = {
  // ... autres outils
  MonNouvelOutil,
};
```

2. **Ajoutez-le dans `App.js`** :
```javascript
const tools = [
  // ... autres outils
  {
    id: 'mon-outil',
    name: 'Mon Nouvel Outil',
    category: 'pdf',
    icon: FileText,
    desc: 'Description courte',
    component: PDFTools.MonNouvelOutil
  },
];
```

---

## 🐛 Dépannage

### Problèmes courants

**Erreur : "Module not found"**
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 déjà utilisé**
```bash
# Utiliser un autre port
PORT=3001 npm start
```

**Erreur de compilation Tailwind**
```bash
# Vérifier la configuration
npx tailwindcss init
```

**PDF ne se télécharge pas (Safari)**
- Safari bloque parfois les téléchargements automatiques
- Solution : Autoriser les pop-ups pour localhost

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créez** votre branche (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Guidelines de contribution

- Suivez les conventions de code existantes
- Ajoutez des tests si nécessaire
- Mettez à jour la documentation
- Décrivez clairement vos changements dans la PR

---

## 📊 Statistiques du projet

- **30+ outils** fonctionnels
- **7 catégories** d'outils
- **10+ librairies** intégrées
- **100% gratuit** et open-source
- **0 dépendances** côté serveur

---

## 🎯 Roadmap

### Version 2.0 (À venir)

- [ ] Mode sombre
- [ ] Historique des actions
- [ ] Sauvegarde des favoris
- [ ] Plus d'outils PDF (rotation, extraction de pages)
- [ ] Support du drag & drop
- [ ] PWA (Progressive Web App)
- [ ] Support multilingue (FR/EN/ES)
- [ ] Export batch (plusieurs fichiers)

### Version 3.0 (Futur)

- [ ] Compte utilisateur (optionnel)
- [ ] Stockage cloud
- [ ] API publique
- [ ] Plugins communautaires

---

## 📄 License

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- [React](https://reactjs.org/) - La librairie qui rend tout possible
- [Tailwind CSS](https://tailwindcss.com/) - Pour le design magnifique
- [Lucide](https://lucide.dev/) - Pour les icônes élégantes
- [pdf-lib](https://pdf-lib.js.org/) - Manipulation de PDFs en JavaScript
- [qrcode](https://github.com/soldair/node-qrcode) - Génération de QR codes
- Tous les contributeurs open-source

---

## 🌟 Star History

Si ce projet vous a aidé, donnez-lui une ⭐ sur GitHub !

---

<div align="center">

**Fait avec ❤️ par la communauté**

[⬆ Retour en haut](#-toolbox-web---la-boîte-à-outils-ultime)

</div>
