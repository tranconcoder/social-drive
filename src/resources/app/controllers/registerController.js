const Auther            = require('../../models/auther')

class Register{
   registerPage (req, res, next) {
      res.render('register')
   }
   
   register (req, res, next) {
      Auther.create(req.body, (err, auther) => {
         if(err) {res.send("Lỗi đăng ký")}
         else res.redirect('/login')
      })
   }
}

module.exports = new Register