import React from 'react';

export default function LookscoutCard() {
  // Placeholder data for avatars
  const avatars = Array(5).fill(null);

  return (
    <div className="bg-gray-800 rounded-lg p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Lookscout</h3>
      <p className="text-sm text-gray-400 mb-4">
        We make you create, not to be worried about technical stuff.
      </p>
      <div className="flex items-center space-x-[-8px] mb-5"> {/* Negative margin for overlap */}
        {avatars.map((_, index) => (
          <div
            key={index}
            className="w-8 h-8 bg-gray-600 rounded-full border-2 border-gray-800"
            style={{ zIndex: avatars.length - index }} // Stacking order
          >
            {/* Placeholder - can replace with actual image component later */}
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-blue-500">
        View all
      </button>
    </div>
  );
} 