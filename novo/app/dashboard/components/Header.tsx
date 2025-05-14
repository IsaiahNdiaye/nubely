import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function Header() {
  const tabs = ['My Tasks', 'Profile', 'Stats', 'Inbox', 'Team', 'Notifications', 'Settings'];
  const activeTab = 'Profile'; // As seen in the image

  return (
    <header className="bg-gray-900 text-white p-6 md:px-8 lg:px-10 border-b border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Hey there, Brian Ford!</h1>
          <p className="text-gray-400">Welcome back, we're happy to have you here!</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600">
            Edit section
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-500">
            Add item
          </button>
          <button className="text-gray-400 hover:text-white p-1">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex space-x-6 border-b border-gray-700 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-3 px-1 border-b-2 text-sm font-medium
              ${
                activeTab === tab
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              }
            `}
          >
            {tab}
            {tab === 'Notifications' && (
              <span className="ml-1.5 bg-gray-700 text-gray-300 text-xs font-bold px-1.5 py-0.5 rounded-full">
                9
              </span>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
} 