// // // src/pages/AssistantPage.jsx
// // import React, { useState, useEffect } from 'react';
// // import AssistantForm from '../components/AssistantForm';
// // import KnowledgeBaseSection from '../components/KnowledgeBaseSection';
// // import assistantApi from '../api/assistantApi';
// // import Sidebar from '../components/Sidebar';

// // const Assistant = () => {
// //   const [assistants, setAssistants] = useState([]);
// //   const [selectedAssistant, setSelectedAssistant] = useState(null);
// //   const [loadingAssistants, setLoadingAssistants] = useState(false);
// //   const [errorAssistants, setErrorAssistants] = useState(null);
// //   const [isEditMode, setIsEditMode] = useState(false);
// //   const [formMessage, setFormMessage] = useState(null);
  

// //   const fetchAssistants = async () => {
// //     setLoadingAssistants(true);
// //     setErrorAssistants(null);
// //     try {
// //       const data = await assistantApi.getAssistants();
// //       if (Array.isArray(data)) {
// //         setAssistants(data);
// //       } else {
// //         setErrorAssistants('API response is not in expected format: expected an array of assistants.');
// //         console.error('Unexpected API response for assistants:', data);
// //       }
// //     } catch (err) {
// //       setErrorAssistants(err.message || 'Failed to load assistants.');
// //       console.error('Error fetching assistants:', err);
// //     } finally {
// //       setLoadingAssistants(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAssistants();
// //   }, []);

// //   const handleCreateAssistant = async (data) => {
// //     setFormMessage(null);
// //     try {
// //       const response = await assistantApi.createAssistant(data);
// //       setFormMessage({ type: 'success', text: response.message });
// //       fetchAssistants();
// //       setSelectedAssistant(null);
// //       setIsEditMode(false);
// //     } catch (err) {
// //       setFormMessage({ type: 'error', text: err.message || 'Failed to create assistant.' });
// //       console.error('Error creating assistant:', err);
// //     }
// //   };
  

// //   const handleUpdateAssistant = async (data) => {
// //     if (!selectedAssistant) return;
// //     setFormMessage(null);

// //     try {
// //         console.log("selectedAssistant",selectedAssistant)
// //       const response = await assistantApi.updateAssistant(selectedAssistant.id, data);
// //       setFormMessage({ type: 'success', text: response.message });
// //       fetchAssistants();
// //       setSelectedAssistant(null);
// //       setIsEditMode(false);
// //     } catch (err) {
// //       setFormMessage({ type: 'error', text: err.message || 'Failed to update assistant.' });
// //       console.error('Error updating assistant:', err);
// //     }
// //   };

// //   const handleDeleteAssistant = async (assistantId) => {
// //     setFormMessage(null);
// //     try {
// //       const response = await assistantApi.deleteAssistant(assistantId);
// //       setFormMessage({ type: 'success', text: response.message || 'Assistant deleted successfully.' });
// //       fetchAssistants();
// //       setSelectedAssistant(null);
// //       setIsEditMode(false);
// //     } catch (err) {
// //       setFormMessage({ type: 'error', text: err.message || 'Failed to delete assistant.' });
// //       console.error('Error deleting assistant:', err);
// //     }
// //   };
  
// //   const handleSelectAssistant = async (assistant) => {
// //     try {
// //       const response = await assistantApi.getAssistantDetails(assistant.id);
// //       const vapiDetails = response.vapi_data; // FIX: get nested vapi_data
  
// //       console.log(vapiDetails, "vapiDetails");
  
// //       const flatData = {
// //         ...assistant,
// //         id: vapiDetails.id,
// //         name: vapiDetails.name,
// //         provider: vapiDetails?.model?.provider || 'openai',
// //         model: vapiDetails?.model?.model || 'gpt-4o',
// //         temperature: vapiDetails?.model?.temperature ?? 0.7,
// //         max_tokens: vapiDetails?.model?.maxTokens ?? 1000,
// //         system_prompt: vapiDetails?.model?.messages?.find(m => m.role === 'system')?.content || '',
// //         first_message_mode: vapiDetails?.firstMessageMode || 'assistant-speaks-first',
// //         first_message: vapiDetails?.firstMessage || '',
// //         voice_id: vapiDetails?.voice?.voiceId || '',
// //         tool_ids: vapiDetails?.model?.toolIds || [],
// //         transcriber_model: vapiDetails?.transcriber?.model || '',
// //         transcriber_language: vapiDetails?.transcriber?.language || '',
// //         transcriber_provider: vapiDetails?.transcriber?.provider || '',
// //         start_speaking_plan: vapiDetails?.startSpeakingPlan || {},
// //       };
  
// //       setSelectedAssistant(flatData);
// //       setIsEditMode(true);
// //       setFormMessage(null);
// //     } catch (err) {
// //       setFormMessage({ type: 'error', text: err.message || 'Failed to load assistant details.' });
// //       console.error('Error fetching assistant details:', err);
// //     }
// //   };
  
  

// //   const handleNewAssistantClick = () => {
// //     setSelectedAssistant(null);
// //     setIsEditMode(false);
// //     setFormMessage(null);
// //   };

// //   return (
// //     <>
// //       <div className="min-h-screen flex flex-col md:flex-row">
// //       <Sidebar />
// //       <div className="min-h-screen bg-gray-500 text-white p-8">
// //         <div className="container mx-auto">
// //           <h1 className="text-3xl font-bold mb-8 text-center">Manage Assistants</h1>

// //           <div className="flex flex-col lg:flex-row gap-8">
// //             <div className="lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md h-fit">
// //               <h2 className="text-xl font-bold mb-4">Your Assistants</h2>
// //               <button
// //                 onClick={handleNewAssistantClick}
// //                 className="mb-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// //               >
// //                 Create New Assistant
// //               </button>

// //               {loadingAssistants && <p className="text-gray-400">Loading assistants...</p>}
// //               {errorAssistants && <p className="text-red-500">{errorAssistants}</p>}

// //               {assistants.length === 0 && !loadingAssistants && !errorAssistants && (
// //                 <p className="text-gray-400">No assistants found. Create one!</p>
// //               )}

