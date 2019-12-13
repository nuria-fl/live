module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier']
}
