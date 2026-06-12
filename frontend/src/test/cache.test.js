import { cache, MemoryCache } from '../util/cache';

describe('cache utility', () => {
  beforeEach(() => {
    cache.flush();
  });

  it('sets and gets a value', () => {
    cache.set('key1', { data: 'hello' });
    expect(cache.get('key1')).toEqual({ data: 'hello' });
  });

  it('returns null for missing key', () => {
    expect(cache.get('nonexistent')).toBeNull();
  });

  it('returns null for expired entry', async () => {
    cache.set('expires', 'value', 0);
    // Wait briefly for expiration
    await new Promise(r => setTimeout(r, 10));
    expect(cache.get('expires')).toBeNull();
  });

  it('deletes a key', () => {
    cache.set('todelete', 'value');
    cache.del('todelete');
    expect(cache.get('todelete')).toBeNull();
  });

  it('flushes all keys', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.flush();
    expect(cache.get('a')).toBeNull();
    expect(cache.get('b')).toBeNull();
  });

  it('generates cache keys with prefix', () => {
    expect(MemoryCache.key('courses', 'all')).toBe('courses:all');
    expect(MemoryCache.key('problems', '123', 'user')).toBe('problems:123:user');
    expect(MemoryCache.key('test')).toBe('test:');
  });

  it('respects custom TTL via set', () => {
    const ttl = 60;
    const start = Date.now();
    cache.set('ttlTest', 'val', ttl);
    const entry = cache.store.get('ttlTest');
    expect(entry.expiresAt - start).toBeGreaterThanOrEqual(ttl * 1000 - 5);
  });
});
