const Auther = require("../../models/auther");

class Register {
  registerPage(req, res, next) {
    res.render("register");
  }

  register(req, res, next) {
    const User = req.body;
    const messageTitles = [
      "nameMessage",
      "usernameMessage",
      "passwordMessage",
      "gmailMessage",
    ];

    if (isFail(User, messageTitles)) {
      res.render("register", User);
    } else {
      Auther.create(req.body, (err, auther) => {
        if (err) {
          res.send("Lỗi đăng ký");
        } else res.redirect("/login");
      });
    }

    function isFail(user, messageTitles) {
      for (let element of messageTitles) {
        if (element in User) {
          return true;
        }
      }

      return false;
    }
  }
}

module.exports = new Register();
