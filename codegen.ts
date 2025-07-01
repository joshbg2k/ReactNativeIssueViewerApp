import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Make sure this env var is set
          'User-Agent': 'MyReactNativeApp', // GitHub requires this header
        },
      },
    },
  ],
  documents: 'graphql/**/*.{ts,tsx}', // Your query files here
  generates: {
    'graphql/generated/graphql.ts': {
      // Output file for types + hooks
      // preset: 'client',
      config: {
        withHooks: true, // Enable React hooks generation
        withHOC: false,
        withComponent: false,
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    './graphql.schema.json': {
      // JSON introspection schema
      plugins: ['introspection'],
    },
  },
};

export default config;
