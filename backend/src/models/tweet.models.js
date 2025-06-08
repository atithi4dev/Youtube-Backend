import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
     owner: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
     },
     content: {
          type: String,
          required: true,
          trim: true,
     }
     }, {
     timestamps: true
})

export default mongoose.model("Tweet", tweetSchema);