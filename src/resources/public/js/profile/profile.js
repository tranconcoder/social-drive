const uploadAvatar = document.getElementById("avatar-input");
const buttonUpload = document.querySelector(
  ".profile-container__avatar-container-upload-avatar button"
);
console.log(1);

let avatarButton = document.querySelector(".avatar-button");
let profileButton = document.querySelector(".profile-button");

profileButton.addEventListener("click", (e) => {
  e.preventDefault();
  var Error;

  let checkProfileForm = new Promise((resolve, reject) => {
    let nameCheckResult = nameCheck(nameInput.value);

    if (nameCheckResult) {
      nameMessage.innerHTML = errorIcon + `<p>${nameCheckResult}</p>`;
      nameMessage.classList.remove("hidden");
      nameMessage.style.display = "flex";
      nameInput.classList.add("fail");
      Error = true;
    } else {
      nameMessage.classList.add("hidden");
      nameInput.classList.remove("fail");
    }
    resolve();
  });

  checkProfileForm
    .then(() => {
      return new Promise((resolve) => {
        let gmailCheckResult = checkGmail(gmailInput.value);

        if (gmailCheckResult) {
          gmailMessage.innerHTML = errorIcon + `<p>${gmailCheckResult}</p>`;
          gmailMessage.classList.remove("hidden");
          gmailMessage.style.display = "flex";
          gmailInput.classList.add("fail");
          Error = true;
        } else {
          gmailMessage.classList.add("hidden");
          gmailInput.classList.remove("fail");
        }
        resolve();
      });
    })
    .then(() => {
      if (!Error) {
        $(".profile-container__infomation-container-form-change").submit();
        $(".profile-button").setAttribute("disabled", "");
      }
    });
});

//NAME CHECK
var nameInput = $("#name");
var nameMessage = $(".profile-message-name");
var errorIcon = '<img src="svg/warning.svg">';

nameInput.addEventListener("focusout", (e) => {
  let nameCheckResult = nameCheck(nameInput.value);

  if (nameCheckResult) {
    nameMessage.innerHTML = errorIcon + `<p>${nameCheckResult}</p>`;
    nameMessage.classList.remove("hidden");
    nameMessage.style.display = "flex";
    nameInput.classList.add("fail");
  } else {
    nameMessage.classList.add("hidden");
    nameInput.classList.remove("fail");
  }
});

// GMAIL CHECK
var gmailInput = $("#gmail");
var gmailMessage = $(".profile-message-gmail");

gmailInput.addEventListener("focusout", (e) => {
  let gmailCheckResult = checkGmail(gmailInput.value);

  if (gmailCheckResult) {
    gmailMessage.innerHTML = errorIcon + `<p>${gmailCheckResult}</p>`;
    gmailMessage.classList.remove("hidden");
    gmailMessage.style.display = "flex";
    gmailInput.classList.add("fail");
  } else {
    gmailMessage.classList.add("hidden");
    gmailInput.classList.remove("fail");
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

const avatarImage = $(".profile-container__avatar-container-img img");
const avatarImageHover = $(".profile-container__avatar-container-img-hover");

avatarImage.addEventListener("mouseover", (e) => {
  avatarImageHover.style.display = "block";
  avatarImageHover.style.cursor = "pointer";
});
avatarImage.addEventListener("mouseout", (e) => {
  avatarImageHover.style.display = "none";
  avatarImageHover.style.cursor = "default";
});
avatarImageHover.addEventListener("mouseover", (e) => {
  avatarImageHover.style.display = "block";
  avatarImageHover.style.cursor = "pointer";
});
avatarImageHover.addEventListener("mouseout", (e) => {
  avatarImageHover.style.display = "none";
  avatarImageHover.style.cursor = "default";
});
