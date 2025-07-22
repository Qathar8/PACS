import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  Trophy, 
  CreditCard, 
  Heart, 
  Search, 
  Target,
  BarChart3,
  Megaphone,
  CalendarDays,
  FileText
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home, roles: ['admin', 'coach', 'medical', 'parent', 'scout'] },
  { name: 'Players', href: '/players', icon: Users, roles: ['admin', 'coach', 'medical', 'scout'] },
  { name: 'Groups & Coaches', href: '/groups', icon: Users, roles: ['admin', 'coach'] },
  { name: 'Training', href: '/training', icon: Calendar, roles: ['admin', 'coach'] },
  { name: 'Matches', href: '/matches', icon: Trophy, roles: ['admin', 'coach', 'scout'] },
  { name: 'Assessments', href: '/assessments', icon: FileText, roles: ['admin', 'coach'] },
  { name: 'Drills Library', href: '/drills', icon: Target, roles: ['admin', 'coach'] },
  { name: 'Fees & Payments', href: '/fees', icon: CreditCard, roles: ['admin', 'parent'] },
  { name: 'Medical Records', href: '/medical', icon: Heart, roles: ['admin', 'medical'] },
  { name: 'Scouting', href: '/scouting', icon: Search, roles: ['admin', 'scout'] },
  { name: 'Announcements', href: '/announcements', icon: Megaphone, roles: ['admin', 'coach'] },
  { name: 'Events', href: '/events', icon: CalendarDays, roles: ['admin', 'coach'] },
  { name: 'Reports', href: '/reports', icon: FileText, roles: ['admin', 'coach'] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['admin', 'coach'] },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const filteredNavigation = navigationItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">ProAcademy360</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.academyName}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out ${
                  isActive
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 ProAcademy360
          </div>
        </div>
      </div>
    </div>
  );
}