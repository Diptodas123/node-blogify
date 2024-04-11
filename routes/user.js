import { Router } from "express";
import {handleLoginPost, handleSignupPost} from "../controller/login.js";

const router = Router();

router.route("/login")
    .get((req, res) => {
        res.render("login");
    })
    .post(handleLoginPost);

router.route("/signup")
    .get((req, res) => {
        res.render("signup");
    })
    .post(handleSignupPost);

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/user/login");
});

export default router;