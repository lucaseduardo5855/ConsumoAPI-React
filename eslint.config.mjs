import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks'; // <--- NOVO: Importamos os Hooks
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended, // O plugin "react" já vem embutido aqui!

  configPrettier,

  {
    plugins: {
      prettier: pluginPrettier,
      'react-hooks': pluginReactHooks, // Adicionamos os Hooks aqui
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
      'react/jsx-filename-extension': 0,
      'import/prefer-default-export': 0,

      // Agora essas regras vão funcionar porque adicionamos o plugin acima:
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react/react-in-jsx-scope': 'off',
    },
  },
];
