import UserModel from "../model/user.js";
import { generateToken } from '../jwt.js';
import userModel from "../model/user.js";

export const addUser = async (req, res) => {
    try {
        const data = req.body;
        const newUser = new UserModel(data);
        const response = await newUser.save();

        res.status(200).json({ response: response });
    } catch (error) {
        console.error("Create User Error:", error.message);
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid Username or Password" });
        }

        const userPayload = {
            id: user.id,
            username: user.username,
        };

        const token = generateToken(userPayload);

        console.log("Login token:", token);
        return res.status(200).json({ userId: user.id, token: token });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ message: 'Failed to log in', error: error.message });
    }
};
