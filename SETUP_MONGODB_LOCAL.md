# 🚀 Configuration MongoDB Local

## ✅ Fichiers Créés/Modifiés

1. **`.env`** - Configuration MongoDB locale créée
2. **`api-config.js`** - Configuré pour utiliser `http://localhost:3000/api`
3. **`server.js`** - Amélioré avec de meilleurs logs

## 📋 Étapes pour Démarrer

### 1. Installer MongoDB (si pas déjà installé)

**Sur Ubuntu/Debian** :
```bash
sudo apt-get update
sudo apt-get install -y mongodb
```

**Sur macOS** :
```bash
brew install mongodb-community
```

**Sur Windows** :
Téléchargez depuis [mongodb.com/download](https://www.mongodb.com/try/download/community)

### 2. Démarrer MongoDB

**Sur Linux** :
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Pour démarrer automatiquement au boot
```

**Sur macOS** :
```bash
brew services start mongodb-community
```

**Sur Windows** :
MongoDB démarre automatiquement comme service

### 3. Vérifier que MongoDB fonctionne

```bash
# Vérifier le statut
sudo systemctl status mongod

# Ou tester la connexion
mongosh
# Tapez: exit pour quitter
```

### 4. Installer les Dépendances Node.js

```bash
npm install
```

### 5. Démarrer le Serveur Backend

```bash
npm start
```

Vous devriez voir :
```
🔌 Tentative de connexion à MongoDB: mongodb://localhost:27017/laura-gourmet
✅ Connected to MongoDB successfully!
📊 Database: laura-gourmet
🚀 Server running on port 3000
```

### 6. Tester le Frontend

1. Ouvrez `index.html` dans votre navigateur
2. Ouvrez la console (F12)
3. Vous devriez voir : `✅ API_BASE_URL configuré: http://localhost:3000/api`
4. Faites un don de test
5. Vérifiez dans le dashboard que les données sont bien sauvegardées

## 🔍 Vérification

### Vérifier les Données dans MongoDB

```bash
# Se connecter à MongoDB
mongosh

# Utiliser la base de données
use laura-gourmet

# Voir les collections
show collections

# Voir les donateurs
db.donors.find().pretty()
```

## 🐛 Dépannage

### Erreur : "MongoDB connection error"
- Vérifiez que MongoDB est démarré : `sudo systemctl status mongod`
- Démarrez MongoDB : `sudo systemctl start mongod`
- Vérifiez le port : MongoDB utilise le port 27017 par défaut

### Erreur : "Cannot find module"
- Installez les dépendances : `npm install`

### Erreur : "Port 3000 already in use"
- Changez le port dans `.env` : `PORT=3001`
- Ou arrêtez le processus qui utilise le port 3000

## 📝 Fichiers de Configuration

- **`.env`** : Configuration MongoDB locale
- **`api-config.js`** : URL du backend (localhost:3000)
- **`server.js`** : Backend Node.js/Express

## ✅ Résultat

Maintenant, toutes les données sont stockées dans MongoDB local au lieu de localStorage ! 🎉

Les données seront accessibles depuis tous les navigateurs et persistantes même après fermeture du navigateur.

