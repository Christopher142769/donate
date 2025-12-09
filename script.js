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

// Cash donation - open payment modal
donationCash.addEventListener('click', () => {
    donationModal.classList.remove('active');
    setTimeout(() => {
        paymentModal.classList.add('active');
    }, 300);
});

// Nature donation - open WhatsApp
donationNature.addEventListener('click', () => {
    const phoneNumber = '22967448441';
    const message = encodeURIComponent('Bonjour, je souhaite faire un don en nature pour les 72h de Grillarde de Laura GOURMET.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    closeAllModals();
    
    // Show thank you message after a delay
    setTimeout(() => {
        thankYouModal.classList.add('active');
    }, 500);
});

// Mobile Money payment info
const momoNumber = '22967448441'; // Format pour copie (sans +)
const momoNumberDisplay = '+229 67 44 84 41'; // Format pour affichage
const momoName = 'Amoussouga gwladys Laurane';
const copyMomoNumberBtn = document.getElementById('copyMomoNumber');
const copyMomoNameBtn = document.getElementById('copyMomoName');
const btnConfirmPayment = document.getElementById('btnConfirmPayment');

// Set display value
document.getElementById('momoNumber').textContent = momoNumberDisplay;

// Copy Momo number to clipboard
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

// Copy Momo name to clipboard
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

// Confirm payment button
btnConfirmPayment.addEventListener('click', () => {
    closeAllModals();
    setTimeout(() => {
        thankYouModal.classList.add('active');
    }, 300);
});

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
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation to buttons
function addButtonLoading(button) {
    button.style.opacity = '0.7';
    button.style.pointerEvents = 'none';
    button.innerHTML = '<span>Chargement...</span>';
}

function removeButtonLoading(button, originalText) {
    button.style.opacity = '1';
    button.style.pointerEvents = 'auto';
    button.innerHTML = originalText;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
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
});

// Handle keyboard events (ESC to close modals)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

