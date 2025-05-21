import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MessageItem from "./MessageItem";

export default function ChatArea({ selectedUser }) {
  const messagesEndRef = useRef();
  const [message, setMessage] = useState("");
  
  const { data, isLoading } = useQuery({
    queryKey: ["/api/whatsapp/history", { user_number: selectedUser }],
    enabled: !!selectedUser,
  });
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [data?.chat_history]);
  
  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-center text-xl">
          Select a conversation to start
        </div>
      </div>
    );
  }

  const twilioNumber = data?.twilio_number || "whatsapp:+14155238886";
  const chatHistory = data?.chat_history || [];
  const formattedNumber = selectedUser.replace("whatsapp:", "");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, this would send the message to the API
    alert(`Message to ${formattedNumber}: ${message}`);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white mr-3">
            <i className="fas fa-user"></i>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{formattedNumber}</h2>
            <p className="text-xs text-gray-500">
              {isLoading ? "Loading..." : "WhatsApp User"}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-phone"></i>
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-video"></i>
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-info-circle"></i>
          </button>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <i className="fas fa-spinner fa-spin text-primary text-2xl"></i>
          </div>
        ) : chatHistory.length > 0 ? (
          <>
            {chatHistory.map((msg, index) => (
              <MessageItem key={index} message={msg} twilioNumber={twilioNumber} />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No messages yet
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="bg-white px-4 py-3 border-t border-gray-200">
        <div className="flex items-center">
          <button type="button" className="text-gray-500 hover:text-gray-700 p-2">
            <i className="fas fa-paperclip"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border-0 focus:ring-0 focus:outline-none px-4 py-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-primary text-white p-2 rounded-full hover:bg-indigo-600"
            disabled={!message.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
