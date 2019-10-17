var http = require('http')
var Server = require('./server')

var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    r:'redishost'
  },
  default:{
    port:process.env.PORT || 80,
    redishost:process.env.REDISHOST || 'redis'
  }
})

var server = Server(args)

var httpserver = http.createServer(function(req, res){
  console.log(req.method + ' ' + req.url)
  server(req, res)
})
httpserver.listen(args.port, function(){
  console.log('server listening on port: ' + args.port)
})