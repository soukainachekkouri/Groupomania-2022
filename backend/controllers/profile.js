const User = require("../models/User");

exports.profile = (req, res) => {
    User.findOne({ _id: req.params.userId }).then((user) => {
        if (user == null) {
            res.status(404).json({ message: "Something went wrong" });
        } else {
            console.log(user);
            res.status(200).json(user);
        }
    });
};