'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BarChart3, 
  ClipboardList, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  Settings, 
  Bell, 
  User, 
  LogOut, 
  Sun, 
  Moon, 
  Menu, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  ChevronDown,
  X
} from 'lucide-react';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hr-theme') === 'dark' || false;
    }
    return false;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('hr-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('hr-theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  // Navigation handlers for profile dropdown
  const handleProfileNavigation = () => {
    navigate('/hprofile');
    setIsProfileOpen(false);
  };

  const handleSettingsNavigation = () => {
    navigate('/hsettings');
    setIsProfileOpen(false);
  };

  const handleLogoutNavigation = () => {
    navigate('/');
    setIsProfileOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/hrdashboard' },
    { name: 'Roles Management', icon: Users, path: '/rolemanagement' },
    { name: 'Applications', icon: BarChart3, path: '/applications' },
    { name: 'Employee Analytics', icon: ClipboardList, path: '/employeeanalytics' },
  ];

  const notifications = [
    { id: 1, title: 'New skill gap identified', message: '5 employees in Engineering need React training', time: '10 min ago', unread: true },
    { id: 2, title: 'Training program completed', message: 'Advanced JavaScript course completed by 12 employees', time: '1 hour ago', unread: true },
    { id: 3, title: 'Monthly report ready', message: 'Q4 skill development report is available', time: '2 hours ago', unread: false },
  ];

  const sidebarVariants = {
    open: { width: 256 },
    closed: { width: 80 }
  };

  const navItemHover = {
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  const dropdownFade = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  const toggleThemeTransition = {
    rotate: 360,
    transition: { duration: 0.3 }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'dark bg-slate-900' : 'bg-gray-50'
      }`}>
        {/* Mobile Header */}
        <motion.header 
          className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 shadow-lg border-b border-gray-200 dark:border-slate-700"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center justify-between p-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
            
            <motion.h1 
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              WorkSkill HR
            </motion.h1>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              <motion.div
                animate={isDarkMode ? toggleThemeTransition : {}}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </motion.header>

        <div className="flex pt-16 lg:pt-0">
          {/* Sidebar */}
          <motion.aside
            className="fixed lg:static h-screen z-40 bg-white dark:bg-slate-900 shadow-xl border-r border-gray-200 dark:border-slate-700 overflow-hidden"
            variants={sidebarVariants}
            initial="open"
            animate={isSidebarOpen ? "open" : "closed"}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ position: 'fixed', height: '100vh' }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Logo */}
              <motion.div 
                className="flex items-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase size={24} className="text-white" />
                </motion.div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent"
                    >
                      WorkSkill HR
                    </motion.h1>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Navigation */}
              <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = false; // Would be determined by useLocation in real app
                  
                  return (
                    <motion.a
                      key={item.name}
                      href={item.path}
                      variants={navItemHover}
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center p-3 rounded-xl transition-all duration-200 relative group ${
                        isActive 
                          ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-lg' 
                          : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex-shrink-0"
                      >
                        <Icon size={20} />
                      </motion.div>
                      <AnimatePresence>
                        {isSidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="ml-3 font-medium whitespace-nowrap"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      
                      {isActive && (
                        <motion.div 
                          className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Sidebar Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                <ChevronLeft className={`transition-transform duration-300 ${!isSidebarOpen && 'rotate-180'}`} size={20} />
              </motion.button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className={`flex-1 min-h-screen transition-all duration-300 ${
            isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
          }`}>
            {/* Top Navbar */}
            <motion.nav 
              className="flex items-center justify-between p-6 sticky top-0 z-40 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-slate-700"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 lg:hidden"
                  aria-label="Toggle sidebar"
                >
                  <Menu size={20} />
                </motion.button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HR Dashboard</h1>
              </div>
              
              <div className="flex-1 max-w-md mx-8">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text"
                    placeholder="Search employees, skills, programs..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
                  />
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300"
                  aria-label="Toggle theme"
                >
                  <motion.div
                    animate={isDarkMode ? toggleThemeTransition : {}}
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </motion.button>

                {/* Notifications */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300 relative"
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                    <motion.span 
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <motion.div
                        variants={dropdownFade}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl backdrop-blur-md bg-white/95 dark:bg-slate-800/95 border border-gray-200 dark:border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                          <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              whileHover={{ backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(0, 0, 0, 0.05)' }}
                              className="p-4 border-b border-gray-100 dark:border-slate-700 cursor-pointer"
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-indigo-500' : 'bg-gray-400'}`} />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 dark:text-white">{notification.title}</p>
                                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{notification.message}</p>
                                  <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">{notification.time}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300"
                  >
                    <motion.div 
                      className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      HR
                    </motion.div>
                    <div className="text-left hidden lg:block">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        Hi, Sarah
                      </p>
                      <p className="text-xs text-gray-600 dark:text-slate-400">
                        HR Manager
                      </p>
                    </div>
                    <ChevronDown size={16} className="text-gray-600 dark:text-slate-400" />
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        variants={dropdownFade}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl backdrop-blur-md bg-white/95 dark:bg-slate-800/95 border border-gray-200 dark:border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                          <p className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</p>
                          <p className="text-sm text-gray-600 dark:text-slate-400">sarah@workskill.ai</p>
                        </div>
                        <div className="p-2">
                          {/* Profile Button */}
                          <motion.button 
                            whileHover={{ x: 5, backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(0, 0, 0, 0.05)' }}
                            className="w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-gray-700 dark:text-slate-300"
                            onClick={handleProfileNavigation}
                          >
                            <User size={18} />
                            <span>Profile</span>
                          </motion.button>

                          {/* Settings Button */}
                          <motion.button 
                            whileHover={{ x: 5, backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(0, 0, 0, 0.05)' }}
                            className="w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-gray-700 dark:text-slate-300"
                            onClick={handleSettingsNavigation}
                          >
                            <Settings size={18} />
                            <span>Settings</span>
                          </motion.button>

                          {/* Logout Button */}
                          <motion.button 
                            whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                            className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-500 transition-all duration-200"
                            onClick={handleLogoutNavigation}
                          >
                            <LogOut size={18} />
                            <span>Logout</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.nav>

            {/* Page Content */}
            <div className="p-6 overflow-y-auto">
              <div className="max-w-[1200px] mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}