'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  X, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  FileText,
  Mail,
  Calendar,
  Award,
  ChevronRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Layout, { useTheme } from "../HrDashboard/HLayout";

// Mock data structure
const mockRoles = [
  {
    id: 1,
    roleName: "Senior Frontend Developer",
    department: "Engineering",
    description: "Develop and maintain modern web applications using React and TypeScript",
    experienceLevel: "Senior",
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Redux"],
    eligibleEmployees: 18,
    appliedEmployees: [
      {
        id: 101,
        name: "Sarah Chen",
        email: "sarah.chen@company.com",
        matchPercent: 92,
        resumeScore: 88,
        resumeFile: "/resumes/sarah_chen.pdf",
        status: "Pending",
        appliedDate: "2024-01-15",
        skills: {
          matched: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3"],
          missing: ["Redux", "Node.js"]
        },
        experience: "4 years"
      },
      {
        id: 102,
        name: "Mike Johnson",
        email: "mike.johnson@company.com",
        matchPercent: 78,
        resumeScore: 82,
        resumeFile: "/resumes/mike_johnson.pdf",
        status: "Approved",
        appliedDate: "2024-01-14",
        skills: {
          matched: ["React", "JavaScript", "HTML5"],
          missing: ["TypeScript", "CSS3", "Redux"]
        },
        experience: "3 years"
      }
    ]
  },
  {
    id: 2,
    roleName: "UX Designer",
    department: "Design",
    description: "Create beautiful and intuitive user experiences for our products",
    experienceLevel: "Mid",
    skills: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Adobe Creative Suite"],
    eligibleEmployees: 12,
    appliedEmployees: [
      {
        id: 201,
        name: "Emma Wilson",
        email: "emma.wilson@company.com",
        matchPercent: 85,
        resumeScore: 90,
        resumeFile: "/resumes/emma_wilson.pdf",
        status: "Pending",
        appliedDate: "2024-01-16",
        skills: {
          matched: ["Figma", "UI/UX Design", "Prototyping"],
          missing: ["User Research", "Adobe Creative Suite"]
        },
        experience: "2 years"
      }
    ]
  },
  {
    id: 3,
    roleName: "Data Analyst",
    department: "Analytics",
    description: "Analyze business data and provide actionable insights",
    experienceLevel: "Junior",
    skills: ["Python", "SQL", "Data Visualization", "Statistics", "Excel"],
    eligibleEmployees: 8,
    appliedEmployees: [
      {
        id: 301,
        name: "Alex Rodriguez",
        email: "alex.rodriguez@company.com",
        matchPercent: 65,
        resumeScore: 72,
        resumeFile: "/resumes/alex_rodriguez.pdf",
        status: "Rejected",
        appliedDate: "2024-01-13",
        skills: {
          matched: ["Excel", "Statistics"],
          missing: ["Python", "SQL", "Data Visualization"]
        },
        experience: "1 year"
      },
      {
        id: 302,
        name: "Priya Patel",
        email: "priya.patel@company.com",
        matchPercent: 88,
        resumeScore: 85,
        resumeFile: "/resumes/priya_patel.pdf",
        status: "Pending",
        appliedDate: "2024-01-15",
        skills: {
          matched: ["Python", "SQL", "Data Visualization", "Statistics"],
          missing: ["Machine Learning"]
        },
        experience: "2 years"
      }
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

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Approved':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-600 dark:text-green-400',
          icon: CheckCircle,
          label: 'Approved'
        };
      case 'Rejected':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-600 dark:text-red-400',
          icon: XCircle,
          label: 'Rejected'
        };
      default:
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-600 dark:text-yellow-400',
          icon: Clock,
          label: 'Pending'
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      <IconComponent size={14} />
      <span>{config.label}</span>
    </span>
  );
};

