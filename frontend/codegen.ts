import type { CodegenConfig } from "@graphql-codegen/cli";

const uri = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const schemaUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:4000/";

const config: CodegenConfig = {
  overwrite: true,
  schema: uri,
  documents: ["**/*.{gql,graphql}"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/graphql/generated/schema.ts": {
      // see https://github.com/dotansimha/graphql-code-generator/issues/5073
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
        apolloReactHooksImportFrom: "@apollo/client/react",
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
  // see https://github.com/dotansimha/graphql-code-generator-community/issues/1216
  config: {
    apolloReactCommonImportFrom: "@apollo/client/react",
    apolloReactHooksImportFrom: "@apollo/client/react",
  },
};

export default config;