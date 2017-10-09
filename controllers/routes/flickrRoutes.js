const flickModel = require('../models/flickrModel')

exports.getImages = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.query.query == undefined) {
    res.send({message: 'usage: /images?query=yourSearchWordHere'})
  }
  else{

    var searchPhrase = req.query.query

    if (!searchPhrase == '') {
      flickModel.flickrSearch(searchPhrase,(images) =>{
        if (images == null) {
          res.send({message: 'error during request to flickr server'})
        }
        else {
          res.send(images);
        }

      });

    }
    else {
      res.send({message: 'no search word specified'})
    }
  }

}
