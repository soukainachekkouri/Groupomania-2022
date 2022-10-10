const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');
const post = require('./models/Post');
const Post = require('./models/Post');



const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://souky:Gasper123@cluster0.zio6toi.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/post', (req, res, next) => {
    delete req.body._id;
    const post = new Post({
        ...req.body
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/post/:d', (req, res, next) => {
    Post.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json)({ error });
})

app.delete('/api/post/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
})

app.get('/api/post/:id', (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

app.get('/api/post', (req, res, next) => {
    Post.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

app.use((req, res, next) => {
    res.status(201);
    next();
});



app.use('/api/auth', userRoutes);

module.exports = app;