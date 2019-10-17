var concat = require('concat-stream')
var Router = require('routes-router')
var fs = require('fs')
var packagejson = require('./package.json')
var Database = require('./database-redis')

var APIVERSION = 'v1'

function get_route(route){
  return ['', APIVERSION, route].join('/')
}

module.exports = function(opts){

  var router = Router()
  var database = Database(opts)

  router.addRoute(get_route('version'), {
    GET: function(req, res){
      res.end(packagejson.version)
    }
  })

  router.addRoute(get_route('article'), {
    GET: function(req, res){
      database.list_posts(function(err, posts){
        if(err){
          res.statusCode = 500
          res.end(err)
          return
        }
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(posts))
      })
    }
  })

  router.addRoute(get_route('article/:id'), {
    GET: function(req, res, opts){
      database.get_post(opts.params.id, function(err, data){
        if(err){
          res.statusCode = 500
          res.end(err)
          return
        }
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify({
          count:data
        }))
      })
    },
    POST: function(req, res, opts){
      database.upvote_post(opts.params.id, function(err){
        if(err){
          res.statusCode = 500
          res.end(err.toString())
          return
        }
        res.setHeader('Content-type', 'application/json')
        res.end()
      })
    },
    DELETE: function(req, res, opts){
      database.delete_post(opts.params.id, function(err){
        if(err){
          res.statusCode = 500
          res.end(err.toString())
          return
        }
        res.setHeader('Content-type', 'application/json')
        res.end()
      })
    }
  })

  return router
}
