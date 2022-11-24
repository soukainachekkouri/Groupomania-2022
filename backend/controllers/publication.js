const Post = require("../models/Post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
    console.log("creation");
    let posts = {
        message: req.body.description,
        userId: req.body.userId,
    };
    let imageFile = req.files ? req.files[0] : undefined;
    if (imageFile) {
        posts.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      imageFile.filename
    }`;
    }
    const newPost = new Post({
        ...posts,
        datePost: new Date(),
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    newPost
        .save()
        .then(() => res.status(201).json({ message: "Objet enregistré !" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.findPosts = (req, res, next) => {
    Post.find()
        .sort({ datePost: -1 })
        .then(function(posts) {
            res.status(200).json(posts);
        })
        .catch(function(error) {
            res.status(400).json({ error });
        });
};

exports.findOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(function(post) {
            res.status(200).json(post);
        })
        .catch((error) => res.status(400).json(error));
};

exports.updateOnePost = (req, res, next) => {
    let data = {
        message: req.body.description,
        userId: req.body.userId,
    };
    let imageFile = req.files ? req.files[0] : undefined;
    if (imageFile) {
        data.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      imageFile.filename
    }`;
    }
    Post.findByIdAndUpdate(
        req.params.id, { $set: data }, { new: true },
        (error, result) => {
            if (!error) {
                res.status(200).json(result);
            } else {
                res.status(500).json(error);
            }
        }
    );
};

exports.deleteOnePost = (req, res, next) => {
    console.log(req.params.id);
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            //je récupère le nom de l'image
            if (post.imageUrl) {
                const fileName = post.imageUrl.split("/images/")[1];
                fs.unlink(`images/${fileName}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "objet supprimé!" }))
                        .catch((error) => res.status(400).json({ error }));
                });
            } else {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "objet supprimé!" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
        });
    //il faut supprimer les images en même temps
};

exports.like = (req, res, next) => {
    console.log("like");
    Post.findOne({ _id: req.params.id }).then((post) => {
        if (req.body.like === 1) {
            //= je like
            // je vérifie que l'utilisateur n'a pas déjà liké
            let index = post.usersLiked.indexOf(req.body.userId);
            //id pas présente
            if (!index > -1) {
                post.likes++;
                post.usersLiked.push(req.body.userId);
            }
        } else if (req.body.like === 0) {
            //id présente = on annule le like
            let index = post.usersLiked.indexOf(req.body.userId);
            if (index > -1) {
                if (post.likes > 0) {
                    post.likes--;
                }
                post.usersLiked.splice(index, 1);
            }
        } else {
            //je dislike
            if (post.likes > 0) {
                post.likes--;
            }

            let indexDislike = post.usersDisliked.indexOf(req.body.userId);
            if (!indexDislike > -1) {
                post.dislikes++;
                post.usersDisliked.push(req.body.userId);
            }

            //Je vérifie s'il avait déjà liké
            let index = post.usersLiked.indexOf(req.body.userId);
            if (index > -1) {
                post.usersLiked.splice(req.body.userId);
            }
        }

        Post.updateOne({ _id: req.params.id }, post)
            .then(() => res.status(201).json({ message: "Objet modifié" }))
            .catch((error) => res.status(500).json({ error }));
    });
};