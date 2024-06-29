import mongoose from "mongoose";

const tenderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [3, "Description must contain at least 3 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [3, "Location must contian at least 3 characters!"],
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  bufferTime: { type: Number, required: true },  //in minutes
  expired: {
    type: Boolean,
    default: false,
  },
  lowest:{
    type: Number,
    default: null,
  },
  tenderPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Tender = mongoose.model("Tender", tenderSchema);
