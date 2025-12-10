# Dashboard - Guide d'utilisation

## 🔐 Accès au Dashboard

Le dashboard est accessible via : `dashboard.html`

**Mot de passe par défaut** : `laura2024`

⚠️ **IMPORTANT** : Changez le mot de passe dans le fichier `dashboard.js` (ligne 2) avant de mettre en production !

```javascript
const DASHBOARD_PASSWORD = 'VOTRE_MOT_DE_PASSE';
```

## 📊 Fonctionnalités

### 1. Gestion des Donateurs
- Visualisation de tous les donateurs
- Filtrage par type de don (espèce/nature)
- Affichage des informations : Nom, Prénom, Contact, Type, Date
- Cartes visuelles avec avatars générés automatiquement

### 2. Statistiques
- Nombre de dons en espèce
- Nombre de dons en nature
- Total de donateurs

### 3. Export des données
- Export CSV pour Excel
- Copie des données dans le presse-papier

## 🔄 Fonctionnement

### Collecte des données
Quand un donateur remplit le formulaire :
1. **Don en espèce** : Formulaire → Informations Mobile Money → Confirmation
2. **Don en nature** : Formulaire → Redirection WhatsApp → Confirmation

Les données sont automatiquement sauvegardées dans le `localStorage` du navigateur.

### Stockage des données
- Les données sont stockées localement dans le navigateur (localStorage)
- Format : JSON avec les champs suivants :
  - `id` : Identifiant unique
  - `firstName` : Prénom
  - `lastName` : Nom
  - `contact` : Email ou numéro de téléphone
  - `type` : 'cash' ou 'nature'
  - `date` : Date et heure du don (ISO format)

## ⚠️ Limitations actuelles

### Stockage local
- Les données sont stockées dans le navigateur (localStorage)
- Elles sont perdues si :
  - Le cache du navigateur est vidé
  - L'utilisateur utilise un autre navigateur
  - Les données sont supprimées manuellement

### Recommandations pour la production

Pour un usage en production, il est **fortement recommandé** de :

1. **Migrer vers un backend**
   - Utiliser une base de données (MySQL, PostgreSQL, MongoDB)
   - Créer une API REST pour sauvegarder les données
   - Implémenter une authentification sécurisée

2. **Sécuriser l'authentification**
   - Utiliser un système d'authentification robuste
   - Hash des mots de passe (bcrypt)
   - Tokens JWT pour les sessions

3. **Backup régulier**
   - Exporter régulièrement les données
   - Sauvegarder dans un stockage cloud

## 🛠️ Personnalisation

### Changer le mot de passe
Modifiez la ligne 2 de `dashboard.js` :
```javascript
const DASHBOARD_PASSWORD = 'votre_nouveau_mot_de_passe';
```

### Modifier les couleurs
Les couleurs sont définies dans `dashboard.css` dans la section `:root` :
```css
:root {
    --primary-color: #FF6B35;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    /* ... */
}
```

## 📱 Responsive

Le dashboard est entièrement responsive et s'adapte à :
- Ordinateurs de bureau
- Tablettes
- Smartphones

## 🔒 Sécurité

### Actuel (localStorage)
- Mot de passe stocké en clair dans le code (à changer en production)
- Session stockée dans sessionStorage
- Données accessibles via localStorage

### Recommandations
- Ne jamais commiter le mot de passe dans Git
- Utiliser des variables d'environnement
- Implémenter HTTPS
- Utiliser un backend sécurisé

## 📞 Support

Pour toute question ou problème, consultez la documentation ou contactez le support.

---

**Note** : Ce dashboard est une version de démonstration. Pour un usage en production, migrez vers un backend sécurisé.


