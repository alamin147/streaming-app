import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/firebase/Firebase";
import axios from "axios";
import { Button } from "../ui/button";

export default function VideoUploadModal({
  isOpen,
  setIsOpens,
}: {
  isOpen: boolean;
  setIsOpens: (open: boolean) => void;
}) {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const handleChange = (e: any) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file: any, urlType: any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };
  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    setIsOpens(false);
    // res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 relative">
          {/* Close button */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
            onClick={() => setIsOpens(false)}
          >
            X
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Upload Video
          </h2>

          <div className="space-y-4">
            {/* Image Upload */}
            <label className="block">
              <span className="text-gray-600">Thumbnail</span>
              <input
                type="file"
                accept="image/*"
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Title Input */}
            <input
              type="text"
              placeholder="Video Title"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Description Input */}
            <textarea
              placeholder="Video Description"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Video Upload */}
            <label className="block">
              <span className="text-gray-600">Video File</span>
              <input
                type="file"
                accept="video/*"
                className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-5">
            <Button
              className="px-4 py-2 text-black rounded-lg transition border border-yellow-400 hover:bg-yellow-400"
              onClick={() => setIsOpens(false)}
            >
              Cancel
            </Button>
            <Button className="px-4 py-2 bg-yellow-500  rounded-lg hover:bg-yellow-400 transition text-black">
              Upload
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
