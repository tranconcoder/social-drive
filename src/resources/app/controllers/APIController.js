const auther = require("../../models/auther");
const document = require("../../models/document");
const base = require("../middleware/baseMiddleware");
const fs = require("fs");

class APIController {
  register = {
    // [POST] api/register/check-username
    checkUsername(req, res, next) {
      auther.findOne({ username: req.body.username }, (err, result) => {
        if (err) {
          res.json('"error": "error"');
        } else {
          if (result) {
            res.json(true);
          } else {
            res.json(false);
          }
        }
      });
    },
  };
  profile = {
    checkOldPassword(req, res, next) {
      auther.findById(req.user._id, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result.password === req.body.oldPassword) {
            res.json(true);
          } else {
            res.json(false);
          }
        }
      });
    },
  };

  myDocument = {
    async checkFileName(req, res, next) {
      let fileNameError = await document.findOne({
        userId: req.user._id,
        name: req.body.fileName,
      });
      console.log(fileNameError);
      if (fileNameError) {
        res.json(false);
      } else {
        res.json(true);
      }
    },

    getAll(req, res, next) {
      document.find(
        { userId: req.user._id },
        ["name", "application", "size", "uploadAt"],
        { sort: { uploadAt: -1 } },

        (err, documentList) => {
          res.json(documentList);
        }
      );
    },

    async upload(req, res, next) {
      await new Promise((resolve, reject) => {
        // authenticate
        if (!req.user || !req.body.fileName || !req.files.file) {
          reject();
        } else {
          resolve();
        }
      })
        .then(() => {
          // save file do disk
          return new Promise((resolve, reject) => {
            const file = req.files.file;

            switch (file.name.split(".").pop()) {
              case "docx":
                const folderWordPath = `src/resources/file/document/word/${req.user._id}`;
                base.checkAndCreateDirectory(folderWordPath);
                file.mv(folderWordPath + `/${req.body.fileName}`);
                break;
              case ("xlsm", "xlsx"):
                const folderExcelPath = `src/resources/file/document/excel/${req.user._id}`;
                base.checkAndCreateDirectory(folderExcelPath);
                file.mv(folderExcelPath + `/${req.body.fileName}`);
                break;
              case "pptx":
                const folderPowerPointPath = `src/resources/file/document/powerPoint/${req.user._id}`;
                base.checkAndCreateDirectory(folderPowerPointPath);
                file.mv(folderPowerPointPath + `/${req.body.fileName}`);
                break;
              default:
                const folderOthersPath = `src/resources/file/document/others/${req.user._id}`;
                base.checkAndCreateDirectory(folderOthersPath);
                file.mv(folderOthersPath + `/${req.body.fileName}`);
            }
            resolve();
          });
        })
        .then(() => {
          return new Promise(async (resolve, reject) => {
            // create file to database

            const file = req.files.file;
            const fileObject = await {
              userId: `${req.user._id}`,
              name: `${req.body.fileName}`,
              application: `${base.getDocumentApplicationWithFileName(
                file.name
              )}`,
              size: file.size,
              locate: `src/resources/file/document/${base.getDocumentApplicationWithFileName(
                file.name
              )}/${req.user._id}/${req.body.fileName}`,
              mode: req.body.fileOption,
            };

            await document.create(fileObject, (err) => {
              if (err) console.log("ERR: Lỗi lưu khi vào DB");
            });

            resolve();
          });
        })
        .then(() => {
          res.json(true);
        })
        .catch(() => {
          res.json(false);
        });
    },

    deletes(req, res, next) {
      console.log(req.body.documentIds[0]);

      // if (req.user && req.body.documentIds) {
      //   let error;
      //   for (let documentId of documentIds) {
      //     document.deleteOne({ _id: documentId }, (err) => {
      //       if (err) error = true;
      //     });
      //   }
      //   if (!error) {
      //     res.json(true);
      //   } else {
      //     res.json(false);
      //   }
      // }
    },

    downloadOne(req, res, next) {
      document.findOne(
        { _id: req.params.documentId },
        ["userId", "locate"],
        function (err, result) {
          if (result.userId == req.user._id && !err) {
            res.download(result.locate);
          }
        }
      );
    },
  };
}

module.exports = new APIController();
