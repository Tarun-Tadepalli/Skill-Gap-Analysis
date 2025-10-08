'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from './Layout';
import { 
  Brain, 
  Target, 
  Clock, 
  CheckCircle,
  Activity,
  Zap,
  Star,
  Award,
  Code,
  Database,
  Cloud,
  Shield,
  Users,
  BarChart3,
  PieChart,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { 
      label: 'Total Skills Added', 
      value: '24', 
      change: '+12%',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      trend: 'up'
    },
    { 
      label: 'Roles You Fit', 
      value: '8', 
      change: '+33%',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    { 
      label: 'Pending Skills', 
      value: '5', 
      change: '-8%',
      icon: Clock,
      color: 'from-orange-500 to-amber-500',
      trend: 'down'
    },
    { 
      label: 'Completed Trainings', 
      value: '12', 
      change: '+25%',
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500',
      trend: 'up'
    }
  ];

  const skillsData = [
    { name: 'React', level: 85, icon: Code, color: '#61DAFB' },
    { name: 'Node.js', level: 78, icon: Database, color: '#68A063' },
    { name: 'Python', level: 92, icon: Brain, color: '#3776AB' },
    { name: 'AWS', level: 65, icon: Cloud, color: '#FF9900' },
    { name: 'Security', level: 70, icon: Shield, color: '#4ADE80' },
  ];

  const progressData = [
    { month: 'Jan', progress: 40 },
    { month: 'Feb', progress: 55 },
    { month: 'Mar', progress: 65 },
    { month: 'Apr', progress: 78 },
    { month: 'May', progress: 85 },
    { month: 'Jun', progress: 92 },
  ];

  const roleMatchData = [
    { name: 'Frontend', value: 85, color: '#3B82F6' },
    { name: 'Backend', value: 70, color: '#10B981' },
    { name: 'Full Stack', value: 78, color: '#8B5CF6' },
    { name: 'DevOps', value: 60, color: '#F59E0B' },
  ];

  const activities = [
    { 
      action: 'Added skill', 
      detail: 'React.js', 
      time: '2 hours ago',
      icon: Code,
      type: 'success'
    },
    { 
      action: 'Viewed role', 
      detail: 'Frontend Developer', 
      time: '4 hours ago',
      icon: Users,
      type: 'info'
    },
    { 
      action: 'Completed training', 
      detail: 'Advanced CSS', 
      time: '1 day ago',
      icon: Award,
      type: 'success'
    },
    { 
      action: 'Skill assessment', 
      detail: 'Node.js Expert', 
      time: '2 days ago',
      icon: Star,
      type: 'warning'
    },
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

  if (!isVisible) return null;

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 p-6"
      >
        {/* Welcome Section */}
        <motion.section
          variants={itemVariants}
          className="rounded-2xl p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-300 rounded-full"></div>
          </div>
          
          <div className="flex items-center space-x-6 relative z-10">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Zap className="text-white" size={32} />
            </motion.div>
            <div className="flex-1">
              <motion.h1 
                className="text-3xl lg:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome back, Tarun! 👋
              </motion.h1>
              <motion.p 
                className="text-blue-100 text-lg mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ready to level up your skills today? Your career growth journey continues here.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-300"
              >
                <span className="font-semibold">Continue Learning</span>
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -inset-10 bg-gradient-to-r from-white/10 to-white/5 transform rotate-12"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <motion.span 
                      className={`text-sm font-semibold px-2 py-1 rounded-full flex items-center space-x-1 ${
                        stat.trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <TrendingUp size={14} className={stat.trend === 'down' ? 'rotate-180' : ''} />
                      <span>{stat.change}</span>
                    </motion.span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-blue-100 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <motion.section
            variants={itemVariants}
            className="lg:col-span-2 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                <BarChart3 className="mr-2" size={24} />
                Skill Progress Analytics
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center space-x-1"
              >
                <span>View Details</span>
                <ChevronRight size={16} />
              </motion.button>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#1f2937',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {/* Role Match */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
              <PieChart className="mr-2" size={24} />
              Role Match %
            </h2>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={roleMatchData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {roleMatchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#1f2937',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {roleMatchData.map((role, index) => (
                <motion.div
                  key={role.name}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: role.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{role.name}</span>
                  <span className="text-sm font-bold ml-auto" style={{ color: role.color }}>
                    {role.value}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                <Brain className="mr-2" size={24} />
                Skills Proficiency
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight size={16} />
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {skillsData.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: skill.color + '20' }}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon size={18} style={{ color: skill.color }} />
                      </motion.div>
                      <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                        <motion.div 
                          className="h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>
                      <span className="text-sm font-bold w-8" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Activities */}
          <motion.section
            variants={itemVariants}
            className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                <Activity className="mr-2" size={24} />
                Recent Activities
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-blue-500 hover:text-blue-600 flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight size={16} />
              </motion.button>
            </div>
            
            <div className="space-y-3">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                const getColor = (type) => {
                  switch(type) {
                    case 'success': return 'text-green-500';
                    case 'warning': return 'text-yellow-500';
                    case 'info': return 'text-blue-500';
                    default: return 'text-gray-500';
                  }
                };
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.01 }}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 group transition-all duration-200"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-2 rounded-lg ${getColor(activity.type)} bg-opacity-20`}
                    >
                      <Icon size={16} />
                    </motion.div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {activity.action}: <span className="text-blue-600 dark:text-blue-400">{activity.detail}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                    
                    <motion.div 
                      className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-400' : 
                        activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </Layout>
  );
}