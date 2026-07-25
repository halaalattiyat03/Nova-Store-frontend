/* ==========================================================================
   NOVA STORE - CART MANAGEMENT SYSTEM
   ========================================================================== */

import { PRODUCTS } from './products.js';
import { getCartState, saveCartState } from './storage.js';
import { formatCurrency, showToast } from './ui.js';

let activeCoupon = null;

// Get Cart Items with Full Product Details
export function getCartWithDetails() {
  const cart = getCartState();
  return cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return null;

    const unitPrice = product.discount > 0 
      ? product.price * (1 - product.discount / 100) 
      : product.price;

    return {
      ...item,
      product,
      unitPrice,
      totalPrice: unitPrice * item.qty
    };
  }).filter(Boolean);
}

// Calculate Summary Totals
export function getCartTotals() {
  const cartItems = getCartWithDetails();
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Free shipping threshold: $150
  const freeShippingThreshold = 150;
  let shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15.00;
  if (activeCoupon?.code === 'FREESHIP') shipping = 0;

  let discount = 0;
  if (activeCoupon) {
    if (activeCoupon.type === 'fixed') discount = activeCoupon.value;
    else if (activeCoupon.type === 'percent') discount = subtotal * (activeCoupon.value / 100);
  }

  const tax = (subtotal - discount) > 0 ? (subtotal - discount) * 0.08 : 0; // 8% tax
  const total = Math.max(0, subtotal - discount + shipping + tax);

  return {
    subtotal,
    shipping,
    discount,
    tax,
    total,
    itemsCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
    freeShippingThreshold,
    freeShippingProgress: Math.min(100, (subtotal / freeShippingThreshold) * 100)
  };
}

// Add Item
export function addToCart(productId, qty = 1) {
  const cart = getCartState();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }

  saveCartState(cart);
  updateCartUI();

  const product = PRODUCTS.find(p => p.id === productId);
  showToast('Added to Shopping Bag', `${product?.title || 'Item'} (${qty}x)`, 'success');
}

// Update Quantity
export function updateCartQuantity(productId, newQty) {
  let cart = getCartState();
  if (newQty <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(i => i.id === productId);
    if (item) item.qty = newQty;
  }

  saveCartState(cart);
  updateCartUI();
}

// Remove Item
export function removeFromCart(productId) {
  let cart = getCartState();
  cart = cart.filter(item => item.id !== productId);
  saveCartState(cart);
  updateCartUI();
  showToast('Removed from Bag', '', 'info');
}

// Apply Coupon Code
export function applyCoupon(code) {
  const cleanCode = code.trim().toUpperCase();
  if (cleanCode === 'NOVA20') {
    activeCoupon = { code: 'NOVA20', type: 'fixed', value: 20 };
    showToast('Coupon Applied!', '$20 discount applied to order.', 'success');
  } else if (cleanCode === 'LUXURY15') {
    activeCoupon = { code: 'LUXURY15', type: 'percent', value: 15 };
    showToast('Coupon Applied!', '15% off applied to order.', 'success');
  } else if (cleanCode === 'FREESHIP') {
    activeCoupon = { code: 'FREESHIP', type: 'shipping', value: 0 };
    showToast('Coupon Applied!', 'Free Express Shipping unlocked.', 'success');
  } else {
    showToast('Invalid Coupon Code', 'Try NOVA20, LUXURY15, or FREESHIP', 'error');
    return false;
  }
  updateCartUI();
  return true;
}

