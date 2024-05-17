module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true, // 全局严格模式
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],

    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    'react/prefer-stateless-function': 'off',
    'prettier/prettier': 'error',
    'react/sort-comp': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',

    // 允许在setState内部使用state
    // 'react/no-access-state-in-setstate': 'off',

    // js不强制要求使用解构赋值规则
    // 'destructuring-assignment': 'off',

    // [eslint-plugin-react] react不强制要求使用解构赋值规则
    // 'react/destructuring-assignment': 'off',
  },
};
