const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = (req, res, next) => {
    //je crypte le mdp
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                password: hash,
                isAdmin: req.body.isAdmin,
            });
            user
                .save()
                .then(() => res.status(201).json({ message: "Utilisateur créé!" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log(req.body.email);
    User.findOne({ email: req.body.email })
        .then((user) => {
            //vérifier si la valeur trouvée est nulle (user inexistant)
            if (user === null) {
                res
                    .status(401)
                    .json({ message: "Adresse mail ou mot de passe incorrect" });
            } else {
                //comparer les mdp
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res
                                .status(401)
                                .json({ message: "Adresse mail ou mot de passe incorrect" });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                                    expiresIn: "24h",
                                }),
                                isAdmin: user.isAdmin,
                            });
                        }
                    })
                    .catch((error) => {
                        // erreur de traitement
                        res.status(500).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};