


// import React, { useEffect, useState } from "react";
// import { format } from "date-fns";
// import {
//   Phone,
//   PhoneCall,
//   Clock,
//   DollarSign,
//   FileText,
//   Play,
//   Copy,
//   Check,
//   User,
//   Bot,
//   Calendar,
//   Timer,
//   AlertCircle,
// } from "lucide-react";
// import Sidebar from "../components/Sidebar";

// const VapiCall = () => {
//   const [inboundCalls, setInboundCalls] = useState([]);
//   const [outboundCalls, setOutboundCalls] = useState([]);
//   const [callType, setCallType] = useState("inbound");
//   const [loading, setLoading] = useState(true);
//   const [copiedId, setCopiedId] = useState(null);

//   const copyToClipboard = async (text, callId) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopiedId(callId);
//       setTimeout(() => setCopiedId(null), 2000);
//     } catch (err) {
//       console.error("Failed to copy: ", err);
//     }
//   };

//   useEffect(() => {
//     const fetchCalls = async () => {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };
//       try {
//         const [inboundRes, outboundRes] = await Promise.all([
//           fetch("https://api.interactivv.pro/vapi/calls/inbound", { headers }),
//         fetch("https://api.interactivv.pro/vapi/calls/inbound", { headers }),
//         ]);

//         const inboundData = await inboundRes.json();
//         const outboundData = await outboundRes.json();

//         setInboundCalls(inboundData.inbound || []);
//         setOutboundCalls(outboundData.outbound || []);
//       } catch (error) {
//         console.error("Failed to fetch call logs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCalls();
//   }, []);

