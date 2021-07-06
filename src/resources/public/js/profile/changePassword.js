//Xử lý các thẻ input trước khi gửi đi thông tin
const oldPasswordInput = $("#oldPassword");
const oldPasswordMessage = $(".toast-message-old-password");
const oldPasswordTitle = $(
  ".toast-message-old-password .toast-message-warning-title"
);
const oldPasswordContent = $(
  ".toast-message-old-password .toast-message-warning-content"
);
const oldPasswordCancel = $(
  ".toast-message-old-password .toast-message-icon-cancel"
);
const oldPasswordMessageError = $(".toast-message-old-password-error");
const oldPasswordTitleError = $(
  ".toast-message-old-password-error .toast-message-title"
);
const oldPasswordContentError = $(
  ".toast-message-old-password-error .toast-message-content"
);
const oldPasswordCancelError = $(
  ".toast-message-old-password-error .toast-message-icon-cancel"
);

const newPasswordInput = $("#newPassword");
const newPasswordMessage = $(".toast-message-new-password");
const newPasswordTitle = $(
  ".toast-message-new-password .toast-message-warning-title"
);
const newPasswordContent = $(
  ".toast-message-new-password .toast-message-warning-content"
);
const newPasswordCancel = $(
  ".toast-message-new-password .toast-message-icon-cancel"
);

const newPasswordAgainInput = $("#newPasswordAgain");
const newPasswordAgainMessage = $(".toast-message-new-password-again");
const newPasswordAgainTitle = $(
  ".toast-message-new-password-again .toast-message-warning-title"
);
const newPasswordAgainContent = $(
  ".toast-message-new-password-again .toast-message-warning-content"
);
const newPasswordAgainCancel = $(
  ".toast-message-new-password-again .toast-message-icon-cancel"
);

const submitButton = $(".profile-button");
var errorSubmit = false;

//Show and hidden message funciton
function hideMessageOldPassword() {
  oldPasswordInput.classList.remove("fail");

  if (oldPasswordMessage.classList.value.split(" ").includes("show")) {
    oldPasswordMessage.classList.remove("show");
    oldPasswordMessage.classList.add("hide");
    //Đợi hết animation mới display = none
    setTimeout(() => {
      oldPasswordMessage.style.display = "none";
    }, 300);

    return;
  }
}

function hideMessageOldPasswordError() {
  oldPasswordInput.classList.remove("fail");

  if (oldPasswordMessageError.classList.value.split(" ").includes("show")) {
    oldPasswordMessageError.classList.remove("show");
    oldPasswordMessageError.classList.add("hide");
    //Đợi hết animation mới display = none
    setTimeout(() => {
      oldPasswordMessageError.style.display = "none";
    }, 300);

    return;
  }
}

function hideMessageNewPassword() {
  if (newPasswordMessage.classList.value.split(" ").includes("show")) {
    newPasswordInput.classList.remove("fail");
    newPasswordMessage.classList.remove("show");
    newPasswordMessage.classList.add("hide");

    setTimeout(() => {
      newPasswordMessage.style.display = "none";
    }, 300);

    return;
  }
}

function hideMessageNewPasswordAgain() {
  if (newPasswordAgainMessage.classList.value.split(" ").includes("show")) {
    newPasswordAgainInput.classList.remove("fail");
    newPasswordAgainMessage.classList.remove("show");
    newPasswordAgainMessage.classList.add("hide");

    setTimeout(() => {
      newPasswordAgainMessage.style.display = "none";
    }, 300);

    return;
  }
}
async function oldPasswordFocusout() {
  const filled = isFilled(oldPasswordInput);
  if (!filled) {
    hideMessageOldPasswordError();

    oldPasswordInput.classList.add("fail");
    oldPasswordMessage.style.display = "flex";
    oldPasswordTitle.innerHTML = "Mật khẩu cũ";
    oldPasswordContent.innerHTML = "Vui lòng nhập mật khẩu cũ!";
    oldPasswordMessage.classList.remove("hide");
    oldPasswordMessage.classList.add("show");

    oldPasswordCancel.addEventListener("click", async (e) => {
      await hideMessageOldPassword();
      oldPasswordInput.classList.add("fail");
    });
    return false;
  } else {
    const lengthCheckError = lengthCheck(oldPasswordInput, 8, 30);

    if (lengthCheckError) {
      hideMessageOldPasswordError();
      oldPasswordInput.classList.add("fail");
      oldPasswordMessage.style.display = "flex";
      oldPasswordTitle.innerHTML = "Mật khẩu cũ";
      if (lengthCheckError === "min") {
        oldPasswordContent.innerHTML = "Vui lòng nhập dài hơn 7 ký tự!";
      } else {
        oldPasswordContent.innerHTML = "Vui lòng nhập ngắn hơn 31 ký tự!";
      }
      oldPasswordMessage.classList.remove("hide");
      oldPasswordMessage.classList.add("show");

      oldPasswordCancel.addEventListener("click", (e) => {
        hideMessageOldPassword();
      });
      return false;
    } else {
      let error;

      const api = `${http}://${domain}/api/profile/change-password`;

      await fetch(api, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword: oldPasswordInput.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            hideMessageOldPassword();
            
            oldPasswordInput.classList.add("fail");
            oldPasswordMessageError.style.display = "flex";
            oldPasswordTitleError.innerHTML = "Mật khẩu cũ";
            oldPasswordContentError.innerHTML =
              "Mật khẩu cũ không chính xác!!!";
            oldPasswordMessageError.classList.remove("hide");
            oldPasswordMessageError.classList.add("show");

            oldPasswordCancelError.addEventListener("click", async (e) => {
              await hideMessageOldPasswordError();
              oldPasswordInput.classList.add("fail");
            });

            error = true;
          } else {
            hideMessageOldPasswordError();
            hideMessageOldPassword();
          }
        });
        if (error) {
          return false
        } else {
          return true
        }
    }
  }
}

