// frontend/src/util/cache.js
// Simple in-memory cache for the frontend

class MemoryCache {
  constructor() {
    this.store = new Map();
    this.defaultTTL = 300;
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  set(key, value, ttlSeconds = this.defaultTTL) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  del(key) {
    this.store.delete(key);
  }

  flush() {
    this.store.clear();
  }

  static key(prefix, ...params) {
    return `${prefix}:${params.filter(Boolean).join(':')}`;
  }
}

export const cache = new MemoryCache();
export { MemoryCache };
