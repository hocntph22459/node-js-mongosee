import User from "../models/user"
import { signinShema, signupShema } from "../schemas/schemaUser";
import bcrypt from "bcryptjs"
import { jwt } from "jsonwebtoken";
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        const userexit = await User.findOne({ email })
        if (userexit) {
            return res.status(400).json({
                message: "user đã tồn tại"
            })
        } else {
            const { error } = signupShema.validate(req.body, { abortEarly: false })
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(401).json({
                    message: errors,
                });
            }
            // tạo mật khẩu có những kí tự link tink
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            // không show mật khẩu khi dky
            user.password = undefined;
            return res.status(200).json({
                message: "đăng ký thành công",
                data: user
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }

}
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate
        const { error } = signinShema.validate({ email, password }, { abortEarly: false });
        if (error) {
            const errors = error.details.map((error) => error.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Tài khoản không tồn tại" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không khớp" });
        }

        const token = jwt.sign({ _id: user._id }, "123456");

        user.password = undefined;

        res.status(200).json({
            data: user,
            accessToken: token,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.errors[0] });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}
