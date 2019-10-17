var http = require('http')

var env_vars = Object.keys(process.env || {}).map(function(key){
  return key + '=' + process.env[key]
}).join('<br />')

var args = process.argv.join(' ')

var server = http.createServer(function(req, res){
  var body = [
    '<h3>args</h3>',
    args,
    '<h3>env</h3>',
    env_vars
  ].join("\n")
  res.setHeader('Content-type', 'text/html')
  res.end(body)
})

server.listen(80, function(){
  console.log('server listening on port 80')
})