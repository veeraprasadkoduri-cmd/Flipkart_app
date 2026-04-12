/* ============================================================
   loadComponents.js  —  Flipkart Clone Core JS
   ============================================================ */

'use strict';

/* ── State ─────────────────────────────────────────────── */
let cartCount   = 0;
let slideIndex  = 0;
let slideTimer  = null;

/* ── Data ──────────────────────────────────────────────── */
const SLIDES = [
  { bg: 'linear-gradient(135deg,#1a237e 0%,#1565c0 50%,#0288d1 100%)', emoji: '📱', label: 'Mobiles Carnival — Up to 40% Off', sub: 'Top brands. Best prices.' },
  { bg: 'linear-gradient(135deg,#880e4f 0%,#c2185b 50%,#e91e63 100%)', emoji: '👗', label: 'Fashion Week Sale — Min 50% Off', sub: 'Trendy styles for everyone.' },
  { bg: 'linear-gradient(135deg,#1b5e20 0%,#2e7d32 50%,#43a047 100%)', emoji: '🏠', label: 'Home Makeover — Great Deals', sub: 'Furnish your dream home.' },
  { bg: 'linear-gradient(135deg,#e65100 0%,#ef6c00 50%,#fb8c00 100%)', emoji: '💻', label: 'Laptops & Accessories Sale', sub: 'Work smarter. Save bigger.' },
  { bg: 'linear-gradient(135deg,#4a148c 0%,#6a1b9a 50%,#8e24aa 100%)', emoji: '🎮', label: 'Gaming Fest — Consoles & More', sub: 'Level up your setup.' },
];

const CATEGORIES = [
  { icon: '📱', label: 'Mobiles'     },
  { icon: '👗', label: 'Fashion'     },
  { icon: '📺', label: 'Electronics' },
  { icon: '🏠', label: 'Home'        },
  { icon: '💻', label: 'Laptops'     },
  { icon: '👟', label: 'Footwear'    },
  { icon: '🛒', label: 'Grocery'     },
  { icon: '🧴', label: 'Beauty'      },
  { icon: '📚', label: 'Books'       },
  { icon: '🚲', label: 'Cycles'      },
  { icon: '🎮', label: 'Gaming'      },
  { icon: '🧸', label: 'Toys'        },
];

const PRODUCTS = [
  { id: 1,  emoji: '📱', name: 'Samsung Galaxy S24 Ultra 5G', brand: 'Samsung',   price: 124999, mrp: 159999, discount: 22, rating: 4.6, reviews: 12453, assured: true,  category: 'electronics' },
  { id: 2,  emoji: '👟', name: 'Nike Air Max 270 Running Shoes', brand: 'Nike',   price: 7495,  mrp: 12995,  discount: 42, rating: 4.4, reviews: 8321,  assured: true,  category: 'sports'      },
  { id: 3,  emoji: '💻', name: 'Apple MacBook Air M2 Chip 8GB', brand: 'Apple',   price: 99900, mrp: 119900, discount: 17, rating: 4.8, reviews: 5672,  assured: true,  category: 'electronics' },
  { id: 4,  emoji: '👗', name: 'Anita Dongre Floral Kurta Set', brand: 'AND',     price: 1799,  mrp: 3599,   discount: 50, rating: 4.2, reviews: 3210,  assured: false, category: 'women'       },
  { id: 5,  emoji: '🎧', name: 'Sony WH-1000XM5 Headphones', brand: 'Sony',      price: 24990, mrp: 34990,  discount: 29, rating: 4.7, reviews: 9870,  assured: true,  category: 'electronics' },
  { id: 6,  emoji: '📺', name: 'LG 55" OLED 4K Smart TV', brand: 'LG',           price: 89990, mrp: 129990, discount: 31, rating: 4.5, reviews: 4231,  assured: true,  category: 'tvs'         },
  { id: 7,  emoji: '👔', name: 'Allen Solly Slim Fit Shirt', brand: 'Allen Solly',price: 799,   mrp: 1999,   discount: 60, rating: 4.1, reviews: 6540,  assured: false, category: 'men'         },
  { id: 8,  emoji: '🏋️', name: 'Boldfit Pro Resistance Bands Set', brand: 'Boldfit', price: 499, mrp: 1499, discount: 67, rating: 4.3, reviews: 2198,  assured: false, category: 'sports'      },
  { id: 9,  emoji: '🛋️', name: 'Wakefit Orthopedic Memory Foam Mattress', brand: 'Wakefit', price: 8999, mrp: 14999, discount: 40, rating: 4.6, reviews: 7821, assured: true, category: 'home' },
  { id: 10, emoji: '📷', name: 'Canon EOS R50 Mirrorless Camera', brand: 'Canon', price: 59990, mrp: 74990,  discount: 20, rating: 4.5, reviews: 1876,  assured: true,  category: 'electronics' },
  { id: 11, emoji: '🍳', name: 'Prestige Induction Cooktop 1600W', brand: 'Prestige', price: 1499, mrp: 2999, discount: 50, rating: 4.2, reviews: 5430, assured: false, category: 'home'       },
  { id: 12, emoji: '👜', name: 'Lavie Quilted Satchel Handbag', brand: 'Lavie',   price: 1199,  mrp: 2999,   discount: 60, rating: 4.0, reviews: 3102,  assured: false, category: 'women'       },
];

