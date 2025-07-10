import { useState, useEffect } from 'react';
import { fetchNotifications } from '../utils/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      setError('Failed to load notifications');
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-white/60 backdrop-blur-sm rounded-lg transition-all duration-200"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Notifications */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {unreadCount} new
                  </span>
                )}
              </h3>
              <button
                onClick={loadNotifications}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-16">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="p-4">
                <div className="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-sm">
                  {error}
                </div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center">
                <div className="text-2xl mb-2">📭</div>
                <p className="text-gray-500 text-sm">No notifications</p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 ${
                      notification.read
                        ? 'bg-gray-50 hover:bg-gray-100'
                        : 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-400'
                    }`}
                    onClick={() => {
                      // Mark as read functionality can be added here
                      console.log('Notification clicked:', notification);
                    }}
                  >
                    <p className="text-sm text-gray-800 mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Notifications; 