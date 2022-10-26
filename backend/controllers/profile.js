const User = require("../models/Profile");

exports.profile = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user == null) {
            res.status(404).json({ message: "Something went wrong" });
        } else {
            (user.name = req.body.name), (user.email = req.body.email);
        }
    });
};