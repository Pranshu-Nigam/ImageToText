const Tesseract = require("tesseract.js");

let worker = null;

/**
 * Initialize a single Tesseract worker on startup.
 * Reused across all requests — never created per-request.
 */
async function initWorker() {
  if (worker) return;

  console.log("🔧 Initializing Tesseract worker...");
  worker = await Tesseract.createWorker("eng", 1, {
    logger: (m) => {
      if (m.status === "recognizing text") {
        process.stdout.write(`\r  OCR progress: ${(m.progress * 100).toFixed(0)}%`);
      }
    },
  });

  // V2.1 Precision Parameters
  await worker.setParameters({
    tessedit_pageseg_mode: "1", // Automatic page segmentation with OSD
    preserve_interword_spaces: "1", // Keep spacing (crucial for formulas)
    tessedit_enable_dict_correction: "1", // Help with common word patterns
    tessjs_create_hocr: "0",
    tessjs_create_tsv: "0",
  });
  console.log("\n✅ Tesseract worker ready (English)");
}

/**
 * Extract text from an image buffer.
 * @param {Buffer} imageBuffer - Preprocessed image buffer
 * @returns {{ text: string, confidence: number }}
 */
async function extractText(imageBuffer) {
  if (!worker) {
    throw new Error("Tesseract worker not initialized. Call initWorker() first.");
  }

  const startTime = Date.now();

  const {
    data: { text, confidence },
  } = await worker.recognize(imageBuffer);

  const processingTimeMs = Date.now() - startTime;

  // V2.1 Post-processing: Cleanup common OCR noise and mathematical misreads
  const cleanedText = text
    .split("\n")
    .map(line => {
      let l = line.trim();
      // Fix common sub-script misreads specifically found in Bayes/Stats
      l = l.replace(/y;/g, "y1");
      l = l.replace(/y,/g, "y1");
      l = l.replace(/P\(xly/g, "P(x|y"); // Fix pipes read as 'l' in probability
      l = l.replace(/P\(y(\d)\)/g, "P(y$1)"); // Ensure parentheses around subscripts are clean
      return l;
    })
    .filter(line => line.length > 0) // Remove empty lines for cleaner structured output
    .join("\n");

  return {
    text: cleanedText,
    confidence: parseFloat(confidence.toFixed(1)),
    processingTimeMs,
  };
}

/**
 * Gracefully shut down the worker.
 */
async function terminateWorker() {
  if (worker) {
    await worker.terminate();
    worker = null;
    console.log("🛑 Tesseract worker terminated");
  }
}

module.exports = { initWorker, extractText, terminateWorker };
