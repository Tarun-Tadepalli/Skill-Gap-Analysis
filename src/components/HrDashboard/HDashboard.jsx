'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  ClipboardList, 
  TrendingUp,
  Download,
  Plus,
  Search,
  Filter,
  Eye,
  Send,
  BookOpen,
  X,
  Briefcase,
  Mail,
  ChevronRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import Layout, { useTheme } from "../HrDashboard/HLayout";

// Enhanced Mock data structures
const employees = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Frontend Developer',
    department: 'Engineering',
    skillsCount: 12,
    gapPercent: 25,
    trainingsCompleted: 8,
    lastActivity: '2 days ago',
    skills: [
      { name: 'React', before: 70, after: 85 },
      { name: 'TypeScript', before: 60, after: 75 },
      { name: 'Node.js', before: 40, after: 55 }
    ]
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'UX Designer',
    department: 'Design',
    skillsCount: 8,
    gapPercent: 15,
    trainingsCompleted: 12,
    lastActivity: '1 day ago',
    skills: [
      { name: 'Figma', before: 85, after: 95 },
      { name: 'User Research', before: 70, after: 80 }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Backend Developer',
    department: 'Engineering',
    skillsCount: 15,
    gapPercent: 35,
    trainingsCompleted: 5,
    lastActivity: '1 week ago',
    skills: [
      { name: 'Python', before: 65, after: 70 },
      { name: 'AWS', before: 50, after: 60 },
      { name: 'Docker', before: 40, after: 50 }
    ]
  }
];

const departments = [
  { name: 'Engineering', gapPercent: 30, employeesCount: 45, trend: 'up' },
  { name: 'Design', gapPercent: 15, employeesCount: 12, trend: 'down' },
  { name: 'Marketing', gapPercent: 40, employeesCount: 18, trend: 'up' },
  { name: 'Sales', gapPercent: 25, employeesCount: 22, trend: 'down' },
  { name: 'Product', gapPercent: 20, employeesCount: 8, trend: 'down' }
];

const trainingTrend = [
  { week: 'W1', completion: 45, target: 50 },
  { week: 'W2', completion: 52, target: 55 },
  { week: 'W3', completion: 48, target: 60 },
  { week: 'W4', completion: 65, target: 65 },
  { week: 'W5', completion: 70, target: 70 },
  { week: 'W6', completion: 75, target: 75 },
  { week: 'W7', completion: 82, target: 80 },
  { week: 'W8', completion: 78, target: 85 },
  { week: 'W9', completion: 85, target: 85 },
  { week: 'W10', completion: 88, target: 90 },
  { week: 'W11', completion: 90, target: 90 },
  { week: 'W12', completion: 92, target: 95 }
];

const topSkillGaps = [
  { skill: 'React Advanced', count: 23, department: 'Engineering', trend: 'up' },
  { skill: 'Cloud Architecture', count: 18, department: 'Engineering', trend: 'up' },
  { skill: 'Data Analysis', count: 15, department: 'Product', trend: 'down' },
  { skill: 'Leadership', count: 12, department: 'Management', trend: 'up' },
  { skill: 'AI/ML Basics', count: 10, department: 'Engineering', trend: 'up' }
];

// New data for additional charts
const roleData = [
  { name: "Full Stack Dev", employees: 12, growth: 15 },
  { name: "Data Analyst", employees: 8, growth: 25 },
  { name: "UI/UX Designer", employees: 5, growth: 10 },
  { name: "Product Manager", employees: 4, growth: 20 },
  { name: "DevOps Engineer", employees: 3, growth: 30 }
];

const gapData = [
  { name: "Matched", value: 70, color: "#10b981" },
  { name: "Needs Improvement", value: 20, color: "#f59e0b" },
  { name: "Missing", value: 10, color: "#ef4444" }
];

const recentApplications = [
  { id: 1, name: 'Tarun T', role: 'Full Stack Developer', score: 84, status: 'Pending', trend: 'up' },
  { id: 2, name: 'Meena K', role: 'Data Analyst', score: 78, status: 'Needs Review', trend: 'down' },
  { id: 3, name: 'Alex R', role: 'UI/UX Designer', score: 92, status: 'Approved', trend: 'up' },
  { id: 4, name: 'Sarah L', role: 'Product Manager', score: 65, status: 'Pending', trend: 'down' },
  { id: 5, name: 'Mike T', role: 'DevOps Engineer', score: 88, status: 'Pending', trend: 'up' }
];

