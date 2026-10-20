
const productsData = {
    '1': { name: 'Midnight Prestige Suit', image: './products/product_1/img_1.jpg', price: 'LKR 24,999' },
    '2': { name: 'Royal Noir Evening Gown', image: './products/product_2/img_1.jpg', price: 'LKR 29,999' },
    '3': { name: 'Classic Elite Blazer', image: './products/product_3/img_1.jpg', price: 'LKR 18,999' },
    '4': { name: 'Velvet Luxe Handbag', image: './products/product_4/img_1.jpg', price: 'LKR 15,999' },
    '5': { name: 'Ivory Silk Dress', image: './products/product_5/img_1.jpg', price: 'LKR 19,999' },
    '6': { name: 'Executive Black Tuxedo', image: './products/product_6/img_1.jpg', price: 'LKR 34,999' },
    '7': { name: 'Pink Blossom Top', image: './products/product_7/img_1.jpg', price: 'LKR 8,999' },
    '8': { name: 'Gold Cascade Necklace', image: './products/product_8/img_1.jpg', price: 'LKR 12,999' },
    '9': { name: 'Ocean Blue Casual Shirt', image: './products/product_9/img_1.jpg', price: 'LKR 7,999' },
    '10': { name: 'Scarlet Rose Gown', image: './products/product_10/img_1.jpg', price: 'LKR 39,999' },
    '11': { name: 'Pearl White Formal Shirt', image: './products/product_11/img_1.jpg', price: 'LKR 10,999' },
    '12': { name: 'Diamond Elite Suit', image: './products/product_12/img_1.jpg', price: 'LKR 45,999' }
};

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

document.querySelectorAll('a, button, input, select, .category-item, .overlay-btn, .size-btn, .color-btn').forEach(el => {
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

let currentSort = 'default';

const productsGrid = document.getElementById('productsGrid');
const allProducts = document.querySelectorAll('.product-item');
const showingCount = document.getElementById('showingCount');
const totalCount = document.getElementById('totalCount');
const noProducts = document.getElementById('noProducts');

totalCount.textContent = allProducts.length;

function filterProducts() {
    let visibleCount = 0;
    
    allProducts.forEach(product => {
        const category = product.dataset.category;
        const price = parseInt(product.dataset.price);
        const color = product.dataset.color;
        const size = product.dataset.size;
        const badge = product.dataset.badge || '';
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        
        let show = true;
        
        if (currentFilters.category !== 'all') {
            const productCategories = category.split(' '); // "women limited" → ["women", "limited"]
            if (!productCategories.includes(currentFilters.category)) {
                show = false;
            }
        }
        
        // Price filter
        if (price > currentFilters.maxPrice) show = false;
        
        // Size filter
        if (currentFilters.sizes.length > 0 && !currentFilters.sizes.includes(size)) {
            show = false;
        }
        
        // Color filter
        if (currentFilters.colors.length > 0 && !currentFilters.colors.includes(color)) {
            show = false;
        }
        
        // Special filters
        if (currentFilters.onSale && badge !== 'sale') show = false;
        if (currentFilters.isNew && badge !== 'new') show = false;
        if (currentFilters.limited && badge !== 'limited') show = false;
        
        // Search
        if (currentFilters.search && !title.includes(currentFilters.search.toLowerCase())) {
            show = false;
        }
        
        if (show) {
            product.classList.remove('hide');
            visibleCount++;
        } else {
            product.classList.add('hide');
        }
    });
    
    showingCount.textContent = visibleCount;
    
    // No products message
    if (visibleCount === 0) {
        noProducts.classList.add('show');
        productsGrid.style.display = 'none';
    } else {
        noProducts.classList.remove('show');
        productsGrid.style.display = 'grid';
    }
}

document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentFilters.category = item.dataset.category;
        filterProducts();
    });
});

const priceSlider = document.getElementById('priceSlider');
const priceMax = document.getElementById('priceMax');

if (priceSlider) {
    priceSlider.addEventListener('input', () => {
        const value = priceSlider.value;
        priceMax.textContent = value;
        currentFilters.maxPrice = parseInt(value);
        filterProducts();
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
        filterProducts();
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
        filterProducts();
    });
});

const onSaleFilter = document.getElementById('onSaleFilter');
const newFilter = document.getElementById('newFilter');
const limitedFilter = document.getElementById('limitedFilter');

if (onSaleFilter) {
    onSaleFilter.addEventListener('change', (e) => {
        currentFilters.onSale = e.target.checked;
        filterProducts();
    });
}

