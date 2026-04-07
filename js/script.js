// ===== HAYAMI E-COMMERCE - SCRIPT.JS =====

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('hayami_cart')) || [];

function saveCart() {
  localStorage.setItem('hayami_cart', JSON.stringify(cart));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function addToCart(id, name, price, img, category) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, img, category, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`<span class="toast-icon">🛍️</span> "${name}" added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartBadge();
}

function updateQty(id, qty) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart();
  }
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.getElementById('hayami-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'hayami-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Hamburger
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Scroll nav search
  const navSearchBtn = document.querySelector('.nav-search-btn');
  if (navSearchBtn) {
    navSearchBtn.addEventListener('click', () => {
      window.location.href = 'search.html';
    });
  }
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== HERO SLIDER =====
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  if (!slides.length) return;

  let current = 0;
  let autoPlay;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startAuto() {
    autoPlay = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAuto() { clearInterval(autoPlay); }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  startAuto();
}

// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id: 1, name: "Sakura Silk Blouse", category: "Women", price: 2499, oldPrice: 3299, img: "ph-1", emoji: "🌸", rating: 4.8, reviews: 124, badge: "New" },
  { id: 2, name: "Midnight Denim Jacket", category: "Women", price: 3999, oldPrice: 5499, img: "ph-2", emoji: "✨", rating: 4.6, reviews: 89, badge: "Sale" },
  { id: 3, name: "Pearl Drop Earrings", category: "Accessories", price: 899, oldPrice: null, img: "ph-3", emoji: "💎", rating: 4.9, reviews: 203, badge: "New" },
  { id: 4, name: "Velvet Mini Dress", category: "Women", price: 4299, oldPrice: 5999, img: "ph-4", emoji: "👗", rating: 4.7, reviews: 156, badge: "Hot" },
  { id: 5, name: "Linen Wide Trousers", category: "Women", price: 2199, oldPrice: null, img: "ph-5", emoji: "👖", rating: 4.5, reviews: 78, badge: null },
  { id: 6, name: "Gold Chain Necklace", category: "Accessories", price: 1599, oldPrice: 2199, img: "ph-6", emoji: "📿", rating: 4.8, reviews: 167, badge: "Sale" },
  { id: 7, name: "Floral Wrap Skirt", category: "Women", price: 1899, oldPrice: null, img: "ph-7", emoji: "🌺", rating: 4.4, reviews: 92, badge: null },
  { id: 8, name: "Canvas Tote Bag", category: "Bags", price: 1299, oldPrice: 1799, img: "ph-8", emoji: "👜", rating: 4.6, reviews: 211, badge: "Sale" },
  { id: 9, name: "Cashmere Knit Cardigan", category: "Women", price: 5499, oldPrice: 7299, img: "ph-1", emoji: "🧶", rating: 4.9, reviews: 134, badge: "Premium" },
  { id: 10, name: "Leather Crossbody Bag", category: "Bags", price: 4999, oldPrice: null, img: "ph-2", emoji: "👝", rating: 4.7, reviews: 88, badge: "New" },
  { id: 11, name: "Geometric Ring Set", category: "Accessories", price: 699, oldPrice: null, img: "ph-3", emoji: "💍", rating: 4.5, reviews: 145, badge: null },
  { id: 12, name: "Satin Evening Gown", category: "Women", price: 8999, oldPrice: 11999, img: "ph-4", emoji: "👘", rating: 4.9, reviews: 67, badge: "Premium" },
];

const CATEGORIES = [
  { name: "Women", count: 124, emoji: "👗", desc: "Elegant dresses, blouses, trousers & more for the modern woman.", img: "ph-1" },
  { name: "Accessories", count: 89, emoji: "💎", desc: "Earrings, necklaces, rings and statement pieces.", img: "ph-3" },
  { name: "Bags", count: 56, emoji: "👜", desc: "Totes, crossbodies, clutches and everyday carry.", img: "ph-8" },
  { name: "Shoes", count: 73, emoji: "👠", desc: "Heels, flats, boots and sneakers for every occasion.", img: "ph-6" },
  { name: "Beauty", count: 42, emoji: "✨", desc: "Skincare, makeup and wellness essentials.", img: "ph-7" },
  { name: "Lifestyle", count: 38, emoji: "🌸", desc: "Home decor, candles and thoughtful gifts.", img: "ph-5" },
];

function createProductCard(p, mini = false) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrap">
        <div class="placeholder-img ${p.img}">${p.emoji}</div>
        ${p.badge ? `<span class="product-badge ${p.badge === 'Sale' ? 'sale' : ''}">${p.badge}</span>` : ''}
        <div class="product-actions">
          <button class="product-action-btn" onclick="event.stopPropagation(); addToCart(${p.id},'${p.name}',${p.price},'${p.img}','${p.category}')">🛍️</button>
          <button class="product-action-btn" onclick="event.stopPropagation(); showToast('<span class=\\'toast-icon\\'>❤️</span> Added to wishlist')">❤️</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name"><a href="product-view.html?id=${p.id}">${p.name}</a></div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">₹${p.price.toLocaleString()}</span>
            ${p.oldPrice ? `<span class="price-old">₹${p.oldPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id},'${p.name}',${p.price},'${p.img}','${p.category}')">+</button>
        </div>
      </div>
    </div>
  `;
}

// ===== PRODUCTS PAGE =====
function initProductsPage() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let filtered = [...PRODUCTS];

  function render() {
    grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
    document.getElementById('products-count-num').textContent = filtered.length;
  }

  render();

  // Category filter
  document.querySelectorAll('.cat-filter').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  // Price range
  const priceRange = document.getElementById('price-range');
  const priceVal = document.getElementById('price-val');
  if (priceRange) {
    priceRange.addEventListener('input', () => {
      priceVal.textContent = '₹' + parseInt(priceRange.value).toLocaleString();
      applyFilters();
    });
  }

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilters);
  }

  function applyFilters() {
    const checked = [...document.querySelectorAll('.cat-filter:checked')].map(c => c.value);
    const maxPrice = priceRange ? parseInt(priceRange.value) : Infinity;
    const sort = sortSelect ? sortSelect.value : 'default';

    filtered = PRODUCTS.filter(p => {
      const catOk = checked.length === 0 || checked.includes(p.category);
      const priceOk = p.price <= maxPrice;
      return catOk && priceOk;
    });

    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') filtered.sort((a, b) => b.id - a.id);

    render();
  }
}

// ===== HOME PAGE =====
function initHomePage() {
  const latestGrid = document.getElementById('latest-products-grid');
  if (latestGrid) {
    latestGrid.innerHTML = PRODUCTS.slice(0, 8).map(p => createProductCard(p)).join('');
  }

  const catGrid = document.getElementById('categories-grid');
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(c => `
      <div class="category-card" onclick="window.location.href='category.html'">
        <div class="placeholder-img ${c.img}" style="width:100%;height:100%;font-size:48px;display:flex;align-items:center;justify-content:center;">${c.emoji}</div>
        <div class="category-overlay">
          <div class="category-name">${c.name}</div>
          <div class="category-count">${c.count} Products</div>
        </div>
        <div class="category-arrow">→</div>
      </div>
    `).join('');
  }
}

// ===== PRODUCT VIEW PAGE =====
function initProductViewPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  document.getElementById('pv-title') && (document.getElementById('pv-title').textContent = product.name);
  document.getElementById('pv-category') && (document.getElementById('pv-category').textContent = product.category);
  document.getElementById('pv-price') && (document.getElementById('pv-price').textContent = '₹' + product.price.toLocaleString());
  document.getElementById('pv-old-price') && (document.getElementById('pv-old-price').textContent = product.oldPrice ? '₹' + product.oldPrice.toLocaleString() : '');
  document.getElementById('pv-rating-stars') && (document.getElementById('pv-rating-stars').textContent = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating)));
  document.getElementById('pv-reviews') && (document.getElementById('pv-reviews').textContent = `(${product.reviews} reviews)`);
  document.getElementById('pv-emoji') && (document.getElementById('pv-emoji').textContent = product.emoji);
  document.getElementById('pv-img-class') && document.getElementById('pv-img-class').classList.add(product.img);

  const addBtn = document.getElementById('pv-add-cart');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('pv-qty')?.value) || 1;
      for (let i = 0; i < qty; i++) addToCart(product.id, product.name, product.price, product.img, product.category);
    });
  }

  // Qty controls
  const qtyInput = document.getElementById('pv-qty');
  document.getElementById('pv-qty-minus')?.addEventListener('click', () => {
    if (qtyInput && parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
  });
  document.getElementById('pv-qty-plus')?.addEventListener('click', () => {
    if (qtyInput) qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  // Related products
  const relatedGrid = document.getElementById('related-grid');
  if (relatedGrid) {
    const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
    relatedGrid.innerHTML = related.map(p => createProductCard(p)).join('');
  }

  // Thumbnail click
  document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

// ===== CART PAGE =====
function initCartPage() {
  renderCart();
}

function renderCart() {
  const itemsContainer = document.getElementById('cart-items-container');
  const emptyEl = document.getElementById('cart-empty');
  const summaryWrap = document.getElementById('cart-summary-wrap');
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '';
    emptyEl && emptyEl.classList.add('show');
    summaryWrap && (summaryWrap.style.display = 'none');
    return;
  }

  emptyEl && emptyEl.classList.remove('show');
  summaryWrap && (summaryWrap.style.display = 'block');

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-row-${item.id}">
      <div class="cart-product">
        <div class="cart-product-img">
          <div class="placeholder-img ${item.img}" style="width:100%;height:100%;font-size:28px;display:flex;align-items:center;justify-content:center;">
            ${PRODUCTS.find(p => p.id === item.id)?.emoji || '🛍️'}
          </div>
        </div>
        <div>
          <div class="cart-product-name">${item.name}</div>
          <div class="cart-product-variant">${item.category}</div>
        </div>
      </div>
      <div class="cart-price">₹${item.price.toLocaleString()}</div>
      <div>
        <div class="cart-qty-control">
          <button class="cart-qty-btn" onclick="changeCartQty(${item.id}, -1)">−</button>
          <input class="cart-qty-input" type="number" value="${item.qty}" min="1" onchange="setCartQty(${item.id}, this.value)">
          <button class="cart-qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-subtotal">₹${(item.price * item.qty).toLocaleString()}</div>
      <button class="cart-remove" onclick="removeCartItem(${item.id})">✕</button>
    </div>
  `).join('');

  updateCartSummary();
}

function changeCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    renderCart();
    updateCartBadge();
  }
}

function setCartQty(id, val) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, parseInt(val) || 1);
    saveCart();
    renderCart();
    updateCartBadge();
  }
}

function removeCartItem(id) {
  removeFromCart(id);
  renderCart();
}

function updateCartSummary() {
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 99 : 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  document.getElementById('cart-subtotal') && (document.getElementById('cart-subtotal').textContent = '₹' + subtotal.toLocaleString());
  document.getElementById('cart-shipping') && (document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : '₹' + shipping);
  document.getElementById('cart-tax') && (document.getElementById('cart-tax').textContent = '₹' + tax.toLocaleString());
  document.getElementById('cart-total') && (document.getElementById('cart-total').textContent = '₹' + total.toLocaleString());
}

// ===== CHECKOUT PAGE =====
function initCheckoutPage() {
  const orderItems = document.getElementById('checkout-order-items');
  if (orderItems && cart.length > 0) {
    orderItems.innerHTML = cart.map(item => `
      <div class="order-item">
        <div class="order-item-img">
          <div class="placeholder-img ${item.img}" style="width:100%;height:100%;font-size:22px;display:flex;align-items:center;justify-content:center;">
            ${PRODUCTS.find(p => p.id === item.id)?.emoji || '🛍️'}
          </div>
          <span class="order-item-qty">${item.qty}</span>
        </div>
        <div class="order-item-info">
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-variant">${item.category}</div>
        </div>
        <div class="order-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
      </div>
    `).join('');
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 99 : 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  document.getElementById('co-subtotal') && (document.getElementById('co-subtotal').textContent = '₹' + subtotal.toLocaleString());
  document.getElementById('co-shipping') && (document.getElementById('co-shipping').textContent = shipping === 0 ? 'Free' : '₹' + shipping);
  document.getElementById('co-tax') && (document.getElementById('co-tax').textContent = '₹' + tax.toLocaleString());
  document.getElementById('co-total') && (document.getElementById('co-total').textContent = '₹' + total.toLocaleString());

  // Place order
  const placeBtn = document.getElementById('place-order-btn');
  if (placeBtn) {
    placeBtn.addEventListener('click', () => {
      const form = document.getElementById('shipping-form');
      const inputs = form ? form.querySelectorAll('input[required], select[required]') : [];
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'var(--coral)';
          valid = false;
        } else {
          input.style.borderColor = 'var(--border)';
        }
      });

      if (!valid) {
        showToast('⚠️ Please fill in all required fields');
        return;
      }

      // Generate order number
      const orderNum = 'HYM-' + Date.now().toString().slice(-8);
      localStorage.setItem('hayami_last_order', JSON.stringify({
        orderNum,
        total: '₹' + total.toLocaleString(),
        items: cart.length,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        name: document.getElementById('fname')?.value + ' ' + (document.getElementById('lname')?.value || '')
      }));

      // Clear cart
      cart = [];
      saveCart();
      updateCartBadge();

      // Redirect to confirmation
      window.location.href = 'order-confirmation.html';
    });
  }
}

