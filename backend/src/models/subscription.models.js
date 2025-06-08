import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
     subscriber: {
          type: Schema.Types.ObjectId,  // The user who is subscribing
          ref: "User",
     },
     channel: {
          type: Schema.Types.ObjectId,   // The user being subscribed to (the channel)
          ref: "User",
          required: true
     }
},{
     timestamps: true
})

export default mongoose.model("Subscription", subscriptionSchema);