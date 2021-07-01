const Auther = require('../../models/auther')

class Login{
   loginPage (req, res, next) {
      res.render('login/login')
   }

   loginFail (req, res, next) {
      res.render('login/login', {message: 'Tên đăng nhập hoặc mật khẩu không đúng!!!'})
  }
}

module.exports = new Login