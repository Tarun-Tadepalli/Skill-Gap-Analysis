'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './Layout';
import { 
  Upload,
  FileText,
  Search,
  Download,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Target,
  Brain,
  Award,
  Users,
  Zap,
  Star,
  CheckCircle,
  X,
  Cloud,
  Code,
  Clock,
  AlertCircle,
  TrendingUp
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
  Legend,
  ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import { toast, Toaster } from 'react-hot-toast';

export default function MySkills() {
  const [skills, setSkills] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExamModal, setShowExamModal] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [examAnswers, setExamAnswers] = useState([]);
  const [examTimeLeft, setExamTimeLeft] = useState(300); // 5 minutes in seconds
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock skill extraction from resume
  const extractSkillsFromResume = (file) => {
    setIsExtracting(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const mockExtractedSkills = [
        { 
          id: 1, 
          name: 'React', 
          category: 'Frontend', 
          proficiency: 0, 
          level: 'Pending',
          status: 'pending',
          score: 0,
          verified: false
        },
        { 
          id: 2, 
          name: 'Node.js', 
          category: 'Backend', 
          proficiency: 0, 
          level: 'Pending',
          status: 'pending',
          score: 0,
          verified: false
        },
        { 
          id: 3, 
          name: 'Python', 
          category: 'Programming', 
          proficiency: 0, 
          level: 'Pending',
          status: 'pending',
          score: 0,
          verified: false
        },
        { 
          id: 4, 
          name: 'AWS', 
          category: 'Cloud', 
          proficiency: 0, 
          level: 'Pending',
          status: 'pending',
          score: 0,
          verified: false
        },
        { 
          id: 5, 
          name: 'Communication', 
          category: 'Soft Skills', 
          proficiency: 0, 
          level: 'Pending',
          status: 'pending',
          score: 0,
          verified: false
        },
        { 
          id: 6, 
          name: 'Team Leadership', 
          category: 'Soft Skills', 
          proficiency: 0, 
          level: 'Pending',
          status: 'pending',
          score: 0,
          verified: false
        }
      ];
      
      setSkills(mockExtractedSkills);
      setIsExtracting(false);
      toast.success('Skills extracted successfully from your resume!');
    }, 2000);
  };

  // Filter skills based on search
  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate skill distribution for chart
  const skillDistribution = [
    { name: 'Verified', value: skills.filter(s => s.status === 'verified').length, color: '#10B981' },
    { name: 'Pending', value: skills.filter(s => s.status === 'pending').length, color: '#F59E0B' },
    { name: 'Unverified', value: skills.filter(s => s.status === 'unverified').length, color: '#EF4444' }
  ];

  // Skill scores for bar chart
  const skillScores = skills
    .filter(skill => skill.status === 'verified')
    .map(skill => ({
      name: skill.name,
      score: skill.score,
      level: skill.level
    }));

  // Quick insights based on skill balance
  const insights = [
    {
      id: 1,
      text: skills.length > 0 
        ? `We found ${skills.length} skills in your resume. Start verifying them to build your portfolio.`
        : "Upload your resume to discover and verify your skills automatically.",
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      text: skills.filter(s => s.status === 'verified').length > 0
        ? `Great! You have ${skills.filter(s => s.status === 'verified').length} verified skills.`
        : "Take skill exams to get verified and boost your credibility.",
      icon: Award,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      text: "Skill verification increases your job match rate by 70% according to industry data.",
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  // Mock exam questions for different skills
  const examQuestions = {
    'React': [
      {
        id: 1,
        question: "What is the purpose of React hooks?",
        options: [
          "To handle CSS styling",
          "To manage state and side effects in functional components",
          "To create class components",
          "To handle routing"
        ],
        correct: 1
      },
      {
        id: 2,
        question: "Which hook is used for side effects?",
        options: [
          "useState",
          "useEffect", 
          "useContext",
          "useReducer"
        ],
        correct: 1
      },
      {
        id: 3,
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JavaScript Extension",
          "Java XML"
        ],
        correct: 0
      }
    ],
    'Node.js': [
      {
        id: 1,
        question: "What is Node.js primarily used for?",
        options: [
          "Frontend development",
          "Server-side JavaScript",
          "Mobile app development", 
          "Database management"
        ],
        correct: 1
      },
      {
        id: 2,
        question: "Which module is built-in for file system operations?",
        options: [
          "http",
          "fs",
          "path",
          "util"
        ],
        correct: 1
      }
    ],
    'Python': [
      {
        id: 1,
        question: "How do you create a list in Python?",
        options: [
          "array[]",
          "list[]",
          "[]",
          "()"
        ],
        correct: 2
      }
    ]
  };

  const handleFileUpload = (file) => {
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setUploadedFile(file);
      extractSkillsFromResume(file);
    } else {
      toast.error('Please upload a PDF or DOCX file');
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setSkills([]);
    setAiRecommendations([]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const startExam = (skill) => {
    const questions = examQuestions[skill.name] || [
      {
        id: 1,
        question: `What is your experience with ${skill.name}?`,
        options: ["Beginner", "Intermediate", "Advanced", "Expert"],
        correct: 1
      },
      {
        id: 2, 
        question: `How would you rate your ${skill.name} skills?`,
        options: ["Basic", "Proficient", "Advanced", "Expert"],
        correct: 1
      }
    ];
    
    setCurrentExam({
      skill,
      questions,
      currentQuestion: 0
    });
    setExamAnswers(new Array(questions.length).fill(null));
    setExamTimeLeft(300); // 5 minutes
    setShowExamModal(true);
  };

  const handleExamAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...examAnswers];
    newAnswers[questionIndex] = answerIndex;
    setExamAnswers(newAnswers);
  };

  const submitExam = () => {
    if (currentExam) {
      const correctAnswers = examAnswers.filter((answer, index) => 
        answer === currentExam.questions[index].correct
      ).length;
      
      const score = Math.round((correctAnswers / currentExam.questions.length) * 100);
      const status = score >= 80 ? 'verified' : score >= 50 ? 'needs_improvement' : 'unverified';
      const level = score >= 80 ? 'Expert' : score >= 60 ? 'Advanced' : score >= 40 ? 'Intermediate' : 'Beginner';
      
      setSkills(prev => prev.map(skill => 
        skill.id === currentExam.skill.id 
          ? { 
              ...skill, 
              score, 
              status,
              level,
              proficiency: score,
              verified: status === 'verified'
            } 
          : skill
      ));
      
      setShowExamModal(false);
      setCurrentExam(null);
      
      if (score >= 80) {
        toast.success(`Congratulations! You scored ${score}% and are now verified in ${currentExam.skill.name}`);
      } else if (score >= 50) {
        toast.success(`You scored ${score}% in ${currentExam.skill.name}. Keep practicing!`);
      } else {
        toast.error(`You scored ${score}% in ${currentExam.skill.name}. Consider learning more.`);
      }
    }
  };

  const generateAIRecommendations = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const recommendations = [
        {
          id: 1,
          title: "TypeScript",
          description: "Based on your React skills, TypeScript would enhance your code quality",
          reason: "Complements your frontend skills",
          icon: Code,
          color: 'from-blue-500 to-cyan-500'
        },
        {
          id: 2,
          title: "Docker",
          description: "Containerization is essential for modern deployment",
          reason: "Matches your backend experience",
          icon: Cloud,
          color: 'from-green-500 to-emerald-500'
        },
        {
          id: 3,
          title: "GraphQL",
          description: "Modern API technology that pairs well with React",
          reason: "Extends your full-stack capabilities",
          icon: Zap,
          color: 'from-purple-500 to-pink-500'
        }
      ];
      
      setAiRecommendations(recommendations);
      setIsAnalyzing(false);
      toast.success('AI analysis complete! Check your skill recommendations.');
    }, 2000);
  };

  const syncWithDashboard = () => {
    const verifiedSkills = skills.filter(skill => skill.status === 'verified');
    
    if (verifiedSkills.length === 0) {
      toast.error('No verified skills to sync. Please complete some exams first.');
      return;
    }
    
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      {
        loading: 'Syncing skills with dashboard...',
        success: `Successfully synced ${verifiedSkills.length} verified skills!`,
        error: 'Failed to sync skills',
      }
    );
  };

  // Exam timer effect
  useEffect(() => {
    let timer;
    if (showExamModal && examTimeLeft > 0) {
      timer = setInterval(() => {
        setExamTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (examTimeLeft === 0) {
      submitExam();
    }
    
    return () => clearInterval(timer);
  }, [showExamModal, examTimeLeft]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
      case 'unverified': return 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30';
      case 'needs_improvement': return 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'verified': return <CheckCircle size={16} className="text-green-500" />;
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'unverified': return <X size={16} className="text-red-500" />;
      case 'needs_improvement': return <AlertCircle size={16} className="text-orange-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

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

  return (
    <Layout>
      <Toaster position="top-right" />
      
      {/* Exam Modal */}
      <AnimatePresence>
        {showExamModal && currentExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentExam.skill.name} Skill Assessment
                </h3>
                <div className="flex items-center space-x-2 text-red-500">
                  <Clock size={20} />
                  <span className="font-mono font-bold">
                    {Math.floor(examTimeLeft / 60)}:{(examTimeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Question {currentExam.currentQuestion + 1} of {currentExam.questions.length}
                  </span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {Math.round(((currentExam.currentQuestion + 1) / currentExam.questions.length) * 100)}% Complete
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentExam.questions[currentExam.currentQuestion].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {currentExam.questions[currentExam.currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleExamAnswer(currentExam.currentQuestion, index)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          examAnswers[currentExam.currentQuestion] === index
                            ? 'border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentExam(prev => 
                      prev.currentQuestion > 0 
                        ? { ...prev, currentQuestion: prev.currentQuestion - 1 } 
                        : prev
                    )}
                    disabled={currentExam.currentQuestion === 0}
                    className={`px-6 py-3 rounded-xl font-semibold ${
                      currentExam.currentQuestion === 0
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                  >
                    Previous
                  </motion.button>

                  {currentExam.currentQuestion < currentExam.questions.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentExam(prev => 
                        ({ ...prev, currentQuestion: prev.currentQuestion + 1 })
                      )}
                      disabled={examAnswers[currentExam.currentQuestion] === null}
                      className={`px-6 py-3 rounded-xl font-semibold ${
                        examAnswers[currentExam.currentQuestion] === null
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Next Question
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={submitExam}
                      className="px-6 py-3 rounded-xl font-semibold bg-green-500 text-white hover:bg-green-600"
                    >
                      Submit Exam
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Success Popup */}
      <AnimatePresence>
        {showDownloadSuccess && (
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
                <p className="font-semibold">Portfolio Downloaded!</p>
                <p className="text-green-100 text-sm">Your skills portfolio has been saved as PDF</p>
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
        {/* === Header Section === */}
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
                My Skills 🚀
              </motion.h1>
              <motion.p 
                className="text-blue-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Upload your resume, verify your skills, and sync them with your profile.
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="hidden lg:block"
            >
              <Brain size={48} className="text-amber-400" />
            </motion.div>
          </div>
        </motion.section>

        {/* === Resume Upload Section === */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
            <Upload className="mr-2" size={24} />
            Upload Resume & Extract Skills
          </h2>
          
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
            animate={{ 
              borderColor: isDragging ? '#3B82F6' : isDarkMode ? '#4B5563' : '#D1D5DB',
              backgroundColor: isDragging ? (isDarkMode ? '#1F2937' : '#F3F4F6') : 'transparent'
            }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}
          >
            <FileText size={64} className="mx-auto mb-4 text-gray-400" />
            
            {isExtracting ? (
              <div className="space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
                />
                <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                  Extracting Skills from Resume...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  AI is analyzing your resume to identify your skills
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                  Drag & drop your resume here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                  Supports PDF, DOCX (Max 5MB)
                </p>
                
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <motion.label
                  htmlFor="resume-upload"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl cursor-pointer font-semibold text-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
                >
                  Choose Resume File
                </motion.label>
              </>
            )}
          </motion.div>

          {uploadedFile && !isExtracting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-green-600 dark:text-green-400">
                  <CheckCircle size={20} />
                  <div>
                    <span className="font-medium">Uploaded: {uploadedFile.name}</span>
                    <p className="text-sm text-green-600/70 dark:text-green-400/70">
                      {skills.length} skills extracted successfully!
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, color: '#EF4444' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDeleteFile}
                  className="p-2 text-green-600 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* === Extracted Skills Section === */}
        {skills.length > 0 && (
          <motion.section
            variants={itemVariants}
            className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                <Brain className="mr-2" size={24} />
                Extracted Skills ({skills.length})
              </h2>
              
              <div className="flex-1 max-w-md">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text"
                    placeholder="Search skills..."
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
            </div>
            
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                    } hover:shadow-lg`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(skill.status)} flex items-center space-x-1`}>
                        {getStatusIcon(skill.status)}
                        <span>{skill.status.charAt(0).toUpperCase() + skill.status.slice(1)}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-600 dark:text-gray-400">Category: {skill.category}</span>
                      {skill.score > 0 && (
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          Score: {skill.score}%
                        </span>
                      )}
                    </div>
                    
                    {skill.proficiency > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                          <span className="font-semibold">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full bg-gradient-to-r ${
                              skill.proficiency >= 80 ? 'from-green-500 to-emerald-500' :
                              skill.proficiency >= 60 ? 'from-blue-500 to-cyan-500' :
                              skill.proficiency >= 40 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-pink-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startExam(skill)}
                        className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          skill.status === 'verified'
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : skill.status === 'needs_improvement'
                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {skill.status === 'verified' ? 'View Score' : 
                         skill.status === 'needs_improvement' ? 'Retake Exam' : 'Take Exam'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </motion.section>
        )}

        {/* === Skill Analytics Section === */}
        {skills.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skill Distribution Chart */}
            <motion.section
              variants={itemVariants}
              className="rounded-2xl p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg border border-white/10 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <BarChart3 className="mr-2" size={24} />
                Skill Verification Status
              </h2>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {skillDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
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
            </motion.section>

            {/* Skill Scores Chart */}
            {skillScores.length > 0 && (
              <motion.section
                variants={itemVariants}
                className="rounded-2xl p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg border border-white/10 shadow-xl"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                  <TrendingUp className="mr-2" size={24} />
                  Verified Skill Scores
                </h2>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillScores}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <Tooltip 
                        contentStyle={{ 
                          background: isDarkMode ? '#1F2937' : '#FFFFFF',
                          border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#1F2937'
                        }}
                      />
                      <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                        {skillScores.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                            entry.score >= 80 ? '#10B981' :
                            entry.score >= 60 ? '#3B82F6' :
                            entry.score >= 40 ? '#F59E0B' : '#EF4444'
                          } />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.section>
            )}
          </div>
        )}

        {/* === Quick Insights Section === */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
            <Lightbulb className="mr-2" size={24} />
            Quick Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-4 rounded-xl bg-gradient-to-br ${insight.color} text-white shadow-lg`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <insight.icon size={20} />
                  </div>
                  <p className="text-sm leading-relaxed">{insight.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* === AI Recommendations Section === */}
        {skills.length > 0 && (
          <motion.section
            variants={itemVariants}
            className={`rounded-2xl p-6 shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                <Zap className="mr-2" size={24} />
                AI Skill Recommendations
              </h2>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateAIRecommendations}
                disabled={isAnalyzing}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                  isAnalyzing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Run AI Analysis'
                )}
              </motion.button>
            </div>
            
            {aiRecommendations.length > 0 && (
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiRecommendations.map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`p-4 rounded-xl bg-gradient-to-br ${rec.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <rec.icon size={20} />
                        </div>
                        <h3 className="font-bold text-lg">{rec.title}</h3>
                      </div>
                      <p className="text-sm text-white/90 mb-2">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/70">{rec.reason}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                        >
                          <ArrowRight size={16} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </motion.section>
        )}

        {/* === Sync Section === */}
        {skills.length > 0 && (
          <motion.section
            variants={itemVariants}
            className="rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Sync Your Verified Skills</h2>
                <p className="text-blue-100">
                  Sync verified skills with your Dashboard and prepare for Skill Gap Analysis.
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={syncWithDashboard}
                className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Users size={20} />
                <span>Sync with Dashboard</span>
              </motion.button>
            </div>
          </motion.section>
        )}
      </motion.div>
    </Layout>
  );
}