/* ==========================================================================
   NOVA STORE - CORE ARCHITECTURE & ROUTER ENGINE
   ========================================================================== */

import { PRODUCTS, CATEGORIES } from './products.js';
import { 
  getCartState, getWishlistState, getCompareState, saveCompareState,
  getThemeState, saveThemeState, addRecentlyViewed, getRecentlyViewed,
  getUserProfile, saveUserProfile, getOrdersHistory, addOrderToHistory 
} from './storage.js';
import { formatCurrency, renderRatingStars, renderProductCard, openQuickViewModal, showToast } from './ui.js';
import { addToCart, updateCartUI, getCartTotals, getCartWithDetails, applyCoupon } from './cart.js';
import { toggleWishlist, updateWishlistUI, renderWishlistPage } from './wishlist.js';

// Application State
const appState = {
  currentRoute: 'landing',
  routeParams: {},
  viewMode: 'grid',
  shopFilter: {
    search: '',
    category: 'all',
    priceMax: 2500,
    ratingMin: 0,
    inStockOnly: false,
    sortBy: 'featured',
    currentPage: 1,
    itemsPerPage: 8
  }
};

/* ==========================================================================
   1. ROUTER ENGINE
   ========================================================================== */
function routeHandler() {
  const hash = window.location.hash || '#landing';
  const [routePath, queryString] = hash.replace('#', '').split('?');
  
  appState.currentRoute = routePath || 'landing';
  
  // Parse Query Parameters
  const params = {};
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    for (const [k, v] of urlParams.entries()) {
      params[k] = v;
    }
  }
  appState.routeParams = params;

  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Render Target View
  const mainView = document.getElementById('main-app-view');
  if (!mainView) return;

  switch (appState.currentRoute) {
    case 'landing':
      renderLandingView(mainView);
      break;
    case 'shop':
      renderShopView(mainView);
      break;
    case 'product':
      renderProductDetailsView(mainView, params.id);
      break;
    case 'cart':
      renderCartPageView(mainView);
      break;
    case 'checkout':
      renderCheckoutView(mainView);
      break;
    case 'wishlist':
      renderWishlistView(mainView);
      break;
    case 'profile':
      renderProfileView(mainView);
      break;
    case 'compare':
      renderCompareView(mainView);
      break;
    default:
      render404View(mainView);
      break;
  }

  // Active Link State in Header
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${appState.currentRoute}`) link.classList.add('active');
    else link.classList.remove('active');
  });

  updateCartUI();
  updateWishlistUI();
  updateCompareBarUI();
}

/* ==========================================================================
   2. LANDING PAGE VIEW RENDERER
   ========================================================================== */
function renderLandingView(container) {
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  container.innerHTML = `
    <!-- Hero Slider Section -->
    <section class="hero-section" style="position: relative; background: linear-gradient(135deg, var(--color-secondary), #1E293B); color: #FFFFFF; padding: 5rem 0; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <div style="position: absolute; top:-50%; right:-20%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%); pointer-events: none;"></div>
      
      <div class="container hero-slide" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
        <div class="hero-content" style="display: flex; flex-direction: column; align-items: flex-start;">
          <span class="badge badge-accent" style="margin-bottom: 1rem; font-size: 0.85rem; padding: 0.4rem 1rem;">
            <i class="fa-solid fa-sparkles"></i> Next-Gen Technology & Apparel
          </span>
          <h1 style="font-size: 3.25rem; font-weight: 800; line-height: 1.15; color: #FFFFFF; margin-bottom: 1.25rem; letter-spacing: -0.03em;">
            Redefining <span style="background: linear-gradient(90deg, #60A5FA, #A78BFA); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Luxury Shopping</span>
          </h1>
          <p style="font-size: 1.1rem; color: #94A3B8; margin-bottom: 2rem; max-width: 520px;">
            Discover curated precision electronics, smart wearables, studio audio, and handcrafted Italian apparel designed for modern connoisseurs.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="#shop" class="btn btn-primary btn-lg">
              Explore Collection <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#product?id=prod-1" class="btn btn-outline btn-lg" style="color: #FFFFFF; border-color: rgba(255,255,255,0.3);">
              Featured Product
            </a>
          </div>
        </div>

        <div style="position: relative; display: flex; justify-content: center;">
          <div style="width: 100%; max-width: 460px; aspect-ratio: 1/1; border-radius: 28px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" alt="Nova SoundMax" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div class="glass-panel" style="position: absolute; bottom: -20px; left: 10px; padding: 1rem 1.5rem; border-radius: 18px; color: #1E293B; display: flex; align-items: center; gap: 1rem;">
            <i class="fa-solid fa-award" style="font-size: 2rem; color: var(--color-accent);"></i>
            <div>
              <div style="font-weight: 800; font-size: 1.05rem;">Red Dot Design Award</div>
              <div style="font-size: 0.8rem; color: #64748B;">Winner 2026 Audio Engineering</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Popular Categories</h2>
          <p class="section-subtitle">Browse through our meticulously curated product domains.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1.25rem;">
          ${CATEGORIES.map(cat => `
            <div class="category-card card-hover-lift" data-category="${cat.id}" style="background: var(--color-card); border: 1px solid var(--color-card-border); border-radius: 20px; padding: 1.5rem 1rem; text-align: center; cursor: pointer;">
              <div style="width: 54px; height: 54px; border-radius: 16px; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem;">
                <i class="fa-solid ${cat.icon}"></i>
              </div>
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-text);">${cat.name}</h4>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Deal of the Day Banner with Live Timer -->
    <section class="section-padding" style="background: var(--color-primary-light); border-y: 1px solid var(--color-card-border);">
      <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
        <div>
          <span class="badge badge-danger" style="margin-bottom: 0.75rem;">Exclusive Deal of the Day</span>
          <h2 style="font-size: 2.25rem; margin-bottom: 1rem; color: var(--color-text);">Nova Chrono Pro Titanium Smartwatch</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem; font-size: 1.05rem;">
            Grade 5 Titanium bezel, Sapphire crystal glass, and continuous ECG sensor. Save $100 today only!
          </p>

          <!-- Live Timer -->
          <div style="display: flex; gap: 1rem; margin-bottom: 2rem;" id="deal-countdown-timer">
            <div style="background: var(--color-card); padding: 0.85rem 1.25rem; border-radius: 16px; text-align: center; border: 1px solid var(--color-card-border); min-width: 70px;">
              <div id="timer-hours" style="font-size: 1.65rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading);">08</div>
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-subtle);">Hours</div>
            </div>
            <div style="background: var(--color-card); padding: 0.85rem 1.25rem; border-radius: 16px; text-align: center; border: 1px solid var(--color-card-border); min-width: 70px;">
              <div id="timer-mins" style="font-size: 1.65rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading);">42</div>
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-subtle);">Mins</div>
            </div>
            <div style="background: var(--color-card); padding: 0.85rem 1.25rem; border-radius: 16px; text-align: center; border: 1px solid var(--color-card-border); min-width: 70px;">
              <div id="timer-secs" style="font-size: 1.65rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading);">19</div>
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-subtle);">Secs</div>
            </div>
          </div>

          <a href="#product?id=prod-6" class="btn btn-primary btn-lg">
            Claim Deal - $386.99 <i class="fa-solid fa-bolt"></i>
          </a>
        </div>

        <div style="position: relative;">
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" style="border-radius: 24px; box-shadow: var(--shadow-xl); width: 100%; aspect-ratio: 1/1; object-fit: cover;" />
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Creations</h2>
          <p class="section-subtitle">Handpicked luxury gear loved by customers worldwide.</p>
        </div>

        <div class="products-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.75rem;">
          ${featuredProducts.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Features Benefits Bar -->
    <section class="section-padding" style="background: var(--color-card); border-y: 1px solid var(--color-card-border);">
      <div class="container">
        <div class="features-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;">
          <div style="display: flex; gap: 1.25rem; align-items: center;">
            <div style="width: 52px; height: 52px; border-radius: 16px; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink:0;">
              <i class="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <h4 style="font-size: 1rem; font-weight: 700;">Free Express Shipping</h4>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin:0;">On all orders above $150</p>
            </div>
          </div>

          <div style="display: flex; gap: 1.25rem; align-items: center;">
            <div style="width: 52px; height: 52px; border-radius: 16px; background: var(--color-success-bg); color: var(--color-success); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink:0;">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h4 style="font-size: 1rem; font-weight: 700;">2-Year Warranty</h4>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin:0;">Comprehensive hardware coverage</p>
            </div>
          </div>

          <div style="display: flex; gap: 1.25rem; align-items: center;">
            <div style="width: 52px; height: 52px; border-radius: 16px; background: var(--color-accent-light); color: var(--color-accent-hover); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink:0;">
              <i class="fa-solid fa-rotate-left"></i>
            </div>
            <div>
              <h4 style="font-size: 1rem; font-weight: 700;">30-Day Money Back</h4>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin:0;">Hassle-free instant returns</p>
            </div>
          </div>

          <div style="display: flex; gap: 1.25rem; align-items: center;">
            <div style="width: 52px; height: 52px; border-radius: 16px; background: var(--color-info-bg); color: var(--color-info); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink:0;">
              <i class="fa-solid fa-headset"></i>
            </div>
            <div>
              <h4 style="font-size: 1rem; font-weight: 700;">24/7 VIP Concierge</h4>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin:0;">Dedicated human support</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Slider -->
    <section class="section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Client Praise</h2>
          <p class="section-subtitle">What thousands of satisfied customers say about Nova Store.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.75rem;">
          <div style="background: var(--color-card); border: 1px solid var(--color-card-border); padding: 2rem; border-radius: 20px;" class="card-hover-lift">
            <div style="color: var(--color-accent); margin-bottom: 1rem; font-size: 1.1rem;">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-text); margin-bottom: 1.5rem; font-style: italic;">
              "The SoundMax ANC headphones blew my studio expectations out of the water. The packaging was immaculate and shipping arrived in 24 hours."
            </p>
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <img src="https://i.pravatar.cc/100?img=33" style="width: 44px; height: 44px; border-radius: 50%;" />
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">Marcus Sterling</div>
                <div style="font-size: 0.8rem; color: var(--color-text-muted);">Audio Producer • NYC</div>
              </div>
            </div>
          </div>

          <div style="background: var(--color-card); border: 1px solid var(--color-card-border); padding: 2rem; border-radius: 20px;" class="card-hover-lift">
            <div style="color: var(--color-accent); margin-bottom: 1rem; font-size: 1.1rem;">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-text); margin-bottom: 1.5rem; font-style: italic;">
              "Nova Store delivers Apple-level refined aesthetic with Amazon-level fast delivery. Customer support resolved my address change instantly."
            </p>
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <img src="https://i.pravatar.cc/100?img=47" style="width: 44px; height: 44px; border-radius: 50%;" />
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">Elena Rostova</div>
                <div style="font-size: 0.8rem; color: var(--color-text-muted);">Architect • San Francisco</div>
              </div>
            </div>
          </div>

          <div style="background: var(--color-card); border: 1px solid var(--color-card-border); padding: 2rem; border-radius: 20px;" class="card-hover-lift">
            <div style="color: var(--color-accent); margin-bottom: 1rem; font-size: 1.1rem;">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-text); margin-bottom: 1.5rem; font-style: italic;">
              "The Merino wool blazer tailored fit is divine. High quality materials, seamless payment checkout, and zero issues."
            </p>
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <img src="https://i.pravatar.cc/100?img=12" style="width: 44px; height: 44px; border-radius: 50%;" />
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">David Miller</div>
                <div style="font-size: 0.8rem; color: var(--color-text-muted);">Creative Director • London</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="section-padding" style="background: linear-gradient(135deg, var(--color-secondary), #0F172A); color: #FFFFFF; border-t: 1px solid rgba(255,255,255,0.1);">
      <div class="container" style="max-width: 800px; text-align: center;">
        <span class="badge badge-accent" style="margin-bottom: 1rem;">Stay Ahead</span>
        <h2 style="font-size: 2.25rem; color: #FFFFFF; margin-bottom: 0.75rem;">Join the Nova Inner Circle</h2>
        <p style="color: #94A3B8; margin-bottom: 2rem; font-size: 1.05rem;">
          Subscribe to receive VIP access to limited product drops, private sales, and 15% off your first order.
        </p>

        <form id="newsletter-form-home" style="display: flex; gap: 0.75rem; max-width: 540px; margin: 0 auto;">
          <input type="email" placeholder="Enter your email address..." required style="flex: 1; padding: 0.85rem 1.25rem; border-radius: 14px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #FFFFFF;" />
          <button type="submit" class="btn btn-primary btn-lg">Subscribe</button>
        </form>
      </div>
    </section>
  `;

  // Start Live Deal Timer Countdown Loop
  startDealTimer();

  // Category card click
  container.querySelectorAll('.category-card').forEach(card => {
    card.onclick = () => {
      appState.shopFilter.category = card.dataset.category;
      window.location.hash = '#shop';
    };
  });

  // Newsletter Submit
  const newsletterForm = document.getElementById('newsletter-form-home');
  if (newsletterForm) {
    newsletterForm.onsubmit = (e) => {
      e.preventDefault();
      showToast('Subscribed Successfully!', 'Check your inbox for your 15% discount code!', 'success');
      newsletterForm.reset();
    };
  }
}

/* Timer Helper */
function startDealTimer() {
  setInterval(() => {
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');
    if (!hoursEl || !minsEl || !secsEl) return;

    let s = parseInt(secsEl.innerText) - 1;
    let m = parseInt(minsEl.innerText);
    let h = parseInt(hoursEl.innerText);

    if (s < 0) { s = 59; m--; }
    if (m < 0) { m = 59; h--; }
    if (h < 0) { h = 23; }

    secsEl.innerText = s.toString().padStart(2, '0');
    minsEl.innerText = m.toString().padStart(2, '0');
    hoursEl.innerText = h.toString().padStart(2, '0');
  }, 1000);
}

/* ==========================================================================
   3. SHOP PAGE VIEW RENDERER (Filters, Search, Sorting, Grid/List)
   ========================================================================== */
function renderShopView(container) {
  const filter = appState.shopFilter;

  // Filter logic
  let filteredProducts = PRODUCTS.filter(p => {
    // Search
    if (filter.search && !p.title.toLowerCase().includes(filter.search.toLowerCase()) && !p.description.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    // Category
    if (filter.category !== 'all' && p.category !== filter.category) {
      return false;
    }
    // Price
    const price = p.discount > 0 ? p.price * (1 - p.discount/100) : p.price;
    if (price > filter.priceMax) return false;
    // Rating
    if (filter.ratingMin > 0 && p.rating < filter.ratingMin) return false;
    // Stock
    if (filter.inStockOnly && p.stock <= 0) return false;

    return true;
  });

  // Sort logic
  if (filter.sortBy === 'price-low') {
    filteredProducts.sort((a,b) => (a.price*(1-a.discount/100)) - (b.price*(1-b.discount/100)));
  } else if (filter.sortBy === 'price-high') {
    filteredProducts.sort((a,b) => (b.price*(1-b.discount/100)) - (a.price*(1-a.discount/100)));
  } else if (filter.sortBy === 'rating') {
    filteredProducts.sort((a,b) => b.rating - a.rating);
  } else if (filter.sortBy === 'newest') {
    filteredProducts.sort((a,b) => b.id.localeCompare(a.id));
  }

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / filter.itemsPerPage) || 1;
  const startIdx = (filter.currentPage - 1) * filter.itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + filter.itemsPerPage);

  container.innerHTML = `
    <!-- Shop Banner Header -->
    <div style="background: var(--color-card); border-bottom: 1px solid var(--color-card-border); padding: 2.5rem 0;">
      <div class="container">
        <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">Shop Catalog</h1>
        <div style="font-size: 0.9rem; color: var(--color-text-muted);">
          Showing ${paginatedProducts.length} of ${totalItems} luxury items
        </div>
      </div>
    </div>

    <!-- Shop Layout Container -->
    <div class="container section-padding">
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 2.5rem;" class="shop-layout">
        
        <!-- Sidebar Filters -->
        <aside class="shop-sidebar" style="background: var(--color-card); padding: 1.75rem; border-radius: 20px; border: 1px solid var(--color-card-border); height: fit-content;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700;">Filters</h3>
            <button class="btn btn-outline btn-sm" id="reset-filters-btn" style="font-size: 0.8rem;">Reset All</button>
          </div>

          <!-- Search Filter -->
          <div style="margin-bottom: 1.75rem;">
            <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.5rem;">Search Keyword</label>
            <div style="display: flex; align-items: center; background: var(--color-input-bg); border: 1px solid var(--color-card-border); border-radius: 12px; padding: 0.5rem 0.85rem;">
              <i class="fa-solid fa-magnifying-glass" style="color: var(--color-text-subtle); margin-right: 0.5rem;"></i>
              <input type="text" id="shop-search-input" value="${filter.search}" placeholder="Search catalog..." style="width: 100%; font-size: 0.875rem;" />
            </div>
          </div>

          <!-- Category Filter -->
          <div style="margin-bottom: 1.75rem;">
            <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.75rem;">Categories</label>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${CATEGORIES.map(cat => `
                <button class="filter-category-btn ${filter.category === cat.id ? 'active' : ''}" data-category="${cat.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.85rem; border-radius: 10px; font-size: 0.9rem; text-align: left; background: ${filter.category === cat.id ? 'var(--color-primary-light)' : 'transparent'}; color: ${filter.category === cat.id ? 'var(--color-primary)' : 'var(--color-text)'}; font-weight: ${filter.category === cat.id ? '700' : '500'};">
                  <span><i class="fa-solid ${cat.icon}" style="margin-right: 0.5rem;"></i> ${cat.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Price Slider -->
          <div style="margin-bottom: 1.75rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; font-weight: 700;">
              <span>Max Price</span>
              <span id="price-slider-val" style="color: var(--color-primary);">${formatCurrency(filter.priceMax)}</span>
            </div>
            <input type="range" id="shop-price-slider" min="50" max="2500" step="50" value="${filter.priceMax}" style="width: 100%; accent-color: var(--color-primary);" />
          </div>

          <!-- Rating Filter -->
          <div style="margin-bottom: 1.75rem;">
            <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.5rem;">Minimum Rating</label>
            <select id="shop-rating-select" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg); font-size: 0.9rem;">
              <option value="0" ${filter.ratingMin === 0 ? 'selected' : ''}>All Ratings</option>
              <option value="4.5" ${filter.ratingMin === 4.5 ? 'selected' : ''}>4.5★ & Above</option>
              <option value="4.0" ${filter.ratingMin === 4.0 ? 'selected' : ''}>4.0★ & Above</option>
            </select>
          </div>

          <!-- Availability Checkbox -->
          <div style="margin-bottom: 1.75rem;">
            <label style="display: flex; align-items: center; gap: 0.65rem; font-size: 0.9rem; font-weight: 600; cursor: pointer;">
              <input type="checkbox" id="shop-instock-chk" ${filter.inStockOnly ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--color-primary);" />
              <span>In Stock Only</span>
            </label>
          </div>

          <!-- Member Perk Card (Clean Minimalism) -->
          <div style="padding: 1.25rem; border-radius: 16px; background: linear-gradient(135deg, #0F172A, #1E293B); color: #FFF; position: relative; overflow: hidden;">
            <div style="position: relative; z-index: 1;">
              <div style="font-size: 0.65rem; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.35rem;">Member Perk</div>
              <div style="font-size: 1.05rem; font-weight: 700; line-height: 1.25; margin-bottom: 0.85rem;">Get 20% off your next order</div>
              <button class="btn btn-sm" style="background: #FFFFFF; color: #0F172A; font-weight: 700; border-radius: 9999px; padding: 0.35rem 0.85rem; font-size: 0.75rem;" onclick="showToast('Pro Member Perk Unlocked!', 'Use code PRO20 at checkout for 20% OFF!', 'info')">Upgrade Pro</button>
            </div>
            <div style="position: absolute; right: -15px; bottom: -15px; width: 80px; height: 80px; background: rgba(37, 99, 235, 0.25); border-radius: 50%; filter: blur(20px);"></div>
          </div>
        </aside>

        <!-- Main Content Grid -->
        <div>
          <!-- Spring Collection Clean Minimalism Banner -->
          <section style="background: linear-gradient(135deg, #2563EB, #1D4ED8); border-radius: 24px; padding: 2rem 2.25rem; display: flex; align-items: center; justify-content: space-between; color: #FFFFFF; box-shadow: var(--shadow-lg); position: relative; overflow: hidden; margin-bottom: 2rem;">
            <div style="max-width: 480px; position: relative; z-index: 2;">
              <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; color: #FFFFFF; letter-spacing: -0.02em;">Spring Collection 2026</h2>
              <p style="color: #DBEAFE; font-size: 0.95rem; margin-bottom: 1.25rem; line-height: 1.5;">Experience the new standard of minimalist premium design and unmatched quality.</p>
              <button class="btn" style="background-color: #F59E0B; color: #FFFFFF; border-radius: 9999px; font-weight: 700; padding: 0.65rem 1.5rem; font-size: 0.9rem; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);" onclick="window.shopSetCategory && window.shopSetCategory('all')">
                Browse Collection
              </button>
            </div>
            <div style="width: 180px; height: 180px; background: rgba(255,255,255,0.1); border-radius: 50%; position: absolute; right: -30px; top: -30px; backdrop-filter: blur(20px);"></div>
            <div style="width: 130px; height: 130px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; position: absolute; right: 60px; bottom: -30px;"></div>
          </section>
          <!-- Header Toolbar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.75rem; background: var(--color-card); padding: 1rem 1.5rem; border-radius: 16px; border: 1px solid var(--color-card-border);">
            <div style="font-size: 0.9rem; font-weight: 600; color: var(--color-text-muted);">
              Page <span style="color: var(--color-text); font-weight:700;">${filter.currentPage}</span> of ${totalPages}
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <!-- Sort Select -->
              <select id="shop-sort-select" style="padding: 0.5rem 1rem; border: 1px solid var(--color-card-border); border-radius: 10px; background: var(--color-input-bg); font-size: 0.875rem; font-weight: 600;">
                <option value="featured" ${filter.sortBy === 'featured' ? 'selected' : ''}>Sort by: Featured</option>
                <option value="price-low" ${filter.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-high" ${filter.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                <option value="rating" ${filter.sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
                <option value="newest" ${filter.sortBy === 'newest' ? 'selected' : ''}>Newest First</option>
              </select>

              <!-- View Switcher -->
              <div style="display: flex; background: var(--color-input-bg); border-radius: 10px; padding: 3px;">
                <button class="view-btn ${appState.viewMode === 'grid' ? 'active' : ''}" id="btn-view-grid" style="padding: 0.4rem 0.65rem; border-radius: 8px; font-size: 0.9rem;"><i class="fa-solid fa-grid-2"></i></button>
                <button class="view-btn ${appState.viewMode === 'list' ? 'active' : ''}" id="btn-view-list" style="padding: 0.4rem 0.65rem; border-radius: 8px; font-size: 0.9rem;"><i class="fa-solid fa-list"></i></button>
              </div>
            </div>
          </div>

          <!-- Product Cards Grid -->
          ${paginatedProducts.length === 0 ? `
            <div style="text-align: center; padding: 4rem 1rem; background: var(--color-card); border-radius: 20px; border: 1px solid var(--color-card-border);">
              <i class="fa-solid fa-magnifying-glass" style="font-size: 3.5rem; color: var(--color-text-subtle); margin-bottom: 1rem;"></i>
              <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">No products match your criteria</h3>
              <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">Try adjusting your price range, category filters, or search terms.</p>
              <button class="btn btn-primary" id="empty-reset-btn">Reset Filters</button>
            </div>
          ` : `
            <div class="products-grid" style="display: grid; grid-template-columns: ${appState.viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr'}; gap: 1.5rem;">
              ${paginatedProducts.map(p => renderProductCard(p, appState.viewMode)).join('')}
            </div>
          `}

          <!-- Pagination Controls -->
          ${totalPages > 1 ? `
            <div style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 3rem;">
              <button class="btn btn-outline btn-sm" id="page-prev" ${filter.currentPage === 1 ? 'disabled style="opacity:0.5;"' : ''}>
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              
              ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
                <button class="btn btn-sm ${p === filter.currentPage ? 'btn-primary' : 'btn-outline'}" onclick="window.shopSetPage(${p})">
                  ${p}
                </button>
              `).join('')}

              <button class="btn btn-outline btn-sm" id="page-next" ${filter.currentPage === totalPages ? 'disabled style="opacity:0.5;"' : ''}>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  // Filter Listeners
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      appState.shopFilter.search = e.target.value;
      appState.shopFilter.currentPage = 1;
      renderShopView(container);
    };
  }

  container.querySelectorAll('.filter-category-btn').forEach(btn => {
    btn.onclick = () => {
      appState.shopFilter.category = btn.dataset.category;
      appState.shopFilter.currentPage = 1;
      renderShopView(container);
    };
  });

  const priceSlider = document.getElementById('shop-price-slider');
  if (priceSlider) {
    priceSlider.oninput = (e) => {
      appState.shopFilter.priceMax = parseFloat(e.target.value);
      document.getElementById('price-slider-val').innerText = formatCurrency(appState.shopFilter.priceMax);
    };
    priceSlider.onchange = () => {
      appState.shopFilter.currentPage = 1;
      renderShopView(container);
    };
  }

  const ratingSelect = document.getElementById('shop-rating-select');
  if (ratingSelect) {
    ratingSelect.onchange = (e) => {
      appState.shopFilter.ratingMin = parseFloat(e.target.value);
      appState.shopFilter.currentPage = 1;
      renderShopView(container);
    };
  }

  const instockChk = document.getElementById('shop-instock-chk');
  if (instockChk) {
    instockChk.onchange = (e) => {
      appState.shopFilter.inStockOnly = e.target.checked;
      appState.shopFilter.currentPage = 1;
      renderShopView(container);
    };
  }

  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      appState.shopFilter.sortBy = e.target.value;
      renderShopView(container);
    };
  }

  // View Switchers
  const btnGrid = document.getElementById('btn-view-grid');
  const btnList = document.getElementById('btn-view-list');
  if (btnGrid) btnGrid.onclick = () => { appState.viewMode = 'grid'; renderShopView(container); };
  if (btnList) btnList.onclick = () => { appState.viewMode = 'list'; renderShopView(container); };

  // Reset Button
  const resetBtn = document.getElementById('reset-filters-btn') || document.getElementById('empty-reset-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      appState.shopFilter = { search: '', category: 'all', priceMax: 2500, ratingMin: 0, inStockOnly: false, sortBy: 'featured', currentPage: 1, itemsPerPage: 8 };
      renderShopView(container);
    };
  }

  // Pagination Handlers
  window.shopSetCategory = (cat) => {
    appState.shopFilter.category = cat;
    appState.shopFilter.currentPage = 1;
    renderShopView(container);
  };

  window.shopSetPage = (p) => {
    appState.shopFilter.currentPage = p;
    renderShopView(container);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const prevBtn = document.getElementById('page-prev');
  const nextBtn = document.getElementById('page-next');
  if (prevBtn) prevBtn.onclick = () => window.shopSetPage(filter.currentPage - 1);
  if (nextBtn) nextBtn.onclick = () => window.shopSetPage(filter.currentPage + 1);
}