// Applications Modal Component
const ApplicationsModal = ({ role, isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Safe access to role properties
  const appliedEmployees = role?.appliedEmployees || [];
  const roleName = role?.roleName || 'Unknown Role';
  const department = role?.department || 'Unknown Department';

  const filteredApplicants = appliedEmployees.filter(applicant => {
    const matchesSearch = applicant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || applicant?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (applicantId, newStatus) => {
    // In a real app, this would update the backend
    console.log(`Updating applicant ${applicantId} to ${newStatus}`);
    
    // For demo purposes, we'll just show an alert
    alert(`Application ${newStatus.toLowerCase()} successfully!`);
  };

  const downloadResume = (resumeFile, applicantName) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = resumeFile || '#';
    link.download = `${(applicantName || 'applicant').replace(' ', '_')}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || !role) return null;

  return (
    <>
      {/* Applications List Modal */}
      <AnimatePresence>
        {isOpen && role && (
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
              className={`rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-8 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Applications for {roleName}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 mt-1">
                      {department} • {appliedEmployees.length} applicants
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

              {/* Filters */}
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search applicants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Applications Table */}
              <div className="p-6 overflow-y-auto max-h-96">
                {filteredApplicants.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="mx-auto text-gray-400 mb-4" size={48} />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No applicants found
                    </h4>
                    <p className="text-gray-600 dark:text-slate-400">
                      {searchTerm || statusFilter !== 'All' 
                        ? 'Try adjusting your search or filters'
                        : 'No applications received for this role yet'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredApplicants.map((applicant, index) => (
                      <motion.div
                        key={applicant?.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className={`p-6 rounded-2xl border-2 ${
                          isDarkMode ? 'border-slate-700' : 'border-gray-200'
                        } hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer`}
                        onClick={() => setSelectedApplicant(applicant)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                              {(applicant?.name || 'AA').split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {applicant?.name || 'Unknown Applicant'}
                              </h4>
                              <p className="text-gray-600 dark:text-slate-400 text-sm">
                                {applicant?.email || 'No email provided'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {applicant?.matchPercent || 0}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-slate-400">Match</div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {applicant?.resumeScore || 0}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-slate-400">Resume</div>
                            </div>
                            
                            <StatusBadge status={applicant?.status || 'Pending'} />
                            
                            <ChevronRight className="text-gray-400" size={20} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Applicant Details Modal */}
      <AnimatePresence>
        {selectedApplicant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-60 flex items-center justify-center p-4"
            onClick={() => setSelectedApplicant(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: 100 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: 100 }}
              transition={{ type: "spring", damping: 25 }}
              className={`rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-8 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedApplicant?.name || 'Applicant Details'}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 mt-1">
                      Application for {roleName}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedApplicant(null)}
                    className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-96">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Applicant Info */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Applicant Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="text-gray-400" size={20} />
                          <span className="text-gray-900 dark:text-white">{selectedApplicant?.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="text-gray-400" size={20} />
                          <span className="text-gray-900 dark:text-white">
                            Applied {selectedApplicant?.appliedDate ? new Date(selectedApplicant.appliedDate).toLocaleDateString() : 'Unknown date'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="text-gray-400" size={20} />
                          <span className="text-gray-900 dark:text-white">{selectedApplicant?.experience || 'Experience not specified'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills Analysis */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Skills Analysis
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">
                            Matched Skills ({(selectedApplicant?.skills?.matched || []).length})
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {(selectedApplicant?.skills?.matched || []).map(skill => (
                              <span key={skill} className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-600 dark:text-red-400 mb-2">
                            Missing Skills ({(selectedApplicant?.skills?.missing || []).length})
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {(selectedApplicant?.skills?.missing || []).map(skill => (
                              <span key={skill} className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resume Preview */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Resume Preview
                    </h4>
                    <div className="border-2 border-gray-300 dark:border-slate-600 rounded-2xl overflow-hidden">
                      <iframe 
                        src={selectedApplicant?.resumeFile || '/resumes/sample.pdf'} 
                        className="w-full h-80"
                        title={`Resume of ${selectedApplicant?.name || 'Applicant'}`}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => downloadResume(selectedApplicant?.resumeFile, selectedApplicant?.name)}
                      className="w-full mt-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                      <Download size={20} />
                      <span>Download Resume</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <StatusBadge status={selectedApplicant?.status || 'Pending'} />
                  
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusUpdate(selectedApplicant?.id, 'Rejected')}
                      className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-2xl hover:bg-red-600 transition-all shadow-lg"
                    >
                      <XCircle size={20} />
                      <span>Reject</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusUpdate(selectedApplicant?.id, 'Approved')}
                      className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition-all shadow-lg"
                    >
                      <CheckCircle size={20} />
                      <span>Approve</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Main Component
function ApplicationsReviewContent() {
  const { isDarkMode } = useTheme();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Load roles data
  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      try {
        setIsLoading(true);
        // In real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRoles(mockRoles);
      } catch (error) {
        console.error('Error loading roles:', error);
        setRoles([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role?.roleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role?.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || role?.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const totalApplications = roles.reduce((sum, role) => sum + (role?.appliedEmployees?.length || 0), 0);
  const pendingApplications = roles.reduce((sum, role) => 
    sum + (role?.appliedEmployees?.filter(app => app?.status === 'Pending').length || 0), 0
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
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

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
              Applications Review
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-2 text-lg">
              Review applications received for each role and verify employee suitability.
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
              <span className="text-gray-600 dark:text-slate-400">Active Roles: </span>
              <span className="font-bold text-gray-900 dark:text-white">{roles.length}</span>
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
          title="Total Roles"
          value={roles.length}
          change="+2 this month"
          icon={FileText}
          color="from-blue-500 to-cyan-500"
          delay={0.1}
        />
        <KpiCard
          title="Total Applications"
          value={totalApplications}
          change="+12 this week"
          icon={Users}
          color="from-purple-500 to-pink-500"
          delay={0.2}
        />
        <KpiCard
          title="Pending Review"
          value={pendingApplications}
          change="-3 today"
          icon={Clock}
          color="from-orange-500 to-amber-500"
          delay={0.3}
        />
        <KpiCard
          title="Avg. Match Rate"
          value="78%"
          change="+5%"
          icon={Award}
          color="from-green-500 to-emerald-500"
          delay={0.4}
        />
      </motion.section>

      {/* Roles Table Section */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
        className={`rounded-3xl p-8 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        } shadow-2xl border-2 ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Roles Overview
            </h2>
            <p className="text-gray-600 dark:text-slate-400">
              Manage and review applications for each role
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Analytics">Analytics</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </div>

        {filteredRoles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No roles found
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              {searchTerm || departmentFilter !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'No roles created yet'
              }
            </p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Role Name</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Department</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Eligible</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Applied</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role, index) => (
                  <motion.tr
                    key={role?.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
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
                          {role?.roleName || 'Unknown Role'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                          {role?.experienceLevel || 'Unknown'} • {(role?.skills || []).slice(0, 2).join(', ')}
                          {(role?.skills || []).length > 2 && ` +${(role?.skills || []).length - 2} more`}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                        {role?.department || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {role?.eligibleEmployees || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-center">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {role?.appliedEmployees?.length || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-slate-400">Approved:</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {(role?.appliedEmployees?.filter(app => app?.status === 'Approved').length || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-slate-400">Pending:</span>
                          <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                            {(role?.appliedEmployees?.filter(app => app?.status === 'Pending').length || 0)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRole(role)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
                      >
                        <Eye size={16} />
                        <span>View Applications</span>
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      {/* Applications Modal */}
      <ApplicationsModal
        role={selectedRole}
        isOpen={!!selectedRole}
        onClose={() => setSelectedRole(null)}
      />
    </div>
  );
}

// Main export with Layout wrapper
export default function ApplicationsReview() {
  return (
    <Layout>
      <ApplicationsReviewContent />
    </Layout>
  );
}