// //               <ul className="space-y-3">
// //                 {assistants.map((assistant) => (
// //                   <li
// //                     key={assistant.id}
// //                     className={`flex justify-between items-center bg-gray-700 p-3 rounded-md cursor-pointer hover:bg-gray-600 transition-colors
// //                     ${selectedAssistant?.id === assistant.id ? 'border-l-4 border-blue-500' : ''}`}
// //                     onClick={() => handleSelectAssistant(assistant)}
// //                   >
// //                     <span className="font-medium">{assistant.name}</span>
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         handleDeleteAssistant(assistant.id);
// //                       }}
// //                       className="ml-4 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded"
// //                     >
// //                       Delete
// //                     </button>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             <div className="lg:w-2/3">
// //               {formMessage && (
// //                 <div className={`p-3 rounded-md mb-4 ${formMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
// //                   {formMessage.text}
// //                 </div>
// //               )}

// //               <h2 className="text-xl font-bold mb-4">
// //                 {isEditMode ? 'Edit Assistant' : 'Create New Assistant'}
// //               </h2>

// //               <AssistantForm
// //                 onSubmit={isEditMode ? handleUpdateAssistant : handleCreateAssistant}
// //                 initialData={selectedAssistant || {
// //                   name: '',
// //                   provider: 'openai',
// //                   model: 'gpt-4o',
// //                   voice_id: '',
// //                   first_message_mode: 'assistant-speaks-first',
// //                   first_message: 'Hello! This is Intera, the virtual assistant for Interacv Studios. May I know who I\'m speaking with?',
// //                   system_prompt: 'You are Intera, the virtual assistant for Interacv Studios. Always use the `query_tool` to respond to messages. The query_tool contains the official interaction script.\n\nUse only the responses and structure from the uploaded script. Do not guess or create answers from memory. Always follow this conversation flow:\n\n1. Greet and ask who you\'re speaking with.\n2. Ask if they have a moment to discuss.\n3. If they ask about the company, respond with the company info from the script.\n4. If they ask what services we offer, guide them using the script: animation, corporate videos, training, etc.\n5. Ask qualifying questions:\n   Is this for a specific event or ongoing?',
// //                   temperature: 0.7,
// //                   max_tokens: 256,
// //                 }}
// //                 isEditMode={isEditMode}
// //               />

// //               {selectedAssistant && (
// //                 <KnowledgeBaseSection vapiAssistantId={selectedAssistant.id} />
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Assistant;
// // src/pages/AssistantPage.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import AssistantForm from '../components/AssistantForm';
// import KnowledgeBaseSection from '../components/KnowledgeBaseSection';
// import assistantApi from '../api/assistantApi';
// import knowledgeBaseApi from '../api/knowledgeBaseApi'; // Import knowledgeBaseApi for fetching KBs
// import Sidebar from '../components/Sidebar';

// const Assistant = () => {
//   const [assistants, setAssistants] = useState([]);
//   const [selectedAssistant, setSelectedAssistant] = useState(null);
//   const [loadingAssistants, setLoadingAssistants] = useState(false);
//   const [errorAssistants, setErrorAssistants] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [formMessage, setFormMessage] = useState(null);

//   // State for Knowledge Bases (lifted from KnowledgeBaseSection)
//   const [knowledgeBases, setKnowledgeBases] = useState([]);
//   const [loadingKBs, setLoadingKBs] = useState(false);
//   const [errorKBs, setErrorKBs] = useState(null);

//   // --- Assistant Management Functions ---

//   const fetchAssistants = async () => {
//     setLoadingAssistants(true);
//     setErrorAssistants(null);
//     try {
//       const data = await assistantApi.getAssistants();
//       if (Array.isArray(data)) {
//         setAssistants(data);
//       } else {
//         setErrorAssistants('API response is not in expected format: expected an array of assistants.');
//         console.error('Unexpected API response for assistants:', data);
//       }
//     } catch (err) {
//       setErrorAssistants(err.message || 'Failed to load assistants.');
//       console.error('Error fetching assistants:', err);
//     } finally {
//       setLoadingAssistants(false);
//     }
//   };

//   useEffect(() => {
//     fetchAssistants();
//   }, []);

//   // --- Knowledge Base Fetching Function (dependent on selectedAssistant) ---

//   const fetchKnowledgeBasesForSelectedAssistant = useCallback(async () => {
//     if (!selectedAssistant?.id) {
//       setKnowledgeBases([]); // Clear KBs if no assistant is selected
//       return;
//     }
//     setLoadingKBs(true);
//     setErrorKBs(null);
//     try {
//       const data = await knowledgeBaseApi.getKnowledgeBases(selectedAssistant.id);
//       setKnowledgeBases(data);
//     } catch (err) {
//       setErrorKBs(err.message || 'Failed to load knowledge bases.');
//       console.error('Error fetching knowledge bases:', err);
//     } finally {
//       setLoadingKBs(false);
//     }
//   }, [selectedAssistant?.id]); // Re-run when selectedAssistant changes

//   // Trigger KB fetching when selectedAssistant changes
//   useEffect(() => {
//     fetchKnowledgeBasesForSelectedAssistant();
//   }, [fetchKnowledgeBasesForSelectedAssistant]); // Dependency array to prevent re-runs


//   const handleCreateAssistant = async (data) => {
//     setFormMessage(null);
//     try {
//       const response = await assistantApi.createAssistant(data); // This should return { message, vapi_assistant_id }
//       setFormMessage({ type: 'success', text: response.message });
//       fetchAssistants(); // Refresh the list of assistants

