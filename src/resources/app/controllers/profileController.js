const auther = require("../../models/auther");

class Profile {
  profilePage(req, res, next) {
    let User = req.user;
    User = Object.assign({}, User);
    User = Object.assign({}, User._doc, { header: true, profilePage: true });
    res.render("profile/profile", User);
  }

  changePasswordPage(req, res, next) {
    let User = req.user;
    User = Object.assign({}, User);
    User = Object.assign({}, User._doc, { header: true, profilePage: true });
    res.render("profile/changePassword", User);
  }

  changePassword(req, res, next) {
    auther.findById(req.body.id, function (err, result) {
      let User = result;
      User = User.toObject();
      User = Object.assign(
        {},
        User,
        { header: true },
        { changedPassword: true },
        { profilePage: true },
        { oldPassword: req.body.oldPassword },
        { newPassword: req.body.newPassword },
        { newPasswordAgain: req.body.newPasswordAgain },
      );
      res.render("profile/changePassword", User);
    });
  }

  profileUpdate(req, res, next) {
    auther.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        gmail: req.body.gmail,
      },
      function (err) {
        if (err) res.send("Can't update!!!");
        else {
          auther.findById(req.body.id, function (err, user) {
            if (err) res.send("Can't find this auther!!!");
            else {
              user = Object.assign({}, user._doc, {
                message: "Thông tin đã được cập nhật!",
                header: true,
              });
              res.render("profile/profile", user);
            }
          });
        }
      }
    );
  }
}

module.exports = new Profile();
