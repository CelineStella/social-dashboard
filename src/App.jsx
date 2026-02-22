import React, { useState } from 'react';

/**
 * PILLAR 1: THE COMPONENT (The Blueprint)
 * This function creates ONE card. We "pass" data into it using 'props'.
 * isDark: tells the card if it should look dark or light.
 */
const StatCard = ({ platform, followers, change, trend, color, isDark }) => {
  return (
    // We use "Template Literals" (the ` ` backticks) to change CSS classes based on isDark
    <div className={`
      p-6 rounded-2xl border transition-all duration-300 shadow-xl
      ${isDark 
        ? 'bg-slate-800 border-slate-700 hover:border-blue-500' 
        : 'bg-white border-slate-200 hover:border-blue-400'}
    `}>
      <div className="flex justify-between items-center mb-4">
        {/* Platform Name */}
        <span className={`font-bold uppercase tracking-widest text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {platform}
        </span>
        {/* The glowing status dot */}
        <div className={`w-3 h-3 rounded-full ${color} shadow-[0_0_10px_currentColor]`}></div>
      </div>

      {/* Follower Count */}
      <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {followers}
      </h2>

      {/* Growth Indicator */}
      <div className="flex items-center mt-4">
        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
          trend === 'up' 
            ? 'bg-green-500/10 text-green-400' 
            : 'bg-red-500/10 text-red-400'
        }`}>
          {trend === 'up' ? '↑' : '↓'} {change}%
        </span>
        <span className="text-slate-500 text-xs ml-3 font-medium">Vs last month</span>
      </div>
    </div>
  );
};

function App() {
  /**
   * PILLAR 2: THE STATE (The Memory)
   * These variables tell React what to remember.
   */
  const [searchTerm, setSearchTerm] = useState(""); // Remembers what you type in search
  const [darkMode, setDarkMode] = useState(true);   // Remembers if you are in Dark or Light mode

  /**
   * PILLAR 3: THE DATA (The Source)
   * Usually, this comes from an API, but we "mock" it here.
   */
  const allStats = [
    { platform: "Instagram", followers: "5,462", change: "12", trend: "up", color: "text-pink-500" },
    { platform: "Twitter / X", followers: "11,201", change: "4", trend: "down", color: "text-sky-400" },
    { platform: "YouTube", followers: "8,239", change: "22", trend: "up", color: "text-red-600" },
    { platform: "LinkedIn", followers: "1,105", change: "8", trend: "up", color: "text-blue-600" },
  ];

  /**
   * THE LOGIC: Filtering
   * This creates a new list containing ONLY items that match the search box.
   */
  const filteredStats = allStats.filter(item => 
    item.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // The main wrapper uses darkMode to decide the background color
    <div className={`min-h-screen transition-colors duration-500 p-8 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* HEADER SECTION */}
      <header className="mb-12 max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className={`text-5xl font-black italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            SocialPulse
          </h1>
          
          {/* Theme Toggle Button */}
          <div className="mt-4 flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)} // This "flips" the true/false switch
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 ${
                darkMode ? 'bg-white text-black' : 'bg-slate-900 text-white'
              }`}
            >
              {darkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
            </button>
          </div>
        </div>

        {/* SEARCH BOX */}
        <div className="w-full md:w-80">
          <label className={`block text-xs font-bold uppercase mb-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Search Platforms
          </label>
          <input 
            type="text" 
            placeholder="Type to filter..."
            className={`w-full p-4 rounded-2xl border outline-none transition-all ${
              darkMode 
                ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' 
                : 'bg-white border-slate-200 text-slate-900 focus:border-blue-400'
            }`}
            onChange={(e) => setSearchTerm(e.target.value)} // Updates the searchTerm "Memory"
          />
        </div>
      </header>

      {/* THE GRID: Where the cards are displayed */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* We map (loop) through the filtered list and create a card for each */}
        {filteredStats.map((stat, index) => (
          <StatCard 
            key={index}      // React needs a unique key for list items
            {...stat}        // This passes all data (platform, followers, etc.) at once
            isDark={darkMode} // Tells the card which theme to use
          />
        ))}
      </main>

      {/* EMPTY STATE: Shows if you search for something that doesn't exist */}
      {filteredStats.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-slate-500 text-xl font-medium italic">
            No platforms found for "{searchTerm}"
          </p>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-20 text-center border-t border-slate-200/10 pt-8">
        <p className="text-slate-500 text-sm font-mono">
          PROJECT_01 // REACT_TAILWIND_V4 // DEVELOPER: CELINE_CHIGWENDE
        </p>
      </footer>
    </div>
  );
}

export default App;