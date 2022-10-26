const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");
const post = require("./models/Post");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/publications");
const profileRoutes = require("./routes/profile");

mongoose
    .connect(
        "mongodb+srv://souky:Gasper123@cluster0.zio6toi.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/profile", profileRoutes);

module.exports = app;