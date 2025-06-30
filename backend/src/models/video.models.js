import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    publicId: {
      thumbnail: { type: String, default: null },
      video: { type: String, default: null },
    },
    encodingStatus: {
      type: String,
      enum: ["pending", "processing", "ready"],
      default: "pending",
    },
    hls: {
      masterUrl: String,
      resolutions: {
        "1080p": { playlistUrl: String, count: Number, size: Number },
        "720p": { playlistUrl: String, count: Number, size: Number },
        "360p": { playlistUrl: String, count: Number, size: Number },
      },
    },
    metaData: {
      estimatedDuration: {
        type: Number,
      },
      encodeResults: [
        {
          name: {
            type: String,
          },
          encodeTime: {
            type: Number,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);

export default mongoose.model("Video", videoSchema);