// Update All Cart UIs (Navbar Counter, Slide Drawer, Cart Page view if active)
export function updateCartUI() {
  const totals = getCartTotals();
  const cartItems = getCartWithDetails();

  // 1. Update Navbar Badges
  const badges = document.querySelectorAll('.cart-badge-count');
  badges.forEach(b => {
    b.innerText = totals.itemsCount;
    b.style.display = totals.itemsCount > 0 ? 'flex' : 'none';
  });

  // 2. Render Cart Slide Drawer
  const drawerContainer = document.getElementById('cart-drawer-items-list');
  if (drawerContainer) {
    if (cartItems.length === 0) {
      drawerContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <i class="fa-solid fa-bag-shopping" style="font-size: 3.5rem; color: var(--color-text-subtle); margin-bottom: 1rem;"></i>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--color-text);">Your Shopping Bag is empty</h4>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">Discover our luxury collection and start shopping.</p>
          <a href="#shop" class="btn btn-primary btn-sm" onclick="document.getElementById('cart-drawer-overlay').classList.remove('active'); document.getElementById('cart-drawer').classList.remove('active');">
            Explore Collection
          </a>
        </div>
      `;
    } else {
      drawerContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
          <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-thumb" />
          <div class="cart-item-details">
            <h5 class="cart-item-title">${item.product.title}</h5>
            <div class="cart-item-price">${formatCurrency(item.unitPrice)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn cart-qty-minus" data-id="${item.id}">-</button>
              <span style="font-weight: 700; font-size: 0.85rem; padding: 0 0.4rem;">${item.qty}</span>
              <button class="qty-btn cart-qty-plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}" title="Remove Item"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      `).join('');

      // Add Quantity Event Listeners in Drawer
      drawerContainer.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.onclick = () => updateCartQuantity(btn.dataset.id, cartItems.find(i => i.id === btn.dataset.id).qty - 1);
      });
      drawerContainer.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.onclick = () => updateCartQuantity(btn.dataset.id, cartItems.find(i => i.id === btn.dataset.id).qty + 1);
      });
      drawerContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.onclick = () => removeFromCart(btn.dataset.id);
      });
    }
  }

  // 3. Update Summary Rows in Drawer
  const drawerSubtotal = document.getElementById('drawer-subtotal');
  const drawerTotal = document.getElementById('drawer-total');
  if (drawerSubtotal) drawerSubtotal.innerText = formatCurrency(totals.subtotal);
  if (drawerTotal) drawerTotal.innerText = formatCurrency(totals.total);

  // 4. Update Cart Page View if rendered
  if (window.location.hash.startsWith('#cart')) {
    const pageContainer = document.getElementById('cart-page-items');
    if (pageContainer) renderCartPageView(cartItems, totals);
  }
}

