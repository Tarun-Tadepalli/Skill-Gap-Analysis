'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Search,
  Filter,
  Eye,
  X,
  Mail,
  Calendar,
  Award,
  BookOpen,
  ChevronRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Layout, { useTheme } from "../HrDashboard/HLayout";

// Mock data structure
const mockEmployees = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Senior Frontend Developer",
    department: "Engineering",
    skillMatch: 92,
    strengths: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3"],
    weaknesses: ["Node.js", "AWS"],
    status: "Excellent",
    joinDate: "2022-03-15",
    lastTraining: "2024-01-10",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 92 },
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "Node.js", level: 65 },
      { name: "AWS", level: 45 }
    ]
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Backend Developer",
    department: "Engineering",
    skillMatch: 78,
    strengths: ["Node.js", "Python", "SQL"],
    weaknesses: ["React", "TypeScript"],
    status: "Moderate",
    joinDate: "2021-08-22",
    lastTraining: "2023-11-05",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 75 },
      { name: "React", level: 60 },
      { name: "TypeScript", level: 55 }
    ]
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@company.com",
    role: "UX Designer",
    department: "Design",
    skillMatch: 85,
    strengths: ["Figma", "UI/UX Design", "Prototyping"],
    weaknesses: ["User Research", "Adobe Creative Suite"],
    status: "Excellent",
    joinDate: "2023-01-10",
    lastTraining: "2024-02-01",
    skills: [
      { name: "Figma", level: 90 },
      { name: "UI/UX Design", level: 88 },
      { name: "Prototyping", level: 82 },
      { name: "User Research", level: 70 },
      { name: "Adobe Creative Suite", level: 65 }
    ]
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com",
    role: "Data Analyst",
    department: "Analytics",
    skillMatch: 65,
    strengths: ["Excel", "Statistics"],
    weaknesses: ["Python", "SQL", "Data Visualization"],
    status: "Needs Improvement",
    joinDate: "2022-11-30",
    lastTraining: "2023-09-15",
    skills: [
      { name: "Excel", level: 75 },
      { name: "Statistics", level: 70 },
      { name: "Python", level: 55 },
      { name: "SQL", level: 50 },
      { name: "Data Visualization", level: 45 }
    ]
  },
  {
    id: 5,
    name: "Priya Patel",
    email: "priya.patel@company.com",
    role: "Product Manager",
    department: "Product",
    skillMatch: 88,
    strengths: ["Product Strategy", "Agile", "Stakeholder Management"],
    weaknesses: ["Data Analysis", "Technical Writing"],
    status: "Excellent",
    joinDate: "2021-05-14",
    lastTraining: "2024-01-20",
    skills: [
      { name: "Product Strategy", level: 90 },
      { name: "Agile", level: 85 },
      { name: "Stakeholder Management", level: 88 },
      { name: "Data Analysis", level: 65 },
      { name: "Technical Writing", level: 60 }
    ]
  },
  {
    id: 6,
    name: "David Kim",
    email: "david.kim@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    skillMatch: 82,
    strengths: ["AWS", "Docker", "Kubernetes"],
    weaknesses: ["Python", "Monitoring"],
    status: "Moderate",
    joinDate: "2020-09-08",
    lastTraining: "2023-12-10",
    skills: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 78 },
      { name: "Python", level: 70 },
      { name: "Monitoring", level: 65 }
    ]
  }
];

// KPI Card Component
const KpiCard = ({ title, value, change, icon: Icon, color, delay = 0 }) => {
  const { isDarkMode } = useTheme();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(value);
    }, 1000 + delay * 200);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3 }
      }}
      className={`rounded-2xl p-6 shadow-2xl ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      } border-2 ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      } backdrop-blur-sm bg-opacity-95`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-semibold ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <motion.p 
            key={count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {count}
          </motion.p>
          <div className="flex items-center mt-2">
            {change.includes('+') ? (
              <ArrowUp size={14} className="text-green-500 mr-1" />
            ) : change.includes('-') ? (
              <ArrowDown size={14} className="text-red-500 mr-1" />
            ) : null}
            <p className={`text-sm font-medium ${
              change.includes('+') ? 'text-green-500' : 
              change.includes('-') ? 'text-red-500' : 'text-gray-500'
            }`}>
              {change}
            </p>
          </div>
        </div>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`p-4 rounded-2xl bg-gradient-to-r ${color} shadow-lg`}
        >
          <Icon size={28} className="text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Progress Bar Component
const ProgressBar = ({ value, color }) => {
  return (
    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`h-3 rounded-full ${color}`}
      />
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Excellent':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-600 dark:text-green-400',
          label: 'Excellent'
        };
      case 'Needs Improvement':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-600 dark:text-red-400',
          label: 'Needs Improvement'
        };
      default:
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-600 dark:text-yellow-400',
          label: 'Moderate'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

