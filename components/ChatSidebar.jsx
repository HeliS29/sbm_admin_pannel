
import React from 'react';
import { Search, MessageCircle, Users, Clock } from 'lucide-react';

function ChatSidebar({ onSelectUser, selectedUser }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const getAuthHeaders = (extraHeaders = {}) => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      ...extraHeaders,
    };
  };
  React.useEffect(() => {
    fetch("https://api.interactivv.pro/twilio/api/whatsapp/users", {
      
        headers: getAuthHeaders(),
      
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch WhatsApp users");
        }
        return res.json();
      })
      .then(data => {
        setUsers(data.user_numbers || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching WhatsApp users:", err);
        setIsLoading(false);
      });
  }, []);
  
  const filteredUsers = searchQuery 
    ? users.filter(user => user.replace("whatsapp:", "").includes(searchQuery))
    : users;

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

  return (
    <div className="w-full lg:w-2/5 xl:w-1/3 bg-white shadow-lg border-r border-slate-200">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-600" />
              Conversations
            </h2>
            <p className="text-slate-600 mt-1">WhatsApp messages</p>
          </div>
          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {users.length}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          />
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-slate-500 mt-2">Loading conversations...</p>
          </div>
        )}

        {filteredUsers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {searchQuery ? 'Try adjusting your search' : 'Conversations will appear here when users message you'}
            </p>
          </div>
        )}

        <div className="space-y-2 h-[590px] overflow-y-auto">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className={`group cursor-pointer rounded-xl p-4 transition-all duration-200 hover:shadow-md ${
                selectedUser === user
                  ? 'bg-green-50 border-2 border-green-200 shadow-md'
                  : 'bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-200'
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white ${
                  selectedUser === user ? 'bg-green-600' : 'bg-slate-400 group-hover:bg-green-500'
                } transition-colors`}>
                  {getInitials(user)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-semibold truncate ${
                      selectedUser === user ? 'text-green-900' : 'text-slate-800 group-hover:text-green-900'
                    }`}>
                      {formatPhoneNumber(user)}
                    </p>
                    {/* <div className="flex items-center text-xs text-slate-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Active</span>
                    </div> */}
                  </div>
                  
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-sm text-slate-600">WhatsApp User</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;