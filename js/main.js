// ============================================
// MASTERCLASS - MAIN JAVASCRIPT FILE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initChat();
    initPortfolioFilter();
    initContactForm();
    initSmoothScroll();
    initStatCounters();
    initImageCardEffects();
});

// ============================================
// CHAT WIDGET FUNCTIONALITY
// ============================================

const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const chatMessages = document.getElementById('chatMessages');

// Chat bot responses
const chatResponses = {
    greeting: [
        'Hello! How can I help you today?',
        'Hi there! What can I assist you with?',
        'Welcome to MasterClass! What brings you here?'
    ],
    services: [
        'We offer IT Support, Web Design, Creative Services, Computer Maintenance, and Typing Services. Which one interests you?',
        'Our main services include IT Support, Web Design & Development, Creative Design, Computer Maintenance, and Document Editing. Feel free to learn more!'
    ],
    pricing: [
        'We have three main packages: Starter ($99/month), Professional ($199/month), and Enterprise (Custom). Would you like more details?'
    ],
    contact: [
        'You can reach us at +1 (555) 123-4567 or info@techelite.com. We\'re available Monday-Friday, 9AM-6PM.'
    ],
    portfolio: [
        'We have a great portfolio with web design projects, creative work, and development projects. Check out our Portfolio page to see our latest work!'
    ],
    default: [
        'That\'s interesting! Tell me more about what you need.',
        'I understand. How can we help you further?',
        'Thanks for asking! Is there anything specific I can help with?'
    ]
};

function initChat() {
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChat);
    }
    if (closeChat) {
        closeChat.addEventListener('click', toggleChat);
    }
    if (sendChat) {
        sendChat.addEventListener('click', sendMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function toggleChat() {
    if (chatWidget.classList.contains('show')) {
        chatWidget.classList.remove('show');
        chatToggle.style.display = 'flex';
    } else {
        chatWidget.classList.add('show');
        addChatMessage('bot', 'Hello! Welcome to MasterClass Support. How can I help you today?');
    }
}

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addChatMessage('user', message);
    chatInput.value = '';
    
    // Generate and add bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage('bot', response);
    }, 500);
}

function addChatMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const p = document.createElement('p');
    p.textContent = text;
    
    messageDiv.appendChild(p);
    chatMessages.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return getRandomResponse(chatResponses.greeting);
    } else if (msg.includes('service') || msg.includes('what do you offer')) {
        return getRandomResponse(chatResponses.services);
    } else if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing')) {
        return getRandomResponse(chatResponses.pricing);
    } else if (msg.includes('contact') || msg.includes('phone') || msg.includes('email')) {
        return getRandomResponse(chatResponses.contact);
    } else if (msg.includes('portfolio') || msg.includes('project') || msg.includes('work')) {
        return getRandomResponse(chatResponses.portfolio);
    } else {
        return getRandomResponse(chatResponses.default);
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// ============================================
// PORTFOLIO FILTER FUNCTIONALITY
// ============================================

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0) return;
    
    // Show all items by default
    portfolioItems.forEach(item => item.classList.add('show'));
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-filter') === filter) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (name.value.trim().length < 2) {
        showError('nameError', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email
    if (!isValidEmail(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (subject.value.trim().length < 3) {
        showError('subjectError', 'Please enter a subject (at least 3 characters)');
        isValid = false;
    }
    
    // Validate message
    if (message.value.trim().length < 10) {
        showError('messageError', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
}

function submitForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Simulate form submission (in production, you'd send to a server)
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Log form data (in production, send to server)
    console.log('Form submitted:', formData);
    
    // Show success message
    successMessage.style.display = 'block';
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

window.addEventListener('scroll', function() {
    // Show/hide scroll to top button based on scroll position
    const scrollButton = document.querySelector('.scroll-top-btn');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    }
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ANIMATE ELEMENTS ON SCROLL
// ============================================

function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => observer.observe(element));
}

// ============================================
// STAT COUNTERS (Quick Stats)
// ============================================
function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    // Observe the first counter (trigger when stats come into view)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => startCount(counter));
                obs.disconnect();
            }
        });
    }, { threshold: 0.35 });

    observer.observe(counters[0]);

    function startCount(el) {
        const original = el.textContent.trim();
        const match = original.match(/(\d+[\d,]*)/); // first numeric group
        if (!match) return;
        const targetNum = parseInt(match[1].replace(/,/g, ''), 10);
        const suffix = original.replace(match[1], '');

        const duration = 1800; // ms
        const startTime = performance.now();

        function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const current = Math.floor(eased * targetNum);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = targetNum.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(tick);
    }
}

// ============================================
// FORM AUTO-FILL FROM URL PARAMS
// ============================================

function autoFillForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    
    if (service) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = service;
        }
    }
}

// Call auto-fill on page load
window.addEventListener('load', autoFillForm);

// ============================================
// LAZY LOAD IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// ANALYTICS (OPTIONAL)
// ============================================

function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    
    // In production, send to analytics service
    // Example: Google Analytics
    // gtag('event', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href.includes('contact.html')) {
        trackEvent('cta_click', {
            source: e.target.textContent,
            page: window.location.pathname
        });
    }
});

// ============================================
// INITIALIZATION
// ============================================

console.log('MasterClass website loaded successfully!');

// ============================================
// IMAGE CARD FLIP / ROTATE EFFECT
// ============================================
function initImageCardEffects() {
    const cards = document.querySelectorAll('.img-card');
    if (!cards || cards.length === 0) return;

    cards.forEach(card => {
        // make focusable for keyboard access
        card.setAttribute('tabindex', '0');

        // Toggle flipped state on click/tap
        card.addEventListener('click', (e) => {
            card.classList.toggle('flipped');
        });

        // Keyboard accessibility: Enter or Space toggles flip
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });

        // Optional: remove flipped state after 3s (mobile quick autoplay) — comment out if unwanted
        card.addEventListener('touchend', () => {
            // leave flipped until user taps again; uncomment to auto-revert:
            // setTimeout(() => card.classList.remove('flipped'), 3000);
        });
    });
}
