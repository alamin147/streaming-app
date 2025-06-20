export const uploadToCloudinary = async (file: File, type: "video" | "image") => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUD_FOLDER;
  const url = `${import.meta.env.VITE_CLOUDINARY_URL}/${cloudName}/${type}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Cloudinary upload error:", err);
    throw new Error(`${type} upload failed`);
  }

  const data = await res.json();
  return data.secure_url;
};
