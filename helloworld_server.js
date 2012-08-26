var html = require('fs').readFileSync(__dirname+'/helloworld.html');
var server = require('http').createServer(function(req, res){
  res.end(html);
});
server.listen(8888);

var nowjs = require("/usr/local/lib/node_modules/now");
var everyone = nowjs.initialize(server);

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};
