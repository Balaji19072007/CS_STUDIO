import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('logger utility', () => {
  let logger;

  beforeAll(async () => {
    const mod = await import('../util/logger');
    logger = mod.default;
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('has error, warn, info, debug methods', () => {
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });

  it('error logs to console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('test error', { code: 500 });
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toContain('[ERROR]');
    expect(spy.mock.calls[0][0]).toContain('test error');
  });

  it('info logs to console.log', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('test info');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toContain('[INFO]');
    expect(spy.mock.calls[0][0]).toContain('test info');
  });

  it('warn logs to console.warn', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('test warning');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toContain('[WARN]');
    expect(spy.mock.calls[0][0]).toContain('test warning');
  });

  it('includes meta in log output', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('with meta', { userId: '123', action: 'login' });
    const output = spy.mock.calls[0][0];
    expect(output).toContain('userId');
    expect(output).toContain('123');
    expect(output).toContain('action');
    expect(output).toContain('login');
  });
});
