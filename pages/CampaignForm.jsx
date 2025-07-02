// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";

// const CampaignForm = () => {
//   const [campaignName, setCampaignName] = useState("");
//   const [campaignType] = useState("manual");
//   const [phoneNumberId, setPhoneNumberId] = useState("");
//   const [csvFile, setCsvFile] = useState(null);
//   const [assistantId, setAssistantId] = useState("");
//   const [scheduleAt, setScheduleAt] = useState("");
//   const [assistants, setAssistants] = useState([]);
//   const [availableNumbers, setAvailableNumbers] = useState([]);
//   const [campaigns, setCampaigns] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   const getAuthHeaders = (extraHeaders = {}) => {
//     const token = localStorage.getItem("token");
//     return {
//       Authorization: `Bearer ${token}`,
//       ...extraHeaders,
//     };
//   };

//   const fetchCampaigns = async () => {
//     try {
//       const res = await fetch("https://api.interactivv.pro/vapi/outbound-campaigns", {
//         headers: getAuthHeaders(),
//       });
//       const data = await res.json();
//       if (data.data) setCampaigns(data.data);
//     } catch (err) {
//       console.error("Error fetching campaigns:", err);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const assistantsRes = await fetch("https://api.interactivv.pro/vapi/vapi/get-list-assistants", {
//           headers: getAuthHeaders(),
//         });
//         const assistantsData = await assistantsRes.json();
//         setAssistants(Array.isArray(assistantsData) ? assistantsData : []);

//         const numbersRes = await fetch("https://api.interactivv.pro/vapi/phone_numbers_with_assistants", {
//           headers: getAuthHeaders(),
//         });
//         const numbersData = await numbersRes.json();
//         setAvailableNumbers(Array.isArray(numbersData) ? numbersData : []);

