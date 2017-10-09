//import api key from coonfig file
const config = require('../../config')

//ref for flicker object. will be assigned after authentication
var flickrRef = null

//init Flickr
var Flickr = require("flickrapi"),
flickrOptions = {
  api_key: config.flickr.key
};
Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object,
  // but we can only call public methods and access public data
  if (error) {
    console.log('unable to initialize Flickr')
  }
  else {
    flickrRef = flickr;
  }
});

//search for images with title given via searchPhrase and return list via imgCallback
module.exports.flickrSearch = function(searchPhrase, imgCallback){
  if (flickrRef != null) {
    //create custom flickr search request to include img url and size in response
    flickrRef.photos.search({
      text: searchPhrase,
      page: 1,
      per_page: 20,
      extras: ['url_o'],
      sort: 'relevance'
    }, function(err, result) {
      if (err) {
        //return null in case of error from flickr. flickrRouter will check for null response.
        imgCallback(null)
      }
      //create image list
      var imgList = []
      //parse through flickr response and extract relevant information
      var photos = result.photos.photo
      var matchFound = false
      for (var photoCount in photos) {

        //check if image with same title exists already
        for (var resCount in imgList){
          if (imgList[resCount].title == photos[photoCount].title) {
            //found match -> add url to existing object
            //add only if object actually has url info. ToDo report bug to flickr
            if (photos[photoCount].url_o !== undefined) {
              imgList[resCount].urls.push({width: photos[photoCount].width_o, height: photos[photoCount].height_o, url:photos[photoCount].url_o})
            }
            matchFound = true
            break
          }

        }
        if (!matchFound && photos[photoCount].url_o !== undefined) {
          imgList.push({title: photos[photoCount].title, urls: [{width: photos[photoCount].width_o, height: photos[photoCount].height_o, url:photos[photoCount].url_o}]})
        }
        matchFound = false
      }

      imgCallback(imgList)
    });
  }

}
