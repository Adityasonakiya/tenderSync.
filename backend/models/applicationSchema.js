import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  amount: { 
    type: Number,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isLateBid: { 
    type: Boolean, 
    default: false 
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Bidder"],
      required: true,
    },
  },
  tenderManagerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Tender Manager"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
