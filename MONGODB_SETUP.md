# 🍃 Configuration MongoDB - Guide Complet

## 🎯 Objectif

Configurer MongoDB pour stocker toutes les données des donateurs de manière centralisée et accessible depuis tous les navigateurs.

## 📋 Étapes de configuration

### Étape 1 : Créer un compte MongoDB Atlas (Gratuit)

1. Allez sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Cliquez sur "Try Free"
3. Créez un compte (gratuit)
4. Choisissez "Build a Database"
5. Sélectionnez le plan **FREE (M0)**

### Étape 2 : Créer un cluster

1. Choisissez un **Cloud Provider** (AWS, Google Cloud, Azure)
2. Choisissez une **région** (la plus proche de vous)
3. Laissez "M0 Sandbox" (gratuit)
4. Cliquez sur "Create"

### Étape 3 : Configurer l'accès réseau

1. Dans "Network Access", cliquez sur "Add IP Address"
2. Cliquez sur "Allow Access from Anywhere" (0.0.0.0/0)
3. Cliquez sur "Confirm"

### Étape 4 : Créer un utilisateur de base de données

1. Dans "Database Access", cliquez sur "Add New Database User"
2. Choisissez "Password" comme méthode d'authentification
3. Entrez un **username** et un **password** (notez-les bien !)
4. Rôle : "Atlas admin" ou "Read and write to any database"
5. Cliquez sur "Add User"

### Étape 5 : Obtenir la chaîne de connexion

1. Dans "Database", cliquez sur "Connect"
2. Choisissez "Connect your application"
3. Driver : **Node.js**
4. Version : **4.1 or later**
5. **Copiez la chaîne de connexion** (elle ressemble à : `mongodb+srv://username:password@cluster.mongodb.net/...`)

### Étape 6 : Configurer le backend

1. **Créez un fichier `.env`** à la racine du projet :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/laura-gourmet?retryWrites=true&w=majority
PORT=3000
```

2. **Remplacez** `username` et `password` par vos identifiants MongoDB
3. **Remplacez** `cluster` par le nom de votre cluster

### Étape 7 : Installer les dépendances

```bash
npm install
```

### Étape 8 : Démarrer le serveur

```bash
npm start
```

Le serveur devrait démarrer sur `http://localhost:3000`

## 🚀 Déploiement sur Render

### Créer un service Web sur Render

1. Allez sur [render.com](https://render.com)
2. Créez un compte (gratuit)
3. Cliquez sur "New +" → "Web Service"
4. Connectez votre dépôt GitHub
5. Configuration :
   - **Name** : `laura-gourmet-backend`
   - **Environment** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Plan** : Free

### Ajouter les variables d'environnement

1. Dans votre service Render, allez dans "Environment"
2. Ajoutez :
   - **Key** : `MONGODB_URI`
   - **Value** : Votre chaîne de connexion MongoDB
3. Ajoutez :
   - **Key** : `PORT`
   - **Value** : `3000` (Render définit automatiquement le port)

### Mettre à jour l'URL de l'API

1. Une fois déployé, copiez l'URL de votre service (ex: `https://laura-gourmet-backend.onrender.com`)
2. **Ouvrez `api-config.js`**
3. **Remplacez** l'URL par celle de votre backend :

```javascript
const API_BASE_URL = 'https://laura-gourmet-backend.onrender.com/api';
```

## ✅ Vérification

1. Testez l'API : `https://votre-backend.onrender.com/api/health`
2. Devrait retourner : `{"status":"OK","message":"Server is running"}`

## 📊 Structure de la base de données

Les données sont stockées dans une collection `donors` avec cette structure :

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  contact: String,
  type: 'cash' | 'nature',
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Sécurité

- ✅ Les données sont stockées de manière sécurisée sur MongoDB Atlas
- ✅ Connexion chiffrée (SSL/TLS)
- ✅ Accès contrôlé par authentification
- ✅ Sauvegarde automatique

## 🆘 Dépannage

### Erreur de connexion MongoDB
- Vérifiez que votre IP est autorisée dans Network Access
- Vérifiez que le username/password sont corrects
- Vérifiez que la chaîne de connexion est correcte

### Le serveur ne démarre pas
- Vérifiez que toutes les dépendances sont installées : `npm install`
- Vérifiez que le fichier `.env` existe et contient `MONGODB_URI`
- Vérifiez les logs dans Render

### Les données ne s'affichent pas
- Vérifiez que l'URL dans `api-config.js` est correcte
- Vérifiez la console du navigateur (F12) pour les erreurs
- Vérifiez que le backend est bien démarré

## 📝 Commandes utiles

```bash
# Installation
npm install

# Démarrage en développement
npm run dev

# Démarrage en production
npm start
```

---

**Une fois configuré, toutes vos données seront stockées dans MongoDB et accessibles depuis tous les navigateurs ! 🎉**

