import React, { useState } from 'react';
import { FileText, Download, Calendar, Users, Trophy, CreditCard, BarChart3 } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
}

const availableReports: Report[] = [
  {
    id: 'player-roster',
    name: 'Player Roster',
    description: 'Complete list of all registered players with contact information',
    category: 'Players',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    id: 'attendance-report',
    name: 'Attendance Report',
    description: 'Training and match attendance statistics by player and group',
    category: 'Training',
    icon: Calendar,
    color: 'bg-green-500'
  },
  {
    id: 'match-results',
    name: 'Match Results',
    description: 'Comprehensive match results and statistics for all teams',
    category: 'Matches',
    icon: Trophy,
    color: 'bg-orange-500'
  },
  {
    id: 'financial-summary',
    name: 'Financial Summary',
    description: 'Revenue, expenses, and outstanding fees summary',
    category: 'Finance',
    icon: CreditCard,
    color: 'bg-purple-500'
  },
  {
    id: 'performance-analytics',
    name: 'Performance Analytics',
    description: 'Player performance metrics and improvement tracking',
    category: 'Analytics',
    icon: BarChart3,
    color: 'bg-red-500'
  }
];

export default function ReportsPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('last-month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Players', 'Training', 'Matches', 'Finance', 'Analytics'];

  const filteredReports = availableReports.filter(report => 
    selectedCategory === 'all' || report.category === selectedCategory
  );

  const generateReport = (reportId: string, reportName: string) => {
    // Simulate report generation
    const csvContent = generateCSVContent(reportId);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSVContent = (reportId: string) => {
    switch (reportId) {
      case 'player-roster':
        return `Name,Age,Category,Position,Guardian,Phone,Join Date,Status
John Ochieng,16,U15,Forward,Mary Ochieng,+254712345678,2024-01-15,Active
Grace Wanjiku,14,U15,Midfielder,Peter Wanjiku,+254798765432,2024-02-20,Active
Michael Kamau,17,U20,Goalkeeper,Susan Kamau,+254711223344,2023-09-10,Injured`;
      
      case 'attendance-report':
        return `Player,Category,Training Sessions,Matches,Attendance Rate
John Ochieng,U15,18/20,5/6,88%
Grace Wanjiku,U15,19/20,6/6,95%
Michael Kamau,U20,15/20,4/6,75%`;
      
      case 'match-results':
        return `Date,Match,Result,Category,Attendance
2024-12-14,Nairobi FC vs Mathare FC,2-1 Win,U20,150
2024-12-10,Nairobi FC vs Kibera FC,1-1 Draw,U15,120
2024-12-08,Nairobi FC vs Eastleigh FC,3-0 Win,U12,80`;
      
      case 'financial-summary':
        return `Month,Revenue,Expenses,Net Income,Outstanding Fees
November,750000,460000,290000,45000
October,640000,440000,200000,32000
September,590000,410000,180000,28000`;
      
      case 'performance-analytics':
        return `Player,Technical,Tactical,Physical,Mental,Overall Rating
John Ochieng,8,7,9,8,8.0
Grace Wanjiku,9,8,7,9,8.3
Michael Kamau,7,9,8,8,8.0`;
      
      default:
        return 'No data available';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and download academy reports</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Range
          </label>
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="last-year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 ${report.color} rounded-lg flex items-center justify-center`}>
                <report.icon className="h-6 w-6 text-white" />
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {report.category}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{report.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{report.description}</p>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => alert(`Preview of ${report.name} report would be shown here.`)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <FileText className="h-4 w-4 inline mr-1" />
                Preview
              </button>
              <button 
                onClick={() => generateReport(report.id, report.name)}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4 inline mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Downloads */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Downloads</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Player_Roster_2024-12-14.csv</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Downloaded 2 hours ago</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Financial_Summary_2024-12-13.csv</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Downloaded yesterday</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}