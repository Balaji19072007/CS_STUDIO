import blogsData from '../data/blogs/blog-index.json';
import projectsData from '../data/projects/projects-index.json';
import docsData from '../data/docs/docs-index.json';
import roadmapsData from '../data/roadmaps/roadmaps-index.json';
import learningPathsData from '../data/learning-paths/learning-paths-index.json';

const CONTENT_TYPES = {
  blog: blogsData,
  project: projectsData,
  doc: docsData,
  roadmap: roadmapsData,
  learningPath: learningPathsData,
};

class ContentService {
  /**
   * Fetch all content for a given type, including drafts (admin/dev only)
   */
  getAllContent(type) {
    return CONTENT_TYPES[type] || [];
  }

  /**
   * Fetch only published content for a given type
   */
  getPublishedContent(type) {
    const data = this.getAllContent(type);
    // If it's the docs format (grouped by category)
    if (type === 'doc') {
      return data.map(group => ({
        ...group,
        items: group.items.filter(item => item.status === 'published')
      })).filter(group => group.items.length > 0);
    }
    return data.filter(item => item.status === 'published');
  }

  /**
   * Fetch a single published content item by slug
   */
  getContentBySlug(type, slug) {
    if (type === 'doc') {
      const data = this.getPublishedContent(type);
      for (const group of data) {
        const item = group.items.find(item => item.slug === slug);
        if (item) return item;
      }
      return null;
    }
    
    const data = this.getPublishedContent(type);
    return data.find(item => item.slug === slug) || null;
  }
}

export const contentService = new ContentService();
