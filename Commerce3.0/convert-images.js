import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/images";
const outputDir = "./public/images-webp";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(async (file) => {
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    await sharp(path.join(inputDir, file))
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, file.replace(/\.(jpg|jpeg)/, ".webp")));
  }
});
