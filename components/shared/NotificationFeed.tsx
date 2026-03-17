'use client';

import { useState } from 'react';

type Notification = {
  id: string;
  type: 'BOOKING' | 'PAYMENT' | 'SAFETY' | 'ACCOUNT' | 'SYSTEM';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
};

type NotificationFeedProps = {
  initialNotifications: Notification[];
};

export function NotificationFeed({ initialNotifications }: NotificationFeedProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'BOOKING': return '📅';
      case 'PAYMENT': return '💳';
      case 'SAFETY': return '🛡️';
      case 'ACCOUNT': return '👤';
      default: return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-stone-100 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            Notifications 
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Feed */}
      <div className="divide-y divide-stone-100 max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-stone-500">
            You're all caught up!
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-5 flex gap-4 transition-colors hover:bg-stone-50 cursor-pointer ${notif.isRead ? 'opacity-60' : 'bg-emerald-50/30'}`}
              onClick={() => {
                // Mark this specific one as read
                setNotifications(notifications.map(n => 
                  n.id === notif.id ? { ...n, isRead: true } : n
                ));
              }}
            >
              <div className="text-2xl shrink-0 mt-1">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-sm ${notif.isRead ? 'font-semibold text-stone-700' : 'font-bold text-stone-900'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-stone-400 whitespace-nowrap ml-2">{notif.time}</span>
                </div>
                <p className="text-sm text-stone-600 line-clamp-2">{notif.message}</p>
              </div>
              {!notif.isRead && (
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}