// import React from 'react';
// import MessageItem from './MessageItem';
// function ChatArea({ selectedUser }) {
//   const [chatHistory, setChatHistory] = React.useState([]);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [message, setMessage] = React.useState("");
//   const messagesEndRef = React.useRef();
//   const [twilioNumber, setTwilioNumber] = React.useState("whatsapp:+14155238886");
  
//   // Fetch chat history when user is selected
//   React.useEffect(() => {
//     if (!selectedUser) return;    
//     setIsLoading(true);
    
//     fetch(`http://localhost:8000/twilio/api/whatsapp/history?user_number=${encodeURIComponent(selectedUser)}`)
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
//         // Scroll to bottom after loading messages
//         scrollToBottom();
//       })
//       .catch(err => {
//         console.error("Error fetching chat history:", err);
//         setIsLoading(false);
//       });
//   }, [selectedUser]);
  
//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };
  
//   // Handle sending a new message
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!message.trim() || !selectedUser) return;
    
//     // In a real app, this would send the message to the API
//     alert(`Message to ${selectedUser.replace("whatsapp:", "")}: ${message}`);
    
//     // Optimistically add message to chat history
//     const newMessage = {
//       from: twilioNumber,
//       to: selectedUser,
//       body: message,
//       date_sent: new Date().toISOString(),
//       media: []
//     };
    
//     setChatHistory([...chatHistory, newMessage]);
//     setMessage("");
    
//     // Scroll to bottom after sending
//     scrollToBottom();
//   };
  
//   if (!selectedUser) {
//     return (
//       <div className="flex-1 flex items-center justify-center bg-gray-50">
//         <div className="text-gray-500 text-center text-xl">
//           Select a conversation to start
//         </div>
//       </div>
//     );
//   }
  
//   const formattedNumber = selectedUser.replace("whatsapp:", "");
  
//   return (
//     <div className="flex flex-col h-full">
//       {/* Chat Header */}
//       <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
//         <div className="flex items-center">
//           <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white mr-3">
//             <i className="fas fa-user"></i>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">{formattedNumber}</h2>
//             <p className="text-xs text-gray-500">
//               {isLoading ? "Loading..." : "WhatsApp User"}
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
//             <i className="fas fa-phone"></i>
//           </button>
//           <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
//             <i className="fas fa-video"></i>
//           </button>
//           <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
//             <i className="fas fa-info-circle"></i>
//           </button>
//         </div>
//       </div>
      
//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 relative">
//   {isLoading && (
//     <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
//       <div className="text-center">
//         <i className="fas fa-spinner fa-spin text-blue-600 text-3xl mb-2"></i>
//         <p className="text-gray-700">Loading conversation...</p>
//       </div>
//     </div>
//   )}

//   {!isLoading && chatHistory.length > 0 && (
//     <>
//       {chatHistory.map((msg, index) => (
//         <MessageItem key={index} message={msg} twilioNumber={twilioNumber} />
//       ))}
//       <div ref={messagesEndRef} />
//     </>
//   )}

//   {!isLoading && chatHistory.length === 0 && (
//     <div className="text-center py-10 text-gray-500">
//       No messages yet
//     </div>
//   )}
// </div>
      
//       {/* Message Input */}
//       {/* <form onSubmit={handleSendMessage} className="bg-white px-4 py-3 border-t border-gray-200">
//         <div className="flex items-center">
//           <button type="button" className="text-gray-500 hover:text-gray-700 p-2">
//             <i className="fas fa-paperclip"></i>
//           </button>
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 border-0 focus:ring-0 focus:outline-none px-4 py-2"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button 
//             type="submit"
//             className="bg-primary text-white p-2 rounded-full hover:bg-indigo-600"
//             disabled={!message.trim()}
//           >
//             <i className="fas fa-paper-plane"></i>
//           </button>
//         </div>
//       </form> */}
//     </div>
//   );
// }
// export default ChatArea;


import React from 'react';
import { Phone, Video, Info, Paperclip, Send, MessageCircle } from 'lucide-react';
import MessageItem from './MessageItem';

function ChatArea({ selectedUser }) {
  const [chatHistory, setChatHistory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const messagesEndRef = React.useRef();
  const [twilioNumber, setTwilioNumber] = React.useState("whatsapp:+14155238886");
  
  React.useEffect(() => {
    if (!selectedUser) return;    
    setIsLoading(true);
    
    fetch(`http://localhost:8000/twilio/api/whatsapp/history?user_number=${encodeURIComponent(selectedUser)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch chat history");
        }
        return res.json();
      })
      .then(data => {
        setChatHistory(data.chat_history || []);
        setTwilioNumber(data.twilio_number || "whatsapp:+14155238886");
        setIsLoading(false);
        scrollToBottom();
      })
      .catch(err => {
        console.error("Error fetching chat history:", err);
        setIsLoading(false);
      });
  }, [selectedUser]);
  
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;
    
    alert(`Message to ${selectedUser.replace("whatsapp:", "")}: ${message}`);
    
    const newMessage = {
      from: twilioNumber,
      to: selectedUser,
      body: message,
      date_sent: new Date().toISOString(),
      media: []
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage("");
    scrollToBottom();
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
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-slate-700 font-medium">Loading conversation...</p>
            </div>
          </div>
        )}

        <div className="p-6 space-y-4">
          {!isLoading && chatHistory.length > 0 && (
            <>
              {chatHistory.map((msg, index) => (
                <MessageItem key={index} message={msg} twilioNumber={twilioNumber} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}

          {!isLoading && chatHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">No messages yet</p>
              <p className="text-slate-400 text-sm mt-1">Start the conversation by sending a message</p>
            </div>
          )}
        </div>
      </div>
    
    </div>
  );
}

export default ChatArea;