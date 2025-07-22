import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}