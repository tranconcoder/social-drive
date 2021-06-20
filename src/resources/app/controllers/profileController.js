const Auther = require('../../models/auther')

class Profile {
    profilePage (req, res, next) {
        const User = req.user
        res.render('profile', User)
    }

    profileUpdate (req, res, next) {

    }
}

module.exports = new Profile