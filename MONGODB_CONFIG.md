# 🔧 Configuration MongoDB Atlas

## 📍 Où Configurer MongoDB Atlas

### Option 1 : Backend Node.js (Recommandé)

Si vous avez un backend Node.js (`server.js`), configurez MongoDB dans le fichier `.env` :

1. **Créez un fichier `.env`** à la racine du projet :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/laura-gourmet?retryWrites=true&w=majority
PORT=3000
```

2. **Remplacez** :
   - `username` : Votre nom d'utilisateur MongoDB Atlas
   - `password` : Votre mot de passe MongoDB Atlas
   - `cluster` : Le nom de votre cluster (ex: `cluster0.xxxxx.mongodb.net`)

3. **Exemple réel** :
```env
MONGODB_URI=mongodb+srv://laura:monMotDePasse123@cluster0.abc123.mongodb.net/laura-gourmet?retryWrites=true&w=majority
PORT=3000
```

### Option 2 : Frontend Direct (Si pas de backend)

Si vous n'avez pas de backend et voulez utiliser MongoDB directement depuis le frontend, vous devez utiliser MongoDB Realm ou une API tierce.

**⚠️ Note** : MongoDB Atlas ne peut pas être utilisé directement depuis le navigateur pour des raisons de sécurité. Vous devez passer par un backend.

## 🔗 Obtenir Votre Chaîne de Connexion MongoDB Atlas

1. Allez sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Connectez-vous à votre compte
3. Cliquez sur "Connect" sur votre cluster
4. Choisissez "Connect your application"
5. Copiez la chaîne de connexion (elle ressemble à : `mongodb+srv://username:password@cluster.mongodb.net/...`)

## 🚀 Configuration pour le Frontend (api-config.js)

Si vous avez un backend hébergé sur Render :

1. **Ouvrez `api-config.js`**
2. **Remplacez** :
```javascript
window.API_BASE_URL = null;
```
par :
```javascript
window.API_BASE_URL = 'https://votre-backend.onrender.com/api';
```

**Exemple** :
```javascript
window.API_BASE_URL = 'https://laura-gourmet-backend.onrender.com/api';
```

## 📝 Structure Complète

```
Votre Projet/
├── .env                    ← MongoDB URI ici (pour le backend)
├── api-config.js           ← URL du backend ici (pour le frontend)
├── server.js               ← Backend Node.js
└── script.js               ← Frontend (utilise api-config.js)
```

## ✅ Vérification

### Backend
```bash
# Vérifiez que le backend se connecte à MongoDB
npm start
# Devrait afficher: ✅ Connected to MongoDB
```

### Frontend
Ouvrez la console du navigateur (F12) et vérifiez :
- Pas d'erreur de connexion
- Les données sont sauvegardées/récupérées

## 🔒 Sécurité

⚠️ **IMPORTANT** : Ne jamais mettre votre chaîne de connexion MongoDB dans le code frontend (HTML/JS visible). Utilisez toujours un backend.

## 📚 Guide Complet

Voir `MONGODB_SETUP.md` pour un guide détaillé étape par étape.

