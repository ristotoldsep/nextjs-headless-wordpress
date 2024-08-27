// lib/graphqlRequest.ts

interface GraphQLQuery {
    query: string;
    variables?: Record<string, any>;
}

export default async function graphqlRequest<T>(query: GraphQLQuery): Promise<T> {
    const url = "https://gatsby.vdisain.dev/graphql";
    
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
    }

    const res = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(query)
    });

    if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const resJson = await res.json();
    return resJson as T;
}
