// Dashboard Password (Change this to your desired password)
// In production, this should be stored securely on a backend
const DASHBOARD_PASSWORD = 'laura2024'; // Change this password!

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Toggle sidebar on mobile
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        mobileMenuToggle.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : 'auto';
    });
}

// Close sidebar when clicking overlay
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        mobileMenuToggle.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Check if user is already logged in
const isAuthenticated = sessionStorage.getItem('dashboardAuthenticated') === 'true';

const loginScreen = document.getElementById('loginScreen');
const dashboardContainer = document.getElementById('dashboardContainer');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const btnLogout = document.getElementById('btnLogout');

// Show appropriate screen based on authentication
if (isAuthenticated) {
    showDashboard();
} else {
    showLogin();
}

// Login form handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    if (password === DASHBOARD_PASSWORD) {
        sessionStorage.setItem('dashboardAuthenticated', 'true');
        showDashboard();
        loginForm.reset();
        loginError.textContent = '';
    } else {
        loginError.textContent = 'Mot de passe incorrect';
        loginError.style.color = '#ef4444';
        setTimeout(() => {
            loginError.textContent = '';
        }, 3000);
    }
});

// Logout handler
btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('dashboardAuthenticated');
    showLogin();
});

function showLogin() {
    loginScreen.style.display = 'flex';
    dashboardContainer.style.display = 'none';
}

function showDashboard() {
    loginScreen.style.display = 'none';
    dashboardContainer.style.display = 'flex';
    loadDonors();
    updateStats();
}

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const sections = {
    donors: document.getElementById('donorsSection'),
    stats: document.getElementById('statsSection'),
    export: document.getElementById('exportSection')
};

// Close sidebar when clicking nav items on mobile
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            sidebar.classList.remove('open');
            mobileMenuToggle.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show selected section
        Object.values(sections).forEach(sec => sec.style.display = 'none');
        if (sections[section]) {
            sections[section].style.display = 'block';
        }
        
        // Update title
        const titles = {
            donors: 'Donateurs',
            stats: 'Statistiques',
            export: 'Exporter les données'
        };
        document.getElementById('dashboardTitle').textContent = titles[section] || 'Dashboard';
        
        // Load data if needed
        if (section === 'stats') {
            updateStats();
        }
    });
});

// API Base URL - Sera défini par api-config.js
const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000/api';

