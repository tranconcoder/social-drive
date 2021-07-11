const auther = require("../../models/auther");
const document = require("../../models/document");
const base = require("../middleware/baseMiddleware");
const AdmZip = require("adm-zip");
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
      let fileNameError = await document.findOne(
        {
          userId: req.user._id,
          name: req.body.fileName,
        },
        ["_id"]
      );
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

    upload(req, res, next) {
      new Promise((resolve, reject) => {
        // authenticate
        if (!req.user || !req.body.fileName || !req.files.file) {
          reject();
        } else {
          resolve("Lỗi xác thực");
        }
      })
        .then(() => {
          // save file to db
          return new Promise(async (resolve, reject) => {
            const file = req.files.file;

            switch (file.name.split(".").pop()) {
              case "docx":
                const folderWordPath = `../../file/document/word/${req.user._id}`;
                await base.checkAndCreateDirectory(folderWordPath);
                file.mv(folderWordPath + `/${req.body.fileName}`);
                break;
              case "xlsx":
              case "xlsm":
                const folderExcelPath = `src/resources/file/document/excel/${req.user._id}`;
                await base.checkAndCreateDirectory(folderExcelPath);
                file.mv(folderExcelPath + `/${req.body.fileName}`);
                break;
              case "pptx":
                const folderPowerPointPath = `src/resources/file/document/powerPoint/${req.user._id}`;
                await base.checkAndCreateDirectory(folderPowerPointPath);
                file.mv(folderPowerPointPath + `/${req.body.fileName}`);
                break;
              default:
                const folderOthersPath = `src/resources/file/document/others/${req.user._id}`;
                await base.checkAndCreateDirectory(folderOthersPath);
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
        .catch((err) => {
          res.json(err);
          console.log(err);
        });
    },

    deletes(req, res, next) {
      console.log(req.body.documentIds[0]);
    },

    download(req, res, next) {
      new Promise((resolve, reject) => {
        if (!req.user) reject("Lỗi xác thực tài khoản");
        if (!req.query.documents) reject("Lỗi xác thực query");
        resolve(req.query.documents);
      })
        .then(
          (documentsDownload) =>
            new Promise(async (resolve, reject) => {
              if (documentsDownload.length === 1) {
                await document
                  .findOne({ _id: documentsDownload[0] }, ["locate"])
                  .then((document) => {
                    res.download(document.locate);
                  })
                  .catch((err) => {
                    console.log(err);
                    reject("Lỗi tìm kiếm tài liệu trên db để tải xuống!");
                  });

                resolve();
              } else {
                let zip = await new AdmZip();
                await document.find(
                  { _id: documentsDownload },
                  ["locate"],
                  async function (err, documents) {
                    if (err) console.log(err);

                    await documents.forEach((document) => {
                      zip.addLocalFile(document.locate);
                    });

                    const outputFileFolder = `src/resources/file/document/others/${req.user._id}`;
                    const outputFile = `${outputFileFolder}/fileProcessing.zip`;
                    await base.checkAndCreateDirectory(outputFileFolder);
                    await fs.writeFileSync(outputFile, zip.toBuffer());

                    await res.download(outputFile, (err) => {
                      if (!err) {
                        fs.unlinkSync(outputFile);
                        console.log("Download file successfilly!");
                      } else {
                        console.log("Err when download file!");
                      }
                    });

                    resolve();
                  }
                );
              }
            })
        )
        .catch((err) => console.log(err));
    },
  };
}

module.exports = new APIController();
