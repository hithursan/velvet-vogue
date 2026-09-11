// loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const percent = document.getElementById('loaderPercent');
    let count = 0;
    
    const interval = setInterval(() => {
        count++;
        if (percent) percent.textContent = count + '%';
        if (count >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (loader) {
                    loader.classList.add('done');
                    setTimeout(() => {
                        loader.classList.add('hidden');
                    }, 1500);
                }
            }, 300);
        }
    }, 20);
});

// cursor
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const cursorText = document.getElementById('cursorText');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
    if (cursorText) {
        cursorText.style.transform = `translate3d(${mouseX}px, ${mouseY + 40}px, 0) translate(-50%, -50%)`;
    }
}, { passive: true });

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .nav-icons i').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorRing) cursorRing.classList.add('hover');
        if (cursorDot) cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorRing) cursorRing.classList.remove('hover');
        if (cursorDot) cursorDot.classList.remove('hover');
    });
});

document.addEventListener('mousedown', () => {
    if (cursorRing) cursorRing.classList.add('click');
});
document.addEventListener('mouseup', () => {
    if (cursorRing) cursorRing.classList.remove('click');
});

//theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
if (themeIcon) {
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', newTheme);
        if (themeIcon) {
            themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem('theme', newTheme);
    });
}

// nav bar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.getElementById('navOverlay');

function closeMobileNav() {
    if (navToggle) navToggle.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('nav-open');
}

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active', isOpen);
        if (navOverlay) navOverlay.classList.toggle('active', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
    });

    // close menu when a nav link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
}

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// reset animations after loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroElements = document.querySelectorAll(
            '.hero-tag, .hero-title, .hero-title-italic, .hero-subtitle, .hero-buttons, .scroll-indicator, .brand, .nav-links li, .nav-icons i'
        );
        
        heroElements.forEach(el => {
            // Restart animation
            el.style.animation = 'none';
            el.offsetHeight; 
            el.style.animation = '';
        });
        
        console.log('✅ Animations restarted after loader');
    }, 3500); 
});
// particles
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    for (let i = 0; i < 18; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = Math.random() * 100 + '%';
        
        const size = Math.random() * 5 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const duration = Math.random() * 10 + 8;
        particle.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 15;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
    console.log('✅ Particles created:', particlesContainer.children.length);
}

const heavySections = document.querySelectorAll('.hero, .promo-hero');

if ('IntersectionObserver' in window && heavySections.length) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('in-view', entry.isIntersecting);
        });
    }, { threshold: 0.01 });

    heavySections.forEach(section => {
        section.classList.add('in-view'); // visible on first load
        io.observe(section);
    });
}
// promo particles
const promoParticlesContainer = document.getElementById('promoParticles');

if (promoParticlesContainer) {
    for (let i = 0; i < 14; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = Math.random() * 100 + '%';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 15;
        particle.style.animationDelay = delay + 's';
        
        promoParticlesContainer.appendChild(particle);
    }
}
// cta particle
const ctaParticlesContainer = document.getElementById('ctaParticles');

if (ctaParticlesContainer) {
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = Math.random() * 100 + '%';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const duration = Math.random() * 12 + 10;
        particle.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 15;
        particle.style.animationDelay = delay + 's';
        
        ctaParticlesContainer.appendChild(particle);
    }
}
// about stats count-up
const statNumbers = document.querySelectorAll('.stat-number');

const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => countUp(stat));
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}