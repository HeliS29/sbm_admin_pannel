
import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatSidebar from '../components/ChatSidebar';
import ChatArea from '../components/ChatArea';


function ChatPage() {
  const [selectedUser, setSelectedUser] = React.useState(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 h-screen flex flex-col md:flex-row w-[calc(100%-18rem)] ml-[18rem]">
        {/* Chat Sidebar */}
        <ChatSidebar 
          onSelectUser={setSelectedUser} 
          selectedUser={selectedUser}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 h-screen overflow-hidden">
          <ChatArea selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
}
export default ChatPage;