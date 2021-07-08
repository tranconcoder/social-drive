var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var domain = "conkgytt-cons.zeet.app";
var http = "https";

function getFileType(originalFileName) {
  return "." + originalFileName.split(".").pop();
}

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

function convertByteToMegaByte(byte) {
  return (byte / 1024 ** 2).toFixed(1);
}

// Toast message
async function createToastMessage(name, style, title, content, timeout) {
  const container = $(".toast-message-container");
  let promise = await new Promise((resolve) => {
    container.innerHTML += `
    <li class="toast-message toast-message-${name} ${style} show">
      <i class="toast-message__icon"></i>
      <span class="toast-message__content-container">
        <h2 class="toast-message__content-container__title">${title}</h2>
        <p class="toast-message__content-container__content">${content}</p>
      </span>
      <i class="toast-message__icon-cancel"></i>
      <div class="toast-message__timing"></div>
    </li>
    `;
    resolve();
  })
    .then(() => {
      return new Promise((resolve) => {
        const timing = $(`.toast-message-${name} .toast-message__timing`);
        timing.style.animation = `timing linear ${timeout}ms`;
        resolve();
      });
    })

    .then(() => {
      return new Promise((resolve) => {
        const message = $(`.toast-message-${name}`);

        setTimeout(() => {
          message.classList.remove("show");
          message.classList.add("hide");
          setTimeout(() => {
            message.remove();
          }, 300);
        }, timeout);

        resolve();
      });
    })

    //cancel button
    .then(() => {
      return new Promise((resolve) => {
        const message = $(`.toast-message-${name}`);

        $(
          `.toast-message-${name} .toast-message__icon-cancel`
        ).addEventListener("click", (e) => {
          message.classList.remove("show");
          message.classList.add("hide");
          setTimeout(() => {
            message.remove();
          }, 300);
        });
      });
    });
}
