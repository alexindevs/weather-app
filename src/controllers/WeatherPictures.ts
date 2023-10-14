import cloudinary from "cloudinary";
import { Request, Response } from "express";
import { PicturesInfo } from "../config/db";


export const uploadWeatherInfo = async (req: Request, res: Response) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file?.path || "", {
        folder: "weather-app"
    });

    // Create a new document to save in your MongoDB collection
    const newPictureInfo = new PicturesInfo({
      link: result.secure_url, // Cloudinary image URL
      username: req.body.username, // Assuming username is in the request body
      location: req.body.location, // Assuming location is in the request body
      likes: 0, // You can set an initial value for likes
    });

    // Save the document to your MongoDB collection
    await newPictureInfo.save();

    // Respond with a success message or the saved document
    res.json({ message: "Image uploaded and data saved successfully", picture: newPictureInfo });
  } catch (error) {
    console.error("Error uploading image and saving data:", error);
    res.status(500).json({ error: "Failed to upload image and save data" });
  }
};

export const fetchAllPicturesInfo = async (req: Request, res: Response) => {
  try {
    const picturesInfo = await PicturesInfo.find();
    res.json(picturesInfo);
  } catch (error) {
    console.error("Error fetching all pictures info:", error);
    res.status(500).json({ error: "Failed to fetch all pictures info" });
  }
}

export const fetchPictureInfo = async (req: Request, res: Response) => {
  try {
    const pictureInfo = await PicturesInfo.findById(req.params.id);
    res.json(pictureInfo);
  } catch (error) {
    console.error("Error fetching picture info:", error);
    res.status(500).json({ error: "Failed to fetch picture info" });
  }
}

export const getPicturesByLocation = async (req: Request, res: Response) => {
  try {
    const picturesInfo = await PicturesInfo.find({ location: req.params.location });
    res.json(picturesInfo);
  } catch (error) {
    console.error("Error fetching pictures by location:", error);
    res.status(500).json({ error: "Failed to fetch pictures by location" });
  }
}


export const updatePictureLikes = async (req: Request, res: Response) => {
  try {
    const pictureInfo = await PicturesInfo.findById(req.params.id);

    // Check if the document was found
    if (!pictureInfo) {
      res.status(404).json({ error: "Picture not found" });
      return;
    }

    // Update the likes property
    pictureInfo.likes = (pictureInfo.likes || 0) + 1;
    
    // Save the updated document
    await pictureInfo.save();
    
    // Respond with the updated picture info
    res.json(pictureInfo);
  } catch (error) {
    console.error("Error updating picture likes:", error);
    res.status(500).json({ error: "Failed to update picture likes" });
  }
};
