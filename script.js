// Navbar scroll effect
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenuWrapper = document.getElementById('navMenuWrapper');
const navLinks = document.querySelectorAll('.nav-link');
let lastScroll = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile menu toggle
if (mobileMenuToggle && navMenuWrapper) {
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
}

// Parallax effect désactivé pour éviter les problèmes d'affichage
// L'effet parallaxe peut causer des espaces vides et des problèmes de rendu

// API Base URL - Sera défini par api-config.js (ne pas redéclarer ici)
// Utiliser window.API_BASE_URL qui est défini dans api-config.js

// Function to save donor data to MongoDB
async function saveDonorData(donorData) {
    try {
        // Utiliser window.API_BASE_URL défini dans api-config.js
        const API_URL = window.API_BASE_URL || 'http://localhost:3000/api';
        const response = await fetch(`${API_URL}/donors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: donorData.firstName,
                lastName: donorData.lastName,
                contact: donorData.contact,
                type: donorData.type
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Donor data saved to MongoDB:', result);
        } else {
            throw new Error(`API error: ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Error saving donor data to MongoDB:', error);
        // Fallback to localStorage if API fails
        try {
            let donors = JSON.parse(localStorage.getItem('lauraGourmetDonors') || '[]');
            donors.push({
                id: Date.now().toString(),
                ...donorData
            });
            localStorage.setItem('lauraGourmetDonors', JSON.stringify(donors));
            console.log('⚠️ Fallback: Saved to localStorage');
        } catch (localError) {
            console.error('❌ Error saving to localStorage:', localError);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeDonationSystem();
        initializeOtherFeatures();
    });
} else {
    // DOM is already loaded
    initializeDonationSystem();
    initializeOtherFeatures();
}

// Initialize donation system
function initializeDonationSystem() {
    console.log('🚀 Initialisation du système de don...');
    
    // Modal management
    const donationModal = document.getElementById('donationModal');
    const paymentModal = document.getElementById('paymentModal');
    const thankYouModal = document.getElementById('thankYouModal');
    const donorInfoModalCash = document.getElementById('donorInfoModalCash');
    const donorInfoModalNature = document.getElementById('donorInfoModalNature');

    const btnDonateNav = document.getElementById('btnDonateNav');
    const btnDonateHero = document.getElementById('btnDonateHero');
    // btnDonateCta supprimé car la section CTA a été retirée
    const closeModal = document.getElementById('closeModal');
    const closePaymentModal = document.getElementById('closePaymentModal');
    const closeThankYouModal = document.getElementById('closeThankYouModal');
    const closeDonorInfoModalCash = document.getElementById('closeDonorInfoModalCash');
    const closeDonorInfoModalNature = document.getElementById('closeDonorInfoModalNature');

    // Check if elements exist
    if (!donationModal) {
        console.error('❌ Donation modal not found');
        return;
    }
    
    console.log('✅ Modal trouvée:', donationModal ? 'OUI' : 'NON');
    console.log('✅ btnDonateNav trouvé:', btnDonateNav ? 'OUI' : 'NON');
    console.log('✅ btnDonateHero trouvé:', btnDonateHero ? 'OUI' : 'NON');

    // Open donation modal
    function openDonationModal() {
        // Close mobile menu if open
        if (mobileMenuToggle && navMenuWrapper) {
            mobileMenuToggle.classList.remove('active');
            navMenuWrapper.classList.remove('active');
        }
        
        if (donationModal) {
            donationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modals
    function closeAllModals() {
        if (donationModal) donationModal.classList.remove('active');
        if (paymentModal) paymentModal.classList.remove('active');
        if (thankYouModal) thankYouModal.classList.remove('active');
        if (donorInfoModalCash) donorInfoModalCash.classList.remove('active');
        if (donorInfoModalNature) donorInfoModalNature.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners for opening donation modal - using onclick for better compatibility
    if (btnDonateNav) {
        btnDonateNav.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            openDonationModal();
        };
    } else {
        console.error('❌ btnDonateNav not found');
    }

    if (btnDonateHero) {
        btnDonateHero.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            openDonationModal();
        };
    } else {
        console.error('❌ btnDonateHero not found');
    }

    // btnDonateCta supprimé - la section CTA a été retirée du HTML

    // Event listeners for closing modals
    if (closeModal) {
        closeModal.onclick = closeAllModals;
    }

    if (closePaymentModal) {
        closePaymentModal.onclick = closeAllModals;
    }

    if (closeThankYouModal) {
        closeThankYouModal.onclick = closeAllModals;
    }

    if (closeDonorInfoModalCash) {
        closeDonorInfoModalCash.onclick = function() {
            if (donorInfoModalCash) {
                donorInfoModalCash.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        };
    }

    if (closeDonorInfoModalNature) {
        closeDonorInfoModalNature.onclick = function() {
            if (donorInfoModalNature) {
                donorInfoModalNature.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        };
    }

    // Close modal when clicking outside
    if (donationModal) {
        donationModal.addEventListener('click', (e) => {
            if (e.target === donationModal) {
                closeAllModals();
            }
        });
    }

    if (paymentModal) {
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                closeAllModals();
            }
        });
    }

    if (thankYouModal) {
        thankYouModal.addEventListener('click', (e) => {
            if (e.target === thankYouModal) {
                closeAllModals();
            }
        });
    }

    if (donorInfoModalCash) {
        donorInfoModalCash.addEventListener('click', (e) => {
            if (e.target === donorInfoModalCash) {
                donorInfoModalCash.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (donorInfoModalNature) {
        donorInfoModalNature.addEventListener('click', (e) => {
            if (e.target === donorInfoModalNature) {
                donorInfoModalNature.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Donation type selection
    const donationCash = document.getElementById('donationCash');
    const donationNature = document.getElementById('donationNature');
    const donorFormCash = document.getElementById('donorFormCash');
    const donorFormNature = document.getElementById('donorFormNature');

    // Cash donation - open donor info modal first
    if (donationCash) {
        donationCash.style.cursor = 'pointer';
        
        // Handle clicks on the entire card
        donationCash.onclick = function(e) {
            // Don't trigger if clicking the button (it will handle its own click)
            if (e.target.classList.contains('btn-option') || e.target.closest('.btn-option')) {
                return;
            }
            if (donationModal) donationModal.classList.remove('active');
            setTimeout(() => {
                if (donorInfoModalCash) {
                    donorInfoModalCash.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
        };
        
        // Also handle button click specifically
        const donationCashBtn = donationCash.querySelector('.btn-option');
        if (donationCashBtn) {
            donationCashBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (donationModal) donationModal.classList.remove('active');
                setTimeout(() => {
                    if (donorInfoModalCash) {
                        donorInfoModalCash.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }, 300);
            };
        }
    } else {
        console.error('❌ donationCash not found');
    }

    // Nature donation - open donor info modal first
    if (donationNature) {
        donationNature.style.cursor = 'pointer';
        
        // Handle clicks on the entire card
        donationNature.onclick = function(e) {
            // Don't trigger if clicking the button (it will handle its own click)
            if (e.target.classList.contains('btn-option') || e.target.closest('.btn-option')) {
                return;
            }
            if (donationModal) donationModal.classList.remove('active');
            setTimeout(() => {
                if (donorInfoModalNature) {
                    donorInfoModalNature.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
        };
        
        // Also handle button click specifically
        const donationNatureBtn = donationNature.querySelector('.btn-option');
        if (donationNatureBtn) {
            donationNatureBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (donationModal) donationModal.classList.remove('active');
                setTimeout(() => {
                    if (donorInfoModalNature) {
                        donorInfoModalNature.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }, 300);
            };
        }
    } else {
        console.error('❌ donationNature not found');
    }

    // Handle donor form submission (Cash)
    if (donorFormCash) {
        donorFormCash.onsubmit = function(e) {
            e.preventDefault();
            
            const firstNameInput = document.getElementById('firstNameCash');
            const lastNameInput = document.getElementById('lastNameCash');
            const contactInput = document.getElementById('contactCash');
            
            if (!firstNameInput || !lastNameInput || !contactInput) {
                console.error('❌ Form inputs not found');
                return;
            }
            
            const formData = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                contact: contactInput.value.trim(),
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
            if (donorInfoModalCash) donorInfoModalCash.classList.remove('active');
            setTimeout(() => {
                if (paymentModal) {
                    paymentModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
            
            // Reset form
            donorFormCash.reset();
        };
    } else {
        console.error('❌ donorFormCash not found');
    }

    // Handle donor form submission (Nature)
    if (donorFormNature) {
        donorFormNature.onsubmit = function(e) {
            e.preventDefault();
            
            const firstNameInput = document.getElementById('firstNameNature');
            const lastNameInput = document.getElementById('lastNameNature');
            const contactInput = document.getElementById('contactNature');
            
            if (!firstNameInput || !lastNameInput || !contactInput) {
                console.error('❌ Form inputs not found');
                return;
            }
            
            const formData = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                contact: contactInput.value.trim(),
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
            if (donorInfoModalNature) donorInfoModalNature.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Show thank you message
            setTimeout(() => {
                if (thankYouModal) {
                    thankYouModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 500);
            
            // Reset form
            donorFormNature.reset();
        };
    } else {
        console.error('❌ donorFormNature not found');
    }

    // Mobile Money payment info
    const momoNumber = '229016744841'; // Format pour copie (sans +)
    const momoNumberDisplay = '+229 01 67 44 84 41'; // Format pour affichage
    const momoName = 'Amoussouga gwladys Laurane';
    const copyMomoNumberBtn = document.getElementById('copyMomoNumber');
    const copyMomoNameBtn = document.getElementById('copyMomoName');
    const btnConfirmPayment = document.getElementById('btnConfirmPayment');
    const momoNumberElement = document.getElementById('momoNumber');

    // Set display value
    if (momoNumberElement) {
        momoNumberElement.textContent = momoNumberDisplay;
    }

    // Copy Momo number to clipboard
    if (copyMomoNumberBtn) {
        copyMomoNumberBtn.onclick = function() {
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
        };
    }

    // Copy Momo name to clipboard
    if (copyMomoNameBtn) {
        copyMomoNameBtn.onclick = function() {
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
        };
    }

    // Confirm payment button
    if (btnConfirmPayment) {
        btnConfirmPayment.onclick = function() {
            // Data is already saved when form was submitted
            // Just close modals and show thank you message
            closeAllModals();
            setTimeout(() => {
                if (thankYouModal) {
                    thankYouModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
        };
    }

    // Handle keyboard events (ESC to close modals)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Initialize other features
function initializeOtherFeatures() {
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

    // Add fade-in animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}
