/* ==========================================================================
   NOVA STORE - WISHLIST MANAGEMENT SYSTEM
   ========================================================================== */

import { PRODUCTS } from './products.js';
import { getWishlistState, saveWishlistState } from './storage.js';
import { renderProductCard, showToast } from './ui.js';
import { addToCart } from './cart.js';

export function toggleWishlist(productId) {
  let wishlist = getWishlistState();
  const index = wishlist.indexOf(productId);
  let isAdded = false;

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
    isAdded = true;
  }

  saveWishlistState(wishlist);
  updateWishlistUI();

  const product = PRODUCTS.find(p => p.id === productId);
  if (isAdded) {
    showToast('Saved to Wishlist', product?.title || '', 'success');
  } else {
    showToast('Removed from Wishlist', '', 'info');
  }

  return isAdded;
}

export function updateWishlistUI() {
  const wishlist = getWishlistState();

  // 1. Update Badge Counters
  const badges = document.querySelectorAll('.wishlist-badge-count');
  badges.forEach(b => {
    b.innerText = wishlist.length;
    b.style.display = wishlist.length > 0 ? 'flex' : 'none';
  });

  // 2. Update Heart Icons on existing Product Cards
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const id = btn.dataset.id;
    const isWishlisted = wishlist.includes(id);
    btn.classList.toggle('active', isWishlisted);
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = `${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`;
    }
  });

  // 3. Render Wishlist View Page if active
  if (window.location.hash.startsWith('#wishlist')) {
    renderWishlistPage();
  }
}

export function renderWishlistPage() {
  const container = document.getElementById('wishlist-page-content');
  if (!container) return;

  const wishlistIds = getWishlistState();
  const items = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  if (items.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 5rem 1rem; background: var(--color-card); border-radius: 24px; border: 1px solid var(--color-card-border);">
        <i class="fa-regular fa-heart" style="font-size: 4rem; color: var(--color-text-subtle); margin-bottom: 1rem;"></i>
        <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--color-text);">Your Wishlist is Empty</h2>
        <p style="color: var(--color-text-muted); max-width: 480px; margin: 0 auto 2rem;">Save items you love to review later or move to your shopping bag with one tap.</p>
        <a href="#shop" class="btn btn-primary btn-lg">Explore Shop</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2 style="font-size: 1.75rem;">My Saved Favorites (${items.length})</h2>
        <button class="btn btn-outline btn-sm" id="move-all-wishlist-btn">
          <i class="fa-solid fa-bag-shopping"></i> Move All to Bag
        </button>
      </div>

      <div class="products-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">
        ${items.map(p => renderProductCard(p)).join('')}
      </div>
    </div>
  `;

  document.getElementById('move-all-wishlist-btn').onclick = () => {
    items.forEach(item => addToCart(item.id, 1));
    saveWishlistState([]);
    updateWishlistUI();
    showToast('Moved All Items to Bag', `${items.length} items transferred`, 'success');
  };
}
