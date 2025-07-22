import React from 'react';
import { Bell, Search, User, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search players, matches, training..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-96"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}