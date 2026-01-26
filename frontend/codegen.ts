import type { CodegenConfig } from "@graphql-codegen/cli";

const schemaUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:4000/";

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaUrl,
  documents: ["src/graphql/**/*.gql"],
  generates: {
    "./src/graphql/generated/schema.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        { add: { content: "// @ts-nocheck" } },
      ],
      config: {
        // paramètres pour Apollo Client 3 :
        reactApolloVersion: 3,
        apolloReactHooksImportFrom: "@apollo/client/react",
        withHooks: true,
        withHOC: false,
        withComponent: false,
        withSuspenseQuery: false, 
        withRefetchFn: false,
        // Force l'import
        apolloClientVersion: 3
      },
    },
  },
};

export default config;
