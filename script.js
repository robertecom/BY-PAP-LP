// ===== MODAL =====
function openModal() {
    const modal = document.getElementById('modal');
    const form = document.getElementById('leadForm');
    const success = document.getElementById('modalSuccess');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    form.style.display = 'block';
    success.style.display = 'none';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// ===== FORM SUBMISSION =====
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate required fields
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(function(field) {
        const group = field.closest('.form-group');
        if (group) group.classList.remove('error');

        if (field.type === 'radio') {
            const radioGroup = document.querySelectorAll('input[name="' + field.name + '"]');
            const checked = Array.from(radioGroup).some(function(r) { return r.checked; });
            if (!checked) {
                isValid = false;
                if (group) group.classList.add('error');
            }
        } else if (field.type === 'checkbox') {
            if (!field.checked) {
                isValid = false;
                if (group) group.classList.add('error');
            }
        } else if (!field.value.trim()) {
            isValid = false;
            if (group) group.classList.add('error');
        }
    });

    // Email validation
    const emailField = document.getElementById('email');
    if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        isValid = false;
        emailField.closest('.form-group').classList.add('error');
    }

    if (!isValid) return;

    // Collect form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });

    // Here you can integrate with CRM (HubSpot, RD Station, ActiveCampaign, Mailchimp)
    // Example: fetch('/api/leads', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
    console.log('Lead captured:', data);

    // Show success message
    this.style.display = 'none';
    document.getElementById('modalSuccess').style.display = 'block';
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(function(faq) {
            faq.classList.remove('active');
        });

        // Open clicked if not active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== MOBILE MENU =====
document.getElementById('mobile-toggle').addEventListener('click', function() {
    document.getElementById('nav').classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        document.getElementById('nav').classList.remove('active');
    });
});

// ===== SCROLL ANIMATIONS =====
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up');
    const windowHeight = window.innerHeight;

    elements.forEach(function(el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 80) {
            el.classList.add('visible');
        }
    });
}

// Throttle scroll handler
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(function() {
        handleScrollAnimations();
        scrollTimeout = null;
    }, 16);
}, { passive: true });

// Run on load
handleScrollAnimations();

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollY = window.scrollY;

    if (scrollY > 10) {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = scrollY;
}, { passive: true });

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== WHATSAPP MASK =====
document.getElementById('whatsapp').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
        value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7);
    } else if (value.length > 2) {
        value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
    } else if (value.length > 0) {
        value = '(' + value;
    }

    e.target.value = value;
});
