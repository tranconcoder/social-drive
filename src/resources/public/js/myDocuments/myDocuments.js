// Document tools
const refreshButton = $(
  ".document-tools__item__refresh .document-tools__item__image"
);

refreshButton.addEventListener("click", (e) => {
  renderDocumentList();
});

let documents;
let documentSelected = { id: "", name: "" };
// document list
const documentList = $(".document-list");
async function renderDocumentList() {
  documents = await getAllDocument();
  arr = documents;
  documentList.innerHTML = "";

  await documents.forEach((document) => {
    documentList.innerHTML += `
    <div class="document-list__item col">
      <div class="document-list__item__container">
        <img class="document-list__item__container__image"
        src="/svg/${document.application}.svg" alt="">
        <p class="document-list__item__container__file-name"
        >${document.name}</p>
        <div class="document-list__item__container__file-info">
            <span class="document-list__item__container__file-info__last-change">
              ${document.uploadAt.slice(0, 13)}
            </span>
            <span class="document-list__item__container__file-info__size">
              ${convertByteToMegaByte(document.size)}MB
            </span>
        </div>
      </div>
    </div>`;
  });

  // document list context menu
  function documentListContextMenu() {
    const documentListItems = $$(".document-list__item__container");
    for (let index = 0; index < documentListItems.length; index++) {
      documentListItems[index].addEventListener("contextmenu", async (e) => {
        e.preventDefault();

        documentSelected.id = documents[index]._id;
        documentSelected.name = documents[index].name;
        const contextMenu = $(".context-menu__document-item");
        const contextMenuOverHeight =
          e.screenY + contextMenu.offsetHeight - screen.height;

        contextMenu.style.visibility = "visible";
        contextMenu.style.left = `${e.clientX}px`;

        if (contextMenuOverHeight > 0) {
          contextMenu.style.top = `${e.clientY - contextMenuOverHeight}px`;
        } else {
          contextMenu.style.top = `${e.clientY}px`;
        }

        document.addEventListener("click", (e) => {
          contextMenu.style.visibility = "hidden";
        });
      });
    }
    // context menu selection
    // download
    const contextMenuDownload = $(".context-menu__item__download");
    contextMenuDownload.addEventListener("click", async (e) => {
      let downloadAPI = `${http}://${domain}/api/my-documents/download/${documentSelected.id}`;
      await fetch(downloadAPI)
        .then((response) => response.blob())
        .then((blob) => {
          let a = document.createElement("a"); // create a tag a
          a.href = URL.createObjectURL(blob); // create url of blob
          a.setAttribute("download", documentSelected.name); // set file
          a.click(); // click tag a to downlaod
        });
    });

    // delete
    const contextMenuDelete = $(".context-menu__item__delete");
    contextMenuDelete.addEventListener("click", (e) => {
      let deleteAPI = `${http}://${domain}/api/my-documents/deletes`;
      const xhr = new XMLHttpRequest();
      const data = new FormData();

      data.append("documentIds", [documentSelected.id, documentSelected.id])
      xhr.open("DELETE", deleteAPI);
      xhr.send(data);
    });
  }

  documentListContextMenu();
}

renderDocumentList();

// document list API
async function getAllDocument() {
  const apiGetAll = `${http}://${domain}/api/my-documents/get-all`;
  let documents;
  await fetch(apiGetAll, {
    method: "get",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      documents = data;
    });
  return documents;
}

