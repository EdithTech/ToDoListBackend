import UserModel from "../model/user.js"
import {generateToken} from '../jwt.js'
import userModel from "../model/user.js";

export const addUser = async (req, res) => {
    try{
        const data = req.body;
        const newUser = new UserModel(data);
        const response = await newUser.save();

        const userPayload = {
            id: newUser.id,
            username: newUser.username
        }

        const token = generateToken(userPayload);

        res.status(200).json({response: response, token: token});

    }catch(error){
        console.log("Create User Error", error.message);
    }
}

export const userLogin = async (req, res) => {
    try{
        const {username, password} = req.body;

        // const userId = req.user.id;
        const user = await userModel.findOne({username: username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401),json({error: "Invalid Username or Password"})
        }
        
        const userPayload = {
            id: user.id,
            username: user.username,
        }

        const token = generateToken(userPayload);

        console.log("login token", token);
        return res.status(200).json({token: token});

    }catch(error){
        console.log(error);
        return res.status(401).json({error: "Invalid Token"});
    }
}