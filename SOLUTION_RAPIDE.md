# 🚀 Solution Rapide - Stockage Universel

## ⚠️ Problème actuel

Les données sont stockées dans **localStorage** qui est **spécifique au navigateur**. Si vous remplissez un formulaire sur Chrome et ouvrez le dashboard sur Firefox, vous ne verrez pas les données.

## ✅ Solution : Firebase (Recommandé)

Firebase stocke les données sur un **serveur centralisé**, accessible depuis **tous les navigateurs**.

### 🎯 Étapes rapides (15 minutes)

#### 1. Créer un compte Firebase (5 min)

1. Allez sur [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquez sur "Ajouter un projet"
3. Nom : `laura-gourmet-dons`
4. Créez le projet

#### 2. Activer Firestore (3 min)

1. Menu → **Firestore Database**
2. "Créer une base de données"
3. Mode **test**
4. Région (choisissez la plus proche)
5. "Activer"

#### 3. Configurer les règles (2 min)

1. Onglet **Règles**
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

3. "Publier"

#### 4. Obtenir les clés (3 min)

1. **Paramètres du projet** (⚙️)
2. "Vos applications" → Icône **Web** (`</>`)
3. Nom : `laura-gourmet-dons`
4. **Copiez les clés** affichées

#### 5. Configurer dans votre projet (2 min)

1. **Ouvrez `firebase-config.js`**
2. **Remplacez** `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, etc. par vos clés
3. **Dans `index.html`**, décommentez les lignes Firebase (lignes 245-248)
4. **Dans `dashboard.html`**, décommentez les lignes Firebase (lignes 193-196)
5. **Renommez** `script-firebase.js` en `script.js` (sauvegardez l'ancien d'abord)
6. **Renommez** `dashboard-firebase.js` en `dashboard.js` (sauvegardez l'ancien d'abord)

## 🎉 Résultat

Après ces étapes :
- ✅ Les données seront stockées sur Firebase
- ✅ Accessibles depuis **tous les navigateurs**
- ✅ Synchronisées en temps réel
- ✅ Visibles dans le dashboard peu importe le navigateur

## 📝 Fichiers à modifier

1. `firebase-config.js` → Ajoutez vos clés
2. `index.html` → Décommentez les scripts Firebase
3. `dashboard.html` → Décommentez les scripts Firebase
4. Remplacez `script.js` par `script-firebase.js`
5. Remplacez `dashboard.js` par `dashboard-firebase.js`

## 🆘 Besoin d'aide ?

Consultez `MIGRATION_FIREBASE.md` pour un guide détaillé.

---

**Une fois configuré, vos données seront accessibles depuis n'importe quel navigateur ! 🎉**


