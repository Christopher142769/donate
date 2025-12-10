// Configuration JSONBin.io
// Créez un compte gratuit sur https://jsonbin.io
// Obtenez votre API Key depuis https://jsonbin.io/app/account/api-keys

const JSONBIN_CONFIG = {
    // Remplacez par votre API Key depuis jsonbin.io
    API_KEY: 'YOUR_JSONBIN_API_KEY',
    
    // L'ID du bin sera créé automatiquement au premier enregistrement
    BIN_ID: null
};

// Fonction pour obtenir ou créer le BIN_ID (accessible globalement)
window.getBinId = function() {
    // Vérifier si on a déjà un BIN_ID stocké
    let binId = localStorage.getItem('jsonbin_bin_id');
    if (!binId) {
        // Le BIN_ID sera créé au premier enregistrement
        binId = null;
    }
    return binId;
};

window.setBinId = function(binId) {
    localStorage.setItem('jsonbin_bin_id', binId);
};

