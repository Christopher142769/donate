// Version avec Firebase pour stockage universel
// Remplacez script.js par ce fichier après avoir configuré Firebase

// Firebase initialization
let db;
if (typeof firebase !== 'undefined') {
    try {
        db = firebase.firestore();
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }
} else {
    console.warn('Firebase not loaded. Using localStorage as fallback.');
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenuWrapper = document.getElementById('navMenuWrapper');
const navLinks = document.querySelectorAll('.nav-link');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenuWrapper.classList.toggle('active');
    document.body.style.overflow = navMenuWrapper.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenuWrapper.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenuWrapper.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navMenuWrapper.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Parallax effect (disabled on mobile for better performance)
const parallaxElements = document.querySelectorAll('[data-parallax]');

function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener('scroll', () => {
    if (isMobile()) return; // Disable parallax on mobile
    
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Reset parallax on resize
window.addEventListener('resize', () => {
    if (isMobile()) {
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
    }
});

// Modal management
const donationModal = document.getElementById('donationModal');
const paymentModal = document.getElementById('paymentModal');
const thankYouModal = document.getElementById('thankYouModal');

const btnDonateNav = document.getElementById('btnDonateNav');
const btnDonateHero = document.getElementById('btnDonateHero');
const btnDonateCta = document.getElementById('btnDonateCta');
const closeModal = document.getElementById('closeModal');
const closePaymentModal = document.getElementById('closePaymentModal');
const closeThankYouModal = document.getElementById('closeThankYouModal');

// Open donation modal
function openDonationModal() {
    // Close mobile menu if open
    mobileMenuToggle.classList.remove('active');
    navMenuWrapper.classList.remove('active');
    
    donationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modals
function closeAllModals() {
    donationModal.classList.remove('active');
    paymentModal.classList.remove('active');
    thankYouModal.classList.remove('active');
    donorInfoModalCash.classList.remove('active');
    donorInfoModalNature.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for opening donation modal
btnDonateNav.addEventListener('click', openDonationModal);
btnDonateHero.addEventListener('click', openDonationModal);
btnDonateCta.addEventListener('click', openDonationModal);

// Event listeners for closing modals
closeModal.addEventListener('click', closeAllModals);
closePaymentModal.addEventListener('click', closeAllModals);
closeThankYouModal.addEventListener('click', closeAllModals);

// Close modal when clicking outside
donationModal.addEventListener('click', (e) => {
    if (e.target === donationModal) {
        closeAllModals();
    }
});

paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        closeAllModals();
    }
});

thankYouModal.addEventListener('click', (e) => {
    if (e.target === thankYouModal) {
        closeAllModals();
    }
});

// Donation type selection
const donationCash = document.getElementById('donationCash');
const donationNature = document.getElementById('donationNature');
const donorInfoModalCash = document.getElementById('donorInfoModalCash');
const donorInfoModalNature = document.getElementById('donorInfoModalNature');
const closeDonorInfoModalCash = document.getElementById('closeDonorInfoModalCash');
const closeDonorInfoModalNature = document.getElementById('closeDonorInfoModalNature');
const donorFormCash = document.getElementById('donorFormCash');
const donorFormNature = document.getElementById('donorFormNature');

// Cash donation - open donor info modal first
donationCash.addEventListener('click', () => {
    donationModal.classList.remove('active');
    setTimeout(() => {
        donorInfoModalCash.classList.add('active');
    }, 300);
});

// Nature donation - open donor info modal first
donationNature.addEventListener('click', () => {
    donationModal.classList.remove('active');
    setTimeout(() => {
        donorInfoModalNature.classList.add('active');
    }, 300);
});

// Close donor info modals
closeDonorInfoModalCash.addEventListener('click', () => {
    donorInfoModalCash.classList.remove('active');
    document.body.style.overflow = 'auto';
});

closeDonorInfoModalNature.addEventListener('click', () => {
    donorInfoModalNature.classList.remove('active');
    document.body.style.overflow = 'auto';
});

donorInfoModalCash.addEventListener('click', (e) => {
    if (e.target === donorInfoModalCash) {
        donorInfoModalCash.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

donorInfoModalNature.addEventListener('click', (e) => {
    if (e.target === donorInfoModalNature) {
        donorInfoModalNature.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle donor form submission (Cash)
donorFormCash.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstNameCash').value.trim(),
        lastName: document.getElementById('lastNameCash').value.trim(),
        contact: document.getElementById('contactCash').value.trim(),
        type: 'cash',
        date: new Date().toISOString()
    };
    
    // Validate
    if (!formData.firstName || !formData.lastName || !formData.contact) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }
    
    // Save donor data IMMEDIATELY (before showing payment info)
    saveDonorData(formData);
    
    // Close donor info modal and open payment modal
    donorInfoModalCash.classList.remove('active');
    setTimeout(() => {
        paymentModal.classList.add('active');
    }, 300);
    
    // Reset form
    donorFormCash.reset();
});

// Handle donor form submission (Nature)
donorFormNature.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstNameNature').value.trim(),
        lastName: document.getElementById('lastNameNature').value.trim(),
        contact: document.getElementById('contactNature').value.trim(),
        type: 'nature',
        date: new Date().toISOString()
    };
    
    // Validate
    if (!formData.firstName || !formData.lastName || !formData.contact) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }
    
    // Save donor data
    saveDonorData(formData);
    
    // Open WhatsApp
    const phoneNumber = '22967448441';
    const message = encodeURIComponent(`Bonjour, je suis ${formData.firstName} ${formData.lastName}. Je souhaite faire un don en nature pour les 72h de Grillarde de Laura GOURMET.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modals
    donorInfoModalNature.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Show thank you message
    setTimeout(() => {
        thankYouModal.classList.add('active');
    }, 500);
    
    // Reset form
    donorFormNature.reset();
});

// Mobile Money payment info
const momoNumber = '229016744841'; // Format pour copie (sans +)
const momoNumberDisplay = '+229 01 67 44 84 41'; // Format pour affichage
const momoName = 'Amoussouga gwladys Laurane';
const copyMomoNumberBtn = document.getElementById('copyMomoNumber');
const copyMomoNameBtn = document.getElementById('copyMomoName');
const btnConfirmPayment = document.getElementById('btnConfirmPayment');

// Set display value
if (document.getElementById('momoNumber')) {
    document.getElementById('momoNumber').textContent = momoNumberDisplay;
}

// Copy Momo number to clipboard
if (copyMomoNumberBtn) {
    copyMomoNumberBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(momoNumber).then(() => {
            // Visual feedback
            const originalHTML = copyMomoNumberBtn.innerHTML;
            copyMomoNumberBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            copyMomoNumberBtn.style.color = 'var(--primary-color)';
            
            setTimeout(() => {
                copyMomoNumberBtn.innerHTML = originalHTML;
                copyMomoNumberBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Erreur lors de la copie:', err);
            alert('Impossible de copier. Le numéro est : ' + momoNumber);
        });
    });
}

// Copy Momo name to clipboard
if (copyMomoNameBtn) {
    copyMomoNameBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(momoName).then(() => {
            // Visual feedback
            const originalHTML = copyMomoNameBtn.innerHTML;
            copyMomoNameBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            copyMomoNameBtn.style.color = 'var(--primary-color)';
            
            setTimeout(() => {
                copyMomoNameBtn.innerHTML = originalHTML;
                copyMomoNameBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Erreur lors de la copie:', err);
            alert('Impossible de copier. Le nom est : ' + momoName);
        });
    });
}

// Confirm payment button
if (btnConfirmPayment) {
    btnConfirmPayment.addEventListener('click', () => {
        // Data is already saved when form was submitted
        // Just close modals and show thank you message
        closeAllModals();
        setTimeout(() => {
            thankYouModal.classList.add('active');
        }, 300);
    });
}

// Function to save donor data to Firebase (with localStorage fallback)
async function saveDonorData(donorData) {
    try {
        if (db) {
            // Save to Firebase
            await db.collection('donors').add({
                firstName: donorData.firstName,
                lastName: donorData.lastName,
                contact: donorData.contact,
                type: donorData.type,
                date: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ Donor data saved to Firebase:', donorData);
        } else {
            // Fallback to localStorage if Firebase not configured
            let donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
            donors.push({
                id: Date.now().toString(),
                ...donorData
            });
            localStorage.setItem('lauraGourmetDonors', JSON.stringify(donors));
            console.log('⚠️ Donor data saved to localStorage (Firebase not configured):', donorData);
        }
    } catch (error) {
        console.error('❌ Error saving donor data to Firebase:', error);
        // Fallback to localStorage on error
        try {
            let donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
            donors.push({
                id: Date.now().toString(),
                ...donorData
            });
            localStorage.setItem('lauraGourmetDonors', JSON.stringify(donors));
            console.log('✅ Fallback: Donor data saved to localStorage');
        } catch (localError) {
            console.error('❌ Error saving to localStorage:', localError);
        }
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Logo click - scroll to top
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Handle keyboard events (ESC to close modals)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

