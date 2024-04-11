import User from "../models/user.js";

const handleLoginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie("token", token);
        res.redirect("/");
    } catch (error) {
        res.locals.error = error.message;
        return res.status(401).render("login");
    }
}

const handleSignupPost = async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({ fullName, email, password });
    res.redirect("/user/login");
};

export { handleLoginPost, handleSignupPost };