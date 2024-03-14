import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { app } from "../fireBase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [fileImage, setFileImage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const data = await fetch(`/api/post/getPosts?postId=${postId}`);
        const res = await data.json();
        if (res.success === false) {
          setPublishError(res.message);
          return;
        }
        if (data.ok) {
          setFormData(res.posts[0]);
          setPublishError(null);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
    }
  };
  const handleUploadImage = () => {
    if (!fileImage) {
      setImageFileUploadError("Please select an image");
      return;
    }
    try {
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + fileImage.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, fileImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPublishError(null);
      const data = await fetch(
        `/api/post/update/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const res = await data.json();
      if (res.success === false) {
        setPublishError(res.message);
        return;
      }
      if (data.ok) {
        setPublishError(null);
        navigate(`/post/${res.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Edit a post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Edit
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
