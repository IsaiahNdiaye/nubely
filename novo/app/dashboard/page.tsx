'use client'; // Add use client directive for state management

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { Rocket } from 'lucide-react'; // Import Rocket icon
import TeamSettings from './components/TeamSettings'; // Import TeamSettings

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState('Profile'); // Default to Profile
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to document when the component mounts
  useEffect(() => {
    // Update body class based on dark mode state
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Define theme colors based on mode
  const themeColors = {
    bg: darkMode ? 'bg-black' : 'bg-gray-100',
    text: darkMode ? 'text-white' : 'text-gray-900',
    secondaryText: darkMode ? 'text-gray-400' : 'text-gray-600',
    border: darkMode ? 'border-gray-700' : 'border-gray-300',
  };

  return (
    <div className={`flex min-h-screen w-full ${themeColors.bg} ${themeColors.text}`}>
      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col ${themeColors.bg}`}>
        {/* Conditionally render content based on activeItem */}
        {activeItem === 'Bounty' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg flex items-center space-x-2">
              <Rocket size={20} />
              <span>Start Marketing</span>
            </button>
          </div>
        )}

        {activeItem === 'Profile' && (
          <div className="p-6">
            <h1 className={`text-2xl font-semibold mb-4 ${themeColors.text}`}>Profile</h1>
            <p className={themeColors.secondaryText}>Profile content goes here...</p>
          </div>
        )}

        {activeItem === 'Team' && (
           <TeamSettings darkMode={darkMode} /> 
        )}

        {/* Add other conditional sections for My Tasks, Inbox, Team etc. */}
        { !['Bounty', 'Profile', 'Team'].includes(activeItem) && (
           <div className="flex-1 flex items-center justify-center p-6">
             <p className={themeColors.secondaryText}>Content for {activeItem}</p>
           </div>
        )}
      </main>
    </div>
  );
} 