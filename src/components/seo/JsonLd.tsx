import Script from 'next/script';

interface JsonLdProps {
    type?: 'website' | 'webapp';
}

export function JsonLd({ type = 'webapp' }: JsonLdProps) {
    const baseUrl = 'https://football-lineup-maker.vercel.app';

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Lineup Lab',
        url: baseUrl,
        description: 'Create stunning football lineups with our intuitive drag-and-drop builder. Design custom formations, add player names, export high-quality images, and share your tactical masterpieces with the world.',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    const webAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Lineup Lab',
        url: baseUrl,
        description: 'Create stunning football lineups with our intuitive drag-and-drop builder.',
        applicationCategory: 'SportsApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: [
            'Drag and drop lineup creation',
            'Multiple football formations',
            'Custom player names',
            'PNG and SVG export',
            'Mobile responsive design',
            'Dark and light themes',
        ],
        screenshot: `${baseUrl}/og-image.png`,
    };

    const getSchema = () => {
        switch (type) {
            case 'website':
                return websiteSchema;
            case 'webapp':
            default:
                return [websiteSchema, webAppSchema];
        }
    };

    return (
        <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema()) }}
            strategy="afterInteractive"
        />
    );
}

export default JsonLd;
