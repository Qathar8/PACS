import React, { useState } from 'react';
import { Heart, AlertTriangle, Calendar, FileText, Plus, User } from 'lucide-react';

interface MedicalRecord {
  id: string;
  playerId: string;
  playerName: string;
  category: string;
  type: 'injury' | 'checkup' | 'treatment' | 'clearance';
  title: string;
  description: string;
  date: string;
  status: 'active' | 'recovering' | 'cleared' | 'scheduled';
  medicalStaff: string;
  returnDate?: string;
}

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    playerId: '1',
    playerName: 'John Ochieng',
    category: 'U15',
    type: 'injury',
    title: 'Ankle Sprain',
    description: 'Minor ankle sprain during training. Player twisted ankle during drill.',
    date: '2024-12-10',
    status: 'recovering',
    medicalStaff: 'Dr. Peter Kamau',
    returnDate: '2024-12-20'
  },
  {
    id: '2',
    playerId: '2',
    playerName: 'Grace Wanjiku',
    category: 'U15',
    type: 'checkup',
    title: 'Routine Medical Check',
    description: 'Annual fitness and health assessment.',
    date: '2024-12-12',
    status: 'cleared',
    medicalStaff: 'Dr. Peter Kamau'
  },
  {
    id: '3',
    playerId: '3',
    playerName: 'Michael Kamau',
    category: 'U20',
    type: 'injury',
    title: 'Hamstring Strain',
    description: 'Grade 1 hamstring strain. Occurred during sprint training.',
    date: '2024-12-08',
    status: 'active',
    medicalStaff: 'Dr. Peter Kamau',
    returnDate: '2024-12-25'
  }
];

export default function MedicalPage() {
  const [medicalRecords] = useState<MedicalRecord[]>(mockMedicalRecords);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'recovering' | 'scheduled'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'recovering': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cleared': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'injury': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'checkup': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'treatment': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'clearance': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredRecords = medicalRecords.filter(record => {
    if (selectedFilter === 'all') return true;
    return record.status === selectedFilter;
  });

  const activeInjuries = medicalRecords.filter(r => r.status === 'active' && r.type === 'injury').length;
  const recovering = medicalRecords.filter(r => r.status === 'recovering').length;
  const scheduledCheckups = medicalRecords.filter(r => r.status === 'scheduled' && r.type === 'checkup').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Records</h1>
          <p className="text-gray-600 dark:text-gray-400">Track player health and injury management</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Checkup
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Injuries</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activeInjuries}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recovering</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{recovering}</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500">
              <Heart className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled Checkups</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{scheduledCheckups}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Players</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">127</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
        {['all', 'active', 'recovering', 'scheduled'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as any)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
              selectedFilter === filter
                ? 'bg-green-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {filter} ({filter === 'all' ? medicalRecords.length : medicalRecords.filter(r => r.status === filter).length})
          </button>
        ))}
      </div>

      {/* Medical Records */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{record.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>Player: {record.playerName}</span>
                    <span>Category: {record.category}</span>
                    <span>Date: {new Date(record.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                  {record.type}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{record.description}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Medical Staff</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{record.medicalStaff}</p>
                </div>
                
                {record.returnDate && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Return</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(record.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-col space-y-2 pt-2">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                    View Full Record
                  </button>
                  {record.status === 'active' && (
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                      Update Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Medical Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Add Medical Record</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Player
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select player</option>
                    <option value="1">John Ochieng (U15)</option>
                    <option value="2">Grace Wanjiku (U15)</option>
                    <option value="3">Michael Kamau (U20)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Record Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="injury">Injury</option>
                    <option value="checkup">Medical Checkup</option>
                    <option value="treatment">Treatment</option>
                    <option value="clearance">Medical Clearance</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief title of the medical record"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Detailed description of the medical condition, treatment, or assessment..."
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
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="active">Active</option>
                    <option value="recovering">Recovering</option>
                    <option value="cleared">Cleared</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expected Return Date (Optional)
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Medical Staff
                  </label>
                  <input
                    type="text"
                    defaultValue="Dr. Peter Kamau"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}