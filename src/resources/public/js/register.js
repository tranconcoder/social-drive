//WARNING ICON ON REGISTER MESSAGE
//SUBMIT BTN
const button = $(".register-btn");

button.addEventListener("click", (e) => {
  e.preventDefault();
  var Error;

  let checkRegisterForm = new Promise((resolve, reject) => {
    let nameCheckResult = nameCheck(nameInput.value);

    if (nameCheckResult) {
      nameMessage.innerHTML = errorIcon + `<p>${nameCheckResult}</p>`;
      nameMessage.classList.remove("hidden");
      nameMessage.style.display = "flex";
      nameContainer.classList.add("fail");
      Error = true;
    } else {
      nameMessage.classList.add("hidden");
      nameContainer.classList.remove("fail");
    }
    resolve();
  });

  checkRegisterForm
    .then(() => {
      return new Promise((resolve) => {
        let usernameCheckResult = usernameCheck(usernameInput.value);

        if (usernameCheckResult) {
          usernameMessage.innerHTML =
            errorIcon + `<p>${usernameCheckResult}</p>`;
            usernameMessage.classList.remove("hidden");
          usernameMessage.style.display = "flex";
          usernameContainer.classList.add("fail");
          Error = true;
          resolve();
        } else {
          const apiCheckUsername =
            `https://0.0.0.0:3000/api/register/checkUsername`;
          fetch(apiCheckUsername, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: usernameInput.value }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                usernameMessage.innerHTML =
                  errorIcon + `<p>Tên đăng nhập này đã được sử dụng</p>`;
                  usernameMessage.classList.remove("hidden");
                usernameMessage.style.display = "flex";
                usernameContainer.classList.add("fail");
                Error = true;
              } else {
                usernameMessage.classList.add("hidden");
                usernameContainer.classList.remove("fail");
              }
              resolve();
            });
        }
      });
    })
    .then(() => {
      return new Promise((resolve) => {
        let passwordCheckResult = checkPassword(passwordInput.value);

        if (passwordCheckResult) {
          passwordMessage.innerHTML =
            errorIcon + `<p>${passwordCheckResult}</p>`;
            passwordMessage.classList.remove("hidden");
          passwordMessage.style.display = "flex";
          passwordContainer.classList.add("fail");
          Error = true;
        } else {
          passwordMessage.classList.add("hidden");
          passwordContainer.classList.remove("fail");
        }
        resolve();
      });
    })

    .then(() => {
      return new Promise((resolve) => {
        let gmailCheckResult = checkGmail(gmailInput.value);

        if (gmailCheckResult) {
          gmailMessage.innerHTML = errorIcon + `<p>${gmailCheckResult}</p>`;
          gmailMessage.classList.remove("hidden");
          gmailMessage.style.display = "flex";
          gmailContainer.classList.add("fail");
          Error = true;
        } else {
          gmailMessage.classList.add("hidden");
          gmailContainer.classList.remove("fail");
        }
        resolve();
      });
    })
    .then(() => {
      if (!Error) {
        $(".register-form").submit();
        button.setAttribute("disabled", "");
      }
    });
});

//NAME CHECK
var nameContainer = $("#regName");
var nameInput = $("#regName input");
var nameMessage = $(".register-message-name");
var errorIcon = '<img src="svg/warning.svg">';

nameInput.addEventListener("focusout", (e) => {
  let nameCheckResult = nameCheck(nameInput.value);

  if (nameCheckResult) {
    nameMessage.innerHTML = errorIcon + `<p>${nameCheckResult}</p>`;
    nameMessage.classList.remove("hidden");
    nameMessage.style.display = "flex";
    nameContainer.classList.add("fail");
  } else {
    nameMessage.classList.add("hidden");
    nameContainer.classList.remove("fail");
  }
});

//USERNAME CHECK
var usernameContainer = $("#regUsername");
var usernameInput = $("#regUsername input");
var usernameMessage = $(".register-message-username");

usernameInput.addEventListener("focusout", (e) => {
  let usernameCheckResult = usernameCheck(usernameInput.value);

  if (usernameCheckResult) {
    usernameMessage.innerHTML = errorIcon + `<p>${usernameCheckResult}</p>`;
    usernameMessage.classList.remove("hidden");
    usernameMessage.style.display = "flex";
    usernameContainer.classList.add("fail");
  } else {
    const apiCheckUsername = "https://0.0.0.0:3000/api/register/checkUsername";
    fetch(apiCheckUsername, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameInput.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          usernameMessage.innerHTML =
            errorIcon + `<p>Tên đăng nhập này đã được sử dụng!</p>`;
            usernameMessage.classList.remove("hidden");
          usernameMessage.style.display = "flex";
          usernameContainer.classList.add("fail");
        } else {
          usernameMessage.classList.add("hidden");
          usernameContainer.classList.remove("fail");
        }
      });
  }
});

