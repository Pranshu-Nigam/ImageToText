const express = require("express");
const fs = require("fs");
const upload = require("../middleware/upload");
const { preprocessImage } = require("../services/preprocess");
const { extractText } = require("../services/ocr");

const router = express.Router();

/**
 * POST /api/extract-text
 * Upload an image → preprocess → OCR → return text
 */
router.post("/extract-text", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: "No image file provided. Send a file with field name 'image'.",
    });
  }

  const filePath = req.file.path;

  try {
    // 1. Preprocess with Sharp
    const processedBuffer = await preprocessImage(filePath);

    // 2. OCR with Tesseract
    const result = await extractText(processedBuffer);

    // 3. Return result
    res.json({
      success: true,
      data: {
        text: result.text,
        confidence: result.confidence,
        processingTimeMs: result.processingTimeMs,
      },
    });
  } catch (error) {
    console.error("❌ OCR Error:", error.message);
    
    let errorMessage = "Failed to extract text. Please try a different image.";
    if (error.message.includes("not initialized")) {
      errorMessage = "AI engine is warming up. Please try again in 5 seconds.";
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  } finally {
    // Always cleanup temp file — even if error occurs
    fs.unlink(filePath, (err) => {
      if (err) console.warn("⚠️ Failed to cleanup temp file:", filePath);
    });
  }
});

module.exports = router;