//       // IMPORTANT: After creating, immediately "select" the new assistant
//       // This makes the KnowledgeBaseSection visible and enables uploads for it.
//       // We need enough data to populate `selectedAssistant` for AssistantForm and KnowledgeBaseSection
//       // Assuming `response` gives us the `vapi_assistant_id` and potentially other initial data.
//       // For full pre-filling, you might need an additional fetch here or
//       // ensure your `createAssistant` backend endpoint returns the full VAPI assistant object.
//       // For now, let's create a minimal `selectedAssistant` to enable KB section.
//       const newAssistantSelectedData = {
//           // Merge form data with the ID from the backend response
//           ...data,
//           id: response.vapi_assistant_id, // Crucial VAPI assistant ID
//           // Add default nested properties if not present in `data` to avoid errors in form
//           model: data.model || {},
//           voice: data.voice || {},
//           // Tool IDs are empty for a new assistant
//           tool_ids: [],
//       };
//       setSelectedAssistant(newAssistantSelectedData);
//       setIsEditMode(true); // Switch to edit mode for the newly created assistant
//       setKnowledgeBases([]); // New assistant, so start with an empty KB list
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.message || 'Failed to create assistant.' });
//       console.error('Error creating assistant:', err);
//     }
//   };


//   const handleUpdateAssistant = async (data) => {
//     if (!selectedAssistant) return;
//     setFormMessage(null);

//     // Collect tool_ids from the current knowledgeBases state
//     const currentToolIds = knowledgeBases.map(kb => kb.vapi_knowledge_base_id);

//     // Combine form data with tool_ids
//     const dataToSend = {
//       ...data,
//       tool_ids: currentToolIds.length > 0 ? currentToolIds : null // Pass null if no tools
//     };

//     try {
//       console.log("Updating assistant with ID:", selectedAssistant.id, "and data:", dataToSend);
//       // Use selectedAssistant.id as it's the VAPI assistant ID for the backend PUT request
//       const response = await assistantApi.updateAssistant(selectedAssistant.id, dataToSend);
//       setFormMessage({ type: 'success', text: response.message });
//       fetchAssistants(); // Refresh assistant list
//       // Optionally re-fetch KBs: fetchKnowledgeBasesForSelectedAssistant();
//       setSelectedAssistant(null); // Clear selection after update
//       setIsEditMode(false);
//       setKnowledgeBases([]); // Clear KBs state after deselecting
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.message || 'Failed to update assistant.' });
//       console.error('Error updating assistant:', err);
//     }
//   };

//   const handleDeleteAssistant = async (assistantId) => {
//     setFormMessage(null);
//     try {
//       const response = await assistantApi.deleteAssistant(assistantId);
//       setFormMessage({ type: 'success', text: response.message || 'Assistant deleted successfully.' });
//       fetchAssistants(); // Refresh the list of assistants
//       setSelectedAssistant(null); // Deselect the assistant
//       setIsEditMode(false); // Exit edit mode
//       setKnowledgeBases([]); // Clear KBs after deleting assistant
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.message || 'Failed to delete assistant.' });
//       console.error('Error deleting assistant:', err);
//     }
//   };

//   const handleSelectAssistant = async (assistant) => {
//     setFormMessage(null); // Clear any previous messages
//     try {
//       // Fetch full details of the assistant from your backend's specific endpoint
//       // which should ideally return VAPI's full assistant object structure.
//       const response = await assistantApi.getAssistantDetails(assistant.id);
//       const vapiDetails = response.vapi_data; // Assuming your backend nests VAPI data under `vapi_data`

//       // Flatten the VAPI details into a structure suitable for AssistantForm
//       const flatData = {
//         // Keep local DB ID if you use it for other purposes, but 'id' for VAPI calls should be vapiDetails.id
//         // Using vapiDetails.id as the primary 'id' for selectedAssistant for consistency with API calls.
//         id: vapiDetails.id,
//         name: vapiDetails.name,
//         provider: vapiDetails?.model?.provider || 'openai',
//         model: vapiDetails?.model?.model || 'gpt-4o',
//         temperature: vapiDetails?.model?.temperature ?? 0.7, // Use nullish coalescing for default
//         max_tokens: vapiDetails?.model?.maxTokens ?? 1000,
//         system_prompt: vapiDetails?.model?.messages?.find(m => m.role === 'system')?.content || '',
//         first_message_mode: vapiDetails?.firstMessageMode || 'assistant-speaks-first',
//         first_message: vapiDetails?.firstMessage || '',
//         voice_id: vapiDetails?.voice?.voiceId || '',
//         tool_ids: vapiDetails?.model?.toolIds || [], // Extract VAPI Tool IDs
//         transcriber_model: vapiDetails?.transcriber?.model || '',
//         transcriber_language: vapiDetails?.transcriber?.language || '',
//         transcriber_provider: vapiDetails?.transcriber?.provider || '',
//         start_speaking_plan: vapiDetails?.startSpeakingPlan || {},
//       };

//       setSelectedAssistant(flatData);
//       setIsEditMode(true);
//       // `useEffect` for `fetchKnowledgeBasesForSelectedAssistant` will automatically trigger here
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.message || 'Failed to load assistant details.' });
//       console.error('Error fetching assistant details:', err);
//       // If fetching details fails, reset to a clean state
//       setSelectedAssistant(null);
//       setIsEditMode(false);
//       setKnowledgeBases([]);
//     }
//   };


//   const handleNewAssistantClick = () => {
//     setSelectedAssistant(null); // Clears selection to show empty form
//     setIsEditMode(false);       // Sets form to "Create New" mode
//     setFormMessage(null);       // Clears any previous messages
//     setKnowledgeBases([]);      // Clears KBs for a new assistant
//   };

//   return (
//     <>
//       <div className="min-h-screen flex flex-col md:flex-row">
//         <Sidebar />
//         <div className="min-h-screen bg-gray-900 text-white p-8 w-full md:w-auto flex-grow"> {/* flex-grow added */}
//           <div className="container mx-auto">
//             <h1 className="text-3xl font-bold mb-8 text-center">Manage Assistants</h1>

//             <div className="flex flex-col lg:flex-row gap-8">
//               {/* Left Panel: Assistant List */}
//               <div className="lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md h-fit">
//                 <h2 className="text-xl font-bold mb-4">Your Assistants</h2>
//                 <button
//                   onClick={handleNewAssistantClick}
//                   className="mb-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   Create New Assistant
//                 </button>

