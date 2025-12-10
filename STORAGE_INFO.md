# 📦 Information sur le Stockage des Données

## ⚠️ Important : Limitation actuelle

### Stockage Local (localStorage)

Actuellement, les données des donateurs sont stockées dans le **localStorage du navigateur**. Cela signifie :

- ✅ **Les données sont persistantes** : Elles restent même après fermeture du navigateur
- ✅ **Visibles sur le même navigateur** : Toutes les données sont accessibles sur le même navigateur/domaine
- ❌ **Spécifique au navigateur** : Les données ne sont PAS partagées entre différents navigateurs
- ❌ **Spécifique au domaine** : Les données ne sont PAS partagées entre différents domaines

### Exemple concret

Si vous collectez des dons sur :
- **Chrome** : Les données sont stockées dans Chrome
- **Firefox** : Les données sont stockées dans Firefox (séparément)
- **Safari** : Les données sont stockées dans Safari (séparément)

**Les données ne sont PAS synchronisées entre les navigateurs.**

## 🔄 Solution pour un stockage universel

Pour que les données soient **visibles peu importe le navigateur**, vous devez migrer vers un **backend avec base de données**.

### Options recommandées

#### 1. **Backend simple avec base de données**
- **Firebase** (gratuit jusqu'à un certain quota)
  - Base de données en temps réel
  - Authentification intégrée
  - Facile à intégrer

- **Supabase** (gratuit jusqu'à un certain quota)
  - PostgreSQL en ligne
  - API REST automatique
  - Authentification incluse

#### 2. **Backend personnalisé**
- **Node.js + Express + MongoDB/PostgreSQL**
- **PHP + MySQL**
- **Python + Django + PostgreSQL**

### Migration recommandée

Pour un site hébergé sur Render, vous pouvez :

1. **Créer un service backend** sur Render
2. **Utiliser une base de données** (PostgreSQL, MongoDB, etc.)
3. **Créer une API REST** pour sauvegarder/récupérer les données
4. **Modifier le code** pour appeler l'API au lieu du localStorage

## 📊 État actuel

### Ce qui fonctionne
- ✅ Collecte des données des donateurs
- ✅ Stockage local persistant
- ✅ Dashboard fonctionnel
- ✅ Export CSV
- ✅ Statistiques

### Ce qui ne fonctionne pas (limitation)
- ❌ Partage des données entre navigateurs différents
- ❌ Accès aux données depuis un autre appareil
- ❌ Synchronisation multi-utilisateurs

## 🚀 Pour la production

### Étapes recommandées

1. **Choisir une solution de backend**
   - Firebase (le plus simple)
   - Supabase (bon compromis)
   - Backend personnalisé (plus de contrôle)

2. **Modifier le code**
   - Remplacer `localStorage` par des appels API
   - Ajouter la gestion d'erreurs
   - Ajouter la validation côté serveur

3. **Sécuriser**
   - Authentification robuste
   - Validation des données
   - Protection contre les attaques

## 💡 Solution temporaire

En attendant la migration vers un backend :

- **Utilisez toujours le même navigateur** pour accéder au dashboard
- **Exportez régulièrement** les données en CSV
- **Sauvegardez les exports** dans un endroit sûr

## 📝 Note technique

Le localStorage est stocké par :
- **Domaine** : `https://votre-site.com`
- **Protocole** : `http` vs `https` sont séparés
- **Navigateur** : Chaque navigateur a son propre stockage

Pour un stockage universel, les données doivent être sur un **serveur centralisé** accessible via une **API**.

---

**Conclusion** : Pour un usage en production avec accès multi-navigateurs, migrez vers un backend avec base de données.


