import express from "express";
import path from "path";
import userRoute from "./routes/user.js";
import connectDB from "./database/connect.js";

const PORT = 8000;
const app = express();

connectDB("mongodb://127.0.0.1:27017/blogify");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.render("home");
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})