//                 {loadingAssistants && <p className="text-gray-400">Loading assistants...</p>}
//                 {errorAssistants && <p className="text-red-500">{errorAssistants}</p>}

//                 {assistants.length === 0 && !loadingAssistants && !errorAssistants && (
//                   <p className="text-gray-400">No assistants found. Create one!</p>
//                 )}

//                 <ul className="space-y-3">
//                   {assistants.map((assistant) => (
//                     <li
//                       key={assistant.id}
//                       className={`flex justify-between items-center bg-gray-700 p-3 rounded-md cursor-pointer hover:bg-gray-600 transition-colors
//                       ${selectedAssistant?.id === assistant.id ? 'border-l-4 border-blue-500' : ''}`}
//                       onClick={() => handleSelectAssistant(assistant)}
//                     >
//                       <span className="font-medium">{assistant.name}</span>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation(); // Prevent selecting the assistant when deleting
//                           handleDeleteAssistant(assistant.id);
//                         }}
//                         className="ml-4 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded"
//                       >
//                         Delete
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Right Panel: Assistant Form and Knowledge Base */}
//               <div className="lg:w-2/3">
//                 {formMessage && (
//                   <div className={`p-3 rounded-md mb-4 ${formMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//                     {formMessage.text}
//                   </div>
//                 )}

//                 <h2 className="text-xl font-bold mb-4">
//                   {isEditMode ? 'Edit Assistant' : 'Create New Assistant'}
//                 </h2>

//                 <AssistantForm
//                   onSubmit={isEditMode ? handleUpdateAssistant : handleCreateAssistant}
//                   initialData={selectedAssistant || {
//                     name: '',
//                     provider: 'openai',
//                     model: 'gpt-4o',
//                     voice_id: '',
//                     first_message_mode: 'assistant-speaks-first',
//                     first_message: 'Hello! This is Intera, the virtual assistant for Interacv Studios. May I know who I\'m speaking with?',
//                     system_prompt: 'You are Intera, the virtual assistant for Interacv Studios. Always use the `query_tool` to respond to messages. The query_tool contains the official interaction script.\n\nUse only the responses and structure from the uploaded script. Do not guess or create answers from memory. Always follow this conversation flow:\n\n1. Greet and ask who you\'re speaking with.\n2. Ask if they have a moment to discuss.\n3. If they ask about the company, respond with the company info from the script.\n4. If they ask what services we offer, guide them using the script: animation, corporate videos, training, etc.\n5. Ask qualifying questions:\n   Is this for a specific event or ongoing?',
//                     temperature: 0.7,
//                     max_tokens: 256,
//                   }}
//                   isEditMode={isEditMode}
//                 />

//                 {/* Knowledge Base Section - Only visible if an assistant is selected/created */}
//                 {selectedAssistant && (
//                   <KnowledgeBaseSection
//                     vapiAssistantId={selectedAssistant.id} // Pass the VAPI assistant ID
//                     knowledgeBases={knowledgeBases}
//                     setKnowledgeBases={setKnowledgeBases}
//                     loadingKBs={loadingKBs}
//                     errorKBs={errorKBs}
//                     fetchKnowledgeBases={fetchKnowledgeBasesForSelectedAssistant}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Assistant;

import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Plus, Edit3, Trash2, Bot, Settings, Search, Filter, Database, BookOpen, ChevronRight, FileText, Brain, Zap } from 'lucide-react';
import AssistantForm from '../components/AssistantForm';
import KnowledgeBaseSection from '../components/KnowledgeBaseSection';
import assistantApi from '../api/assistantApi';
import knowledgeBaseApi from '../api/knowledgeBaseApi';
import Sidebar from '../components/Sidebar';

