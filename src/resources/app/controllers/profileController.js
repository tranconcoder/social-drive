const Auther = require('../../models/auther')

class Profile {
    profilePage (req, res, next) {
        const User = req.user
        res.render('profile', User)
    }

    profileUpdate (req, res, next) {
        Auther.updateOne({_id: req.body.id}, {
            name: req.body.name, 
            gmail: req.body.gmail,
        }, function (err) {
            if (err) res.send('Can\'t update!!!')
            else {
                Auther.findById(req.body.id, function (err, user) {
                    if (err) res.send('Can\'t find this Auther!!!')
                    else {
                        user = Object.assign({}, user._doc, {message: 'Thông tin đã được cập nhật!'})
                        res.render('profile', user)
                    }
                    
                })
            }
        })
    }
}

module.exports = new Profile