require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const { initWorker, terminateWorker } = require("./services/ocr");
const ocrRoutes = require("./routes/ocr");
const limiter = require("./middleware/rateLimiter");

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("📁 Created uploads directory");
}

// Security & Middleware (TEMPORARILY DISABLED TO FIX CONNECTION ISSUES)
// app.use(helmet({
//   crossOriginResourcePolicy: false,
// }));
app.use(cors({
  origin: true, 
  credentials: true,
}));
app.use(express.json());

// Request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// app.use(limiter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TextLens API is running" });
});

// Routes
app.use("/api", ocrRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Global Error Handler:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// Initialize worker and start server
const startServer = async () => {
  try {
    await initWorker();
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Increase timeouts for heavy OCR processing
    server.timeout = 120000; // 2 minutes
    server.keepAliveTimeout = 120000;

    // Graceful shutdown
    const shutdown = async () => {
      console.log("\n👋 Shutting down gracefully...");
      await terminateWorker();
      server.close(() => {
        console.log("💨 HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

  } catch (error) {
    console.error("💥 Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
