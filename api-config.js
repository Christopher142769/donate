// Configuration de l'API Backend
// Backend hébergé sur Render
window.API_BASE_URL = 'https://laura-gourmet-backend.onrender.com/api';

// Si pas d'URL définie, le système utilisera localStorage comme fallback
if (!window.API_BASE_URL) {
    console.log('⚠️ API_BASE_URL non configuré. Le système utilisera localStorage comme fallback.');
} else {
    console.log('✅ API_BASE_URL configuré:', window.API_BASE_URL);
}
