import React, { useEffect, useState } from "react";
import GHLChatSidebar from "../components/GhlChatSidebar";
import GHLChatArea from "../components/GhlChataREA";
import Sidebar from "../components/Sidebar";

function GHLChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasNumber, setHasNumber] = useState(false);
  const [personalNumber, setPersonalNumber] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // ✅ Centralized header generator
  const getAuthHeaders = (extraHeaders = {}) => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}`, ...extraHeaders };
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("https://api.interactivv.pro/GHL/get-ghldetails", {
          method: "GET",
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 404) {
            setShowDialog(true);
            return;
          }
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setHasNumber(true);
        setPersonalNumber(data.personal_number);
      } catch (err) {
        console.error("Error fetching config", err);
      }
    };

    fetchConfig();
  }, []);

  const handleAddNumber = async () => {
    if (!personalNumber) return;

    try {
      const res = await fetch("https://api.interactivv.pro/GHL/add-ghlDetails", {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ personal_number: personalNumber }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      setShowDialog(false);
      setHasNumber(true);
    } catch (err) {
      console.error("Error adding personal number", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex items-center justify-center h-screen bg-slate-50 w-[calc(100%-18rem)] ml-[18rem]">
        {hasNumber ? (
          <>
            <GHLChatSidebar
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
            <div className="flex-1">
              <GHLChatArea selectedUser={selectedUser} />
            </div>
          </>
        ) : (
          showDialog && (
            <div className="bg-white shadow-lg rounded-xl p-6 w-[400px]">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Add your GHL WhatsApp number
              </h2>
              <input
                type="text"
                value={personalNumber}
                onChange={(e) => setPersonalNumber(e.target.value)}
                placeholder="+14155552671"
                className="border rounded-lg w-full p-2 mb-4"
              />
              <button
                onClick={handleAddNumber}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Save Number
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default GHLChatPage;




// import React from "react";
// import GHLChatSidebar from "../components/GhlChatSidebar";
// import GHLChatArea from "../components/GhlChataREA";
// import Sidebar from "../components/Sidebar";


// function GHLChatPage() {
//   const [selectedUser, setSelectedUser] = React.useState(null);

//   return (
//     <div className="min-h-screen flex bg-slate-50">
//       {/* Sidebar */}
//       <Sidebar />
//       <div className="flex items-center justify-center h-screen bg-slate-50 w-[calc(100%-18rem)] ml-[18rem]">
//       <GHLChatSidebar
//         selectedUser={selectedUser}
//         onSelectUser={setSelectedUser} // pass the handler
//       />

//       {/* Chat area */}
//       <div className="flex-1">
//         <GHLChatArea selectedUser={selectedUser} />
//       </div>
//       </div>
//     </div>
//   );
// }

// export default GHLChatPage;
