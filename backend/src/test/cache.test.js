import { describe, it, expect, vi } from 'vitest';

describe('Backend Cache', () => {
  let cache;

  beforeAll(async () => {
    const mod = await import('../../util/cache.js');
    cache = mod.cache;
  });

  beforeEach(() => {
    cache.flush();
  });

  it('sets and gets a value', () => {
    cache.set('test', 'value');
    expect(cache.get('test')).toBe('value');
  });

  it('returns null for missing key', () => {
    expect(cache.get('nonexistent')).toBeNull();
  });

  it('deletes a key', () => {
    cache.set('todelete', 'val');
    cache.del('todelete');
    expect(cache.get('todelete')).toBeNull();
  });

  it('flushes all entries', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.flush();
    expect(cache.get('a')).toBeNull();
    expect(cache.get('b')).toBeNull();
  });
});
