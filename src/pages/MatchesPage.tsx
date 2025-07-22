import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, Clock, Users, Plus, Target } from 'lucide-react';

interface Match {
  id: string;
  title: string;
  date: string;
  time: string;
  opponent: string;
  location: string;
  category: string;
  type: 'friendly' | 'league' | 'tournament';
  status: 'scheduled' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
  attendance?: number;
}

const mockMatches: Match[] = [
  {
    id: '1',
    title: 'Nairobi FC vs Kibera United',
    date: '2024-12-16',
    time: '15:00',
    opponent: 'Kibera United',
    location: 'Kasarani Stadium',
    category: 'U15',
    type: 'league',
    status: 'scheduled',
    attendance: 0
  },
  {
    id: '2',
    title: 'Nairobi FC vs Mathare FC',
    date: '2024-12-14',
    time: '16:30',
    opponent: 'Mathare FC',
    location: 'Home Ground',
    category: 'U20',
    type: 'friendly',
    status: 'completed',
    homeScore: 2,
    awayScore: 1,
    attendance: 150
  },
  {
    id: '3',
    title: 'Nairobi FC vs Eastleigh FC',
    date: '2024-12-18',
    time: '14:00',
    opponent: 'Eastleigh FC',
    location: 'Away',
    category: 'U12',
    type: 'tournament',
    status: 'scheduled',
    attendance: 0
  }
];

export default function MatchesPage() {
  const [matches] = useState<Match[]>(mockMatches);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'scheduled' | 'completed'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'live': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'league': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'friendly': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'tournament': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredMatches = matches.filter(match => {
    if (selectedFilter === 'all') return true;
    return match.status === selectedFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Match Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Schedule and manage matches across all age categories</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              All Matches
            </button>
            <button
              onClick={() => setSelectedFilter('scheduled')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedFilter === 'scheduled'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedFilter('completed')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                selectedFilter === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Results
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Match
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Wins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">6</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <Trophy className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Goals Scored</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">24</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">75%</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <div key={match.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{match.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(match.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {match.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {match.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(match.type)}`}>
                  {match.type}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(match.status)}`}>
                  {match.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Match Details</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {match.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Opponent:</span>
                    <span className="font-medium">{match.opponent}</span>
                  </div>
                  {match.attendance !== undefined && (
                    <div className="flex justify-between">
                      <span>Attendance:</span>
                      <span className="font-medium">{match.attendance}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {match.status === 'completed' && match.homeScore !== undefined && match.awayScore !== undefined && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Final Score</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {match.homeScore} - {match.awayScore}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Nairobi FC vs {match.opponent}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col space-y-2">
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  View Details
                </button>
                {match.status === 'scheduled' && (
                  <>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                      Select Squad
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors">
                      Edit Match
                    </button>
                  </>
                )}
                {match.status === 'completed' && (
                  <button className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors">
                    Match Report
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Match Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Schedule New Match</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Match Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., Nairobi FC vs Opposition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Opponent
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Opposition team name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Stadium/Ground name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select category</option>
                    <option value="U9">U9</option>
                    <option value="U10">U10</option>
                    <option value="U12">U12</option>
                    <option value="U15">U15</option>
                    <option value="U20">U20</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Match Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="friendly">Friendly</option>
                    <option value="league">League</option>
                    <option value="tournament">Tournament</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Schedule Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}