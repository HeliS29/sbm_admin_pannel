// import React from 'react';
// function MessageItem({ message, twilioNumber }) {
//   const isOutgoing = message.from === twilioNumber;
  
//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div
//       className={`max-w-xl px-4 py-3 rounded-2xl shadow-sm ${
//         isOutgoing
//           ? "bg-blue-600 text-white self-end ml-auto"
//           : "bg-white text-gray-800 border self-start"
//       }`}
//       style={{ wordBreak: "break-word" }}
//     >
//       {/* Text Body */}
//       {message.body && <div className="text-base">{message.body}</div>}

//       {/* Media Section */}
//       {message.media?.length > 0 && message.media.map((mediaItem, i) =>
//         mediaItem.content_type?.startsWith("image/") ? (
//           <img
//             key={i}
//             src={mediaItem.url}
//             alt="Media"
//             className="mt-3 rounded-md border max-w-xs"
//           />
//         ) : (
//           <a
//             key={i}
//             href={mediaItem.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`mt-3 block underline text-sm ${isOutgoing ? "text-blue-200" : "text-blue-600"}`}
//           >
//             View file ({mediaItem.content_type})
//           </a>
//         )
//       )}

//       {/* Timestamp */}
//       <div className={`text-xs ${isOutgoing ? "text-gray-300" : "text-gray-400"} mt-2 text-right`}>
//         {formatTime(message.date_sent)}
//       </div>
//     </div>
//   );
// }
// export default MessageItem;


import React from 'react';
import { Clock, Check, CheckCheck } from 'lucide-react';

function MessageItem({ message, twilioNumber }) {
  const isOutgoing = message.from === twilioNumber;
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm relative ${
          isOutgoing
            ? "bg-green-600 text-white rounded-br-md"
            : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
        }`}
        style={{ wordBreak: "break-word" }}
      >
        {/* Text Body */}
        {message.body && (
          <div className="text-sm leading-relaxed mb-1">
            {message.body}
          </div>
        )}

        {/* Media Section */}
        {message.media?.length > 0 && message.media.map((mediaItem, i) =>
          mediaItem.content_type?.startsWith("image/") ? (
            <div key={i} className="mt-2">
              <img
                src={mediaItem.url}
                alt="Media"
                className="rounded-lg border max-w-full h-auto"
              />
            </div>
          ) : (
            <a
              key={i}
              href={mediaItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-2 block text-sm underline hover:no-underline transition-all ${
                isOutgoing ? "text-green-100 hover:text-white" : "text-green-600 hover:text-green-700"
              }`}
            >
              📎 View file ({mediaItem.content_type})
            </a>
          )
        )}

        {/* Timestamp and Status */}
        <div className={`flex items-center justify-end mt-2 space-x-1 ${
          isOutgoing ? "text-green-100" : "text-slate-400"
        }`}>
          <Clock className="w-3 h-3" />
          <span className="text-xs">
            {formatTime(message.date_sent)}
          </span>
          {isOutgoing && (
            <CheckCheck className="w-3 h-3 text-green-200" />
          )}
        </div>

        {/* Message tail */}
        <div
          className={`absolute bottom-0 w-3 h-3 ${
            isOutgoing
              ? "right-0 bg-green-600 transform rotate-45 translate-x-1 translate-y-1"
              : "left-0 bg-white border-l border-b border-slate-200 transform rotate-45 -translate-x-1 translate-y-1"
          }`}
        />
      </div>
    </div>
  );
}

export default MessageItem;