function newPasswordFocusout() {
  const filled = isFilled(newPasswordInput);
  const lengthCheckError = lengthCheck(newPasswordInput, 8, 30);

  if (!filled) {
    newPasswordInput.classList.add("fail");
    newPasswordMessage.style.display = "flex";
    newPasswordTitle.innerHTML = "Mật khẩu mới";
    newPasswordContent.innerHTML = "Vui lòng nhập mật khẩu mới!";
    newPasswordMessage.classList.remove("hide");
    newPasswordMessage.classList.add("show");

    newPasswordCancel.addEventListener("click", async (e) => {
      await hideMessageNewPassword();
      newPasswordInput.classList.add("fail");
    });
    return false;
  } else {
    if (lengthCheckError) {
      newPasswordInput.classList.add("fail");
      newPasswordMessage.style.display = "flex";
      newPasswordTitle.innerHTML = "Mật khẩu mới";
      if (lengthCheckError === "max") {
        newPasswordContent.innerHTML = "Vui lòng nhập ngắn hơn 31 ký tự!";
      } else {
        newPasswordContent.innerHTML = "Vui lòng nhập dài hơn 7 ký tự!";
      }

      newPasswordMessage.classList.remove("hide");
      newPasswordMessage.classList.add("show");

      newPasswordCancel.addEventListener("click", async (e) => {
        await hideMessageNewPassword();
        newPasswordInput.classList.add("fail");
      });
      return false;
    } else {
      hideMessageNewPassword();
      return true;
    }
  }
}

function newPasswordAgainFocusout() {
  const filled = isFilled(newPasswordAgainInput);
  const lengthCheckError = lengthCheck(newPasswordAgainInput, 8, 30);

  if (!filled) {
    newPasswordAgainInput.classList.add("fail");
    newPasswordAgainMessage.style.display = "flex";
    newPasswordAgainTitle.innerHTML = "Xác nhận mật khẩu mới";
    newPasswordAgainContent.innerHTML = "Vui lòng nhập mật khẩu xác nhận!";
    newPasswordAgainMessage.classList.remove("hide");
    newPasswordAgainMessage.classList.add("show");

    newPasswordAgainCancel.addEventListener("click", async (e) => {
      await hideMessageNewPasswordAgain();
      newPasswordAgainInput.classList.add("fail");
    });
    return false;
  } else {
    if (lengthCheckError) {
      newPasswordAgainInput.classList.add("fail");
      newPasswordAgainMessage.style.display = "flex";
      newPasswordAgainTitle.innerHTML = "Xác nhận mật khẩu mới";
      if (lengthCheckError === "max") {
        newPasswordAgainContent.innerHTML = "Vui lòng nhập ngắn hơn 31 ký tự!";
      } else {
        newPasswordAgainContent.innerHTML = "Vui lòng nhập dài hơn 7 ký tự!";
      }

      newPasswordAgainMessage.classList.remove("hide");
      newPasswordAgainMessage.classList.add("show");

      newPasswordAgainCancel.addEventListener("click", async (e) => {
        await hideMessageNewPasswordAgain();
        newPasswordAgainInput.classList.add("fail");
      });
      return false;
    } else {
      if (newPasswordInput.value != newPasswordAgainInput.value) {
        newPasswordAgainInput.classList.add("fail");
        newPasswordAgainMessage.style.display = "flex";
        newPasswordAgainTitle.innerHTML = "Xác nhận mật khẩu";
        newPasswordAgainContent.innerHTML =
          "Mật khẩu xác nhận không khớp với mật khấu mới!";
        newPasswordAgainMessage.classList.remove("hide");
        newPasswordAgainMessage.classList.add("show");

        newPasswordAgainCancel.addEventListener("click", async (e) => {
          await hideMessageNewPasswordAgain();
          newPasswordAgainInput.classList.add("fail");
        });
        return false;
      } else {
        hideMessageNewPasswordAgain();
        return true;
      }
    }
  }
}
//OLD PASSWORD CHECK
oldPasswordInput.addEventListener("focusout", (e) => {
  oldPasswordFocusout();
});

