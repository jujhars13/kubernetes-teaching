var fs = require('fs')
var async = require('async')
var path = require('path')
var redis = require("redis")

module.exports = function(opts){

  var redishost = opts.redishost

  var client = redis.createClient({
    host:redishost
  })

  console.log('connecting to: ' + redishost)

  function list_posts(done){
    client.keys('*', function(err, keys){
      if(err) return done(err.toString())
      async.parallel(keys.map(function(key){
        return function(next){
          client.get(key, function(err, data){
            if(err) return next(err.toString())
            next(null, {
              id:key,
              count:data
            })
          })
        }
      }), function(err, data){
        if(err) return done(err.toString())
        done(null, data)
      })
    })
  }

  function upvote_post(id, done){
    client.incr(id, function(err){
      if(err) return done(err.toString())
      done()
    })
  }

  function get_post(id, done){
    client.get(id, function(err, data){
      if(err) return done(err.toString())
      done(null, data)
    })
  }

  function delete_post(id, done){
    client.del(id, function(err){
      if(err) return done(err.toString())
      done()
    })
  }

  return {
    list_posts:list_posts,
    upvote_post:upvote_post,
    get_post:get_post,
    delete_post:delete_post
  }
}
