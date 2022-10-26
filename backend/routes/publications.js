const auth = require("./../middleware/auth");
const express = require("express");
const router = express.Router();
const multer = require("./../middleware/multer-config");
const stuffCtrl = require("./../controllers/publication");

router.post("/", auth, multer, (req, res, next) => {
    console.log(req.body.description);
    res.status(200).json({ message: "test" });
});
router.get("/", auth, stuffCtrl.findPosts);
router.get("/:id", auth, stuffCtrl.findOnePost);
router.put("/:id", auth, multer, stuffCtrl.updateOnePost);
router.delete("/:id", auth, stuffCtrl.deleteOnePost);
router.post("/:id/like", auth, stuffCtrl.like);

module.exports = router;