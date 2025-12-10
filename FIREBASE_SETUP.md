# 🔥 Configuration Firebase pour le Stockage Universel

## Pourquoi Firebase ?

Le localStorage stocke les données **uniquement dans le navigateur**. Avec Firebase, les données sont stockées **sur un serveur centralisé** et accessibles depuis **n'importe quel navigateur**.

## 📋 Étapes de configuration

### 1. Créer un compte Firebase

1. Allez sur [firebase.google.com](https://firebase.google.com)
2. Cliquez sur "Commencer"
3. Connectez-vous avec votre compte Google
4. Cliquez sur "Ajouter un projet"
5. Nommez votre projet : `laura-gourmet-dons`
6. Désactivez Google Analytics (optionnel)
7. Cliquez sur "Créer le projet"

### 2. Créer une base de données Firestore

1. Dans votre projet Firebase, allez dans **Firestore Database**
2. Cliquez sur "Créer une base de données"
3. Choisissez **Mode test** (pour commencer)
4. Sélectionnez une région (choisissez la plus proche)
5. Cliquez sur "Activer"

### 3. Configurer les règles de sécurité

1. Allez dans l'onglet **Règles**
2. Remplacez les règles par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre la lecture et l'écriture pour tous (à sécuriser en production)
    match /donors/{donorId} {
      allow read, write: if true;
    }
  }
}
```

3. Cliquez sur "Publier"

### 4. Obtenir les clés de configuration

1. Allez dans **Paramètres du projet** (icône engrenage)
2. Faites défiler jusqu'à "Vos applications"
3. Cliquez sur l'icône **Web** (`</>`)
4. Enregistrez l'app avec un nom : `laura-gourmet-dons`
5. **Copiez les clés de configuration** qui apparaissent

Vous obtiendrez quelque chose comme :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "laura-gourmet-dons.firebaseapp.com",
  projectId: "laura-gourmet-dons",
  storageBucket: "laura-gourmet-dons.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 5. Intégrer Firebase dans votre projet

1. Ajoutez les scripts Firebase dans `index.html` (avant `</body>`)
2. Ajoutez les scripts Firebase dans `dashboard.html` (avant `</body>`)
3. Créez un fichier `firebase-config.js` avec vos clés
4. Modifiez `script.js` et `dashboard.js` pour utiliser Firebase

## 🔒 Sécurisation (Important pour la production)

### Règles de sécurité avancées

Pour la production, remplacez les règles par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /donors/{donorId} {
      // Permettre la lecture uniquement si authentifié
      allow read: if request.auth != null;
      // Permettre l'écriture depuis le site (sans auth pour les dons)
      allow write: if true;
    }
  }
}
```

### Authentification pour le dashboard

1. Dans Firebase, activez **Authentication**
2. Activez **Email/Password** ou **Anonyme**
3. Modifiez le dashboard pour s'authentifier avec Firebase

## 📊 Avantages de Firebase

- ✅ **Stockage centralisé** : Données accessibles depuis tous les navigateurs
- ✅ **Temps réel** : Les données se mettent à jour automatiquement
- ✅ **Gratuit** : Jusqu'à 50 000 lectures/jour et 20 000 écritures/jour
- ✅ **Sécurisé** : Règles de sécurité configurables
- ✅ **Pas de backend** : Tout fonctionne côté client

## 🚀 Après configuration

Une fois Firebase configuré :
- Les données seront stockées sur le serveur Firebase
- Accessibles depuis n'importe quel navigateur
- Synchronisées en temps réel
- Sauvegardées automatiquement

---

**Note** : Suivez les instructions dans les fichiers modifiés pour compléter l'intégration.


