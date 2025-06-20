
// import React, { useEffect, useState } from "react";

// import { Phone, Plus, Edit2, Trash2, CheckCircle, AlertCircle, X } from 'lucide-react';
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
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchAssistants();
//     fetchPhoneConfigs();
//   }, []);

//   const fetchAssistants = async () => {
//     try {
//       const res = await fetch("https://api.interactivv.pro//vapi/vapi/get-list-assistants");
//       if (!res.ok) throw new Error("Failed to fetch assistants");
//       const data = await res.json();
//       setAssistants(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Assistant fetch error", err);
//     }
//   };

//   const fetchPhoneConfigs = async () => {
//     try {
//       const res = await fetch("https://api.interactivv.pro//vapi/phone_numbers_with_assistants");
//       if (!res.ok) throw new Error("Failed to fetch phone configs");
//       const data = await res.json();
//       setPhoneConfigs(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Phone config fetch error", err);
//     }
//   };

//   const handleDeletePhone = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this phone number?")) return;
    
//     setLoading(true);
//     try {
//       const form = new FormData();
//       form.append("id", id);
  
//       const res = await fetch("https://api.interactivv.pro//vapi/delete_phone_number", {
//         method: "POST",
//         body: form,
//       });
  
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.detail || "Failed to delete");
  
//       setToast({ show: true, msg: result.message, success: true });
//       fetchPhoneConfigs();
//     } catch (err) {
//       console.error("Delete error", err);
//       setToast({ show: true, msg: err.message, success: false });
//     } finally {
//       setLoading(false);
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
//     setLoading(true);
//     try {
//       const form = new FormData();

//       if (formData.id) {
//         form.append("id", formData.id);
//         form.append("assistant_id", formData.assistant_id);

//         const res = await fetch("https://api.interactivv.pro//vapi/update_phone_assistant", {
//           method: "POST",
//           body: form,
//         });
//         const result = await res.json();
//         if (!res.ok) throw new Error(result.detail || "Failed to update");

//         setToast({ show: true, msg: result.message, success: true });
//       } else {
//         form.append("twilio_number", formData.twilio_number);
//         form.append("account_sid", formData.account_sid);
//         form.append("auth_token", formData.auth_token);
//         form.append("assistant_id", formData.assistant_id);

//         const res = await fetch("https://api.interactivv.pro//vapi/add_phone_number", {
//           method: "POST",
//           body: form,
//         });
//         const result = await res.json();
//         if (!res.ok) throw new Error(result.detail || "Failed to connect");

//         setToast({ show: true, msg: result.message, success: true });
//       }

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
//     } finally {
//       setLoading(false);
//     }

//     setTimeout(() => setToast({ ...toast, show: false }), 3000);
//   };

//   const closeForm = () => {
//     setShowForm(false);
//     setFormData({
//       id: "",
//       twilio_number: "",
//       account_sid: "",
//       auth_token: "",
//       assistant_id: "",
//     });
//   };

//   return (
//     <div className="min-h-screen flex bg-slate-50">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col lg:flex-row w-[calc(100%-18rem)] ml-[18rem]">
//         {/* Phone Numbers List */}
//         <div className="w-full lg:w-2/5 xl:w-1/3 bg-white shadow-lg border-r border-slate-200">
//           <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//                   <Phone className="w-6 h-6 text-blue-600" />
//                   Phone Numbers
//                 </h2>
//                 <p className="text-slate-600 mt-1">Manage your Twilio phone numbers</p>
//               </div>
//               <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//                 {phoneConfigs.length}
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <button
//               onClick={() => {
//                 setFormData({
//                   id: "",
//                   twilio_number: "",
//                   account_sid: "",
//                   auth_token: "",
//                   assistant_id: "",
//                 });
//                 setShowForm(true);
//               }}
//               className="w-full mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
//             >
//               <Plus className="w-5 h-5" />
//               Add New Number
//             </button>

