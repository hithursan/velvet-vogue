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