export default function MessageItem({ message, twilioNumber }) {
  const isOutgoing = message.from === twilioNumber;
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`max-w-xl px-4 py-3 rounded-2xl shadow-sm ${
        isOutgoing
          ? "bg-blue-600 text-white self-end ml-auto"
          : "bg-white text-gray-800 border self-start"
      }`}
      style={{ wordBreak: "break-word" }}
    >
      {/* Text Body */}
      {message.body && <div className="text-base">{message.body}</div>}

      {/* Media Section */}
      {message.media?.length > 0 && message.media.map((mediaItem, i) =>
        mediaItem.content_type?.startsWith("image/") ? (
          <img
            key={i}
            src={mediaItem.url}
            alt="Media"
            className="mt-3 rounded-md border max-w-xs"
          />
        ) : (
          <a
            key={i}
            href={mediaItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 block underline text-sm ${isOutgoing ? "text-blue-200" : "text-blue-600"}`}
          >
            View file ({mediaItem.content_type})
          </a>
        )
      )}

      {/* Timestamp */}
      <div className={`text-xs ${isOutgoing ? "text-gray-300" : "text-gray-400"} mt-2 text-right`}>
        {formatTime(message.date_sent)}
      </div>
    </div>
  );
}
