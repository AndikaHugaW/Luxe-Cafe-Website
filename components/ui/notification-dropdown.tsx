"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Package, Heart, Gift, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Notification {
  icon: any;
  title: string;
  message: string;
  time: string;
  read: boolean;
  color: string;
}

interface NotificationDropdownProps {
  isLight?: boolean;
}

export const NotificationDropdown = ({ isLight = false }: NotificationDropdownProps) => {
  const router = useRouter();

  const notifications: Notification[] = [
    {
      icon: CheckCircle,
      title: 'Profile Updated',
      message: 'Your profile changes have been saved successfully.',
      time: 'Just now',
      read: false,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Package,
      title: 'Order Delivered',
      message: 'Enjoy your hot Caramel Macchiato! Order #LK-882 has arrived.',
      time: '2h ago',
      read: false,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Heart,
      title: 'Wishlist Update',
      message: 'Luxury Cafe Tumbler is back in stock at 15% OFF for members.',
      time: '5h ago',
      read: false,
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Gift,
      title: 'Membership Reward',
      message: 'Congratulations! Youve been upgraded to Silver Level rewards.',
      time: '1d ago',
      read: true,
      color: 'bg-amber-100 text-amber-600'
    },
    {
      icon: Bell,
      title: 'New Event',
      message: 'Join our Latte Art Workshop this Sunday at 10 AM.',
      time: '2d ago',
      read: true,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            isLight 
              ? 'hover:bg-white/10 text-white drop-shadow-md' 
              : 'hover:bg-gray-100 text-dark-blue'
          }`}
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[380px] rounded-xl bg-white p-0 shadow-xl border border-gray-100" align="end">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-dark-blue text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification, index) => (
            <DropdownMenuItem
              key={index}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${
                !notification.read ? 'bg-blue-50/30' : ''
              }`}
              onClick={() => router.push('/notifications')}
            >
              <div className="flex items-start gap-3 w-full">
                <div className={`p-2 rounded-lg ${notification.color} shrink-0`}>
                  <notification.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-dark-blue text-sm">{notification.title}</p>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs mb-1 line-clamp-2">{notification.message}</p>
                  <p className="text-gray-400 text-xs">{notification.time}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => router.push('/notifications')}
            className="w-full text-center text-sm text-primary hover:text-primary-dark font-semibold py-2 hover:bg-primary/5 rounded-lg transition-colors"
          >
            View All Notifications
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
