import React from 'react';
import { MessageCircle } from 'lucide-react';
import GHLMessageItem from './GHLMessageItem';

function GHLChatArea({ selectedUser }) {
  const [chatHistory, setChatHistory] = React.useState([]);
  const [personalNumber, setPersonalNumber] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(false);
  const messagesEndRef = React.useRef();

  const getAuthHeaders = (extraHeaders = {}) => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}`, ...extraHeaders };
  };

  const fetchMessages = (append = false) => {
    if (!selectedUser?.phone_number) return;
    setIsLoading(true);

    fetch(
      `https://api.interactivv.pro/GHL/api/ghl/history?user_number=${encodeURIComponent(selectedUser.phone_number)}&limit=100&offset=${offset}`,
      { headers: getAuthHeaders() }
    )
      .then(res => res.json())
      .then(data => {
        setHasMore(data.has_more);
        setPersonalNumber(data.personal_number);

        if (append) {
          setChatHistory(prev => {
            const newMessages = data.chat_history.filter(
              newMsg => !prev.some(prevMsg => prevMsg.id === newMsg.id)
            );
            return [...newMessages, ...prev];
          });
        } else {
          setChatHistory(data.chat_history);
          scrollToBottom();
        }

        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching GHL chat history:', err);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (!selectedUser?.phone_number) return;
    setOffset(0);
    fetchMessages(false);
  }, [selectedUser]);

  const loadOlderMessages = () => {
    setOffset(prev => prev + 100);
    fetchMessages(true);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getInitials = (fullName) => {
    const names = fullName.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">GHL Conversations</h3>
          <p className="text-slate-500 max-w-md">
            Select a conversation from the sidebar to view messages.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white"> {/* Changed h-full to h-screen for full viewport */}
      {/* Chat Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
            {getInitials(selectedUser.full_name)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{selectedUser.full_name}</h2>
            <p className="text-sm text-slate-500">{selectedUser.phone_number}</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-sm text-slate-600">{isLoading ? 'Loading...' : 'GHL User'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
        {hasMore && (
          <div className="text-center py-2 sticky top-0 bg-white z-10">
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
            <GHLMessageItem key={msg.id || index} message={msg} personalNumber={personalNumber} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}

export default GHLChatArea;