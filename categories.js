const productsData = {
  1: {
    name: "Midnight Prestige Suit",
    image: "./products/product_1/img_1.jpg",
    price: "LKR 24,999",
  },
  2: {
    name: "Royal Noir Evening Gown",
    image: "./products/product_2/img_1.jpg",
    price: "LKR 29,999",
  },
  3: {
    name: "Classic Elite Blazer",
    image: "./products/product_3/img_1.jpg",
    price: "LKR 18,999",
  },
  4: {
    name: "Velvet Luxe Handbag",
    image: "./products/product_4/img_1.jpg",
    price: "LKR 15,999",
  },
  5: {
    name: "Ivory Silk Dress",
    image: "./products/product_5/img_1.jpg",
    price: "LKR 19,999",
  },
  6: {
    name: "Executive Black Tuxedo",
    image: "./products/product_6/img_1.jpg",
    price: "LKR 34,999",
  },
  7: {
    name: "Pink Blossom Top",
    image: "./products/product_7/img_1.jpg",
    price: "LKR 8,999",
  },
  8: {
    name: "Gold Cascade Necklace",
    image: "./products/product_8/img_1.jpg",
    price: "LKR 12,999",
  },
  9: {
    name: "Ocean Blue Casual Shirt",
    image: "./products/product_9/img_1.jpg",
    price: "LKR 7,999",
  },
  10: {
    name: "Scarlet Rose Gown",
    image: "./products/product_10/img_1.jpg",
    price: "LKR 39,999",
  },
  11: {
    name: "Pearl White Formal Shirt",
    image: "./products/product_11/img_1.jpg",
    price: "LKR 10,999",
  },
  12: {
    name: "Diamond Elite Suit",
    image: "./products/product_12/img_1.jpg",
    price: "LKR 45,999",
  },
};

const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
let mouseX = 0,
  mouseY = 0,
  ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  if (cursorRing) {
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
  }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll("a, button, input, select").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (cursorRing) cursorRing.classList.add("hover");
    if (cursorDot) cursorDot.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    if (cursorRing) cursorRing.classList.remove("hover");
    if (cursorDot) cursorDot.classList.remove("hover");
  });
});

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);
if (themeIcon)
  themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    themeIcon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("theme", newTheme);
  });
}
const catParticles = document.getElementById("catParticles");
if (catParticles) {
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particle.style.animationDelay = Math.random() * 15 + "s";
    catParticles.appendChild(particle);
  }
}
let currentFilters = {
  category: "all",
  maxPrice: 500,
  sizes: [],
  colors: [],
  onSale: false,
  isNew: false,
  limited: false,
  search: "",
};

document.querySelectorAll(".category-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".category-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    currentFilters.category = item.dataset.category;
    if (typeof filterProducts === "function") filterProducts();
  });
});

const priceSlider = document.getElementById("priceSlider");
const priceMax = document.getElementById("priceMax");

if (priceSlider) {
  priceSlider.addEventListener("input", () => {
    const value = priceSlider.value;
    priceMax.textContent = value;
    currentFilters.maxPrice = parseInt(value);
    if (typeof filterProducts === "function") filterProducts();
  });
}

document.querySelectorAll(".cat-sidebar .size-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const size = btn.dataset.size;
    if (btn.classList.contains("active")) {
      currentFilters.sizes.push(size);
    } else {
      currentFilters.sizes = currentFilters.sizes.filter((s) => s !== size);
    }
    if (typeof filterProducts === "function") filterProducts();
  });
});

document.querySelectorAll(".color-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const color = btn.dataset.color;
    if (btn.classList.contains("active")) {
      currentFilters.colors.push(color);
    } else {
      currentFilters.colors = currentFilters.colors.filter((c) => c !== color);
    }
    if (typeof filterProducts === "function") filterProducts();
  });
});

const onSaleFilter = document.getElementById("onSaleFilter");
const newFilter = document.getElementById("newFilter");
const limitedFilter = document.getElementById("limitedFilter");

if (onSaleFilter) {
  onSaleFilter.addEventListener("change", (e) => {
    currentFilters.onSale = e.target.checked;
    if (typeof filterProducts === "function") filterProducts();
  });
}

if (newFilter) {
  newFilter.addEventListener("change", (e) => {
    currentFilters.isNew = e.target.checked;
    if (typeof filterProducts === "function") filterProducts();
  });
}

if (limitedFilter) {
  limitedFilter.addEventListener("change", (e) => {
    currentFilters.limited = e.target.checked;
    if (typeof filterProducts === "function") filterProducts();
  });
}

