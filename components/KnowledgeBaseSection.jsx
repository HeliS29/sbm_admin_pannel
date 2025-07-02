// // src/components/KnowledgeBaseSection.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone'; // Make sure you have react-dropzone installed: npm install react-dropzone
// import knowledgeBaseApi from '../api/knowledgeBaseApi';

// const KnowledgeBaseSection = ({ vapiAssistantId }) => {
//   const [knowledgeBases, setKnowledgeBases] = useState([]);
//   const [loadingKBs, setLoadingKBs] = useState(false);
//   const [errorKBs, setErrorKBs] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState(null);

//   // --- Fetch Knowledge Bases ---
//   const fetchKnowledgeBases = useCallback(async () => {
//     if (!vapiAssistantId) {
//       setKnowledgeBases([]);
//       return;
//     }

//     setLoadingKBs(true);
//     setErrorKBs(null);
//     try {
//       // Ensure your backend has a GET /vapi/knowledge_bases/{assistant_id} endpoint
//       const data = await knowledgeBaseApi.getKnowledgeBases(vapiAssistantId);
//       setKnowledgeBases(data);
//     } catch (err) {
//       setErrorKBs(err.message || 'Failed to load knowledge bases.');
//       console.error('Error fetching knowledge bases:', err);
//     } finally {
//       setLoadingKBs(false);
//     }
//   }, [vapiAssistantId]);

//   useEffect(() => {
//     fetchKnowledgeBases();
//   }, [fetchKnowledgeBases]);

//   // --- File Upload Logic ---
//   const onDrop = useCallback(async (acceptedFiles) => {
//     if (!vapiAssistantId) {
//       setUploadMessage({ type: 'error', text: 'Please select an assistant first to upload a knowledge base.' });
//       return;
//     }
//     if (acceptedFiles.length === 0) {
//       setUploadMessage({ type: 'error', text: 'No files selected or file type not accepted.' });
//       return;
//     }

//     const file = acceptedFiles[0];
//     setUploadMessage(null);
//     setIsUploading(true);

//     try {
//       const response = await knowledgeBaseApi.uploadKnowledgeBase(vapiAssistantId, file);
//       setUploadMessage({ type: 'success', text: `"${file.name}" uploaded. KB ID: ${response.kb_id}` });
//       fetchKnowledgeBases(); // Refresh list after successful upload
//     } catch (err) {
//       setUploadMessage({ type: 'error', text: err.message || 'Failed to upload file.' });
//       console.error('Upload error:', err);
//     } finally {
//       setIsUploading(false);
//     }
//   }, [vapiAssistantId, fetchKnowledgeBases]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     // Accept common document types. You can adjust this as needed.
//     accept: {
//       'text/plain': ['.txt'],
//       'application/pdf': ['.pdf'],
//       'application/msword': ['.doc'],
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
//     },
//     multiple: false, // Only allow one file at a time
//   });

//   // --- Delete Knowledge Base ---
//   const handleDeleteKnowledgeBase = async (kbId) => {
//     if (window.confirm("Are you sure you want to delete this knowledge base? This action cannot be undone.")) {
//       setUploadMessage(null);
//       try {
//         // Ensure your backend has a DELETE /vapi/knowledge_base/{kb_id} endpoint
//         const response = await knowledgeBaseApi.deleteKnowledgeBase(kbId);
//         setUploadMessage({ type: 'success', text: response.message || 'Knowledge base deleted successfully.' });
//         fetchKnowledgeBases(); // Refresh list
//       } catch (err) {
//         setUploadMessage({ type: 'error', text: err.message || 'Failed to delete knowledge base.' });
//         console.error('Error deleting knowledge base:', err);
//       }
//     }
//   };

//   // Only render if an assistant is selected
//   if (!vapiAssistantId) {
//     return (
//       <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-8">
//         <h2 className="text-xl font-bold mb-4">Knowledge Bases</h2>
//         <p className="text-gray-400">Select an assistant to manage its knowledge bases.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-8">
//       <h2 className="text-xl font-bold mb-4">Knowledge Bases</h2>

//       {uploadMessage && (
//         <div className={`p-3 rounded-md mb-4 ${uploadMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
//           {uploadMessage.text}
//         </div>
//       )}

//       {/* File Upload Section */}
//       <div
//         {...getRootProps()}
//         className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-4
//           ${isDragActive ? 'border-blue-500 bg-gray-700' : 'border-gray-600 bg-gray-700'}
//           ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
//         style={{ pointerEvents: isUploading ? 'none' : 'auto' }}
//       >
//         <input {...getInputProps()} disabled={isUploading} />
//         {isUploading ? (
//           <p className="text-gray-400">Uploading file...</p>
//         ) : isDragActive ? (
//           <p className="text-blue-300">Drop the file here ...</p>
//         ) : (
//           <p className="text-gray-400">Drag 'n' drop a text/PDF file here, or click to select file</p>
//         )}
//       </div>

//       {/* List of Knowledge Bases */}
//       <h3 className="text-lg font-bold mb-3">Attached Knowledge Bases</h3>
//       {loadingKBs && <p className="text-gray-400">Loading knowledge bases...</p>}
//       {errorKBs && <p className="text-red-500">{errorKBs}</p>}

//       {knowledgeBases.length === 0 && !loadingKBs && !errorKBs && (
//         <p className="text-gray-400">No knowledge bases found for this assistant.</p>
//       )}

