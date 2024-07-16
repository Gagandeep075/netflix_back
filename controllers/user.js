const { model } = require('mongoose');
const {user, User} = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const Login = async(req,res) =>{
    try {
        const {Email, Password} = req.body;
        if(!Email || !Password){
            return res.status(401).json({
                message:"Invalid data",
                success: false
            })
        };
        const user = await User.findOne({Email});
        if(!user) {
            return res.status(401).json({
                message:"Invalid email or Password",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(Password, user.Password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email or Password",
                success: false
            });
        }
        const tokenData = {
            id:user._id
        }
        const token = await jwt.sign(tokenData, "alhgalgaslghalkshdg", {expiresIn:"1d"});
        
        return res.status(200).cookie("token", token, {httpOnly:true}).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

const Logout = async(req,res) => {
    return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
        message: "user Logged out successfully",
        success: true
    })
}


const Register = async(req,res) => {
    try {
        const {fullName, Email, Password} = req.body;
        if(!fullName || !Email || !Password){
            return res.status(401).json({
                message: "Invalid Data",
                success: false
            })
        }
        const user = await User.findOne({Email});
        if(user){
            return res.status(401).json({
                message:"The Email is already used",
                success:false
            })
        }

        const hashedPassword = await bcryptjs.hash(Password,16);
        await User.create({
            fullName,
            Email,
            Password: hashedPassword
        });

        return res.status(201).json({
            message:"Account Created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {Register,Login, Logout};