// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";

// const PhoneNumber = () => {
//   const [assistants, setAssistants] = useState([]);
//   const [phoneConfigs, setPhoneConfigs] = useState([]);
//   const [formData, setFormData] = useState({
//     id: "",
//     twilio_number: "",
//     account_sid: "",
//     auth_token: "",
//     assistant_id: "",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [toast, setToast] = useState({ show: false, msg: "", success: true });

//   useEffect(() => {
//     fetchAssistants();
//     fetchPhoneConfigs();
//   }, []);

//   const fetchAssistants = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/vapi/vapi/get-list-assistants");
//       if (!res.ok) throw new Error("Failed to fetch assistants");
//       const data = await res.json();
//       setAssistants(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Assistant fetch error", err);
//     }
//   };

//   const fetchPhoneConfigs = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/vapi/phone_numbers_with_assistants");
//       if (!res.ok) throw new Error("Failed to fetch phone configs");
//       const data = await res.json();
//       setPhoneConfigs(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Phone config fetch error", err);
//     }
//   };
//   const handleDeletePhone = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this phone number?")) return;
  
//     try {
//       const form = new FormData();
//       form.append("id", id);
  
//       const res = await fetch("http://localhost:8000/vapi/delete_phone_number", {
//         method: "POST",
//         body: form,
//       });
  
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.detail || "Failed to delete");
  
//       setToast({ show: true, msg: result.message, success: true });
//       fetchPhoneConfigs(); // Refresh the list
//     } catch (err) {
//       console.error("Delete error", err);
//       setToast({ show: true, msg: err.message, success: false });
//     }
  
//     setTimeout(() => setToast({ ...toast, show: false }), 3000);
//   };
  
//   const handleEdit = (phone) => {
//     setFormData({
//       id: phone.id,
//       twilio_number: phone.number,
//       account_sid: phone.twilioAccountSid || "",
//       auth_token: "",
//       assistant_id: phone.assistantId || "",
//     });
//     setShowForm(true);
//   };

//   const handleSubmit = async () => {
//     try {
//       const form = new FormData();

//       if (formData.id) {
//         // Update assistant only
//         form.append("id", formData.id);
//         form.append("assistant_id", formData.assistant_id);

//         const res = await fetch("http://localhost:8000/vapi/update_phone_assistant", {
//           method: "POST",
//           body: form,
//         });
//         const result = await res.json();
//         if (!res.ok) throw new Error(result.detail || "Failed to update");

//         setToast({ show: true, msg: result.message, success: true });
//       } else {
//         // Create new number
//         form.append("twilio_number", formData.twilio_number);
//         form.append("account_sid", formData.account_sid);
//         form.append("auth_token", formData.auth_token);
//         form.append("assistant_id", formData.assistant_id);

//         const res = await fetch("http://localhost:8000/vapi/add_phone_number", {
//           method: "POST",
//           body: form,
//         });
//         const result = await res.json();
//         if (!res.ok) throw new Error(result.detail || "Failed to connect");

//         setToast({ show: true, msg: result.message, success: true });
//       }

//       // Reset form and reload configs
//       setFormData({
//         id: "",
//         twilio_number: "",
//         account_sid: "",
//         auth_token: "",
//         assistant_id: "",
//       });
//       fetchPhoneConfigs();
//       setShowForm(false);
//     } catch (err) {
//       setToast({ show: true, msg: err.message, success: false });
//     }

//     setTimeout(() => setToast({ ...toast, show: false }), 3000);
//   };

//   return (
//     <>
//     <div className="min-h-screen flex flex-col md:flex-row">
//     <Sidebar />
//     <div className="flex min-h-screen bg-gray-100">

//       <div className="w-1/3 bg-white shadow-md p-4">
//         <h2 className="text-lg font-semibold mb-4">Configured Phone Numbers</h2>
//         {phoneConfigs.length === 0 ? (
//           <p className="text-sm text-gray-500">No phone numbers configured yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {phoneConfigs.map((phone) => (
//               <li
//               key={phone.id}
//               className="border rounded p-3 flex justify-between items-center hover:bg-gray-100 transition"
//             >
//               <div onClick={() => handleEdit(phone)} className="cursor-pointer flex-1">
//                 <p className="font-medium">{phone.number}</p>
//                 <p className="text-sm text-gray-600">
//                   Assistant:{" "}
//                   <span className="font-semibold">{phone.assistant_name || "Unknown"}</span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleDeletePhone(phone.id)}
//                 className="text-red-500 hover:text-red-700 ml-4"
//                 title="Delete"
//               >
//                 🗑️
//               </button>
//             </li>
//             ))}
//           </ul>
//         )}

