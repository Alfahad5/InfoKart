import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Ensure correct import with `.js`

const router = express.Router();

router.post("/register", async (req, res) => { // Fix path typo
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword }); // Fix variable name
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already in use" });
        }
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/login", async (req, res) => { // Fix path typo
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Fix variable name
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // console.log(" Token is In auth.js " + token); // token is correct

        res.cookie("token", token, {
            httpOnly: true,  // Protects from XSS attacks
            secure: false,   // Change to `true` if using HTTPS
            sameSite: "lax",
            path: "/"
        });

        res.json({ token, userId: user._id, role: user.role });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/logout", (req, res) => { // Fix path typo
    res.cookie("token", "", { expires: new Date(0) }).json({ message: "Logged Out" }); // Fix `new Data(0)` to `new Date(0)`
});

export default router; // ✅ Use `export default` for ES Modules