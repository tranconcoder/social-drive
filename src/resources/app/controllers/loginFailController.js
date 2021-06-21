class LoginFail {
    loginFail (req, res, next) {
        res.render('login', {message: 'Tên đăng nhập hoặc mật khẩu không đúng!!!'})
    }
}

module.exports = new LoginFail