const DEALS = [
  { emoji: '📱', name: 'iPhone 15',      originalPrice: 79900, discount: 15 },
  { emoji: '👟', name: 'Adidas Ultra',   originalPrice: 9999,  discount: 35 },
  { emoji: '💻', name: 'HP Pavilion',    originalPrice: 54990, discount: 20 },
  { emoji: '🎮', name: 'PS5 Console',    originalPrice: 54990, discount: 10 },
  { emoji: '🧴', name: 'Lakme Kit',      originalPrice: 1299,  discount: 45 },
  { emoji: '📷', name: 'GoPro Hero12',   originalPrice: 34990, discount: 25 },
  { emoji: '🎧', name: 'Boat Rockerz',   originalPrice: 2499,  discount: 55 },
  { emoji: '🛋️', name: 'IKEA Sofa',     originalPrice: 24999, discount: 30 },
];

const ADS = [
  { emoji: '🛍️', bg: 'linear-gradient(135deg,#ff6f00,#ffa000)', tag: 'Limited Time', title: 'Mega Sale 2024', sub: 'Up to 80% off sitewide' },
  { emoji: '📱', bg: 'linear-gradient(135deg,#0288d1,#0097a7)', tag: 'New Launch',   title: 'Latest Mobiles', sub: 'Explore newest flagships' },
  { emoji: '👗', bg: 'linear-gradient(135deg,#ad1457,#e91e63)', tag: 'Fashion Week', title: 'Style Up!',       sub: 'Min 50% off on top brands' },
];

/* ── Utility: format INR ───────────────────────────────── */
const inr = (n) => '₹' + n.toLocaleString('en-IN');

/* ── Toast notification ────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
window.showToast = showToast;

/* ── Cart ──────────────────────────────────────────────── */
function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = cartCount;
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  cartCount++;
  updateCartBadge();
  showToast(`🛒 "${product.name}" added to cart!`);
}
window.addToCart = addToCart;

function handleCartClick() {
  showToast(cartCount === 0 ? '🛒 Your cart is empty.' : `🛒 You have ${cartCount} item(s) in cart.`);
}
window.handleCartClick = handleCartClick;

/* ── Search ────────────────────────────────────────────── */
function handleSearch() {
  const q = (document.getElementById('search-input')?.value || '').trim();
  if (q) showToast(`🔍 Searching for "${q}"…`);
  else   showToast('Please enter something to search!');
}
window.handleSearch = handleSearch;

