# 🔥 Migration vers Firebase - Guide Complet

## 🎯 Objectif

Migrer de localStorage vers Firebase pour que les données soient **accessibles depuis tous les navigateurs**.

## 📋 Étapes de migration

### Étape 1 : Créer un projet Firebase

1. Allez sur [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquez sur "Ajouter un projet"
3. Nom : `laura-gourmet-dons`
4. Créez le projet

### Étape 2 : Activer Firestore

1. Dans le menu, cliquez sur **Firestore Database**
2. Cliquez sur "Créer une base de données"
3. Choisissez **Mode test**
4. Sélectionnez une région
5. Cliquez sur "Activer"

### Étape 3 : Configurer les règles

1. Onglet **Règles** dans Firestore
2. Remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /donors/{donorId} {
      allow read, write: if true;
    }
  }
}
```

3. Cliquez sur "Publier"

### Étape 4 : Obtenir les clés

1. **Paramètres du projet** (icône engrenage)
2. Section "Vos applications"
3. Cliquez sur l'icône **Web** (`</>`)
4. Nom : `laura-gourmet-dons`
5. **Copiez les clés** affichées

### Étape 5 : Configurer dans votre projet

1. **Modifiez `firebase-config.js`** avec vos clés
2. **Décommentez les scripts Firebase** dans `index.html` et `dashboard.html`
3. **Remplacez `script.js`** par `script-firebase.js`
4. **Remplacez `dashboard.js`** par `dashboard-firebase.js`

### Étape 6 : Ajouter les scripts Firebase

Dans `index.html` et `dashboard.html`, **avant** `</body>`, ajoutez :

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
```

## ✅ Après migration

- ✅ Les données seront stockées sur Firebase
- ✅ Accessibles depuis **tous les navigateurs**
- ✅ Synchronisées en temps réel
- ✅ Sauvegardées automatiquement

## 🔄 Migration des données existantes

Si vous avez déjà des données dans localStorage :

1. Ouvrez le dashboard
2. Exportez en CSV
3. Les nouvelles données iront automatiquement dans Firebase
4. Les anciennes données resteront dans localStorage (elles seront progressivement remplacées)

## 🆘 Dépannage

### Firebase n'est pas chargé
- Vérifiez que les scripts sont bien décommentés
- Vérifiez que `firebase-config.js` contient vos clés
- Ouvrez la console (F12) pour voir les erreurs

### Les données ne s'affichent pas
- Vérifiez les règles Firestore
- Vérifiez que la collection s'appelle `donors`
- Vérifiez la console pour les erreurs

## 📊 Avantages

- ✅ **Stockage universel** : Accessible depuis tous les navigateurs
- ✅ **Temps réel** : Mise à jour automatique
- ✅ **Gratuit** : 50k lectures/jour, 20k écritures/jour
- ✅ **Sécurisé** : Règles configurables

---

**Une fois configuré, vos données seront accessibles depuis n'importe quel navigateur ! 🎉**