// Employee Details Modal Component
const EmployeeDetailsModal = ({ employee, isOpen, onClose }) => {
  const { isDarkMode } = useTheme();

  if (!isOpen || !employee) return null;

  return (
    <AnimatePresence>
      {isOpen && employee && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className={`rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {employee.name}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 mt-1">
                    {employee.role} • {employee.department}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Employee Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-gray-400" size={20} />
                      <span className="text-gray-900 dark:text-white">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-gray-400" size={20} />
                      <span className="text-gray-900 dark:text-white">
                        Joined {new Date(employee.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="text-gray-400" size={20} />
                      <span className="text-gray-900 dark:text-white">
                        Last Training: {new Date(employee.lastTraining).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skill Match */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Skill Analytics
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-slate-300">Overall Match</span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {employee.skillMatch}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={employee.skillMatch} 
                        color={employee.skillMatch >= 85 ? "bg-green-500" : employee.skillMatch >= 70 ? "bg-yellow-500" : "bg-red-500"}
                      />
                    </div>
                    <StatusBadge status={employee.status} />
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Skills Breakdown
                </h4>
                <div className="space-y-4">
                  {employee.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-slate-300">{skill.name}</span>
                        <span className="text-gray-900 dark:text-white font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={skill.level} 
                        color={skill.level >= 80 ? "bg-green-500" : skill.level >= 60 ? "bg-yellow-500" : "bg-red-500"}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-600 dark:text-green-400 mb-3">
                    Strengths ({employee.strengths.length})
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {employee.strengths.map((strength, index) => (
                      <motion.span
                        key={strength}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm"
                      >
                        {strength}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-red-600 dark:text-red-400 mb-3">
                    Weaknesses ({employee.weaknesses.length})
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {employee.weaknesses.map((weakness, index) => (
                      <motion.span
                        key={weakness}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm"
                      >
                        {weakness}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                >
                  <BookOpen size={18} />
                  <span>Recommend Training</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all font-semibold"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Component
function EmployeeAnalyticsContent() {
  const { isDarkMode } = useTheme();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [matchRangeFilter, setMatchRangeFilter] = useState('All');

  // Load employees data
  useEffect(() => {
    // In real app, this would be an API call
    setEmployees(mockEmployees);
  }, []);

  // Calculate analytics data
  const totalEmployees = employees.length;
  const avgSkillMatch = employees.length > 0 
    ? Math.round(employees.reduce((sum, emp) => sum + emp.skillMatch, 0) / employees.length)
    : 0;
  const highPerformers = employees.filter(emp => emp.skillMatch >= 85).length;
  const needsUpskilling = employees.filter(emp => emp.skillMatch < 70).length;

  // Chart data
  const skillMatchDistribution = [
    { range: '60-70%', count: employees.filter(emp => emp.skillMatch >= 60 && emp.skillMatch < 70).length },
    { range: '70-80%', count: employees.filter(emp => emp.skillMatch >= 70 && emp.skillMatch < 80).length },
    { range: '80-90%', count: employees.filter(emp => emp.skillMatch >= 80 && emp.skillMatch < 90).length },
    { range: '90-100%', count: employees.filter(emp => emp.skillMatch >= 90).length }
  ];

  const topSkillsData = [
    { skill: 'React', employees: 12 },
    { skill: 'JavaScript', employees: 10 },
    { skill: 'Python', employees: 8 },
    { skill: 'SQL', employees: 7 },
    { skill: 'AWS', employees: 6 }
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;
    
    let matchesRange = true;
    if (matchRangeFilter !== 'All') {
      const [min, max] = matchRangeFilter.split('-').map(Number);
      matchesRange = employee.skillMatch >= min && employee.skillMatch <= max;
    }

    return matchesSearch && matchesDepartment && matchesStatus && matchesRange;
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`rounded-3xl p-8 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        } shadow-2xl border-2 ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Employee Analytics
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-2 text-lg">
              Analyze workforce skill readiness and identify training needs.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4 mt-4 lg:mt-0"
          >
            <div className={`px-4 py-2 rounded-2xl ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <span className="text-gray-600 dark:text-slate-400">Total Employees: </span>
              <span className="font-bold text-gray-900 dark:text-white">{totalEmployees}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* KPI Cards */}
      <motion.section
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <KpiCard
          title="Total Employees"
          value={totalEmployees}
          change="+5 this month"
          icon={Users}
          color="from-blue-500 to-cyan-500"
          delay={0.1}
        />
        <KpiCard
          title="Avg Skill Match"
          value={avgSkillMatch}
          change="+3%"
          icon={TrendingUp}
          color="from-purple-500 to-pink-500"
          delay={0.2}
        />
        <KpiCard
          title="High Performers"
          value={highPerformers}
          change="+2"
          icon={Target}
          color="from-green-500 to-emerald-500"
          delay={0.3}
        />
        <KpiCard
          title="Needs Upskilling"
          value={needsUpskilling}
          change="-1"
          icon={TrendingDown}
          color="from-orange-500 to-amber-500"
          delay={0.4}
        />
      </motion.section>

      {/* Filters Section */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        className={`rounded-3xl p-6 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        } shadow-2xl border-2 ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Analytics">Analytics</option>
              <option value="Product">Product</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="All">All Status</option>
              <option value="Excellent">Excellent</option>
              <option value="Moderate">Moderate</option>
              <option value="Needs Improvement">Needs Improvement</option>
            </select>

            <select
              value={matchRangeFilter}
              onChange={(e) => setMatchRangeFilter(e.target.value)}
              className="px-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="All">All Ranges</option>
              <option value="60-70">60-70%</option>
              <option value="70-80">70-80%</option>
              <option value="80-90">80-90%</option>
              <option value="90-100">90-100%</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Match Distribution */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6 }}
          className={`rounded-3xl p-6 ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          } shadow-2xl border-2 ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Skill Match Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillMatchDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="range" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{ 
                    background: isDarkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: isDarkMode ? '#f9fafb' : '#1f2937'
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Top Skills */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.7 }}
          className={`rounded-3xl p-6 ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          } shadow-2xl border-2 ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Top Skills Across Company
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topSkillsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="employees"
                >
                  {topSkillsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: isDarkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: isDarkMode ? '#f9fafb' : '#1f2937'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {topSkillsData.map((skill, index) => (
              <div key={skill.skill} className="flex items-center space-x-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  {skill.skill}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Employee Table */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.8 }}
        className={`rounded-3xl p-8 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        } shadow-2xl border-2 ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Employee Analytics
            </h2>
            <p className="text-gray-600 dark:text-slate-400">
              Detailed skill analysis for each employee
            </p>
          </div>
          <div className="text-sm text-gray-600 dark:text-slate-400">
            Showing {filteredEmployees.length} of {totalEmployees} employees
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No employees found
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              Try adjusting your search or filters
            </p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Employee</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Role</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Department</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Skill Match</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Strengths</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Weaknesses</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(243, 244, 246, 0.5)',
                      transition: { duration: 0.2 }
                    }}
                    className="border-b border-gray-100 dark:border-slate-800"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {employee.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {employee.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-slate-400">
                      {employee.role}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                        {employee.department}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-slate-400">{employee.skillMatch}%</span>
                        </div>
                        <ProgressBar 
                          value={employee.skillMatch} 
                          color={employee.skillMatch >= 85 ? "bg-green-500" : employee.skillMatch >= 70 ? "bg-yellow-500" : "bg-red-500"}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {employee.strengths.slice(0, 2).map((strength, idx) => (
                          <span key={strength} className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs">
                            {strength}
                          </span>
                        ))}
                        {employee.strengths.length > 2 && (
                          <span className="text-xs text-gray-500">+{employee.strengths.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {employee.weaknesses.slice(0, 2).map((weakness, idx) => (
                          <span key={weakness} className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs">
                            {weakness}
                          </span>
                        ))}
                        {employee.weaknesses.length > 2 && (
                          <span className="text-xs text-gray-500">+{employee.weaknesses.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={employee.status} />
                    </td>
                    <td className="py-4 px-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedEmployee(employee)}
                        className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      {/* Employee Details Modal */}
      <EmployeeDetailsModal
        employee={selectedEmployee}
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}

// Main export with Layout wrapper
export default function EmployeeAnalytics() {
  return (
    <Layout>
      <EmployeeAnalyticsContent />
    </Layout>
  );
}