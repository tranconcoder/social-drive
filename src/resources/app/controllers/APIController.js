const auther = require("../../models/auther");
const document = require("../../models/document");

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
      console.log(fileNameError)
      if (fileNameError) {
        res.json(false);
      } else {
        res.json(true);
      }
    },
  };

  documents = {
    getAllMyDocuments(req, res, next) {
      if (req.user === req.body.id) {
        document.find({ userId: req.user._id }, function (err, result) {
          if (err) console.log("error getAllMyDocuments");
          else {
            res.json(result);
          }
        });
      }
    },
  };
}

module.exports = new APIController();