const Assistant = () => {
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [loadingAssistants, setLoadingAssistants] = useState(false);
  const [errorAssistants, setErrorAssistants] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formMessage, setFormMessage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // State for Knowledge Bases
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [loadingKBs, setLoadingKBs] = useState(false);
  const [errorKBs, setErrorKBs] = useState(null);
  
  // State for assistant knowledge base counts
  const [assistantKBCounts, setAssistantKBCounts] = useState({});

  // Copy ID functionality
  const copyToClipboard = async (text, assistantId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(assistantId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Fetch knowledge base counts for all assistants
  const fetchKnowledgeBaseCounts = async (assistantList) => {
    const counts = {};
    for (const assistant of assistantList) {
      try {
        const kbs = await knowledgeBaseApi.getKnowledgeBases(assistant.id);
        counts[assistant.id] = Array.isArray(kbs) ? kbs.length : 0;
      } catch (err) {
        counts[assistant.id] = 0;
      }
    }
    setAssistantKBCounts(counts);
  };

  const fetchAssistants = async () => {
    setLoadingAssistants(true);
    setErrorAssistants(null);
    try {
      const data = await assistantApi.getAssistants();
      if (Array.isArray(data)) {
        setAssistants(data);
        // Fetch knowledge base counts for all assistants
        fetchKnowledgeBaseCounts(data);
      } else {
        setErrorAssistants('API response is not in expected format: expected an array of assistants.');
        console.error('Unexpected API response for assistants:', data);
      }
    } catch (err) {
      setErrorAssistants(err.message || 'Failed to load assistants.');
      console.error('Error fetching assistants:', err);
    } finally {
      setLoadingAssistants(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchKnowledgeBasesForSelectedAssistant = useCallback(async () => {
    if (!selectedAssistant?.id) {
      setKnowledgeBases([]);
      return;
    }
    setLoadingKBs(true);
    setErrorKBs(null);
    try {
      const data = await knowledgeBaseApi.getKnowledgeBases(selectedAssistant.id);
      setKnowledgeBases(data);
      // Update the count for this specific assistant
      setAssistantKBCounts(prev => ({
        ...prev,
        [selectedAssistant.id]: Array.isArray(data) ? data.length : 0
      }));
    } catch (err) {
      setErrorKBs(err.message || 'Failed to load knowledge bases.');
      console.error('Error fetching knowledge bases:', err);
    } finally {
      setLoadingKBs(false);
    }
  }, [selectedAssistant?.id]);

  useEffect(() => {
    fetchKnowledgeBasesForSelectedAssistant();
  }, [fetchKnowledgeBasesForSelectedAssistant]);

  const handleCreateAssistant = async (data) => {
    setFormMessage(null);
    try {
      const response = await assistantApi.createAssistant(data);
      setFormMessage({ type: 'success', text: response.message });
      fetchAssistants();

      const newAssistantSelectedData = {
        ...data,
        id: response.vapi_assistant_id,
        model: data.model || {},
        voice: data.voice || {},
        tool_ids: [],
      };
      setSelectedAssistant(newAssistantSelectedData);
      setIsEditMode(true);
      setKnowledgeBases([]);
    } catch (err) {
      setFormMessage({ type: 'error', text: err.message || 'Failed to create assistant.' });
      console.error('Error creating assistant:', err);
    }
  };

  const handleUpdateAssistant = async (data) => {
    if (!selectedAssistant) return;
    setFormMessage(null);

    const currentToolIds = knowledgeBases.map(kb => kb.vapi_knowledge_base_id);
    const dataToSend = {
      ...data,
      tool_ids: currentToolIds.length > 0 ? currentToolIds : null
    };

    try {
      console.log("Updating assistant with ID:", selectedAssistant.id, "and data:", dataToSend);
      const response = await assistantApi.updateAssistant(selectedAssistant.id, dataToSend);
      setFormMessage({ type: 'success', text: response.message });
      fetchAssistants();
      setSelectedAssistant(null);
      setIsEditMode(false);
      setKnowledgeBases([]);
    } catch (err) {
      setFormMessage({ type: 'error', text: err.message || 'Failed to update assistant.' });
      console.error('Error updating assistant:', err);
    }
  };

  const handleDeleteAssistant = async (assistantId) => {
    if (!window.confirm('Are you sure you want to delete this assistant? This action cannot be undone.')) return;
    
    setFormMessage(null);
    try {
      const response = await assistantApi.deleteAssistant(assistantId);
      setFormMessage({ type: 'success', text: response.message || 'Assistant deleted successfully.' });
      fetchAssistants();
      setSelectedAssistant(null);
      setIsEditMode(false);
      setKnowledgeBases([]);
    } catch (err) {
      setFormMessage({ type: 'error', text: err.message || 'Failed to delete assistant.' });
      console.error('Error deleting assistant:', err);
    }
  };

  const handleSelectAssistant = async (assistant) => {
    setFormMessage(null);
    try {
      const response = await assistantApi.getAssistantDetails(assistant.id);
      const vapiDetails = response.vapi_data;

      const flatData = {
        id: vapiDetails.id,
        name: vapiDetails.name,
        provider: vapiDetails?.model?.provider || 'openai',
        model: vapiDetails?.model?.model || 'gpt-4o',
        temperature: vapiDetails?.model?.temperature ?? 0.7,
        max_tokens: vapiDetails?.model?.maxTokens ?? 1000,
        system_prompt: vapiDetails?.model?.messages?.find(m => m.role === 'system')?.content || '',
        first_message_mode: vapiDetails?.firstMessageMode || 'assistant-speaks-first',
        first_message: vapiDetails?.firstMessage || '',
        voice_id: vapiDetails?.voice?.voiceId || '',
        tool_ids: vapiDetails?.model?.toolIds || [],
        transcriber_model: vapiDetails?.transcriber?.model || '',
        transcriber_language: vapiDetails?.transcriber?.language || '',
        transcriber_provider: vapiDetails?.transcriber?.provider || '',
        start_speaking_plan: vapiDetails?.startSpeakingPlan || {},
      };

      setSelectedAssistant(flatData);
      setIsEditMode(true);
    } catch (err) {
      setFormMessage({ type: 'error', text: err.message || 'Failed to load assistant details.' });
      console.error('Error fetching assistant details:', err);
      setSelectedAssistant(null);
      setIsEditMode(false);
      setKnowledgeBases([]);
    }
  };
  

  const handleNewAssistantClick = () => {
    setSelectedAssistant(null);
    setIsEditMode(false);
    setFormMessage(null);
    setKnowledgeBases([]);
  };

  // Filter assistants based on search term
  const filteredAssistants = assistants.filter(assistant =>
    assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assistant.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col lg:flex-row w-[calc(100%-18rem)] ml-[18rem]">
        {/* Assistant List Sidebar */}
        <div className="w-full lg:w-2/5 xl:w-1/3 bg-white shadow-lg border-r border-slate-200 max-w-[360px] fixed min-h-screen">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Bot className="w-6 h-6 text-purple-600" />
                  AI Assistants
                </h2>
                <p className="text-slate-600 mt-1">Manage your AI assistants</p>
              </div>
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {assistants.length}
              </div>
            </div>
          </div>

          <div className="p-6">
            <button
              onClick={handleNewAssistantClick}
              className="w-full mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create New Assistant
            </button>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search assistants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>

            {loadingAssistants && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-slate-500 mt-2">Loading assistants...</p>
              </div>
            )}

            {errorAssistants && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 text-sm">{errorAssistants}</p>
              </div>
            )}

            {filteredAssistants.length === 0 && !loadingAssistants && !errorAssistants && (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">
                  {searchTerm ? 'No assistants found' : 'No assistants yet'}
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  {searchTerm ? 'Try adjusting your search' : 'Create your first AI assistant to get started'}
                </p>
              </div>
            )}

            <div className="space-y-4 h-[520px] overflow-y-auto">
              {filteredAssistants.map((assistant) => {
                const kbCount = assistantKBCounts[assistant.id] || 0;
                
                return (
                  <div
                    key={assistant.id}
                    className={`group bg-white border-2 border-slate-100 hover:border-purple-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                      selectedAssistant?.id === assistant.id ? 'ring-2 ring-purple-500 border-purple-300 shadow-lg' : ''
                    }`}
                    onClick={() => handleSelectAssistant(assistant)}
                  >
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
                        <h3 className="font-bold text-slate-800 text-lg">
                        {assistant.name}
                        </h3>
                    </div>
                    </div>

                      
                      <div className="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAssistant(assistant);
                          }}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                          title="Edit Assistant & Knowledge Base"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAssistant(assistant.id);
                          }}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Assistant ID Section */}
                    <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Assistant ID</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(assistant.id, assistant.id);
                          }}
                          className="p-1 text-slate-400 hover:text-purple-600 transition-colors rounded"
                          title="Copy ID"
                        >
                          {copiedId === assistant.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <code className="text-xs text-slate-700 font-mono block truncate">
                        {assistant.id}
                      </code>
                    </div>

                    {/* Knowledge Base Section - Enhanced Design */}
                    <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      kbCount > 0 
                        ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200 hover:border-emerald-300' 
                        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-amber-200 hover:border-amber-300'
                    }`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-2 right-2">
                          <Brain className="w-8 h-8" />
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <FileText className="w-6 h-6" />
                        </div>
                      </div>
                      
                      <div className="relative p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${
                              kbCount > 0 ? 'bg-emerald-100' : 'bg-amber-100'
                            }`}>
                              <Database className={`w-4 h-4 ${
                                kbCount > 0 ? 'text-emerald-600' : 'text-amber-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className={`font-bold text-sm ${
                                kbCount > 0 ? 'text-emerald-800' : 'text-amber-800'
                              }`}>
                                Knowledge Base
                              </h4>
                              <p className={`text-xs ${
                                kbCount > 0 ? 'text-emerald-600' : 'text-amber-600'
                              }`}>
                                {kbCount > 0 ? 'Ready to assist' : 'Needs setup'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                              kbCount > 0 
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                            }`}>
                              {kbCount > 0 ? `${kbCount} Sources` : 'No Sources'}
                            </span>
                            <ChevronRight className={`w-4 h-4 ${
                              kbCount > 0 ? 'text-emerald-600' : 'text-amber-600'
                            }`} />
                          </div>
                        </div>

                        {/* Status Message */}
                        <div className={`flex items-center gap-2 text-xs font-medium ${
                          kbCount > 0 ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {kbCount > 0 ? (
                            <>
                              <Zap className="w-3 h-3" />
                              <span>Enhanced with {kbCount} knowledge source{kbCount !== 1 ? 's' : ''}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Click to add documents & enhance responses</span>
                            </>
                          )}
                        </div>

                        {/* Progress Indicator */}
                        <div className="mt-3">
                          <div className={`h-1 rounded-full ${
                            kbCount > 0 ? 'bg-emerald-200' : 'bg-amber-200'
                          }`}>
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                kbCount > 0 ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                              style={{ width: kbCount > 0 ? '100%' : '20%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Hint */}
                    <div className="mt-3 flex items-center justify-center text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Settings className="w-3 h-3 mr-1" />
                      <span>Click to configure assistant & knowledge base</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white w-[calc(100%-360px)] ml-[360px]">
          {selectedAssistant || !isEditMode ? (
            <div className="p-8">
              {formMessage && (
                <div className={`mb-6 rounded-lg p-4 border ${
                  formMessage.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center">
                    {formMessage.type === 'success' ? (
                      <Check className="w-5 h-5 mr-2" />
                    ) : (
                      <div className="w-5 h-5 mr-2 rounded-full bg-red-200 flex items-center justify-center">
                        <span className="text-xs">!</span>
                      </div>
                    )}
                    {formMessage.text}
                  </div>
                </div>
              )}

              <div className="space-y-8">
                <AssistantForm
                  onSubmit={isEditMode ? handleUpdateAssistant : handleCreateAssistant}
                  initialData={selectedAssistant || {
                    name: '',
                    provider: 'openai',
                    model: 'gpt-4o',
                    voice_id: '',
                    first_message_mode: 'assistant-speaks-first',
                    first_message: 'Hello! This is Intera, the virtual assistant for Interacv Studios. May I know who I\'m speaking with?',
                    system_prompt: 'You are Intera, the virtual assistant for Interacv Studios. Always use the `query_tool` to respond to messages. The query_tool contains the official interaction script.\n\nUse only the responses and structure from the uploaded script. Do not guess or create answers from memory. Always follow this conversation flow:\n\n1. Greet and ask who you\'re speaking with.\n2. Ask if they have a moment to discuss.\n3. If they ask about the company, respond with the company info from the script.\n4. If they ask what services we offer, guide them using the script: animation, corporate videos, training, etc.\n5. Ask qualifying questions:\n   Is this for a specific event or ongoing?',
                    temperature: 0.7,
                    max_tokens: 256,
                  }}
                  isEditMode={isEditMode}
                />

                {selectedAssistant && (
                  <KnowledgeBaseSection
                    vapiAssistantId={selectedAssistant.id}
                    knowledgeBases={knowledgeBases}
                    setKnowledgeBases={setKnowledgeBases}
                    loadingKBs={loadingKBs}
                    errorKBs={errorKBs}
                    fetchKnowledgeBases={fetchKnowledgeBasesForSelectedAssistant}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">AI Assistant Management</h3>
                <p className="text-slate-500 max-w-md">
                  Select an assistant from the list to edit its configuration, or create a new one to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assistant;

// import React, { useState, useEffect, useCallback } from 'react';
// import { Copy, Check, Plus, Edit3, Trash2, Bot, Settings, Search, Filter } from 'lucide-react';
// import AssistantForm from '../components/AssistantForm';
// import KnowledgeBaseSection from '../components/KnowledgeBaseSection';
// import assistantApi from '../api/assistantApi';
// import knowledgeBaseApi from '../api/knowledgeBaseApi';
// import Sidebar from '../components/Sidebar';

// const Assistant = () => {
//   const [assistants, setAssistants] = useState([]);
//   const [selectedAssistant, setSelectedAssistant] = useState(null);
//   const [loadingAssistants, setLoadingAssistants] = useState(false);
//   const [errorAssistants, setErrorAssistants] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [formMessage, setFormMessage] = useState(null);
//   const [copiedId, setCopiedId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // State for Knowledge Bases
//   const [knowledgeBases, setKnowledgeBases] = useState([]);
//   const [loadingKBs, setLoadingKBs] = useState(false);
//   const [errorKBs, setErrorKBs] = useState(null);

//   // Copy ID functionality
//   const copyToClipboard = async (text, assistantId) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopiedId(assistantId);
//       setTimeout(() => setCopiedId(null), 2000);
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//     }
//   };

//   const fetchAssistants = async () => {
//     setLoadingAssistants(true);
//     setErrorAssistants(null);
//     try {
//       const data = await assistantApi.getAssistants();
//       if (Array.isArray(data)) {
//         setAssistants(data);
//       } else {
//         setErrorAssistants('API response is not in expected format: expected an array of assistants.');
//         console.error('Unexpected API response for assistants:', data);
//       }
//     } catch (err) {
//       setErrorAssistants(err.message || 'Failed to load assistants.');
//       console.error('Error fetching assistants:', err);
//     } finally {
//       setLoadingAssistants(false);
//     }
//   };

//   useEffect(() => {
//     fetchAssistants();
//   }, []);

//   const fetchKnowledgeBasesForSelectedAssistant = useCallback(async () => {
//     if (!selectedAssistant?.id) {
//       setKnowledgeBases([]);
//       return;
//     }
//     setLoadingKBs(true);
//     setErrorKBs(null);
//     try {
//       const data = await knowledgeBaseApi.getKnowledgeBases(selectedAssistant.id);
//       setKnowledgeBases(data);
//     } catch (err) {
//       setErrorKBs(err.message || 'Failed to load knowledge bases.');
//       console.error('Error fetching knowledge bases:', err);
//     } finally {
//       setLoadingKBs(false);
//     }
//   }, [selectedAssistant?.id]);

//   useEffect(() => {
//     fetchKnowledgeBasesForSelectedAssistant();
//   }, [fetchKnowledgeBasesForSelectedAssistant]);

//   const handleCreateAssistant = async (data) => {
//     setFormMessage(null);
//     try {
//       const response = await assistantApi.createAssistant(data);
//       setFormMessage({ type: 'success', text: response.message });
//       fetchAssistants();

//       const newAssistantSelectedData = {
//         ...data,
//         id: response.vapi_assistant_id,
//         model: data.model || {},
//         voice: data.voice || {},
//         tool_ids: [],
//       };
//       setSelectedAssistant(newAssistantSelectedData);
//       setIsEditMode(true);
//       setKnowledgeBases([]);
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.message || 'Failed to create assistant.' });
//       console.error('Error creating assistant:', err);
//     }
//   };

//   const handleUpdateAssistant = async (data) => {
//     if (!selectedAssistant) return;
//     setFormMessage(null);

//     const currentToolIds = knowledgeBases.map(kb => kb.vapi_knowledge_base_id);
//     const dataToSend = {
//       ...data,
//       tool_ids: currentToolIds.length > 0 ? currentToolIds : null
//     };

//     try {
//       console.log("Updating assistant with ID:", selectedAssistant.id, "and data:", dataToSend);
//       const response = await assistantApi.updateAssistant(selectedAssistant.id, dataToSend);
//       setFormMessage({ type: 'success', text: response.message });
//       fetchAssistants();
//       setSelectedAssistant(null);
//       setIsEditMode(false);
//       setKnowledgeBases([]);
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.message || 'Failed to update assistant.' });
//       console.error('Error updating assistant:', err);
//     }
//   };