const quickLinks = [
  { 
    title: 'Create Role', 
    description: 'Add new job positions', 
    icon: Plus, 
    path: '/hr/roles/create', 
    gradient: 'from-orange-500 to-pink-600',
    delay: 0.1
  },
  { 
    title: 'View Employees', 
    description: 'Manage employee profiles', 
    icon: Users, 
    path: '/hr/employees', 
    gradient: 'from-pink-500 to-rose-600',
    delay: 0.2
  },
  { 
    title: 'Reports & Insights', 
    description: 'Analytics and reports', 
    icon: TrendingUp, 
    path: '/hr/reports', 
    gradient: 'from-amber-500 to-orange-600',
    delay: 0.3
  },
  { 
    title: 'Training Programs', 
    description: 'Manage learning paths', 
    icon: BookOpen, 
    path: '/hr/training', 
    gradient: 'from-rose-500 to-pink-500',
    delay: 0.4
  }
];

// Enhanced KPI Card Component with counting animation
const KpiCard = ({ title, value, change, icon: Icon, color, delay = 0 }) => {
  const { isDarkMode } = useTheme();
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const card = document.getElementById(`kpi-${title}`);
    if (card) observer.observe(card);

    return () => observer.disconnect();
  }, [title]);

  useEffect(() => {
    if (isVisible) {
      const target = typeof value === 'string' ? parseInt(value.replace('%', '').replace('+', '')) : value;
      const duration = 2000;
      const steps = 60;
      const stepValue = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  const displayValue = typeof value === 'string' && value.includes('%') 
    ? `${count}%` 
    : typeof value === 'string' && value.includes('+')
    ? `+${count}`
    : count;

  return (
    <motion.div
      id={`kpi-${title}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className={`relative rounded-2xl p-6 shadow-2xl ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      } border-2 ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      } backdrop-blur-sm bg-opacity-95 overflow-hidden group`}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-semibold ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <motion.p 
            key={count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold mt-2 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent"
          >
            {displayValue}
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

// Enhanced Quick Link Card Component
const QuickLinkCard = ({ title, description, icon: Icon, gradient, delay = 0 }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        x: 5,
        transition: { duration: 0.3 }
      }}
      className={`relative rounded-2xl p-6 bg-gradient-to-r ${gradient} text-white shadow-2xl cursor-pointer overflow-hidden group`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-white/80 text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 90 }}
            className="p-3 rounded-xl bg-white/20 backdrop-blur-sm"
          >
            <Icon size={20} className="text-white" />
          </motion.div>
          <motion.div
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            <ChevronRight size={16} className="text-white/70" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Profile Modal
const ProfileModal = ({ employee, isOpen, onClose }) => {
  const { isDarkMode } = useTheme();

  if (!employee) return null;

  const skillData = employee.skills.map(skill => ({
    name: skill.name,
    before: skill.before,
    after: skill.after,
    improvement: skill.after - skill.before
  }));

  return (
    <AnimatePresence>
      {isOpen && (
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
            className={`rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-orange-500/10 to-pink-500/10">
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
            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Skill Progress Chart */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Skill Progress Tracking
                  </h4>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis dataKey="name" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                        <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                        <Tooltip 
                          contentStyle={{ 
                            background: isDarkMode ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '12px',
                            color: isDarkMode ? '#f9fafb' : '#1f2937',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="before" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Before Training" />
                        <Bar dataKey="after" fill="#10b981" radius={[6, 6, 0, 0]} name="After Training" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Skill Distribution & Metrics */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Skill Distribution
                  </h4>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={employee.skills}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="after"
                        >
                          {employee.skills.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={[
                                '#f97316',
                                '#ec4899',
                                '#8b5cf6',
                                '#10b981',
                                '#3b82f6'
                              ][index % 5]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            background: isDarkMode ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '12px',
                            color: isDarkMode ? '#f9fafb' : '#1f2937',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-2xl hover:from-orange-600 hover:to-pink-700 transition-all shadow-lg"
                >
                  <BookOpen size={20} />
                  <span className="font-semibold">Recommend Training</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                >
                  <ClipboardList size={20} />
                  <span className="font-semibold">Assign Program</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all shadow-lg"
                >
                  <Send size={20} />
                  <span className="font-semibold">Send Reminder</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Chart Container Component
const ChartContainer = ({ title, children, className = "", delay = 0 }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className={`rounded-2xl p-6 shadow-2xl ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      } border-2 ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      } backdrop-blur-sm bg-opacity-95 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      {children}
    </motion.div>
  );
};

// Main Dashboard Component
function HrDashboardContent() {
  const { isDarkMode } = useTheme();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleExportReport = () => {
    console.log('Generating PDF report...');
    alert('Report exported successfully!');
  };

  const handleCreateProgram = () => {
    console.log('Opening program creation form...');
    alert('Create Program form would open here');
  };

  const handleViewAllApplications = () => {
    console.log('Navigating to Role Applications page...');
    alert('Navigating to Role Applications page');
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className={`relative rounded-3xl p-8 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        } shadow-2xl border-2 ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        } overflow-hidden`}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 dark:text-white"
            >
              HR Dashboard
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-slate-400 mt-2 text-lg"
            >
              Overview of workforce skills, training & impact.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-700 dark:text-slate-300 mt-2 font-semibold"
            >
              Welcome back, Tarun (HR) 👋
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex space-x-3 mt-6 lg:mt-0"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportReport}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 px-6 py-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-all shadow-lg"
            >
              <Download size={18} />
              <span className="font-semibold">Export Report</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateProgram}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-2xl hover:from-orange-600 hover:to-pink-700 transition-all shadow-lg"
            >
              <Plus size={18} />
              <span className="font-semibold">New Program</span>
            </motion.button>
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
          title="Total Roles"
          value="12"
          change="+2 this month"
          icon={Briefcase}
          color="from-orange-500 to-amber-500"
          delay={0.1}
        />
        <KpiCard
          title="Applications Pending"
          value="8"
          change="+3 today"
          icon={Mail}
          color="from-pink-500 to-rose-500"
          delay={0.2}
        />
        <KpiCard
          title="Employees Trained"
          value="47"
          change="+12%"
          icon={Users}
          color="from-amber-500 to-yellow-500"
          delay={0.3}
        />
        <KpiCard
          title="Avg Skill Match"
          value="82%"
          change="+5%"
          icon={TrendingUp}
          color="from-rose-500 to-pink-500"
          delay={0.4}
        />
      </motion.section>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Department Skill Gap */}
        <ChartContainer 
          title="Department Skill Gap Analysis" 
          className="xl:col-span-2"
          delay={0.5}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departments}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{ 
                    background: isDarkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: isDarkMode ? '#f9fafb' : '#1f2937',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="gapPercent" 
                  fill="#ef4444" 
                  radius={[6, 6, 0, 0]}
                >
                  {departments.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.trend === 'up' ? '#ef4444' : '#f97316'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        {/* Employees per Role */}
        <ChartContainer title="Employees per Role" delay={0.6}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis type="number" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: isDarkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: isDarkMode ? '#f9fafb' : '#1f2937',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="employees" fill="#f97316" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Gap Distribution */}
        <ChartContainer title="Skill Gap Distribution" delay={0.7}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gapData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {gapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: isDarkMode ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: isDarkMode ? '#f9fafb' : '#1f2937',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {gapData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </ChartContainer>

        {/* Top Skill Gaps */}
        <ChartContainer title="Top 5 Skill Gaps" delay={0.8}>
          <div className="space-y-4">
            {topSkillGaps.map((skill, index) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-all cursor-pointer group"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    {skill.skill}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    {skill.department}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {skill.count}
                  </span>
                  {skill.trend === 'up' ? (
                    <ArrowUp size={14} className="text-red-500" />
                  ) : (
                    <ArrowDown size={14} className="text-green-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </ChartContainer>

        {/* Quick Links */}
        <ChartContainer title="Quick Actions" delay={1.0}>
          <div className="space-y-4">
            {quickLinks.map((link, index) => (
              <QuickLinkCard
                key={link.title}
                title={link.title}
                description={link.description}
                icon={link.icon}
                gradient={link.gradient}
                delay={1.1 + index * 0.1}
              />
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Training Completion Trend */}
      <ChartContainer title="Training Completion Trend" delay={1.2}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trainingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="week" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{ 
                  background: isDarkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  color: isDarkMode ? '#f9fafb' : '#1f2937',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="completion" 
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="target" 
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      {/* Recent Applications & Employee Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <ChartContainer title="Recent Applications" delay={1.3}>
          <div className="space-y-4">
            {recentApplications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold">
                    {application.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {application.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      {application.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {application.score}%
                  </span>
                  <p className={`text-sm mt-1 font-medium ${
                    application.status === 'Approved' 
                      ? 'text-green-500' 
                      : application.status === 'Pending'
                      ? 'text-orange-500'
                      : 'text-yellow-500'
                  }`}>
                    {application.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAllApplications}
            className="w-full mt-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 text-gray-700 dark:text-slate-300 rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all font-semibold"
          >
            View All Applications
          </motion.button>
        </ChartContainer>

        {/* Employee Overview */}
        <ChartContainer title="Employee Overview" delay={1.4}>
          <div className="space-y-4">
            {filteredEmployees.map((employee, index) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-all cursor-pointer group"
                onClick={() => setSelectedEmployee(employee)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {employee.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      {employee.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    employee.gapPercent > 30 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : employee.gapPercent > 15
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  }`}>
                    {employee.gapPercent}% gap
                  </span>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                    {employee.trainingsCompleted} trainings
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Floating CTA */}
      <motion.button
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCreateProgram}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-pink-600 text-white p-5 rounded-2xl shadow-2xl hover:from-orange-600 hover:to-pink-700 transition-all z-40"
      >
        <Plus size={28} />
      </motion.button>

      {/* Profile Modal */}
      <ProfileModal
        employee={selectedEmployee}
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}

// Main export with Layout wrapper
export default function HrDashboard() {
  return (
    <Layout>
      <HrDashboardContent />
    </Layout>
  );
}