//             {phoneConfigs.length === 0 ? (
//               <div className="text-center py-12">
//                 <Phone className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                 <p className="text-slate-500 font-medium">No phone numbers configured</p>
//                 <p className="text-slate-400 text-sm mt-1">Add your first Twilio number to get started</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {phoneConfigs.map((phone) => (
//                   <div
//                     key={phone.id}
//                     className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1 cursor-pointer" onClick={() => handleEdit(phone)}>
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                           <p className="font-semibold text-slate-800 text-lg">{phone.number}</p>
//                         </div>
//                         <div className="bg-white rounded-lg p-3 border border-slate-100">
//                           <p className="text-sm text-slate-600">
//                             <span className="font-medium">Assistant:</span>{" "}
//                             <span className="text-slate-800 font-semibold">
//                               {phone.assistant_name || "Unknown"}
//                             </span>
//                           </p>
//                         </div>
//                       </div>
                      
//                       <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           onClick={() => handleEdit(phone)}
//                           className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                           title="Edit"
//                         >
//                           <Edit2 className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDeletePhone(phone.id)}
//                           className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                           title="Delete"
//                           disabled={loading}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form Panel */}
//         {showForm ? (
//           <div className="flex-1 bg-white">
//             <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold text-slate-800">
//                     {formData.id ? "Update Phone Number" : "Add New Phone Number"}
//                   </h2>
//                   <p className="text-slate-600 mt-1">
//                     {formData.id ? "Update the assistant for this number" : "Connect a new Twilio phone number"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={closeForm}
//                   className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-8">
//               <div className="max-w-2xl space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Twilio Phone Number
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.twilio_number}
//                     disabled={!!formData.id}
//                     onChange={(e) => setFormData({ ...formData, twilio_number: e.target.value })}
//                     placeholder="+1234567890"
//                     className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                       formData.id 
//                         ? 'bg-slate-100 border-slate-200 text-slate-500' 
//                         : 'border-slate-200 hover:border-slate-300'
//                     }`}
//                   />
//                 </div>

//                 {!formData.id && (
//                   <>
//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">
//                         Twilio Account SID
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.account_sid}
//                         onChange={(e) => setFormData({ ...formData, account_sid: e.target.value })}
//                         placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//                         className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">
//                         Twilio Auth Token
//                       </label>
//                       <input
//                         type="password"
//                         value={formData.auth_token}
//                         onChange={(e) => setFormData({ ...formData, auth_token: e.target.value })}
//                         placeholder="••••••••••••••••••••••••••••••••"
//                         className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors"
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Select Assistant
//                   </label>
//                   <select
//                     value={formData.assistant_id}
//                     onChange={(e) => setFormData({ ...formData, assistant_id: e.target.value })}
//                     className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors bg-white"
//                   >
//                     <option value="">Choose an assistant...</option>
//                     {assistants.map((a) => (
//                       <option key={a.id} value={a.id}>
//                         {a.name || a.id.slice(0, 8)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex gap-4 pt-4">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={loading || !formData.assistant_id || (!formData.id && (!formData.twilio_number || !formData.account_sid || !formData.auth_token))}
//                     className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="w-5 h-5" />
//                         {formData.id ? "Update Assistant" : "Connect Number"}
//                       </>
//                     )}
//                   </button>
//                   <button
//                     onClick={closeForm}
//                     className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-slate-50">
//             <div className="text-center">
//               <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Phone className="w-12 h-12 text-blue-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-slate-700 mb-2">Phone Number Management</h3>
//               <p className="text-slate-500 max-w-md">
//                 Select a phone number from the list to edit its settings, or create a new one to get started.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Toast Notification */}
//       {toast.show && (
//         <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
//           <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg text-white font-medium ${
//             toast.success 
//               ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
//               : 'bg-gradient-to-r from-red-500 to-rose-500'
//           }`}>
//             {toast.success ? (
//               <CheckCircle className="w-5 h-5" />
//             ) : (
//               <AlertCircle className="w-5 h-5" />
//             )}
//             <span>{toast.msg}</span>
//             <button
//               onClick={() => setToast({ ...toast, show: false })}
//               className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PhoneNumber;

