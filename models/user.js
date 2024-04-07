import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: "/images/avatar.jpg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return;
    }

    // Generate a salt
    const salt = randomBytes(16).toString();

    // Hash the password with the salt
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    // Add the salt and hashed password to the user object
    this.salt = salt;
    this.password = hashedPassword;

    next();
});

userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    };

    const salt = user.salt;

    // Hash the user provided password with the salt
    const userProvidedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    // Compare the hashed password with the one stored in the database
    if (userProvidedPassword !== user.password) {
        throw new Error("Incorrect password");
    }
    return { ...user._doc, password: undefined, salt: undefined };
});

const User = model("User", userSchema);
export default User;