//       <ul className="space-y-3">
//         {knowledgeBases.map((kb) => (
//           <li key={kb.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
//             <div>
//               <span className="font-medium text-blue-300">{kb.file_name}</span>
//               <p className="text-sm text-gray-400">KB ID: {kb.vapi_knowledge_base_id}</p>
//               <p className="text-sm text-gray-500">File ID: {kb.vapi_file_id}</p>
//             </div>
//             <button
//               onClick={() => handleDeleteKnowledgeBase(kb.id)} // Use your local DB ID for deletion
//               className="ml-4 bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default KnowledgeBaseSection;



import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Copy, Check, Trash2, Database, UploadCloud as CloudUpload } from 'lucide-react';
import knowledgeBaseApi from '../api/knowledgeBaseApi';

const KnowledgeBaseSection = ({ 
  vapiAssistantId, 
  knowledgeBases, 
  setKnowledgeBases, 
  loadingKBs, 
  errorKBs, 
  fetchKnowledgeBases 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Copy ID functionality
  const copyToClipboard = async (text, kbId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(kbId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // File Upload Logic
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!vapiAssistantId) {
      setUploadMessage({ type: 'error', text: 'Please select an assistant first to upload a knowledge base.' });
      return;
    }
    if (acceptedFiles.length === 0) {
      setUploadMessage({ type: 'error', text: 'No files selected or file type not accepted.' });
      return;
    }

    const file = acceptedFiles[0];
    setUploadMessage(null);
    setIsUploading(true);

    try {
      const response = await knowledgeBaseApi.uploadKnowledgeBase(vapiAssistantId, file);
      setUploadMessage({ type: 'success', text: `"${file.name}" uploaded successfully! KB ID: ${response.kb_id}` });
      fetchKnowledgeBases(); // Refresh list after successful upload
    } catch (err) {
      setUploadMessage({ type: 'error', text: err.message || 'Failed to upload file.' });
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  }, [vapiAssistantId, fetchKnowledgeBases]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
     
    },
    multiple: false,
  });

  // Delete Knowledge Base
  const handleDeleteKnowledgeBase = async (kbId) => {
    if (window.confirm("Are you sure you want to delete this knowledge base? This action cannot be undone.")) {
      setUploadMessage(null);
      try {
        const response = await knowledgeBaseApi.deleteKnowledgeBase(kbId);
        setUploadMessage({ type: 'success', text: response.message || 'Knowledge base deleted successfully.' });
        fetchKnowledgeBases(); // Refresh list
      } catch (err) {
        setUploadMessage({ type: 'error', text: err.message || 'Failed to delete knowledge base.' });
        console.error('Error deleting knowledge base:', err);
      }
    }
  };

  // Only render if an assistant is selected
  if (!vapiAssistantId) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center py-12">
          <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Bases</h2>
          <p className="text-gray-600">Select an assistant to manage its knowledge bases</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Database className="w-6 h-6 mr-2 text-blue-600" />
          Knowledge Bases
        </h2>
        <p className="text-gray-600">Upload documents to enhance your assistant's knowledge</p>
      </div>

      {uploadMessage && (
        <div className={`rounded-lg p-4 border mb-6 ${
          uploadMessage.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {uploadMessage.type === 'success' ? (
              <Check className="w-5 h-5 mr-2" />
            ) : (
              <div className="w-5 h-5 mr-2 rounded-full bg-red-200 flex items-center justify-center">
                <span className="text-xs">!</span>
              </div>
            )}
            {uploadMessage.text}
          </div>
        </div>
      )}

      {/* File Upload Section */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Upload Knowledge Base Document
        </label>
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
          } ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
          style={{ pointerEvents: isUploading ? 'none' : 'auto' }}
        >
          <input {...getInputProps()} disabled={isUploading} />
          
          <div className="flex flex-col items-center">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-blue-600 font-medium">Uploading file...</p>
                <p className="text-gray-500 text-sm mt-1">Please wait while we process your document</p>
              </>
            ) : isDragActive ? (
              <>
                <CloudUpload className="w-12 h-12 text-blue-500 mb-4" />
                <p className="text-blue-600 font-medium">Drop the file here</p>
                <p className="text-gray-500 text-sm mt-1">Release to upload your document</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-700 font-medium mb-2">Drag & drop a document here</p>
                <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                  <span className="bg-gray-200 px-2 py-1 rounded">.txt</span>
                  <span className="bg-gray-200 px-2 py-1 rounded">.pdf</span>
                  <span className="bg-gray-200 px-2 py-1 rounded">.csv</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Knowledge Bases List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Attached Knowledge Bases
          </h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {knowledgeBases.length}
          </span>
        </div>

        {loadingKBs && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading knowledge bases...</p>
          </div>
        )}

        {errorKBs && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{errorKBs}</p>
          </div>
        )}

        {knowledgeBases.length === 0 && !loadingKBs && !errorKBs && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">No knowledge bases yet</p>
            <p className="text-gray-400 text-sm">Upload your first document to get started</p>
          </div>
        )}

        <div className="space-y-3">
          {knowledgeBases.map((kb) => (
            <div
              key={kb.id}
              className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg p-4 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <FileText className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {kb.file_name}
                    </h4>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2 w-16">KB ID:</span>
                      <code className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-mono truncate max-w-32">
                        {kb.vapi_knowledge_base_id}
                      </code>
                      <button
                        onClick={() => copyToClipboard(kb.vapi_knowledge_base_id, kb.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy Knowledge Base ID"
                      >
                        {copiedId === kb.id ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2 w-16">File ID:</span>
                      <code className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-mono truncate max-w-32">
                        {kb.vapi_file_id}
                      </code>
                      <button
                        onClick={() => copyToClipboard(kb.vapi_file_id, `file-${kb.id}`)}
                        className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy File ID"
                      >
                        {copiedId === `file-${kb.id}` ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDeleteKnowledgeBase(kb.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ml-4"
                  title="Delete Knowledge Base"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseSection;