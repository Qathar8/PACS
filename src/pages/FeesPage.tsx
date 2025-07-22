import React, { useState } from 'react';
import { CreditCard, DollarSign, AlertTriangle, CheckCircle, Clock, Plus } from 'lucide-react';

interface FeeRecord {
  id: string;
  playerName: string;
  category: string;
  amount: number;
  currency: string;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
  guardian: string;
  phone: string;
}

const mockFeeRecords: FeeRecord[] = [
  {
    id: '1',
    playerName: 'John Ochieng',
    category: 'U15',
    amount: 5000,
    currency: 'KSh',
    dueDate: '2024-12-15',
    status: 'pending',
    guardian: 'Mary Ochieng',
    phone: '+254712345678'
  },
  {
    id: '2',
    playerName: 'Grace Wanjiku',
    category: 'U15',
    amount: 5000,
    currency: 'KSh',
    dueDate: '2024-12-10',
    paidDate: '2024-12-08',
    status: 'paid',
    paymentMethod: 'M-PESA',
    guardian: 'Peter Wanjiku',
    phone: '+254798765432'
  },
  {
    id: '3',
    playerName: 'Michael Kamau',
    category: 'U20',
    amount: 7500,
    currency: 'KSh',
    dueDate: '2024-12-01',
    status: 'overdue',
    guardian: 'Susan Kamau',
    phone: '+254711223344'
  }
];

export default function FeesPage() {
  const [feeRecords] = useState<FeeRecord[]>(mockFeeRecords);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'pending': return Clock;
      case 'overdue': return AlertTriangle;
      default: return Clock;
    }
  };

  const filteredRecords = feeRecords.filter(record => {
    if (selectedFilter === 'all') return true;
    return record.status === selectedFilter;
  });

  const totalPending = feeRecords
    .filter(r => r.status === 'pending' || r.status === 'overdue')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalPaid = feeRecords
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + r.amount, 0);

  const overdueCount = feeRecords.filter(r => r.status === 'overdue').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fees & Payments</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage academy fees and track payments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Send Reminders
          </button>
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">KSh {totalPending.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Collected</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">KSh {totalPaid.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{overdueCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Collection Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {Math.round((totalPaid / (totalPaid + totalPending)) * 100)}%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
        {['all', 'pending', 'overdue', 'paid'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as any)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
              selectedFilter === filter
                ? 'bg-green-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {filter} ({filter === 'all' ? feeRecords.length : feeRecords.filter(r => r.status === filter).length})
          </button>
        ))}
      </div>

      {/* Fee Records Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Guardian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRecords.map((record) => {
                const StatusIcon = getStatusIcon(record.status);
                return (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {record.playerName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {record.playerName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {record.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {record.currency} {record.amount.toLocaleString()}
                      </div>
                      {record.paymentMethod && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          via {record.paymentMethod}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(record.dueDate).toLocaleDateString()}
                      </div>
                      {record.paidDate && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Paid: {new Date(record.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="h-4 w-4 mr-2" />
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{record.guardian}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{record.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {record.status !== 'paid' && (
                        <button
                          onClick={() => {
                            setSelectedRecord(record);
                            setShowPaymentModal(true);
                          }}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Record Payment
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        Send Reminder
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {selectedRecord ? 'Record Payment' : 'New Payment Record'}
            </h3>
            
            <form className="space-y-4">
              {!selectedRecord && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Player
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select player</option>
                    {feeRecords.map(record => (
                      <option key={record.id} value={record.id}>{record.playerName}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedRecord?.amount}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Currency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="KSh">KSh</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="M-PESA">M-PESA</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reference Number (Optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Transaction reference"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedRecord(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}