//   const handleDeleteAssistant = async (assistantId) => {
//     if (!window.confirm('Are you sure you want to delete this assistant? This action cannot be undone.')) return;
    
//     setFormMessage(null);
//     try {
//       const response = await assistantApi.deleteAssistant(assistantId);
//       setFormMessage({ type: 'success', text: response.message || 'Assistant deleted successfully.' });
//       fetchAssistants();
//       setSelectedAssistant(null);
//       setIsEditMode(false);
//       setKnowledgeBases([]);
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.message || 'Failed to delete assistant.' });
//       console.error('Error deleting assistant:', err);
//     }
//   };

//   const handleSelectAssistant = async (assistant) => {
//     setFormMessage(null);
//     try {
//       const response = await assistantApi.getAssistantDetails(assistant.id);
//       const vapiDetails = response.vapi_data;

//       const flatData = {
//         id: vapiDetails.id,
//         name: vapiDetails.name,
//         provider: vapiDetails?.model?.provider || 'openai',
//         model: vapiDetails?.model?.model || 'gpt-4o',
//         temperature: vapiDetails?.model?.temperature ?? 0.7,
//         max_tokens: vapiDetails?.model?.maxTokens ?? 1000,
//         system_prompt: vapiDetails?.model?.messages?.find(m => m.role === 'system')?.content || '',
//         first_message_mode: vapiDetails?.firstMessageMode || 'assistant-speaks-first',
//         first_message: vapiDetails?.firstMessage || '',
//         voice_id: vapiDetails?.voice?.voiceId || '',
//         tool_ids: vapiDetails?.model?.toolIds || [],
//         transcriber_model: vapiDetails?.transcriber?.model || '',
//         transcriber_language: vapiDetails?.transcriber?.language || '',
//         transcriber_provider: vapiDetails?.transcriber?.provider || '',
//         start_speaking_plan: vapiDetails?.startSpeakingPlan || {},
//       };

