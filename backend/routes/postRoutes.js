import express from "express"
import authMiddleware from "../middleware/auth.js"
import { uploadImage } from "../utilis/multerConfig.js"
import { createPost, getPosts, getCategoryPosts, getUserPost, editPost, deletePost, getPost } from "../controllers/postController.js"

const postRouter = express.Router()

postRouter.post("/", authMiddleware, uploadImage.single("thumbnail"), createPost)
postRouter.get("/", getPosts)
postRouter.get("/users/:id", getUserPost)
postRouter.get("/:id", getPost)
postRouter.patch("/:id", authMiddleware, uploadImage.single("thumbnail"), editPost)
postRouter.delete("/:id", authMiddleware, deletePost)
postRouter.get("/categories/:category", getCategoryPosts)


export default postRouter
