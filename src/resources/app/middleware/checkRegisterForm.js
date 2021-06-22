const auther = require("../../models/auther");

function checkRegisterForm(req, res, next) {
  const content = req.body;
  const name = req.body.name; //nameMessage
  const username = req.body.username; //usernameMessage
  const password = req.body.password; //passwordMessage
  const gmail = req.body.gmail; //gmailMessage

  //REFRESH PROPERTY
  delete content.nameMessage;
  delete content.usernameMessage;
  delete content.passwordMessage;
  delete content.gmailMessage;

  //NAME CHECK
  if (name.length < 6) {
    content.nameMessage = `Vui lòng nhập dài hơn 6 ký tự!`;
  }
  if (name.length > 40) {
    content.nameMessage = `Vui lòng nhập ngắn hơn 40 ký tự!`;
  }

  //USERNAME CHECK
  let promise = new Promise(function (resolve, reject) {
    auther
      .findOne({ username })
      .then((data) => {
        resolve(data);
      })
      .catch(() => reject());
  });

  promise
    .then((data) => {
      if (data != null) {
        content.usernameMessage = "Tên đăng nhập này đã được sử dụng!!!";
      }

      return new Promise((resolve, reject) => {
        if ("usernameMessage" in content) {
          if (username.length > 16) {
            content.usernameMessage += `Tên đăng nhập không thể dài hơn 16 ký tự!`;
          }
          if (username.length < 6) {
            content.usernameMessage += `Tên đăng nhập không thể ngắn hơn 6 ký tự!`;
          }
        } else {
          if (username.length > 16) {
            content.usernameMessage = `Tên đăng nhập không thể dài hơn 16 ký tự!`;
          }
          if (username.length < 6) {
            content.usernameMessage = `Tên đăng nhập không thể ngắn hơn 6 ký tự!`;
          }
        }

        if ("usernameMessage" in content) {
          if (hasSymbol(username))
            content.usernameMessage += `Tên đăng nhập không thể chứa ký tự đặc biệt!`;
        } else {
          if (hasSymbol(username))
            content.usernameMessage = `Tên đăng nhập không thể chứa ký tự đặc biệt!`;
        }
        //PASSWORD CHECK
        if (password.length < 8) {
          content.passwordMessage = `Vui lòng chọn mật khẩu dài hơn 8 ký tự!`;
        }
        if (password.length > 20) {
          content.passwordMessage = `Vui lòng chọn mật khẩu ngắn hơn 20 ký tự!`;
        }
        if ("passwordMessage" in content) {
          if (securityLevel(password) == 1) {
            content.passwordMessage += `Mật khẩu cần tối thiểu chữ thường và chữ IN`;
          }
        } else {
          if (securityLevel(password) == 1) {
            content.passwordMessage = `Mật khẩu có độ bảo mật chưa cao!`;
          }
        }

        //GMAIL CHECK
        if (gmail.lastIndexOf("@") == -1) {
          content.gmailMessage = `Đây không phải địa chỉ Mail!`;
        }

        next();
      });
    })
    .catch(() => {
      res.send("Đã xảy ra lỗi trong quá trình xác thực!");
    });

  function hasSymbol(string) {
    for (let i = 0; i < string.length; ++i) {
      let ASCII = string.charCodeAt(i);

      if (
        !(ASCII >= 48 && ASCII <= 57) &&
        !(ASCII >= 65 && ASCII < 90) &&
        !(ASCII >= 97 && ASCII < 122)
      ) {
        return true;
      }
    }
    return false;
  }

  function hasLowerCase(string) {
    for (let i = 0; i < string.length; ++i) {
      let ASCII = string.charCodeAt(i);

      if (ASCII > 96 && ASCII < 123) {
        return true;
      }
    }
    return false;
  }

  function hasUpperCase(string) {
    for (let i = 0; i < string.length; ++i) {
      let ASCII = string.charCodeAt(i);

      if (ASCII > 64 && ASCII < 91) {
        return true;
      }
    }
    return false;
  }

  function securityLevel(password) {
    let securityLevel = 0;

    if (hasLowerCase(password)) securityLevel++;
    if (hasUpperCase(password)) securityLevel++;
    if (hasSymbol(password)) securityLevel++;

    return securityLevel;
  }
}

module.exports = checkRegisterForm;
