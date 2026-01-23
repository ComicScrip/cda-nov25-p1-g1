import { describe, it } from "node:test";

/** @jest-environment node */
export {};
type Word = {
    idWord: number;
    label: string;
};

type GraphQLResponse<T> = {
    data?: T;
    errors?: { message: string }[];
};

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? "http://localhost:4000";
const ADMIN_CREDENTIALS = { username: "Admin", password: "Admin123%" };

const LOGIN_MUTATION = `
  mutation AdminLogin($data: AdminLoginInput!) {
    adminLogin(data: $data)
  }
`;

const DELETE_WORD_MUTATION = `
  mutation DeleteWord($id: Int!) {
    deleteWord(id: $id)
  }
`;

const WORDS_QUERY = `
  query Words($labelContains: String, $limit: Int) {
    words(labelContains: $labelContains, limit: $limit) {
      idWord
      label
    }
  }
`;

const runGraphQL = async <T,>(
    query: string,
    variables?: Record<string, unknown>,
    headers?: Record<string, string>,
): Promise<T> => {
    if (typeof fetch !== "function") {
        throw new Error("Global fetch is not available. Use Node 18+ to run this test.");
    }

    const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(headers ?? {}),
        },
        body: JSON.stringify({ query, variables }),
    });

    const payload = (await response.json()) as GraphQLResponse<T>;

    if (!response.ok || payload.errors?.length) {
        const messages = payload.errors?.map((error) => error.message).join(", ");
        throw new Error(messages ?? `GraphQL request failed (${response.status})`);
    }

    if (!payload.data) {
        throw new Error("GraphQL response did not include data.");
    }

    return payload.data;
};

describe("delWord", () => {
    it("Delete word created by addWord", async () => {
        const loginData = await runGraphQL<{ adminLogin: string }>(LOGIN_MUTATION, {
            data: ADMIN_CREDENTIALS,
        });

        const token = loginData.adminLogin;
        expect(token).toBeTruthy();

        const authHeaders = { Cookie: `authToken=${token}` };
        const label = "Kapoué";

        const wordsData = await runGraphQL<{ words: Word[] }>(
            WORDS_QUERY,
            { labelContains: label, limit: 25 },
        );

        const match = wordsData.words.find((word) => word.label === label);
        expect(match).toBeTruthy();

        await runGraphQL<{ deleteWord: string }>(
            DELETE_WORD_MUTATION,
            { id: match!.idWord },
            authHeaders,
        );

        const afterData = await runGraphQL<{ words: Word[] }>(
            WORDS_QUERY,
            { labelContains: label, limit: 25 },
        );

        const stillThere = afterData.words.find((word) => word.label === label);
        expect(stillThere).toBeUndefined();
    }, 30000);
});