//         await fetchCampaigns();
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleFileChange = (e) => setCsvFile(e.target.files[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("campaign_name", campaignName);
//     formData.append("assistant_id", assistantId);
//     formData.append("phone_number_id", phoneNumberId);
//     if (csvFile) formData.append("file", csvFile);
//     if (scheduleAt) formData.append("schedule_at", scheduleAt);

//     try {
//       const res = await fetch("https://api.interactivv.pro/vapi/outbound-campaign", {
//         headers: getAuthHeaders(),
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         console.error("Response error:", errText);
//         throw new Error("Failed to create campaign");
//       }

//       alert("✅ Campaign created successfully!");
//       setShowForm(false);
//       await fetchCampaigns();
//     } catch (err) {
//       console.error("Submit error:", err);
//       alert("❌ Failed to create campaign.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-slate-50">
//       <Sidebar />
//     <div className="mx-auto mt-10 w-[calc(100%-18rem)] ml-[18rem]">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Outbound Campaigns</h1>
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Cancel" : "Create New Campaign"}
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
//           <h2 className="text-xl font-semibold mb-4">New Campaign</h2>

//           <label className="block mb-2 font-medium">Campaign Name</label>
//           <input
//             type="text"
//             className="input w-full border p-2 mb-4"
//             value={campaignName}
//             onChange={(e) => setCampaignName(e.target.value)}
//             required
//           />

//           <label className="block mb-2 font-medium">Phone Number</label>
//           <select
//             value={phoneNumberId}
//             onChange={(e) => setPhoneNumberId(e.target.value)}
//             className="input w-full border p-2 mb-4"
//             required
//           >
//             <option value="">Select</option>
//             {availableNumbers.map((n) => (
//               <option key={n.id} value={n.id}>
//                 {n.number} ({n.assistant_name || "No Name"})
//               </option>
//             ))}
//           </select>

//           <label className="block mb-2 font-medium">Assistant</label>
//           <select
//             value={assistantId}
//             onChange={(e) => setAssistantId(e.target.value)}
//             className="input w-full border p-2 mb-4"
//             required
//           >
//             <option value="">Select</option>
//             {assistants.map((a) => (
//               <option key={a.id} value={a.id}>{a.name}</option>
//             ))}
//           </select>

//           <label className="block mb-2 font-medium">Schedule At</label>
//           <input
//             type="datetime-local"
//             className="input w-full border p-2 mb-4"
//             value={scheduleAt}
//             onChange={(e) => setScheduleAt(e.target.value)}
//           />

//           <label className="block mb-2 font-medium">Upload CSV</label>
//           <input
//             type="file"
//             accept=".csv"
//             onChange={handleFileChange}
//             className="input w-full border p-2 mb-4"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Launch Campaign
//           </button>
//         </form>
//       )}

//       <div className="bg-white rounded shadow">
//         <h2 className="text-lg font-semibold p-4 border-b">Campaign List</h2>
//         <table className="w-full text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2">Name</th>
//               <th className="p-2">Assistant ID</th>
//               <th className="p-2">Phone Numbers</th>
//               <th className="p-2">Status</th>
//     <th className="p-2">Ended Reason</th>
//     <th className="p-2">Calls (Ended/InProgress)</th>
//               <th className="p-2">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {campaigns.map((c) => (
//               <tr key={c.id} className="border-t hover:bg-gray-50">
//                 <td className="p-2">{c.campaign_name}</td>
//                 <td className="p-2 text-sm text-gray-600">{c.assistant_id}</td>
//                 <td className="p-2 text-sm text-gray-600">{c.phone_numbers.join(", ")}</td>
//                 <td className="p-2 text-sm font-medium text-blue-700">
//         {c.vapi_details?.status || "N/A"}
//       </td>
//       <td className="p-2 text-sm text-gray-700">
//         {c.vapi_details?.endedReason?.replace("campaign.ended.", "") || "N/A"}
//       </td>
//       <td className="p-2 text-sm">
//         {c.vapi_details?.callsCounterEnded ?? 0} /{" "}
//         {c.vapi_details?.callsCounterInProgress ?? 0}
//       </td>
//                 <td className="p-2 text-sm text-gray-500">{new Date(c.created_at).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CampaignForm;

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { 
  PlusIcon, 
  DocumentArrowDownIcon, 
  CalendarIcon, 
  PhoneIcon, 
  UserGroupIcon,
  PlayIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

const CampaignForm = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignType] = useState("manual");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [assistantId, setAssistantId] = useState("");
  const [scheduleAt, setScheduleAt] = useState("");
  const [assistants, setAssistants] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getAuthHeaders = (extraHeaders = {}) => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      ...extraHeaders,
    };
  };

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("https://api.interactivv.pro/vapi/outbound-campaigns", {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.data) setCampaigns(data.data);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assistantsRes = await fetch("https://api.interactivv.pro/vapi/vapi/get-list-assistants", {
          headers: getAuthHeaders(),
        });
        const assistantsData = await assistantsRes.json();
        setAssistants(Array.isArray(assistantsData) ? assistantsData : []);

        const numbersRes = await fetch("https://api.interactivv.pro/vapi/phone_numbers_with_assistants", {
          headers: getAuthHeaders(),
        });
        const numbersData = await numbersRes.json();
        setAvailableNumbers(Array.isArray(numbersData) ? numbersData : []);

        await fetchCampaigns();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => setCsvFile(e.target.files[0]);

  const downloadTemplate = () => {
    const csvContent = "phone_number,name,another_var\n+1234567890,John Doe,Value1,Value2\n+0987654321,Jane Smith,Value3";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaign_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("campaign_name", campaignName);
    formData.append("assistant_id", assistantId);
    formData.append("phone_number_id", phoneNumberId);
    if (csvFile) formData.append("file", csvFile);
    if (scheduleAt) formData.append("schedule_at", scheduleAt);

    try {
      const res = await fetch("https://api.interactivv.pro/vapi/outbound-campaign", {
        headers: getAuthHeaders(),
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Response error:", errText);
        throw new Error("Failed to create campaign");
      }

      alert("✅ Campaign created successfully!");
      setShowForm(false);
      setCampaignName("");
      setPhoneNumberId("");
      setCsvFile(null);
      setAssistantId("");
      setScheduleAt("");
      await fetchCampaigns();
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Failed to create campaign.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', icon: PlayIcon },
      'completed': { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircleIcon },
      'scheduled': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: ClockIcon },
      'paused': { bg: 'bg-gray-100', text: 'text-gray-800', icon: ExclamationTriangleIcon },
    };
    
    const config = statusConfig[status?.toLowerCase()] || statusConfig['scheduled'];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3" />
        {status || 'N/A'}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />
      <div className="flex-1 p-8 w-[calc(100%-18rem)] ml-[18rem]">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Outbound Campaigns</h1>
              <p className="text-gray-600">Create and manage your voice campaign strategies</p>
            </div>
            <button
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? (
                <>
                  <XMarkIcon className="w-5 h-5" />
                  Cancel
                </>
              ) : (
                <>
                  <PlusIcon className="w-5 h-5" />
                  Create New Campaign
                </>
              )}
            </button>
          </div>
        </div>

        {/* Campaign Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <UserGroupIcon className="w-6 h-6 text-blue-600" />
                </div>
                Create New Campaign
              </h2>
              <p className="text-gray-600 mt-2">Set up your outbound calling campaign with custom parameters</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Campaign Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Enter campaign name..."
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Phone Number Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4" />
                      Phone Number
                    </label>
                    <select
                      value={phoneNumberId}
                      onChange={(e) => setPhoneNumberId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      required
                    >
                      <option value="">Select a phone number...</option>
                      {availableNumbers.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.number} ({n.assistant_name || "No Name"})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Assistant Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Assistant
                    </label>
                    <select
                      value={assistantId}
                      onChange={(e) => setAssistantId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      required
                    >
                      <option value="">Select an assistant...</option>
                      {assistants.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Schedule */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Schedule At (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={scheduleAt}
                      onChange={(e) => setScheduleAt(e.target.value)}
                    />
                  </div>

                  {/* File Upload Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <CloudArrowUpIcon className="w-4 h-4" />
                      Upload Contact List
                    </label>
                    
                    {/* Template Download */}
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={downloadTemplate}
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        <DocumentArrowDownIcon className="w-4 h-4" />
                        Download CSV Template
                      </button>
                    </div>

                    {/* File Input */}
                    <div className="relative">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {csvFile && (
                        <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4" />
                          {csvFile.name} selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Campaign...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-5 h-5" />
                      Launch Campaign
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Campaigns Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-5 h-5 text-gray-600" />
              </div>
              Campaign Overview
            </h2>
            <p className="text-gray-600 mt-1">Monitor and track your campaign performance</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Campaign</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Assistant</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Phone Numbers</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">End Reason</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Calls Progress</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-gray-500">
                      <UserGroupIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No campaigns yet</p>
                      <p className="text-sm">Create your first campaign to get started</p>
                    </td>
                  </tr>
                ) : (
                  campaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900">{c.campaign_name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                          {c.assistant_id}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">
                          {c.phone_numbers.join(", ")}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(c.vapi_details?.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">
                          {c.vapi_details?.endedReason?.replace("campaign.ended.", "") || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            {c.vapi_details?.callsCounterEnded ?? 0} Ended
                          </div>
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {c.vapi_details?.callsCounterInProgress ?? 0} Active
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-500">
                          {new Date(c.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;