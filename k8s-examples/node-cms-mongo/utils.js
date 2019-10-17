var concat = require('concat-stream');
var uuid = require('uuid');

//uuid.v1()

// read the JSON body from an incoming HTTP request
function slurp_json(req, done){
  req.pipe(concat(function(data){
    done(null, JSON.parse(data.toString()))
  }))
}

module.exports = {
  slurp_json:slurp_json
}