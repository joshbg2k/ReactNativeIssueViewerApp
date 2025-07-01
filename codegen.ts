import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'User-Agent': 'MyReactNativeApp',
        },
      },
    },
  ],
  documents: 'graphql/**/*.{ts,tsx}',
  generates: {
    'graphql/generated/graphql.ts': {
      // preset: 'client',
      config: {
        withHooks: true,
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
      plugins: ['introspection'],
    },
  },
};

export default config;
