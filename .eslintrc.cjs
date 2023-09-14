module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
      'plugin:prettier/recommended',
   ],
   ignorePatterns: ['dist', '.eslintrc.cjs'],
   parser: '@typescript-eslint/parser',
   plugins: ['react-refresh', 'prettier'],
   rules: {
      // 'cypress/no-assigning-return-values': 'error',
      // 'cypress/no-unnecessary-waiting': 'error',
      // 'cypress/assertion-before-screenshot': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': [
         'error',
         {
            tabWidth: 3,
            printWidth: 100,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
            endOfLine: 'auto',
            semi: true,
         },
      ],
   },
};
