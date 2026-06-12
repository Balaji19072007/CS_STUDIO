// Load testing script for CS Studio backend
// Usage: node load-test.js [baseUrl] [concurrency]
// Default: node load-test.js http://localhost:5000 100

const http = require('http');

const TARGET = process.argv[2] || 'http://localhost:5000';
const CONCURRENCY = parseInt(process.argv[3], 10) || 100;
const REQUESTS_PER_USER = 5;
const TIMEOUT = 30000;

const { hostname, port, pathname } = new URL(TARGET);
const BASE_PATH = pathname.replace(/\/$/, '');

const ENDPOINTS = [
  { method: 'GET', path: '/api/health', weight: 3 },
  { method: 'GET', path: '/api/courses', weight: 3 },
  { method: 'GET', path: '/api/problems', weight: 2 },
  { method: 'GET', path: '/api/leaderboard', weight: 2 },
  { method: 'GET', path: '/api/stats/user-stats', weight: 1 },
  { method: 'GET', path: '/api/community', weight: 1 },
];

function pickEndpoint() {
  const totalWeight = ENDPOINTS.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * totalWeight;
  for (const ep of ENDPOINTS) {
    r -= ep.weight;
    if (r <= 0) return ep;
  }
  return ENDPOINTS[0];
}

function makeRequest(endpoint) {
  return new Promise((resolve) => {
    const url = new URL(`${BASE_PATH}${endpoint.path}`, TARGET);
    const start = Date.now();
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method: endpoint.method,
        timeout: TIMEOUT,
        headers: { 'User-Agent': 'CSStudio-LoadTest/1.0' },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            duration: Date.now() - start,
            size: body.length,
            endpoint: endpoint.path,
          });
        });
      }
    );
    req.on('error', () =>
      resolve({ status: 0, duration: Date.now() - start, size: 0, endpoint: endpoint.path, error: true })
    );
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, duration: TIMEOUT, size: 0, endpoint: endpoint.path, error: true, timeout: true });
    });
    req.end();
  });
}

async function simulateUser(userId) {
  const results = [];
  for (let i = 0; i < REQUESTS_PER_USER; i++) {
    const endpoint = pickEndpoint();
    results.push(await makeRequest(endpoint));
    if (i < REQUESTS_PER_USER - 1) {
      await new Promise((r) => setTimeout(r, 50 + Math.random() * 200));
    }
  }
  return results;
}

async function runLoadTest() {
  console.log(`\n========================================`);
  console.log(`  CS Studio Load Test`);
  console.log(`========================================`);
  console.log(`  Target:     ${TARGET}`);
  console.log(`  Concurrency: ${CONCURRENCY} users`);
  console.log(`  Requests:   ${CONCURRENCY * REQUESTS_PER_USER} total`);
  console.log(`========================================\n`);

  const startTime = Date.now();
  const promises = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    promises.push(simulateUser(i));
    if (i < CONCURRENCY - 1) {
      await new Promise((r) => setTimeout(r, 10));
    }
  }

  const allResults = await Promise.all(promises);
  const flat = allResults.flat();
  const elapsed = Date.now() - startTime;

  const durations = flat.filter((r) => !r.error).map((r) => r.duration);
  const errors = flat.filter((r) => r.error);
  const timeouts = flat.filter((r) => r.timeout);
  const statusCounts = {};
  const endpointStats = {};

  for (const r of flat) {
    const key = `HTTP ${r.status}`;
    statusCounts[key] = (statusCounts[key] || 0) + 1;
    if (!endpointStats[r.endpoint]) {
      endpointStats[r.endpoint] = { count: 0, durations: [] };
    }
    endpointStats[r.endpoint].count++;
    if (!r.error) endpointStats[r.endpoint].durations.push(r.duration);
  }

  const sorted = [...durations].sort((a, b) => a - b);
  const total = flat.length;
  const successCount = durations.length;
  const throughput = Math.round((total / elapsed) * 1000);

  console.log(`  Duration:   ${(elapsed / 1000).toFixed(1)}s`);
  console.log(`  Requests:   ${total}`);
  console.log(`  Successful: ${successCount}`);
  console.log(`  Errors:     ${errors.length}`);
  console.log(`  Timeouts:   ${timeouts.length}`);
  console.log(`  Throughput: ${throughput} req/s`);
  console.log(`  Requests/s: ${Math.round(total / (elapsed / 1000))} req/s`);
  console.log(``);
  console.log(`  --- Latency (ms) ---`);
  console.log(`  Min:    ${sorted[0] || 0} ms`);
  console.log(`  P50:    ${percentile(sorted, 50)} ms`);
  console.log(`  P75:    ${percentile(sorted, 75)} ms`);
  console.log(`  P90:    ${percentile(sorted, 90)} ms`);
  console.log(`  P95:    ${percentile(sorted, 95)} ms`);
  console.log(`  P99:    ${percentile(sorted, 99)} ms`);
  console.log(`  Max:    ${sorted[sorted.length - 1] || 0} ms`);
  console.log(``);
  console.log(`  --- Status Codes ---`);
  for (const [code, count] of Object.entries(statusCounts).sort()) {
    console.log(`  ${code}: ${count} (${((count / total) * 100).toFixed(1)}%)`);
  }
  console.log(``);
  console.log(`  --- Per Endpoint ---`);
  for (const [ep, stats] of Object.entries(endpointStats)) {
    const eSorted = [...stats.durations].sort((a, b) => a - b);
    console.log(`  ${ep}:`);
    console.log(`    Requests: ${stats.count}`);
    if (eSorted.length > 0) {
      console.log(`    P50: ${percentile(eSorted, 50)} ms | P95: ${percentile(eSorted, 95)} ms | P99: ${percentile(eSorted, 99)} ms`);
    }
  }
  console.log(`\n========================================\n`);

  if (errors.length > 0) {
    console.log(`  NOTE: ${errors.length} requests failed.`);
    console.log(`  Common causes: server not running, network issues, rate limiting.`);
    console.log(`  Target: ${TARGET}\n`);
  }
}

function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)] || 0;
}

runLoadTest().catch(console.error);
