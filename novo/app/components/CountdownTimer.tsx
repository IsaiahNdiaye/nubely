'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return null; 
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  if (timeLeft) {
    Object.keys(timeLeft).forEach((interval) => {
      if (timeLeft[interval as keyof TimeLeft] === undefined) {
        return;
      }
      timerComponents.push(
        <div key={interval} className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-200/60 min-w-[70px] md:min-w-[90px]">
          <div className="text-2xl md:text-3xl font-semibold text-gray-800">
            {timeLeft[interval as keyof TimeLeft]}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">
            {interval}
          </div>
        </div>
      );
    });
  } else {
    return <div className="text-xl text-center text-gray-700 py-4">Beta access is here!</div>;
  }

  return (
    <div className="flex justify-center space-x-2 md:space-x-4">
      {timerComponents.length ? timerComponents : <span>Loading timer...</span>}
    </div>
  );
};

export default CountdownTimer; 