//         {/* Create New Button */}
//         <div className="mt-6">
//           <button
//             onClick={() => {
//               setFormData({
//                 id: "",
//                 twilio_number: "",
//                 account_sid: "",
//                 auth_token: "",
//                 assistant_id: "",
//               });
//               setShowForm(!showForm);
//             }}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             {showForm ? "Cancel" : "Create New Number"}
//           </button>
//         </div>
//       </div>

//       {/* Form Panel */}
//       {showForm && (
//         <div className="w-2/3 p-8">
//           <h2 className="text-xl font-bold mb-6">
//             {formData.id ? "Update Assistant for Number" : "Add Twilio Number"}
//           </h2>

//           <div className="space-y-4 max-w-lg">
//             <div>
//               <label className="block text-sm font-medium">Twilio Phone Number</label>
//               <input
//                 type="text"
//                 value={formData.twilio_number}
//                 disabled={!!formData.id}
//                 onChange={(e) => setFormData({ ...formData, twilio_number: e.target.value })}
//                 className="mt-1 block w-full border rounded px-3 py-2"
//               />
//             </div>

//             {!formData.id && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium">Twilio Account SID</label>
//                   <input
//                     type="text"
//                     value={formData.account_sid}
//                     onChange={(e) =>
//                       setFormData({ ...formData, account_sid: e.target.value })
//                     }
//                     className="mt-1 block w-full border rounded px-3 py-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium">Twilio Auth Token</label>
//                   <input
//                     type="password"
//                     value={formData.auth_token}
//                     onChange={(e) =>
//                       setFormData({ ...formData, auth_token: e.target.value })
//                     }
//                     className="mt-1 block w-full border rounded px-3 py-2"
//                   />
//                 </div>
//               </>
//             )}

//             <div>
//               <label className="block text-sm font-medium">Select Assistant</label>
//               <select
//                 value={formData.assistant_id}
//                 onChange={(e) =>
//                   setFormData({ ...formData, assistant_id: e.target.value })
//                 }
//                 className="mt-1 block w-full border rounded px-3 py-2"
//               >
//                 <option value="">-- Select Assistant --</option>
//                 {assistants.map((a) => (
//                   <option key={a.id} value={a.id}>
//                     {a.name || a.id.slice(0, 8)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
//             >
//               {formData.id ? "Update Assistant" : "Connect Number"}
//             </button>

//             {toast.show && (
//               <div
//                 className={`mt-4 p-3 rounded text-white ${
//                   toast.success ? "bg-green-500" : "bg-red-500"
//                 }`}
//               >
//                 {toast.msg}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//     </>
//   );
// };

// export default PhoneNumber;

import React, { useEffect, useState } from "react";

import { Phone, Plus, Edit2, Trash2, CheckCircle, AlertCircle, X } from 'lucide-react';
import Sidebar from "../components/Sidebar";

