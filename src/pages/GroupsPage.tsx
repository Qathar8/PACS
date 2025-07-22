import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import GroupModal from '../components/modals/GroupModal';

interface Group {
  id: string;
  name: string;
  category: string;
  coach: string;
  currentPlayers: number;
  maxPlayers: number;
  description: string;
  status: 'active' | 'inactive';
}

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Lions Squad',
    category: 'U15',
    coach: 'Mary Wanjiku',
    currentPlayers: 18,
    maxPlayers: 20,
    description: 'Competitive U15 team focusing on technical development',
    status: 'active'
  },
  {
    id: '2',
    name: 'Eagles Team',
    category: 'U12',
    coach: 'James Kiprotich',
    currentPlayers: 15,
    maxPlayers: 18,
    description: 'Development squad for younger players',
    status: 'active'
  }
];

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>();

  const handleSaveGroup = (groupData: any) => {
    if (selectedGroup) {
      setGroups(groups.map(g => g.id === selectedGroup.id ? { ...groupData, currentPlayers: selectedGroup.currentPlayers, status: selectedGroup.status } : g));
    } else {
      setGroups([...groups, { ...groupData, currentPlayers: 0, status: 'active' }]);
    }
    setSelectedGroup(undefined);
  };

  const handleEditGroup = (group: Group) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (confirm('Are you sure you want to delete this group?')) {
      setGroups(groups.filter(g => g.id !== groupId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Groups & Teams</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage training groups and team assignments</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                group.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              }`}>
                {group.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{group.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{group.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Category:</span>
                <span className="font-medium text-gray-900 dark:text-white">{group.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Coach:</span>
                <span className="font-medium text-gray-900 dark:text-white">{group.coach}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Players:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {group.currentPlayers}/{group.maxPlayers}
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => alert(`Viewing details for ${group.name}`)}
                className="flex-1 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Eye className="h-4 w-4 inline mr-1" />
                View
              </button>
              <button 
                onClick={() => handleEditGroup(group)}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDeleteGroup(group.id)}
                className="px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <GroupModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedGroup(undefined);
        }}
        onSave={handleSaveGroup}
        group={selectedGroup}
      />
    </div>
  );
}