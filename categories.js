const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    }
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
    }
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, input, select').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorRing) cursorRing.classList.add('hover');
        if (cursorDot) cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorRing) cursorRing.classList.remove('hover');
        if (cursorDot) cursorDot.classList.remove('hover');
    });
});

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
if (themeIcon) themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', newTheme);
    });
}
const catParticles = document.getElementById('catParticles');
if (catParticles) {
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 15) + 's';
        catParticles.appendChild(particle);
    }
}
let currentFilters = {
    category: 'all',
    maxPrice: 500,
    sizes: [],
    colors: [],
    onSale: false,
    isNew: false,
    limited: false,
    search: ''
};

document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentFilters.category = item.dataset.category;
        if (typeof filterProducts === 'function') filterProducts();
    });
});

const priceSlider = document.getElementById('priceSlider');
const priceMax = document.getElementById('priceMax');

if (priceSlider) {
    priceSlider.addEventListener('input', () => {
        const value = priceSlider.value;
        priceMax.textContent = value;
        currentFilters.maxPrice = parseInt(value);
        if (typeof filterProducts === 'function') filterProducts();
    });
}

document.querySelectorAll('.cat-sidebar .size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const size = btn.dataset.size;
        if (btn.classList.contains('active')) {
            currentFilters.sizes.push(size);
        } else {
            currentFilters.sizes = currentFilters.sizes.filter(s => s !== size);
        }
        if (typeof filterProducts === 'function') filterProducts();
    });
});

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const color = btn.dataset.color;
        if (btn.classList.contains('active')) {
            currentFilters.colors.push(color);
        } else {
            currentFilters.colors = currentFilters.colors.filter(c => c !== color);
        }
        if (typeof filterProducts === 'function') filterProducts();
    });
});