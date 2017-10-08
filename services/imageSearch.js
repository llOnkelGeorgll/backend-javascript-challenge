module.exports = function(context) {

  context.app.get('/images', function (req, res) {
    if (req.query.query == undefined) {
      res.send('usage: /images?query=yourSearchWordHere')
    }
    else{
      res.send('ok')
    }
  })
}
