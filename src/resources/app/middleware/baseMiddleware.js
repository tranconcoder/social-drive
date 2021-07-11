const fs = require("fs");

class Base {
  getFileType(originalFileName) {
    return "." + originalFileName.split(".").pop();
  }

  getDocumentApplicationWithFileName(originalFileName) {
    let fileType = originalFileName.split(".").pop();

    switch (fileType) {
      case "docx":
        return "word";
      case ("xlsm", "xlsx"):
        return "excel";
      default:
        return "powerPoint";
    }
  }

  checkAndCreateDirectory(folderPath) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  hasSymbol(string) {
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

  hasLowerCase(string) {
    for (let i = 0; i < string.length; ++i) {
      let ASCII = string.charCodeAt(i);

      if (ASCII > 96 && ASCII < 123) {
        return true;
      }
    }
    return false;
  }

  hasUpperCase(string) {
    for (let i = 0; i < string.length; ++i) {
      let ASCII = string.charCodeAt(i);

      if (ASCII > 64 && ASCII < 91) {
        return true;
      }
    }
    return false;
  }

  hasNumber(string) {
    for (let i in string) {
      if (string.charCodeAt(i) <= 30 && string.charCodeAt(i) <= 39) {
        return true;
      }
    }
    return false;
  }
}

module.exports = new Base();
