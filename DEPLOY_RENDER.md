# Guide de déploiement sur Render

Ce guide vous explique comment héberger votre plateforme de dons sur Render.

## 📋 Prérequis

1. Un compte GitHub (gratuit)
2. Un compte Render (gratuit disponible sur [render.com](https://render.com))

## 🚀 Étapes de déploiement

### Étape 1 : Préparer votre projet

1. **Créer un dépôt GitHub** (si ce n'est pas déjà fait)
   - Allez sur [github.com](https://github.com)
   - Créez un nouveau dépôt (ex: `laura-gourmet-dons`)
   - Ne cochez PAS "Initialize with README" si vous avez déjà des fichiers

2. **Initialiser Git dans votre projet** (si ce n'est pas déjà fait)
   ```bash
   cd /home/valentino/Don
   git init
   git add .
   git commit -m "Initial commit - Plateforme de dons Laura GOURMET"
   ```

3. **Créer un fichier .gitignore** (optionnel mais recommandé)
   ```bash
   echo "node_modules/
   .DS_Store
   *.log" > .gitignore
   ```

### Étape 2 : Pousser vers GitHub

1. **Ajouter le dépôt distant**
   ```bash
   git remote add origin https://github.com/VOTRE_USERNAME/laura-gourmet-dons.git
   ```
   (Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub)

2. **Pousser le code**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Étape 3 : Déployer sur Render

1. **Se connecter à Render**
   - Allez sur [render.com](https://render.com)
   - Cliquez sur "Get Started for Free"
   - Connectez-vous avec votre compte GitHub

2. **Créer un nouveau service**
   - Dans le dashboard, cliquez sur "New +"
   - Sélectionnez "Static Site"

3. **Configurer le service**
   - **Name** : `laura-gourmet-dons` (ou le nom de votre choix)
   - **Repository** : Sélectionnez votre dépôt GitHub
   - **Branch** : `main` (ou `master` selon votre branche)
   - **Root Directory** : Laissez vide (ou mettez `.` si nécessaire)
   - **Build Command** : Laissez vide (site statique, pas de build nécessaire)
   - **Publish Directory** : Laissez vide (ou mettez `.`)

4. **Déployer**
   - Cliquez sur "Create Static Site"
   - Render va automatiquement déployer votre site
   - Le déploiement prend généralement 1-2 minutes

### Étape 4 : Obtenir votre URL

Une fois le déploiement terminé :
- Vous obtiendrez une URL gratuite : `https://laura-gourmet-dons.onrender.com`
- Cette URL est permanente et gratuite
- Vous pouvez la partager avec vos utilisateurs

## 🔧 Configuration avancée (optionnel)

### Personnaliser l'URL

1. Dans votre service Render, allez dans "Settings"
2. Cliquez sur "Custom Domain"
3. Ajoutez votre propre domaine si vous en avez un

### Variables d'environnement

Pour ce projet, aucune variable d'environnement n'est nécessaire car tout est statique.

## 📝 Notes importantes

- **Gratuit** : Render offre un plan gratuit pour les sites statiques
- **HTTPS** : Tous les sites sur Render ont HTTPS automatiquement
- **Mises à jour** : Chaque fois que vous poussez du code sur GitHub, Render redéploie automatiquement
- **Performance** : Le site sera rapide grâce au CDN de Render

## 🔄 Mettre à jour le site

Pour mettre à jour votre site après des modifications :

```bash
git add .
git commit -m "Description des modifications"
git push origin main
```

Render détectera automatiquement les changements et redéploiera le site.

## 🆘 Dépannage

### Le site ne se charge pas
- Vérifiez que tous les fichiers sont bien dans le dépôt GitHub
- Vérifiez que `index.html` est à la racine du projet
- Regardez les logs dans Render pour voir les erreurs

### Les images/vidéos ne s'affichent pas
- Vérifiez que les fichiers sont dans le dossier `assets/`
- Vérifiez que les chemins dans le HTML sont corrects
- Assurez-vous que les fichiers sont bien commités dans Git

### Le menu mobile ne fonctionne pas
- Vérifiez que `script.js` est bien chargé dans `index.html`
- Ouvrez la console du navigateur (F12) pour voir les erreurs JavaScript

## 📞 Support

Si vous rencontrez des problèmes :
- Documentation Render : [render.com/docs](https://render.com/docs)
- Support Render : support@render.com

---

**Félicitations !** Votre plateforme de dons est maintenant en ligne ! 🎉


