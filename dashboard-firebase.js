// Version avec Firebase pour le dashboard
// Remplacez dashboard.js par ce fichier après avoir configuré Firebase

// Firebase initialization
let db;
if (typeof firebase !== 'undefined') {
    db = firebase.firestore();
}

// Load and display donors from Firebase
async function loadDonors() {
    try {
        if (db) {
            // Load from Firebase
            const snapshot = await db.collection('donors')
                .orderBy('date', 'desc')
                .get();
            
            const donors = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                donors.push({
                    id: doc.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    contact: data.contact,
                    type: data.type,
                    date: data.date ? data.date.toDate().toISOString() : new Date().toISOString()
                });
            });
            
            const filterType = document.getElementById('filterType').value;
            let filteredDonors = donors;
            if (filterType !== 'all') {
                filteredDonors = donors.filter(d => d.type === filterType);
            }
            
            displayDonors(filteredDonors);
            updateDonorsCount(filteredDonors.length);
            
            // Listen for real-time updates
            db.collection('donors')
                .orderBy('date', 'desc')
                .onSnapshot((snapshot) => {
                    const updatedDonors = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        updatedDonors.push({
                            id: doc.id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            contact: data.contact,
                            type: data.type,
                            date: data.date ? data.date.toDate().toISOString() : new Date().toISOString()
                        });
                    });
                    
                    const filterType = document.getElementById('filterType').value;
                    let filteredDonors = updatedDonors;
                    if (filterType !== 'all') {
                        filteredDonors = updatedDonors.filter(d => d.type === filterType);
                    }
                    
                    displayDonors(filteredDonors);
                    updateDonorsCount(filteredDonors.length);
                });
        } else {
            // Fallback to localStorage
            const donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
            const filterType = document.getElementById('filterType').value;
            
            let filteredDonors = donors;
            if (filterType !== 'all') {
                filteredDonors = donors.filter(d => d.type === filterType);
            }
            
            filteredDonors.sort((a, b) => new Date(b.date) - new Date(a.date));
            displayDonors(filteredDonors);
            updateDonorsCount(filteredDonors.length);
        }
    } catch (error) {
        console.error('Error loading donors:', error);
        displayDonors([]);
    }
}

// Update statistics from Firebase
async function updateStats() {
    try {
        if (db) {
            const snapshot = await db.collection('donors').get();
            const donors = [];
            snapshot.forEach(doc => {
                donors.push(doc.data());
            });
            
            const cashCount = donors.filter(d => d.type === 'cash').length;
            const natureCount = donors.filter(d => d.type === 'nature').length;
            const totalCount = donors.length;
            
            document.getElementById('cashDonorsCount').textContent = cashCount;
            document.getElementById('natureDonorsCount').textContent = natureCount;
            document.getElementById('totalDonorsCount').textContent = totalCount;
        } else {
            // Fallback to localStorage
            const donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
            
            const cashCount = donors.filter(d => d.type === 'cash').length;
            const natureCount = donors.filter(d => d.type === 'nature').length;
            const totalCount = donors.length;
            
            document.getElementById('cashDonorsCount').textContent = cashCount;
            document.getElementById('natureDonorsCount').textContent = natureCount;
            document.getElementById('totalDonorsCount').textContent = totalCount;
        }
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// Export to CSV from Firebase
async function exportToCSV() {
    try {
        let donors = [];
        
        if (db) {
            const snapshot = await db.collection('donors').get();
            snapshot.forEach(doc => {
                const data = doc.data();
                donors.push({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    contact: data.contact,
                    type: data.type,
                    date: data.date ? data.date.toDate().toISOString() : new Date().toISOString()
                });
            });
        } else {
            donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
        }
        
        if (donors.length === 0) {
            alert('Aucune donnée à exporter');
            return;
        }
        
        // Create CSV
        const headers = ['Prénom', 'Nom', 'Contact', 'Type', 'Date'];
        const csvRows = [headers.join(',')];
        
        donors.forEach(donor => {
            const date = new Date(donor.date);
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
        
        const csvContent = csvRows.join('\n');
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
}

// Le reste du code du dashboard reste identique
// Copiez tout le contenu de dashboard.js ici et remplacez les fonctions ci-dessus


