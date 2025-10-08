import mangoose from "mongoose"
const { Schema, models, model } = mangoose

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
    posts: {type: Number, default: 0}
})

const userModel = models.users || model("users", userSchema)

export default userModel

// remove version control _v, remove password and also convert _id to id
// userSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     delete ret.password;
//     return ret;
//   }
// })


// ***********schema cleaner function export *******
//  const cleanSchema = (schema, options = { hidePassword: true }) => {
//   schema.set("toJSON", {
//     transform: (doc, ret) => {
//       ret.id = ret._id;
//       delete ret._id;
//       delete ret.__v;

//       // 👇 Only delete password if option is true
//       if (options.hidePassword && ret.password) {
//         delete ret.password;
//       }

//       return ret;
//     }
//   });
// };




