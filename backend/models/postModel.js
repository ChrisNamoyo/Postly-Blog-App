import mongoose from "mongoose"
const { model, models, Schema } = mongoose

const postSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
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