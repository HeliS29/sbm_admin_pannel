// src/api/assistantApi.js
const API_BASE_URL = 'http://localhost:8000/vapi'; // Replace with your backend URL (e.g., 'http://localhost:8000')

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  };
const assistantApi = {
  // Assistant Management
  createAssistant: async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach(item => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, data[key]);
      }
    }
    const response = await fetch(`${API_BASE_URL}/assistants`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse(response);
  },
  getAssistantDetails: async (vapiAssistantId) => {
    const response = await fetch(`${API_BASE_URL}/assistants/${vapiAssistantId}`, {
        headers: getAuthHeaders(),
      });
    return handleResponse(response);
  },

  updateAssistant: async (assistantId, data) => {
    const formData = new FormData();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach(item => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, data[key]);
      }
    }
    const response = await fetch(`${API_BASE_URL}/assistants/${assistantId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse(response);
  },

  deleteAssistant: async (assistantId) => {
    const response = await fetch(`${API_BASE_URL}/assistants/${assistantId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getAssistants: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/vapi/get-list-assistants`, {
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
  // Voice Listing
//   getVoices: async () => {
//     const response = await fetch(`${API_BASE_URL}/voices`);
//     return handleResponse(response);
//   },
    getVoices: async (provider = 'azure') => {
        const endpoint = provider === '11labs' ? '/voices/elevenlabs' : '/voices';
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        return handleResponse(response);
    },

  // Knowledge Base Management
  getKnowledgeBasesForAssistant: async (vapiAssistantId) => {
    const response = await fetch(`${API_BASE_URL}/knowledge_bases/${vapiAssistantId}`, {
        headers: getAuthHeaders(),
      });
    return handleResponse(response);
  },

  addKnowledgeBase: async (vapiAssistantId, file) => {
    const formData = new FormData();
    formData.append('assistant_id', vapiAssistantId);
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/knowledge_base`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse(response);
  },
};

export default assistantApi;