// ===== ORDER CONFIRMATION =====
function initOrderConfirmationPage() {
  const orderData = JSON.parse(localStorage.getItem('hayami_last_order') || '{}');

  document.getElementById('conf-order-num') && (document.getElementById('conf-order-num').textContent = orderData.orderNum || 'HYM-00000000');
  document.getElementById('conf-date') && (document.getElementById('conf-date').textContent = orderData.date || new Date().toLocaleDateString('en-IN'));
  document.getElementById('conf-total') && (document.getElementById('conf-total').textContent = orderData.total || '₹0');
  document.getElementById('conf-name') && (document.getElementById('conf-name').textContent = orderData.name || 'Customer');

  // Confetti
  const confettiArea = document.getElementById('confetti-area');
  if (confettiArea) {
    const colors = ['#FF6B6B','#FFAB91','#F8BBD9','#FFD700','#FF8C00','#FF69B4'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.top = '-20px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (Math.random() * 10 + 6) + 'px';
      piece.style.height = (Math.random() * 10 + 6) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDelay = (Math.random() * 2) + 's';
      piece.style.animationDuration = (Math.random() * 2 + 3) + 's';
      confettiArea.appendChild(piece);
    }
  }
}

// ===== SEARCH PAGE =====
function initSearchPage() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = query;

  if (query) doSearch(query);

  document.getElementById('search-submit')?.addEventListener('click', () => {
    const q = document.getElementById('search-input').value.trim();
    if (q) window.location.href = 'search.html?q=' + encodeURIComponent(q);
  });

  document.getElementById('search-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('search-submit').click();
  });
}

