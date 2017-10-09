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
        res.send(images);
      });

    }
    else {
      res.send({message: 'no search word specified'})
    }
  }

}
