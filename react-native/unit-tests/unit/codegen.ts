import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: ["src/**/*.{ts,test.tsx,graphql}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],

      presetConfig: {
        fragmentMasking: false,
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
