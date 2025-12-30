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
  <div className="min-h-screen bg-[url('https://res.cloudinary.com/djgboajkm/image/upload/2941039_zahofy')] bg-contain w-full bg-stone-900 flex items-center justify-center px-4">
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full">
      
      {/* Image Upload Panel */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-amber-500 rounded-xl p-6 text-center cursor-pointer
                   hover:bg-stone-700 transition flex-1 flex flex-col items-center justify-center"
      >
        <input  {...getInputProps()} />
        <p className="text-gray-300 mb-4">
          {images.length > 0
            ? `${images.length} image(s) selected`
            : "Drag & drop images here, or click to browse"}
        </p>

        {/* Preview selected images */}
        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-96">
          {images.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-24 h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 backdrop-blur-sm bg-black/20 rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        <h1 className="text-2xl  font-semibold text-white text-center">
          Create New Product
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"

            placeholder="Product Name"
            onChange={handleChange}
            className="input bg-amber-50 rounded-md p-2 "
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            className="input  bg-amber-50 rounded-md p-2"
          />
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            onChange={handleChange}
            className="input  bg-amber-50 rounded-md p-2"
          />
          <input
            name="catogary"
            placeholder="Category"
            onChange={handleChange}
            className="input  bg-amber-50 rounded-md p-2"
          />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          className="input  bg-amber-50 rounded-md p-2 resize-none h-28"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-amber-600 hover:bg-amber-500 text-black font-semibold py-3 rounded-xl transition"
        >
          Upload Product
        </button>
      </div>
    </div>
  </div>
);


}

export default CreateProductPage;
