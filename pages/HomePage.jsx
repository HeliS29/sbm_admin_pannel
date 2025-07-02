import React from 'react';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import ActivityItem from '../components/ActivityItem';

function HomePage() {
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    totalMessages: 0,
    activeToday: 0
  });
  const [activities, setActivities] = React.useState([]);
  const [isStatsLoading, setIsStatsLoading] = React.useState(true);
  const [isActivitiesLoading, setIsActivitiesLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Fetch dashboard stats
    const token = localStorage.getItem('token');
    
    // Fetch stats
    fetch('https://api.interactivv.pro/chat/api/dashboard/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setIsStatsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setIsStatsLoading(false);
      });
    
    // Fetch recent activity
    fetch('https://api.interactivv.pro/chat/api/dashboard/activity', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
      })
      .then(data => {
        setActivities(data);
        setIsActivitiesLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setIsActivitiesLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            {isStatsLoading ? (
              <>
                <div className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-20"></div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-20"></div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-20"></div>
                </div>
              </>
            ) : (
              <>
                <StatsCard 
                  icon="fas fa-users"
                  title="Total Users"
                  value={stats.totalUsers || 0}
                  color="primary"
                />
                <StatsCard 
                  icon="fas fa-comment-dots"
                  title="Total Messages"
                  value={stats.totalMessages || 0}
                  color="green"
                />
                <StatsCard 
                  icon="fas fa-clock"
                  title="Active Today"
                  value={stats.activeToday || 0}
                  color="yellow"
                />
              </>
            )}
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Recent Activity</h3>
            </div>
            <div className="p-6">
              {isActivitiesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="animate-pulse flex items-start pb-4 border-b border-gray-100">
                      <div className="rounded-full bg-gray-200 h-10 w-10 mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activities?.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No recent activity
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;