function ChatPage() {
  const [selectedUser, setSelectedUser] = React.useState(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 h-screen flex flex-col md:flex-row">
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