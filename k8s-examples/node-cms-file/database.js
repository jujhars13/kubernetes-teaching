var fs = require('fs')
var async = require('async')
var uuid = require('uuid');
var path = require('path')

module.exports = function(opts){

  var folder_location = opts.folder

  function list_posts(done){
    fs.readdir(folder_location, function(err, files){
      /*
      
        async load each file in the data folder and return parse JSON
        contents for it
        
      */
      var fns = files.map(function(filename){
        return function(next){
          var fullpath = path.join(folder_location, filename)
          fs.readFile(fullpath, 'utf8', function(err, content){
            if(err) return next(err.toString())
            next(null, JSON.parse(content))
          })
        }
      })

      /*
      
        run the loading functions
        
      */
      async.parallel(fns, function(err, content){
        /*
        
          re-order based on the timestamp field
          
        */
        done(null, content)
      })
    })
  }

  function add_post(post, done){
    post.timestamp = new Date().getTime()
    post.id = uuid.v1()
    var fullpath = path.join(folder_location, post.id + '.json')
    var data = JSON.stringify(post, null, 4)
    fs.writeFile(fullpath, data, 'utf8', function(err){
      if(err) return done(err.toString())
      done(null, post)
    })
  }

  function get_post(id, done){
    var fullpath = path.join(folder_location, id + '.json')
    fs.readFile(fullpath, 'utf8', function(err, content){
      if(err) return done(err.toString())
      done(null, JSON.parse(content))
    })
  }

  function delete_post(id, done){
    var fullpath = path.join(folder_location, id + '.json')
    fs.unlink(fullpath, function(err){
      if(err) return done(err.toString())
      done()
    })
  }

  return {
    list_posts:list_posts,
    add_post:add_post,
    get_post:get_post,
    delete_post:delete_post
  }
}
