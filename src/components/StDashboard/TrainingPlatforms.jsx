'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  PlayCircle,
  Bookmark,
  CheckCircle,
  ArrowLeft,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  PauseCircle,
  Play
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

export default function TrainingPlatforms() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [savedCourses, setSavedCourses] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeCourse, setActiveCourse] = useState(null);
  const [courseProgress, setCourseProgress] = useState({});
  const [showCourseModal, setShowCourseModal] = useState(false);
  const navigate = useNavigate();

  // Mock course content for the modal
  const courseContent = [
    { id: 1, title: 'Introduction to Course', duration: '15:30', completed: true },
    { id: 2, title: 'Setting Up Development Environment', duration: '22:15', completed: true },
    { id: 3, title: 'Core Concepts Overview', duration: '18:45', completed: false },
    { id: 4, title: 'Hands-on Practice Session', duration: '35:20', completed: false },
    { id: 5, title: 'Advanced Techniques', duration: '28:10', completed: false },
    { id: 6, title: 'Real-world Project', duration: '45:00', completed: false }
  ];

  const handleBackToRecommendations = () => {
    navigate('/recommendations');
  };

  const handleViewPlanProgress = () => {
    navigate('/planprogress');
  };

  // Safe string conversion with null check
  const safeToLowerCase = (str) => {
    return str ? String(str).toLowerCase() : '';
  };

  // Sample course data to use as fallback if localStorage is empty (for testing)
  const sampleCourses = [
    {
      id: 1,
      title: 'Master Node.js from Scratch',
      platform: 'Udemy',
      instructor: 'Maximilian Schwarzmüller',
      duration: '12 hours',
      difficulty: 'Beginner to Advanced',
      rating: 4.7,
      students: 125000,
      price: '$94.99',
      originalPrice: '$199.99',
      skills: ['Node.js'],
      description: 'Master Node.js from basics to advanced concepts',
      features: ['Node.js Basics', 'Express Framework', 'REST APIs', 'Real Projects'],
      progress: 0,
      enrolled: true
    },
    {
      id: 2,
      title: 'MongoDB - The Complete Developer Guide',
      platform: 'Udemy',
      instructor: 'Academind by Maximilian Schwarzmüller',
      duration: '15 hours',
      difficulty: 'Beginner to Advanced',
      rating: 4.8,
      students: 89000,
      price: '$84.99',
      originalPrice: '$189.99',
      skills: ['MongoDB'],
      description: 'Complete MongoDB developer guide with hands-on projects',
      features: ['CRUD Operations', 'Aggregation', 'Indexing', 'Performance'],
      progress: 0,
      enrolled: true
    }
  ];

  // Load enrolled courses from localStorage
  useEffect(() => {
    const loadEnrolledCourses = () => {
      try {
        let enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        
        // If no courses in localStorage, use sample data for testing
        if (enrolled.length === 0) {
          enrolled = sampleCourses;
          localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
        }
        
        console.log('Loaded enrolled courses:', enrolled);
        
        // Ensure all courses have required properties with proper fallbacks
        const validatedCourses = enrolled.map(course => ({
          id: course.id || Math.random().toString(36).substr(2, 9),
          title: course.title || 'Untitled Course',
          platform: course.platform || 'Unknown Platform',
          instructor: course.instructor || 'Unknown Instructor',
          duration: course.duration || 'Unknown Duration',
          difficulty: course.difficulty || 'Unknown',
          rating: course.rating || 0,
          students: course.students || 0,
          price: course.price || 'Free',
          originalPrice: course.originalPrice || course.price || 'Free',
          skills: Array.isArray(course.skills) ? course.skills : [],
          description: course.description || 'No description available',
          features: Array.isArray(course.features) ? course.features : [],
          progress: course.progress || 0,
          enrolled: course.enrolled !== undefined ? course.enrolled : true
        }));
        
        setEnrolledCourses(validatedCourses);

        // Initialize progress for each course
        const progressData = {};
        validatedCourses.forEach(course => {
          progressData[course.id] = course.progress || 0;
        });
        setCourseProgress(progressData);
      } catch (error) {
        console.error('Error loading enrolled courses:', error);
        // Fallback to sample courses if there's an error
        setEnrolledCourses(sampleCourses);
        toast.error('Error loading your courses. Using sample data.');
      }
    };

    loadEnrolledCourses();

    // Listen for storage changes (in case enrolled from another tab)
    const handleStorageChange = () => {
      loadEnrolledCourses();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Skills for filter - extract from enrolled courses with null checks
  const skills = [...new Set(enrolledCourses.flatMap(course => 
    Array.isArray(course.skills) ? course.skills : []
  ))].filter(Boolean);

  // Platform options - extract from enrolled courses with null checks
  const platforms = [...new Set(enrolledCourses.map(course => 
    course.platform || 'Unknown Platform'
  ).filter(Boolean))];

  // Analytics data based on enrolled courses
  const platformDistribution = platforms.map(platform => {
    const count = enrolledCourses.filter(course => 
      (course.platform || 'Unknown Platform') === platform
    ).length;
    const colorMap = {
      'Udemy': '#8B5CF6',
      'Coursera': '#3B82F6',
      'LinkedIn Learning': '#0EA5E9',
      'Pluralsight': '#EF4444',
      'edX': '#10B981',
      'YouTube': '#DC2626',
      'Company LMS': '#6B7280',
      'Unknown Platform': '#6B7280'
    };
    return {
      name: platform,
      value: count,
      color: colorMap[platform] || '#6B7280'
    };
  });

  const skillCoverageData = skills.map(skill => {
    const coursesWithSkill = enrolledCourses.filter(course => 
      Array.isArray(course.skills) && course.skills.includes(skill)
    );
    const avgProgress = coursesWithSkill.length > 0 
      ? coursesWithSkill.reduce((sum, course) => sum + (courseProgress[course.id] || 0), 0) / coursesWithSkill.length
      : 0;
    
    return {
      skill: skill,
      coverage: Math.round(avgProgress)
    };
  });

  // Progress analytics
  const progressData = [
    { 
      name: 'Completed', 
      value: enrolledCourses.filter(course => (courseProgress[course.id] || 0) >= 100).length 
    },
    { 
      name: 'In Progress', 
      value: enrolledCourses.filter(course => (courseProgress[course.id] || 0) > 0 && (courseProgress[course.id] || 0) < 100).length 
    },
    { 
      name: 'Not Started', 
      value: enrolledCourses.filter(course => (courseProgress[course.id] || 0) === 0).length 
    }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#6B7280'];

  const handleSaveCourses = () => {
    setSavedCourses(true);
    toast.success('Learning progress saved successfully!', {
      duration: 3000,
      position: 'top-right',
    });
    setTimeout(() => setSavedCourses(false), 3000);
  };

  const handleUnenroll = (courseId, courseTitle) => {
    const updatedCourses = enrolledCourses.filter(course => course.id !== courseId);
    setEnrolledCourses(updatedCourses);
    
    // Update localStorage
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
    
    // Remove progress data
    const newProgress = { ...courseProgress };
    delete newProgress[courseId];
    setCourseProgress(newProgress);
    
    toast.success(`Unenrolled from "${courseTitle}"`, {
      duration: 3000,
      position: 'top-right',
    });
  };

  const handleStartCourse = (course) => {
    setActiveCourse(course);
    setShowCourseModal(true);
  };

  const handleUpdateProgress = (courseId, progress) => {
    const newProgress = Math.min(100, Math.max(0, progress));
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: newProgress
    }));

    // Update the course in enrolledCourses with progress
    const updatedCourses = enrolledCourses.map(course => 
      course.id === courseId ? { ...course, progress: newProgress } : course
    );
    setEnrolledCourses(updatedCourses);
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
  };

  const handleCompleteLesson = (lessonId) => {
    // Mock lesson completion - in real app, this would update backend
    toast.success('Lesson completed! Progress updated.', {
      duration: 2000,
      position: 'top-right',
    });
  };

  // Safe filter function with null checks
  const filteredCourses = enrolledCourses.filter(course => {
    if (!course) return false;

    const matchesPlatform = selectedPlatform === 'all' || 
                           (course.platform || 'Unknown Platform') === selectedPlatform;
    
    const matchesSearch = searchTerm === '' || 
                         safeToLowerCase(course.title).includes(safeToLowerCase(searchTerm)) ||
                         safeToLowerCase(course.instructor).includes(safeToLowerCase(searchTerm));
    
    const matchesSkill = selectedSkill === 'all' || 
                        (Array.isArray(course.skills) && course.skills.includes(selectedSkill));
    
    // Status filter logic
    const progress = courseProgress[course.id] || 0;
    let matchesStatus = true;
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'Completed') {
        matchesStatus = progress >= 100;
      } else if (selectedStatus === 'In Progress') {
        matchesStatus = progress > 0 && progress < 100;
      } else if (selectedStatus === 'Not Started') {
        matchesStatus = progress === 0;
      }
    }
    
    return matchesPlatform && matchesSearch && matchesSkill && matchesStatus;
  });

  const enrolledCount = enrolledCourses.length;
  const completedCount = enrolledCourses.filter(course => (courseProgress[course.id] || 0) >= 100).length;
  const totalProgress = enrolledCount > 0 
    ? enrolledCourses.reduce((sum, course) => sum + (courseProgress[course.id] || 0), 0) / enrolledCount 
    : 0;

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
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
      transition: {
        duration: 0.2
      }
    }
  };

  // Course Modal Component
  const CourseModal = () => {
    if (!showCourseModal || !activeCourse) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShowCourseModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeCourse.title}
            </h2>
            <button
              onClick={() => setShowCourseModal(false)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Course Content</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {courseContent.filter(item => item.completed).length} of {courseContent.length} lessons completed
                  </span>
                </div>
                
                <div className="space-y-3">
                  {courseContent.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      whileHover={{ scale: 1.01 }}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                        lesson.completed
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600'
                      }`}
                      onClick={() => handleCompleteLesson(lesson.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.completed 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-300 dark:bg-gray-500 text-gray-600 dark:text-gray-300'
                          }`}>
                            {lesson.completed ? <CheckCircle size={16} /> : <span>{index + 1}</span>}
                          </div>
                          <div>
                            <h4 className={`font-medium ${
                              lesson.completed 
                                ? 'text-green-700 dark:text-green-300' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {lesson.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                        {lesson.completed && (
                          <CheckCircle size={20} className="text-green-500" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-4 rounded-xl border-2 ${
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Course Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {courseProgress[activeCourse.id] || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${courseProgress[activeCourse.id] || 0}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border-2 ${
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h4>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUpdateProgress(activeCourse.id, (courseProgress[activeCourse.id] || 0) + 10)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Mark 10% Complete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUpdateProgress(activeCourse.id, 100)}
                    className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    Mark Complete
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <Layout>
      <Toaster />
      <CourseModal />
      
      {/* Save Success Toast */}
      <AnimatePresence>
        {savedCourses && (
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
                <p className="font-semibold">Progress Saved!</p>
                <p className="text-green-100 text-sm">Your learning progress has been updated</p>
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
          className="rounded-2xl p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-3xl lg:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Training Platforms 🎯
              </motion.h1>
              <motion.p 
                className="text-blue-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                View and manage your enrolled courses. Track progress and continue learning.
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="hidden lg:block"
            >
              <BookOpen size={48} className="text-amber-400" />
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
              <span className="text-blue-100">Overall Learning Progress</span>
              <span className="text-blue-100">
                {completedCount} of {enrolledCount} Courses Completed • {Math.round(totalProgress)}% Overall
              </span>
            </div>
            <div className="w-full bg-blue-500/30 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Progress Distribution */}
          <motion.section
            variants={itemVariants}
            className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
              <BarChart3 className="mr-2" size={24} />
              Course Progress Overview
            </h2>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: isDarkMode ? '#1F2937' : '#FFFFFF',
                      border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                      borderRadius: '8px',
                      color: isDarkMode ? '#FFFFFF' : '#1F2937'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {progressData.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Skill Coverage */}
          <motion.section
            variants={itemVariants}
            className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
              <Target className="mr-2" size={24} />
              Skill Progress Tracking
            </h2>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillCoverageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="skill" 
                    stroke="#6b7280"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: isDarkMode ? '#1F2937' : '#FFFFFF',
                      border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                      borderRadius: '8px',
                      color: isDarkMode ? '#FFFFFF' : '#1F2937'
                    }}
                  />
                  <Bar 
                    dataKey="coverage" 
                    radius={[4, 4, 0, 0]}
                  >
                    {skillCoverageData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.coverage >= 80 ? '#10B981' : entry.coverage >= 50 ? '#3B82F6' : '#EF4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>
        </div>

        {/* Filters & Search */}
        {enrolledCourses.length > 0 && (
          <motion.section
            variants={itemVariants}
            className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text"
                    placeholder="Search your enrolled courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  />
                </motion.div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Platform
                  </label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className={`px-4 py-3 rounded-xl border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  >
                    <option value="all">All Platforms</option>
                    {platforms.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Skill
                  </label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className={`px-4 py-3 rounded-xl border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  >
                    <option value="all">All Skills</option>
                    {skills.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={`px-4 py-3 rounded-xl border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                        : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  >
                    <option value="all">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredCourses.length} of {enrolledCourses.length} enrolled courses
            </div>
          </motion.section>
        )}

        {/* Enrolled Courses Section */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
            <BookOpen className="mr-2" size={24} />
            My Enrolled Courses ({filteredCourses.length})
          </h2>
          
          {enrolledCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Courses Enrolled Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                Go to Recommendations page to enroll in courses that match your skill gaps.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToRecommendations}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Browse Course Recommendations
              </motion.button>
            </motion.div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No courses match your current filters. Try adjusting your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredCourses.map((course, index) => {
                  const progress = courseProgress[course.id] || 0;
                  const isCompleted = progress >= 100;
                  const isInProgress = progress > 0 && progress < 100;
                  
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
                      } hover:shadow-2xl ${
                        isCompleted ? 'ring-2 ring-green-500' : 
                        isInProgress ? 'ring-2 ring-blue-500' : ''
                      }`}
                      style={{
                        background: isDarkMode 
                          ? 'linear-gradient(135deg, rgba(55, 65, 81, 0.3) 0%, rgba(17, 24, 39, 0.3) 100%)'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(243, 244, 246, 0.8) 100%)'
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            by {course.instructor}
                          </p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.platform === 'Udemy' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                            course.platform === 'Coursera' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                            course.platform === 'LinkedIn Learning' ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' :
                            course.platform === 'Pluralsight' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                            course.platform === 'edX' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                            'bg-gray-500/20 text-gray-600 dark:text-gray-400'
                          }`}>
                            {course.platform}
                          </span>
                        </div>
                        
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-green-500 text-white p-2 rounded-full"
                          >
                            <CheckCircle size={16} />
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        {/* Progress Section */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {progress}% {isCompleted ? '✓ Complete' : isInProgress ? '↻ In Progress' : '○ Not Started'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${
                                isCompleted ? 'bg-green-500' :
                                isInProgress ? 'bg-blue-500' : 'bg-gray-400'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                        
                        {/* Skills */}
                        {course.skills && course.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {course.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Course Details */}
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-amber-500" />
                            <span>{course.rating}</span>
                          </div>
                          {course.students > 0 && (
                            <div className="flex items-center space-x-1">
                              <Users size={14} />
                              <span>{(course.students / 1000).toFixed(0)}k</span>
                            </div>
                          )}
                        </div>

                        {/* Course Features */}
                        {course.features && course.features.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {course.features.slice(0, 3).map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStartCourse(course)}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                              isCompleted
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle size={16} />
                                <span>Completed</span>
                              </>
                            ) : isInProgress ? (
                              <>
                                <Play size={16} />
                                <span>Continue</span>
                              </>
                            ) : (
                              <>
                                <PlayCircle size={16} />
                                <span>Start</span>
                              </>
                            )}
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUnenroll(course.id, course.title)}
                            className="px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-500/20 transition-all duration-300"
                          >
                            Unenroll
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.section>

        {/* Next Step Section */}
        <motion.section
          variants={itemVariants}
          className="rounded-2xl p-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Track Your Full Learning Journey</h2>
              <p className="text-green-100 text-lg">
                {completedCount > 0 
                  ? `Great progress! You've completed ${completedCount} course${completedCount !== 1 ? 's' : ''}. Keep going! 🚀`
                  : "Start your learning journey today and track your achievements!"}
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewPlanProgress}
              className="mt-4 lg:mt-0 bg-white text-green-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <TrendingUp size={20} />
              <span>View Plan & Progress</span>
            </motion.button>
          </div>
        </motion.section>
      </motion.div>
    </Layout>
  );
}