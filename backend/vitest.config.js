import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.js', 'src/**/*.spec.js'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'controllers/**',
        'routes/**',
        'util/**',
        'middleware/**',
        'config/**',
        'src/**',
      ],
      exclude: ['src/scripts/**', 'src/test/**', '**/temp*/**', '**/node_modules/**'],
      thresholds: {
        branches: 0,
        functions: 1,
        lines: 1,
        statements: 1,
      },
    },
    testTimeout: 15000,
  },
});