import React, { useEffect, useState } from "react";
import { Phone, Plus, Edit2, Trash2, CheckCircle, AlertCircle, X, PhoneCall, Calendar, Clock } from 'lucide-react';
import Sidebar from "../components/Sidebar";
;

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
  const [showOutboundForm, setShowOutboundForm] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [outboundCallData, setOutboundCallData] = useState({
    customerNumber: "",
    scheduleDate: "",
    scheduleTime: "",
    selectedAssistantId: "",
  });
  const [toast, setToast] = useState({ show: false, msg: "", success: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssistants();
    fetchPhoneConfigs();
  }, []);

  const fetchAssistants = async () => {
    try {
      const res = await fetch("https://api.interactivv.pro//vapi/vapi/get-list-assistants");
      const data = await res.json();
      setAssistants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Assistant fetch error", err);
    }
  };

  const fetchPhoneConfigs = async () => {
    try {
      const res = await fetch("https://api.interactivv.pro//vapi/phone_numbers_with_assistants");
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
      const res = await fetch("https://api.interactivv.pro//vapi/delete_phone_number", {
        method: "POST",
        body: form,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || "Failed to delete");
      setToast({ show: true, msg: result.message, success: true });
      fetchPhoneConfigs();
    } catch (err) {
      setToast({ show: true, msg: err.message, success: false });
    } finally {
      setLoading(false);
    }
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
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
    setShowOutboundForm(false);
  };

  const handleScheduleCall = (phone) => {
    setSelectedPhone(phone);
    setOutboundCallData({
      customerNumber: "",
      scheduleDate: "",
      scheduleTime: "",
      selectedAssistantId: phone.assistantId || "",
    });
    setShowOutboundForm(true);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      if (formData.id) {
        form.append("id", formData.id);
        form.append("assistant_id", formData.assistant_id);
        const res = await fetch("https://api.interactivv.pro//vapi/update_phone_assistant", {
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
        const res = await fetch("https://api.interactivv.pro//vapi/add_phone_number", {
          method: "POST",
          body: form,
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.detail || "Failed to connect");
        setToast({ show: true, msg: result.message, success: true });
      }
      resetForm();
      fetchPhoneConfigs();
      setShowForm(false);
    } catch (err) {
      setToast({ show: true, msg: err.message, success: false });
    } finally {
      setLoading(false);
    }
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleScheduleOutboundCall = async () => {
    if (!selectedPhone || !outboundCallData.customerNumber || !outboundCallData.scheduleDate || !outboundCallData.scheduleTime || !outboundCallData.selectedAssistantId) return;
    setLoading(true);
    try {
      const earliestAt = new Date(`${outboundCallData.scheduleDate}T${outboundCallData.scheduleTime}`).toISOString();
      const payload = {
        assistantId: outboundCallData.selectedAssistantId,
        phoneNumberId: selectedPhone.id,
        customerNumber: outboundCallData.customerNumber,
        earliestAt,
      };
      const res = await fetch("https://api.interactivv.pro//vapi/schedule_outbound_call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || "Failed to schedule call");
      setToast({ show: true, msg: "Outbound call scheduled successfully!", success: true });
      setShowOutboundForm(false);
      setSelectedPhone(null);
      resetOutboundForm();
    } catch (err) {
      setToast({ show: true, msg: err.message, success: false });
    } finally {
      setLoading(false);
    }
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const resetForm = () => {
    setFormData({ id: "", twilio_number: "", account_sid: "", auth_token: "", assistant_id: "" });
  };

  const resetOutboundForm = () => {
    setOutboundCallData({ customerNumber: "", scheduleDate: "", scheduleTime: "", selectedAssistantId: "" });
  };

  const closeForm = () => {
    setShowForm(false);
    setShowOutboundForm(false);
    setSelectedPhone(null);
    resetForm();
    resetOutboundForm();
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
    setShowOutboundForm(false);
  };

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().slice(0, 5);

  const isOutboundFormValid = outboundCallData.customerNumber && outboundCallData.scheduleDate && outboundCallData.scheduleTime && outboundCallData.selectedAssistantId;
  const selectedAssistant = assistants.find(a => a.id === outboundCallData.selectedAssistantId);

  return (
    <>
      {/* JSX UI components follow below (omitted here for brevity) */}
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
              onClick={handleAddNew}
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
                          onClick={() => handleScheduleCall(phone)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Schedule Call"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </button>
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
        ) : showOutboundForm && selectedPhone ? (
          <div className="flex-1 bg-white">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <PhoneCall className="w-6 h-6 text-green-600" />
                    Schedule Outbound Call
                  </h2>
                  <p className="text-slate-600 mt-1">
                    Schedule a call from <span className="font-semibold">{selectedPhone.number}</span>
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
                {/* Phone Info Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Call Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600">From Number</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedPhone.number}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Current Assistant</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedPhone.assistant_name || 'Unknown'}</p>
                    </div>
                  </div>
                </div>

                {/* Assistant Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Select Assistant for Call
                  </label>
                  <select
                    value={outboundCallData.selectedAssistantId}
                    onChange={(e) => setOutboundCallData({ ...outboundCallData, selectedAssistantId: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-slate-300 transition-colors bg-white"
                  >
                    <option value="">Choose an assistant...</option>
                    {assistants.map((assistant) => (
                      <option key={assistant.id} value={assistant.id}>
                        {assistant.name || assistant.id.slice(0, 8)}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-slate-500 mt-1">Select which assistant will handle this outbound call</p>
                </div>

                {/* Customer Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Customer Phone Number
                  </label>
                  <input
                    type="tel"
                    value={outboundCallData.customerNumber}
                    onChange={(e) => setOutboundCallData({ ...outboundCallData, customerNumber: e.target.value })}
                    placeholder="+1234567890"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-slate-300 transition-colors"
                  />
                  <p className="text-sm text-slate-500 mt-1">Enter the customer's phone number with country code</p>
                </div>

                {/* Schedule Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Date
                    </label>
                    <input
                      type="date"
                      value={outboundCallData.scheduleDate}
                      onChange={(e) => setOutboundCallData({ ...outboundCallData, scheduleDate: e.target.value })}
                      min={currentDate}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-slate-300 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Schedule Time
                    </label>
                    <input
                      type="time"
                      value={outboundCallData.scheduleTime}
                      onChange={(e) => setOutboundCallData({ ...outboundCallData, scheduleTime: e.target.value })}
                      min={outboundCallData.scheduleDate === currentDate ? currentTime : undefined}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-slate-300 transition-colors"
                    />
                  </div>
                </div>

                {/* Preview */}
                {outboundCallData.customerNumber && outboundCallData.scheduleDate && outboundCallData.scheduleTime && outboundCallData.selectedAssistantId && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <h4 className="font-semibold text-slate-700 mb-2">Call Preview</h4>
                    <div className="text-sm text-slate-600">
                      <p><span className="font-medium">From:</span> {selectedPhone.number}</p>
                      <p><span className="font-medium">To:</span> {outboundCallData.customerNumber}</p>
                      <p><span className="font-medium">Scheduled for:</span> {new Date(`${outboundCallData.scheduleDate}T${outboundCallData.scheduleTime}`).toLocaleString()}</p>
                      <p><span className="font-medium">Assistant:</span> {selectedAssistant?.name || selectedAssistant?.id.slice(0, 8)}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleScheduleOutboundCall}
                    disabled={loading || !isOutboundFormValid}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Scheduling Call...
                      </>
                    ) : (
                      <>
                        <PhoneCall className="w-5 h-5" />
                        Schedule Call
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
                Select a phone number from the list to edit its settings, schedule outbound calls, or create a new one to get started.
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
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              className="ml-2 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default PhoneNumber;