import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 450000, expenses: 320000 },
  { month: 'Feb', revenue: 520000, expenses: 340000 },
  { month: 'Mar', revenue: 480000, expenses: 360000 },
  { month: 'Apr', revenue: 580000, expenses: 380000 },
  { month: 'May', revenue: 620000, expenses: 400000 },
  { month: 'Jun', revenue: 680000, expenses: 420000 },
  { month: 'Jul', revenue: 720000, expenses: 450000 },
  { month: 'Aug', revenue: 650000, expenses: 430000 },
  { month: 'Sep', revenue: 590000, expenses: 410000 },
  { month: 'Oct', revenue: 640000, expenses: 440000 },
  { month: 'Nov', revenue: 700000, expenses: 460000 },
  { month: 'Dec', revenue: 750000, expenses: 480000 }
];

export default function RevenueChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            className="text-gray-600 dark:text-gray-400"
          />
          <YAxis 
            className="text-gray-600 dark:text-gray-400"
            tickFormatter={(value) => `KSh ${value / 1000}K`}
          />
          <Tooltip 
            formatter={(value: number) => [`KSh ${value.toLocaleString()}`, '']}
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg)',
              border: '1px solid var(--tooltip-border)',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#10b981" name="Revenue" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#f59e0b" name="Expenses" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}