const db = require("../models");
const User = db.user;
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class UserController {
    async getAll(req, res) {
        try {
            const users = await User.findAll({});
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Lỗi: " + error });
        }
    }

    async googleLogin(req, res) {
        try {
            console.log("Received Google Login Request:", req.body);
            const { credential } = req.body;
            if (!credential) return res.status(400).json({ error: "Missing token" });

            // Xác thực token Google
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const { sub, name, email, picture } = payload;

            // Kiểm tra xem user đã tồn tại chưa
            let user = await User.findOne({ where: { google_id: sub } });

            if (user) {
                // Cập nhật thông tin nếu user đã tồn tại
                await user.update({ name, gmail: email, avatar: picture });
            } else {
                // Nếu chưa có user, tạo mới
                user = await User.create({
                    google_id: sub,
                    name,
                    gmail: email,
                    avatar: picture,
                });
            }

            // Tạo token JWT
            const token = jwt.sign({ id: user.id, google_id: sub }, JWT_SECRET, {
                expiresIn: "7d",
            });
            console.log(res);
            res.json({ message: "Login successful", token, user });
        } catch (error) {
            console.error("Google Login Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = new UserController();
