// Backend logger tests
import { describe, it, expect, vi } from 'vitest';

describe('Backend Logger', () => {
  let logger;

  beforeAll(async () => {
    logger = await import('../../util/logger.js');
  });

  it('has error, warn, info, debug methods', () => {
    expect(typeof logger.default.error).toBe('function');
    expect(typeof logger.default.warn).toBe('function');
    expect(typeof logger.default.info).toBe('function');
    expect(typeof logger.default.debug).toBe('function');
  });

  it('error logs to console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.default.error('backend error', { service: 'auth' });
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toContain('[ERROR]');
    expect(spy.mock.calls[0][0]).toContain('backend error');
    spy.mockRestore();
  });
});
