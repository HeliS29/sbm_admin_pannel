// src/api/knowledgeBaseApi.js
const API_BASE_URL = 'http://localhost:8000/vapi'; // Make sure this matches your backend URL

const knowledgeBaseApi = {
  /**
   * Uploads a file to create a new knowledge base for a specific assistant.
   * @param {string} assistantId - The VAPI assistant ID to attach the knowledge base to.
   * @param {File} file - The file to upload (e.g., text, PDF).
   * @returns {Promise<Object>} The response from the backend, including file_id and kb_id.
   */
  uploadKnowledgeBase: async (assistantId, file) => {
    const formData = new FormData();
    formData.append('assistant_id', assistantId);
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/knowledge_base`, {
        method: 'POST',
        body: formData, // fetch automatically sets 'Content-Type': 'multipart/form-data' with FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading knowledge base:', error.message);
      throw new Error(error.message || 'Failed to upload knowledge base.');
    }
  },

  /**
   * Fetches all knowledge bases associated with a specific assistant from your local DB.
   * NOTE: You will need to implement a GET endpoint on your FastAPI backend for this.
   * Example: @router.get("/knowledge_bases/{assistant_id}")
   * @param {string} assistantId - The VAPI assistant ID.
   * @returns {Promise<Array>} An array of knowledge base objects.
   */
  getKnowledgeBases: async (assistantId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/knowledge_bases/${assistantId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching knowledge bases:', error.message);
      throw new Error(error.message || 'Failed to fetch knowledge bases.');
    }
  },

  /**
   * Deletes a knowledge base from your local DB and potentially from VAPI.
   * NOTE: You will need to implement a DELETE endpoint on your FastAPI backend for this.
   * Example: @router.delete("/knowledge_base/{knowledge_base_id}")
   * @param {string} knowledgeBaseId - The ID of the knowledge base in your local DB.
   * @returns {Promise<Object>} The response from the backend.
   */
  deleteKnowledgeBase: async (knowledgeBaseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/knowledge_base/${knowledgeBaseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      // Some DELETE endpoints might return 204 No Content, so we check.
      // If the backend sends JSON, it will be parsed.
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
      } else {
        return { message: 'Delete successful (no content)' }; // Or handle as needed for 204
      }

    } catch (error) {
      console.error('Error deleting knowledge base:', error.message);
      throw new Error(error.message || 'Failed to delete knowledge base.');
    }
  },
};

export default knowledgeBaseApi;