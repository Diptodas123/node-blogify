import { Router } from "express";
import multer from "multer";
import path from "path";
import { handleBlogPost, handleSingleBlog, handleBlogCommentPost } from "../controller/blog.js";
const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.route("/add-blog")
    .get((req, res) => {
        res.render("addBlog", {
            user: req.user
        });
    })
    .post(upload.single("coverImage"), handleBlogPost);

router.get("/:id", handleSingleBlog);
router.post("/comment/:blogId", handleBlogCommentPost);

export default router;