if (newFilter) {
    newFilter.addEventListener('change', (e) => {
        currentFilters.isNew = e.target.checked;
        filterProducts();
    });
}

if (limitedFilter) {
    limitedFilter.addEventListener('change', (e) => {
        currentFilters.limited = e.target.checked;
        filterProducts();
    });
}

const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value;
        if (e.target.value) {
            searchClear.classList.add('show');
        } else {
            searchClear.classList.remove('show');
        }
        filterProducts();
    });
}

if (searchClear) {
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        currentFilters.search = '';
        searchClear.classList.remove('show');
        filterProducts();
    });
}

const sortSelect = document.getElementById('sortSelect');

if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        const productsArray = Array.from(allProducts);
        
        productsArray.sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            
            switch (currentSort) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    return (a.dataset.badge === 'new' ? -1 : 1);
                case 'rating':
                    const ratingA = a.querySelectorAll('.product-rating .fas.fa-star').length;
                    const ratingB = b.querySelectorAll('.product-rating .fas.fa-star').length;
                    return ratingB - ratingA;
                default:
                    return 0;
            }
        });
        
        productsArray.forEach(product => productsGrid.appendChild(product));
    });
}

const clearFiltersBtn = document.getElementById('clearFilters');

if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        currentFilters = {
            category: 'all',
            maxPrice: 500,
            sizes: [],
            colors: [],
            onSale: false,
            isNew: false,
            limited: false,
            search: ''
        };
        
        // Reset UI
        document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
        document.querySelector('.category-item[data-category="all"]').classList.add('active');
        if (priceSlider) {
            priceSlider.value = 500;
            priceMax.textContent = 500;
        }
        document.querySelectorAll('.size-btn.active').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.color-btn.active').forEach(b => b.classList.remove('active'));
        if (onSaleFilter) onSaleFilter.checked = false;
        if (newFilter) newFilter.checked = false;
        if (limitedFilter) limitedFilter.checked = false;
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.classList.remove('show');
        if (sortSelect) sortSelect.value = 'default';
        
        filterProducts();
    });
}

const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

if (gridViewBtn) {
    gridViewBtn.addEventListener('click', () => {
        productsGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
}

if (listViewBtn) {
    listViewBtn.addEventListener('click', () => {
        productsGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
}

document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
const cartCountEl = document.getElementById('cartCount');
const cartNotification = document.getElementById('cartNotification');
if (cartCountEl) cartCountEl.textContent = cartCount;

document.querySelectorAll('.cart-btn, .modal-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartCount++;
        if (cartCountEl) cartCountEl.textContent = cartCount;
        localStorage.setItem('cartCount', cartCount);
        
        // Show notification
        if (cartNotification) {
            cartNotification.classList.add('show');
            setTimeout(() => cartNotification.classList.remove('show'), 2500);
        }
        
        // Cart icon animation
        if (cartCountEl) {
            cartCountEl.style.animation = 'none';
            setTimeout(() => {
                cartCountEl.style.animation = 'pulse 0.5s ease';
            }, 10);
        }
    });
});

const modal = document.getElementById('quickViewModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalCat = document.getElementById('modalCat');
const modalPrice = document.getElementById('modalPrice');
const modalImage = document.getElementById('modalImage');

document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const product = btn.closest('.product-item');
        const productIndex = Array.from(document.querySelectorAll('.product-item')).indexOf(product);
        const productId = String(productIndex + 1);
        
        // ✅ Get product info from database
        const productInfo = productsData[productId];
        if (!productInfo) {
            console.error('Product not found:', productId);
            return;
        }
        
        const cat = product.querySelector('.product-cat').textContent;
        
        // Update modal content
        if (modalTitle) modalTitle.textContent = productInfo.name;
        if (modalCat) modalCat.textContent = cat;
        if (modalPrice) modalPrice.textContent = productInfo.price;
        
        // ✅ Set modal image from database
        const modalImageTag = document.getElementById('modalImageTag');
        if (modalImageTag) {
            modalImageTag.src = productInfo.image;
            modalImageTag.onerror = () => {
                console.warn('Image not found:', productInfo.image);
                modalImageTag.src = 'https://via.placeholder.com/450x450/1a0a15/ff4d94?text=Product';
            };
        }
        
        // Store product ID for "Add to Cart"
        if (modal) {
            modal.dataset.productId = productId;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        
        console.log('✅ Quick View opened:', productInfo.name);
    });
});

