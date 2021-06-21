const Auther = require('../../models/auther')

class Home{
   home (req, res, next) {
      res.render('home', req.user)
   }
}

module.exports = new Home