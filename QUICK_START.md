# 🚀 Démarrage Rapide - MongoDB

## ✅ Ce qui a été fait

1. ✅ **Backend Node.js/Express** créé (`server.js`)
2. ✅ **Intégration MongoDB** configurée
3. ✅ **Sélection des dons** corrigée
4. ✅ **Fonctionnalités de contact** ajoutées (Email, Appel, WhatsApp)
5. ✅ **Frontend** modifié pour utiliser MongoDB

## 📋 Étapes pour démarrer

### 1. Configurer MongoDB Atlas (10 minutes)

1. Créez un compte sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (gratuit)
2. Créez un cluster gratuit
3. Configurez l'accès réseau (Allow from anywhere)
4. Créez un utilisateur de base de données
5. Obtenez votre chaîne de connexion

**Guide détaillé** : Voir `MONGODB_SETUP.md`

### 2. Configurer le backend

1. **Créez un fichier `.env`** à la racine :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/laura-gourmet?retryWrites=true&w=majority
PORT=3000
```

2. **Installez les dépendances** :

```bash
npm install
```

3. **Démarrez le serveur** :

```bash
npm start
```

Le serveur devrait démarrer sur `http://localhost:3000`

### 3. Configurer le frontend

1. **Ouvrez `api-config.js`**
2. **Pour le développement local**, laissez :
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```

3. **Pour la production**, remplacez par l'URL de votre backend Render :
   ```javascript
   const API_BASE_URL = 'https://votre-backend.onrender.com/api';
   ```

### 4. Déployer sur Render

#### Backend (Web Service)

1. Créez un nouveau **Web Service** sur Render
2. Connectez votre dépôt GitHub
3. Configuration :
   - Build Command : `npm install`
   - Start Command : `npm start`
4. Ajoutez la variable d'environnement `MONGODB_URI`

#### Frontend (Static Site)

1. Créez un nouveau **Static Site** sur Render
2. Connectez votre dépôt GitHub
3. Mettez à jour `api-config.js` avec l'URL du backend

## 🎯 Fonctionnalités

### ✅ Stockage MongoDB
- Toutes les données stockées dans MongoDB
- Accessible depuis tous les navigateurs
- Synchronisé en temps réel

### ✅ Contact des donateurs
- **Email** : Cliquez pour ouvrir le client email
- **Appel** : Cliquez pour appeler directement (si numéro)
- **WhatsApp** : Cliquez pour contacter sur WhatsApp (si numéro)

### ✅ Sélection des dons corrigée
- Les cartes de sélection sont maintenant entièrement cliquables
- Le bouton "Choisir" fonctionne aussi

## 📁 Fichiers importants

- `server.js` - Backend Node.js/Express
- `package.json` - Dépendances Node.js
- `api-config.js` - Configuration de l'URL de l'API
- `MONGODB_SETUP.md` - Guide détaillé MongoDB

## 🆘 Problèmes courants

### Le backend ne démarre pas
- Vérifiez que MongoDB Atlas est configuré
- Vérifiez que le fichier `.env` existe
- Vérifiez que `MONGODB_URI` est correct

### Les données ne s'affichent pas
- Vérifiez que le backend est démarré
- Vérifiez que l'URL dans `api-config.js` est correcte
- Ouvrez la console (F12) pour voir les erreurs

### La sélection des dons ne marche toujours pas
- Videz le cache du navigateur (Ctrl+Shift+R)
- Vérifiez que `script.js` est bien chargé

---

**Une fois configuré, tout fonctionnera avec MongoDB ! 🎉**