const clearFiltersBtn = document.getElementById("clearFilters");

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", () => {
    currentFilters = {
      category: "all",
      maxPrice: 500,
      sizes: [],
      colors: [],
      onSale: false,
      isNew: false,
      limited: false,
      search: "",
    };

    // Reset UI
    document
      .querySelectorAll(".category-item")
      .forEach((i) => i.classList.remove("active"));
    const allCat = document.querySelector(
      '.category-item[data-category="all"]',
    );
    if (allCat) allCat.classList.add("active");

    if (priceSlider) {
      priceSlider.value = 500;
      if (priceMax) priceMax.textContent = 500;
    }
    document
      .querySelectorAll(".size-btn.active")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".color-btn.active")
      .forEach((b) => b.classList.remove("active"));
    if (onSaleFilter) onSaleFilter.checked = false;
    if (newFilter) newFilter.checked = false;
    if (limitedFilter) limitedFilter.checked = false;

    const searchInput = document.getElementById("searchInput");
    const searchClear = document.getElementById("searchClear");
    if (searchInput) searchInput.value = "";
    if (searchClear) searchClear.classList.remove("show");

    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) sortSelect.value = "default";

    if (typeof filterProducts === "function") filterProducts();
  });
}
let currentSort = "default";

const sortSelect = document.getElementById("sortSelect");

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    const productsGrid = document.getElementById("productsGrid");
    const allProducts = document.querySelectorAll(".product-item");
    if (!productsGrid || !allProducts.length) return;

    const productsArray = Array.from(allProducts);

    productsArray.sort((a, b) => {
      const priceA = parseInt(a.dataset.price);
      const priceB = parseInt(b.dataset.price);

      switch (currentSort) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "newest":
          return a.dataset.badge === "new" ? -1 : 1;
        case "rating":
          const ratingA = a.querySelectorAll(
            ".product-rating .fas.fa-star",
          ).length;
          const ratingB = b.querySelectorAll(
            ".product-rating .fas.fa-star",
          ).length;
          return ratingB - ratingA;
        default:
          return 0;
      }
    });

    productsArray.forEach((product) => productsGrid.appendChild(product));
  });
}

const gridViewBtn = document.getElementById("gridView");
const listViewBtn = document.getElementById("listView");

if (gridViewBtn) {
  gridViewBtn.addEventListener("click", () => {
    const productsGrid = document.getElementById("productsGrid");
    if (productsGrid) productsGrid.classList.remove("list-view");
    gridViewBtn.classList.add("active");
    if (listViewBtn) listViewBtn.classList.remove("active");
  });
}

if (listViewBtn) {
  listViewBtn.addEventListener("click", () => {
    const productsGrid = document.getElementById("productsGrid");
    if (productsGrid) productsGrid.classList.add("list-view");
    listViewBtn.classList.add("active");
    if (gridViewBtn) gridViewBtn.classList.remove("active");
  });
}
const productsGrid = document.getElementById("productsGrid");
const allProducts = document.querySelectorAll(".product-item");
const showingCount = document.getElementById("showingCount");
const totalCount = document.getElementById("totalCount");
const noProducts = document.getElementById("noProducts");

if (totalCount && allProducts.length) {
  totalCount.textContent = allProducts.length;
}
document.querySelectorAll(".wishlist-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.classList.toggle("active");
    const icon = btn.querySelector("i");
    if (btn.classList.contains("active")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
    }
  });
});

