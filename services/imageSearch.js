module.exports = function(context) {

  context.app.get('/images', function (req, res) {
    if (req.query.query == undefined) {
      res.send('usage: /images?query=yourSearchWordHere')
    }
    else{

      var searchPhrase = req.query.query
      
      if (!searchPhrase == '') {
        context.flickrSearch(searchPhrase,res)
      }
      else {
        res.send('usage: /images?query=yourSearchWordHere')
      }
    }
  })
}
