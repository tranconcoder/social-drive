// GENERAL VARIABLES
const fileDocumentUploadInput = $("#documentFile");
const fileDocumentUploadAccept = [".docx", ".xlsm", ".xlsx", ".pptx"];
const fileDocumentUploadIcon = $(
  ".upload__form-content__input-container__icon"
);
const fileDocumentUploadButton = $(
  ".upload__form-content__file-info__submit-button"
);
const fileDocumentUploadForm = $(".upload");
const fileDocumentUploadNameInput = $("#documentFileName");
const fileDocumentUploadOptionsInput = $$("input[name='fileOption']");
// ESC TO CANCEL FORM UPLOAD
document.addEventListener("keyup", (e) => {
  console.log($(".upload-container").style.display);
  if (e.keyCode === 27 && $(".upload-container").style.display === "flex") {
    $(".upload-container").style.display = "none";
  }
});

//UPLOAD FORM CANCEL
$(".upload__cancel").addEventListener("click", (e) => {
  $(".upload-container").style.display = "none";
});

//DOCUMENT FILE UPLOAD
const originalFileName = $(
  ".upload__form-content__input-container__original-file-name"
);

fileDocumentUploadInput.addEventListener("change", (e) => {
  const fileName = fileDocumentUploadInput.files[0].name;
  const fileType = getFileType(fileName);

  let promise = new Promise((resolve, reject) => {
    if (fileDocumentUploadAccept.includes(fileType)) {
      resolve();
    } else {
      reject("Vui lòng chọn tài liệu Office 2010 trở lên!");
    }
  });

  promise
    //Kiểm tra xem đã nhập file chưa
    .then(() => {
      return new Promise((resolve, reject) => {
        const uploadDocumentInputCheck = fileDocumentUploadInputCheck();
        if (uploadDocumentInputCheck) {
          resolve();
        } else {
          reject();
        }
      });
    })
    //Kiểm tra dung lượng file
    .then(() => {
      return new Promise((resolve, reject) => {
        if (fileDocumentUploadInput.files[0].size > 100 * 1024 ** 2) {
          reject("Không thể tải lên tập tin lớn hơn 100MB!");
        } else {
          resolve();
        }
      });
    })
    // Kiểm tra tên file có hợp lệ không: không được trùng với file xử lý của server: fileProcessing.*
    .then(() => {
      return new Promise((resolve, reject) => {
        let arrFileNameSplitedWithDot = fileName.split(".");
        arrFileNameSplitedWithDot.pop();
        if (arrFileNameSplitedWithDot.join(".") === "fileProcessing") {
          reject("Lỗi trùng tên với file xử lý của máy chủ!!!");
        } else {
          resolve();
        }
      });
    })
    // Xử lý tên tệp và thông báo ra giao diện
    .then(() => {
      if (fileName.length > 18) {
        originalFileName.innerHTML =
          fileName.split(".")[0].slice(0, 19) + "..." + fileType;
      } else {
        originalFileName.innerHTML = fileName;
      }
    })
    // Thay đổi icon giao diện phù hợp với File Type
    .then(() => {
      switch (fileType) {
        case ".docx":
          fileDocumentUploadIcon.setAttribute("src", "/svg/word.svg");
          break;
        case (".xlsm", ".xlsx"):
          fileDocumentUploadIcon.setAttribute("src", "/svg/excel.svg");
          break;
        default:
          fileDocumentUploadIcon.setAttribute("src", "/svg/powerpoint.svg");
      }
    })

    .catch((messageErr) => {
      alert(messageErr);
    });
});

// FOCUSOUT FILE NAME
fileDocumentUploadNameInput.addEventListener("focusout", (e) => {
  documentFileInputNameCheck();
});

fileDocumentUploadNameInput.addEventListener("input", (e) => {
  documentFileInputNameCheck();
});

for (let element of fileDocumentUploadOptionsInput) {
  element.addEventListener("click", (e) => {
    fileDocumentUploadOptionsInputCheck();
  });
}

// SUBMIT BUTTON
fileDocumentUploadButton.addEventListener("click", async (e) => {
  e.preventDefault();

  let fileDocumentCheck = await fileDocumentUploadInputCheck();
  let fileNameCheck = await documentFileInputNameCheck();
  let fileOptionCheck = await fileDocumentUploadOptionsInputCheck();

  if (fileNameCheck && fileOptionCheck && fileDocumentCheck) {
    await fileDocumentUploadButton.setAttribute("disabled", "");
    fileDocumentUploadForm.submit();
  }
});

async function documentFileInputNameCheck() {
  let failed = (message) => {
    $(".upload__form-content__file-info__file-name").classList.add("fail");
    $(
      ".upload__form-content__file-info__file-name__warning-message__content"
    ).innerHTML = message;
  };

  let success = () => {
    $(".upload__form-content__file-info__file-name").classList.remove("fail");
  };

  // Kiểm tra đã nhập tên tài liệu chưa
  if (fileDocumentUploadNameInput.value) {
    if (fileDocumentUploadNameInput.value.length > 200) {
      failed("Vui lòng chọn NGẮN hơn 201 ký tự!");
      return false;
    } else {
      if (fileDocumentUploadNameInput.value === "fileProcessing") {
        failed("Vui lòng chọn tên khác cho Tài liệu!");
        return false;
      } else {
        const symbolCantUse = [
          "/",
          "<",
          ">",
          ",",
          ".",
          ":",
          ";",
          '"',
          "'",
          "?",
          "\\",
        ];
        let symbolError = [];
        for (let element of fileDocumentUploadNameInput.value) {
          if (symbolCantUse.includes(element)) {
            symbolError.push(element);
          }
        }

        if (symbolError.length > 0) {
          failed(
            `Tên Tài liệu không thể chứa ký tự sau: </br> ${symbolError.join(
              " "
            )}`
          );
          return false;
        } else {
          if (fileDocumentUploadInput.files.length > 0) {
            const apiCheckFileName = `${http}://${domain}/api/my-documents/check-file-name`;
            let checkFileNameError = false;
            await fetch(apiCheckFileName, {
              method: "post",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fileName: `${fileDocumentUploadNameInput.value}${getFileType(
                  fileDocumentUploadInput.files[0].name
                )}`,
              }),
            })
              .then((response) => response.json())
              // checkResult true nếu không có lỗi
              .then((checkResult) => {
                console.log(checkResult);
                if (checkResult) {
                  success();
                } else {
                  failed("Tên Tài liệu này đã tồn tại!");
                  checkFileNameError = true;
                }
              });

            if (checkFileNameError) {
              return false;
            } else {
              return true;
            }
          } else {
            success();
          }
        }
      }
    }
  } else {
    failed("Vui lòng nhập tên Tài liệu!");
    return false;
  }
}

function fileDocumentUploadOptionsInputCheck() {
  for (let element of fileDocumentUploadOptionsInput) {
    if (element.checked) {
      $(".upload__form-content__file-info__option").classList.remove("fail");
      return true;
    }
  }
  $(".upload__form-content__file-info__option").classList.add("fail");
  $(
    ".upload__form-content__file-info__option__warning-message__content"
  ).innerHTML = "Vui lòng chọn chế độ của Tài liệu!";
  console.log(false);
  return false;
}

function fileDocumentUploadInputCheck() {
  if (fileDocumentUploadInput.files[0]) {
    $(".upload__form-content__input-container").classList.remove("fail");
    return true;
  } else {
    $(
      ".upload__form-content__input-container__warning-message__content"
    ).innerHTML = "Vui lòng chọn Tài liệu!";
    $(".upload__form-content__input-container").classList.add("fail");
    return false;
  }
}
