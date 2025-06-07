//   id string pk
//   owner ObjectId users
//   videos ObjectId[] videos
//   name string
//   description string
//   createdAt Date
//   updatedAt Date

import mongoose, { Schema } from "mongoose";

const playListSchema = new Schema({
     owner: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
     },
     videos: [{
          type: Schema.Types.ObjectId,
          ref: "Video",
     }],
     name: {
          type: String,
          required: true,
          trim: true,
          index: true
     },
     description: {
          type: String,
          required: true,
     }
},{
     timestamps: true
})

export default mongoose.model("Playlist", playListSchema)