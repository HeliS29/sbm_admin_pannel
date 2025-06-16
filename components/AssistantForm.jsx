// // src/components/AssistantForm.jsx
// import React, { useState, useEffect } from 'react';
// import Dropdown from './Dropdown';
// import assistantApi from '../api/assistantApi';
// import { useForm } from 'react-hook-form'; // For form management

// const VAPI_PROVIDERS = [
//   { id: 'openai', label: 'OpenAI' },
//   { id: 'google', label: 'Google' },
//   // Add other Vapi supported providers here
// ];

// const VAPI_MODELS = {
//   openai: [
//     { id: 'gpt-4o', label: 'GPT-4o' },
//     { id: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
//     { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
//   ],
//   google: [
//     { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
//     { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
//   ],
//   // Add models for other providers
// };

// const FIRST_MESSAGE_MODES = [
//     { id: 'assistant-speaks-first', label: 'Assistant speaks first' },
//     { id: 'waits-for-user', label: 'Assistant waits for user' },
//     { id: 'assistant-speaks-with-model', label: 'Assistant speaks first with model generated message' },
//   ];

// const AssistantForm = ({ onSubmit, initialData = {}, isEditMode = false }) => {
//   const { register, handleSubmit, watch, reset,setValue, formState: { errors } } = useForm({
//     defaultValues: initialData,
//   });
//   useEffect(() => {
//     reset(initialData);
//   }, [initialData, reset]);

//   const [voices, setVoices] = useState([]);
//   const [loadingVoices, setLoadingVoices] = useState(false);
//   const [voicesError, setVoicesError] = useState(null);

//   const selectedProvider = watch('provider');
//   const selectedVoiceId = watch('voice_id');

//   useEffect(() => {
//     const fetchVoices = async () => {
//       setLoadingVoices(true);
//       setVoicesError(null);
//       try {
//         const data = await assistantApi.getVoices(); // Data is directly the parsed JSON
//         setVoices(data.voices);
//       } catch (err) {
//         setVoicesError(err.message || 'Failed to load voices. Please check Azure Speech config.');
//         console.error('Error fetching voices:', err);
//       } finally {
//         setLoadingVoices(false);
//       }
//     };

//     fetchVoices();
//   }, []);

//   useEffect(() => {
//     // When provider changes, reset model
//     setValue('model', '');
//   }, [selectedProvider, setValue]);

//   const handleFormSubmit = (data) => {
//     onSubmit(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
//       <div className="mb-4">
//         <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">
//           Assistant Name
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
//           id="name"
//           type="text"
//           placeholder="My Amazing Assistant"
//           {...register('name', { required: 'Assistant Name is required' })}
//         />
//         {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
//       </div>

//       <Dropdown
//         label="Provider"
//         options={VAPI_PROVIDERS}
//         value={selectedProvider}
//         onChange={(e) => setValue('provider', e.target.value)}
//         placeholder="Select a Provider"
//       />
//       {errors.provider && <p className="text-red-500 text-xs italic">{errors.provider.message}</p>}

//       <Dropdown
//         label="Model"
//         options={selectedProvider ? VAPI_MODELS[selectedProvider] || [] : []}
//         value={watch('model')}
//         onChange={(e) => setValue('model', e.target.value)}
//         placeholder="Select a Model"
//         disabled={!selectedProvider}
//       />
//       {errors.model && <p className="text-red-500 text-xs italic">{errors.model.message}</p>}

//       <Dropdown
//         label="Voice"
//         options={voices}
//         value={watch('voice_id')}
//         onChange={(e) => setValue('voice_id', e.target.value)}
//         placeholder={loadingVoices ? 'Loading voices...' : 'Select a Voice'}
//         disabled={loadingVoices}
//       />
//       {voicesError && <p className="text-red-500 text-xs italic">{voicesError}</p>}
//       {errors.voice_id && <p className="text-red-500 text-xs italic">{errors.voice_id.message}</p>}


