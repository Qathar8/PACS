import React, { useState } from 'react';
import { Megaphone, Plus, Eye, Edit, Trash2, Calendar } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: string[];
  author: string;
  date: string;
  status: 'draft' | 'published';
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Training Schedule Update',
    content: 'Please note that this week\'s training sessions have been moved to the new field due to maintenance work.',
    priority: 'high',
    targetAudience: ['players', 'parents', 'coaches'],
    author: 'Mary Wanjiku',
    date: '2024-12-14',
    status: 'published'
  },
  {
    id: '2',
    title: 'End of Year Tournament',
    content: 'We are excited to announce our annual end-of-year tournament. Registration is now open.',
    priority: 'medium',
    targetAudience: ['players', 'parents'],
    author: 'John Mwangi',
    date: '2024-12-12',
    status: 'published'
  }
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [showModal, setShowModal] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Announcements</h1>
          <p className="text-gray-600 dark:text-gray-400">Communicate with players, parents, and staff</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Megaphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(announcement.date).toLocaleDateString()}
                    </span>
                    <span>By {announcement.author}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority} priority
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  announcement.status === 'published' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                }`}>
                  {announcement.status}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">{announcement.content}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {announcement.targetAudience.map((audience, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {audience}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Viewing announcement: ${announcement.title}\n\n${announcement.content}`)}
                  className="px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors"
                >
                  <Eye className="h-4 w-4 inline mr-1" />
                  View
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
                <button className="px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}