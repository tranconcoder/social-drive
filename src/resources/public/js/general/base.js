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