'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X, 
  Search,
  Briefcase,
  Building,
  FileText,
  Zap,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Layout, { useTheme } from "./HLayout";

// Mock API function to fetch skills (in real app, this would be your backend API)
const fetchSkillsSuggestions = async (query) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const allSkills = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js',
    'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'Kotlin',
    'C#', '.NET', 'ASP.NET', 'PHP', 'Laravel', 'Symfony',
    'Ruby', 'Ruby on Rails', 'Go', 'Rust', 'Swift', 'iOS Development',
    'Android Development', 'React Native', 'Flutter', 'HTML5', 'CSS3',
    'SASS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material-UI',
    'Webpack', 'Vite', 'Babel', 'Git', 'GitHub', 'GitLab',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase',
    'REST APIs', 'GraphQL', 'Microservices', 'CI/CD', 'Jenkins',
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'Data Analysis', 'Pandas', 'NumPy', 'Tableau', 'Power BI',
    'UI/UX Design', 'Figma', 'Adobe XD', 'Sketch', 'Photoshop',
    'Project Management', 'Agile', 'Scrum', 'JIRA', 'Confluence',
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
    'DevOps', 'System Design', 'Algorithms', 'Data Structures',
    'Cybersecurity', 'Network Security', 'Blockchain', 'Web3',
    'Mobile Development', 'Cloud Computing', 'Big Data', 'Hadoop',
    'Salesforce', 'SAP', 'Oracle', 'Microsoft Dynamics'
  ];

  if (!query) return [];
  
  return allSkills.filter(skill =>
    skill.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10); // Return top 10 matches
};

