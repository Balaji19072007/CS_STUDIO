// backend/util/cache.js
// Simple in-memory cache for the CS Studio backend
// In production, replace with Redis

class MemoryCache {
  constructor() {
    this.store = new Map();
    this.defaultTTL = 300; // 5 minutes default
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

  // Generate a cache key from request params
  static key(prefix, ...params) {
    return `${prefix}:${params.filter(Boolean).join(':')}`;
  }
}

const cache = new MemoryCache();

module.exports = { cache, MemoryCache };
