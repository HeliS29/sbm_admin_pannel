import React from 'react';
import { Clock, CheckCheck } from 'lucide-react';

function GHLMessageItem({ message, personalNumber }) {
  const isOutgoing = message.from === personalNumber;

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
          isOutgoing
            ? 'bg-green-600 text-white rounded-br-none'
            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
        }`}
      >
        {message.body && <div className="text-sm leading-relaxed mb-1">{message.body}</div>}

        {message.media?.map((mediaItem, i) =>
          mediaItem.content_type?.startsWith('image/') ? (
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
                isOutgoing ? 'text-green-100 hover:text-white' : 'text-green-600 hover:text-green-700'
              }`}
            >
              📎 View file ({mediaItem.content_type})
            </a>
          )
        )}

        <div className={`flex items-center justify-end mt-2 space-x-1 ${
          isOutgoing ? 'text-green-100' : 'text-slate-400'
        }`}>
          <Clock className="w-3 h-3" />
          <span className="text-xs">{formatTime(message.date_sent)}</span>
          {isOutgoing && <CheckCheck className="w-3 h-3 text-green-200" />}
        </div>
      </div>
    </div>
  );
}

export default GHLMessageItem;