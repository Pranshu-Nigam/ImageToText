const sharp = require("sharp");

/**
 * Preprocess an image for optimal OCR accuracy.
 * Improved pipeline:
 * 1. Upscale if low-res (OCR likes high DPI)
 * 2. Grayscale to simplify data
 * 3. Sharpen to define edges
 * 4. Normalize to optimize contrast
 *
 * @param {string} filePath - Path to the uploaded image
 * @returns {Promise<Buffer>} - Preprocessed PNG buffer
 */
async function preprocessImage(filePath) {
  const image = sharp(filePath);
  const metadata = await image.metadata();

  // V2.1 Precision Pipeline
  let pipeline = image
    .grayscale()
    // 1. High Contrast Stretching
    .linear(2.2, -0.6) 
    // 2. Precision Binarization (Slightly lower threshold to preserve thin stems like '1')
    .threshold(145)
    // 3. Selective Denoising (No blur to keep sharp boundaries)
    .median(1) 
    .sharpen({ sigma: 1.2, m1: 0.5, m2: 20 }); // Fine-tuned sharpening

  // 4. Ultra-Scaling (Targeting 4x upscale for small text/sub-scripts)
  if (metadata.width < 1000) {
    pipeline = pipeline.resize({
      width: metadata.width * 4,
      kernel: "lanczos3",
      withoutEnlargement: false
    });
  } else if (metadata.width < 2000) {
    pipeline = pipeline.resize({
      width: metadata.width * 2,
      kernel: "lanczos3"
    });
  } else {
    pipeline = pipeline.resize({ width: 3200, withoutEnlargement: true });
  }

  return await pipeline.png().toBuffer();
}

module.exports = { preprocessImage };
