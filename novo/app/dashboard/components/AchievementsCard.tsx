import React from 'react';
import { MoreHorizontal, ChevronRight, Globe, Zap, Clock } from 'lucide-react'; // Import necessary icons

// Placeholder component for Progress Circle (can be replaced with a library or custom SVG)
const ProgressCircle = ({ percentage }: { percentage: number }) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full" viewBox="0 0 36 36">
      <path
        className="text-gray-700"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        className="text-blue-500"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={`${percentage}, 100`}
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <p className="text-xs text-gray-400">My Stats</p>
      <p className="text-2xl font-semibold text-white">{percentage}%</p>
    </div>
  </div>
);

export default function AchievementsCard() {
  const achievements = [
    { name: 'Global Stars', description: 'A brief feature description', icon: Globe, iconBg: 'bg-red-500/20', iconColor: 'text-red-500' },
    { name: 'Focus Keeper', description: 'A brief feature description', icon: Zap, iconBg: 'bg-green-500/20', iconColor: 'text-green-500' },
    { name: 'High Tower', description: 'A brief feature description', icon: Clock, iconBg: 'bg-yellow-500/20', iconColor: 'text-yellow-500' },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Achievements</h3>
          <p className="text-sm text-gray-400">Design System Settings</p>
        </div>
        <button className="text-gray-400 hover:text-white p-1">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center my-6">
        <ProgressCircle percentage={65} />
      </div>

      {/* Achievement List */}
      <ul className="space-y-3">
        {achievements.map((item) => (
          <li key={item.name} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer">
            <div className={`p-2 rounded-lg ${item.iconBg}`}>
              <item.icon size={20} className={item.iconColor} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </li>
        ))}
      </ul>
    </div>
  );
} 