/* ==========================================================================
   4. PRODUCT DETAILS VIEW RENDERER (Gallery Zoom, Specs, Reviews)
   ========================================================================== */
function renderProductDetailsView(container, productId) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  addRecentlyViewed(product.id);

  const wishlist = getWishlistState();
  const compare = getCompareState();
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compare.includes(product.id);

  const finalPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  container.innerHTML = `
    <!-- Breadcrumb Header -->
    <div style="background: var(--color-card); border-bottom: 1px solid var(--color-card-border); padding: 1rem 0;">
      <div class="container" style="font-size: 0.875rem; color: var(--color-text-muted); display: flex; gap: 0.5rem; align-items: center;">
        <a href="#landing">Home</a> <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;"></i>
        <a href="#shop">Shop</a> <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;"></i>
        <span>${product.category}</span> <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;"></i>
        <span style="color: var(--color-text); font-weight: 600;">${product.title}</span>
      </div>
    </div>

    <!-- Product Details Main Layout -->
    <div class="container section-padding">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem;" class="product-details-grid">
        
        <!-- Multi-image Gallery with Zoom Loupe -->
        <div>
          <div style="aspect-ratio: 1/1; border-radius: 24px; overflow: hidden; background: #F8FAFC; border: 1px solid var(--color-card-border); position: relative;" id="main-gallery-wrap">
            <img src="${product.image}" id="main-gallery-img" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; cursor: zoom-in;" />
          </div>

          ${product.gallery && product.gallery.length > 0 ? `
            <div style="display: flex; gap: 1rem; margin-top: 1.25rem;">
              ${product.gallery.map(img => `
                <div style="width: 80px; height: 80px; border-radius: 14px; overflow: hidden; cursor: pointer; border: 2px solid var(--color-card-border);" class="gallery-thumb-slot" onclick="document.getElementById('main-gallery-img').src='${img}'">
                  <img src="${img}" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Details Information -->
        <div>
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span class="badge badge-primary">${product.brand}</span>
            <span class="badge badge-success">In Stock (${product.stock} left)</span>
          </div>

          <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-text); margin-bottom: 0.85rem; line-height: 1.2;">
            ${product.title}
          </h1>

          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            ${renderRatingStars(product.rating, product.reviewsCount)}
            <a href="#reviews-anchor" style="font-size: 0.875rem; color: var(--color-primary); font-weight: 600;">Read All Reviews</a>
          </div>

          <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.75rem; background: var(--color-input-bg); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--color-card-border);">
            <span style="font-size: 2.25rem; font-weight: 800; color: var(--color-primary); font-family: var(--font-heading);">${formatCurrency(finalPrice)}</span>
            ${product.discount > 0 ? `
              <span style="font-size: 1.25rem; color: var(--color-text-subtle); text-decoration: line-through;">${formatCurrency(product.price)}</span>
              <span class="badge badge-danger">Save ${product.discount}%</span>
            ` : ''}
          </div>

          <p style="font-size: 1rem; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 2rem;">
            ${product.description}
          </p>

          <!-- Action Row -->
          <div style="display: flex; gap: 1rem; margin-bottom: 2rem; align-items: center;">
            <div class="cart-item-qty" style="background: var(--color-input-bg); padding: 0.75rem 1rem; border-radius: 14px; border: 1px solid var(--color-card-border);">
              <button class="qty-btn" id="pd-qty-minus" style="font-size: 1.1rem;">-</button>
              <span id="pd-qty-val" style="font-weight: 800; padding: 0 1rem; font-size: 1.1rem;">1</span>
              <button class="qty-btn" id="pd-qty-plus" style="font-size: 1.1rem;">+</button>
            </div>

            <button class="btn btn-primary btn-lg" id="pd-add-cart" style="flex: 1;">
              <i class="fa-solid fa-bag-shopping"></i> Add to Bag
            </button>

            <button class="btn btn-outline btn-lg ${isWishlisted ? 'active' : ''}" id="pd-wishlist-btn" title="Save to Wishlist">
              <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            
            <button class="btn btn-outline btn-lg ${isCompared ? 'active' : ''}" id="pd-compare-btn" title="Compare">
              <i class="fa-solid fa-code-compare"></i>
            </button>
          </div>

          <!-- Guarantees Box -->
          <div style="background: var(--color-card); border: 1px solid var(--color-card-border); padding: 1.5rem; border-radius: 18px; display: flex; flex-direction: column; gap: 1rem; font-size: 0.9rem;">
            <div style="display: flex; gap: 0.85rem; align-items: center;">
              <i class="fa-solid fa-truck" style="color: var(--color-primary); font-size: 1.2rem;"></i>
              <div><strong>Free Express Worldwide Shipping</strong> on orders above $150</div>
            </div>
            <div style="display: flex; gap: 0.85rem; align-items: center;">
              <i class="fa-solid fa-shield-halved" style="color: var(--color-success); font-size: 1.2rem;"></i>
              <div><strong>Official 2-Year Nova Manufacturer Warranty</strong> included</div>
            </div>
            <div style="display: flex; gap: 0.85rem; align-items: center;">
              <i class="fa-solid fa-arrows-rotate" style="color: var(--color-accent); font-size: 1.2rem;"></i>
              <div><strong>30-Day Risk-Free Return Policy</strong></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technical Specifications & Reviews Tabs -->
      <div style="margin-top: 4rem; background: var(--color-card); border-radius: 24px; border: 1px solid var(--color-card-border); padding: 2.5rem;" id="reviews-anchor">
        <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Technical Specifications</h3>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 3rem;">
          ${Object.entries(product.specs || {}).map(([k, v]) => `
            <div style="display: flex; justify-content: space-between; padding: 0.85rem 1.25rem; background: var(--color-input-bg); border-radius: 12px; font-size: 0.95rem;">
              <span style="color: var(--color-text-muted); font-weight: 600;">${k}</span>
              <span style="color: var(--color-text); font-weight: 700;">${v}</span>
            </div>
          `).join('')}
        </div>

        <!-- Reviews Section -->
        <div style="border-top: 1px solid var(--color-divider); padding-top: 2.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h3 style="font-size: 1.5rem;">Customer Reviews (${product.reviews?.length || 0})</h3>
            <button class="btn btn-primary btn-sm" id="write-review-btn"><i class="fa-solid fa-pen"></i> Write a Review</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            ${(product.reviews || []).length === 0 ? `
              <p style="color: var(--color-text-muted);">No reviews written yet. Be the first customer to share your thoughts!</p>
            ` : (product.reviews || []).map(r => `
              <div style="background: var(--color-input-bg); padding: 1.5rem; border-radius: 18px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <div style="display: flex; align-items: center; gap: 0.85rem;">
                    <img src="${r.avatar}" style="width: 40px; height: 40px; border-radius: 50%;" />
                    <div>
                      <div style="font-weight: 700; font-size: 0.95rem;">${r.user}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-subtle);">${r.date}</div>
                    </div>
                  </div>
                  <div style="color: var(--color-accent); font-size: 0.85rem;">
                    ${renderRatingStars(r.rating)}
                  </div>
                </div>
                <p style="font-size: 0.95rem; color: var(--color-text); font-style: italic;">"${r.comment}"</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Related Products Recommendations -->
      ${relatedProducts.length > 0 ? `
        <div style="margin-top: 4rem;">
          <h3 style="font-size: 1.75rem; margin-bottom: 1.75rem;">You Might Also Like</h3>
          <div class="products-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">
            ${relatedProducts.map(p => renderProductCard(p)).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Gallery Image Zoom Interaction
  const galleryImg = document.getElementById('main-gallery-img');
  const galleryWrap = document.getElementById('main-gallery-wrap');
  if (galleryImg && galleryWrap) {
    galleryWrap.onmousemove = (e) => {
      const rect = galleryWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      galleryImg.style.transformOrigin = `${x}% ${y}%`;
      galleryImg.style.transform = 'scale(1.8)';
    };
    galleryWrap.onmouseleave = () => {
      galleryImg.style.transform = 'scale(1)';
    };
  }

  // Quantity Controls
  let qty = 1;
  const qtyVal = document.getElementById('pd-qty-val');
  document.getElementById('pd-qty-minus').onclick = () => { if (qty > 1) { qty--; qtyVal.innerText = qty; } };
  document.getElementById('pd-qty-plus').onclick = () => { qty++; qtyVal.innerText = qty; };

  // Add to Cart button
  document.getElementById('pd-add-cart').onclick = () => addToCart(product.id, qty);

  // Wishlist toggle
  document.getElementById('pd-wishlist-btn').onclick = () => {
    toggleWishlist(product.id);
    renderProductDetailsView(container, product.id);
  };

  // Compare toggle
  document.getElementById('pd-compare-btn').onclick = () => {
    toggleCompareProduct(product.id);
    renderProductDetailsView(container, product.id);
  };

  // Write review button
  document.getElementById('write-review-btn').onclick = () => {
    const reviewText = prompt("Write your review for " + product.title + ":");
    if (reviewText && reviewText.trim()) {
      product.reviews.unshift({
        id: 'r-' + Date.now(),
        user: 'Alex Morgan',
        avatar: 'https://i.pravatar.cc/100?img=68',
        rating: 5,
        date: new Date().toISOString().split('T')[0],
        comment: reviewText
      });
      showToast('Review Submitted', 'Thank you for your feedback!', 'success');
      renderProductDetailsView(container, product.id);
    }
  };
}

/* ==========================================================================
   5. CART PAGE VIEW RENDERER
   ========================================================================== */
function renderCartPageView(container) {
  container.innerHTML = `
    <div class="container section-padding" id="cart-page-content"></div>
  `;
  updateCartUI();
}

/* ==========================================================================
   6. CHECKOUT VIEW RENDERER (Address, Payment, Summary, Confirmation Modal)
   ========================================================================== */
function renderCheckoutView(container) {
  const totals = getCartTotals();
  const cartItems = getCartWithDetails();
  const user = getUserProfile();

  if (cartItems.length === 0) {
    window.location.hash = '#cart';
    return;
  }

  container.innerHTML = `
    <div class="container section-padding">
      <h1 style="font-size: 2.25rem; margin-bottom: 2rem;">Secure Checkout</h1>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem;" class="checkout-grid">
        
        <!-- Checkout Form Steps -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          
          <!-- Step 1: Shipping Information -->
          <div style="background: var(--color-card); padding: 2rem; border-radius: 20px; border: 1px solid var(--color-card-border);">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
              <span style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">1</span>
              Shipping Information
            </h3>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.35rem;">Full Name</label>
                <input type="text" id="chk-name" value="${user.name}" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg);" />
              </div>

              <div>
                <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.35rem;">Email Address</label>
                <input type="email" id="chk-email" value="${user.email}" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg);" />
              </div>

              <div style="grid-column: span 2;">
                <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.35rem;">Street Address</label>
                <input type="text" id="chk-street" value="${user.addresses[0]?.street || ''}" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg);" />
              </div>

              <div>
                <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.35rem;">City</label>
                <input type="text" id="chk-city" value="${user.addresses[0]?.city || ''}" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg);" />
              </div>

              <div>
                <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.35rem;">ZIP / Postal Code</label>
                <input type="text" id="chk-zip" value="${user.addresses[0]?.zip || ''}" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg);" />
              </div>
            </div>
          </div>

          <!-- Step 2: Payment Method -->
          <div style="background: var(--color-card); padding: 2rem; border-radius: 20px; border: 1px solid var(--color-card-border);">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
              <span style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">2</span>
              Payment Options
            </h3>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
              <div style="border: 2px solid var(--color-primary); background: var(--color-primary-light); padding: 1rem; border-radius: 14px; text-align: center; cursor: pointer;">
                <i class="fa-solid fa-credit-card" style="font-size: 1.5rem; color: var(--color-primary); margin-bottom: 0.35rem;"></i>
                <div style="font-size: 0.85rem; font-weight: 700;">Credit Card</div>
              </div>

              <div style="border: 1px solid var(--color-card-border); padding: 1rem; border-radius: 14px; text-align: center; cursor: pointer; opacity: 0.7;">
                <i class="fa-brands fa-apple" style="font-size: 1.5rem; margin-bottom: 0.35rem;"></i>
                <div style="font-size: 0.85rem; font-weight: 700;">Apple Pay</div>
              </div>

              <div style="border: 1px solid var(--color-card-border); padding: 1rem; border-radius: 14px; text-align: center; cursor: pointer; opacity: 0.7;">
                <i class="fa-brands fa-paypal" style="font-size: 1.5rem; color: #003087; margin-bottom: 0.35rem;"></i>
                <div style="font-size: 0.85rem; font-weight: 700;">PayPal</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div style="grid-column: span 2;">
                <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.35rem;">Card Number</label>
                <input type="text" value="4242 •••• •••• 4242" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg);" />
              </div>

              <div>
                <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.35rem;">Expiry Date</label>
                <input type="text" value="12/28" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg);" />
              </div>

              <div>
                <label style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.35rem;">CVC / CVV</label>
                <input type="password" value="888" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-card-border); border-radius: 12px; background: var(--color-input-bg);" />
              </div>
            </div>
          </div>
        </div>

        <!-- Checkout Summary -->
        <div style="background: var(--color-card); padding: 2rem; border-radius: 20px; border: 1px solid var(--color-card-border); height: fit-content;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--color-divider); padding-bottom: 0.85rem;">Order Review</h3>

          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; max-height: 240px; overflow-y: auto;">
            ${cartItems.map(item => `
              <div style="display: flex; gap: 0.85rem; align-items: center;">
                <img src="${item.product.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px;" />
                <div style="flex:1;">
                  <div style="font-size: 0.85rem; font-weight: 600; line-height: 1.2;">${item.product.title}</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">Qty: ${item.qty}</div>
                </div>
                <div style="font-weight: 700; font-size: 0.9rem;">${formatCurrency(item.totalPrice)}</div>
              </div>
            `).join('')}
          </div>

          <div style="border-top: 1px solid var(--color-divider); padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
            <div style="display: flex; justify-content: space-between;"><span>Subtotal</span><span>${formatCurrency(totals.subtotal)}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Shipping</span><span>${totals.shipping === 0 ? 'FREE' : formatCurrency(totals.shipping)}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Tax</span><span>${formatCurrency(totals.tax)}</span></div>
            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; border-top: 1px solid var(--color-divider); padding-top: 0.75rem; margin-top: 0.5rem;">
              <span>Total</span><span style="color: var(--color-primary);">${formatCurrency(totals.total)}</span>
            </div>
          </div>

          <button class="btn btn-primary btn-lg" id="place-order-btn" style="width: 100%; margin-top: 1.5rem;">
            <i class="fa-solid fa-lock"></i> Place Order (${formatCurrency(totals.total)})
          </button>
        </div>
      </div>
    </div>
  `;

  // Handle Place Order Click
  document.getElementById('place-order-btn').onclick = () => {
    const orderId = 'NV-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      orderId,
      date: new Date().toISOString().split('T')[0],
      total: totals.total,
      status: 'Processing',
      itemsCount: totals.itemsCount,
      items: cartItems.map(i => ({ title: i.product.title, price: i.unitPrice, qty: i.qty, image: i.product.image }))
    };

    addOrderToHistory(newOrder);
    
    // Clear Cart
    import('./storage.js').then(st => st.saveCartState([]));
    updateCartUI();

    // Show Confirmation Modal
    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.innerHTML = `
        <div class="modal-content animate-scale-up" style="max-width: 520px; padding: 2.5rem; text-align: center;">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--color-success-bg); color: var(--color-success); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.25rem;">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Order Confirmed!</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">Thank you for your purchase. Your order tracking number is <strong style="color: var(--color-primary);">${orderId}</strong>.</p>

          <div style="background: var(--color-input-bg); padding: 1rem 1.25rem; border-radius: 14px; text-align: left; font-size: 0.875rem; margin-bottom: 1.75rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;"><span>Order ID:</span><strong>${orderId}</strong></div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;"><span>Total Paid:</span><strong>${formatCurrency(totals.total)}</strong></div>
            <div style="display: flex; justify-content: space-between;"><span>Estimated Delivery:</span><strong>2-3 Business Days</strong></div>
          </div>

          <div style="display: flex; gap: 1rem;">
            <a href="#profile" class="btn btn-outline" style="flex:1;" onclick="document.getElementById('modal-backdrop').classList.remove('active');">View Order</a>
            <a href="#shop" class="btn btn-primary" style="flex:1;" onclick="document.getElementById('modal-backdrop').classList.remove('active');">Continue Shopping</a>
          </div>
        </div>
      `;
      modalBackdrop.classList.add('active');
    }
  };
}

/* ==========================================================================
   7. WISHLIST VIEW RENDERER
   ========================================================================== */
function renderWishlistView(container) {
  container.innerHTML = `
    <div class="container section-padding" id="wishlist-page-content"></div>
  `;
  renderWishlistPage();
}

/* ==========================================================================
   8. USER PROFILE VIEW RENDERER
   ========================================================================== */
function renderProfileView(container) {
  const user = getUserProfile();
  const orders = getOrdersHistory();

  container.innerHTML = `
    <div class="container section-padding">
      <!-- User Banner Header -->
      <div style="background: var(--color-card); border: 1px solid var(--color-card-border); padding: 2rem; border-radius: 24px; display: flex; align-items: center; gap: 2rem; margin-bottom: 2.5rem;">
        <img src="${user.avatar}" style="width: 88px; height: 88px; border-radius: 50%; border: 3px solid var(--color-primary);" />
        <div>
          <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">${user.name}</h1>
          <p style="color: var(--color-text-muted); margin-bottom: 0.5rem;"><i class="fa-solid fa-envelope"></i> ${user.email} • <i class="fa-solid fa-phone"></i> ${user.phone}</p>
          <span class="badge badge-accent"><i class="fa-solid fa-crown"></i> VIP Member</span>
        </div>
      </div>

      <!-- Profile Tabs -->
      <div style="background: var(--color-card); border: 1px solid var(--color-card-border); padding: 2rem; border-radius: 24px;">
        <h3 style="font-size: 1.35rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-divider); padding-bottom: 1rem;">Order History</h3>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${orders.length === 0 ? `
            <p style="color: var(--color-text-muted);">You haven't placed any orders yet.</p>
          ` : orders.map(ord => `
            <div style="background: var(--color-input-bg); border: 1px solid var(--color-card-border); padding: 1.25rem; border-radius: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px dashed var(--color-card-border); padding-bottom: 0.75rem;">
                <div>
                  <span style="font-weight: 800; font-size: 1rem; color: var(--color-primary);">${ord.orderId}</span>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted); margin-left: 0.75rem;">${ord.date}</span>
                </div>
                <div>
                  <span class="badge badge-success">${ord.status}</span>
                  <span style="font-weight: 800; font-size: 1.1rem; margin-left: 1rem;">${formatCurrency(ord.total)}</span>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; overflow-x: auto;">
                ${ord.items.map(i => `
                  <div style="display: flex; align-items: center; gap: 0.75rem; background: var(--color-card); padding: 0.5rem 0.85rem; border-radius: 12px; border: 1px solid var(--color-card-border);">
                    <img src="${i.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px;" />
                    <div>
                      <div style="font-size: 0.8rem; font-weight: 600;">${i.title}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-muted);">Qty: ${i.qty} • ${formatCurrency(i.price)}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   9. PRODUCT COMPARE VIEW RENDERER
   ========================================================================== */
function toggleCompareProduct(productId) {
  let compare = getCompareState();
  const index = compare.indexOf(productId);
  if (index > -1) {
    compare.splice(index, 1);
  } else {
    if (compare.length >= 4) {
      showToast('Compare limit reached', 'You can compare up to 4 items simultaneously.', 'info');
      return;
    }
    compare.push(productId);
  }
  saveCompareState(compare);
  updateCompareBarUI();

  if (window.location.hash.startsWith('#compare')) {
    const mainView = document.getElementById('main-app-view');
    if (mainView) renderCompareView(mainView);
  }
}

function updateCompareBarUI() {
  const compareIds = getCompareState();
  const bar = document.getElementById('compare-floating-bar');
  if (!bar) return;

  if (compareIds.length === 0) {
    bar.classList.remove('active');
  } else {
    bar.classList.add('active');
    const slots = document.getElementById('compare-bar-slots');
    if (slots) {
      const items = PRODUCTS.filter(p => compareIds.includes(p.id));
      slots.innerHTML = items.map(i => `
        <div class="compare-thumb-slot">
          <img src="${i.image}" title="${i.title}" />
        </div>
      `).join('');
    }
  }
}

function renderCompareView(container) {
  const compareIds = getCompareState();
  const items = PRODUCTS.filter(p => compareIds.includes(p.id));

  container.innerHTML = `
    <div class="container section-padding">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1 style="font-size: 2.25rem;">Compare Products Matrix</h1>
        <button class="btn btn-outline btn-sm" id="clear-compare-btn"><i class="fa-solid fa-trash-can"></i> Clear Comparison</button>
      </div>

      ${items.length === 0 ? `
        <div style="text-align: center; padding: 5rem 1rem; background: var(--color-card); border-radius: 24px; border: 1px solid var(--color-card-border);">
          <i class="fa-solid fa-code-compare" style="font-size: 4rem; color: var(--color-text-subtle); margin-bottom: 1rem;"></i>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">No Products Selected for Comparison</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 2rem;">Click the compare icon on any product card to analyze specifications side-by-side.</p>
          <a href="#shop" class="btn btn-primary btn-lg">Explore Catalog</a>
        </div>
      ` : `
        <div style="overflow-x: auto; background: var(--color-card); border-radius: 24px; border: 1px solid var(--color-card-border); padding: 2rem;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--color-divider);">
                <th style="padding: 1rem; width: 200px;">Features</th>
                ${items.map(item => `
                  <th style="padding: 1rem; min-width: 220px; vertical-align: top;">
                    <img src="${item.image}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 16px; margin-bottom: 0.85rem;" />
                    <div style="font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">${item.title}</div>
                    <div style="font-size: 1.1rem; color: var(--color-primary); font-weight: 800; margin-bottom: 0.5rem;">${formatCurrency(item.price)}</div>
                    <button class="btn btn-primary btn-sm" onclick="window.cmpAddCart('${item.id}')" style="width:100%;">Add to Bag</button>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--color-divider);">
                <td style="padding: 1rem; font-weight: 700;">Category</td>
                ${items.map(i => `<td style="padding: 1rem;">${i.category}</td>`).join('')}
              </tr>
              <tr style="border-bottom: 1px solid var(--color-divider);">
                <td style="padding: 1rem; font-weight: 700;">Brand</td>
                ${items.map(i => `<td style="padding: 1rem;">${i.brand}</td>`).join('')}
              </tr>
              <tr style="border-bottom: 1px solid var(--color-divider);">
                <td style="padding: 1rem; font-weight: 700;">Rating</td>
                ${items.map(i => `<td style="padding: 1rem;">${i.rating} ★</td>`).join('')}
              </tr>
              <tr style="border-bottom: 1px solid var(--color-divider);">
                <td style="padding: 1rem; font-weight: 700;">Stock</td>
                ${items.map(i => `<td style="padding: 1rem;">${i.stock} units</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;

  document.getElementById('clear-compare-btn').onclick = () => {
    saveCompareState([]);
    updateCompareBarUI();
    renderCompareView(container);
  };

  window.cmpAddCart = (id) => addToCart(id, 1);
}

/* 404 View */
function render404View(container) {
  container.innerHTML = `
    <div class="container section-padding" style="text-align: center; padding: 6rem 1rem;">
      <h1 style="font-size: 6rem; color: var(--color-primary); font-weight: 900; line-height: 1;">404</h1>
      <h2 style="font-size: 2rem; margin-bottom: 1rem;">Page Not Found</h2>
      <p style="color: var(--color-text-muted); max-width: 480px; margin: 0 auto 2rem;">The luxury experience you are looking for might have moved or is temporarily unavailable.</p>
      <a href="#landing" class="btn btn-primary btn-lg">Return to Homepage</a>
    </div>
  `;
}

/* ==========================================================================
   10. AI ASSISTANT CHAT BOT & GLOBAL INITIALIZATION
   ========================================================================== */
function initAIAssistant() {
  const chatToggleBtn = document.getElementById('btn-chat-toggle');
  const chatWindow = document.getElementById('ai-chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  if (!chatToggleBtn || !chatWindow) return;

  chatToggleBtn.onclick = () => chatWindow.classList.toggle('active');
  if (chatCloseBtn) chatCloseBtn.onclick = () => chatWindow.classList.remove('active');

  const botResponses = [
    { keys: ['shipping', 'delivery', 'time'], reply: 'We offer free express worldwide shipping on orders over $150. Delivery usually takes 2-3 business days!' },
    { keys: ['coupon', 'discount', 'code', 'promo'], reply: 'You can use code "NOVA20" for $20 off, or "LUXURY15" for 15% off your entire order!' },
    { keys: ['return', 'refund', 'warranty'], reply: 'All Nova products come with a 30-day risk-free return guarantee and an official 2-year manufacturer warranty.' },
    { keys: ['track', 'order', 'status'], reply: 'You can view real-time tracking for your orders inside your User Profile under "Order History".' },
    { keys: ['headphone', 'audio', 'watch'], reply: 'Check out our Nova SoundMax ANC Headphones and Nova Chrono Pro Titanium Smartwatch — they are currently our #1 bestsellers!' }
  ];

  if (chatForm) {
    chatForm.onsubmit = (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      // User Bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble chat-bubble-user';
      userBubble.innerText = text;
      chatMessages.appendChild(userBubble);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Bot Response
      setTimeout(() => {
        let reply = "I am Nova's Concierge Assistant. How else can I assist your luxury shopping experience today?";
        const lower = text.toLowerCase();
        
        for (const item of botResponses) {
          if (item.keys.some(k => lower.includes(k))) {
            reply = item.reply;
            break;
          }
        }

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble chat-bubble-bot';
        botBubble.innerText = reply;
        chatMessages.appendChild(botBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 600);
    };
  }
}

// Search Suggestions Autocomplete
function initSearchAutocomplete() {
  const searchInput = document.getElementById('nav-search-input');
  const suggestionsBox = document.getElementById('search-suggestions');
  if (!searchInput || !suggestionsBox) return;

  searchInput.oninput = (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length < 2) {
      suggestionsBox.classList.remove('active');
      return;
    }

    const matches = PRODUCTS.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)).slice(0, 5);

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">No matching products found</div>`;
    } else {
      suggestionsBox.innerHTML = matches.map(p => `
        <div class="suggestion-item" onclick="window.location.hash='#product?id=${p.id}'; document.getElementById('search-suggestions').classList.remove('active');">
          <img src="${p.image}" class="suggestion-thumb" />
          <div class="suggestion-info">
            <div class="suggestion-title">${p.title}</div>
            <div class="suggestion-price">${formatCurrency(p.price)}</div>
          </div>
        </div>
      `).join('');
    }

    suggestionsBox.classList.add('active');
  };

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.remove('active');
    }
  });
}

