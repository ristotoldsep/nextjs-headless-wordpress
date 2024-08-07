type GraphQLResponse = any; // Replace `any` with a more specific type if available

interface GraphQLQuery {
    query: string;
    variables?: Record<string, any>;
}

export default async function graphqlRequest(query: GraphQLQuery): Promise<GraphQLResponse> {
    const url = "https://gatsby.vdisain.dev/graphql";
    const headers = { 'Content-Type': 'application/json' };

    const res = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(query)
    });

    if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const resJson: GraphQLResponse = await res.json();

    return resJson;
}