//   const formatDuration = (seconds) => {
//     if (!seconds) return "-";
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.round(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const getStatusColor = (reason) => {
//     switch (reason?.toLowerCase()) {
//       case "completed":
//       case "hangup":
//         return "bg-green-100 text-green-800";
//       case "error":
//       case "failed":
//         return "bg-red-100 text-red-800";
//       case "timeout":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const calls = callType === "inbound" ? inboundCalls : outboundCalls;

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 p-8 w-[calc(100%-18rem)] ml-[18rem]">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
//               <PhoneCall className="w-8 h-8 mr-3 text-blue-600" />
//               {callType === "inbound" ? "Inbound" : "Outbound"} Call Logs
//             </h1>
//             <p className="text-gray-600">
//               Monitor and analyze your AI assistant {callType} call activity
//             </p>
//           </div>

//           {/* Toggle Buttons */}
//           <div className="mb-6">
//             <div className="inline-flex rounded-md shadow-sm border border-gray-200">
//               <button
//                 onClick={() => setCallType("inbound")}
//                 className={`px-4 py-2 text-sm font-medium ${
//                   callType === "inbound"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-800"
//                 } rounded-l-md border-r border-gray-200`}
//               >
//                 Inbound
//               </button>
//               <button
//                 onClick={() => setCallType("outbound")}
//                 className={`px-4 py-2 text-sm font-medium ${
//                   callType === "outbound"
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-800"
//                 } rounded-r-md`}
//               >
//                 Outbound
//               </button>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <StatCard icon={<Phone />} title="Total Calls" value={calls.length} />
//             <StatCard
//               icon={<Timer />}
//               title="Avg Duration"
//               value={
//                 calls.length > 0
//                   ? formatDuration(
//                       calls.reduce(
//                         (acc, call) => acc + (call.durationSeconds || 0),
//                         0
//                       ) / calls.length
//                     )
//                   : "-"
//               }
//             />
//             <StatCard
//               icon={<DollarSign />}
//               title="Total Cost"
//               value={`$${calls
//                 .reduce((acc, call) => acc + (parseFloat(call.cost) || 0), 0)
//                 .toFixed(2)}`}
//             />
//             <StatCard
//               icon={<FileText />}
//               title="With Transcripts"
//               value={calls.filter((call) => call.transcript).length}
//             />
//           </div>

//           {/* Call Logs Table */}
//           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-900">Recent Calls</h2>
//             </div>

//             {loading ? (
//               <div className="p-8">
//                 <div className="space-y-4">
//                   {[...Array(5)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="h-16 w-full rounded-lg bg-gray-200 animate-pulse"
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : calls.length === 0 ? (
//               <div className="text-center py-16">
//                 <PhoneCall className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 text-lg font-medium mb-2">
//                   No {callType} call logs found
//                 </p>
//                 <p className="text-gray-400 text-sm">
//                   Call logs will appear here once you start receiving calls
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <div className="max-h-[600px] overflow-y-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50 sticky top-0 z-10">
//                       <tr>
//                         <HeaderCell icon={<User />} label="Customer" />
//                         <HeaderCell icon={<Phone />} label="Call ID" />
//                         <HeaderCell icon={<Bot />} label="Assistant" />
//                         <HeaderCell icon={<Calendar />} label="Start Time" />
//                         <HeaderCell icon={<Clock />} label="Duration" />
//                         <HeaderCell icon={<Play />} label="Recording" />
//                         <HeaderCell
//                           icon={<FileText />}
//                           label="Transcript"
//                           extraClasses="min-w-[500px]"
//                         />
//                         <HeaderCell icon={<DollarSign />} label="Cost" />
//                         <HeaderCell icon={<AlertCircle />} label="Status" />
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {calls.map((call) => (
//                         <tr
//                           key={call.callId}
//                           className="hover:bg-gray-50 transition-colors duration-150"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             {call.customerNumber || "Unknown"}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <code className="text-sm bg-gray-100 text-blue-600 px-2 py-1 rounded font-mono">
//                                 {call.callId?.substring(0, 8)}...
//                               </code>
//                               <button
//                                 onClick={() =>
//                                   copyToClipboard(call.callId, call.callId)
//                                 }
//                                 className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
//                                 title="Copy Call ID"
//                               >
//                                 {copiedId === call.callId ? (
//                                   <Check className="w-3 h-3 text-green-600" />
//                                 ) : (
//                                   <Copy className="w-3 h-3" />
//                                 )}
//                               </button>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm">
//                             {call.assistantId?.substring(0, 8)}...
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm">
//                             {call.startTime ? (
//                               <>
//                                 <div className="font-medium">
//                                   {format(new Date(call.startTime), "MMM dd, yyyy")}
//                                 </div>
//                                 <div className="text-gray-500">
//                                   {format(new Date(call.startTime), "HH:mm:ss")}
//                                 </div>
//                               </>
//                             ) : (
//                               "-"
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm">
//                             {formatDuration(call.durationSeconds)}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm">
//                             {call.recordingUrl ? (
//                               <audio controls className="w-48 h-8">
//                                 <source
//                                   src={call.recordingUrl}
//                                   type="audio/mp3"
//                                 />
//                                 Your browser does not support the audio element.
//                               </audio>
//                             ) : (
//                               "No recording"
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-pre-wrap text-sm">
//                             {call.transcript || "No transcript"}
//                             {call.summary && (
//                               <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
//                                 <strong>Summary:</strong> {call.summary}
//                               </div>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm">
//                             ${parseFloat(call.cost || 0).toFixed(3)}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm">
//                             <span
//                               className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${getStatusColor(
//                                 call.endedReason
//                               )}`}
//                             >
//                               {call.endedReason || "Unknown"}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Header Cell
// const HeaderCell = ({ icon, label, extraClasses = "" }) => (
//   <th
//     className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${extraClasses}`}
//   >
//     <div className="flex items-center">
//       {icon}
//       <span className="ml-1">{label}</span>
//     </div>
//   </th>
// );

// // Reusable Stat Card
// const StatCard = ({ icon, title, value }) => (
//   <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
//     <div className="flex items-center">
//       <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//         {icon}
//       </div>
//       <div className="ml-4">
//         <p className="text-sm font-medium text-gray-600">{title}</p>
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// export default VapiCall;
// ----------------------------------- Final code with outbound calls----------------------------------- 

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Phone,
  PhoneCall,
  Clock,
  DollarSign,
  FileText,
  Play,
  Copy,
  Check,
  User,
  Bot,
  Calendar,
  Timer,
  AlertCircle,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const VapiCall = () => {
  const [inboundCalls, setInboundCalls] = useState([]);
  const [outboundCalls, setOutboundCalls] = useState([]);
  const [callType, setCallType] = useState("inbound");
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, callId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(callId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    const fetchCalls = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await fetch("https://api.interactivv.pro/vapi/calls/inbound", { headers });
        const data = await res.json();

        setInboundCalls(data.inbound || []);
        setOutboundCalls(data.outbound || []);
      } catch (error) {
        console.error("Failed to fetch call logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  const formatDuration = (seconds) => {
    if (!seconds) return "-";
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusColor = (reason) => {
    switch (reason?.toLowerCase()) {
      case "completed":
      case "hangup":
        return "bg-green-100 text-green-800";
      case "error":
      case "failed":
        return "bg-red-100 text-red-800";
      case "timeout":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calls = callType === "inbound" ? inboundCalls : outboundCalls;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 w-[calc(100%-18rem)] ml-[18rem]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <PhoneCall className="w-8 h-8 mr-3 text-blue-600" />
              {callType === "inbound" ? "Inbound" : "Outbound"} Call Logs
            </h1>
            <p className="text-gray-600">
              Monitor and analyze your AI assistant {callType} call activity
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="mb-6">
            <div className="inline-flex rounded-md shadow-sm border border-gray-200">
              <button
                onClick={() => setCallType("inbound")}
                className={`px-4 py-2 text-sm font-medium ${
                  callType === "inbound"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                } rounded-l-md border-r border-gray-200`}
              >
                Inbound
              </button>
              <button
                onClick={() => setCallType("outbound")}
                className={`px-4 py-2 text-sm font-medium ${
                  callType === "outbound"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                } rounded-r-md`}
              >
                Outbound
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Phone />} title="Total Calls" value={calls.length} />
            <StatCard
              icon={<Timer />}
              title="Avg Duration"
              value={
                calls.length > 0
                  ? formatDuration(
                      calls.reduce((acc, call) => acc + (call.durationSeconds || 0), 0) /
                        calls.length
                    )
                  : "-"
              }
            />
            <StatCard
              icon={<DollarSign />}
              title="Total Cost"
              value={`$${calls
                .reduce((acc, call) => acc + (parseFloat(call.cost) || 0), 0)
                .toFixed(2)}`}
            />
            <StatCard
              icon={<FileText />}
              title="With Transcripts"
              value={calls.filter((call) => call.transcript).length}
            />
          </div>

          {/* Call Logs Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Calls</h2>
            </div>

            {loading ? (
              <div className="p-8">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 w-full rounded-lg bg-gray-200 animate-pulse" />
                  ))}
                </div>
              </div>
            ) : calls.length === 0 ? (
              <div className="text-center py-16">
                <PhoneCall className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium mb-2">
                  No {callType} call logs found
                </p>
                <p className="text-gray-400 text-sm">
                  Call logs will appear here once you start receiving calls
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <HeaderCell icon={<User />} label="Customer" />
                        <HeaderCell icon={<Phone />} label="Call ID" />
                        <HeaderCell icon={<Bot />} label="Assistant" />
                        <HeaderCell icon={<Calendar />} label="Start Time" />
                        <HeaderCell icon={<Clock />} label="Duration" />
                        <HeaderCell icon={<Play />} label="Recording" />
                        <HeaderCell icon={<FileText />} label="Transcript" extraClasses="min-w-[500px]" />
                        <HeaderCell icon={<DollarSign />} label="Cost" />
                        <HeaderCell icon={<AlertCircle />} label="Status" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {calls.map((call) => (
                        <tr key={call.callId} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {call.customerNumber || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <code className="text-sm bg-gray-100 text-blue-600 px-2 py-1 rounded font-mono">
                                {call.callId?.substring(0, 8)}...
                              </code>
                              <button
                                onClick={() => copyToClipboard(call.callId, call.callId)}
                                className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Copy Call ID"
                              >
                                {copiedId === call.callId ? (
                                  <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {call.assistantId?.substring(0, 8)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {call.startTime ? (
                              <>
                                <div className="font-medium">
                                  {format(new Date(call.startTime), "MMM dd, yyyy")}
                                </div>
                                <div className="text-gray-500">
                                  {format(new Date(call.startTime), "HH:mm:ss")}
                                </div>
                              </>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatDuration(call.durationSeconds)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {call.recordingUrl ? (
                              <audio controls className="w-48 h-8">
                                <source src={call.recordingUrl} type="audio/mp3" />
                                Your browser does not support the audio element.
                              </audio>
                            ) : (
                              "No recording"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-pre-wrap text-sm">
                            {call.transcript || "No transcript"}
                            {call.summary && (
                              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                                <strong>Summary:</strong> {call.summary}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${parseFloat(call.cost || 0).toFixed(3)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${getStatusColor(
                                call.endedReason
                              )}`}
                            >
                              {call.endedReason || "Unknown"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Header Cell
const HeaderCell = ({ icon, label, extraClasses = "" }) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${extraClasses}`}
  >
    <div className="flex items-center">
      {icon}
      <span className="ml-1">{label}</span>
    </div>
  </th>
);

// Reusable Stat Card
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default VapiCall;


