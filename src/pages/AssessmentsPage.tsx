import React, { useState } from 'react';
import { FileText, Plus, Eye, Edit, Trash2, Star } from 'lucide-react';

interface Assessment {
  id: string;
  playerName: string;
  category: string;
  assessmentType: string;
  date: string;
  coach: string;
  overallRating: number;
  technical: number;
  tactical: number;
  physical: number;
  mental: number;
  notes: string;
}

const mockAssessments: Assessment[] = [
  {
    id: '1',
    playerName: 'John Ochieng',
    category: 'U15',
    assessmentType: 'Monthly Review',
    date: '2024-12-10',
    coach: 'Mary Wanjiku',
    overallRating: 8,
    technical: 8,
    tactical: 7,
    physical: 9,
    mental: 8,
    notes: 'Excellent progress in technical skills. Needs improvement in tactical awareness.'
  }
];

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments);
  const [showModal, setShowModal] = useState(false);

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Player Assessments</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and evaluate player performance</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Assessment
        </button>
      </div>

      <div className="space-y-4">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{assessment.playerName}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>{assessment.category}</span>
                    <span>{assessment.assessmentType}</span>
                    <span>{new Date(assessment.date).toLocaleDateString()}</span>
                    <span>Coach: {assessment.coach}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(assessment.overallRating)}
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  {assessment.overallRating}/10
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Technical</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{assessment.technical}/10</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Tactical</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{assessment.tactical}/10</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Physical</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{assessment.physical}/10</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Mental</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{assessment.mental}/10</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{assessment.notes}</p>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => alert(`Full assessment details for ${assessment.playerName}`)}
                className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors"
              >
                <Eye className="h-4 w-4 inline mr-1" />
                View Full
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <Edit className="h-4 w-4 inline mr-1" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}