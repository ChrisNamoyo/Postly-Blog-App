import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import cloudinary from "../config/cloudinary.js"


const default_profile_url = "https://res.cloudinary.com/dz5cingki/image/upload/v1760303994/default_llsuwf.jpg"
const default_profile_id = "default_llsuwf"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password, confirmPassword} = req.body
        if(!name || !email || !password || !confirmPassword) {
            return res.json({success: false, message: "Fill all fields"})
        }
        const newEmail = email.toLowerCase()
        const exists = await userModel.findOne({email: newEmail})
        if(exists) {
            return res.json({success: false, message: "User already exists"})
        }
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }
        if(password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"})
        }
        if(password !== confirmPassword) {
            return res.json({success: false, message: "Password don't match"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: newEmail,
            password: hashedPassword,
            avatarUrl: default_profile_url,
            avatarId: default_profile_id
        })

        const user = await newUser.save()
        const token = createToken(user._id) 
        const userData = user.toObject()
        delete userData.password

        res.json({success: true, message: "User registered successfully", token, user: userData })

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error! Couldn't register user"})
    }
}


const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const newEmail = email.toLowerCase()
        const user = await userModel.findOne({email: newEmail})
        if(!user) {
            return res.json({success: false, message: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.json({success: false, message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        const userData = user.toObject()
        delete userData.password

        res.json({success: true, token, user: userData})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error! Couldn't login user"})
    }
}


const changeAvatar = async (req, res) => {
    try {
        const userId = req.userId
        const newAvatarUrl = req.file?.path || default_profile_url
        const newAvatarId = req.file?.filename || default_profile_id

        if(!userId) {
            return res.json({success: false, message: "Unauthorized Id. Login again"})
        }
        
        const user = await userModel.findById(userId)

        if(user.avatar && user.avatar !== default_profile_url) {
            await cloudinary.uploader.destroy(user.avatarId)
        }

        user.avatarUrl = newAvatarUrl
        user.avatarId = newAvatarId
        await user.save()

        const updatedUser = user.toObject()
        delete updatedUser.password

        res.json({success: true, message: "Avatar updated", updatedUser})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Failed to update avatar"})
    }
}


const editUser = async (req, res) => {
    try {   
        const {name, email, currentPassword, newPassword, newConfirmPassword} = req.body
        if(!name || !email || !currentPassword || !newPassword || !newConfirmPassword) {
            return res.json({success: false, message: "Fill all fields"})
        }
        const user = await userModel.findById(req.userId)
        if(!user) {
            return res.json({success: false, message: "User not found"})
        }
        
        if(email !== user.email) {
            const emailExist = await userModel.findOne({email})

            if(emailExist && emailExist._id.toString() !== req.userId) {
                return res.json({success: false, message: "Email already exist"})
            }
        }
    
        const validatePassword = await bcrypt.compare(currentPassword, user.password)
        if(!validatePassword) {
            return res.json({success: false, message: "Invalid current password"})
        }
    
        if(newPassword !== newConfirmPassword) {
            return res.json({success: false, message: "New password do not match"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
    
        const newInfo = 
            await userModel.findByIdAndUpdate(req.userId, {name, email, password: hashedPassword}, {new: true}).select('-password')
        const userData = newInfo.toObject()

        return res.json({success: true, message: "User updated", userData})

    } catch (error) {
        console.log("Edit user error:", error)
        return res.json({success: false, message: "Server Error"})
    }
}


const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await userModel.findById(id).select('-password')
        if(!user) {
            return res.json({success: false, message: "User not found"})
        }
    
        return res.json({success: true, message: "User fetched successfully", user})

    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Server Error"})
    }
}


const getAuthors = async (req, res) => {
    try {
        const authors = await userModel.find().select('-password')
        return res.json({success: true, authors})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Server Error"})
    }
}



export {registerUser, loginUser, changeAvatar, editUser, getUser, getAuthors}