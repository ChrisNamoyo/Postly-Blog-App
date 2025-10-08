import postModel from "../models/postModel.js"
import userModel from "../models/userModel.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const createPost = async (req, res) => {
    try {
        const {title, description, category} = req.body
        if(!title || !description || !category || !req.file) {
            return res.json({success: false, message: "Fill in all fields and choose thumbnail"})
        }

        const thumbnail = req.file?.filename

        const newPost = await postModel.create({title, description, category, thumbnail, creator: req.userId})
        if(!newPost) {
            return res.json({success: false, message: "Post wasn't created"})
        }

        const updatedUser = await userModel.findByIdAndUpdate(req.userId, {$inc: {posts: 1}}, {new: true})
        if(!updatedUser) {
            return res.json({success: false, message: "User posts count wasn't updated"})
        }

        return res.json({success: true, message: "New post created"}, newPost)
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Post wasn't created, server error"})
    }
}


const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find().sort({updatedAt: -1}).populate("creator", "name avatar _id")
        return res.json({success: true, posts})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Couldn't fetch posts, server error"})
    }
}


const getPost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await postModel.findById(id)
            .populate("creator", "name avatar _id")
        if(!post) {
            return res.json({success: false, message: "Post wasn't found"})
        }
        return res.json({success: true, message: "Post fetched successfully", post})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Couldn't fetch posts, server error"})
    }
}


const getCategoryPosts = async (req, res) => {
    try {
        const {category} = req.params
        const posts = await postModel.find({category}).sort({createdAt: -1})
            .populate("creator", "name avatar _id")
        return res.json({success: true, posts})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Couldn't fetch posts, server error"}) 
    }
}


const getUserPost = async (req, res) => {
    try {
        const {id} = req.params
        const posts = await postModel.find({creator: id}).sort({createdAt: -1})
            .populate("creator", "name avatar _id")
        return res.json({success: true, posts})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Couldn't fetch posts, server error"})
    }
}


const editPost = async (req, res) => {
    try {
        const {title, category, description} = req.body
        const {id} = req.params
        const thumbnail = req.file?.filename

        if(!title || !category || description.length < 12) {
            return res.json({success: false, message: "Fill in all fields"})
        }

        const post = await postModel.findById(id)
        if (!post) {
            return res.json({ success: false, message: "Post not found" })
        }

        if (post.creator.toString() !== req.userId) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        if(!req.file) {
            const updatePost = await postModel.findByIdAndUpdate(id, {title, category, description}, {new: true})
            return res.json({ success: true, message: "Post edited", updatePost })
        }

        if(post.thumbnail) {
            const oldPath = path.join(__dirname, "..", "uploads", post.thumbnail)
            fs.unlink(oldPath, (err) => {
                if(err) {
                    console.log("Failed to delete old thumbnail", err.message)
                }
            })
        }

        post.title = title
        post.category = category
        post.description = description
        post.thumbnail = thumbnail

        const updatePost = await post.save()

        return res.json({success: true, message: "Post edited", updatePost})
        
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Couldn't edit posts, server error"})
    }
}


const deletePost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await postModel.findById(id)

        if(!post) {
            return res.json({success: false, message: "Post wasn't found"})
        }

        if(req.userId !== post.creator.toString()) {
            return res.json({success: false, message: "Unauthorized"})
        }

        if(post.thumbnail) {
            const oldPath = path.join(__dirname, "..", "uploads", post.thumbnail)
            fs.unlink(oldPath,(err) => {
                if(err) {
                    console.log("Couldn't delete post's thumbnail")
                }
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(req.userId, {$inc: {posts: -1}}, {new: true})
        if(!updatedUser) {
            return res.json({success: false, message: "User posts count wasn't updated"})
        }

        await postModel.findByIdAndDelete(id)
        return res.json({success: true, message: "Post deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Couldn't delete posts, server error"})
    }
}



export {createPost, getPosts, getPost, getCategoryPosts, getUserPost, editPost, deletePost}