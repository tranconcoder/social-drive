const auther            = require('../../models/auther')

class APIController{
    register = {
        // [POST] api/register/check-username
        checkUsername (req, res, next) {
            auther.findOne({username: req.body.username}, (err, result) => {
                if (err) {res.json('"error": "error"')}
                else {
                    if (result) {res.json(true)}
                    else {res.json(false)}
                }
            })
        }
    }
}

module.exports = new APIController