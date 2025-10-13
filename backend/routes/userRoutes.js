import express from "express"
import { registerUser, loginUser, changeAvatar, editUser, getUser, getAuthors } from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js"
import uploadImage from "../utilis/multer.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/:id", getUser)
userRouter.get("/", getAuthors)
userRouter.post("/change-avatar", authMiddleware, uploadImage.single("avatar"), changeAvatar)
userRouter.patch("/:id", authMiddleware, editUser)


export default userRouter









// ERROR HANDLING...LOOK AT IT AND ADD TO THE CODE BASE
// have a look at cloudinary for cloud image upload