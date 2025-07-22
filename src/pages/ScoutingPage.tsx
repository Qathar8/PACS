import React, { useState } from 'react';
import { Search, Eye, Star, Calendar, MapPin, Plus, UserCheck, UserX } from 'lucide-react';

interface Trial {
  id: string;
  name: string;
  age: number;
  position: string;
  contactNumber: string;
  trialDate: string;
  location: string;
  status: 'scheduled' | 'completed' | 'accepted' | 'rejected';
  rating?: number;
  notes?: string;
  scout: string;
}

const mockTrials: Trial[] = [
  {
    id: '1',
    name: 'David Mwangi',
    age: 15,
    position: 'Midfielder',
    contactNumber: '+254712345678',
    trialDate: '2024-12-16',
    location: 'Main Field A',
    status: 'scheduled',
    scout: 'James Kiprotich'
  },
  {
    id: '2',
    name: 'Sarah Njoki',
    age: 14,
    position: 'Forward',
    contactNumber: '+254798765432',
    trialDate: '2024-12-14',
    location: 'Training Ground',
    status: 'completed',
    rating: 8,
    notes: 'Excellent ball control and finishing. Shows great potential.',
    scout: 'Mary Wanjiku'
  },
  {
    id: '3',
    name: 'Kevin Ouma',
    age: 16,
    position: 'Defender',
    contactNumber: '+254711223344',
    trialDate: '2024-12-12',
    location: 'Main Field B',
    status: 'accepted',
    rating: 9,
    notes: 'Outstanding defensive skills, good leadership qualities.',
    scout: 'James Kiprotich'
  }
];

export default function ScoutingPage() {
  const [trials] = useState<Trial[]>(mockTrials);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'scheduled' | 'completed' | 'accepted' | 'rejected'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Calendar;
      case 'completed': return Eye;
      case 'accepted': return UserCheck;
      case 'rejected': return UserX;
      default: return Calendar;
    }
  };

  const filteredTrials = trials.filter(trial => {
    if (selectedFilter === 'all') return true;
    return trial.status === selectedFilter;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scouting & Trials</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage player trials and scouting activities</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Search className="h-4 w-4 mr-2" />
            Find Players
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Trial
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled Trials</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {trials.filter(t => t.status === 'scheduled').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Trials</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {trials.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accepted Players</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {trials.filter(t => t.status === 'accepted').length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">75%</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
        {['all', 'scheduled', 'completed', 'accepted', 'rejected'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as any)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
              selectedFilter === filter
                ? 'bg-green-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {filter} ({filter === 'all' ? trials.length : trials.filter(t => t.status === filter).length})
          </button>
        ))}
      </div>

      {/* Trials List */}
      <div className="space-y-4">
        {filteredTrials.map((trial) => {
          const StatusIcon = getStatusIcon(trial.status);
          return (
            <div key={trial.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {trial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{trial.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>Age {trial.age}</span>
                      <span>{trial.position}</span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(trial.trialDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trial.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusIcon className="h-5 w-5 text-gray-400" />
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trial.status)}`}>
                    {trial.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Phone:</span> {trial.contactNumber}
                    </div>
                    <div>
                      <span className="font-medium">Scout:</span> {trial.scout}
                    </div>
                    <div>
                      <span className="font-medium">Position:</span> {trial.position}
                    </div>
                  </div>
                </div>
                
                {trial.rating && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(trial.rating)}
                          <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">
                            {trial.rating}/5
                          </span>
                        </div>
                      </div>
                      {trial.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {trial.notes}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col space-y-2">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                    View Details
                  </button>
                  {trial.status === 'scheduled' && (
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                      Start Assessment
                    </button>
                  )}
                  {trial.status === 'completed' && (
                    <>
                      <button className="px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 rounded-lg transition-colors">
                        Accept Player
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors">
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Trial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Schedule New Trial</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Player Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Position
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select position</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Forward">Forward</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="+254..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trial Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Training ground/field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assigning Scout
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select scout</option>
                    <option value="James Kiprotich">James Kiprotich</option>
                    <option value="Mary Wanjiku">Mary Wanjiku</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trial Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Any additional information about the trial..."
                />
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
                  Schedule Trial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}