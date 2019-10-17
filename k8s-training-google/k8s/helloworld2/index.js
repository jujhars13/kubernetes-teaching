const DEFAULT_MESSAGE = 'hello world!';

var args = require('minimist')(process.argv, {
  alias:{
    m:'message'
  },
  default:{
    message:process.env.MESSAGE || DEFAULT_MESSAGE
  }
})

console.log(args.message);