//       <Dropdown
//         label="First Message Mode"
//         options={FIRST_MESSAGE_MODES}
//         value={watch('first_message_mode')}
//         onChange={(e) => setValue('first_message_mode', e.target.value)}
//         placeholder="Select First Message Mode"
//       />
//       {errors.first_message_mode && <p className="text-red-500 text-xs italic">{errors.first_message_mode.message}</p>}

//       <div className="mb-4">
//         <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="first_message">
//           First Message
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
//           id="first_message"
//           type="text"
//           placeholder="Hello! How can I help you today?"
//           {...register('first_message')}
//         />
//         {errors.first_message && <p className="text-red-500 text-xs italic">{errors.first_message.message}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="system_prompt">
//           System Prompt
//         </label>
//         <textarea
//           className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 h-32"
//           id="system_prompt"
//           placeholder="You are a helpful AI assistant."
//           {...register('system_prompt', { required: 'System Prompt is required' })}
//         ></textarea>
//         {errors.system_prompt && <p className="text-red-500 text-xs italic">{errors.system_prompt.message}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="temperature">
//           Temperature (0.0 - 1.0)
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
//           id="temperature"
//           type="number"
//           step="0.01"
//           min="0"
//           max="1"
//           defaultValue={0.7}
//           {...register('temperature', {
//             required: 'Temperature is required',
//             min: { value: 0, message: 'Minimum temperature is 0' },
//             max: { value: 1, message: 'Maximum temperature is 1' },
//             valueAsNumber: true,
//           })}
//         />
//         {errors.temperature && <p className="text-red-500 text-xs italic">{errors.temperature.message}</p>}
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="max_tokens">
//           Max Tokens
//         </label>
//         <input
//           className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
//           id="max_tokens"
//           type="number"
//           min="1"
//           defaultValue={256}
//           {...register('max_tokens', {
//             required: 'Max Tokens is required',
//             min: { value: 1, message: 'Minimum max tokens is 1' },
//             valueAsNumber: true,
//           })}
//         />
//         {errors.max_tokens && <p className="text-red-500 text-xs italic">{errors.max_tokens.message}</p>}
//       </div>

//       <button
//         type="submit"
//         className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         {isEditMode ? 'Update Assistant' : 'Create Assistant'}
//       </button>
//     </form>
//   );
// };

// export default AssistantForm;


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import assistantApi from '../api/assistantApi';

const VAPI_PROVIDERS = [
  { id: 'openai', label: 'OpenAI' },
  { id: 'google', label: 'Google' },
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
    defaultValues: initialData,
  });

  const [voices, setVoices] = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voicesError, setVoicesError] = useState(null);

  const selectedProvider = watch('provider');

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  useEffect(() => {
    const fetchVoices = async () => {
      setLoadingVoices(true);
      setVoicesError(null);
      try {
        const data = await assistantApi.getVoices();
        setVoices(data.voices);
      } catch (err) {
        setVoicesError(err.message || 'Failed to load voices.');
        console.error('Error fetching voices:', err);
      } finally {
        setLoadingVoices(false);
      }
    };
    fetchVoices();
  }, []);

  useEffect(() => {
    setValue('model', '');
  }, [selectedProvider, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white disabled:opacity-50"
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

        {/* Voice and First Message Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Voice</label>
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Message Mode</label>
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
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
        </div>

        {/* First Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">First Message</label>
          <input
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
            placeholder="Hello! How can I help you today?"
            {...register('first_message')}
          />
          {errors.first_message && <p className="text-red-500 text-sm mt-1">{errors.first_message.message}</p>}
        </div>

        {/* System Prompt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">System Prompt</label>
          <textarea
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
            placeholder="You are a helpful AI assistant."
            {...register('system_prompt', { required: 'System Prompt is required' })}
          />
          {errors.system_prompt && <p className="text-red-500 text-sm mt-1">{errors.system_prompt.message}</p>}
        </div>

        {/* Temperature and Max Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Temperature (0.0 - 1.0)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
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
