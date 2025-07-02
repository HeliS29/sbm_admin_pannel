
// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import ChatSidebar from '../components/ChatSidebar';
// import ChatArea from '../components/ChatArea';


// function ChatPage() {
//   const [selectedUser, setSelectedUser] = React.useState(null);

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 h-screen flex flex-col md:flex-row w-[calc(100%-18rem)] ml-[18rem]">
//         {/* Chat Sidebar */}
//         <ChatSidebar 
//           onSelectUser={setSelectedUser} 
//           selectedUser={selectedUser}
//         />

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col bg-gray-50 h-screen overflow-hidden">
//           <ChatArea selectedUser={selectedUser} />
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ChatPage;


import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatSidebar from '../components/ChatSidebar';
import ChatArea from '../components/ChatArea';
import TwilioConfigForm from '../components/TwilioConfigForm';

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [configExists, setConfigExists] = useState(null); // null = loading
  const token = localStorage.getItem("token"); // Get token from local storage

  const checkTwilioConfig = async () => {
    try {
      const res = await fetch("https://api.interactivv.pro/vapi/twilio/config", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Config not found");
      await res.json();
      setConfigExists(true);
    } catch (err) {
      setConfigExists(false);
    }
  };

  useEffect(() => {
    checkTwilioConfig();
  }, []);

  if (configExists === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <p className="text-slate-600 text-lg">Checking Twilio configuration...</p>
      </div>
    );
  }

  if (!configExists) {
    return <TwilioConfigForm onSuccess={checkTwilioConfig} token={token} />;
  }

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
          token={token}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 h-screen overflow-hidden">
          <ChatArea selectedUser={selectedUser} token={token} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