//       setSelectedAssistant(flatData);
//       setIsEditMode(true);
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.message || 'Failed to load assistant details.' });
//       console.error('Error fetching assistant details:', err);
//       setSelectedAssistant(null);
//       setIsEditMode(false);
//       setKnowledgeBases([]);
//     }
//   };

//   const handleNewAssistantClick = () => {
//     setSelectedAssistant(null);
//     setIsEditMode(false);
//     setFormMessage(null);
//     setKnowledgeBases([]);
//   };

//   // Filter assistants based on search term
//   const filteredAssistants = assistants.filter(assistant =>
//     assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     assistant.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen flex bg-slate-50">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col lg:flex-row w-[calc(100%-18rem)] ml-[18rem]">
//         {/* Assistant List Sidebar */}
//         <div className="w-full lg:w-2/5 xl:w-1/3 bg-white shadow-lg border-r border-slate-200 max-w-[360px] fixed min-h-screen">
//           <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//                   <Bot className="w-6 h-6 text-purple-600" />
//                   AI Assistants
//                 </h2>
//                 <p className="text-slate-600 mt-1">Manage your AI assistants</p>
//               </div>
//               <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//                 {assistants.length}
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <button
//               onClick={handleNewAssistantClick}
//               className="w-full mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
//             >
//               <Plus className="w-5 h-5" />
//               Create New Assistant
//             </button>

