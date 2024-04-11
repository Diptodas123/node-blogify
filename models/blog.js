import { Schema, model } from "mongoose";
const blogSchema = new Schema({

}, { timestamps: true });

const Blog = model("Blog", blogSchema);
export default Blog;