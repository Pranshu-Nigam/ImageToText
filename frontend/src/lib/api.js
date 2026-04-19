const API_BASE_URL = "/api";

/**
 * Send an image file to the backend for OCR extraction.
 * @param {File} file - The image file to process
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function extractText(file) {
  const formData = new FormData();
  formData.append("image", file);

  // Use AbortController to set a long timeout (120s) for heavy OCR tasks
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(`${API_BASE_URL}/extract-text`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `Server Error (${response.status})`);
    }

    return result;
  } catch (error) {
    console.error("❌ API Error:", error.name, error.message);
    
    let userMessage = "Unable to connect to the server.";
    if (error.name === "AbortError") {
      userMessage = "Request timed out. The image might be too complex.";
    } else if (error.message === "Failed to fetch") {
      userMessage = "Network error. Please check if the backend is running.";
    } else {
      userMessage = error.message;
    }

    return {
      success: false,
      error: userMessage,
    };
  }
}

/**
 * Check if the backend API is healthy.
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await response.json();
    return result.status === "ok";
  } catch (error) {
    return false;
  }
}
