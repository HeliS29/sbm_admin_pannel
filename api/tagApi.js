const API_BASE_URL = 'http://localhost:8000/vapi';

const tagApi = {
  // Get all tags
  getTags: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tags`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  // Create a new tag
  createTag: async (tagData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  },

  // Update a tag
  updateTag: async (tagId, tagData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tags/${tagId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating tag:', error);
      throw error;
    }
  },

  // Delete a tag
  deleteTag: async (tagId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tags/${tagId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting tag:', error);
      throw error;
    }
  },
};

export default tagApi;