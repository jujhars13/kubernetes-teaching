"use strict";
const http = require('http')
const redis = require('redis')
const os = require('os')

const args = require('minimist')(process.argv, {
  default:{
    redis_port: process.env.REDIS_SERVICE_PORT || 6379,
    redis_host: process.env.REDIS_SERVICE_HOST
  }
})

console.dir(process.env)

if(!args.redis_port) {
  console.error('redis_port/REDIS_SERVICE_PORT required')
  process.exit(1)
}

if(!args.redis_host) {
  console.error('redis_host/REDIS_SERVICE_HOST required')
  process.exit(1)
}

console.log('using connection params:')
console.dir({
  host: args.redis_host,
  port: args.redis_port
})

const client = redis.createClient({
  host: args.redis_host,
  port: args.redis_port
})

const server = http.createServer((req, res) => {

  
  client.incr('counter', (err, counter) => {
    if(err) {
      console.error(err)
      res.statusCode = 500
      red.end(err.toString())
      return
    }
    console.log('request ' + counter)
    const data = {
      hostname: os.hostname(),
      counter: counter
    }
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(data, null, 4))
  })
  
})

server.listen(80, () => {
  console.log('server listening on port 80')
})