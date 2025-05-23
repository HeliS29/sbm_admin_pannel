import React from 'react';
function StatsCard({ icon, title, value, color }) {
  const colorClasses = {
    primary: "bg-indigo-100 text-primary",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600"
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color] || colorClasses.primary}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
export default StatsCard;