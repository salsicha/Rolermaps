var html = require('fs').readFileSync(__dirname+'/rolermaps.html');
var server = require('http').createServer(function(req, res) {
  res.end(html);
});
server.listen(8888);

var nowjs = require("/usr/local/lib/node_modules/now");
var everyone = nowjs.initialize(server);

var fs = require('fs');
var fileName = 'map1.xml';
var newMessage;

fs.readFile(fileName, 'utf8', function(err, data) {
  // console.log("map data: "+data);
  // base64 encoding
  //  newMessage = new Buffer(data).toString('base64');
  newMessage = data;
  // console.log("new message: "+newMessage);
});

everyone.now.updateChat = function(chat) {
  everyone.now.receiveChat(this.now.name, chat);
};

everyone.now.distributeMessage = function(message) {
//  console.log("message: "+message);

  // if empty message
  if(message == "") {
    // console.log("sending full map to self only");

    fs.readFile(fileName, 'utf8', function(err, data) {
      // console.log("map data: "+data);
      newMessage = data;
    });

    // set message to contents of file
    // read is async so file contents might be old
    message = newMessage;

    this.now.receiveMessage(this.now.name, message);
  } else {
    // console.log("sending update to all");
    // write contents of message to file by appending to current line
    fs.open(fileName, 'a', 666, function( e, id ) {
      fs.write( id, message+".", null, 'utf8', function() {
        fs.readFile(fileName, 'utf8', function(err, data) {
           newMessage = data;
           fs.close(id, function(){
             // console.log('file is updated');
           });
        });
      });
    });

    // send message  
    everyone.now.receiveMessage(this.now.name, message);
  }
};

everyone.now.clearMap = function() {
  fs.writeFile(fileName, "", function(err) {
    message = "";
    newMessage = "";
    data = "";
    everyone.now.getCleanMap();

    // everyone.now.receiveMessage("", "");

  // everyone.now.distributeMessage("");
    // if(err) {
        // console.log(err);
    // } else {
        // console.log("The file was saved!");
        // everyone.now.receiveMessage(this.now.name, "");
    // }
  }); 
};
