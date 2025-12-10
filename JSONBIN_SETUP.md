# 📁 Configuration JSONBin.io - Stockage dans un Fichier JSON

## 🎯 Solution Simple

JSONBin.io permet de stocker vos données dans un **fichier JSON en ligne**, accessible depuis **tous les navigateurs**.

## ✅ Avantages

- ✅ **Gratuit** : 10 000 requêtes/mois gratuites
- ✅ **Simple** : Pas besoin de backend
- ✅ **Universel** : Accessible depuis tous les navigateurs
- ✅ **Fichier JSON** : Données stockées dans un fichier JSON en ligne

## 📋 Configuration (5 minutes)

### Étape 1 : Créer un compte

1. Allez sur [jsonbin.io](https://jsonbin.io)
2. Cliquez sur "Sign Up" (gratuit)
3. Créez un compte avec votre email

### Étape 2 : Obtenir votre API Key

1. Une fois connecté, allez dans **Account** → **API Keys**
2. Cliquez sur "Create API Key"
3. **Copiez votre API Key** (elle commence par `$2b$10$...`)

### Étape 3 : Configurer dans votre projet

1. **Ouvrez `jsonbin-config.js`**
2. **Remplacez** `YOUR_JSONBIN_API_KEY` par votre API Key :

```javascript
const JSONBIN_CONFIG = {
    API_KEY: '$2b$10$votre_cle_api_ici',
    BIN_ID: null
};
```

### Étape 4 : C'est tout !

Les scripts sont déjà configurés. Vos données seront automatiquement :
- ✅ Sauvegardées dans un fichier JSON en ligne
- ✅ Accessibles depuis tous les navigateurs
- ✅ Synchronisées automatiquement

## 🔄 Comment ça fonctionne

1. **Premier don** : Un fichier JSON est créé automatiquement sur JSONBin.io
2. **Donations suivantes** : Les données sont ajoutées au fichier JSON
3. **Dashboard** : Charge les données depuis le fichier JSON en ligne

## 📊 Limites gratuites

- **10 000 requêtes/mois** (lectures + écritures)
- Plus que suffisant pour une plateforme de dons

## 🆘 Dépannage

### Les données ne se sauvegardent pas
- Vérifiez que votre API Key est correcte dans `jsonbin-config.js`
- Vérifiez la console du navigateur (F12) pour les erreurs

### Les données ne s'affichent pas dans le dashboard
- Vérifiez que l'API Key est la même dans les deux fichiers
- Attendez quelques secondes (première connexion peut être lente)

## ✅ Résultat

Après configuration :
- ✅ Les données sont stockées dans un **fichier JSON en ligne**
- ✅ Accessibles depuis **tous les navigateurs**
- ✅ Visibles dans le dashboard peu importe le navigateur
- ✅ Synchronisées automatiquement

---

**C'est la solution la plus simple pour un stockage universel ! 🎉**


