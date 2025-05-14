import React from 'react';
import { Home, Mail, BarChart2, User, Compass, Moon, Sun } from 'lucide-react'; // Added Moon and Sun icons

interface SidebarProps {
  activeItem: string;
  setActiveItem: (name: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Sidebar({ activeItem, setActiveItem, darkMode, toggleDarkMode }: SidebarProps) {
  // No longer need local state for darkMode since it's passed as a prop
  
  const navItems = [
    { name: 'My Tasks', icon: Home },
    { name: 'Profile', icon: Compass },
    { name: 'Bounty', icon: BarChart2 },
    { name: 'Inbox', icon: Mail },
    { name: 'Team', icon: User },
  ];

  return (
    <aside className="w-16 md:w-20 bg-black text-gray-400 flex flex-col items-center py-4 space-y-6 border-r border-gray-700">
      {/* Logo Placeholder */}
      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-md mb-6"></div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={`p-2 rounded-lg hover:bg-gray-800 hover:text-white ${
              activeItem === item.name ? 'bg-gray-800 text-white' : ''
            }`}
            title={item.name}
          >
            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        ))}
      </nav>

      {/* Bottom Section - Dark Mode Toggle instead of Profile Picture */}
      <div className="flex flex-col items-center space-y-4">
        <button 
          onClick={toggleDarkMode}
          className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-blue-300" />
          )}
        </button>
      </div>
    </aside>
  );
} 