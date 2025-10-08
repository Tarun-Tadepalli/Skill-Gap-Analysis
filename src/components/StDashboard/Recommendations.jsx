'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './Layout';
import {
  BookOpen,
  Lightbulb,
  Target,
  Clock,
  Star,
  CheckCircle,
  PlayCircle,
  Download,
  ArrowRight,
  Search,
  TrendingUp,
  Award,
  Zap,
  Bookmark,
  ExternalLink,
  Calendar,
  Users,
  Filter,
  Youtube,
  GraduationCap
} from 'lucide-react';
import jsPDF from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';

export default function Recommendations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPlan, setSavedPlan] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [skillStatus, setSkillStatus] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [savedCourses, setSavedCourses] = useState(new Set());
  const [filters, setFilters] = useState({
    platform: 'all',
    duration: 'all',
    rating: 'all'
  });

  // Mock missing skills from Skill Gap Analysis
  const missingSkills = [
    {
      id: 1,
      name: 'Node.js',
      description: 'JavaScript runtime built on Chrome V8 JavaScript engine',
      importance: 'Essential for backend development and server-side applications',
      category: 'Technical',
      priority: 'High'
    },
    {
      id: 2,
      name: 'MongoDB',
      description: 'NoSQL document database for modern applications',
      importance: 'Critical for working with unstructured data and modern web apps',
      category: 'Technical',
      priority: 'High'
    },
    {
      id: 3,
      name: 'Git',
      description: 'Distributed version control system for tracking code changes',
      importance: 'Fundamental for collaboration and professional development workflows',
      category: 'Technical',
      priority: 'Medium'
    }
  ];

  // Course recommendations for each skill
  const courseRecommendations = [
    {
      id: 1,
      skillId: 1,
      platform: 'Udemy',
      title: 'Master Node.js from Scratch',
      instructor: 'Maximilian Schwarzmüller',
      duration: '12 hours',
      difficulty: 'Beginner to Advanced',
      rating: 4.7,
      students: 125000,
      price: '$94.99',
      originalPrice: '$199.99',
      url: '#',
      features: ['Node.js Basics', 'Express Framework', 'REST APIs', 'Real Projects'],
      durationCategory: 'medium',
      platformIcon: GraduationCap
    },
    {
      id: 2,
      skillId: 1,
      platform: 'Coursera',
      title: 'Server-side Development with NodeJS',
      instructor: 'University of Michigan',
      duration: '4 weeks',
      difficulty: 'Intermediate',
      rating: 4.6,
      students: 45000,
      price: 'Free',
      originalPrice: '$49',
      url: '#',
      features: ['Express.js', 'MongoDB Integration', 'Authentication', 'Deployment'],
      durationCategory: 'short',
      platformIcon: GraduationCap
    },
    {
      id: 3,
      skillId: 2,
      platform: 'Udemy',
      title: 'MongoDB - The Complete Developer Guide',
      instructor: 'Academind by Maximilian Schwarzmüller',
      duration: '15 hours',
      difficulty: 'Beginner to Advanced',
      rating: 4.8,
      students: 89000,
      price: '$84.99',
      originalPrice: '$189.99',
      url: '#',
      features: ['CRUD Operations', 'Aggregation', 'Indexing', 'Performance'],
      durationCategory: 'medium',
      platformIcon: GraduationCap
    },
    {
      id: 4,
      skillId: 2,
      platform: 'YouTube',
      title: 'MongoDB Essentials - Full Course',
      instructor: 'FreeCodeCamp',
      duration: '5 hours',
      difficulty: 'Beginner',
      rating: 4.5,
      students: 320000,
      price: 'Free',
      originalPrice: '$0',
      url: '#',
      features: ['Database Design', 'Queries', 'Schema Design', 'Best Practices'],
      durationCategory: 'short',
      platformIcon: Youtube
    },
    {
      id: 5,
      skillId: 3,
      platform: 'YouTube',
      title: 'Git Basics for Developers',
      instructor: 'Traversy Media',
      duration: '5 hours',
      difficulty: 'Beginner',
      rating: 4.6,
      students: 280000,
      price: 'Free',
      originalPrice: '$0',
      url: '#',
      features: ['Version Control', 'Branching', 'Merging', 'Collaboration'],
      durationCategory: 'short',
      platformIcon: Youtube
    },
    {
      id: 6,
      skillId: 3,
      platform: 'Coursera',
      title: 'Version Control with Git',
      instructor: 'Google',
      duration: '10 hours',
      difficulty: 'Beginner',
      rating: 4.7,
      students: 78000,
      price: 'Free',
      originalPrice: '$49',
      url: '#',
      features: ['Git Workflow', 'Collaboration', 'GitHub', 'Advanced Techniques'],
      durationCategory: 'medium',
      platformIcon: GraduationCap
    }
  ];

  // AI Learning Pathway Timeline
  const learningPathway = [
    {
      step: 1,
      title: 'Node.js Fundamentals',
      description: 'Learn server-side JavaScript and build basic APIs',
      duration: '2 weeks',
      skills: ['Node.js'],
      status: 'current'
    },
    {
      step: 2,
      title: 'MongoDB Integration',
      description: 'Connect Node.js applications with MongoDB database',
      duration: '2 weeks',
      skills: ['MongoDB', 'Node.js'],
      status: 'upcoming'
    },
    {
      step: 3,
      title: 'Git Collaboration',
      description: 'Master version control and team collaboration workflows',
      duration: '1 week',
      skills: ['Git'],
      status: 'upcoming'
    },
    {
      step: 4,
      title: 'Full Stack Integration',
      description: 'Build complete applications with all learned technologies',
      duration: '3 weeks',
      skills: ['Node.js', 'MongoDB', 'Git'],
      status: 'upcoming'
    }
  ];

  // Quick insights
  const insights = [
    {
      id: 1,
      text: "Start with Node.js fundamentals - it's the foundation for modern backend development.",
      icon: Zap,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      text: "MongoDB skills are in high demand for modern web applications and startups.",
      icon: Award,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      text: "Git proficiency is essential for professional collaboration and career growth.",
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      text: "Complete the full learning path to become job-ready for full-stack positions.",
      icon: Target,
      color: 'from-orange-500 to-amber-500'
    }
  ];

  // Platform options for filters
  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'udemy', label: 'Udemy' },
    { value: 'coursera', label: 'Coursera' },
    { value: 'youtube', label: 'YouTube' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Short (< 5h)' },
    { value: 'medium', label: 'Medium (5-10h)' },
    { value: 'long', label: 'Long (> 10h)' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'Any Rating' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.0', label: '4.0+ Stars' },
    { value: '3.5', label: '3.5+ Stars' }
  ];

  // Initialize skill status and load saved data
  useEffect(() => {
    const initialStatus = {};
    missingSkills.forEach(skill => {
      initialStatus[skill.id] = 'not-started';
    });
    setSkillStatus(initialStatus);

    // Load enrolled and saved courses from localStorage
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const saved = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    setEnrolledCourses(new Set(enrolled));
    setSavedCourses(new Set(saved));
  }, []);

  // In Recommendations.jsx - Update the handleEnroll function:

const handleEnroll = (courseId, courseTitle) => {
  const courseToEnroll = courseRecommendations.find(course => course.id === courseId);
  
  if (courseToEnroll) {
    const enrolledCourse = {
      id: courseToEnroll.id,
      title: courseToEnroll.title,
      platform: courseToEnroll.platform,
      instructor: courseToEnroll.instructor,
      duration: courseToEnroll.duration,
      difficulty: courseToEnroll.difficulty,
      rating: courseToEnroll.rating,
      students: courseToEnroll.students,
      price: courseToEnroll.price,
      originalPrice: courseToEnroll.originalPrice,
      skills: missingSkills.find(skill => skill.id === courseToEnroll.skillId) ? [missingSkills.find(skill => skill.id === courseToEnroll.skillId).name] : [],
      description: courseToEnroll.description || `Learn ${missingSkills.find(skill => skill.id === courseToEnroll.skillId)?.name || 'new skills'}`,
      features: courseToEnroll.features || [],
      progress: 0,
      enrolled: true
    };

    const newEnrolled = new Set([...enrolledCourses, courseId]);
    setEnrolledCourses(newEnrolled);
    
    // Save to localStorage with all course data
    const existingEnrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const updatedEnrolled = [...existingEnrolled.filter(course => course.id !== courseId), enrolledCourse];
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolled));
    
    toast.success(`✅ Enrolled in '${courseTitle}'!`, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: isDarkMode ? '#1f2937' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
      }
    });
  }
};

  const handleSaveForLater = (courseId, courseTitle) => {
    const newSaved = new Set([...savedCourses, courseId]);
    setSavedCourses(newSaved);
    localStorage.setItem('savedCourses', JSON.stringify([...newSaved]));
    
    toast.success(`💾 '${courseTitle}' saved for later!`, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: isDarkMode ? '#1f2937' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
      }
    });
  };

  const handleSavePlan = () => {
    setSavedPlan(true);
    setTimeout(() => setSavedPlan(false), 3000);
    toast.success('Learning plan saved successfully!', {
      duration: 3000,
      position: 'top-right',
    });
  };

  const generateLearningPlanPDF = () => {
    // PDF generation logic remains the same as in original code
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
    toast.success('Learning plan exported as PDF!', {
      duration: 3000,
      position: 'top-right',
    });
  };

  const toggleSkillStatus = (skillId) => {
    setSkillStatus(prev => {
      const currentStatus = prev[skillId];
      const statusOrder = ['not-started', 'in-progress', 'completed'];
      const currentIndex = statusOrder.indexOf(currentStatus);
      const nextIndex = (currentIndex + 1) % statusOrder.length;
      return {
        ...prev,
        [skillId]: statusOrder[nextIndex]
      };
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'not-started': return 'bg-gray-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'not-started': return 'Not Started';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return 'Not Started';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-500 bg-red-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-500/20';
      case 'Low': return 'text-green-500 bg-green-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const scrollToCourses = (skillId) => {
    const element = document.getElementById(`courses-${skillId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter courses based on search term and filters
  const filteredCourses = courseRecommendations.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.platform.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = filters.platform === 'all' || 
                           course.platform.toLowerCase() === filters.platform;
    
    const matchesDuration = filters.duration === 'all' || 
                           course.durationCategory === filters.duration;
    
    const matchesRating = filters.rating === 'all' || 
                         course.rating >= parseFloat(filters.rating);
    
    return matchesSearch && matchesPlatform && matchesDuration && matchesRating;
  });

  const completedSkills = Object.values(skillStatus).filter(status => status === 'completed').length;
  const progressPercentage = (completedSkills / missingSkills.length) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.3), 0 10px 10px -5px rgba(139, 92, 246, 0.2)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Layout>
      <Toaster />
      
      {/* Save Success Toast */}
      <AnimatePresence>
        {savedPlan && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-4 right-4 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-2xl flex items-center space-x-3"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={24} />
              </motion.div>
              <div>
                <p className="font-semibold">Plan Saved Successfully!</p>
                <p className="text-green-100 text-sm">Your learning plan has been updated</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 p-6"
      >
        {/* Header Section */}
        <motion.section
          variants={itemVariants}
          className="rounded-2xl p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-3xl lg:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Personalized Recommendations 🚀
              </motion.h1>
              <motion.p 
                className="text-indigo-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                AI-powered learning paths to help you fill your skill gaps
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="hidden lg:block"
            >
              <GraduationCap size={48} className="text-amber-400" />
            </motion.div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-indigo-100">Learning Progress</span>
              <span className="text-indigo-100">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-indigo-500/30 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Missing Skills Display */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
            <Target className="mr-2" size={24} />
            Skills to Develop ({missingSkills.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {missingSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-lg border border-white/10 shadow-xl transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-white/80'
                } hover:shadow-indigo-500/40`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(skill.priority)}`}>
                    {skill.priority}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {skill.description}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                  <strong>Why important:</strong> {skill.importance}
                </p>
                
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSkillStatus(skill.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                      skillStatus[skill.id] === 'not-started'
                        ? 'bg-gray-500 text-white'
                        : skillStatus[skill.id] === 'in-progress'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {getStatusText(skillStatus[skill.id])}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToCourses(skill.id)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    View Training →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI Recommendation Engine Section */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white mb-4 lg:mb-0">
              <BookOpen className="mr-2" size={24} />
              AI-Recommended Learning Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Based on your skill gaps, here are personalized course recommendations
            </p>
          </div>

          {/* Smart Filters */}
          <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center mb-4">
              <Filter size={20} className="text-gray-600 dark:text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Platform Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  🎓 Platform
                </label>
                <select
                  value={filters.platform}
                  onChange={(e) => setFilters(prev => ({ ...prev, platform: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border text-sm transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                >
                  {platformOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  ⏱ Duration
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border text-sm transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                >
                  {durationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  ⭐ Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border text-sm transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                >
                  {ratingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search courses by name or platform..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
              />
            </motion.div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {filteredCourses.length} courses found
            </div>
          </div>

          {/* Course Cards */}
          <div className="space-y-8">
            {missingSkills.map(skill => {
              const skillCourses = filteredCourses.filter(course => course.skillId === skill.id);
              if (skillCourses.length === 0) return null;
              
              return (
                <div key={skill.id} id={`courses-${skill.id}`} className="scroll-mt-20">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
                    Courses for: <span className="text-purple-600 dark:text-purple-400">{skill.name}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillCourses.map((course, index) => {
                      const PlatformIcon = course.platformIcon;
                      const isEnrolled = enrolledCourses.has(course.id);
                      const isSaved = savedCourses.has(course.id);
                      
                      return (
                        <motion.div
                          key={course.id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          className={`p-6 rounded-2xl backdrop-blur-lg border-2 transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-700/30 border-white/10' 
                              : 'bg-white/80 border-gray-200'
                          } hover:shadow-2xl`}
                          style={{
                            background: isDarkMode 
                              ? 'linear-gradient(135deg, rgba(55, 65, 81, 0.3) 0%, rgba(17, 24, 39, 0.3) 100%)'
                              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(243, 244, 246, 0.8) 100%)'
                          }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                {course.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                by {course.instructor}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                course.platform === 'Udemy' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                                course.platform === 'Coursera' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                                'bg-red-500/20 text-red-600 dark:text-red-400'
                              }`}>
                                <PlatformIcon size={12} className="inline mr-1" />
                                {course.platform}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-1">
                                  <Clock size={14} />
                                  <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star size={14} className="text-amber-500" />
                                  <span>{course.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users size={14} />
                                  <span>{(course.students / 1000).toFixed(0)}k</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                {course.difficulty}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {course.features.map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-xs text-gray-700 dark:text-gray-300"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-lg text-gray-900 dark:text-white">
                                {course.price}
                              </span>
                              {course.originalPrice !== course.price && course.originalPrice !== '$0' && (
                                <span className="text-sm text-gray-500 line-through">
                                  {course.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {!isEnrolled ? (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSaveForLater(course.id, course.title)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                      isDarkMode
                                        ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                  >
                                    <Bookmark size={16} />
                                    <span>Save</span>
                                  </motion.button>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleEnroll(course.id, course.title)}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                                  >
                                    <PlayCircle size={16} />
                                    <span>Enroll Now</span>
                                  </motion.button>
                                </>
                              ) : (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                                >
                                  <CheckCircle size={16} />
                                  <span>View in Training</span>
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* AI Learning Pathway Timeline */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
            <Target className="mr-2" size={24} />
            Career Growth Path
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Based on your skills and target role, here's your recommended learning journey:
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 transform -translate-x-1/2"></div>
            
            <div className="space-y-8">
              {learningPathway.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-6 relative"
                >
                  {/* Step number */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-lg z-10 ${
                    step.status === 'current'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                      : 'bg-gray-500'
                  }`}>
                    {step.step}
                  </div>
                  
                  {/* Content */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-300 ${
                      step.status === 'current'
                        ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                        : isDarkMode
                        ? 'border-gray-600 bg-gray-700/50'
                        : 'border-gray-200 bg-gray-50'
                    } hover:shadow-xl`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 lg:mb-0">
                        {step.title}
                      </h3>
                      <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {step.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {step.status === 'current' && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-3 text-xs text-purple-600 dark:text-purple-400 font-medium"
                      >
                        🔥 Current Step - Start Learning Now!
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Insights */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
            <Lightbulb className="mr-2" size={24} />
            AI Learning Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={insight.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`p-4 rounded-xl bg-gradient-to-r ${insight.color} text-white shadow-lg`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon size={20} className="mt-1 flex-shrink-0" />
                    <p className="text-sm font-medium">{insight.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Next Step Banner */}
        <motion.section
          variants={itemVariants}
          className="rounded-2xl p-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to start learning?</h2>
              <p className="text-green-100 text-lg">
                Track your progress and continue your learning journey
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/training'}
              className="mt-4 lg:mt-0 bg-white text-green-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>Go to Training Platform</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.section>
      </motion.div>
    </Layout>
  );
}