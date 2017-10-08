module.exports = function(context) {


  //init Flickr
  var Flickr = require("flickrapi"),
  flickrOptions = {
    api_key: context.config.flickr.key
  };
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object,
    // but we can only call public methods and access public data
    if (error) {
      console.log('unable to initialize Flickr')
    }
    else {
      context.flickr = flickr
    }
  });


  context.flickrSearch = function(searchPhrase, res){
    if (context.flickr != undefined) {
      context.flickr.photos.search({
        text: searchPhrase,
        page: 1,
        per_page: 10,
        extras: ['url_o'],
        sort: 'relevance'
      }, function(err, result) {

        //create response
        var response = []

        var photos = result.photos.photo
        var matchFound = false
        for (var photoCount in photos) {

          //check if image with same title exists already
          for (var resCount in response){
            if (response[resCount].title == photos[photoCount].title) {
              //found match -> add url to existing object
              //add only if object actually has url info
              if (photos[photoCount].url_o !== undefined) {
                response[resCount].urls.push({width: photos[photoCount].width_o, height: photos[photoCount].height_o, url:photos[photoCount].url_o})
              }
              matchFound = true
              break
            }

          }
          if (!matchFound && photos[photoCount].url_o !== undefined) {
            response.push({title: photos[photoCount].title, urls: [{width: photos[photoCount].width_o, height: photos[photoCount].height_o, url:photos[photoCount].url_o}]})
          }
          matchFound = false
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(response)
      });
    }


  }
}
