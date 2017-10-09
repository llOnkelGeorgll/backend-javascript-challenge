const http = require('http');
const express = require('express');
const app = express();
const config = require('./config');

const flickrRoutes = require('./controllers/routes/flickrRoutes');





//set up route to flickr request
app.route("/images").get(flickrRoutes.getImages);

//set default response
app.use(function(req, res){
	res.send("Welcome to flickr image search");
});

http.createServer(app).listen(config.app.port, function () {
	console.log('Express server listening on port ' + config.app.port);
})

//export so testing framework can access the server
module.exports = app;
