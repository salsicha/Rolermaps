var html = require('fs').readFileSync(__dirname+'/rolermaps.html');
var server = require('http').createServer(function(req, res){
  res.end(html);
});
server.listen(8888);

// var nowjs = require("/usr/local/lib/node_modules/now");
// var everyone = nowjs.initialize(server);

var fs = require('fs');
var fileName = 'map1.xml';
var newMessage;

fs.readFile(fileName, 'utf8', function(err, data) {
  console.log("map data: "+data);
  // base64 encoding
  //  newMessage = new Buffer(data).toString('base64');
  newMessage = data;
  console.log("new message: "+newMessage);
});

// WebSocket from socket.io
var webSocket = require('socket.io').listen(server);
webSocket.on('connection', function(client) 
{
  // client.send('Please enter a user name ...');
    
  var userName;
  client.on('message', function(message) 
  {
    console.log(message);

    // if(!userName) 
    // {
    //   userName = message;
    //   webSocket.broadcast(message + ' has entered the zone.');
    //   return;
    // }
        
    var broadcastMessage = 'test';
    webSocket.broadcast(broadcastMessage);    
  });
});



/*
everyone.now.distributeMessage = function(message){
//  console.log("message: "+message);

  // if empty message
  if(message == "") {

    fs.readFile(fileName, 'utf8', function(err, data) {
      console.log("map data: "+data);
      newMessage = data;
    });

    // set message to contents of file
    // read is async so file contents might be old
    message = newMessage;
  } else {
    // write contents of message to file by appending to current line
    fs.open(fileName, 'a', 666, function( e, id ) {
      fs.write( id, message, null, 'utf8', function(){
        fs.readFile(fileName, 'utf8', function(err, data) {
           newMessage = data;
           fs.close(id, function(){
             console.log('file is updated');
           });
        });
      });
    });
  }

  // send message  
  everyone.now.receiveMessage(this.now.name, message);
*/  
// };