//NEW PASSWORD CHECK
newPasswordInput.addEventListener("focusout", (e) => {
  newPasswordFocusout();

  const filled = isFilled(newPasswordAgainInput);

  if (filled) {
    if (newPasswordAgainInput.value != newPasswordInput.value) {
      newPasswordAgainInput.classList.add("fail");
      newPasswordAgainMessage.style.display = "flex";
      newPasswordAgainTitle.innerHTML = "Xác nhận mật khẩu";
      newPasswordAgainContent.innerHTML =
        "Mật khẩu xác nhận không khớp với mật khẩu mới!";
      newPasswordAgainMessage.classList.remove("hide");
      newPasswordAgainMessage.classList.add("show");

      newPasswordAgainCancel.addEventListener("click", (e) => {
        hideMessageNewPasswordAgain();
      });
    } else {
      hideMessageNewPasswordAgain();
    }
  }
});

//NEW PASSWORD AGAIN CHECK
newPasswordAgainInput.addEventListener("focusout", (e) => {
  newPasswordAgainFocusout();
});

//BUTTON
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  (async function () {
    //OLD PASSWORD CHECK
    let oldPasswordChecking = await oldPasswordFocusout();

    let newPasswordChecking = await newPasswordFocusout();

    let newPasswordAgainChecking = await newPasswordAgainFocusout();

    console.log(oldPasswordChecking, newPasswordChecking, newPasswordAgainChecking);

    if (
      oldPasswordChecking &&
      newPasswordChecking &&
      newPasswordAgainChecking
    ) {
      $(".profile-container__infomation-container-form-change").submit();
      submitButton.setAttribute("disabled", "");
    }
  })();
});

//FUNCTION CHECK
// false khi chưa nhập, true khi đã nhập
function isFilled(inputElement) {
  if (inputElement.value === "") {
    return false;
  }
  return true;
}

// trả về "min" khi nhập dữ liệu có độ dài nhỏ hơn min
// trả về "max" khi nhập dữ liệu có độ dài lớn hơn max
// trả về false khi không có lỗi gì về độ dài
function lengthCheck(inputElement, min, max) {
  if (inputElement.value.length < min) return "min";
  if (inputElement.value.length > max) return "max";
  return false;
}


const uploadAvatar = document.getElementById("avatar-input");
const buttonUpload = document.querySelector(
  ".profile-container__avatar-container-upload-avatar button"
);

const formAvatar = $(".profile-container__avatar-container-upload-avatar");
const acceptChangeAvatarLayout = $(".avatar-update-accept-layout");
const acceptChangeAvatarImages = $$(
  ".avatar-update-accept-layout__container-avatar img"
);

uploadAvatar.addEventListener("change", (e) => {
  let image = uploadAvatar.files;

  const fileType = uploadAvatar.files[0].type.split("/")[1];
  const fileTypeAccept = ["png", "jpeg", "jpg"];
  
  if (fileTypeAccept.includes(fileType)) {
    if (
      uploadAvatar.files[0].size <= 3 * 1024 * 1024 &&
      uploadAvatar.files[0].size > 0
    ) {
      let fileReader = new FileReader();

      fileReader.onload = function (e) {
        acceptChangeAvatarImages[0].setAttribute("src", e.target.result);
        acceptChangeAvatarImages[1].setAttribute("src", e.target.result);
      };

      fileReader.readAsDataURL(image[0]);

      acceptChangeAvatarLayout.style.display = "flex";
    } else {
      if (uploadAvatar.files[0].size > 3 * 1024 * 1024) {
        this.value = "";
        alert("Dung lượng tệp giới hạn là 3MB, vui lòng chọn tệp nhỏ hơn!!!");
      }
    }
  } else {
    uploadAvatar.files[0].value = "";
    alert("Chỉ chấp nhận hình ảnh có đuôi tệp là:  '.png', '.jpeg','.jpg'");
  }
});

const buttonUploadAvatarAccept = $(
  ".avatar-update-accept-layout__container-button-container button:first-child"
);
const buttonUploadAvatarClose = $(
  ".avatar-update-accept-layout__container-button-container button:nth-child(2)"
);

console.log(buttonUploadAvatarAccept, buttonUploadAvatarClose)
buttonUploadAvatarAccept.addEventListener("click", (e) => {
  buttonUploadAvatarAccept.setAttribute("disabled", "")
  formAvatar.submit();
});
buttonUploadAvatarClose.addEventListener("click", (e) => {
  acceptChangeAvatarLayout.style.display = "none";
});

const avatarImage = $(".profile-container__avatar-container-img img")
const avatarImageHover = $('.profile-container__avatar-container-img-hover')

avatarImage.addEventListener('mouseover', (e) => {
  avatarImageHover.style.display = 'block'
  avatarImageHover.style.cursor = 'pointer'
})
avatarImage.addEventListener('mouseout', (e) => {
  avatarImageHover.style.display = 'none'
  avatarImageHover.style.cursor = 'default'
})
avatarImageHover.addEventListener('mouseover', (e) => {
  avatarImageHover.style.display = 'block'
  avatarImageHover.style.cursor = 'pointer'
})
avatarImageHover.addEventListener('mouseout', (e) => {
  avatarImageHover.style.display = 'none'
  avatarImageHover.style.cursor = 'default'
})