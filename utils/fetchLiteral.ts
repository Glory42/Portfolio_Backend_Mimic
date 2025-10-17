import type { LiteralBook, LiteralReadingState } from '../Types/LiteralBooks.js';

const LITERAL_API = "https://literal.club/graphql/";

export async function getLiteralToken(): Promise<string> {
    const email = process.env.LITERAL_EMAIL;
    const password = process.env.LITERAL_PASSWORD;

    if (!email || !password) {
        throw new Error("Literal credentials not configured");
    }

    const query = `
        mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                email
                profile {
                    id
                    handle
                    name
                }
            }
        }
    `;

    const res = await fetch(LITERAL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { email, password } }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Literal API login failed: ${res.status} ${res.statusText} - ${text}`);
    }

    let json;
    try {
        json = await res.json();
    } catch {
        const text = await res.text();
        throw new Error(`Failed to parse JSON from Literal API login. Response: ${text}`);
    }

    if (json.errors?.length) {
        throw new Error(`Literal login error: ${json.errors[0].message}`);
    }

    if (!json.data?.login?.token) {
        throw new Error("No token returned from Literal API login");
    }

    return json.data.login.token;
}

export async function fetchCurrentlyReading(token: string): Promise<LiteralReadingState[]> {
    const query = `
        query {
            myReadingStates {
                status
                book {
                    id
                    cover
                    pageCount
                }
            }  
        }
    `;

    const res = await fetch(LITERAL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Literal API fetch failed: ${res.status} ${res.statusText} - ${text}`);
    }

    let json;
    try {
        json = await res.json();
    } catch {
        const text = await res.text();
        throw new Error(`Failed to parse JSON from Literal API fetch. Response: ${text}`);
    }

    if (json.errors?.length) {
        throw new Error(`Literal fetch error: ${json.errors[0].message}`);
    }

    if (!json.data?.myReadingStates) {
        throw new Error("No reading states returned from Literal API");
    }

    const filtered = json.data.myReadingStates.filter(
        (s: LiteralReadingState) => s.status === 'IS_READING'
    );

    return filtered;
}
