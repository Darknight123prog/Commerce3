
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const ProductsModel = require("../Models/ProductsModel");

async function connectDB() {
  await mongoose.connect(process.env.Database_url);
  console.log("DB connected");
}

async function updateImageUrls() {
  await connectDB();

  const products = await ProductsModel.find({ "image.public_url": { $exists: true } });

  for (const product of products) {
    product.image = product.image.map(img => ({
      ...img,
      public_url: img.public_url.includes("q_auto,f_auto")
        ? img.public_url
        : img.public_url.replace("/upload/", "/upload/q_auto,f_auto/")
    }));

    await product.save();
  }

  console.log("Image URLs updated successfully");
  process.exit(0);
}

updateImageUrls();
