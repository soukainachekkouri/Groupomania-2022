const auth = require("auth");
const router = require("./user");

router.get("/", auth, multer, stuffCtrl.createPost);
router.get("/", auth, stuffCtrl.findPosts);
router.get("/:id", auth, stuffCtrl.findOnePost);
router.put("/:id", auth, multer, stuffCtrlr.updateOnePost);
router.delete("/:id", auth, stuffCtrl.deleteOnePost);
router.post("/:id/like", auth, sauceController.like);