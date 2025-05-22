import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadFile = async (
  path: string,
  fileName: string,
  type: "vid" | "img"
) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  try {

    if (type == "vid") {
      const uploadResult = await cloudinary.uploader.upload(path, {
        public_id: fileName,
        folder: process.env.CLOUDINARY_FOLDER,
        resource_type: "video",
        eager: [{ format: "m3u8", streaming_profile: "hd" }],
    });

    return uploadResult;
} else {
    const uploadResult = await cloudinary.uploader.upload(path, {
        folder: process.env.CLOUDINARY_FOLDER,
        public_id: fileName,
      });

      return uploadResult;
    }
  } catch (error) {
    console.error("Upload Error:", error);
  } finally {
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Failed to delete local file: ${path}`, err);
      } else {
        console.log(`Successfully deleted local file: ${path}`);
      }
    });
  }

  return null;
};
