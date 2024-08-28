import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug, type, secret } = req.query;

    // if (typeof slug !== 'string' || typeof type !== 'string') {
    //     return res.status(400).json({ message: 'Invalid query parameters' });
    // }

    let path = '';

    switch (type) {
        case 'post':
            path = `/blog/${slug}`;
            break;
        case 'page':
            path = `/${slug}`;
            break;
        case 'product':
            path = `/products/${slug}`;
            break;
        case 'home':
            path = '/blog';
            break;
        case 'products':
            path = '/products';
            break;
        default:
            return res.status(400).json({ message: 'Invalid type parameter' });
    }

    if (secret !== process.env.REVALIDATION_SECRET) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await res.revalidate(path);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send(err instanceof Error ? err.message : 'Unknown error');
    }
}
