import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { month: 'Jan', rate: 85 },
  { month: 'Feb', rate: 88 },
  { month: 'Mar', rate: 82 },
  { month: 'Apr', rate: 90 },
  { month: 'May', rate: 87 },
  { month: 'Jun', rate: 92 },
  { month: 'Jul', rate: 89 },
  { month: 'Aug', rate: 91 },
  { month: 'Sep', rate: 88 },
  { month: 'Oct', rate: 93 },
  { month: 'Nov', rate: 89 },
  { month: 'Dec', rate: 87 }
];

export default function AttendanceChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Attendance Rate</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            className="text-gray-600 dark:text-gray-400"
          />
          <YAxis 
            className="text-gray-600 dark:text-gray-400"
            domain={[70, 100]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg)',
              border: '1px solid var(--tooltip-border)',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}