// Theme Switcher Initializer
function initTheme() {
  const currentTheme = getThemeState();
  document.documentElement.setAttribute('data-theme', currentTheme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.onclick = () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      saveThemeState(nextTheme);
      themeBtn.querySelector('i').className = `fa-solid ${nextTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`;
    };
  }
}

// Back To Top Button
function initBackToTop() {
  const btn = document.getElementById('btn-back-top');
  if (!btn) return;

  window.onscroll = () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');

    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  };

  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global Event Delegation (Add to Cart, Quick View, Wishlist, Compare)
function initGlobalEvents() {
  document.addEventListener('click', (e) => {
    // Quick View
    const qvBtn = e.target.closest('.btn-quickview');
    if (qvBtn) {
      e.preventDefault();
      openQuickViewModal(qvBtn.dataset.id);
      return;
    }

    // Add to Cart
    const addCartBtn = e.target.closest('.btn-add-cart');
    if (addCartBtn) {
      e.preventDefault();
      addToCart(addCartBtn.dataset.id, 1);
      return;
    }

    // Wishlist Toggle
    const wishBtn = e.target.closest('.btn-wishlist');
    if (wishBtn) {
      e.preventDefault();
      toggleWishlist(wishBtn.dataset.id);
      return;
    }

    // Compare Toggle
    const cmpBtn = e.target.closest('.btn-compare');
    if (cmpBtn) {
      e.preventDefault();
      toggleCompareProduct(cmpBtn.dataset.id);
      return;
    }
  });

  // Custom Event for Quick View add to cart
  window.addEventListener('add-to-cart', (e) => {
    addToCart(e.detail.productId, e.detail.qty);
  });
}

// Application Startup
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBackToTop();
  initSearchAutocomplete();
  initAIAssistant();
  initGlobalEvents();

  // Hash Navigation Listener
  window.addEventListener('hashchange', routeHandler);
  
  // Initial Route Render
  routeHandler();
});