function doSearch(query) {
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const header = document.getElementById('search-results-header');
  if (header) {
    header.innerHTML = results.length > 0
      ? `<h3>Results for "<span class="text-coral">${query}</span>"</h3><p>${results.length} product${results.length !== 1 ? 's' : ''} found</p>`
      : `<h3>No results for "<span class="text-coral">${query}</span>"</h3><p>Try different keywords</p>`;
  }

  const grid = document.getElementById('search-results-grid');
  if (grid) {
    grid.innerHTML = results.map(p => createProductCard(p)).join('');
  }
}

// ===== CATEGORY PAGE =====
function initCategoryPage() {
  const grid = document.getElementById('category-list-grid');
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map(c => `
    <div class="category-list-card" onclick="window.location.href='products.html'">
      <div class="category-list-img">
        <div class="placeholder-img ${c.img}" style="width:100%;height:100%;font-size:56px;display:flex;align-items:center;justify-content:center;">${c.emoji}</div>
      </div>
      <div class="category-list-info">
        <div class="category-list-name">${c.name}</div>
        <div class="category-list-desc">${c.desc}</div>
        <a class="category-list-link" href="products.html">Shop Now →</a>
      </div>
    </div>
  `).join('');
}

// ===== CONTACT FORM VALIDATION =====
function initContactPage() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const err = document.getElementById(field.id + '-error');
      if (!field.value.trim()) {
        err && (err.style.display = 'block');
        field.style.borderColor = 'var(--coral)';
        valid = false;
      } else {
        err && (err.style.display = 'none');
        field.style.borderColor = 'var(--border)';
      }
    });

    // Email validation
    const emailField = document.getElementById('contact-email');
    const emailErr = document.getElementById('contact-email-error');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      if (emailErr) { emailErr.textContent = 'Please enter a valid email address'; emailErr.style.display = 'block'; }
      emailField.style.borderColor = 'var(--coral)';
      valid = false;
    }

    if (valid) {
      showToast('✅ Message sent successfully! We\'ll respond within 24 hours.');
      form.reset();
    }
  });

  // Live validation
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      const err = document.getElementById(field.id + '-error');
      if (field.value.trim()) {
        err && (err.style.display = 'none');
        field.style.borderColor = 'var(--border)';
      }
    });
  });
}

// ===== ABOUT PAGE =====
function initAboutPage() {
  // Stats animation
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.round(current) + (el.dataset.suffix || '');
          if (current >= target) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollTop();
  updateCartBadge();
  initSlider();
  initHomePage();
  initProductsPage();
  initProductViewPage();
  initCartPage();
  initCheckoutPage();
  initOrderConfirmationPage();
  initSearchPage();
  initCategoryPage();
  initContactPage();
  initAboutPage();

  // Global nav search
  const navSearch = document.querySelector('.nav-search-btn');
  if (navSearch) {
    navSearch.setAttribute('onclick', "window.location.href='search.html'");
  }
});
