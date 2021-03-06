module.exports = {
  extends: ['airbnb', 'prettier/react', 'prettier'],
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-underscore-dangle': 0,
  },
  parser: 'babel-eslint',
  globals: {
    document: 1,
    localStorage: true,
  },
};