// Search on Enter
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement?.id === 'search-input') handleSearch();
});

/* ── Navbar active highlight ────────────────────────────── */
function filterCategory(cat) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  event.currentTarget.classList.add('active');
  showToast(`Browsing: ${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
}
window.filterCategory = filterCategory;

/* ── Banner Slider ─────────────────────────────────────── */
function buildSlides() {
  const slider = document.getElementById('banner-slider');
  const dotsEl = document.getElementById('slider-dots');
  if (!slider || !dotsEl) return;

  // Create slide elements
  SLIDES.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.innerHTML = `
      <div class="slide-placeholder" style="background:${s.bg}">
        <div style="text-align:center;padding:20px">
          <div style="font-size:4rem;margin-bottom:12px">${s.emoji}</div>
          <div style="font-family:'Rajdhani',sans-serif;font-size:1.8rem;font-weight:700;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.4)">${s.label}</div>
          <div style="font-size:1rem;color:rgba(255,255,255,.8);margin-top:6px">${s.sub}</div>
          <button onclick="showToast('🛍️ Opening deal…')" style="margin-top:16px;background:#fff;color:#1565c0;border:none;padding:10px 28px;border-radius:5px;font-weight:800;font-size:.95rem;cursor:pointer;font-family:'Nunito',sans-serif;transition:opacity .2s">Shop Now</button>
        </div>
      </div>`;
    // Insert before the first button
    slider.insertBefore(div, slider.querySelector('.slider-btn.prev'));

    // Dot
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.setAttribute('role', 'tab');
    dot.addEventListener('click', () => goToSlide(i));
    dotsEl.appendChild(dot);
  });

  startAutoSlide();
}

function goToSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;
  slides[slideIndex].classList.remove('active');
  dots[slideIndex]?.classList.remove('active');
  slideIndex = (n + SLIDES.length) % SLIDES.length;
  slides[slideIndex].classList.add('active');
  dots[slideIndex]?.classList.add('active');
}

function changeSlide(dir) {
  goToSlide(slideIndex + dir);
  resetAutoSlide();
}
window.changeSlide = changeSlide;

function startAutoSlide() {
  slideTimer = setInterval(() => goToSlide(slideIndex + 1), 3000);
}

function resetAutoSlide() {
  clearInterval(slideTimer);
  startAutoSlide();
}

/* ── Categories ────────────────────────────────────────── */
function buildCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-item" onclick="showToast('Browsing ${c.label}…')" role="button" tabindex="0" aria-label="${c.label}">
      <div class="cat-icon-wrap">${c.icon}</div>
      <span class="cat-label">${c.label}</span>
    </div>`).join('');
}

