// import React, { useEffect, useState } from "react";
// import { format } from "date-fns";
// import Sidebar from "../components/Sidebar";

// const VapiCall = () => {
//   const [calls, setCalls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCalls = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/vapi/calls/inbound");
//         if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
//         const data = await response.json();
//         setCalls(data.calls || []);
//       } catch (error) {
//         console.error("Failed to fetch call logs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCalls();
//   }, []);

//   return (
//     <>
//     <div className="min-h-screen flex flex-col md:flex-row">
//     <Sidebar />
//     <div className="p-6 bg-white shadow-md rounded-2xl">
//       <h2 className="text-2xl font-bold mb-4">Inbound Call Logs</h2>

//       {loading ? (
//         <div className="space-y-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="h-12 w-full rounded-xl bg-gray-200 animate-pulse" />
//           ))}
//         </div>
//       ) : (
//         <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
//           <table className="min-w-full text-sm border border-gray-200 rounded-lg">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Customer</th>
//                 <th className="px-4 py-2 text-left">CallId</th>
//                 <th className="px-4 py-2 text-left">Assistant</th>
//                 <th className="px-4 py-2 text-left">Start</th>
//                 <th className="px-4 py-2 text-left">End</th>
//                 <th className="px-4 py-2 text-left">Duration</th>
//                 <th className="px-4 py-2 text-left">Recording</th>
//                 <th className="px-4 py-2 text-left">Transcript</th>
//                 <th className="px-4 py-2 text-left">Summary</th>
//                 <th className="px-4 py-2 text-left">Cost</th>
//                 <th className="px-4 py-2 text-left">Reason</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {calls.map((call) => (
//                 <tr key={call.callId}>
//                   <td className="px-4 py-2">{call.customerNumber || "-"}</td>
//                   <td className="px-4 py-2 font-mono text-blue-600">{call.callId}</td>
//                   <td className="px-4 py-2 font-mono text-blue-600">{call.assistantId}</td>
//                   <td className="px-4 py-2">{call.startTime ? format(new Date(call.startTime), "Pp") : "-"}</td>
//                   <td className="px-4 py-2">{call.endTime ? format(new Date(call.endTime), "Pp") : "-"}</td>
//                   <td className="px-4 py-2">{call.durationSeconds ? `${Math.round(call.durationSeconds)}s` : "-"}</td>
//                   <td className="px-4 py-2">
//                     {call.recordingUrl ? (
//                       <audio controls className="w-32">
//                         <source src={call.recordingUrl} type="audio/mp3" />
//                       </audio>
//                     ) : (
//                       "-"
//                     )}
//                   </td>
//                   <td className="px-4 py-2 max-w-xs whitespace-pre-wrap text-xs text-gray-700">
//                     {call.transcript || "-"}
//                   </td>
//                   <td className="px-4 py-2 max-w-xs whitespace-pre-wrap text-xs text-gray-700">
//                     {call.summary || "-"}
//                   </td>
//                   <td className="px-4 py-2">{call.cost ? `$${call.cost}` : "-"}</td>
//                   <td className="px-4 py-2">{call.endedReason || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//     </div>
//     </>
//   );
// };

// export default VapiCall;

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
  AlertCircle
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const VapiCall = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  // Copy ID functionality
  const copyToClipboard = async (text, callId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(callId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch("http://localhost:8000/vapi/calls/inbound");
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        setCalls(data.calls || []);
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
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (reason) => {
    switch (reason?.toLowerCase()) {
      case 'completed':
      case 'hangup':
        return 'bg-green-100 text-green-800';
      case 'error':
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'timeout':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 w-[calc(100%-18rem)] ml-[18rem]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <PhoneCall className="w-8 h-8 mr-3 text-blue-600" />
              Inbound Call Logs
            </h1>
            <p className="text-gray-600">Monitor and analyze your AI assistant call activity</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Calls</p>
                  <p className="text-2xl font-bold text-gray-900">{calls.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Timer className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {calls.length > 0 
                      ? formatDuration(calls.reduce((acc, call) => acc + (call.durationSeconds || 0), 0) / calls.length)
                      : "-"
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Cost</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${calls.reduce((acc, call) => acc + (parseFloat(call.cost) || 0), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">With Transcripts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {calls.filter(call => call.transcript).length}
                  </p>
                </div>
              </div>
            </div>
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
                <p className="text-gray-500 text-lg font-medium mb-2">No call logs found</p>
                <p className="text-gray-400 text-sm">Call logs will appear here once you start receiving calls</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            Customer
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            Call ID
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Bot className="w-4 h-4 mr-1" />
                            Assistant
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Start Time
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Duration
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Play className="w-4 h-4 mr-1" />
                            Recording
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[500px]">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            Transcript
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Cost
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Status
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {calls.map((call) => (
                        <tr key={call.callId} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {call.customerNumber || "Unknown"}
                                </div>
                              </div>
                            </div>
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <code className="text-sm bg-gray-100 text-purple-600 px-2 py-1 rounded font-mono">
                                {call.assistantId?.substring(0, 8)}...
                              </code>
                              <button
                                onClick={() => copyToClipboard(call.assistantId, `assistant-${call.callId}`)}
                                className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Copy Assistant ID"
                              >
                                {copiedId === `assistant-${call.callId}` ? (
                                  <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {call.startTime ? (
                              <div>
                                <div className="font-medium">
                                  {format(new Date(call.startTime), "MMM dd, yyyy")}
                                </div>
                                <div className="text-gray-500">
                                  {format(new Date(call.startTime), "HH:mm:ss")}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Timer className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                {formatDuration(call.durationSeconds)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {call.recordingUrl ? (
                              <div className="flex items-center">
                                <audio controls className="w-48 h-8">
                                  <source src={call.recordingUrl} type="audio/mp3" />
                                  Your browser does not support the audio element.
                                </audio>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">No recording</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {call.transcript ? (
                              <div className="">
                                <div className="text-sm text-gray-900 whitespace-pre-wrap">
                                {call.transcript}
                                </div>
                                {call.summary && (
                                  <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                                    <strong>Summary:</strong> {call.summary}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">No transcript</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {call.cost ? `$${parseFloat(call.cost).toFixed(3)}` : "-"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(call.endedReason)}`}>
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

export default VapiCall;