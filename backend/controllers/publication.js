const Post = require("../models/Post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const posts = JSON.parse(req.body.post);
    const newPost = new Post({
        ...posts,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
        date: new Date(),
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
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        } :
        {...req.body };

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId._id.toString() !== postObject.userId) {
                res.status(401).json({ message: "Non-autorisé" });
            } else {
                Post.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Objet modifié" }))
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            //je récupère le nom de l'image
            const fileName = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${fileName}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "objet supprimé!" }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
    //il faut supprimer les images en même temps
};

exports.like = (req, res, next) => {
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