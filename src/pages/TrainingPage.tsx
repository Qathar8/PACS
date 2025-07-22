import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, MapPin, Target } from 'lucide-react';

interface TrainingSession {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  category: string;
  coach: string;
  location: string;
  objectives: string[];
  attendees: number;
  maxAttendees: number;
  status: 'scheduled' | 'ongoing' | 'completed';
}

const mockSessions: TrainingSession[] = [
  {
    id: '1',
    title: 'Technical Skills Development',
    date: '2024-12-15',
    time: '16:00',
    duration: 90,
    category: 'U15',
    coach: 'Mary Wanjiku',
    location: 'Main Field A',
    objectives: ['Ball control', 'Passing accuracy', 'First touch'],
    attendees: 18,
    maxAttendees: 20,
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Tactical Formation Practice',
    date: '2024-12-16',
    time: '15:30',
    duration: 120,
    category: 'U20',
    coach: 'James Kiprotich',
    location: 'Main Field B',
    objectives: ['4-3-3 Formation', 'Pressing triggers', 'Transition play'],
    attendees: 22,
    maxAttendees: 25,
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Fitness & Conditioning',
    date: '2024-12-14',
    time: '17:00',
    duration: 60,
    category: 'U12',
    coach: 'Sarah Muthoni',
    location: 'Training Ground',
    objectives: ['Endurance building', 'Agility drills', 'Core strength'],
    attendees: 15,
    maxAttendees: 16,
    status: 'completed'
  }
];

export default function TrainingPage() {
  const [sessions] = useState<TrainingSession[]>(mockSessions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedView, setSelectedView] = useState<'list' | 'calendar'>('list');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Training Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Schedule and manage training sessions</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSelectedView('list')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                selectedView === 'list'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setSelectedView('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                selectedView === 'calendar'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Calendar
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">12</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">87%</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8.4</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Training Sessions */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(session.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {session.time} ({session.duration}min)
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {session.location}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                {session.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Session Details</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {session.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coach:</span>
                    <span className="font-medium">{session.coach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attendance:</span>
                    <span className="font-medium">{session.attendees}/{session.maxAttendees}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Training Objectives</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {session.objectives.map((objective, index) => (
                    <li key={index} className="flex items-center">
                      <Target className="h-3 w-3 mr-2 text-green-500" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  Take Attendance
                </button>
                {session.status === 'completed' && (
                  <button className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors">
                    View Report
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Schedule Training Session</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Session Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter session title"
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
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="90"
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
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="25"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Training Objectives
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="List the main objectives for this training session..."
                  />
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
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}