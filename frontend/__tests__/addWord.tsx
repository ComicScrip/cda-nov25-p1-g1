/** @jest-environment node */
export { };
type Word = {
    idWord: number;
    label: string;
    indice: string;
    difficulty: string;
    category: string;
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

const CREATE_WORD_MUTATION = `
  mutation CreateWord($data: WordInput!) {
    createWord(data: $data) {
      idWord
      label
      indice
      difficulty
      category
    }
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
      indice
      difficulty
      category
    }
  }
`;

const runGraphQL = async <T,>(
    query: string,
    variables?: Record<string, unknown>,
    headers?: Record<string, string>,
): Promise<T> => {
    if (typeof fetch !== "function") {
        throw new Error("Global fetch is not available.");
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

describe("addWord", () => {
    it("Add a word to db then fetch it", async () => {
        const loginData = await runGraphQL<{ adminLogin: string }>(LOGIN_MUTATION, {
            data: ADMIN_CREDENTIALS,
        });

        const token = loginData.adminLogin;
        expect(token).toBeTruthy();

        const authHeaders = { Cookie: `authToken=${token}` };
        const label = "Kapoué";

        const beforeData = await runGraphQL<{ words: Word[] }>(
            WORDS_QUERY,
            { labelContains: label, limit: 25 },
        );

        const existing = beforeData.words.filter((word) => word.label === label);
        for (const word of existing) {
            await runGraphQL<{ deleteWord: string }>(
                DELETE_WORD_MUTATION,
                { id: word.idWord },
                authHeaders,
            );
        }

        await runGraphQL<{ createWord: Word }>(
            CREATE_WORD_MUTATION,
            {
                data: {
                    label,
                    category: "test",
                    difficulty: "Facile",
                    indice: "2 minutes du peuple",
                },
            },
            authHeaders,
        );

        const afterData = await runGraphQL<{ words: Word[] }>(
            WORDS_QUERY,
            { labelContains: label, limit: 25 },
        );

        const created = afterData.words.find((word) => word.label === label);
        expect(created).toBeTruthy();
        expect(created?.category).toBe("test");
        expect(created?.difficulty).toBe("Facile");
        expect(created?.indice).toBe("2 minutes du peuple");
    }, 30000);
});