const PhoneNumber = () => {
  const [assistants, setAssistants] = useState([]);
  const [phoneConfigs, setPhoneConfigs] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    twilio_number: "",
    account_sid: "",
    auth_token: "",
    assistant_id: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", success: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssistants();
    fetchPhoneConfigs();
  }, []);

  const fetchAssistants = async () => {
    try {
      const res = await fetch("http://localhost:8000/vapi/vapi/get-list-assistants");
      if (!res.ok) throw new Error("Failed to fetch assistants");
      const data = await res.json();
      setAssistants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Assistant fetch error", err);
    }
  };

  const fetchPhoneConfigs = async () => {
    try {
      const res = await fetch("http://localhost:8000/vapi/phone_numbers_with_assistants");
      if (!res.ok) throw new Error("Failed to fetch phone configs");
      const data = await res.json();
      setPhoneConfigs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Phone config fetch error", err);
    }
  };

  const handleDeletePhone = async (id) => {
    if (!window.confirm("Are you sure you want to delete this phone number?")) return;
    
    setLoading(true);
    try {
      const form = new FormData();
      form.append("id", id);
  
      const res = await fetch("http://localhost:8000/vapi/delete_phone_number", {
        method: "POST",
        body: form,
      });
  
      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || "Failed to delete");
  
      setToast({ show: true, msg: result.message, success: true });
      fetchPhoneConfigs();
    } catch (err) {
      console.error("Delete error", err);
      setToast({ show: true, msg: err.message, success: false });
    } finally {
      setLoading(false);
    }
  
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };
  
  const handleEdit = (phone) => {
    setFormData({
      id: phone.id,
      twilio_number: phone.number,
      account_sid: phone.twilioAccountSid || "",
      auth_token: "",
      assistant_id: phone.assistantId || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const form = new FormData();

      if (formData.id) {
        form.append("id", formData.id);
        form.append("assistant_id", formData.assistant_id);

        const res = await fetch("http://localhost:8000/vapi/update_phone_assistant", {
          method: "POST",
          body: form,
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.detail || "Failed to update");

        setToast({ show: true, msg: result.message, success: true });
      } else {
        form.append("twilio_number", formData.twilio_number);
        form.append("account_sid", formData.account_sid);
        form.append("auth_token", formData.auth_token);
        form.append("assistant_id", formData.assistant_id);

        const res = await fetch("http://localhost:8000/vapi/add_phone_number", {
          method: "POST",
          body: form,
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.detail || "Failed to connect");

        setToast({ show: true, msg: result.message, success: true });
      }

      setFormData({
        id: "",
        twilio_number: "",
        account_sid: "",
        auth_token: "",
        assistant_id: "",
      });
      fetchPhoneConfigs();
      setShowForm(false);
    } catch (err) {
      setToast({ show: true, msg: err.message, success: false });
    } finally {
      setLoading(false);
    }

    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      id: "",
      twilio_number: "",
      account_sid: "",
      auth_token: "",
      assistant_id: "",
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col lg:flex-row w-[calc(100%-18rem)] ml-[18rem]">
        {/* Phone Numbers List */}
        <div className="w-full lg:w-2/5 xl:w-1/3 bg-white shadow-lg border-r border-slate-200">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-blue-600" />
                  Phone Numbers
                </h2>
                <p className="text-slate-600 mt-1">Manage your Twilio phone numbers</p>
              </div>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {phoneConfigs.length}
              </div>
            </div>
          </div>

          <div className="p-6">
            <button
              onClick={() => {
                setFormData({
                  id: "",
                  twilio_number: "",
                  account_sid: "",
                  auth_token: "",
                  assistant_id: "",
                });
                setShowForm(true);
              }}
              className="w-full mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add New Number
            </button>

            {phoneConfigs.length === 0 ? (
              <div className="text-center py-12">
                <Phone className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No phone numbers configured</p>
                <p className="text-slate-400 text-sm mt-1">Add your first Twilio number to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {phoneConfigs.map((phone) => (
                  <div
                    key={phone.id}
                    className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 cursor-pointer" onClick={() => handleEdit(phone)}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="font-semibold text-slate-800 text-lg">{phone.number}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-slate-100">
                          <p className="text-sm text-slate-600">
                            <span className="font-medium">Assistant:</span>{" "}
                            <span className="text-slate-800 font-semibold">
                              {phone.assistant_name || "Unknown"}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(phone)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePhone(phone.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Panel */}
        {showForm ? (
          <div className="flex-1 bg-white">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {formData.id ? "Update Phone Number" : "Add New Phone Number"}
                  </h2>
                  <p className="text-slate-600 mt-1">
                    {formData.id ? "Update the assistant for this number" : "Connect a new Twilio phone number"}
                  </p>
                </div>
                <button
                  onClick={closeForm}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Twilio Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.twilio_number}
                    disabled={!!formData.id}
                    onChange={(e) => setFormData({ ...formData, twilio_number: e.target.value })}
                    placeholder="+1234567890"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      formData.id 
                        ? 'bg-slate-100 border-slate-200 text-slate-500' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  />
                </div>

                {!formData.id && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Twilio Account SID
                      </label>
                      <input
                        type="text"
                        value={formData.account_sid}
                        onChange={(e) => setFormData({ ...formData, account_sid: e.target.value })}
                        placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Twilio Auth Token
                      </label>
                      <input
                        type="password"
                        value={formData.auth_token}
                        onChange={(e) => setFormData({ ...formData, auth_token: e.target.value })}
                        placeholder="••••••••••••••••••••••••••••••••"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Select Assistant
                  </label>
                  <select
                    value={formData.assistant_id}
                    onChange={(e) => setFormData({ ...formData, assistant_id: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors bg-white"
                  >
                    <option value="">Choose an assistant...</option>
                    {assistants.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name || a.id.slice(0, 8)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.assistant_id || (!formData.id && (!formData.twilio_number || !formData.account_sid || !formData.auth_token))}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        {formData.id ? "Update Assistant" : "Connect Number"}
                      </>
                    )}
                  </button>
                  <button
                    onClick={closeForm}
                    className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Phone Number Management</h3>
              <p className="text-slate-500 max-w-md">
                Select a phone number from the list to edit its settings, or create a new one to get started.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg text-white font-medium ${
            toast.success 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-red-500 to-rose-500'
          }`}>
            {toast.success ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{toast.msg}</span>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneNumber;