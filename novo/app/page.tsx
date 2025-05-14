import React from 'react';
import Link from 'next/link';

// Placeholder Logo Component
const Logo = () => <span className="text-2xl font-['PSL_Ornanong_Pro'] font-bold text-white">novo</span>;

// Header Component
const Header = () => {
  return (
    <header className="w-full text-gray-300 p-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <Logo />
        {/* Navigation removed */}
        {/* <nav className="hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:text-white">Discover</a>
          <a href="#" className="hover:text-white">Sounds</a>
          <a href="#" className="hover:text-white">Pricing</a>
        </nav> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Input Removed */}
        {/* <div className="hidden sm:block relative">
           <input
            type="text"
            placeholder="Try 'guitar' or 'trap'"
            className="bg-gray-800/50 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600 w-64 placeholder-gray-500"
          />
          <svg className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div> */}

        {/* Plugin Tag Removed */}
        {/* <div className="hidden lg:flex items-center gap-2 text-sm">
            <span>Plugin</span>
            <span className="bg-yellow-400/20 text-yellow-300 text-xs font-semibold px-2 py-0.5 rounded border border-yellow-400/30">
             BETA
            </span>
        </div> */}

        {/* Auth Button Removed */}
        {/* <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2 px-4 rounded-lg flex items-center gap-1.5 whitespace-nowrap">
          Sign in / Create account <span aria-hidden="true">&rarr;</span>
        </button> */}

        {/* Login Button */}
        <Link href="/auth/login">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2 px-4 rounded-full flex items-center gap-1.5 whitespace-nowrap">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-24 pb-32 md:pt-32 md:pb-40 px-4 relative overflow-hidden">
       {/* Subtle background gradient/glow - optional enhancement */}
       <div className="absolute inset-0 -z-10 opacity-10" style={{
           backgroundImage: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2), transparent 60%)',
       }}></div>

       {/* NEW Plugin Banner Removed */}
       {/* <div className="mb-6 inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-3 py-1 text-sm shadow-sm">
         <span className="bg-yellow-400 text-black font-bold px-2 py-0.5 rounded-md text-xs uppercase tracking-wider">NEW</span>
         <span className="text-gray-300">The WAVS Plugin is here</span>
         <span className="text-gray-600">|</span>
         <a href="#" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium">
           Try it now <span aria-hidden="true">&rarr;</span>
         </a>
       </div> */}

       {/* Headline */}
       <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-gray-100">
       Make money<br />through music
       </h1>

       {/* Sub-headline */}
       <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl">
         Musicians get heard. Promoters get paid.
       </p>

       {/* Buttons */}
       <div className="flex flex-col sm:flex-row gap-4">
         <Link href="/waitlist">
           <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2 text-lg transition-colors duration-200">
             Join Our Waitlist <span aria-hidden="true">&rarr;</span>
           </button>
         </Link>
         {/* Explore WAVS Button Removed */}
         {/* <button className="bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700 text-gray-300 hover:text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200">
           Explore WAVS
         </button> */}
       </div>
    </section>
  );
};


// Main Page Component
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/Video/2022395-hd_1920_1080_30fps.mp4"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content (needs higher z-index) */}
      <div className="relative z-20">
        <Header />
        <main>
          <HeroSection />
          {/* You can add more sections here if needed */}
        </main>
        {/* Footer placeholder */}
        <footer className="w-full text-center text-gray-400 text-xs py-8 space-x-4">
          <span>© 2024 Novo</span>
          <span>English</span>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </footer>
      </div>
    </div>
  );
}