// UPLOAD DOCUMENT
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
  console.log(e.target.files[0].size);

  let promise = new Promise((resolve, reject) => {
    // if (fileDocumentUploadAccept.includes(fileType)) {
    resolve();
    // } else {
    //   reject("Vui lòng chọn tài liệu Office 2010 trở lên!");
    // }
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
          fileDocumentUploadIcon.setAttribute("src", "/svg/powerPoint.svg");
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
    $(".upload-container").style.display = "none";

    await fileDocumentUploadButton.setAttribute("disabled", "");

    let data = new FormData();
    let file = fileDocumentUploadInput.files[0];
    let fileName = fileDocumentUploadNameInput.value + getFileType(file.name);
    const uploadAPI = `${http}://${domain}/api/my-documents/upload/${$(
      "data"
    ).getAttribute("userId")}/${fileName}/${file.size}`;

    data.append("file", file);
    data.append("fileName", fileName);
    data.append(
      "fileOption",
      getValueInputRadio(fileDocumentUploadOptionsInput)
    );

    let xhr = new XMLHttpRequest();
    let netSpeed = [];
    let cache = 0;

    //show upload form
    $(".document-more__uploading").style.display = "flex";

    // set file name to document upload form
    $(".document-more__uploading__content__file-name").innerHTML = fileName;

    let geted = false;
    // when upload start -> set interval per second to monitor net speed
    xhr.upload.addEventListener("loadstart", (e) => {
      let getedInterval = setInterval(() => {
        geted = true;
      }, 1000);

      // uploaded -> clear this interval
      xhr.upload.addEventListener("loadend", (e) => {
        clearInterval(getedInterval);
        createToastMessage(
          "uploaded-document",
          "successfully",
          "Tải lên",
          `Đã tải lên thành công Tài liệu ${fileName}`,
          10000
        );
      });
    });

    let totalDataPerSecond = 0;
    let prevUploadData = 0;
    xhr.upload.addEventListener("progress", (e) => {
      // HTML Selector
      const progressBar = $(
        ".document-more__uploading__content__progress-bar__status__uploaded"
      );
      const uploadedPercent = $(
        ".document-more__uploading__content__progress-bar__percent"
      );
      const uploadSpeed = $(".document-more__uploading__content__upload-speed");
      const uploaded = $(
        ".document-more__uploading__content__uploaded__loaded"
      );
      const totalFileSize = $(
        ".document-more__uploading__content__uploaded__total"
      );

      // local variables
      const uploadedData = e.loaded;
      const fileSize = e.total;

      if (geted) {
        uploadSpeed.innerHTML = `${(totalDataPerSecond / 1024 ** 2).toFixed(
          1
        )}Mb/s`;
        totalDataPerSecond = uploadedData - prevUploadData;
        prevUploadData = uploadedData;
        geted = false;
      } else {
        totalDataPerSecond += uploadedData - prevUploadData;
        prevUploadData = uploadedData;
      }

      progressBar.style.width = `${((uploadedData / fileSize) * 100).toFixed(
        1
      )}%`;
      uploadedPercent.innerHTML = `${((uploadedData / fileSize) * 100).toFixed(
        1
      )}%`;
      uploaded.innerHTML = `${(uploadedData / 1024 ** 2).toFixed(1)}`;
      totalFileSize.innerHTML = `${(fileSize / 1024 ** 2).toFixed(1)}Mb`;

      // Abort upload file
      const cancelButton = $(".document-more__uploading__cancel");
      cancelButton.addEventListener("click", (e) => {
        xhr.abort();
        $(".document-more__uploading").style.display = "none";
      });
    });

    xhr.open("POST", uploadAPI);
    xhr.send(data);

    xhr.addEventListener("loadend", (e) => {
      console.log(xhr.response);
    });
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

// // PROCESS TEXT IN ITEM
// const documentListItemFileName = $(".document-list__item__file-name");
// let documentListItemFileNameContent =
//   documentListItemFileName.innerHTML.split(".");

// documentListItemFileNameContent.pop();

// documentListItemFileNameContent = documentListItemFileNameContent.join(".");

// let documentListItemFileNameType = getFileType(
//   documentListItemFileName.innerHTML
// );

// if (documentListItemFileName.innerHTML.length > 24) {
//   documentListItemFileNameContent =
//     documentListItemFileNameContent.slice(
//       0,
//       22 - documentListItemFileNameType.length - 3
//     ) + "...";

//   documentListItemFileName.innerHTML =
//     documentListItemFileNameContent + documentListItemFileNameType;
// }
