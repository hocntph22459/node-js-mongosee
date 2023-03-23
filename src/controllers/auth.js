import User from "../models/user"
import { signinShema } from "../schemas/schemaUser";
import bcrypt from "bcryptjs"
export const signin = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        const userexit = await User.findOne({ email })
        if (userexit) {
            return res.status(400).json({
                message: "user đã tồn tại"
            })
        } else {
            const { error } = signinShema.validate(req.body, { abortEarly: false })
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(401).json({
                    message: errors,
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });

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