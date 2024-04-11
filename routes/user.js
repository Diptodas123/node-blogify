import { Router } from "express";
import { createHmac, randomBytes } from "crypto";
import User from "../models/user.js";

const router = Router();

router.route("/login")
    .get((req, res) => {
        res.render("login");
    })
    .post(async (req, res) => {
        const { email, password } = req.body;

        try {
            const token = await User.matchPasswordAndGenerateToken(email, password);
            res.cookie("token", token);
            res.redirect("/");
        } catch (error) {
            res.locals.error = error.message;
            return res.status(401).render("login");
        }
    });

router.route("/signup")
    .get((req, res) => {
        res.render("signup");
    })
    .post(async (req, res) => {
        console.log(req.body);
        const { fullName, email, password } = req.body;
        await User.create({ fullName, email, password });
        res.redirect("/user/login");
    });

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/user/login");
});

export default router;