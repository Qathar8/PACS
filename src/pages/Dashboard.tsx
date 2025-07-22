import React from 'react';
import { Users, Calendar, Trophy, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: string;
  color: string;
}

export default function Dashboard() {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Players', value: 127, icon: Users, trend: '+8 this month', color: 'bg-blue-500' },
          { title: 'Active Coaches', value: 12, icon: Users, trend: '+2 new', color: 'bg-green-500' },
          { title: 'Upcoming Matches', value: 8, icon: Trophy, trend: 'Next: Tomorrow', color: 'bg-orange-500' },
          { title: 'Outstanding Fees', value: 'KSh 45,000', icon: CreditCard, trend: '12 pending', color: 'bg-red-500' },
        ];
      case 'coach':
        return [
          { title: 'My Players', value: 24, icon: Users, trend: 'U15 Squad', color: 'bg-blue-500' },
          { title: 'This Week Training', value: 4, icon: Calendar, trend: '2 completed', color: 'bg-green-500' },
          { title: 'Next Match', value: 'Sat 2PM', icon: Trophy, trend: 'vs Kibera FC', color: 'bg-orange-500' },
          { title: 'Attendance Rate', value: '89%', icon: TrendingUp, trend: '+5% this month', color: 'bg-purple-500' },
        ];
      case 'medical':
        return [
          { title: 'Active Injuries', value: 3, icon: AlertTriangle, trend: '1 recovering', color: 'bg-red-500' },
          { title: 'Medical Checks', value: 15, icon: Calendar, trend: 'Due this week', color: 'bg-blue-500' },
          { title: 'Players Monitored', value: 127, icon: Users, trend: 'All academies', color: 'bg-green-500' },
          { title: 'Health Alerts', value: 2, icon: AlertTriangle, trend: 'Attention needed', color: 'bg-orange-500' },
        ];
      case 'parent':
        return [
          { title: 'Training Sessions', value: 12, icon: Calendar, trend: 'This month', color: 'bg-blue-500' },
          { title: 'Matches Played', value: 6, icon: Trophy, trend: '4 wins, 2 draws', color: 'bg-green-500' },
          { title: 'Goals Scored', value: 8, icon: TrendingUp, trend: 'Season total', color: 'bg-orange-500' },
          { title: 'Fee Balance', value: 'KSh 2,500', icon: CreditCard, trend: 'Due Dec 15', color: 'bg-red-500' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  const recentActivities = [
    { type: 'match', message: 'Match result: Nairobi FC U15 2-1 Kibera FC', time: '2 hours ago', color: 'text-green-600' },
    { type: 'training', message: 'Training session completed for U12 squad', time: '4 hours ago', color: 'text-blue-600' },
    { type: 'payment', message: 'Payment received from Grace Njeri', time: '1 day ago', color: 'text-purple-600' },
    { type: 'injury', message: 'James Ochieng cleared to return to training', time: '2 days ago', color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.academyName} • {new Date().toLocaleDateString('en-GB', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {user?.role} Dashboard
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                {stat.trend && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.trend}</p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <button className="p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Add Player</p>
            </button>
            <button className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Schedule Training</p>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors">
              <Trophy className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Add Match</p>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
              <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Record Payment</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}