import React from 'react';
import Link from 'next/link';
import WaitlistForm from '../components/WaitlistForm';
import CountdownTimer from '../components/CountdownTimer';
import ThemeToggle from '../components/ThemeToggle';
import { DollarSign, Zap, Music2 } from 'lucide-react'; // Updated icons, Zap replaces TrendingUp

// Logo Component - Simple text or icon logo
const Logo = () => (
  <Link href="/">
    <span className="font-bold text-xl text-foreground">nobely</span>
  </Link>
);

// Simple Header with just the logo
const Header = () => {
  return (
    <header className="absolute top-6 left-6 z-50">
      <Logo />
    </header>
  );
};

// Hero Section Component with Waitlist
const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-36 pb-16 md:pt-48 md:pb-24 px-4 relative overflow-hidden">
       {/* Headline */}
       <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
         Early Access to<br />Creator Rewards
       </h1>

       {/* Sub-headline */}
       <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-lg">
        Start earning from your posts. Unlock exclusive early access to the platform connecting artists and influencers!
       </p>

       {/* Waitlist Form */}
       <div className="w-full max-w-md mx-auto">
         <WaitlistForm />
       </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
      { 
        icon: DollarSign, 
        title: 'Earn Directly with Music', 
        description: 'Get paid for using trending sounds in your TikToks, no Creator Fund needed.' 
      },
      { 
        icon: Zap,
        title: 'Instant Monetization', 
        description: 'Start earning immediately. No audience needed to begin making money.' 
      },
      { 
        icon: Music2,
        title: 'Unlimited Sound Access', 
        description: 'Access our vast library of tracks and get rewarded every time you use them, worry-free.' 
      }
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="relative flex flex-col items-center text-center pt-12"
            >
              {/* Icon Circle Above Card */}
              <div className="absolute -top-6 bg-primary text-primary-foreground p-3 rounded-full shadow-lg border-4 border-background">
                 <feature.icon size={24} />
              </div>
              {/* Card Content */}
              <div className="w-full bg-card dark:bg-[#181818] text-card-foreground p-8 rounded-xl shadow-md border min-h-[160px]">
                 <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Countdown Section
const CountdownSection = () => {
  const targetDate = "2025-06-16T00:00:00"; // Monday, June 16th, 2025

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          Beta Access Opens On
        </h2>
        <p className="text-muted-foreground mb-8 md:text-lg">
          Monday, June 16th. Be the first to experience Nobely!
        </p>
        <CountdownTimer targetDate={targetDate} />
      </div>
    </section>
  );
};

// Main Page Component
export default function WaitlistPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Simple Background Grid - Adjusted for theme */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-background 
        bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] 
        bg-[size:6rem_4rem]">
      </div>
      {/* Optional: Gradient overlay if needed, ensure it uses theme variables or is removed if grid is enough */}
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background"></div> */}
      
      <Header />
      <ThemeToggle />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CountdownSection />
      </main>
      
      {/* Minimal Footer */}
      <footer className="w-full text-center text-muted-foreground text-xs py-8 mt-12">
        © {new Date().getFullYear()} Nobely AI. All rights reserved.
      </footer>
    </div>
  );
} 