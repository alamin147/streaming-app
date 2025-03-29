import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const SCOPE = ["https://www.googleapis.com/auth/drive.file"];

const apikeys = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

export const authorizeFunction = async () => {
  if (!apikeys.client_email || !apikeys.private_key) {
    throw new Error("Missing Google API credentials. Check ENV variables.");
  }

  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    undefined,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
};

export const uploadFile = async (
  authClient: any,
  filePath: string,
  fileName: string,
  folderId: string,
  types: ["image" | "video"]
): Promise<any> => {
  const drive = google.drive({ version: "v3", auth: authClient });

  if (!folderId) {
    throw new Error("Missing GOOGLE_FOLDER_ID in environment variables.");
  }

  const fileMetaData = {
    name: fileName,
    parents: [folderId],
  };

  const media = {
    mimeType: `${types}/*`,
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await drive.files.create({
      requestBody: fileMetaData,
      media: media,
      fields: "id",
    });

    console.log("Uploaded file ID:", response.data.id);
    return response.data;
  } catch (error) {
    console.error("Google Drive Upload Error:", error);
    throw new Error("Failed to upload file to Google Drive.");
  }
};

export const deleteFile = async (authClient: any, fileId: string) => {
  const drive = google.drive({ version: "v3", auth: authClient });
  await drive.files.delete({ fileId });
};
