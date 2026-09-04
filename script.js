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