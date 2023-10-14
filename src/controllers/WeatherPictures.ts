import cloudinary from "cloudinary";
import { Request, Response } from "express";
import { PicturesInfo } from "../config/db"

export const uploadWeatherInfo = async (req: Request, res: Response) => {
  try {
    
    const result = await cloudinary.v2.uploader.upload(req.file?.path || "", {
        folder: "weather-app"
    });

    
    const newPictureInfo = new PicturesInfo({
      link: result.secure_url,
      username: req.body.username, 
      location: req.body.location, 
      likes: 0, 
    });

    
    await newPictureInfo.save();

    
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
    const pictureInfo = await PicturesInfo.findById(req.body.id);

    
    if (!pictureInfo) {
      res.status(404).json({ error: "Picture not found" });
      return;
    }

    
    pictureInfo.likes = (pictureInfo.likes || 0) + 1;
    
    
    await pictureInfo.save();
    
    
    res.json(pictureInfo);
  } catch (error) {
    console.error("Error updating picture likes:", error);
    res.status(500).json({ error: "Failed to update picture likes" });
  }
};

export const removePictureLikes = async (req: Request, res: Response) => {
  try {
    const pictureInfo = await PicturesInfo.findById(req.body.id);

    
    if (!pictureInfo) {
      res.status(404).json({ error: "Picture not found" });
      return;
    }

    
    pictureInfo.likes = (pictureInfo.likes || 1) - 1;
    
    
    await pictureInfo.save();
    
    
    res.json(pictureInfo);
  } catch (error) {
    console.error("Error updating picture likes:", error);
    res.status(500).json({ error: "Failed to update picture likes" });
  }
};