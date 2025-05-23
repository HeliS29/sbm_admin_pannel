import React from 'react';
function ChatSidebar({ onSelectUser, selectedUser }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Fetch WhatsApp users from the API
    fetch("http://localhost:8000/chat/api/whatsapp/users")
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

  return (
    <div className="w-full md:w-1/4 bg-white shadow-md border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Conversations</h2>
      
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-4">
          <i className="fas fa-spinner fa-spin text-primary mr-2"></i>
          Loading...
        </div>
      ) : (
        <div className="space-y-2">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedUser === user
                  ? "bg-blue-500 text-white shadow"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
              onClick={() => onSelectUser(user)}
            >
              <span className="font-medium">{user.replace("whatsapp:", "")}</span>
            </div>
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default ChatSidebar;