// Role Management Component
function RoleManagementContent() {
  const { isDarkMode } = useTheme();
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    roleName: '',
    department: '',
    description: '',
    skills: [],
    experienceLevel: '',
    currentSkillInput: ''
  });
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [viewingRole, setViewingRole] = useState(null);
  const [errors, setErrors] = useState({});
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Load roles from localStorage on component mount
  useEffect(() => {
    const savedRoles = localStorage.getItem('rolesDataHR');
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
    }
  }, []);

  // Save roles to localStorage whenever roles change
  useEffect(() => {
    localStorage.setItem('rolesDataHR', JSON.stringify(roles));
  }, [roles]);

  // Fetch skill suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (formData.currentSkillInput.length > 1) {
        const suggestions = await fetchSkillsSuggestions(formData.currentSkillInput);
        setSkillSuggestions(suggestions);
        setShowSuggestions(true);
      } else {
        setSkillSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.currentSkillInput]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSkillInputChange = (value) => {
    handleInputChange('currentSkillInput', value);
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
        currentSkillInput: ''
      }));
    }
    setShowSuggestions(false);
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.roleName.trim()) newErrors.roleName = 'Role name is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const roleData = {
        id: editingRoleId || Date.now().toString(),
        roleName: formData.roleName,
        department: formData.department,
        description: formData.description,
        skills: formData.skills,
        experienceLevel: formData.experienceLevel,
        dateCreated: editingRoleId 
          ? roles.find(role => role.id === editingRoleId)?.dateCreated 
          : new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      if (editingRoleId) {
        // Update existing role
        setRoles(prev => prev.map(role => 
          role.id === editingRoleId ? roleData : role
        ));
        setSuccessMessage('Role updated successfully!');
      } else {
        // Add new role
        setRoles(prev => [...prev, roleData]);
        setSuccessMessage('Role created successfully!');
      }

      resetForm();
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      roleName: '',
      department: '',
      description: '',
      skills: [],
      experienceLevel: '',
      currentSkillInput: ''
    });
    setEditingRoleId(null);
    setErrors({});
  };

  const editRole = (role) => {
    setFormData({
      roleName: role.roleName,
      department: role.department,
      description: role.description,
      skills: role.skills,
      experienceLevel: role.experienceLevel,
      currentSkillInput: ''
    });
    setEditingRoleId(role.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(prev => prev.filter(role => role.id !== roleId));
      if (editingRoleId === roleId) {
        resetForm();
      }
    }
  };

  const viewRole = (role) => {
    setViewingRole(role);
  };

  const experienceLevels = ['Intern', 'Junior', 'Mid', 'Senior', 'Lead', 'Principal'];
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'HR', 'Finance', 'Operations'];

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

  const cardHover = {
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 }
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
              Role Management
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-2 text-lg">
              Create and manage job roles across your organization
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
              <span className="text-gray-600 dark:text-slate-400">Total Roles: </span>
              <span className="font-bold text-gray-900 dark:text-white">{roles.length}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`rounded-2xl p-4 ${
              isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
            } border-2`}
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-500" size={24} />
              <span className="text-green-700 dark:text-green-400 font-semibold">
                {successMessage}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Panel - Create/Edit Role Form */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          <motion.div
            variants={cardHover}
            whileHover="hover"
            className={`rounded-3xl p-8 ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            } shadow-2xl border-2 ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
                <Briefcase className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingRoleId ? 'Edit Role' : 'Create New Role'}
                </h2>
                <p className="text-gray-600 dark:text-slate-400">
                  {editingRoleId ? 'Update role details' : 'Add a new job role to your organization'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Role Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.roleName}
                    onChange={(e) => handleInputChange('roleName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl border-2 ${
                      errors.roleName 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-slate-600 focus:border-blue-500'
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300`}
                    placeholder="e.g., Senior Frontend Developer"
                  />
                  <Briefcase className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.roleName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle size={16} />
                    <span>{errors.roleName}</span>
                  </motion.p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Department *
                </label>
                <div className="relative">
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl border-2 ${
                      errors.department 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-slate-600 focus:border-blue-500'
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 appearance-none`}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <Building className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.department && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle size={16} />
                    <span>{errors.department}</span>
                  </motion.p>
                )}
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Experience Level *
                </label>
                <div className="relative">
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl border-2 ${
                      errors.experienceLevel 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-slate-600 focus:border-blue-500'
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 appearance-none`}
                  >
                    <option value="">Select Experience Level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <Zap className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {errors.experienceLevel && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle size={16} />
                    <span>{errors.experienceLevel}</span>
                  </motion.p>
                )}
              </div>

              {/* Skills Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Required Skills *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.currentSkillInput}
                    onChange={(e) => handleSkillInputChange(e.target.value)}
                    onFocus={() => formData.currentSkillInput.length > 1 && setShowSuggestions(true)}
                    className={`w-full px-4 py-3 rounded-2xl border-2 ${
                      errors.skills 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-slate-600 focus:border-blue-500'
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300`}
                    placeholder="Type to search skills..."
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  
                  {/* Skill Suggestions Dropdown */}
                  <AnimatePresence>
                    {showSuggestions && skillSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl z-10 max-h-60 overflow-y-auto"
                      >
                        {skillSuggestions.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-100 dark:border-slate-600 last:border-b-0 transition-colors"
                            onClick={() => addSkill(skill)}
                          >
                            <span className="text-gray-900 dark:text-white">{skill}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Selected Skills */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-200 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
                
                {errors.skills && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle size={16} />
                    <span>{errors.skills}</span>
                  </motion.p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Description *
                </label>
                <div className="relative">
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-2xl border-2 ${
                      errors.description 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-slate-600 focus:border-blue-500'
                    } bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 resize-none`}
                    placeholder="Describe the role responsibilities, requirements, and expectations..."
                  />
                  <FileText className="absolute right-4 top-4 text-gray-400" size={20} />
                </div>
                {errors.description && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle size={16} />
                    <span>{errors.description}</span>
                  </motion.p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05, y: -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
                  } text-white relative overflow-hidden`}
                >
                  {isSubmitting && (
                    <motion.div
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  )}
                  <Save size={20} />
                  <span>{isSubmitting ? 'Processing...' : editingRoleId ? 'Update Role' : 'Create Role'}</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={resetForm}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 rounded-2xl border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all font-semibold"
                >
                  Reset
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.section>

        {/* Right Panel - Roles Table */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <motion.div
            variants={cardHover}
            whileHover="hover"
            className={`rounded-3xl p-8 ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            } shadow-2xl border-2 ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            } h-full`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-teal-600">
                  <Briefcase className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    All Roles ({roles.length})
                  </h2>
                  <p className="text-gray-600 dark:text-slate-400">
                    Manage existing job roles
                  </p>
                </div>
              </div>
            </div>

            {roles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Briefcase className="text-gray-400 dark:text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No Roles Created Yet
                </h3>
                <p className="text-gray-600 dark:text-slate-400">
                  Create your first role to get started
                </p>
              </motion.div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-slate-700">
                      <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-slate-300">Role Name</th>
                      <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-slate-300">Department</th>
                      <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-slate-300">Experience</th>
                      <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-slate-300">Date Created</th>
                      <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, index) => (
                      <motion.tr
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        whileHover={{ 
                          scale: 1.02,
                          backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(243, 244, 246, 0.5)',
                          transition: { duration: 0.2 }
                        }}
                        className="border-b border-gray-100 dark:border-slate-800 cursor-pointer"
                      >
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {role.roleName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                              {role.skills.slice(0, 2).join(', ')}
                              {role.skills.length > 2 && ` +${role.skills.length - 2} more`}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                            {role.department}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            role.experienceLevel === 'Senior' || role.experienceLevel === 'Lead' || role.experienceLevel === 'Principal'
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                              : role.experienceLevel === 'Mid'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                          }`}>
                            {role.experienceLevel}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-gray-600 dark:text-slate-400 text-sm">
                          {new Date(role.dateCreated).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => viewRole(role)}
                              className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                              title="View Role"
                            >
                              <Eye size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => editRole(role)}
                              className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
                              title="Edit Role"
                            >
                              <Edit size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteRole(role.id)}
                              className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                              title="Delete Role"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </motion.section>
      </div>

      {/* View Role Modal */}
      <AnimatePresence>
        {viewingRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setViewingRole(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className={`rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
                isDarkMode ? 'bg-slate-800' : 'bg-white'
              }`}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative p-8 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {viewingRole.roleName}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 mt-1">
                      Role Details
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewingRole(null)}
                    className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                      Department
                    </label>
                    <p className="text-gray-900 dark:text-white text-lg">
                      {viewingRole.department}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                      Experience Level
                    </label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      viewingRole.experienceLevel === 'Senior' || viewingRole.experienceLevel === 'Lead' || viewingRole.experienceLevel === 'Principal'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        : viewingRole.experienceLevel === 'Mid'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                    }`}>
                      {viewingRole.experienceLevel}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {viewingRole.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">
                    Required Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {viewingRole.skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                      Date Created
                    </label>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-slate-400">
                      <Calendar size={16} />
                      <span>{new Date(viewingRole.dateCreated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                      Last Updated
                    </label>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-slate-400">
                      <Calendar size={16} />
                      <span>{new Date(viewingRole.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 rounded-b-3xl">
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      editRole(viewingRole);
                      setViewingRole(null);
                    }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-teal-700 transition-all shadow-lg"
                  >
                    <Edit size={18} />
                    <span>Edit Role</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewingRole(null)}
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
    </div>
  );
}

// Main export with Layout wrapper
export default function RoleManagement() {
  return (
    <Layout>
      <RoleManagementContent />
    </Layout>
  );
}