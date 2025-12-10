// Configuration de l'API Backend
// Pour le développement local avec MongoDB local
window.API_BASE_URL = 'http://localhost:3000/api';

// Si pas d'URL définie, le système utilisera localStorage comme fallback
if (!window.API_BASE_URL) {
    console.log('⚠️ API_BASE_URL non configuré. Le système utilisera localStorage comme fallback.');
} else {
    console.log('✅ API_BASE_URL configuré:', window.API_BASE_URL);
}
