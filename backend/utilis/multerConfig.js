import multer from "multer"

const limits = {
  fileSize: 5 * 1024 * 1024
}

const imageStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const imageFileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only image files are allowed"), false);
}

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits
})