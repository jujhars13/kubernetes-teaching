var path = require('path')

var http = require('http')
var Server = require('./server')

var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    f:'folder',
    d:'database',
    m:'mongohost'
  },
  default:{
    port:process.env.PORT || 80,
    folder:process.env.FOLDER || '/srv/data',
    database:process.env.DATABASE || 'file',
    mongohost:process.env.MONGOHOST || 'mongo'
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