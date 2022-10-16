/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/prefer-import-from-vue': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    'no-empty': 'off',
  },
}