// Load and display donors from MongoDB
async function loadDonors() {
    try {
        const filterType = document.getElementById('filterType').value;
        const url = filterType === 'all' 
            ? `${API_BASE_URL}/donors`
            : `${API_BASE_URL}/donors?type=${filterType}`;
        
        const response = await fetch(url);
        
        if (response.ok) {
            const donors = await response.json();
            displayDonors(donors);
            updateDonorsCount(donors.length);
            console.log('✅ Donors loaded from MongoDB');
        } else {
            throw new Error(`API error: ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Error loading donors from MongoDB:', error);
        // Fallback to localStorage
        try {
            const donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
            const filterType = document.getElementById('filterType').value;
            let filteredDonors = donors;
            if (filterType !== 'all') {
                filteredDonors = donors.filter(d => d.type === filterType);
            }
            filteredDonors.sort((a, b) => new Date(b.date) - new Date(a.date));
            displayDonors(filteredDonors);
            updateDonorsCount(filteredDonors.length);
            console.log('⚠️ Fallback: Loaded from localStorage');
        } catch (localError) {
            console.error('Error loading from localStorage:', localError);
            displayDonors([]);
        }
    }
}

// Display donors in grid
function displayDonors(donors) {
    const donorsGrid = document.getElementById('donorsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (donors.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    donorsGrid.innerHTML = donors.map(donor => {
        const initials = `${donor.firstName.charAt(0)}${donor.lastName.charAt(0)}`.toUpperCase();
        // Handle MongoDB date format (can be string or Date object)
        const date = donor.date ? new Date(donor.date) : new Date(donor.createdAt || Date.now());
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const typeLabel = donor.type === 'cash' ? 'Don en espèce' : 'Don en nature';
        const typeClass = donor.type === 'cash' ? 'cash' : 'nature';
        
        // Determine contact type
        const isEmail = donor.contact.includes('@');
        const isPhone = /^[\d\s\+\-\(\)]+$/.test(donor.contact.replace(/\s/g, ''));
        const contactIcon = isEmail 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
        
        // Contact buttons
        let contactButtons = '';
        if (isEmail) {
            contactButtons = `
                <button class="btn-contact btn-email" onclick="contactByEmail('${donor.contact}', '${donor.firstName} ${donor.lastName}')" title="Envoyer un email">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email
                </button>
            `;
        } else if (isPhone) {
            // Nettoyer le numéro mais garder le format pour l'appel
            const phoneNumber = donor.contact.replace(/[\s\-\(\)]/g, '');
            // Échapper les caractères spéciaux pour le HTML
            const escapedPhoneNumber = phoneNumber.replace(/'/g, "\\'");
            contactButtons = `
                <button class="btn-contact btn-call" onclick="contactByCall('${escapedPhoneNumber}')" title="Appeler">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Appeler
                </button>
                <button class="btn-contact btn-whatsapp" onclick="contactByWhatsApp('${phoneNumber}', '${donor.firstName} ${donor.lastName}')" title="Contacter sur WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                </button>
            `;
        }
        
        return `
            <div class="donor-card">
                <div class="donor-header">
                    <div class="donor-avatar">${initials}</div>
                    <div class="donor-name">
                        <h3>${donor.firstName} ${donor.lastName}</h3>
                        <span class="donor-type ${typeClass}">${typeLabel}</span>
                    </div>
                </div>
                <div class="donor-info">
                    <div class="donor-info-item">
                        ${contactIcon}
                        <span>${donor.contact}</span>
                    </div>
                </div>
                <div class="donor-actions">
                    ${contactButtons}
                </div>
                <div class="donor-date">
                    ${formattedDate}
                </div>
            </div>
        `;
    }).join('');
}

// Update donors count
function updateDonorsCount(count) {
    const countElement = document.getElementById('donorsCount');
    countElement.textContent = `${count} ${count === 1 ? 'donateur' : 'donateurs'}`;
}

// Update statistics from MongoDB
async function updateStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`);
        
        if (response.ok) {
            const stats = await response.json();
            document.getElementById('cashDonorsCount').textContent = stats.cash;
            document.getElementById('natureDonorsCount').textContent = stats.nature;
            document.getElementById('totalDonorsCount').textContent = stats.total;
            console.log('✅ Stats loaded from MongoDB');
        } else {
            throw new Error(`API error: ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Error updating stats from MongoDB:', error);
        // Fallback to localStorage
        try {
            const donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
            const cashCount = donors.filter(d => d.type === 'cash').length;
            const natureCount = donors.filter(d => d.type === 'nature').length;
            const totalCount = donors.length;
            
            document.getElementById('cashDonorsCount').textContent = cashCount;
            document.getElementById('natureDonorsCount').textContent = natureCount;
            document.getElementById('totalDonorsCount').textContent = totalCount;
            console.log('⚠️ Fallback: Stats from localStorage');
        } catch (localError) {
            console.error('Error updating stats:', localError);
        }
    }
}

// Filter donors
document.getElementById('filterType').addEventListener('change', () => {
    loadDonors();
});

// Refresh button
document.getElementById('btnRefresh').addEventListener('click', () => {
    loadDonors();
    updateStats();
});

// Export to CSV
document.getElementById('btnExportCSV').addEventListener('click', async () => {
    try {
        let donors = [];
        
        // Try to load from MongoDB API first
        try {
            const response = await fetch(`${API_BASE_URL}/donors`);
            if (response.ok) {
                donors = await response.json();
            } else {
                throw new Error('API error');
            }
        } catch (error) {
            // Fallback to localStorage
            donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
        }
        
        if (donors.length === 0) {
            alert('Aucune donnée à exporter');
            return;
        }
        
        // Create CSV header
        const headers = ['Prénom', 'Nom', 'Contact', 'Type', 'Date'];
        const csvRows = [headers.join(',')];
        
        // Add data rows
        donors.forEach(donor => {
            // Handle MongoDB date format
            const dateValue = donor.date || donor.createdAt || new Date();
            const date = new Date(dateValue);
            const formattedDate = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR');
            const type = donor.type === 'cash' ? 'Don en espèce' : 'Don en nature';
            
            const row = [
                `"${donor.firstName}"`,
                `"${donor.lastName}"`,
                `"${donor.contact}"`,
                `"${type}"`,
                `"${formattedDate}"`
            ];
            csvRows.push(row.join(','));
        });
        
        // Create CSV content
        const csvContent = csvRows.join('\n');
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `donateurs_laura_gourmet_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('Export CSV réussi !');
    } catch (error) {
        console.error('Error exporting CSV:', error);
        alert('Erreur lors de l\'export CSV');
    }
});

// Copy data to clipboard
document.getElementById('btnCopyData').addEventListener('click', async () => {
    try {
        let donors = [];
        
        // Try to load from MongoDB API first
        try {
            const response = await fetch(`${API_BASE_URL}/donors`);
            if (response.ok) {
                donors = await response.json();
            } else {
                throw new Error('API error');
            }
        } catch (error) {
            // Fallback to localStorage
            donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
        }
        
        if (donors.length === 0) {
            alert('Aucune donnée à copier');
            return;
        }
        
        // Format data as text
        let text = 'LISTE DES DONATEURS - LAURA GOURMET\n';
        text += '=====================================\n\n';
        
        donors.forEach((donor, index) => {
            // Handle MongoDB date format
            const dateValue = donor.date || donor.createdAt || new Date();
            const date = new Date(dateValue);
            const formattedDate = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR');
            const type = donor.type === 'cash' ? 'Don en espèce' : 'Don en nature';
            
            text += `${index + 1}. ${donor.firstName} ${donor.lastName}\n`;
            text += `   Contact: ${donor.contact}\n`;
            text += `   Type: ${type}\n`;
            text += `   Date: ${formattedDate}\n\n`;
        });
        
        // Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Données copiées dans le presse-papier !');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
            alert('Erreur lors de la copie');
        });
    } catch (error) {
        console.error('Error copying data:', error);
        alert('Erreur lors de la copie');
    }
});

// Contact functions
window.contactByEmail = function(email, name) {
    const subject = encodeURIComponent(`Contact - 72h de Grillarde - ${name}`);
    const body = encodeURIComponent(`Bonjour ${name},\n\n`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};

window.contactByCall = function(phoneNumber) {
    // Nettoyer le numéro (enlever les espaces et caractères spéciaux sauf +)
    const cleanNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    // Ajouter + si ce n'est pas déjà présent
    const formattedNumber = cleanNumber.startsWith('+') ? cleanNumber : `+${cleanNumber}`;
    console.log('📞 Appel vers:', formattedNumber);
    window.location.href = `tel:${formattedNumber}`;
};

window.contactByWhatsApp = function(phoneNumber, name) {
    const message = encodeURIComponent(`Bonjour ${name}, je vous contacte concernant votre don pour les 72h de Grillarde.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
};

// Auto-refresh every 30 seconds
setInterval(() => {
    if (isAuthenticated) {
        loadDonors();
        updateStats();
    }
}, 30000);

