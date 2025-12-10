// Fichier de configuration exemple pour KkiaPay
// Copiez ce fichier en config.js et remplissez vos vraies clés
// Ne commitez JAMAIS config.js dans votre dépôt Git

const CONFIG = {
    // Votre clé publique KkiaPay (sécurisée pour le frontend)
    KKIAPAY_PUBLIC_KEY: 'YOUR_KKIAPAY_PUBLIC_KEY',
    
    // Votre clé API KkiaPay (à utiliser uniquement côté serveur pour plus de sécurité)
    KKIAPAY_API_KEY: 'YOUR_KKIAPAY_API_KEY',
    
    // Numéro WhatsApp pour les dons en nature
    WHATSAPP_NUMBER: '22967448441',
    
    // Message par défaut pour WhatsApp
    WHATSAPP_MESSAGE: 'Bonjour, je souhaite faire un don en nature pour les 72h de Grillarde de Laura GOURMET.',
    
    // URL de callback après paiement
    PAYMENT_CALLBACK_URL: window.location.href + '?payment=success',
    
    // Montant minimum de don (en FCFA)
    MIN_DONATION_AMOUNT: 100,
    
    // Devise
    CURRENCY: 'XOF'
};

// Pour utiliser cette configuration dans script.js :
// 1. Importez ce fichier dans votre HTML : <script src="config.js"></script>
// 2. Utilisez CONFIG.KKIAPAY_PUBLIC_KEY au lieu de la valeur en dur



