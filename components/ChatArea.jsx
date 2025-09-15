


// import React from 'react';
// import { Phone, Video, Info, Paperclip, Send, MessageCircle } from 'lucide-react';
// import MessageItem from './MessageItem';

// function ChatArea({ selectedUser }) {
//   const [chatHistory, setChatHistory] = React.useState([]);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [message, setMessage] = React.useState("");
//   const messagesEndRef = React.useRef();
//   const [twilioNumber, setTwilioNumber] = React.useState("whatsapp:+14155238886");
//   const getAuthHeaders = (extraHeaders = {}) => {
//     const token = localStorage.getItem("token");
//     return {
//       Authorization: `Bearer ${token}`,
//       ...extraHeaders,
//     };
//   };
//   React.useEffect(() => {
//     if (!selectedUser) return;    
//     setIsLoading(true);
    
//     fetch(`https://api.interactivv.pro/twilio/api/whatsapp/history?user_number=${encodeURIComponent(selectedUser)}`, {
//       headers: getAuthHeaders(),
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch chat history");
//         }
//         return res.json();
//       })
//       .then(data => {
//         setChatHistory(data.chat_history || []);
//         setTwilioNumber(data.twilio_number || "whatsapp:+14155238886");
//         setIsLoading(false);
//         scrollToBottom();
//       })
//       .catch(err => {
//         console.error("Error fetching chat history:", err);
//         setIsLoading(false);
//       });
//   }, [selectedUser]);
  
//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };
  
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!message.trim() || !selectedUser) return;
    
//     alert(`Message to ${selectedUser.replace("whatsapp:", "")}: ${message}`);
    
//     const newMessage = {
//       from: twilioNumber,
//       to: selectedUser,
//       body: message,
//       date_sent: new Date().toISOString(),
//       media: []
//     };
    
//     setChatHistory([...chatHistory, newMessage]);
//     setMessage("");
//     scrollToBottom();
//   };

//   const formatPhoneNumber = (phoneNumber) => {
//     const cleaned = phoneNumber.replace("whatsapp:", "");
//     if (cleaned.startsWith("+1") && cleaned.length === 12) {
//       return `+1 (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
//     }
//     return cleaned;
//   };

//   const getInitials = (phoneNumber) => {
//     const cleaned = phoneNumber.replace("whatsapp:", "");
//     return cleaned.slice(-2).toUpperCase();
//   };
  
//   if (!selectedUser) {
//     return (
//       <div className="flex-1 flex items-center justify-center bg-slate-50">
//         <div className="text-center">
//           <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <MessageCircle className="w-12 h-12 text-green-600" />
//           </div>
//           <h3 className="text-xl font-semibold text-slate-700 mb-2">WhatsApp Conversations</h3>
//           <p className="text-slate-500 max-w-md">
//             Select a conversation from the sidebar to view messages and start chatting.
//           </p>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="flex flex-col h-full bg-white">
//       {/* Chat Header */}
//       <div className="bg-white px-6 py-4 border-b border-slate-200 shadow-sm">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
//               {getInitials(selectedUser)}
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-slate-800">
//                 {formatPhoneNumber(selectedUser)}
//               </h2>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                 <p className="text-sm text-slate-600">
//                   {isLoading ? "Loading..." : "WhatsApp User"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-white relative">
//         {isLoading && (
//           <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
//               <p className="text-slate-700 font-medium">Loading conversation...</p>
//             </div>
//           </div>
//         )}

//         <div className="p-6 space-y-4">
//           {!isLoading && chatHistory.length > 0 && (
//             <>
//               {chatHistory.map((msg, index) => (
//                 <MessageItem key={index} message={msg} twilioNumber={twilioNumber} />
//               ))}
//               <div ref={messagesEndRef} />
//             </>
//           )}

//           {!isLoading && chatHistory.length === 0 && (
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <MessageCircle className="w-8 h-8 text-slate-400" />
//               </div>
//               <p className="text-slate-500 font-medium">No messages yet</p>
//               <p className="text-slate-400 text-sm mt-1">Start the conversation by sending a message</p>
//             </div>
//           )}
//         </div>
//       </div>
    
//     </div>
//   );
// }

// export default ChatArea;




import React from 'react';
import { MessageCircle } from 'lucide-react';
import MessageItem from './MessageItem';

function ChatArea({ selectedUser }) {
  const [chatHistory, setChatHistory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [twilioNumber, setTwilioNumber] = React.useState("whatsapp:+14155238886");
  const [offset, setOffset] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(false);
  const messagesEndRef = React.useRef();

  const getAuthHeaders = (extraHeaders = {}) => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}`, ...extraHeaders };
  };

  const fetchMessages = (append = false) => {
    if (!selectedUser) return;
    setIsLoading(true);

    fetch(
      `https://api.interactivv.pro/twilio/api/whatsapp/history?user_number=${encodeURIComponent(
        selectedUser
      )}&limit=100&offset=${offset}`,
      { headers: getAuthHeaders() }
    )
      .then(res => res.json())
      .then(data => {
        setTwilioNumber(data.twilio_number);
        setHasMore(data.total_messages > offset + data.chat_history.length);

        if (append) {
          // prepend older messages
          setChatHistory(prev => [...data.chat_history, ...prev]);
        } else {
          // initial load
          setChatHistory(data.chat_history);
          scrollToBottom();
        }

        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching chat history:", err);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (!selectedUser) return;
    setOffset(0);
    fetchMessages(false);
  }, [selectedUser]);

  const loadOlderMessages = () => {
    setOffset(prev => prev + 100);
    fetchMessages(true);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace("whatsapp:", "");
    if (cleaned.startsWith("+1") && cleaned.length === 12) {
      return `+1 (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
    }
    return cleaned;
  };

  const getInitials = (phoneNumber) => {
    const cleaned = phoneNumber.replace("whatsapp:", "");
    return cleaned.slice(-2).toUpperCase();
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">WhatsApp Conversations</h3>
          <p className="text-slate-500 max-w-md">
            Select a conversation from the sidebar to view messages and start chatting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
              {getInitials(selectedUser)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {formatPhoneNumber(selectedUser)}
              </h2>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <p className="text-sm text-slate-600">
                  {isLoading ? "Loading..." : "WhatsApp User"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-white relative">
        {hasMore && (
          <div className="text-center py-2">
            <button
              onClick={loadOlderMessages}
              className="text-green-600 text-sm font-medium hover:underline"
            >
              Load older messages
            </button>
          </div>
        )}

        <div className="p-6 space-y-4">
          {chatHistory.map((msg, index) => (
            <MessageItem key={index} message={msg} twilioNumber={twilioNumber} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;

