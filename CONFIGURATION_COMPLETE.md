# ✅ Configuration Complète - MongoDB Atlas

## 📍 Où Mettre Votre Lien MongoDB Atlas

### Étape 1 : Créer le fichier `.env`

1. **Créez un fichier `.env`** à la racine du projet (à côté de `server.js`)
2. **Copiez le contenu de `.env.example`** dans `.env`
3. **Remplacez** les valeurs par vos informations MongoDB Atlas

### Étape 2 : Obtenir Votre Chaîne de Connexion MongoDB Atlas

1. Allez sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Connectez-vous à votre compte
3. Cliquez sur **"Connect"** sur votre cluster
4. Choisissez **"Connect your application"**
5. **Copiez la chaîne de connexion** (elle ressemble à : `mongodb+srv://username:password@cluster.mongodb.net/...`)

### Étape 3 : Configurer le fichier `.env`

Ouvrez `.env` et remplacez :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/laura-gourmet?retryWrites=true&w=majority
```

**Exemple réel** :
```env
MONGODB_URI=mongodb+srv://laura:monMotDePasse123@cluster0.abc123.mongodb.net/laura-gourmet?retryWrites=true&w=majority
PORT=3000
```

### Étape 4 : Configurer le Frontend (`api-config.js`)

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

## 🔧 Structure des Fichiers

```
/home/valentino/Don/
├── .env                    ← MongoDB URI ici (CRÉER CE FICHIER)
├── .env.example            ← Exemple (ne pas modifier)
├── api-config.js           ← URL du backend ici (pour le frontend)
├── server.js               ← Backend Node.js (utilise .env)
└── script.js               ← Frontend (utilise api-config.js)
```

## ✅ Vérification

### 1. Vérifier le Backend

```bash
# Démarrer le serveur
npm start

# Vous devriez voir :
# ✅ Connected to MongoDB
```

### 2. Vérifier le Frontend

Ouvrez la console du navigateur (F12) :
- Pas d'erreur de connexion
- Les données sont sauvegardées/récupérées

## 🚨 Problèmes Courants

### Erreur : "MongoDB connection error"
- Vérifiez que votre IP est autorisée dans MongoDB Atlas (Network Access)
- Vérifiez que le username/password sont corrects
- Vérifiez que la chaîne de connexion est complète

### Erreur : "API_BASE_URL non configuré"
- C'est normal si vous n'avez pas encore de backend
- Le système utilisera localStorage comme fallback
- Pour utiliser MongoDB, configurez `api-config.js` avec l'URL de votre backend

## 📝 Résumé

1. **Backend** : MongoDB URI dans `.env` (fichier à créer)
2. **Frontend** : URL du backend dans `api-config.js`

---

**Une fois configuré, toutes vos données seront stockées dans MongoDB Atlas ! 🎉**