// PASSWORD CHECK
var passwordContainer = $("#regPassword");
var passwordInput = $("#regPassword input");
var passwordMessage = $(".register-message-password");

passwordInput.addEventListener("focusout", (e) => {
  let passwordCheckResult = checkPassword(passwordInput.value);

  if (passwordCheckResult) {
    passwordMessage.innerHTML = errorIcon + `<p>${passwordCheckResult}</p>`;
    passwordMessage.classList.remove("hidden");
    passwordMessage.style.display = "flex";
    passwordContainer.classList.add("fail");
  } else {
    passwordMessage.classList.add("hidden");
    passwordContainer.classList.remove("fail");
  }
});

// GMAIL CHECK
var gmailContainer = $("#regGmail");
var gmailInput = $("#regGmail input");
var gmailMessage = $(".register-message-gmail");

gmailInput.addEventListener("focusout", (e) => {
  let gmailCheckResult = checkGmail(gmailInput.value);

  if (gmailCheckResult) {
    gmailMessage.innerHTML = errorIcon + `<p>${gmailCheckResult}</p>`;
    gmailMessage.classList.remove("hidden");
    gmailMessage.style.display = "flex";
    gmailContainer.classList.add("fail");
  } else {
    gmailMessage.classList.add("hidden");
    gmailContainer.classList.remove("fail");
  }
});

//FUNCTION CHECKING
//Name
function nameCheck(name) {
  if (name) {
    if (name.length < 6) {
      return `Họ tên: không nhập ngắn hơn 6 ký tự!`;
    }
    if (name.length > 40) {
      return `Họ tên: không nhập dài hơn 40 ký tự!`;
    }
  } else {
    return `Vui lòng nhập họ tên!`;
  }
}

//Username
function usernameCheck(username) {
  let result = "";
  let lengthError = false;
  let lengthErrorShort = false;
  let lengthErrorLong = false;
  let syntaxError = false;

  if (username) {
    if (username.length < 6) {
      lengthErrorShort = true;
      lengthError = true;
    }
    if (username.length > 16) {
      lengthErrorLong = true;
      lengthError = true;
    }
    if (hasSymbol(username)) {
      syntaxError = true;
    }

    if (!lengthError && !syntaxError) {
      return false;
    }
    if (lengthError && syntaxError) {
      if (lengthErrorShort) {
        return "Tên đăng nhập phải dài hơn 6 ký tự và không chứa ký tự đặc biệt!";
      } else {
        return "Tên đăng nhập phải ngắn hơn 16 ký tự và không chứa ký tự đặc biệt!";
      }
    }
    if (lengthError) {
      if (lengthErrorShort)
        return "Vui lòng chọn tên đăng nhập dài hơn 6 ký tự!";
      else return "Vui lòng chọn tên đăng nhập ngắn hơn 16 ký tự!";
    } else {
      return "Tên đăng nhập không thể chứa ký tự đặc biệt!";
    }
  } else {
    return "Vui lòng điền tên đăng nhập!";
  }
}

//Password
function checkPassword(password) {
  if (password) {
    if (password.length < 8) {
      return "Mật khẩu phải dài từ 8 ký tự trở lên!";
    }
    if (password.length > 30) {
      return "Vui lòng chọn mật khẩu ngắn hơn 30 ký tự!";
    }
  } else {
    return "Vui lòng nhập mật khẩu!";
  }
}

function securityLevel(password) {
  let level = 0;
  if (hasSymbol(password)) level++;
  if (hasUpperCase(password)) level++;
  if (hasLowerCase(password)) level++;
  if (hasNumber(password)) level++;
  return level;
}

//Gmail
function checkGmail(gmail) {
  if (gmail) {
    if (gmail.includes("@gmail.com")) {
      return false;
    } else {
      return "Vui lòng nhập đúng định dạng của gmail (có @gmail.com)!";
    }
  } else {
    return "Vui lòng điền địa chỉ Gmail!";
  }
}

//Gereral functions
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

function hasNumber(string) {
  for (let i in string) {
    if (string.charCodeAt(i) <= 30 && string.charCodeAt(i) <= 39) {
      return true;
    }
  }
  return false;
}