/* ── Products ───────────────────────────────────────────── */
function buildProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card" aria-label="${p.name}">
      <button class="wishlist-btn" aria-label="Add to wishlist" onclick="showToast('❤️ Added to wishlist!')">♡</button>
      <div class="product-img-wrap">
        <div class="product-emoji">${p.emoji}</div>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span>${p.rating}</span>
          <span class="star">★</span>
          <span style="opacity:.7;font-weight:400">(${p.reviews.toLocaleString()})</span>
        </div>
        ${p.assured ? '<div class="assured-badge">✔ Flipkart Assured</div>' : ''}
        <div class="product-pricing">
          <span class="product-price">${inr(p.price)}</span>
          <span class="product-mrp">${inr(p.mrp)}</span>
          <span class="product-discount">${p.discount}% off</span>
        </div>
      </div>
      <button class="add-to-cart" onclick="addToCart(${p.id})">🛒 Add to Cart</button>
    </article>`).join('');
}

/* ── Deals ──────────────────────────────────────────────── */
function buildDeals() {
  const scroll = document.getElementById('deals-scroll');
  if (!scroll) return;
  scroll.innerHTML = DEALS.map(d => {
    const salePrice = Math.round(d.originalPrice * (1 - d.discount / 100));
    return `
      <div class="deal-card" onclick="showToast('🔥 Great deal on ${d.name}!')" role="button" tabindex="0" aria-label="${d.name} deal">
        <div class="deal-img-wrap">
          <div class="deal-emoji">${d.emoji}</div>
          <span class="deal-off-badge">${d.discount}% OFF</span>
        </div>
        <div class="deal-info">
          <div class="deal-name">${d.name}</div>
          <div class="deal-discount">${inr(salePrice)}</div>
          <div class="deal-price">${inr(d.originalPrice)}</div>
        </div>
      </div>`;
  }).join('');
}

/* ── Countdown Timer ────────────────────────────────────── */
function startTimer() {
  let total = 8 * 3600 + 24 * 60; // 8h 24m from page load
  const hEl = document.getElementById('timer-hours');
  const mEl = document.getElementById('timer-mins');
  const sEl = document.getElementById('timer-secs');
  if (!hEl) return;

  setInterval(() => {
    if (total <= 0) total = 86400; // reset after 24h
    total--;
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

/* ── Ads ────────────────────────────────────────────────── */
function buildAds() {
  const grid = document.getElementById('ads-grid');
  if (!grid) return;
  grid.innerHTML = ADS.map(a => `
    <div class="ad-card" onclick="showToast('Opening ${a.title}…')" role="button" tabindex="0" aria-label="${a.title}">
      <div class="ad-bg" style="background:${a.bg}">
        <span style="font-size:5rem;opacity:.35">${a.emoji}</span>
      </div>
      <div class="ad-overlay"></div>
      <div class="ad-content">
        <span class="ad-tag">${a.tag}</span>
        <div class="ad-title">${a.title}</div>
        <div class="ad-sub">${a.sub}</div>
      </div>
    </div>`).join('');
}

/* ── Newsletter ─────────────────────────────────────────── */
function subscribeNewsletter() {
  const emailEl = document.getElementById('newsletter-email');
  const email   = (emailEl?.value || '').trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email)          { showToast('⚠️ Please enter your email.');         return; }
  if (!emailRe.test(email)) { showToast('⚠️ Enter a valid email address.'); return; }
  showToast(`✅ Subscribed! Welcome, ${email.split('@')[0]}!`);
  if (emailEl) emailEl.value = '';
}
window.subscribeNewsletter = subscribeNewsletter;

/* ── Component Loader ───────────────────────────────────── */
const COMPONENTS = [
  { id: 'header-placeholder',     file: 'components/header.html',     after: null                },
  { id: 'navbar-placeholder',     file: 'components/navbar.html',     after: null                },
  { id: 'banner-placeholder',     file: 'components/banner.html',     after: buildSlides         },
  { id: 'categories-placeholder', file: 'components/categories.html', after: buildCategories     },
  { id: 'products-placeholder',   file: 'components/products.html',   after: buildProducts       },
  { id: 'deals-placeholder',      file: 'components/deals.html',      after: () => { buildDeals(); startTimer(); } },
  { id: 'ads-placeholder',        file: 'components/ads.html',        after: buildAds            },
  { id: 'newsletter-placeholder', file: 'components/newsletter.html', after: null                },
  { id: 'footer-placeholder',     file: 'components/footer.html',     after: null                },
];

async function loadComponent({ id, file, after }) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res  = await fetch(file);
    if (!res.ok) throw new Error(`HTTP ${res.status} loading ${file}`);
    el.innerHTML = await res.text();
    if (typeof after === 'function') after();
  } catch (err) {
    console.error(`Failed to load component [${id}]:`, err);
    el.innerHTML = `<p style="color:red;padding:8px;">⚠️ Could not load ${file}. Make sure you are running a local server.</p>`;
  }
}

async function initApp() {
  // Load all components sequentially so DOM order is preserved
  for (const comp of COMPONENTS) {
    await loadComponent(comp);
  }
  updateCartBadge();
}

document.addEventListener('DOMContentLoaded', initApp);