const modalAddCartBtn = document.querySelector('.modal-add-cart');
if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener('click', () => {
        const productId = modal.dataset.productId;
        if (productId) {
            window.location.href = `product-details.html?id=${productId}`;
        }
    });
}

document.querySelector('.modal-add-cart')?.addEventListener('click', () => {
    const productId = modal.dataset.productId;
    if (productId) {
        // Redirect to product details page
        window.location.href = `product-details.html?id=${productId}`;
    }
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Modal size buttons
document.querySelectorAll('.modal-sizes .size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-sizes .size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

const mobileFilterBtn = document.getElementById('mobileFilterBtn');
const sidebar = document.getElementById('catSidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (mobileFilterBtn) {
    mobileFilterBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        alert('✨ More products coming soon!');
    });
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function loadCategoryFromURL() {
    const categoryParam = getUrlParameter('category');
    
    if (categoryParam) {
        // Find matching category item
        const categoryItem = document.querySelector(`.category-item[data-category="${categoryParam}"]`);
        
        if (categoryItem) {
            // Remove active from all
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            
            // Add active to matched category
            categoryItem.classList.add('active');
            
            // Update filter and apply
            currentFilters.category = categoryParam;
            filterProducts();
            
            // Show filter notification
            const categoryName = categoryItem.querySelector('span').textContent;
            showFilterNotification(`Showing: ${categoryName}`);
            
            // Smooth scroll to products area
            setTimeout(() => {
                const productsArea = document.querySelector('.cat-products-area');
                if (productsArea) {
                    productsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500);
            
            console.log('✅ Loaded category from URL:', categoryParam);
        }
    }
}

function showFilterNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification show';
    notification.innerHTML = `<i class="fas fa-filter"></i><span>${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

document.querySelectorAll('.product-item').forEach((product, index) => {
    // Product ID = index + 1 (1, 2, 3, ..., 12)
    const productId = index + 1;
    
    // Make product image clickable (except overlay buttons and badges)
    const productImg = product.querySelector('.product-img');
    if (productImg) {
        productImg.style.cursor = 'none';
        productImg.addEventListener('click', (e) => {
            // Don't redirect if clicking on overlay buttons or badges
            if (!e.target.closest('.overlay-btn') && 
                !e.target.closest('.badge') && 
                !e.target.closest('.product-overlay')) {
                window.location.href = `product-details.html?id=${productId}`;
            }
        });
    }
    
    // Make product info clickable
    const productInfo = product.querySelector('.product-info');
    if (productInfo) {
        productInfo.style.cursor = 'none';
        productInfo.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                window.location.href = `product-details.html?id=${productId}`;
            }
        });
    }
    
    // Add cursor hover effect
    product.addEventListener('mouseenter', () => {
        if (cursorRing) cursorRing.classList.add('hover');
        if (cursorDot) cursorDot.classList.add('hover');
    });
    product.addEventListener('mouseleave', () => {
        if (cursorRing) cursorRing.classList.remove('hover');
        if (cursorDot) cursorDot.classList.remove('hover');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    // Load category from URL if present
    loadCategoryFromURL();
    
    console.log('✅ Velvet Vogue Categories Page Loaded');
    console.log('✅ 12 Products Ready');
    console.log('✅ Click any product to view details');
});

function initProductClicks() {
    const products = document.querySelectorAll('.product-item');
    console.log('🔍 Found products:', products.length);
    
    products.forEach((product, index) => {
        const productId = index + 1;
        
        // Add cursor pointer to entire card
        product.style.cursor = 'none';
        
        // Click on product image
        const productImg = product.querySelector('.product-img');
        if (productImg) {
            productImg.addEventListener('click', (e) => {
                // Don't redirect if clicking overlay buttons or badges
                if (e.target.closest('.overlay-btn') || 
                    e.target.closest('.badge') || 
                    e.target.closest('.product-overlay')) {
                    return;
                }
                console.log('➡️ Navigating to product:', productId);
                window.location.href = `product-details.html?id=${productId}`;
            });
        }
        
        // Click on product info (title, price area)
        const productInfo = product.querySelector('.product-info');
        if (productInfo) {
            productInfo.addEventListener('click', (e) => {
                if (e.target.closest('button')) return;
                console.log('➡️ Navigating to product:', productId);
                window.location.href = `product-details.html?id=${productId}`;
            });
        }
    });
}

// Run after DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductClicks);
} else {
    initProductClicks();
}