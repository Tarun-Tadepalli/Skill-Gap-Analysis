'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './Layout';
import {
  Target,
  Search,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Zap,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Brain,
  Rocket,
  Download,
  X,
  ChevronDown,
  Star,
  Clock,
  Award,
  Users,
  BarChart4,
  PieChart as PieChartIcon,
  Filter,
  DownloadCloud,
  Share2,
  Bookmark,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  FileText,
  User,
  Send
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
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function SkillGapAnalysis() {
  const [selectedRole, setSelectedRole] = useState('');
  const [matchScore, setMatchScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeToCloseGap, setTimeToCloseGap] = useState('');
  const [salaryImpact, setSalaryImpact] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('3 months');
  const [animationPlaying, setAnimationPlaying] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const analysisRef = useRef(null);

  // Mock user data from database
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    currentRole: 'Frontend Developer',
    experience: '3 years',
    education: 'Bachelor of Computer Science',
    resume: 'john_doe_resume.pdf',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Python', 'Git', 'SQL']
  };

  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    fullName: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    currentRole: userData.currentRole,
    totalExperience: userData.experience,
    education: userData.education,
    coverLetter: '',
    availability: '2 weeks',
    salaryExpectation: '',
    referralSource: '',
    portfolioUrl: '',
    linkedinUrl: ''
  });

  // Enhanced job roles with more details - ADDED FRONTEND DEVELOPER ROLE
  const jobRoles = [
    {
      id: 1,
      name: 'Frontend Developer',
      category: 'Engineering',
      demand: 'Very High',
      avgSalary: '$85,000 - $130,000',
      growth: '25% (2022-2032)',
      requiredSkills: [
        { name: 'HTML', category: 'Frontend', importance: 'Critical', experience: '2+ years' },
        { name: 'CSS', category: 'Frontend', importance: 'Critical', experience: '2+ years' },
        { name: 'JavaScript', category: 'Frontend', importance: 'Critical', experience: '3+ years' },
        { name: 'React', category: 'Frontend', importance: 'Critical', experience: '2+ years' },
        { name: 'TypeScript', category: 'Frontend', importance: 'High', experience: '1+ years' },
        { name: 'Git', category: 'Tools', importance: 'Critical', experience: '2+ years' },
        { name: 'Responsive Design', category: 'Frontend', importance: 'High', experience: '2+ years' },
        { name: 'UI/UX Principles', category: 'Design', importance: 'Medium', experience: '1+ years' }
      ]
    },
    {
      id: 2,
      name: 'Full Stack Developer',
      category: 'Engineering',
      demand: 'Very High',
      avgSalary: '$95,000 - $145,000',
      growth: '22% (2022-2032)',
      requiredSkills: [
        { name: 'HTML', category: 'Frontend', importance: 'Critical', experience: '2+ years' },
        { name: 'CSS', category: 'Frontend', importance: 'Critical', experience: '2+ years' },
        { name: 'JavaScript', category: 'Frontend', importance: 'Critical', experience: '3+ years' },
        { name: 'React', category: 'Frontend', importance: 'High', experience: '2+ years' },
        { name: 'Node.js', category: 'Backend', importance: 'High', experience: '2+ years' },
        { name: 'MongoDB', category: 'Database', importance: 'Medium', experience: '1+ years' },
        { name: 'Git', category: 'Tools', importance: 'Critical', experience: '2+ years' },
        { name: 'TypeScript', category: 'Frontend', importance: 'Medium', experience: '1+ years' },
        { name: 'AWS', category: 'Cloud', importance: 'Medium', experience: '1+ years' },
        { name: 'Docker', category: 'DevOps', importance: 'Medium', experience: '1+ years' }
      ]
    },
    {
      id: 3,
      name: 'Data Analyst',
      category: 'Data Science',
      demand: 'High',
      avgSalary: '$65,000 - $110,000',
      growth: '25% (2022-2032)',
      requiredSkills: [
        { name: 'Python', category: 'Programming', importance: 'Critical', experience: '2+ years' },
        { name: 'Pandas', category: 'Data Analysis', importance: 'High', experience: '1+ years' },
        { name: 'SQL', category: 'Database', importance: 'Critical', experience: '2+ years' },
        { name: 'Data Visualization', category: 'Visualization', importance: 'High', experience: '1+ years' },
        { name: 'Statistics', category: 'Mathematics', importance: 'High', experience: '2+ years' },
        { name: 'Excel', category: 'Tools', importance: 'Medium', experience: '2+ years' },
        { name: 'Tableau', category: 'Visualization', importance: 'Medium', experience: '1+ years' },
        { name: 'R', category: 'Programming', importance: 'Medium', experience: '1+ years' }
      ]
    },
    {
      id: 4,
      name: 'ML Engineer',
      category: 'Artificial Intelligence',
      demand: 'Very High',
      avgSalary: '$120,000 - $200,000',
      growth: '35% (2022-2032)',
      requiredSkills: [
        { name: 'Python', category: 'Programming', importance: 'Critical', experience: '3+ years' },
        { name: 'Machine Learning', category: 'AI/ML', importance: 'Critical', experience: '2+ years' },
        { name: 'TensorFlow', category: 'Frameworks', importance: 'High', experience: '1+ years' },
        { name: 'PyTorch', category: 'Frameworks', importance: 'High', experience: '1+ years' },
        { name: 'SQL', category: 'Database', importance: 'Medium', experience: '2+ years' },
        { name: 'Data Preprocessing', category: 'Data Engineering', importance: 'High', experience: '2+ years' },
        { name: 'Deep Learning', category: 'AI/ML', importance: 'High', experience: '1+ years' },
        { name: 'Statistics', category: 'Mathematics', importance: 'Critical', experience: '2+ years' }
      ]
    }
  ];

  // Enhanced user skills with verification status
  const userVerifiedSkills = [
    { id: 1, name: 'React', category: 'Frontend', proficiency: 85, level: 'Expert', verified: true, lastVerified: '2024-01-15' },
    { id: 2, name: 'Node.js', category: 'Backend', proficiency: 78, level: 'Advanced', verified: true, lastVerified: '2024-01-10' },
    { id: 3, name: 'Python', category: 'Programming', proficiency: 92, level: 'Expert', verified: true, lastVerified: '2024-01-20' },
    { id: 4, name: 'JavaScript', category: 'Frontend', proficiency: 88, level: 'Expert', verified: true, lastVerified: '2024-01-08' },
    { id: 5, name: 'HTML', category: 'Frontend', proficiency: 90, level: 'Expert', verified: true, lastVerified: '2024-01-05' },
    { id: 6, name: 'CSS', category: 'Frontend', proficiency: 75, level: 'Advanced', verified: true, lastVerified: '2024-01-12' },
    { id: 7, name: 'Git', category: 'Tools', proficiency: 70, level: 'Intermediate', verified: true, lastVerified: '2024-01-18' },
    { id: 8, name: 'SQL', category: 'Database', proficiency: 65, level: 'Intermediate', verified: true, lastVerified: '2024-01-14' },
    { id: 9, name: 'TypeScript', category: 'Frontend', proficiency: 72, level: 'Intermediate', verified: true, lastVerified: '2024-01-22' },
    { id: 10, name: 'Responsive Design', category: 'Frontend', proficiency: 80, level: 'Advanced', verified: true, lastVerified: '2024-01-25' }
  ];

  const [comparisonData, setComparisonData] = useState([]);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [partialMatchSkills, setPartialMatchSkills] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [marketData, setMarketData] = useState([]);

  // Enhanced analysis function
  const analyzeFit = () => {
    if (!selectedRole) return;
    
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    const role = jobRoles.find(r => r.name === selectedRole);
    
    setTimeout(() => {
      const matched = [];
      const missing = [];
      const partialMatch = [];
      const comparison = [];

      role.requiredSkills.forEach(reqSkill => {
        const userSkill = userVerifiedSkills.find(s => s.name === reqSkill.name);
        
        if (userSkill) {
          const gap = Math.max(0, 80 - userSkill.proficiency); // Assuming 80% is required
          if (gap === 0) {
            matched.push({ ...reqSkill, userSkill, gap });
          } else {
            partialMatch.push({ ...reqSkill, userSkill, gap });
          }
          comparison.push({
            skill: reqSkill.name,
            category: reqSkill.category,
            required: true,
            employeeHas: true,
            status: gap === 0 ? 'matched' : 'partial',
            proficiency: userSkill.proficiency,
            requiredProficiency: 80,
            gap: gap,
            importance: reqSkill.importance,
            experience: reqSkill.experience
          });
        } else {
          missing.push(reqSkill);
          comparison.push({
            skill: reqSkill.name,
            category: reqSkill.category,
            required: true,
            employeeHas: false,
            status: 'missing',
            proficiency: 0,
            requiredProficiency: 80,
            gap: 80,
            importance: reqSkill.importance,
            experience: reqSkill.experience
          });
        }
      });

      const score = Math.round((matched.length / role.requiredSkills.length) * 100);
      
      // Enhanced chart data
      const chartData = [
        { name: 'Expert Match', value: matched.length, color: '#10B981' },
        { name: 'Needs Improvement', value: partialMatch.length, color: '#F59E0B' },
        { name: 'Missing', value: missing.length, color: '#EF4444' }
      ];

      // Progress data for line chart
      const progressData = [
        { month: 'Jan', current: score, target: 100 },
        { month: 'Feb', current: Math.min(100, score + 15), target: 100 },
        { month: 'Mar', current: Math.min(100, score + 30), target: 100 },
        { month: 'Apr', current: Math.min(100, score + 45), target: 100 },
        { month: 'May', current: 100, target: 100 }
      ];

      // Market data
      const marketData = [
        { skill: 'React', demand: 95, salary: 120 },
        { skill: 'Node.js', demand: 88, salary: 110 },
        { skill: 'Python', demand: 92, salary: 115 },
        { skill: 'AWS', demand: 85, salary: 125 }
      ];

      setComparisonData(comparison);
      setMatchedSkills(matched);
      setMissingSkills(missing);
      setPartialMatchSkills(partialMatch);
      setChartData(chartData);
      setProgressData(progressData);
      setMarketData(marketData);
      setMatchScore(score);
      
      // Calculate additional insights
      calculateTimeToCloseGap(partialMatch.length + missing.length);
      calculateSalaryImpact(score);
      
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const calculateTimeToCloseGap = (gapCount) => {
    const months = Math.ceil(gapCount * 1.5); // 1.5 months per skill
    setTimeToCloseGap(`${months} months`);
  };

  const calculateSalaryImpact = (score) => {
    const baseSalary = 80000;
    const impact = Math.round((score / 100) * 30000);
    setSalaryImpact(`$${impact} potential increase`);
  };

  const resetAnalysis = () => {
    setSelectedRole('');
    setAnalysisComplete(false);
    setMatchScore(0);
    setComparisonData([]);
    setMatchedSkills([]);
    setMissingSkills([]);
    setPartialMatchSkills([]);
    setChartData([]);
    setShowDetails(false);
    setShowApplicationForm(false);
    setApplicationSubmitted(false);
  };

  const getRecommendations = () => {
    const missingSkillsParam = encodeURIComponent(JSON.stringify(missingSkills.map(s => s.name)));
    window.location.href = `/recommendations?missingSkills=${missingSkillsParam}`;
  };

  const handleApplyForRole = () => {
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setApplicationSubmitted(true);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const exportToPDF = async () => {
    if (!analysisRef.current) return;

    try {
      const canvas = await html2canvas(analysisRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`skill-gap-analysis-${selectedRole.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback: Create a simple PDF with text
      const pdf = new jsPDF();
      pdf.text(`Skill Gap Analysis for ${selectedRole}`, 20, 20);
      pdf.text(`Match Score: ${matchScore}%`, 20, 40);
      pdf.text(`Analysis Date: ${new Date().toLocaleDateString()}`, 20, 60);
      pdf.save(`skill-gap-analysis-${selectedRole.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'matched': return <CheckCircle size={16} className="text-green-500" />;
      case 'partial': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'missing': return <X size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'matched': return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30';
      case 'partial': return 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30';
      case 'missing': return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'matched': return 'Expert Match';
      case 'partial': return 'Needs Improvement';
      case 'missing': return 'Missing';
      default: return 'Unknown';
    }
  };

  const getImportanceColor = (importance) => {
    switch(importance) {
      case 'Critical': return 'text-red-500 bg-red-500/10';
      case 'High': return 'text-amber-500 bg-amber-500/10';
      case 'Medium': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
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

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 p-6"
        ref={analysisRef}
      >
        {/* === SIMPLIFIED Header Section === */}
        <motion.section
          variants={itemVariants}
          className="rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-2xl lg:text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Skill Gap Analysis
              </motion.h1>
              <motion.p 
                className="text-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Compare your skills with job roles and identify gaps to improve
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="hidden lg:block"
            >
              <Target size={40} className="text-amber-400" />
            </motion.div>
          </div>
        </motion.section>

        {/* === Role Selection with Enhanced UI === */}
        <motion.section
          variants={itemVariants}
          className={`rounded-2xl p-6 shadow-2xl border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                <Target className="mr-3" size={28} />
                Select Your Target Role
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Choose Career Path
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 appearance-none font-medium ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                      } focus:outline-none`}
                    >
                      <option value="">Select a role...</option>
                      {jobRoles.map(role => (
                        <option key={role.id} value={role.name}>
                          {role.name} - {role.category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown 
                      size={24} 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                    />
                  </div>
                </div>

                {selectedRole && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Role Overview
                    </label>
                    <div className={`p-4 rounded-xl border-2 ${
                      isDarkMode ? 'border-blue-500/30 bg-blue-500/10' : 'border-blue-200 bg-blue-50'
                    }`}>
                      {jobRoles.filter(role => role.name === selectedRole).map(role => (
                        <div key={role.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Demand:</span>
                            <span className={`font-bold ${
                              role.demand === 'Very High' ? 'text-green-500' : 'text-amber-500'
                            }`}>
                              {role.demand}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Avg Salary:</span>
                            <span className="font-bold text-blue-500">{role.avgSalary}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Growth:</span>
                            <span className="font-bold text-green-500">{role.growth}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={analyzeFit}
              disabled={!selectedRole || isAnalyzing}
              className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl ${
                !selectedRole || isAnalyzing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-3xl'
              } text-white`}
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>AI Analysis in Progress...</span>
                </>
              ) : (
                <>
                  <Zap size={24} />
                  <span>Launch Deep Analysis</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.section>

        {analysisComplete && (
          <>
            {/* === Enhanced Analytics Dashboard === */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Match Score Card */}
              <motion.section
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={`rounded-2xl p-6 shadow-2xl border-2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/30' 
                    : 'bg-gradient-to-br from-white to-blue-50 border-blue-200'
                }`}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                  <Award className="mr-3 text-amber-500" size={24} />
                  Career Readiness Score
                </h3>
                
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="w-40 h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <motion.span 
                        className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        {matchScore}%
                      </motion.span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Match Score
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 w-full">
                    {chartData.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-center p-3 rounded-xl bg-white/10 dark:bg-gray-700/50 backdrop-blur-sm"
                      >
                        <div className="text-2xl font-bold" style={{ color: item.color }}>
                          {item.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          {item.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Progress Timeline */}
              <motion.section
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={`rounded-2xl p-6 shadow-2xl border-2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/30' 
                    : 'bg-gradient-to-br from-white to-green-50 border-green-200'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                    <TrendingUp className="mr-3 text-green-500" size={24} />
                    Progress Timeline
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAnimationPlaying(!animationPlaying)}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                  >
                    {animationPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </motion.button>
                </div>
                
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis dataKey="month" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="current" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                        strokeWidth={3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Time to Close Gap:</span>
                    <span className="font-bold text-blue-500">{timeToCloseGap}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Salary Impact:</span>
                    <span className="font-bold text-green-500">{salaryImpact}</span>
                  </div>
                </div>
              </motion.section>

              {/* Market Insights */}
              <motion.section
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={`rounded-2xl p-6 shadow-2xl border-2 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500/30' 
                    : 'bg-gradient-to-br from-white to-purple-50 border-purple-200'
                }`}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                  <BarChart4 className="mr-3 text-purple-500" size={24} />
                  Market Insights
                </h3>
                
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis dataKey="skill" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={12} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="demand" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Demand %" />
                      <Bar dataKey="salary" fill="#10B981" radius={[4, 4, 0, 0]} name="Salary Impact" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Skill Demand</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Salary Impact</span>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* === Enhanced Comparison Table === */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-2xl p-6 shadow-2xl border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white mb-4 lg:mb-0">
                  <Brain className="mr-3" size={28} />
                  Detailed Skills Comparison
                </h2>
                
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDetails(!showDetails)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {showDetails ? <EyeOff size={18} /> : <Eye size={18} />}
                    <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportToPDF}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
                  >
                    <DownloadCloud size={18} />
                    <span>Export PDF</span>
                  </motion.button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead>
                    <tr className={`${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <th className="text-left py-4 px-6 font-bold text-gray-900 dark:text-white">
                        Skill
                      </th>
                      <th className="text-left py-4 px-6 font-bold text-gray-900 dark:text-white">
                        Category
                      </th>
                      <th className="text-center py-4 px-6 font-bold text-gray-900 dark:text-white">
                        Importance
                      </th>
                      {showDetails && (
                        <th className="text-center py-4 px-6 font-bold text-gray-900 dark:text-white">
                          Experience Needed
                        </th>
                      )}
                      <th className="text-center py-4 px-6 font-bold text-gray-900 dark:text-white">
                        Your Level
                      </th>
                      <th className="text-center py-4 px-6 font-bold text-gray-900 dark:text-white">
                        Status
                      </th>
                      <th className="text-center py-4 px-6 font-bold text-gray-900 dark:text-white">
                        Gap
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {comparisonData.map((skill, index) => (
                        <motion.tr
                          key={skill.skill}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ 
                            scale: 1.01,
                            backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.8)'
                          }}
                          className={`border-b ${
                            isDarkMode ? 'border-gray-700' : 'border-gray-200'
                          } transition-all duration-200`}
                        >
                          <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                            {skill.skill}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}>
                              {skill.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImportanceColor(skill.importance)}`}>
                              {skill.importance}
                            </span>
                          </td>
                          {showDetails && (
                            <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                              {skill.experience}
                            </td>
                          )}
                          <td className="py-4 px-6 text-center">
                            {skill.employeeHas ? (
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-20 bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                                  <motion.div
                                    className={`h-2 rounded-full ${
                                      skill.proficiency >= 80 ? 'bg-green-500' :
                                      skill.proficiency >= 60 ? 'bg-amber-500' : 'bg-red-500'
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.proficiency}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                  {skill.proficiency}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-red-500 font-medium">Not Acquired</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(skill.status)}`}>
                              {getStatusIcon(skill.status)}
                              <span>{getStatusText(skill.status)}</span>
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            {skill.gap > 0 ? (
                              <span className={`font-bold ${
                                skill.gap <= 20 ? 'text-amber-500' : 'text-red-500'
                              }`}>
                                {skill.gap}%
                              </span>
                            ) : (
                              <span className="text-green-500 font-bold">✓ Ready</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* === Enhanced Action Section === */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-2xl"
            >
              <div className="text-center space-y-6">
                <motion.h3 
                  className="text-3xl font-bold"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  {matchScore >= 70 
                    ? "🎉 You Can Apply for This Role!" 
                    : matchScore >= 50 
                    ? "📈 Strong Foundation - Keep Improving!" 
                    : "🎯 Time to Level Up!"}
                </motion.h3>
                
                <motion.p 
                  className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {matchScore >= 70
                    ? "Congratulations! Your skills meet the requirements for this role. You can apply now and continue improving while you search."
                    : matchScore >= 50
                    ? "You're making good progress! Focus on the key missing skills to become a strong candidate for this role."
                    : "This role presents a great growth opportunity. Start with foundational skills and build progressively toward your career goals."}
                </motion.p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  {matchScore >= 70 ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleApplyForRole}
                        className="flex items-center space-x-3 bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-2xl"
                      >
                        <Briefcase size={24} />
                        <span>Apply for This Role</span>
                        <ArrowRight size={20} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={getRecommendations}
                        className="flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
                      >
                        <Rocket size={24} />
                        <span>Get Personalized Learning Path</span>
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={getRecommendations}
                      className="flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
                    >
                      <Rocket size={24} />
                      <span>Get Personalized Learning Path</span>
                      <ArrowRight size={20} />
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetAnalysis}
                    className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30"
                  >
                    <RotateCcw size={20} />
                    <span>Analyze Another Role</span>
                  </motion.button>
                </div>
              </div>
            </motion.section>
          </>
        )}

        {!analysisComplete && selectedRole && (
          /* === Enhanced Loading State === */
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-2xl p-12 text-center shadow-2xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
              className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
            />
            <motion.h3 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              AI Analysis in Progress
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Comparing your {userVerifiedSkills.length} verified skills with {selectedRole} requirements
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-2 bg-blue-500 rounded-full mx-auto"
            />
          </motion.section>
        )}
      </motion.div>

      {/* Application Form Popup */}
      <AnimatePresence>
        {showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {applicationSubmitted ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle size={40} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for applying for the {selectedRole} position. We've received your application and will review it carefully.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowApplicationForm(false)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all"
                    >
                      Close
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetAnalysis}
                      className="px-6 py-3 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-all"
                    >
                      Analyze Another Role
                    </motion.button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit}>
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Apply for {selectedRole}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowApplicationForm(false)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Please review and complete your application details
                    </p>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={applicationForm.fullName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={applicationForm.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={applicationForm.phone}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={applicationForm.location}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Role *
                        </label>
                        <input
                          type="text"
                          name="currentRole"
                          value={applicationForm.currentRole}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Total Experience *
                        </label>
                        <input
                          type="text"
                          name="totalExperience"
                          value={applicationForm.totalExperience}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Highest Education *
                        </label>
                        <input
                          type="text"
                          name="education"
                          value={applicationForm.education}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Salary Expectation *
                        </label>
                        <input
                          type="text"
                          name="salaryExpectation"
                          value={applicationForm.salaryExpectation}
                          onChange={handleInputChange}
                          placeholder="e.g., $90,000 - $110,000"
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Availability to Start *
                        </label>
                        <select
                          name="availability"
                          value={applicationForm.availability}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        >
                          <option value="Immediately">Immediately</option>
                          <option value="1 week">1 week</option>
                          <option value="2 weeks">2 weeks</option>
                          <option value="1 month">1 month</option>
                          <option value="2 months">2 months</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          How did you hear about us?
                        </label>
                        <select
                          name="referralSource"
                          value={applicationForm.referralSource}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        >
                          <option value="">Select an option</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Indeed">Indeed</option>
                          <option value="Company Website">Company Website</option>
                          <option value="Employee Referral">Employee Referral</option>
                          <option value="Job Fair">Job Fair</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Portfolio URL
                        </label>
                        <input
                          type="url"
                          name="portfolioUrl"
                          value={applicationForm.portfolioUrl}
                          onChange={handleInputChange}
                          placeholder="https://yourportfolio.com"
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedinUrl"
                          value={applicationForm.linkedinUrl}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cover Letter *
                        </label>
                        <textarea
                          name="coverLetter"
                          value={applicationForm.coverLetter}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        * Required fields
                      </div>
                      <div className="flex gap-4">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowApplicationForm(false)}
                          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all"
                        >
                          <Send size={18} />
                          <span>Submit Application</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}