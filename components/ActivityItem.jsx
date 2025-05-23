import React from 'react';
function ActivityItem({ activity }) {
  const { user, action, content, timestamp } = activity;
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffSeconds = Math.round((now - date) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
    if (diffSeconds < 172800) return "Yesterday";
    
    return date.toLocaleString();
  };

  return (
    <div className="flex items-start pb-4 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 mr-4">
        <img 
          src={user.avatar} 
          alt={`${user.name} avatar`} 
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{user.name} {action}</p>
        <p className="text-sm text-gray-500 mt-1">{content}</p>
        <p className="text-xs text-gray-400 mt-1">{formatTimestamp(timestamp)}</p>
      </div>
    </div>
  );
}
export default ActivityItem;