import express from "express";
import path from "path";
import userRoute from "./routes/user.js";
import connectDB from "./database/connect.js";
import cookieParser from "cookie-parser";
import checkForAuthenticationCookie from "./middlewares/authentication.js";

const PORT = 8000;
const app = express();

connectDB("mongodb://127.0.0.1:27017/blogify");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.render("home",{
        user: req.user
    });
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})