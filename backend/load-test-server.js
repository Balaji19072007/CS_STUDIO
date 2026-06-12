// Lightweight mock server for load testing
// Mirrors key endpoints with realistic response sizes and delays
const http = require('http');
const zlib = require('zlib');

const MOCK_COURSES = JSON.stringify({
  success: true,
  courses: [
    { id: 'c-programming', title: 'C Programming', description: 'Master C programming', modules_count: 8, topics_count: 120 },
    { id: 'java-programming', title: 'Java Programming', description: 'Master Java programming', modules_count: 10, topics_count: 150 },
  ],
});

const MOCK_PROBLEMS = JSON.stringify({
  success: true,
  problems: Array.from({ length: 20 }, (_, i) => ({
    id: `prob-${i + 1}`,
    title: `Problem ${i + 1}`,
    difficulty: ['easy', 'medium', 'hard'][i % 3],
    category: ['arrays', 'strings', 'pointers', 'recursion'][i % 4],
  })),
});

const MOCK_LEADERBOARD = JSON.stringify({
  success: true,
  leaderboard: Array.from({ length: 50 }, (_, i) => ({
    rank: i + 1,
    username: `user_${i + 1}`,
    score: Math.floor(Math.random() * 10000),
    problems_solved: Math.floor(Math.random() * 200),
  })),
});

const MOCK_COMMUNITY = JSON.stringify({
  success: true,
  discussions: Array.from({ length: 10 }, (_, i) => ({
    id: `disc-${i + 1}`,
    title: `Discussion ${i + 1}`,
    author: `user_${Math.floor(Math.random() * 100)}`,
    replies: Math.floor(Math.random() * 30),
    likes: Math.floor(Math.random() * 50),
  })),
});

const MOCK_USER_STATS = JSON.stringify({
  success: true,
  stats: { problems_solved: 42, rating: 1850, streak: 7, rank: 1250 },
});

const RESPONSES = {
  '/api/health': { body: JSON.stringify({ status: 'ok', timestamp: new Date().toISOString(), version: 'load-test' }), delay: 1 },
  '/api/courses': { body: MOCK_COURSES, delay: 8 },
  '/api/problems': { body: MOCK_PROBLEMS, delay: 10 },
  '/api/leaderboard': { body: MOCK_LEADERBOARD, delay: 6 },
  '/api/community': { body: MOCK_COMMUNITY, delay: 5 },
  '/api/stats/user-stats': { body: MOCK_USER_STATS, delay: 4 },
};

const server = http.createServer((req, res) => {
  const route = RESPONSES[req.url];
  if (!route) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const delay = route.delay + Math.random() * 5;
  setTimeout(() => {
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const body = Buffer.from(route.body);

    if (/\bgzip\b/.test(acceptEncoding)) {
      zlib.gzip(body, (err, compressed) => {
        if (err) {
          res.writeHead(500);
          res.end();
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
          'Content-Length': compressed.length,
        });
        res.end(compressed);
      });
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
      });
      res.end(body);
    }
  }, delay);
});

const PORT = parseInt(process.argv[2], 10) || 5001;
server.listen(PORT, () => {
  console.log(`Load test server running on port ${PORT}`);
});
