import mongoose from "mongoose";

// Define the MongoDB connection URL
const dbURL = "mongodb://127.0.0.1:27017/weather-app";

// Don't wanna lose my streak lol

// Establish the MongoDB connection
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Define the schema for the PicturesInfo collection
const picturesInfoSchema = new mongoose.Schema({
  link: String,
  username: String,
  location: String,
  likes: Number,
});

// Create a model for the PicturesInfo collection
const PicturesInfo = mongoose.model("PicturesInfo", picturesInfoSchema);

export { PicturesInfo };
