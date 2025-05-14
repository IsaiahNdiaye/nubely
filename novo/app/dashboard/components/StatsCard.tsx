import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react'; // Import icons for Loss/Gain

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  changeType: 'Loss' | 'Gain' | 'Label';
}

export default function StatsCard({ icon: Icon, title, value, changeType }: StatsCardProps) {
  const isLoss = changeType === 'Loss';
  const isGain = changeType === 'Gain';
  const isLabel = changeType === 'Label';

  const changeBgColor = isLoss ? 'bg-red-500/20' : isGain ? 'bg-green-500/20' : 'bg-green-500/20';
  const changeTextColor = isLoss ? 'text-red-400' : isGain ? 'text-green-400' : 'text-green-400';
  const changeIcon = isLoss ? <ArrowDown size={14} /> : <ArrowUp size={14} />;
  const changeText = isLabel ? 'Label' : changeType;

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-start space-x-4">
      <div className="bg-blue-600/20 p-2 rounded-lg">
        <Icon size={24} className="text-blue-500" />
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-white">{value}</p>
          {(isLoss || isGain || isLabel) && (
            <div
              className={`flex items-center space-x-1 text-xs font-medium px-2 py-0.5 rounded-full ${changeBgColor} ${changeTextColor}`}
            >
              {!isLabel && changeIcon}
              <span>{changeText}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 