class Login{
   loginPage (req, res, next) {
      res.render('login')
   }
}

module.exports = new Login