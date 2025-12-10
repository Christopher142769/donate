# 🚀 Démarrage Rapide - MongoDB Local

## ✅ Configuration Terminée !

Tout est configuré pour utiliser MongoDB local au lieu de localStorage.

## 📋 Étapes pour Démarrer

### 1. Démarrer MongoDB

```bash
sudo systemctl start mongod
```

Vérifier que MongoDB fonctionne :
```bash
sudo systemctl status mongod
```

### 2. Installer les Dépendances (si pas déjà fait)

```bash
npm install
```

### 3. Démarrer le Serveur Backend

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

### 4. Tester le Frontend

1. Ouvrez `index.html` dans votre navigateur
2. Ouvrez la console (F12)
3. Vous devriez voir : `✅ API_BASE_URL configuré: http://localhost:3000/api`
4. Faites un don de test
5. Ouvrez le dashboard et vérifiez que les données apparaissent

## 🔍 Vérifier les Données dans MongoDB

```bash
# Se connecter à MongoDB
mongosh

# Utiliser la base de données
use laura-gourmet

# Voir les collections
show collections

# Voir les donateurs
db.donors.find().pretty()

# Compter les donateurs
db.donors.countDocuments()
```

## 🐛 Dépannage

### Erreur : "MongoDB connection error"
```bash
# Démarrer MongoDB
sudo systemctl start mongod

# Vérifier le statut
sudo systemctl status mongod
```

### Erreur : "Port 3000 already in use"
```bash
# Trouver le processus
lsof -i :3000

# Tuer le processus (remplacez PID par le numéro)
kill -9 PID
```

### Erreur : "Cannot find module"
```bash
npm install
```

## ✅ Fichiers Configurés

- ✅ `.env` - MongoDB local configuré
- ✅ `api-config.js` - Pointant vers localhost:3000
- ✅ `server.js` - Backend prêt avec MongoDB

## 🎉 Résultat

Maintenant, toutes les données sont stockées dans MongoDB local au lieu de localStorage !

Les données seront :
- ✅ Accessibles depuis tous les navigateurs
- ✅ Persistantes même après fermeture du navigateur
- ✅ Stockées dans une vraie base de données

