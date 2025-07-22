import React, { useState } from 'react';
import { Target, Plus, Edit, Trash2, Eye, Clock, Users } from 'lucide-react';
import DrillModal from '../components/modals/DrillModal';

interface Drill {
  id: string;
  name: string;
  category: string;
  duration: number;
  difficulty: string;
  equipment: string;
  description: string;
  objectives: string;
}

const mockDrills: Drill[] = [
  {
    id: '1',
    name: 'Passing Triangle',
    category: 'Technical',
    duration: 15,
    difficulty: 'beginner',
    equipment: 'Cones, Balls',
    description: 'Players form triangles and practice short passing with first touch',
    objectives: 'Improve passing accuracy and first touch control'
  },
  {
    id: '2',
    name: '4v2 Possession',
    category: 'Tactical',
    duration: 20,
    difficulty: 'intermediate',
    equipment: 'Cones, Balls, Bibs',
    description: 'Four players keep possession against two defenders in a small area',
    objectives: 'Develop quick decision making and ball retention under pressure'
  }
];

export default function DrillsPage() {
  const [drills, setDrills] = useState<Drill[]>(mockDrills);
  const [showModal, setShowModal] = useState(false);
  const [selectedDrill, setSelectedDrill] = useState<Drill | undefined>();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Technical', 'Tactical', 'Physical', 'Mental'];

  const filteredDrills = drills.filter(drill => 
    selectedCategory === 'all' || drill.category === selectedCategory
  );

  const handleSaveDrill = (drillData: any) => {
    if (selectedDrill) {
      setDrills(drills.map(d => d.id === selectedDrill.id ? drillData : d));
    } else {
      setDrills([...drills, drillData]);
    }
    setSelectedDrill(undefined);
  };

  const handleEditDrill = (drill: Drill) => {
    setSelectedDrill(drill);
    setShowModal(true);
  };

  const handleDeleteDrill = (drillId: string) => {
    if (confirm('Are you sure you want to delete this drill?')) {
      setDrills(drills.filter(d => d.id !== drillId));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Drills Library</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage training drills</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Drill
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {category === 'all' ? 'All Drills' : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrills.map((drill) => (
          <div key={drill.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                {drill.difficulty}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{drill.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{drill.description}</p>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Category:</span>
                <span className="font-medium text-gray-900 dark:text-white">{drill.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Duration:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">{drill.duration} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Equipment:</span>
                <span className="font-medium text-gray-900 dark:text-white text-right">{drill.equipment}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => alert(`Viewing drill: ${drill.name}\n\nObjectives: ${drill.objectives}\n\nDescription: ${drill.description}`)}
                className="flex-1 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Eye className="h-4 w-4 inline mr-1" />
                View
              </button>
              <button 
                onClick={() => handleEditDrill(drill)}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDeleteDrill(drill.id)}
                className="px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <DrillModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedDrill(undefined);
        }}
        onSave={handleSaveDrill}
        drill={selectedDrill}
      />
    </div>
  );
}