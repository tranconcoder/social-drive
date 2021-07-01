const auther = require("../../models/auther");

module.exports = async function (req, res, next) {
  auther.findById(req.body.id, async function (err, result) {
    if (err) throw err;
    if (req.body.oldPassword === result.password) {
      if (checkNewPassword(req.body.newPassword, req.body.newPasswordAgain)) {
        auther
          .updateOne({ _id: req.body.id }, { password: req.body.newPassword })
          .then(() => {
            next();
          })
          .catch(() => {
            res.send("Lỗi khi cập nhật mật khẩu!");
          });
      } else {
        res.send("Lỗi xác thực mật khẩu!");
      }
    } else {
      let User = req.user;
      User = Object.assign({}, User);
      User = Object.assign(
        {},
        User._doc,
        { header: true },
        { profilePage: true },
        { oldPassword: req.body.oldPassword },
        { newPassword: req.body.newPassword },
        { newPasswordAgain: req.body.newPasswordAgain },
        { changePasswordError: true },
      );
      res.render("profile/changePassword", User);
      console.log(User)
    }
  });
};

function checkNewPassword(newPassword, newPasswordAgain) {
  if (
    newPassword.length >= 8 &&
    newPassword.length <= 30 &&
    newPassword === newPasswordAgain
  ) {
    return true;
  }
  return false;
}
