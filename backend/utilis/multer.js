import multer from "multer"
import cloudinary from "../config/cloudinary.js"
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    //default folder
    let folder = 'Postly/general_uploads'

    // dynamically set folder base on route
    if(req.baseUrl.includes('post')) folder = 'Postly/blog_posts'
    if(req.baseUrl.includes('user')) folder = 'Postly/blog_profiles'

    return {
      folder,
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [{quality: 'auto', fetch_format: 'auto'}]
    }
  }
})

const uploadImage = multer({ storage })

export default uploadImage