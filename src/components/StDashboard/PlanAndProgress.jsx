'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import {
  BookOpen,
  TrendingUp,
  Target,
  Award,
  Download,
  Save,
  ArrowLeft,
  CheckCircle,
  X,
  Star,
  Trophy,
  Zap,
  Clock,
  Users,
  Bookmark,
  BarChart3,
  Calendar,
  User,
  Mail,
  Building
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
  RadialBarChart,
  RadialBar
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PlanAndProgress() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [saved, setSaved] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const reportRef = useRef();

  // Mock enrolled courses data
  const initialCourses = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      platform: 'Coursera',
      instructor: 'AWS Official',
      duration: '20 hours',
      difficulty: 'Advanced',
      rating: 4.7,
      students: 38900,
      price: 'Free',
      skills: ['AWS', 'Cloud Architecture'],
      description: 'Prepare for AWS certification with hands-on labs',
      status: 'in-progress',
      progress: 45,
      enrolledDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'DevOps Engineering',
      platform: 'Pluralsight',
      instructor: 'Kief Morris',
      duration: '15 hours',
      difficulty: 'Advanced',
      rating: 4.7,
      students: 18900,
      price: '$35/month',
      skills: ['DevOps', 'CI/CD', 'Docker'],
      description: 'Master DevOps practices and tools',
      status: 'not-started',
      progress: 0,
      enrolledDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Advanced React and TypeScript',
      platform: 'Udemy',
      instructor: 'Maximilian Schwarzmüller',
      duration: '28 hours',
      difficulty: 'Advanced',
      rating: 4.8,
      students: 45200,
      price: '$94.99',
      skills: ['TypeScript', 'React'],
      description: 'Master React with TypeScript for building scalable applications',
      status: 'completed',
      progress: 100,
      enrolledDate: '2024-01-10'
    },
    {
      id: 4,
      title: 'Python for Data Science',
      platform: 'edX',
      instructor: 'MIT Faculty',
      duration: '12 weeks',
      difficulty: 'Intermediate',
      rating: 4.5,
      students: 67800,
      price: 'Free',
      skills: ['Python', 'Data Science'],
      description: 'Comprehensive data science course with Python',
      status: 'in-progress',
      progress: 30,
      enrolledDate: '2024-01-25'
    }
  ];

  // Mock user data for report
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    employeeId: 'EMP-2024-007',
    joinDate: '2022-03-15'
  };

  // Skill improvement data
  const skillImprovementData = [
    { skill: 'Cloud Architecture', before: 40, after: 85 },
    { skill: 'React', before: 60, after: 95 },
    { skill: 'TypeScript', before: 50, after: 90 },
    { skill: 'DevOps', before: 30, after: 65 },
    { skill: 'Python', before: 70, after: 85 },
    { skill: 'Data Science', before: 45, after: 75 }
  ];

  // Badges data
  const badges = [
    { id: 1, name: 'Course Completer', icon: '🎖️', description: 'Completed 3 courses', earned: true },
    { id: 2, name: 'Skill Master', icon: '🌟', description: 'First 100% skill completed', earned: true },
    { id: 3, name: 'Role Ready', icon: '🏆', description: 'Ready for Cloud Engineer role', earned: false },
    { id: 4, name: 'Fast Learner', icon: '⚡', description: 'Completed course in record time', earned: false },
    { id: 5, name: 'Consistent Learner', icon: '📚', description: '30 days learning streak', earned: true }
  ];

  useEffect(() => {
    setEnrolledCourses(initialCourses);
  }, []);

  const handleUnenroll = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(course => course.id !== courseId));
  };

  const handleStatusChange = (courseId, newStatus) => {
    setEnrolledCourses(enrolledCourses.map(course => {
      if (course.id === courseId) {
        const progress = newStatus === 'completed' ? 100 : 
                        newStatus === 'in-progress' ? 50 : 0;
        return { ...course, status: newStatus, progress };
      }
      return course;
    }));
  };

  const handleProgressChange = (courseId, newProgress) => {
    setEnrolledCourses(enrolledCourses.map(course => {
      if (course.id === courseId) {
        const status = newProgress === 100 ? 'completed' : 
                      newProgress > 0 ? 'in-progress' : 'not-started';
        return { ...course, progress: newProgress, status };
      }
      return course;
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDownloadReport = async () => {
    setDownloading(true);
    
    try {
      // Create a hidden div for PDF generation with light theme
      const pdfElement = document.createElement('div');
      pdfElement.style.position = 'absolute';
      pdfElement.style.left = '-9999px';
      pdfElement.style.top = '0';
      pdfElement.style.width = '794px'; // A4 width in pixels
      pdfElement.style.backgroundColor = '#ffffff';
      pdfElement.style.padding = '40px';
      pdfElement.style.fontFamily = 'Arial, sans-serif';
      pdfElement.style.color = '#1f2937';
      
      // Generate PDF content
      pdfElement.innerHTML = generatePDFContent();
      document.body.appendChild(pdfElement);

      // Convert to canvas then to PDF
      const canvas = await html2canvas(pdfElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 794,
        height: pdfElement.scrollHeight,
        windowWidth: 794,
        windowHeight: pdfElement.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Remove the temporary element
      document.body.removeChild(pdfElement);
      
      // Save the PDF
      pdf.save(`Learning-Progress-Report-${userData.name}-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const generatePDFContent = () => {
    const currentDate = new Date().toLocaleDateString();
    const completedCourses = enrolledCourses.filter(course => course.status === 'completed').length;
    const inProgressCourses = enrolledCourses.filter(course => course.status === 'in-progress').length;
    
    return `
      <div style="max-width: 794px; margin: 0 auto; background: white; color: #1f2937; font-family: Arial, sans-serif;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h1 style="margin: 0; font-size: 32px; font-weight: bold;">Learning Progress Report</h1>
              <p style="margin: 5px 0 0 0; font-size: 16px; opacity: 0.9;">Generated on ${currentDate}</p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; opacity: 0.9;">${userData.name}</div>
              <div style="font-size: 12px; opacity: 0.8;">${userData.position}</div>
            </div>
          </div>
        </div>

        <!-- User Info -->
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div>
              <strong>Employee ID:</strong> ${userData.employeeId}
            </div>
            <div>
              <strong>Department:</strong> ${userData.department}
            </div>
            <div>
              <strong>Email:</strong> ${userData.email}
            </div>
            <div>
              <strong>Join Date:</strong> ${new Date(userData.joinDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <!-- Progress Overview -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #374151; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 20px;">Progress Overview</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border: 1px solid #d1fae5;">
              <div style="font-size: 24px; font-weight: bold; color: #059669;">${enrolledCourses.length}</div>
              <div style="color: #065f46; font-size: 14px;">Total Courses</div>
            </div>
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; border: 1px solid #bfdbfe;">
              <div style="font-size: 24px; font-weight: bold; color: #2563eb;">${completedCourses}</div>
              <div style="color: #1e40af; font-size: 14px;">Completed</div>
            </div>
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border: 1px solid #fde68a;">
              <div style="font-size: 24px; font-weight: bold; color: #d97706;">${Math.round(overallProgress)}%</div>
              <div style="color: #92400e; font-size: 14px;">Overall Progress</div>
            </div>
          </div>
        </div>

        <!-- Course Progress -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #374151; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 20px;">Course Progress</h2>
          ${enrolledCourses.map(course => `
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 15px; border-left: 4px solid #667eea;">
              <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 10px;">
                <div style="flex: 1;">
                  <h3 style="margin: 0 0 5px 0; color: #1f2937; font-size: 16px;">${course.title}</h3>
                  <div style="display: flex; gap: 15px; font-size: 12px; color: #6b7280;">
                    <span>Platform: ${course.platform}</span>
                    <span>Duration: ${course.duration}</span>
                    <span>Status: ${getStatusText(course.status)}</span>
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 18px; font-weight: bold; color: #667eea;">${course.progress}%</div>
                </div>
              </div>
              <div style="background: #f3f4f6; height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="background: linear-gradient(90deg, #667eea, #764ba2); height: 100%; width: ${course.progress}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Skill Improvement -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #374151; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 20px;">Skill Improvement</h2>
          <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
            ${skillImprovementData.map(skill => `
              <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: bold; color: #374151;">${skill.skill}</span>
                  <span style="color: #059669; font-weight: bold;">+${skill.after - skill.before}%</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 12px; color: #6b7280; width: 80px;">Before: ${skill.before}%</span>
                  <div style="flex: 1; background: #f3f4f6; height: 6px; border-radius: 3px;">
                    <div style="background: #9ca3af; height: 100%; width: ${skill.before}%;"></div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                  <span style="font-size: 12px; color: #6b7280; width: 80px;">After: ${skill.after}%</span>
                  <div style="flex: 1; background: #f3f4f6; height: 6px; border-radius: 3px;">
                    <div style="background: linear-gradient(90deg, #667eea, #764ba2); height: 100%; width: ${skill.after}%;"></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Achievements -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #374151; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 20px;">Achievements</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            ${badges.filter(badge => badge.earned).map(badge => `
              <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 1px solid #fbbf24; border-radius: 8px; padding: 15px; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 5px;">${badge.icon}</div>
                <div style="font-weight: bold; color: #92400e; font-size: 14px;">${badge.name}</div>
                <div style="color: #b45309; font-size: 12px;">${badge.description}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Insights -->
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
          <h3 style="color: #0369a1; margin: 0 0 15px 0;">Key Insights</h3>
          <div style="display: grid; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: #059669; font-weight: bold;">✓</span>
              <span>You improved Cloud skills by 30% through dedicated learning</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: #059669; font-weight: bold;">✓</span>
              <span>You're now 85% ready for Cloud Engineer role transition</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: #059669; font-weight: bold;">✓</span>
              <span>Completed ${completedCourses} courses with ${inProgressCourses} in progress</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>Generated by Company Learning Platform • Confidential Report</p>
          <p>For internal use only • ${currentDate}</p>
        </div>
      </div>
    `;
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Calculate overall progress
  const overallProgress = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length 
    : 0;

  // Calculate completed courses count
  const completedCourses = enrolledCourses.filter(course => course.status === 'completed').length;

  // Progress chart data
  const progressData = [
    { name: 'Completed', value: completedCourses, color: '#10B981' },
    { name: 'In Progress', value: enrolledCourses.filter(c => c.status === 'in-progress').length, color: '#3B82F6' },
    { name: 'Not Started', value: enrolledCourses.filter(c => c.status === 'not-started').length, color: '#6B7280' }
  ];

  const radialData = [
    {
      name: 'Overall Progress',
      value: overallProgress,
      fill: '#8B5CF6'
    }
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'not-started': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      default: return 'Not Started';
    }
  };

  return (
    <Layout>
      {/* Save Success Toast */}
      <AnimatePresence>
        {saved && (
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

      {/* Downloading Toast */}
      <AnimatePresence>
        {downloading && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-4 right-4 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-2xl shadow-2xl flex items-center space-x-3"
            >
              <motion.div
                animate={{ 
                  rotate: 360
                }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Download size={24} />
              </motion.div>
              <div>
                <p className="font-semibold">Generating Report...</p>
                <p className="text-blue-100 text-sm">Preparing your PDF download</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden PDF Content */}
      <div ref={reportRef} style={{ display: 'none' }}>
        {generatePDFContent()}
      </div>

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
                My Plan & Progress 📊
              </motion.h1>
              <motion.p 
                className="text-indigo-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Manage your enrolled courses and track your upskilling journey
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="hidden lg:block"
            >
              <TrendingUp size={48} className="text-amber-400" />
            </motion.div>
          </div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{enrolledCourses.length}</div>
              <div className="text-indigo-100 text-sm">Enrolled Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{completedCourses}</div>
              <div className="text-indigo-100 text-sm">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</div>
              <div className="text-indigo-100 text-sm">Overall Progress</div>
            </div>
          </motion.div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Plan Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrolled Courses */}
            <motion.section
              variants={itemVariants}
              className={`rounded-2xl p-6 shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                <BookOpen className="mr-2" size={24} />
                My Learning Plan ({enrolledCourses.length})
              </h2>

              <AnimatePresence>
                {enrolledCourses.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      No courses enrolled yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                      Go to Training Platforms to add courses to your learning plan
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/training-platforms')}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                      Browse Courses
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {enrolledCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -2,
                          boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)'
                        }}
                        className={`p-6 rounded-xl border transition-all duration-300 ${
                          isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                        } relative overflow-hidden`}
                      >
                        {/* Gradient accent */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
                        
                        <div className="flex items-start justify-between ml-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                  by {course.instructor}
                                </p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUnenroll(course.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={18} />
                              </motion.button>
                            </div>

                            <div className="flex items-center space-x-4 mb-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                course.platform === 'Udemy' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                                course.platform === 'Coursera' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                                course.platform === 'Pluralsight' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                                'bg-green-500/20 text-green-600 dark:text-green-400'
                              }`}>
                                {course.platform}
                              </span>
                              
                              <span className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                                <Clock size={14} />
                                <span>{course.duration}</span>
                              </span>
                              
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                {getStatusText(course.status)}
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                <span className="text-gray-600 dark:text-gray-400">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <motion.div
                                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${course.progress}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>

                            {/* Progress Controls */}
                            <div className="flex items-center space-x-4">
                              <select
                                value={course.status}
                                onChange={(e) => handleStatusChange(course.id, e.target.value)}
                                className={`px-3 py-2 rounded-lg text-sm border transition-all duration-300 ${
                                  isDarkMode 
                                    ? 'bg-gray-700 border-gray-600 text-white' 
                                    : 'bg-white border-gray-200 text-gray-900'
                                }`}
                              >
                                <option value="not-started">Not Started</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>

                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={course.progress}
                                onChange={(e) => handleProgressChange(course.id, parseInt(e.target.value))}
                                className="flex-1"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Progress Tracking */}
            <motion.section
              variants={itemVariants}
              className={`rounded-2xl p-6 shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                <BarChart3 className="mr-2" size={24} />
                Skill Improvement
              </h2>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillImprovementData}>
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
                      dataKey="before" 
                      fill="#6B7280"
                      radius={[4, 4, 0, 0]}
                      name="Before Training"
                    />
                    <Bar 
                      dataKey="after" 
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]}
                      name="After Training"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.section>
          </div>

          {/* Right Column - Progress & Achievements */}
          <div className="space-y-6">
            {/* Overall Progress */}
            <motion.section
              variants={itemVariants}
              className={`rounded-2xl p-6 shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                <Target className="mr-2" size={24} />
                Overall Progress
              </h2>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart 
                    innerRadius="20%" 
                    outerRadius="100%" 
                    data={radialData}
                    startAngle={180}
                    endAngle={-180}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise
                      dataKey="value"
                    />
                    <text 
                      x="50%" 
                      y="50%" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      className="text-2xl font-bold"
                      fill={isDarkMode ? '#FFFFFF' : '#1F2937'}
                    >
                      {Math.round(overallProgress)}%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              {/* Progress Distribution */}
              <div className="mt-4 space-y-3">
                {progressData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Impact Insights */}
            <motion.section
              variants={itemVariants}
              className={`rounded-2xl p-6 shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                <Zap className="mr-2" size={24} />
                Impact Insights
              </h2>
              
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-xl border border-blue-500/20"
                >
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    🚀 Skill Improvement
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You improved Cloud skills by <span className="font-semibold text-green-600">30%</span>
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-500/20"
                >
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400 mb-1">
                    🎯 Role Readiness
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You're now <span className="font-semibold text-green-600">85%</span> ready for Cloud Engineer role
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-500/20"
                >
                  <div className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-1">
                    📈 Learning Velocity
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Completed <span className="font-semibold text-purple-600">{completedCourses}</span> courses in the last 30 days
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Achievements & Badges */}
            <motion.section
              variants={itemVariants}
              className={`rounded-2xl p-6 shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                <Award className="mr-2" size={24} />
                Achievements
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: badge.earned ? [0, -5, 5, 0] : 0
                    }}
                    className={`p-4 rounded-xl text-center border-2 transition-all duration-300 ${
                      badge.earned 
                        ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/30 shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className={`text-sm font-semibold ${
                      badge.earned ? 'text-amber-700 dark:text-amber-400' : 'text-gray-500'
                    }`}>
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {badge.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Action Section */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 shadow-lg"
              >
                <Save size={18} />
                <span>Save Plan & Progress</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadReport}
                disabled={downloading}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                  downloading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                }`}
              >
                <Download size={18} />
                <span>{downloading ? 'Generating...' : 'Download Report'}</span>
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            >
              <ArrowLeft size={18} />
              <span>Back to Dashboard</span>
            </motion.button>
          </div>
        </motion.section>
      </motion.div>
    </Layout>
  );
}