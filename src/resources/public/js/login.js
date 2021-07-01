//WARNING ICON ON REGISTER MESSAGE
//SUBMIT BTN
const button = $(".login-btn");
const errorIcon = '<img src="svg/warning.svg">';

button.addEventListener("click", (e) => {
  e.preventDefault();
  var Error;

  let checkRegisterForm = new Promise((resolve, reject) => {
    let usernameCheckResult = usernameCheck(usernameInput.value);

    if (usernameCheckResult) {
      usernameMessage.innerHTML = errorIcon + `<p>${usernameCheckResult}</p>`;
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

  checkRegisterForm
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
      if (!Error) {
        $(".login-form").submit();
        button.setAttribute("disabled", "");
      }
    });
});
//USERNAME CHECK
var usernameContainer = $("#logUsername");
var usernameInput = $("#logUsername input");
var usernameMessage = $(".login-message-username");

usernameInput.addEventListener("focusout", (e) => {
  let usernameCheckResult = usernameCheck(usernameInput.value);

  if (usernameCheckResult) {
    usernameMessage.innerHTML = errorIcon + `<p>${usernameCheckResult}</p>`;
    usernameMessage.classList.remove("hidden");
    usernameMessage.style.display = "flex";
    usernameContainer.classList.add("fail");
  } else {
    usernameMessage.classList.add("hidden");
    usernameContainer.classList.remove("fail");
  }
});

// PASSWORD CHECK
var passwordContainer = $("#logPassword");
var passwordInput = $("#logPassword input");
var passwordMessage = $(".login-message-password");

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

//FUNCTION CHECKING
//Username
function usernameCheck(username) {
  if (username) {
    return false;
  } else {
    return "Vui lòng điền tên đăng nhập!";
  }
}

//Password
function checkPassword(password) {
  if (password) {
    return false;
  } else {
    return "Vui lòng nhập mật khẩu!";
  }
}
