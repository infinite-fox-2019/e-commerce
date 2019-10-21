module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard',
    ''
  ],
  plugins: [
    "chai-expect"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "chai-expect/missing-assertion": 2,
    "chai-expect/terminating-properties": 1
  }
}
