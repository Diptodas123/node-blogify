import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

const handleBlogPost = async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
        title,
        body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    });
    return res.redirect(`/blog/${blog._id}`);
}

const handleSingleBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments=await Comment.find({blogId:blog._id}).populate("createdBy");
    res.render("blog", {
        blog,
        user: req.user,
        comments
    })
}

const handleBlogCommentPost = async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    });
    return res.redirect(`/blog/${req.params.blogId}`);
}

export { handleBlogPost, handleSingleBlog, handleBlogCommentPost };