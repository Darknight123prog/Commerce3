import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { showError, showSuccess } from "../../Utils/Toast";

function CreateProductPage() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    catogary: "",
    stock: ""
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (files) => {
      setImages(files); // ✅ ARRAY
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (images.length === 0) {
        showError("At least one image is required");
        return;
      }

      const data = new FormData();

      images.forEach((img) => {
        data.append("image", img); // ✅ multer.array("image")
      });

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post(
  "http://localhost:8568/api/v1/admin/createProducts",
  data,
  {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      showSuccess("Product created successfully");

    } catch (err) {
      console.error(err);
      showError(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {images.length > 0
          ? `${images.length} image(s) selected`
          : "Drag & drop images here"}
      </div>

      <input name="name" placeholder="Product Name" className="w-full border p-2" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" className="w-full border p-2" onChange={handleChange} />
      <input name="stock" placeholder="Stock" type="number" className="w-full border p-2" onChange={handleChange} />
      <input name="catogary" placeholder="Category" className="w-full border p-2" onChange={handleChange} />
      <textarea name="description" placeholder="Description" className="w-full border p-2" onChange={handleChange} />

      <button onClick={handleSubmit} className="w-full bg-black text-white py-2">
        Upload
      </button>
    </div>
  );
}

export default CreateProductPage;
