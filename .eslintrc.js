module.exports = {
  'env': {
    'browser': false,
    'commonjs': false,
    'node': true,
    'es2022': true
  },
  'extends': [
    'eslint:recommended'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-unused-vars': [
      'error',
      { 'destructuredArrayIgnorePattern': '^_' }
    ]
  }
}
