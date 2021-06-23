//WARNING ICON ON REGISTER MESSAGE
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//SUBMIT BTN
const button = $(".register-btn");

button.addEventListener("click", (e) => {
  e.preventDefault();
  var Error;

  let checkRegisterForm = new Promise((resolve, reject) => {
    let nameCheckResult = nameCheck(nameInput.value);

    if (nameCheckResult) {
      nameMessage.innerHTML = errorIcon + `<p>${nameCheckResult}</p>`;
      nameMessage.style.display = "flex";
      nameContainer.classList.add("fail");
      Error = true;
    } else {
      nameMessage.style.display = "none";
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
          usernameMessage.style.display = "flex";
          usernameContainer.classList.add("fail");
          Error = true;
          resolve();
        } else {
          const apiCheckUsername =
            "http://localhost:3000/api/register/checkUsername";
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
                usernameMessage.style.display = "flex";
                usernameContainer.classList.add("fail");
                Error = true;
              } else {
                usernameMessage.style.display = "none";
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
          passwordMessage.style.display = "flex";
          passwordContainer.classList.add("fail");
          Error = true;
        } else {
          passwordMessage.style.display = "none";
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
          gmailMessage.style.display = "flex";
          gmailContainer.classList.add("fail");
          Error = true;
        } else {
          gmailMessage.style.display = "none";
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
    nameMessage.style.display = "flex";
    nameContainer.classList.add("fail");
  } else {
    nameMessage.style.display = "none";
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
    usernameMessage.style.display = "flex";
    usernameContainer.classList.add("fail");
  } else {
    const apiCheckUsername = "http://localhost:3000/api/register/checkUsername";
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
          usernameMessage.style.display = "flex";
          usernameContainer.classList.add("fail");
        } else {
          usernameMessage.style.display = "none";
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
    passwordMessage.style.display = "flex";
    passwordContainer.classList.add("fail");
  } else {
    passwordMessage.style.display = "none";
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
    gmailMessage.style.display = "flex";
    gmailContainer.classList.add("fail");
  } else {
    gmailMessage.style.display = "none";
    gmailContainer.classList.remove("fail");
  }
});

//FUNCTION CHECKING
//Name
function nameCheck(name) {
  if (name) {
    if (name.length < 6) {
      return `Không ngắn hơn 6 ký tự!`;
    }
    if (name.length > 40) {
      return `Trường này không dài hơn 40 ký tự!`;
    }
  } else {
    return `Trường này trống!`;
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
        return "Phải dài hơn 6 ký tự và không chứa ký tự đặc biệt!";
      } else {
        return "Phải ngắn hơn 16 ký tự và không chứa ký tự đặc biệt!";
      }
    }
    if (lengthError) {
      if (lengthErrorShort) return "Trường này phải dài hơn 6 ký tự!";
      else return "Trường này phải ngắn hơn 16 ký tự!";
    } else {
      return "Trường này không thể chứa ký tự đặc biệt!";
    }
  } else {
    return "Trường này trống!";
  }
}

//Password
function checkPassword(password) {
  if (password) {
    if (password.length < 8) {
      return "Mật khẩu phải từ 8 ký tự trở lên!";
    }
    if (password.length > 30) {
      return "Vui lòng chọn mật khẩu ngắn hơn 30 ký tự!";
    }
  } else {
    return "Trường này trống!";
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
      return "Đây không phải địa chỉ Gmail!";
    }
  } else {
    return "Trường này trống!";
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
