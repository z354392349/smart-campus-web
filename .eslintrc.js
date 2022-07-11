module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }], // 单引号 允许使用反引号
    semi: ['error', 'never'], // 禁止末尾使用分号
    'comma-dangle': ['error', 'never'] // 最后一个属性不适用，号
  }
}