const loadMoreBtn = document.querySelector(".load-more-btn");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    alert("✨ More products coming soon!");
  });
}
function filterProducts() {
  const productsGrid = document.getElementById("productsGrid");
  const allProducts = document.querySelectorAll(".product-item");
  const showingCount = document.getElementById("showingCount");
  const noProducts = document.getElementById("noProducts");

  if (!allProducts.length) return;

  let visibleCount = 0;

  allProducts.forEach((product) => {
    const category = product.dataset.category;
    const price = parseInt(product.dataset.price);
    const color = product.dataset.color;
    const size = product.dataset.size;
    const badge = product.dataset.badge || "";
    const titleEl = product.querySelector(".product-title");
    const title = titleEl ? titleEl.textContent.toLowerCase() : "";

    let show = true;

    // Category filter
    if (currentFilters.category !== "all") {
      const productCategories = category.split(" ");
      if (!productCategories.includes(currentFilters.category)) {
        show = false;
      }
    }

    // Price filter
    if (price > currentFilters.maxPrice) show = false;

    // Size filter
    if (
      currentFilters.sizes.length > 0 &&
      !currentFilters.sizes.includes(size)
    ) {
      show = false;
    }

    // Color filter
    if (
      currentFilters.colors.length > 0 &&
      !currentFilters.colors.includes(color)
    ) {
      show = false;
    }

    // Special checkbox filters
    if (currentFilters.onSale && badge !== "sale") show = false;
    if (currentFilters.isNew && badge !== "new") show = false;
    if (currentFilters.limited && badge !== "limited") show = false;

    // Live Search filter
    if (
      currentFilters.search &&
      !title.includes(currentFilters.search.toLowerCase())
    ) {
      show = false;
    }

    if (show) {
      product.classList.remove("hide");
      visibleCount++;
    } else {
      product.classList.add("hide");
    }
  });

  if (showingCount) showingCount.textContent = visibleCount;

  // Toggle No Products Found State
  if (visibleCount === 0) {
    if (noProducts) noProducts.classList.add("show");
    if (productsGrid) productsGrid.style.display = "none";
  } else {
    if (noProducts) noProducts.classList.remove("show");
    if (productsGrid) productsGrid.style.display = "grid";
  }
}

// Live Search Input listeners
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentFilters.search = e.target.value;
    if (e.target.value) {
      if (searchClear) searchClear.classList.add("show");
    } else {
      if (searchClear) searchClear.classList.remove("show");
    }
    filterProducts();
  });
}

if (searchClear) {
  searchClear.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    currentFilters.search = "";
    searchClear.classList.remove("show");
    filterProducts();
  });
}
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

document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const product = btn.closest('.product-item');
        const productIndex = Array.from(document.querySelectorAll('.product-item')).indexOf(product);
        const productId = String(productIndex + 1);
        
        const productInfo = productsData[productId];
        if (!productInfo) return;
        
        const cat = product.querySelector('.product-cat').textContent;
        
        if (modalTitle) modalTitle.textContent = productInfo.name;
        if (modalCat) modalCat.textContent = cat;
        if (modalPrice) modalPrice.textContent = productInfo.price;
        
        const modalImageTag = document.getElementById('modalImageTag');
        if (modalImageTag) {
            modalImageTag.src = productInfo.image;
        }
        
        if (modal) {
            modal.dataset.productId = productId;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
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

document.querySelectorAll('.modal-sizes .size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-sizes .size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// --- Mobile Filter Drawer Logic ---
const mobileFilterBtn = document.querySelector('.mobile-filter-btn');
const sidebarClose = document.querySelector('.sidebar-close');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const catSidebar = document.querySelector('.cat-sidebar');

if (mobileFilterBtn) {
    mobileFilterBtn.addEventListener('click', () => {
        catSidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });
}

const closeSidebar = () => {
    catSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar on window resize if it's open
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && catSidebar.classList.contains('open')) {
        closeSidebar();
    }
});


function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 2. Filter products automatically on page load if category URL param exists
function loadCategoryFromURL() {
    const categoryParam = getUrlParameter('category');
    if (categoryParam) {
        const targetCategory = categoryParam.toLowerCase();
        const categoryItems = document.querySelectorAll('.category-item');
        
        categoryItems.forEach(item => {
            if (item.getAttribute('data-category') === targetCategory) {
                categoryItems.forEach(ci => ci.classList.remove('active'));
                item.classList.add('active');
                
                // Trigger filter update
                if (typeof filterProducts === 'function') {
                    filterProducts();
                }
            }
        });
    }
}

// 3. Product Click Navigation to details page
function initProductClicks() {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach((item, index) => {
        const productId = index + 1;
        
        // Click on product image or title opens details page
        const img = item.querySelector('.product-img img');
        const title = item.querySelector('.product-title');
        
        const navigateToDetails = () => {
            window.location.href = `product-details.html?id=${productId}`;
        };
        
        if (img) img.addEventListener('click', navigateToDetails);
        if (title) title.addEventListener('click', navigateToDetails);
    });
}

// 4. Modal Add to Cart Action
const modalAddToCartBtn = document.querySelector('.modal-actions .add-to-cart-btn');
if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', () => {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        const modal = document.getElementById('quickViewModal');
        
        if (modal) modal.classList.remove('active');
        
        if (toast && toastMsg) {
            toastMsg.textContent = 'Product added to cart!';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCategoryFromURL();
    initProductClicks();
});