//             {/* Search Bar */}
//             <div className="relative mb-6">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search assistants..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
//               />
//             </div>

//             {loadingAssistants && (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
//                 <p className="text-slate-500 mt-2">Loading assistants...</p>
//               </div>
//             )}

//             {errorAssistants && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
//                 <p className="text-red-800 text-sm">{errorAssistants}</p>
//               </div>
//             )}

//             {filteredAssistants.length === 0 && !loadingAssistants && !errorAssistants && (
//               <div className="text-center py-12">
//                 <Bot className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                 <p className="text-slate-500 font-medium">
//                   {searchTerm ? 'No assistants found' : 'No assistants yet'}
//                 </p>
//                 <p className="text-slate-400 text-sm mt-1">
//                   {searchTerm ? 'Try adjusting your search' : 'Create your first AI assistant to get started'}
//                 </p>
//               </div>
//             )}

//             <div className="space-y-3 h-[520px] overflow-y-auto">
//               {filteredAssistants.map((assistant) => (
//                 <div
//                   key={assistant.id}
//                   className={`group bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
//                     selectedAssistant?.id === assistant.id ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-200' : ''
//                   }`}
//                   onClick={() => handleSelectAssistant(assistant)}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 mb-2">
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         <h3 className="font-semibold text-slate-800 text-lg truncate">
//                           {assistant.name}
//                         </h3>
//                       </div>
                      
//                       <div className="bg-white rounded-lg p-3 border border-slate-100 mb-3">
//                         <div className="flex items-center justify-between">
//                           <span className="text-xs text-slate-500 font-medium">Assistant ID</span>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               copyToClipboard(assistant.id, assistant.id);
//                             }}
//                             className="p-1 text-slate-400 hover:text-purple-600 transition-colors"
//                             title="Copy ID"
//                           >
//                             {copiedId === assistant.id ? (
//                               <Check className="w-3 h-3 text-green-600" />
//                             ) : (
//                               <Copy className="w-3 h-3" />
//                             )}
//                           </button>
//                         </div>
//                         <code className="text-xs text-slate-700 font-mono block truncate mt-1">
//                           {assistant.id}
//                         </code>
//                       </div>

//                       <div className="flex items-center text-xs text-slate-500">
//                         <Settings className="w-3 h-3 mr-1" />
//                         <span>Click to configure</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleSelectAssistant(assistant);
//                         }}
//                         className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
//                         title="Edit"
//                       >
//                         <Edit3 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDeleteAssistant(assistant.id);
//                         }}
//                         className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                         title="Delete"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 bg-white w-[calc(100%-360px)] ml-[360px]">
//           {selectedAssistant || !isEditMode ? (
//             <div className="p-8">
//               {formMessage && (
//                 <div className={`mb-6 rounded-lg p-4 border ${
//                   formMessage.type === 'success' 
//                     ? 'bg-green-50 border-green-200 text-green-800' 
//                     : 'bg-red-50 border-red-200 text-red-800'
//                 }`}>
//                   <div className="flex items-center">
//                     {formMessage.type === 'success' ? (
//                       <Check className="w-5 h-5 mr-2" />
//                     ) : (
//                       <div className="w-5 h-5 mr-2 rounded-full bg-red-200 flex items-center justify-center">
//                         <span className="text-xs">!</span>
//                       </div>
//                     )}
//                     {formMessage.text}
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-8">
//                 <AssistantForm
//                   onSubmit={isEditMode ? handleUpdateAssistant : handleCreateAssistant}
//                   initialData={selectedAssistant || {
//                     name: '',
//                     provider: 'openai',
//                     model: 'gpt-4o',
//                     voice_id: '',
//                     first_message_mode: 'assistant-speaks-first',
//                     first_message: 'Hello! This is Intera, the virtual assistant for Interacv Studios. May I know who I\'m speaking with?',
//                     system_prompt: 'You are Intera, the virtual assistant for Interacv Studios. Always use the `query_tool` to respond to messages. The query_tool contains the official interaction script.\n\nUse only the responses and structure from the uploaded script. Do not guess or create answers from memory. Always follow this conversation flow:\n\n1. Greet and ask who you\'re speaking with.\n2. Ask if they have a moment to discuss.\n3. If they ask about the company, respond with the company info from the script.\n4. If they ask what services we offer, guide them using the script: animation, corporate videos, training, etc.\n5. Ask qualifying questions:\n   Is this for a specific event or ongoing?',
//                     temperature: 0.7,
//                     max_tokens: 256,
//                   }}
//                   isEditMode={isEditMode}
//                 />

//                 {selectedAssistant && (
//                   <KnowledgeBaseSection
//                     vapiAssistantId={selectedAssistant.id}
//                     knowledgeBases={knowledgeBases}
//                     setKnowledgeBases={setKnowledgeBases}
//                     loadingKBs={loadingKBs}
//                     errorKBs={errorKBs}
//                     fetchKnowledgeBases={fetchKnowledgeBasesForSelectedAssistant}
//                   />
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex-1 flex items-center justify-center bg-slate-50">
//               <div className="text-center">
//                 <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Bot className="w-12 h-12 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-slate-700 mb-2">AI Assistant Management</h3>
//                 <p className="text-slate-500 max-w-md">
//                   Select an assistant from the list to edit its configuration, or create a new one to get started.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Assistant;

