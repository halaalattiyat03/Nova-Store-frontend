/* ==========================================================================
   NOVA STORE - UI ENGINE & UTILITIES
   ========================================================================== */

import { PRODUCTS } from './products.js';
import { getWishlistState, getCompareState } from './storage.js';

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Generate Star Rating HTML
export function renderRatingStars(rating, reviewsCount = 0) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHtml = '';

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fa-solid fa-star"></i>';
  }
  if (hasHalfStar) {
    starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="fa-regular fa-star"></i>';
  }

  return `
    <div class="stars-wrap">
      ${starsHtml}
    </div>
    <span class="rating-count">(${rating.toFixed(1)}${reviewsCount > 0 ? ` • ${reviewsCount} reviews` : ''})</span>
  `;
}

// Toast Notification System
export function showToast(title, message = '', type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${icons[type] || icons.info}"></i>
    </div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Render Product Card
export function renderProductCard(product, viewMode = 'grid') {
  const wishlist = getWishlistState();
  const compare = getCompareState();
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compare.includes(product.id);

  const finalPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return `
    <div class="product-card card-hover-lift ${viewMode === 'list' ? 'list-view' : ''}" data-id="${product.id}">
      <div class="product-thumb-wrap">
        <img src="${product.image}" alt="${product.title}" class="product-thumb" loading="lazy" />
        
        <div class="product-badges">
          ${product.discount > 0 ? `<span class="badge badge-danger">-${product.discount}%</span>` : ''}
          ${product.badge ? `<span class="badge badge-primary">${product.badge}</span>` : ''}
        </div>

        <div class="product-card-actions">
          <button class="action-btn-circle btn-wishlist ${isWishlisted ? 'active' : ''}" data-id="${product.id}" title="Wishlist">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <button class="action-btn-circle btn-quickview" data-id="${product.id}" title="Quick View">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="action-btn-circle btn-compare ${isCompared ? 'active' : ''}" data-id="${product.id}" title="Compare">
            <i class="fa-solid fa-code-compare"></i>
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-category">${product.category} • ${product.brand}</div>
        <a href="#product?id=${product.id}" class="product-title" title="${product.title}">${product.title}</a>
        
        <div class="product-rating">
          ${renderRatingStars(product.rating, product.reviewsCount)}
        </div>

        <div class="product-price-row">
          <div class="price-group">
            <span class="price-current">${formatCurrency(finalPrice)}</span>
            ${product.discount > 0 ? `<span class="price-original">${formatCurrency(product.price)}</span>` : ''}
          </div>

          <button class="btn btn-primary btn-sm btn-add-cart" data-id="${product.id}">
            <i class="fa-solid fa-bag-shopping"></i> Add
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render Skeleton Card
export function renderSkeletonCard() {
  return `
    <div class="product-card">
      <div class="product-thumb-wrap skeleton"></div>
      <div class="product-info">
        <div class="skeleton" style="height: 14px; width: 40%; margin-bottom: 8px;"></div>
        <div class="skeleton" style="height: 20px; width: 85%; margin-bottom: 12px;"></div>
        <div class="skeleton" style="height: 16px; width: 50%; margin-bottom: 16px;"></div>
        <div class="skeleton" style="height: 36px; width: 100%;"></div>
      </div>
    </div>
  `;
}

// Quick View Modal
export function openQuickViewModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalBackdrop = document.getElementById('modal-backdrop');
  if (!modalBackdrop) return;

  const finalPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  modalBackdrop.innerHTML = `
    <div class="modal-content animate-scale-up" style="max-width: 900px; padding: 2.5rem;">
      <button class="modal-close-btn" id="modal-close"><i class="fa-solid fa-xmark"></i></button>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: center;">
        <div>
          <div style="aspect-ratio: 1/1; border-radius: 16px; overflow: hidden; background: #f8fafc; border: 1px solid var(--color-card-border);">
            <img src="${product.image}" id="quickview-main-img" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          ${product.gallery && product.gallery.length > 1 ? `
            <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
              ${product.gallery.map(img => `
                <img src="${img}" class="qv-thumb" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid transparent;" onclick="document.getElementById('quickview-main-img').src='${img}'" />
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div>
          <span class="badge badge-primary" style="margin-bottom: 0.5rem;">${product.brand}</span>
          <h2 style="font-size: 1.65rem; margin-bottom: 0.75rem; color: var(--color-text);">${product.title}</h2>
          
          <div style="margin-bottom: 1rem;">
            ${renderRatingStars(product.rating, product.reviewsCount)}
          </div>

          <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.25rem;">
            <span style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary);">${formatCurrency(finalPrice)}</span>
            ${product.discount > 0 ? `<span style="font-size: 1.1rem; color: var(--color-text-subtle); text-decoration: line-through;">${formatCurrency(product.price)}</span>` : ''}
          </div>

          <p style="font-size: 0.95rem; color: var(--color-text-muted); margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>

          <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: center;">
            <div class="cart-item-qty" style="background: var(--color-input-bg); padding: 0.5rem 0.85rem; border-radius: 12px;">
              <button class="qty-btn" id="qv-qty-minus">-</button>
              <span id="qv-qty-val" style="font-weight: 700; padding: 0 0.85rem;">1</span>
              <button class="qty-btn" id="qv-qty-plus">+</button>
            </div>

            <button class="btn btn-primary btn-lg" id="qv-add-cart" data-id="${product.id}" style="flex: 1;">
              <i class="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
          </div>

          <div style="font-size: 0.85rem; color: var(--color-text-muted); display: flex; gap: 1.5rem;">
            <span><i class="fa-solid fa-truck" style="color: var(--color-primary);"></i> Free Express Shipping</span>
            <span><i class="fa-solid fa-shield-halved" style="color: var(--color-success);"></i> 2-Year Warranty</span>
          </div>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');

  // Event handlers
  document.getElementById('modal-close').onclick = () => modalBackdrop.classList.remove('active');
  modalBackdrop.onclick = (e) => {
    if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
  };

  let qty = 1;
  const qtyVal = document.getElementById('qv-qty-val');
  document.getElementById('qv-qty-minus').onclick = () => { if (qty > 1) { qty--; qtyVal.innerText = qty; } };
  document.getElementById('qv-qty-plus').onclick = () => { qty++; qtyVal.innerText = qty; };

  document.getElementById('qv-add-cart').onclick = () => {
    window.dispatchEvent(new CustomEvent('add-to-cart', { detail: { productId: product.id, qty } }));
    modalBackdrop.classList.remove('active');
  };
}
