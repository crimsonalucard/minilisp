var _ = require('lodash');

module.exports = {
  openParens: '('.
  closeParens: ')',
  plus: '+',
  minus: '-',
  times: '*',
  divide: '/',
  quote: '"',
  coreFunctions: ['print', 'defn'],
  functionMap : {
    '+': 'core.add',
    '-': 'core.subtract',
    '*': 'core.multiply',
    '/': 'core.divide'
  }
}
