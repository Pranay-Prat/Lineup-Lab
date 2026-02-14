import { MetadataRoute } from 'next';

const baseUrl = 'https://football-lineup-maker.vercel.app'; 

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date();

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
            images: ['/favicon.ico'],
        },
        {
            url: `${baseUrl}/lineup-builder`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/lineups/all`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];
}
