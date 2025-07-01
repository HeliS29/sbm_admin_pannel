
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import assistantApi from '../api/assistantApi';
import TagSelector from './TagSelector';

const VAPI_PROVIDERS = [
  { id: 'openai', label: 'OpenAI' },
  { id: 'google', label: 'Google' },
  { id: 'anthropic', label: 'Anthropic' },
];
const VOICE_PROVIDERS = [
    { id: 'azure', label: 'Azure' },
    { id: '11labs', label: '11labs' },
  ];

const VAPI_MODELS = {
  openai: [
    { id: 'gpt-4o', label: 'GPT-4o' },
    { id: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  ],
  google: [
    { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
    { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
  ],
  anthropic: [
    { id: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
    { id: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
    { id: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
    { id: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet' },
    { id: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
    { id: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku' },
    { id: 'claude-3-7-sonnet-20250219', label: 'Claude 3.7 Sonnet' },
    { id: 'claude-opus-4-20250514', label: 'Claude Opus 4' },
    { id: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4' },
  ],
  
};

const FIRST_MESSAGE_MODES = [
  { id: 'assistant-speaks-first', label: 'Assistant speaks first' },
  { id: 'waits-for-user', label: 'Assistant waits for user' },
  { id: 'assistant-speaks-with-model', label: 'Assistant speaks first with model generated message' },
];

const AssistantForm = ({ onSubmit, initialData = {}, isEditMode = false }) => {
    const {
      register,
      handleSubmit,
      watch,
      reset,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: {
        voice_provider: 'azure',
        ...initialData,
      },
    });
  
  const [voices, setVoices] = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voicesError, setVoicesError] = useState(null);
  const [selectedTags, setSelectedTags] = useState(initialData.tags || []);

  const selectedProvider = watch('provider');
  const selectedVoiceProvider = watch('voice_provider');

  // Fetch voices based on voice_provider
  useEffect(() => {
    const fetchVoices = async () => {
      // When we fetch new voices, we should clear the old selection
      setValue('voice_id', ''); 
      setLoadingVoices(true);
      setVoicesError(null);
      try {
        const data = await assistantApi.getVoices(selectedVoiceProvider);
        setVoices(data.voices);
      } catch (err) {
        setVoicesError(err.message || 'Failed to load voices.');
        console.error('Error fetching voices:', err);
      } finally {
        setLoadingVoices(false);
      }
    };

    if (selectedVoiceProvider) {
      fetchVoices();
    }
  }, [selectedVoiceProvider, setValue]);

  useEffect(() => {
    // Only run this logic if we have initialData and the voices array is populated
    if (initialData.voice_id && voices.length > 0) {
      const fullVoice = voices.find((v) => v.id === initialData.voice_id);
      if (fullVoice) {
        setValue('voice_id', fullVoice.id, { shouldDirty: false });
      }
    }
  }, [initialData.voice_id, voices, setValue]);

  
  // Restore initial tag data on load (This is correct)
  useEffect(() => {
    if (initialData.tags) {
      const tagsArray = Array.isArray(initialData.tags) ? initialData.tags : [initialData.tags];
      setSelectedTags(tagsArray);
    }
  }, [initialData.tags]);

  // Reset model field when provider changes (This is correct)
  useEffect(() => {
    if (!initialData.model) {
      setValue('model', '');
    }
  }, [selectedProvider, initialData.model, setValue]);

  const handleFormSubmit = (data) => {
    const formDataWithTags = {
      ...data,
      tag_id: selectedTags.length > 0 ? selectedTags[0].id : null,
    };
    onSubmit(formDataWithTags);
  };

  const handleTagsChange = (newTags) => {
    setSelectedTags(newTags);
  };


  
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {isEditMode ? 'Edit Assistant Configuration' : 'Create New Assistant'}
          </h3>
          <p className="text-gray-600">Configure your AI assistant with the settings below</p>
        </div>
  
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Assistant Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Assistant Name</label>
            <input
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
              placeholder="My Amazing Assistant"
              {...register('name', { required: 'Assistant Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
  
          {/* Provider and Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Provider</label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                value={selectedProvider || ''}
                onChange={(e) => setValue('provider', e.target.value)}
              >
                <option value="">Select a Provider</option>
                {VAPI_PROVIDERS.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.label}
                  </option>
                ))}
              </select>
              {errors.provider && <p className="text-red-500 text-sm mt-1">{errors.provider.message}</p>}
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                value={watch('model') || ''}
                onChange={(e) => setValue('model', e.target.value)}
                disabled={!selectedProvider}
              >
                <option value="">Select a Model</option>
                {selectedProvider &&
                  VAPI_MODELS[selectedProvider]?.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.label}
                    </option>
                  ))}
              </select>
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
            </div>
          </div>
  
          {/* Voice Provider and Voice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Voice Provider</label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                value={selectedVoiceProvider || ''}
                onChange={(e) => setValue('voice_provider', e.target.value)}
              >
                <option value="">Select a Voice Provider</option>
                {VOICE_PROVIDERS.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.label}
                  </option>
                ))}
              </select>
              {errors.voice_provider && <p className="text-red-500 text-sm mt-1">{errors.voice_provider.message}</p>}
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Voice</label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                value={watch('voice_id') || ''}
                onChange={(e) => setValue('voice_id', e.target.value)}
                disabled={loadingVoices}
              >
                <option value="">{loadingVoices ? 'Loading voices...' : 'Select a Voice'}</option>
                {voices.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.label}
                  </option>
                ))}
              </select>
              {voicesError && <p className="text-red-500 text-sm mt-1">{voicesError}</p>}
              {errors.voice_id && <p className="text-red-500 text-sm mt-1">{errors.voice_id.message}</p>}
            </div>
          </div>

           {/* First Message Mode */}
           <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Message Mode</label>
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              value={watch('first_message_mode') || ''}
              onChange={(e) => setValue('first_message_mode', e.target.value)}
            >
              <option value="">Select First Message Mode</option>
              {FIRST_MESSAGE_MODES.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.label}
                </option>
              ))}
            </select>
            {errors.first_message_mode && (
              <p className="text-red-500 text-sm mt-1">{errors.first_message_mode.message}</p>
            )}
          </div>
  
          {/* First Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Message</label>
            <input
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              placeholder="Hello! How can I help you today?"
              {...register('first_message')}
            />
            {errors.first_message && <p className="text-red-500 text-sm mt-1">{errors.first_message.message}</p>}
          </div>
  
  
          {/* System Prompt */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">System Prompt</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 h-64 resize-none"
              placeholder="You are a helpful AI assistant."
              {...register('system_prompt', { required: 'System Prompt is required' })}
            />
            {errors.system_prompt && <p className="text-red-500 text-sm mt-1">{errors.system_prompt.message}</p>}
          </div>
  
          {/* Tags Section */}
          <TagSelector
            selectedTags={selectedTags}
            value={watch('tags') || ''}
            onTagsChange={handleTagsChange}
            placeholder="Select tags for this assistant..."
          />
  
          {/* Temperature and Max Tokens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Temperature (0.0 - 1.0)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                {...register('temperature', {
                  required: 'Temperature is required',
                  min: { value: 0, message: 'Minimum is 0' },
                  max: { value: 1, message: 'Maximum is 1' },
                  valueAsNumber: true,
                })}
              />
              {errors.temperature && <p className="text-red-500 text-sm mt-1">{errors.temperature.message}</p>}
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Tokens</label>
              <input
                type="number"
                min="1"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                {...register('max_tokens', {
                  required: 'Max Tokens is required',
                  min: { value: 1, message: 'Minimum is 1' },
                  valueAsNumber: true,
                })}
              />
              {errors.max_tokens && <p className="text-red-500 text-sm mt-1">{errors.max_tokens.message}</p>}
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isEditMode ? 'Update Assistant' : 'Create Assistant'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AssistantForm;
// const AssistantForm = ({ onSubmit, initialData = {}, isEditMode = false }) => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: initialData,
//   });

//   const [voices, setVoices] = useState([]);
//   const [loadingVoices, setLoadingVoices] = useState(false);
//   const [voicesError, setVoicesError] = useState(null);
//   const [selectedTags, setSelectedTags] = useState(initialData.tags || []);
  
//   const selectedProvider = watch('provider');
  
//   useEffect(() => {
//     const voiceId = watch('voice_id');
  
//     // Auto-correct if short version used
//     if (voiceId && !voiceId.startsWith('azure/') && voices.length > 0) {
//       const fullId = voices.find(v => v.id.endsWith(voiceId));
//       if (fullId) {
//         setValue('voice_id', fullId.id);  // Fix selection
//       }
//     }
//   }, [voices, watch('voice_id')]);
  
//   useEffect(() => {
//     if (!loadingVoices && voices.length > 0 && initialData.voice_id) {
//       reset(initialData);
//     }
//   }, [initialData, reset, loadingVoices, voices]);
  
//   useEffect(() => {
//     const voiceId = watch('voice_id');
//     console.log('Selected voice_id:', voiceId);
//     console.log('Voice IDs available:', voices.map(v => v.id));
//     console.log('Matched in list:', voices.find(v => v.id === voiceId));
//   }, [voices, watch('voice_id')]);

//   useEffect(() => {
//     const fetchVoices = async () => {
//       setLoadingVoices(true);
//       setVoicesError(null);
//       try {
//         const data = await assistantApi.getVoices();
//         setVoices(data.voices);
//       } catch (err) {
//         setVoicesError(err.message || 'Failed to load voices.');
//         console.error('Error fetching voices:', err);
//       } finally {
//         setLoadingVoices(false);
//       }
//     };
//     fetchVoices();
//   }, []);

//   useEffect(() => {
//     setValue('model', '');
//   }, [selectedProvider, setValue]);

//   // Update selected tags when initialData changes
//   useEffect(() => {
//     if (initialData.tags) {
//       const tagsArray = Array.isArray(initialData.tags)
//         ? initialData.tags
//         : [initialData.tags];
//       setSelectedTags(tagsArray); // this fills the TagSelector
//     }
//   }, [initialData.tags]);
//   console.log("SelectedTags received:", selectedTags);

//   const handleFormSubmit = (data) => {
//     // Include selected tags in the form data
//     const formDataWithTags = {
//         ...data,
//         tag_id: selectedTags.length > 0 ? selectedTags[0].id : null
//       };
//     onSubmit(formDataWithTags);
//   };

//   const handleTagsChange = (newTags) => {
//     setSelectedTags(newTags);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
//       <div className="mb-6">
//         <h3 className="text-2xl font-bold text-gray-900 mb-2">
//           {isEditMode ? 'Edit Assistant Configuration' : 'Create New Assistant'}
//         </h3>
//         <p className="text-gray-600">Configure your AI assistant with the settings below</p>
//       </div>

//       <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
//         {/* Assistant Name */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">Assistant Name</label>
//           <input
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
//             placeholder="My Amazing Assistant"
//             {...register('name', { required: 'Assistant Name is required' })}
//           />
//           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//         </div>

//         {/* Provider and Model */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Provider</label>
//             <select
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
//               value={selectedProvider || ''}
//               onChange={(e) => setValue('provider', e.target.value)}
//             >
//               <option value="">Select a Provider</option>
//               {VAPI_PROVIDERS.map((provider) => (
//                 <option key={provider.id} value={provider.id}>
//                   {provider.label}
//                 </option>
//               ))}
//             </select>
//             {errors.provider && <p className="text-red-500 text-sm mt-1">{errors.provider.message}</p>}
//           </div>
          

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
//             <select
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white disabled:opacity-50"
//               value={watch('model') || ''}
//               onChange={(e) => setValue('model', e.target.value)}
//               disabled={!selectedProvider}
//             >
//               <option value="">Select a Model</option>
//               {selectedProvider &&
//                 VAPI_MODELS[selectedProvider]?.map((model) => (
//                   <option key={model.id} value={model.id}>
//                     {model.label}
//                   </option>
//                 ))}
//             </select>
//             {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
//           </div>
//         </div>

//         {/* Voice and First Message Mode */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Voice</label>
//             <select
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
//               value={watch('voice_id') || ''}
//               onChange={(e) => setValue('voice_id', e.target.value)}
//               disabled={loadingVoices}
//             >
//               <option value="">{loadingVoices ? 'Loading voices...' : 'Select a Voice'}</option>
//               {voices.map((voice) => (
//                 <option className="" key={voice.id} value={voice.id}>
//                   {voice.label}
//                 </option>
//               ))}
//             </select>
            
//             {voicesError && <p className="text-red-500 text-sm mt-1">{voicesError}</p>}
//             {errors.voice_id && <p className="text-red-500 text-sm mt-1">{errors.voice_id.message}</p>}
//           </div>
        
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">First Message Mode</label>
//             <select
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
//               value={watch('first_message_mode') || ''}
//               onChange={(e) => setValue('first_message_mode', e.target.value)}
//             >
//               <option value="">Select First Message Mode</option>
//               {FIRST_MESSAGE_MODES.map((mode) => (
//                 <option key={mode.id} value={mode.id}>
//                   {mode.label}
//                 </option>
//               ))}
//             </select>
//             {errors.first_message_mode && (
//               <p className="text-red-500 text-sm mt-1">{errors.first_message_mode.message}</p>
//             )}
//           </div>
//         </div>

//         {/* First Message */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">First Message</label>
//           <input
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
//             placeholder="Hello! How can I help you today?"
//             {...register('first_message')}
//           />
//           {errors.first_message && <p className="text-red-500 text-sm mt-1">{errors.first_message.message}</p>}
//         </div>

//         {/* System Prompt */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">System Prompt</label>
//           <textarea
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 h-64 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
//             placeholder="You are a helpful AI assistant."
//             {...register('system_prompt', { required: 'System Prompt is required' })}
//           />
//           {errors.system_prompt && <p className="text-red-500 text-sm mt-1">{errors.system_prompt.message}</p>}
//         </div>

//         {/* Tags Section */}
//         <TagSelector
//           selectedTags={selectedTags}
//           value={watch('tags') || ''}
//           onTagsChange={handleTagsChange}
//           placeholder="Select tags for this assistant..."
//         />

//         {/* Temperature and Max Tokens */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Temperature (0.0 - 1.0)</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               max="1"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
//               {...register('temperature', {
//                 required: 'Temperature is required',
//                 min: { value: 0, message: 'Minimum is 0' },
//                 max: { value: 1, message: 'Maximum is 1' },
//                 valueAsNumber: true,
//               })}
//             />
//             {errors.temperature && <p className="text-red-500 text-sm mt-1">{errors.temperature.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Max Tokens</label>
//             <input
//               type="number"
//               min="1"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
//               {...register('max_tokens', {
//                 required: 'Max Tokens is required',
//                 min: { value: 1, message: 'Minimum is 1' },
//                 valueAsNumber: true,
//               })}
//             />
//             {errors.max_tokens && <p className="text-red-500 text-sm mt-1">{errors.max_tokens.message}</p>}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-6 border-t border-gray-100">
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-[1.02]"
//           >
//             {isEditMode ? 'Update Assistant' : 'Create Assistant'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AssistantForm;
