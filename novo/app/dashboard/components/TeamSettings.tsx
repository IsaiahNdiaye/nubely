'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client'; // Import the actual client
import {
  Settings,
  Link2,
  ShieldCheck,
  CreditCard,
  DollarSign,
  Receipt,
  Users,
  Info,
  AlertTriangle,
  LogOut,
  Pencil,
  Flag,
  Check,
} from 'lucide-react';

// Define types for sidebar items
interface SettingsItem {
  name: string;
  icon: React.ElementType;
  active?: boolean;
}

// Settings sidebar items configuration
const settingsNavItems: SettingsItem[] = [
  { name: 'General', icon: Settings, active: true },
  { name: 'Connected accounts', icon: Link2 },
  { name: 'Security & Privacy', icon: ShieldCheck },
  { name: 'Payment methods', icon: CreditCard },
  { name: 'Balance', icon: DollarSign },
  { name: 'Billing history', icon: Receipt },
  { name: 'Memberships', icon: Users },
  { name: 'Resolution center', icon: Info },
  { name: 'Danger zone', icon: AlertTriangle },
];

// Input Field Component
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  isEditable?: boolean;
  isTextArea?: boolean;
  children?: React.ReactNode; // For elements like the flag
  darkMode?: boolean; // Add darkMode prop
}

function InputField({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  isEditable = true, 
  isTextArea = false, 
  children,
  darkMode = true // Default to dark mode
}: InputFieldProps) {
  // Define styles based on dark/light mode
  const inputBg = darkMode ? 'bg-gray-900' : 'bg-white';
  const inputBorder = darkMode ? 'border-gray-700' : 'border-gray-300';
  const inputText = darkMode ? 'text-white' : 'text-gray-900';
  const labelText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const placeholderText = darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400';
  
  const commonClasses = `w-full p-3 ${inputBg} border ${inputBorder} rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${inputText} ${placeholderText}`;
  const displayClasses = `w-full p-3 ${inputBg} border ${inputBorder} rounded-md ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`;

  return (
    <div className="mb-6">
      <label htmlFor={name} className={`block text-sm font-medium ${labelText} mb-1`}>
        {label}
      </label>
      <div className="relative flex items-center">
        {isEditable ? (
          isTextArea ? (
            <textarea
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              rows={3}
              className={`${commonClasses}`}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`${commonClasses}`}
            />
          )
        ) : (
          <div className={displayClasses}>
            {children} {/* Render flag or other non-input content */}
            <span className={`${children ? 'ml-2' : ''}`}>{value || placeholder}</span>
          </div>
        )}
        {!isEditable && (label === 'Email' || label === 'Phone number') && (
           <button className={`absolute right-3 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
             <Pencil size={16} />
           </button>
        )}
      </div>
    </div>
  );
}

// Initial empty state for the form
const initialFormData = {
  name: '',       // Corresponds to display_name
  bio: '',
  username: '',
  email: '',      // From auth.users
  phone: '',      // From auth.users
};

interface TeamSettingsProps {
  darkMode?: boolean; // Optional prop with default value
}

export default function TeamSettings({ darkMode = true }: TeamSettingsProps) {
  const supabase = createClient(); // Instantiate the actual client
  const [activeSetting, setActiveSetting] = useState('General');
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false); // Saving state

  // Define theme colors based on mode
  const themeColors = {
    bg: darkMode ? 'bg-black' : 'bg-gray-100',
    text: darkMode ? 'text-white' : 'text-gray-900',
    secondaryText: darkMode ? 'text-gray-400' : 'text-gray-600',
    border: darkMode ? 'border-gray-700' : 'border-gray-300',
    inputBg: darkMode ? 'bg-gray-900' : 'bg-white',
    inputBorder: darkMode ? 'border-gray-700' : 'border-gray-300',
  };

  // Fetch user and profile data
  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("User not found");

      setUserId(user.id);

      // 2. Get profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('display_name, username, bio')
        .eq('id', user.id)
        // .single(); // Use .single() if you expect exactly one row

      if (profileError) {
         // Handle cases where profile might not exist yet, if needed
         console.error("Profile fetch error:", profileError.message);
         // Depending on your setup, you might want to allow creation here
         // or assume profile exists.
      }
      
      // Use .single() result or handle array if not using .single()
      const profile = Array.isArray(profileData) ? profileData[0] : profileData;

      // 3. Set form data
      setFormData({
        name: profile?.display_name || '',
        bio: profile?.bio || '',
        username: profile?.username || '',
        email: user.email || '', // Email from auth user
        phone: user.phone || '', // Phone from auth user
      });

    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError(err.message || "Failed to load user data.");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies needed if supabase client is stable

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save updated profile data
  const handleSave = async () => {
    if (!userId) {
      setError("User ID not found. Cannot save.");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: formData.name,
          username: formData.username,
          bio: formData.bio,
          // updated_at is handled by the trigger in schema.sql
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Optional: Show success message (e.g., using a toast library)
      alert("Profile updated successfully!"); 
      // Re-fetch data to ensure UI consistency if needed, though state is updated
      // await fetchUserData(); 

    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className={`flex-1 flex items-center justify-center ${themeColors.text}`}>Loading account settings...</div>;
  }

  if (error && !loading) { // Show error only if not loading
     return <div className="flex-1 flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className={`flex flex-col flex-1 ${themeColors.bg} ${themeColors.secondaryText}`}>
      {/* Header */}
      <header className={`px-8 py-4 border-b ${themeColors.border}`}>
         <h1 className={`text-xl font-semibold ${themeColors.text}`}>Account settings</h1>
      </header>

      {/* Main Content Area (Sidebar + Form) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Settings Sidebar */}
        <aside className={`w-64 ${themeColors.bg} p-4 flex flex-col border-r ${themeColors.border} overflow-y-auto`}>
          {/* Profile Preview */}
          <div className="flex flex-col items-center mb-6 flex-shrink-0">
            <div className="w-20 h-20 bg-orange-500 rounded-full mb-3 flex items-center justify-center text-4xl">
              🐷
            </div>
            <h2 className={themeColors.text}>{formData.name || 'User Name'}</h2>
            <p className={themeColors.secondaryText}>@{formData.username || 'username'}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 mb-6">
            {settingsNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSetting(item.name)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                  activeSetting === item.name
                    ? darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                    : `${themeColors.secondaryText} hover:${darkMode ? 'bg-gray-800 hover:text-white' : 'bg-gray-200 hover:text-gray-900'}`
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto flex-shrink-0">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Settings Form Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Render content based on activeSetting */}
          {activeSetting === 'General' && (
            <div>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  darkMode={darkMode}
                />
                <InputField
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  isTextArea={true}
                  placeholder="Tell us about yourself"
                  darkMode={darkMode}
                />
                <InputField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  darkMode={darkMode}
                />
                <InputField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={() => {}}
                  isEditable={false}
                  placeholder="No email set"
                  darkMode={darkMode}
                />
                <InputField
                  label="Phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={() => {}}
                  placeholder="No phone number set"
                  isEditable={false}
                  darkMode={darkMode}
                >
                   <span role="img" aria-label="US Flag">🇺🇸</span>
                </InputField>

                <div className={`mt-8 pt-6 border-t ${themeColors.border} flex justify-end`}>
                  <button
                    type="submit"
                    className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-4 text-right">Error: {error}</p>}
              </form>
            </div>
          )}

          {/* Add conditional rendering for other settings sections */}
           {activeSetting !== 'General' && (
              <div className={themeColors.text}>
                   <h1 className={`text-2xl font-semibold ${themeColors.text} mb-6`}>{activeSetting}</h1>
                   <p>Content for {activeSetting} section.</p>
              </div>
           )}
        </main>
      </div>
    </div>
  );
} 