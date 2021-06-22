const express               = require('express')
const app                   = express()
const multer                = require('multer')
const router                = express.Router()
const fs                    = require('fs')

const Auther                = require('../../models/auther')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/resources/public/img/avatars')
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        let arr = fileName.split('.');
        let fileType = arr[arr.length - 1]

        Auther.findOne({_id: req.params.id})
            .then(user => {
                let path = `src/resources/public/img/avatars/${req.params.id}`

                let arrPath = [`${path}.png`,`${path}.jpg`,`${path}.jpeg`]

                arrPath.forEach(function (element, index) {
                    //Delete Old Avatar
                    fs.unlink(element, (err) => {
                        return
                    })
                })

                Auther.updateOne({_id: req.params.id}, {avatar: `img/avatars/${req.params.id}.${fileType}`},
                    function (err, result) {
                        if (err) cb(null, file.originalname)
                        else {
                            cb(null, `${req.params.id}.${fileType}`)
                        }
                    }
                )
            }
        )
    }
})
   
const upload = multer({ storage: storage })

router.post('/profile/upload-avatar/:id', upload.single('avatar'), function (req, res, next) {
    res.redirect('/profile')
})

module.exports = router;