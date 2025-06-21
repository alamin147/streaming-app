export const uploadToCloudinary = async (
  file: File,
  type: "video" | "image",
  onProgress?: (progress: number) => void
) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const folder = import.meta.env.VITE_CLOUD_FOLDER;
  const url = `${import.meta.env.VITE_CLOUDINARY_URL}/${cloudName}/${type}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
    }

    xhr.open("POST", url, true);

    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.secure_url);
      } else {
        console.error("Cloudinary upload error:", xhr.statusText);
        reject(new Error(`${type} upload failed`));
      }
    };

    xhr.onerror = function() {
      console.error("Cloudinary upload network error");
      reject(new Error("Network error during upload"));
    };

    xhr.send(formData);
  });
};
