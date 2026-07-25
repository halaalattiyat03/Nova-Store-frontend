/* ==========================================================================
   NOVA STORE - LOCAL STORAGE STATE MANAGEMENT
   ========================================================================== */

const STORAGE_KEYS = {
  CART: 'nova_cart_v1',
  WISHLIST: 'nova_wishlist_v1',
  COMPARE: 'nova_compare_v1',
  THEME: 'nova_theme_v1',
  USER: 'nova_user_v1',
  RECENTLY_VIEWED: 'nova_recent_v1',
  ORDERS: 'nova_orders_v1',
  COUPON: 'nova_active_coupon_v1'
};

// Safe Getter
export function getStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

// Safe Setter
export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

/* --- Cart State Helpers --- */
export function getCartState() {
  return getStorage(STORAGE_KEYS.CART, []);
}

export function saveCartState(cartItems) {
  setStorage(STORAGE_KEYS.CART, cartItems);
}

/* --- Wishlist State Helpers --- */
export function getWishlistState() {
  return getStorage(STORAGE_KEYS.WISHLIST, []);
}

export function saveWishlistState(wishlistIds) {
  setStorage(STORAGE_KEYS.WISHLIST, wishlistIds);
}

/* --- Compare State Helpers --- */
export function getCompareState() {
  return getStorage(STORAGE_KEYS.COMPARE, []);
}

export function saveCompareState(compareIds) {
  setStorage(STORAGE_KEYS.COMPARE, compareIds);
}

/* --- Theme Helpers --- */
export function getThemeState() {
  return getStorage(STORAGE_KEYS.THEME, 'light');
}

export function saveThemeState(theme) {
  setStorage(STORAGE_KEYS.THEME, theme);
}

/* --- Recently Viewed Products --- */
export function getRecentlyViewed() {
  return getStorage(STORAGE_KEYS.RECENTLY_VIEWED, []);
}

export function addRecentlyViewed(productId) {
  let list = getRecentlyViewed();
  list = list.filter(id => id !== productId);
  list.unshift(productId);
  if (list.length > 8) list.pop(); // Keep last 8 items
  setStorage(STORAGE_KEYS.RECENTLY_VIEWED, list);
}

/* --- User Profile Data --- */
export function getUserProfile() {
  return getStorage(STORAGE_KEYS.USER, {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://i.pravatar.cc/150?img=68",
    addresses: [
      { id: "addr-1", title: "Home", street: "742 Evergreen Terrace", city: "Springfield", state: "IL", zip: "62701", country: "United States", isDefault: true }
    ],
    cards: [
      { id: "card-1", brand: "Visa", last4: "4242", expiry: "12/28", holder: "ALEX MORGAN", isDefault: true }
    ]
  });
}

export function saveUserProfile(user) {
  setStorage(STORAGE_KEYS.USER, user);
}

/* --- Orders History --- */
export function getOrdersHistory() {
  return getStorage(STORAGE_KEYS.ORDERS, [
    {
      orderId: "NV-90821",
      date: "2026-07-14",
      total: 349.99,
      status: "Delivered",
      itemsCount: 1,
      items: [{ title: "Nova SoundMax Wireless ANC Headphones", price: 349.99, qty: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" }]
    }
  ]);
}

export function addOrderToHistory(order) {
  const orders = getOrdersHistory();
  orders.unshift(order);
  setStorage(STORAGE_KEYS.ORDERS, orders);
}

export { STORAGE_KEYS };
