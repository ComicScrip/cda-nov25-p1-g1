import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://backend:4000/",
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
        // Supprime les anciennes lignes 'apolloReactCommonImportFrom' 
        // Utilise ces paramètres pour Apollo Client 3 :
        reactApolloVersion: 3,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        withSuspenseQuery: false, 
        withRefetchFn: false,
        // Force l'import depuis la racine du package
        apolloClientVersion: 3
      },
    },
  },
};

export default config;