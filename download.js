export {download}

function download (link){
var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("file.txt");
var request = http.get(link, function(response) {
  response.pipe(file);
});
}