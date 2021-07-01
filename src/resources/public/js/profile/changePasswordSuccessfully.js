//SUCCESSFULLY
const changedMessage = $(".toast-message-changed");
const changedCancel = $(".toast-message-changed .toast-message-icon-cancel");

function hideChanged() {
  changedMessage.classList.remove("show");
  changedMessage.classList.add("hide");

  setTimeout(() => {
    changedMessage.style.display = "none";
  }, 300);
}

changedMessage.style.display = "flex";
changedMessage.classList.remove("hide");
changedMessage.classList.add("show");
setTimeout(() => {
  hideChanged();
}, 20000);
changedCancel.addEventListener("click", (e) => {
  hideChanged();
});
