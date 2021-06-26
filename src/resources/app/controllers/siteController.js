const auther = require("../../models/auther");

class Site {
  home(req, res, next) {
    var user;
    if (req.user) {
      req.user.password = "hidden";
      user = Object.assign({}, req.user);
      user = Object.assign({}, user._doc, { header: true, homePage: true });
    } else {
      user = { header: true, homePage: true };
    }

    res.render("home", user);
  }
}

module.exports = new Site();
