"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";

const MENU_ITEMS = {
  profile: [
    { icon: "solar:user-circle-line-duotone", label: "Your profile", action: "profile" },
    { icon: "solar:settings-line-duotone", label: "Settings", action: "settings" },
    { icon: "solar:bell-line-duotone", label: "Notifications", action: "notifications" }
  ],
  orders: [
    { icon: "solar:bag-4-line-duotone", label: "My Orders", action: "orders" },
    { icon: "solar:heart-line-duotone", label: "Favorites", action: "favorites" },
    { icon: "solar:ticket-line-duotone", label: "Rewards", action: "rewards" }
  ],
  support: [
    { icon: "solar:question-circle-line-duotone", label: "Help & Support", action: "help" },
    { icon: "solar:document-text-line-duotone", label: "Terms & Privacy", action: "terms" }
  ]
};

interface UserDropdownProps {
  onAction?: (action: string) => void;
  isLight?: boolean;
}

export const UserDropdown = ({ 
  onAction = () => {},
  isLight = false
}: UserDropdownProps) => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const getInitials = (name?: string | null, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email?.slice(0, 2).toUpperCase() || 'U';
  };

  const handleAction = (action: string) => {
    if (action === 'logout') {
      signOut();
    } else {
      onAction(action);
    }
  };

  const renderMenuItem = (item: any, index: number) => (
    <DropdownMenuItem 
      key={index}
      className="p-2 rounded-lg cursor-pointer"
      onClick={() => handleAction(item.action)}
    >
      <span className="flex items-center gap-2 font-medium">
        <Icon
          icon={item.icon}
          className={`size-5 ${item.iconClass || "text-gray-500"}`}
        />
        {item.label}
      </span>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full">
          <Avatar className={`cursor-pointer size-10 hover:ring-2 hover:ring-primary/30 transition-all ${
            isLight ? 'border border-white/20 shadow-lg' : ''
          }`}>
            <AvatarImage src={user.image || undefined} alt={user.name || user.email || ''} />
            <AvatarFallback className="bg-primary text-white text-sm font-semibold">
              {getInitials(user.name, user.email || '')}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[280px] rounded-xl bg-white p-2 shadow-xl border border-gray-100" align="end">
        {/* User Info Header */}
        <div className="flex items-center gap-3 p-3 mb-2 bg-gray-50 rounded-lg">
          <Avatar className="size-12 border-2 border-white shadow-sm">
            <AvatarImage src={user.image || undefined} alt={user.name || user.email || ''} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(user.name, user.email || '')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 truncate">
              {user.name || 'User'}
            </h3>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] px-2">
            Active
          </Badge>
        </div>

        {/* Profile Section */}
        <DropdownMenuGroup>
          {MENU_ITEMS.profile.map(renderMenuItem)}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />

        {/* Orders Section */}
        <DropdownMenuGroup>
          {MENU_ITEMS.orders.map(renderMenuItem)}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />

        {/* Support Section */}
        <DropdownMenuGroup>
          {MENU_ITEMS.support.map(renderMenuItem)}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />

        {/* Logout */}
        <DropdownMenuItem 
          className="p-2 rounded-lg cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => handleAction('logout')}
        >
          <span className="flex items-center gap-2 font-medium">
            <Icon
              icon="solar:logout-2-bold-duotone"
              className="size-5"
            />
            Log Out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
