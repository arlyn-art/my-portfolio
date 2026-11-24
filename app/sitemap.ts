import type { MetadataRoute } from 'next';
import projects from '@/data/projects';
import { generateProjectSlug } from '@/lib/slug';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arlynarta.vercel.app';
  const lastModified = new Date();

  // 1. Halaman Statis Utama
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journey`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  // 2. Halaman Dinamis Detail Proyek (/projects/[slug])
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${generateProjectSlug(project)}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}