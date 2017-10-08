module.exports = function(context) {

  const flickr = require("flickrapi"),
  flickrOptions = {
    api_key: context.config.flickr.key
  };
  flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object,
    // but we can only call public methods and access public data
  });
}
