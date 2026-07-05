import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(FRONTEND_DIR, 'dist');
const SRC_PAGES = path.join(FRONTEND_DIR, 'src', 'pages');

const BASE_URL = 'https://cs-studio.in';

// Helper to extract slugs using Regex
function extractSlugs(filePath, regex) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const slugs = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (match[1]) {
        slugs.push(match[1]);
      }
    }
    return [...new Set(slugs)];
  } catch (err) {
    console.warn(`Could not read ${filePath}: ${err.message}`);
    return [];
  }
}

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  const urls = new Set();
  
  // 1. Add static base routes
  const staticRoutes = [
    '/',
    '/courses',
    '/problems',
    '/roadmaps',
    '/learning-paths',
    '/projects',
    '/blog',
    '/docs',
    '/verify-certificate',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms'
  ];
  
  staticRoutes.forEach(route => urls.add(route));
  
  // Helper to read and parse JSON files, filtering by published status
  const getPublishedSlugs = (filename) => {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(FRONTEND_DIR, 'src', 'data', filename), 'utf-8'));
      // Handle docs which is grouped by category
      if (Array.isArray(data) && data[0]?.items) {
        return data.flatMap(group => 
          group.items.filter(item => item.status === 'published').map(item => item.slug)
        );
      }
      return data.filter(item => item.status === 'published').map(item => item.slug);
    } catch (err) {
      console.warn(`Could not read ${filename}: ${err.message}`);
      return [];
    }
  };

  // 2. Extract Blog Slugs
  const blogSlugs = getPublishedSlugs('blogs/blog-index.json');
  blogSlugs.forEach(slug => urls.add(`/blog/${slug}`));
  
  // 3. Extract Projects Slugs
  const projectSlugs = getPublishedSlugs('projects/projects-index.json');
  projectSlugs.forEach(slug => urls.add(`/projects/${slug}`));
  
  // 4. Extract Docs Slugs
  const docsSlugs = getPublishedSlugs('docs/docs-index.json');
  docsSlugs.forEach(slug => urls.add(`/docs/${slug}`));
  
  // 5. Extract Roadmap Slugs
  const roadmapSlugs = getPublishedSlugs('roadmaps/roadmaps-index.json');
  roadmapSlugs.forEach(slug => urls.add(`/roadmaps/${slug}`));

  // 6. Extract Learning Path Slugs
  const learningPathSlugs = getPublishedSlugs('learning-paths/learning-paths-index.json');
  learningPathSlugs.forEach(slug => urls.add(`/learning-paths/${slug}`));

  // 7. Validate and Build XML
  const protectedRoutes = ['/dashboard', '/settings', '/workspace', '/solve', '/admin'];
  
  const validUrls = Array.from(urls).filter(route => {
    // Exclude protected routes
    if (protectedRoutes.some(p => route.startsWith(p))) return false;
    return true;
  });
  
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${validUrls.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  // 8. Write to dist/sitemap.xml
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xmlContent, 'utf-8');
  
  console.log('--- SITEMAP VALIDATION SUMMARY ---');
  console.log(`Total URLs generated: ${validUrls.length}`);
  console.log(`Included Dynamic Blog Posts: ${blogSlugs.length}`);
  console.log(`Included Dynamic Projects: ${projectSlugs.length}`);
  console.log(`Included Dynamic Docs: ${docsSlugs.length}`);
  console.log(`Included Dynamic Roadmaps: ${roadmapSlugs.length}`);
  console.log(`Included Learning Paths: ${learningPathSlugs.length}`);
  console.log('Successfully written to dist/sitemap.xml');
  console.log('----------------------------------');
}

generateSitemap().catch(console.error);
