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
            const user = await User.matchPassword(email, password);
            console.log(user);
        } catch (err) {
            console.log(err);
            res.redirect("/user/login");
        }

        return res.redirect("/");
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

export default router;