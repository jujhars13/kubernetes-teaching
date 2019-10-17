var concat = require('concat-stream')
var Router = require('routes-router')
var fs = require('fs')

var packagejson = require('./package.json')
var utils = require('./utils')
var Database = require('./database')

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
    },
    POST: function(req, res){
      utils.slurp_json(req, function(err, data){
        if(err){
          res.statusCode = 500
          res.end(err)
          return
        }
        database.add_post(data, function(err, post){
          res.setHeader('Content-type', 'application/json')
          res.end(JSON.stringify(post))
        })
      })
    }
  })

  router.addRoute(get_route('article/:id'), {
    GET: function(req, res, opts){
      database.get_post(opts.params.id, function(err, post){
        if(err){
          res.statusCode = 500
          res.end(err)
          return
        }
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(post))
      })
    },
    DELETE: function(req, res, opts){
      database.delete_post(opts.params.id, function(err, post){
        if(err){
          res.statusCode = 500
          res.end(err.toString())
          return
        }
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(post))
      })
    }
  })

  return router
}
