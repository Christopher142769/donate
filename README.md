# Laura GOURMET - Plateforme de Dons

Une plateforme moderne et élégante pour recevoir des dons pour les **72h de Grillarde** organisées par Laura GOURMET.

## 🎨 Fonctionnalités

- **Design moderne** avec effets parallaxe et animations fluides
- **Section héro** avec vidéo en arrière-plan (grillade de viande)
- **Navbar responsive** avec logo et navigation
- **Système de dons** avec deux options :
  - **Don en espèce** : Paiement en ligne via KkiaPay
  - **Don en nature** : Contact direct via WhatsApp (+229 67 44 84 41)
- **Modales élégantes** pour la sélection et le paiement
- **Message de remerciement** personnalisé après chaque don
- **Design responsive** pour tous les appareils

## 🚀 Installation

1. Clonez ou téléchargez ce projet
2. Ouvrez `index.html` dans votre navigateur
3. Pour la production, servez les fichiers via un serveur web (Apache, Nginx, etc.)

## ⚙️ Configuration KkiaPay

Pour activer les paiements en ligne, vous devez configurer votre clé publique KkiaPay :

1. Obtenez votre clé publique KkiaPay depuis votre compte KkiaPay
2. Ouvrez le fichier `script.js`
3. Remplacez `YOUR_KKIAPAY_PUBLIC_KEY` à la ligne 78 par votre clé publique :

```javascript
const kkiapayPublicKey = 'VOTRE_CLE_PUBLIQUE_KKIAPAY';
```

4. Si vous utilisez le SDK KkiaPay, ajoutez le script dans `index.html` :

```html
<script src="https://cdn.kkiapay.me/k.js"></script>
```

## 📝 Personnalisation

### Changer la vidéo de fond

Remplacez l'URL de la vidéo dans `index.html` (ligne 32) :

```html
<source src="VOTRE_VIDEO_DE_GRILLADE.mp4" type="video/mp4">
```

### Modifier le numéro WhatsApp

Le numéro WhatsApp est configuré dans `script.js` (ligne 95) :

```javascript
const phoneNumber = '22967448441';
```

### Personnaliser les couleurs

Les couleurs principales sont définies dans `styles.css` dans la section `:root` :

```css
:root {
    --primary-color: #FF6B35;
    --secondary-color: #F7931E;
    /* ... */
}
```

## 📱 Responsive Design

La plateforme est entièrement responsive et s'adapte à :
- Ordinateurs de bureau
- Tablettes
- Smartphones

## 🌐 Compatibilité

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

## 📄 Structure des fichiers

```
Don/
├── index.html      # Structure HTML principale
├── styles.css      # Styles et animations
├── script.js       # Logique JavaScript
└── README.md       # Documentation
```

## 🎯 Utilisation

1. L'utilisateur clique sur "Faire un Don"
2. Une modale s'ouvre avec deux options :
   - **Don en espèce** : Ouvre le formulaire de paiement KkiaPay
   - **Don en nature** : Ouvre WhatsApp avec un message pré-rempli
3. Après le paiement/contact, un message de remerciement s'affiche

## 🔒 Sécurité

- Ne partagez jamais votre clé privée KkiaPay
- Utilisez HTTPS en production
- Validez toujours les montants côté serveur

## 📞 Support

Pour toute question ou problème, contactez :
- Téléphone : +229 67 44 84 41
- WhatsApp : [Envoyer un message](https://wa.me/22967448441)

## 📜 Licence

© 2024 Laura GOURMET - 72h de Grillarde. Tous droits réservés.



