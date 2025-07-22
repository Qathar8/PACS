import React, { useState } from 'react';
import { CalendarDays, Plus, Eye, Edit, Trash2, MapPin, Clock, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'match' | 'training' | 'meeting' | 'tournament' | 'social';
  attendees: number;
  maxAttendees?: number;
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Parent-Coach Meeting',
    description: 'Monthly meeting to discuss player progress and upcoming events',
    date: '2024-12-20',
    time: '18:00',
    location: 'Academy Conference Room',
    type: 'meeting',
    attendees: 25,
    maxAttendees: 30,
    organizer: 'John Mwangi',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Christmas Tournament',
    description: 'Annual Christmas tournament featuring all age groups',
    date: '2024-12-23',
    time: '09:00',
    location: 'Main Stadium',
    type: 'tournament',
    attendees: 150,
    maxAttendees: 200,
    organizer: 'Mary Wanjiku',
    status: 'upcoming'
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showModal, setShowModal] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'match': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'training': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'meeting': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'tournament': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'social': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage academy events and activities</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <CalendarDays className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                  {event.type}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {event.attendees}{event.maxAttendees && `/${event.maxAttendees}`} attendees
                </span>
                <span>Organizer: {event.organizer}</span>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Event Details:\n\nTitle: ${event.title}\nDescription: ${event.description}\nDate: ${new Date(event.date).toLocaleDateString()}\nTime: ${event.time}\nLocation: ${event.location}\nOrganizer: ${event.organizer}`)}
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