// Render Dedicated Cart Page View
function renderCartPageView(cartItems, totals) {
  const container = document.getElementById('cart-page-content');
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 5rem 1rem; background: var(--color-card); border-radius: 24px; border: 1px solid var(--color-card-border);">
        <i class="fa-solid fa-cart-flatbed" style="font-size: 4rem; color: var(--color-text-subtle); margin-bottom: 1rem;"></i>
        <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--color-text);">Your Bag is Empty</h2>
        <p style="color: var(--color-text-muted); max-width: 480px; margin: 0 auto 2rem;">Looks like you haven't added anything to your cart yet. Explore our luxury items and find something special.</p>
        <a href="#shop" class="btn btn-primary btn-lg">Browse Shop</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;" class="checkout-grid">
      <!-- Items List -->
      <div style="background: var(--color-card); padding: 2rem; border-radius: 24px; border: 1px solid var(--color-card-border);">
        <h3 style="font-size: 1.35rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-divider); padding-bottom: 1rem;">
          Shopping Bag (${totals.itemsCount} items)
        </h3>

        <!-- Free Shipping Progress Bar -->
        <div style="margin-bottom: 2rem; background: var(--color-input-bg); padding: 1.25rem; border-radius: 16px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">
            <span>${totals.subtotal >= totals.freeShippingThreshold ? '<i class="fa-solid fa-circle-check" style="color: var(--color-success);"></i> You qualify for Free Shipping!' : `Add ${formatCurrency(totals.freeShippingThreshold - totals.subtotal)} more for FREE Express Shipping`}</span>
            <span>${Math.round(totals.freeShippingProgress)}%</span>
          </div>
          <div style="height: 8px; background: var(--color-divider); border-radius: 99px; overflow: hidden;">
            <div style="height: 100%; width: ${totals.freeShippingProgress}%; background: linear-gradient(90deg, var(--color-primary), #10B981); transition: width 0.4s ease;"></div>
          </div>
        </div>

        <div id="cart-page-items" style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${cartItems.map(item => `
            <div style="display: flex; gap: 1.5rem; align-items: center; border-bottom: 1px solid var(--color-divider); padding-bottom: 1.25rem;">
              <img src="${item.product.image}" style="width: 90px; height: 90px; object-fit: cover; border-radius: 16px; background: var(--color-bg);" />
              <div style="flex: 1;">
                <span class="badge badge-primary" style="margin-bottom: 0.35rem;">${item.product.category}</span>
                <h4 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-text);"><a href="#product?id=${item.product.id}">${item.product.title}</a></h4>
                <div style="font-size: 0.9rem; color: var(--color-text-muted);">Unit Price: ${formatCurrency(item.unitPrice)}</div>
              </div>

              <div class="cart-item-qty" style="background: var(--color-input-bg); padding: 0.5rem 0.85rem; border-radius: 12px;">
                <button class="qty-btn page-qty-minus" data-id="${item.id}">-</button>
                <span style="font-weight: 700; padding: 0 0.85rem;">${item.qty}</span>
                <button class="qty-btn page-qty-plus" data-id="${item.id}">+</button>
              </div>

              <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary); width: 110px; text-align: right;">
                ${formatCurrency(item.totalPrice)}
              </div>

              <button class="cart-item-remove page-item-remove" data-id="${item.id}" style="padding: 0.5rem; font-size: 1.1rem;"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Order Summary Card -->
      <div style="background: var(--color-card); padding: 2rem; border-radius: 24px; border: 1px solid var(--color-card-border); height: fit-content;">
        <h3 style="font-size: 1.35rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-divider); padding-bottom: 1rem;">
          Order Summary
        </h3>

        <!-- Coupon Input Box -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
          <input type="text" id="cart-coupon-input" placeholder="Promo code (e.g. NOVA20)" style="flex: 1; padding: 0.65rem 1rem; border: 1.5px solid var(--color-card-border); border-radius: 12px; font-size: 0.9rem;" />
          <button class="btn btn-secondary btn-sm" id="cart-apply-coupon-btn">Apply</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.95rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
            <span>Subtotal</span>
            <span style="font-weight: 600; color: var(--color-text);">${formatCurrency(totals.subtotal)}</span>
          </div>
          
          ${totals.discount > 0 ? `
            <div style="display: flex; justify-content: space-between; color: var(--color-success);">
              <span>Discount</span>
              <span style="font-weight: 700;">-${formatCurrency(totals.discount)}</span>
            </div>
          ` : ''}

          <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
            <span>Estimated Shipping</span>
            <span style="font-weight: 600; color: var(--color-text);">${totals.shipping === 0 ? '<span style="color: var(--color-success); font-weight:700;">FREE</span>' : formatCurrency(totals.shipping)}</span>
          </div>

          <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
            <span>Estimated Tax (8%)</span>
            <span style="font-weight: 600; color: var(--color-text);">${formatCurrency(totals.tax)}</span>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: 800; color: var(--color-text); border-top: 1px solid var(--color-divider); padding-top: 1rem; margin-top: 0.5rem;">
            <span>Total</span>
            <span style="color: var(--color-primary);">${formatCurrency(totals.total)}</span>
          </div>
        </div>

        <a href="#checkout" class="btn btn-primary btn-lg" style="width: 100%; text-align: center;">
          Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;

  // Bind Events for Cart Page
  document.querySelectorAll('.page-qty-minus').forEach(btn => {
    btn.onclick = () => updateCartQuantity(btn.dataset.id, cartItems.find(i => i.id === btn.dataset.id).qty - 1);
  });
  document.querySelectorAll('.page-qty-plus').forEach(btn => {
    btn.onclick = () => updateCartQuantity(btn.dataset.id, cartItems.find(i => i.id === btn.dataset.id).qty + 1);
  });
  document.querySelectorAll('.page-item-remove').forEach(btn => {
    btn.onclick = () => removeFromCart(btn.dataset.id);
  });
  document.getElementById('cart-apply-coupon-btn').onclick = () => {
    const input = document.getElementById('cart-coupon-input');
    if (input && input.value) applyCoupon(input.value);
  };
}
