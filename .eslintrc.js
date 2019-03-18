module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'space-in-parens': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
