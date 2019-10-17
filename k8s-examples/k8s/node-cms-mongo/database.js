var fs = require('fs')
var async = require('async')
var uuid = require('uuid');
var path = require('path')
var MongoClient = require('mongodb').MongoClient
var FileDB = require('./database-file')

module.exports = function(opts){

  var mongohost = opts.mongohost
  var url = 'mongodb://' + mongohost + ':27017/dockernews'
  var database = null
  var filedb = FileDB(opts)

  console.log('connecting to: ' + url)

  MongoClient.connect(url, function(err, db) {
    if(err){
      console.log('error connecting to mongo')
      console.log(err.toString())
      return
    }
    database = db
    list_posts(function(err, initialposts){
      if(err || !initialposts){
        console.log('error loading initial posts')
        console.log(err.toString())
        return
      }
      // insert the initial posts based on the static files
      else if(initialposts.length<=0){
        filedb.list_posts(function(err, posts){
          async.parallel(posts.map(function(post){
            return function(next){
              add_post(post, next)
            }
          }), function(err, results){
            if(err){
              console.log('error inserting docs: ' + err.toString())
              return
            }
            console.log('default data inserted')
          })
        })
      }
    })
  })

  function list_posts(done){
    if(!database) return done('no connection to mongo')
    var collection = database.collection('articles');
    collection.find({}).toArray(function(err, docs) {
      if(err) return done(err.toString())
      done(null, docs)
    });
  }

  function add_post(post, done){
    if(!database) return done('no connection to mongo')
    var collection = database.collection('articles');
    post.timestamp = new Date().getTime()
    post.id = uuid.v1()
    collection.insert(post, function(err, result) {
      if(err) return done(err.toString())
      done(null, result);
    });
  }

  function get_post(id, done){
    if(!database) return done('no connection to mongo')
    var collection = database.collection('articles');
    collection.find({
      id:id
    }).toArray(function(err, docs) {
      if(err) return done(err.toString())
      done(null, docs ? docs[0] : null)
    });
  }

  function delete_post(id, done){
    if(!database) return done('no connection to mongo')
    var collection = database.collection('articles');
    collection.deleteOne({
      id: id 
    }, function(err, result) {
      if(err) return done(err.toString())
      done(null, result);
    });
  }

  return {
    list_posts:list_posts,
    add_post:add_post,
    get_post:get_post,
    delete_post:delete_post
  }
}
