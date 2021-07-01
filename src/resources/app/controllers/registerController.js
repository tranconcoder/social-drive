const Auther = require("../../models/auther");

class Register {
  registerPage(req, res, next) {
    res.render("register/register");
  }

  register(req, res, next) {
    const User = req.body;

    Auther.create(req.body, (err, auther) => {
      if (err) {
        res.render("register/register", { message: "Lỗi đăng ký!" });
      } else res.render('login/login', {User})
    });
  }
}

module.exports = new Register();
