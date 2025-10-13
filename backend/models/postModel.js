import mongoose from "mongoose"
import { type } from "os"
const { model, models, Schema } = mongoose

const postSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    imageId: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: "users"},
    category: {
        type: String,
        enum: {
            values: ["Farming", "Business", "Education", "Lifestyle", "Art", "Tech", "Health", "Politics", "Sports", "Uncategorized"],
            message: "{VALUE} is not supported category"
        }
    }
}, {timestamps: true})

const postModel =  models.posts || model("posts", postSchema)

export default postModel