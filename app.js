import express from "express";
import path from "path";
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";
import connectDB from "./database/connect.js";
import cookieParser from "cookie-parser";
import checkForAuthenticationCookie from "./middlewares/authentication.js";
import Blog from "./models/blog.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

connectDB(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})