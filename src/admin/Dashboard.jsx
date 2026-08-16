import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  MessageSquare, 
  LogOut, 
  Bell, 
  Plus, 
  Search,
  Code2,
  Image as ImageIcon,
  Trash2,
  Edit,
  X,
  ExternalLink,
  Calendar,
  Mail,
  FileText,
  Check,
  User
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Services', icon: Settings, path: '/admin/services' },
    { name: 'Portfolio', icon: ImageIcon, path: '/admin/portfolio' },
    { name: 'Jobs', icon: Briefcase, path: '/admin/jobs' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 overflow-y-auto hidden lg:block border-r border-slate-800">
      <div className="p-8">
        <Link to="/" className="flex items-center space-x-3 mb-12">
          <Code2 className="text-primary-500 animate-pulse" size={32} />
          <span className="text-xl font-bold tracking-tight">Coderize Admin</span>
        </Link>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'text-slate-400 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute bottom-8 left-8 right-8">
        <button 
          onClick={() => { 
            localStorage.removeItem('isAdmin'); 
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUsername');
            window.location.reload(); 
          }}
          className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const [stats, setStats] = useState({ services: 0, projects: 0, jobs: 0, messages: 0 });
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, projectsRes, jobsRes, messagesRes] = await Promise.all([
          axios.get(`${API_BASE}/services`),
          axios.get(`${API_BASE}/projects`),
          axios.get(`${API_BASE}/jobs`),
          axios.get(`${API_BASE}/messages`, getHeaders())
        ]);

        setStats({
          services: servicesRes.data.length,
          projects: projectsRes.data.length,
          jobs: jobsRes.data.length,
          messages: messagesRes.data.length
        });
        setRecentMessages(messagesRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    { label: 'Total Services', value: stats.services, icon: Settings, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Live Projects', value: stats.projects, icon: ImageIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Open Positions', value: stats.jobs, icon: Briefcase, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Inquiries', value: stats.messages, icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <div className="text-3xl font-extrabold mb-1">{loading ? '...' : stat.value}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-bold">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Recent Contact Inquiries</h3>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-slate-450">Loading activity feed...</div>
          ) : recentMessages.length === 0 ? (
            <div className="text-center py-8 text-slate-400">No inquiries received yet.</div>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg._id} className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-primary-500">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{msg.name} ({msg.email})</p>
                    <p className="text-xs text-slate-500">{msg.subject} — {new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <Link to="/admin/messages" className="text-primary-500 text-xs font-black uppercase tracking-wider hover:underline">
                  View Detail
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Services Management Sub-component
const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Laptop',
    category: 'Development',
    technologies: ''
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/services`);
      setServices(res.data);
    } catch (err) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({ title: '', description: '', icon: 'Laptop', category: 'Development', technologies: '' });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || 'Laptop',
      category: service.category || 'Development',
      technologies: service.technologies ? service.technologies.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await axios.delete(`${API_BASE}/services/${id}`, getHeaders());
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (err) {
      toast.error('Failed to delete service');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingService) {
        await axios.put(`${API_BASE}/services/${editingService._id}`, payload, getHeaders());
        toast.success('Service updated successfully');
      } else {
        await axios.post(`${API_BASE}/services`, payload, getHeaders());
        toast.success('Service created successfully');
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Services Management</h3>
          <p className="text-sm text-slate-500">Add, edit, or remove your core corporate services</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-md shadow-primary-500/10"
        >
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-550">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800">
          No services found. Click "Add Service" to create one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-primary-500/10 text-primary-500 text-xs font-bold rounded-full uppercase tracking-wider">
                    {service.category}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => openEditModal(service)}
                      className="p-1.5 text-slate-500 hover:text-primary-500 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(service._id)}
                      className="p-1.5 text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                <p className="text-sm text-slate-500 mb-4 line-clamp-3">{service.description}</p>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies && service.technologies.map(tech => (
                    <span key={tech} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] rounded font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-lg rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-650"
            >
              <X size={20} />
            </button>
            <h4 className="text-2xl font-bold mb-6">{editingService ? 'Edit Service' : 'Add New Service'}</h4>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Service Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Cloud Architecture"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Category</label>
                  <input 
                    type="text" 
                    required
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Development"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Icon (Lucide Name)</label>
                  <select 
                    value={formData.icon}
                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="Laptop">Laptop</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Database">Database</option>
                    <option value="Shield">Shield</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Bot">Bot</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Technologies (Comma separated)</label>
                <input 
                  type="text" 
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, AWS, Node.js"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Description</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a detailed description of this service..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/10 mt-2"
              >
                {editingService ? 'Save Changes' : 'Create Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Portfolio Management Sub-component
const PortfolioManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: 'Web App',
    liveDemo: '',
    github: '',
    tags: ''
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/projects`);
      setProjects(res.data);
    } catch (err) {
      toast.error('Failed to load portfolio projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', image: '', category: 'Web App', liveDemo: '', github: '', tags: '' });
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      category: project.category || 'Web App',
      liveDemo: project.liveDemo || '',
      github: project.github || '',
      tags: project.tags ? project.tags.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API_BASE}/projects/${id}`, getHeaders());
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        await axios.put(`${API_BASE}/projects/${editingProject._id}`, payload, getHeaders());
        toast.success('Project updated successfully');
      } else {
        await axios.post(`${API_BASE}/projects`, payload, getHeaders());
        toast.success('Project created successfully');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Portfolio Management</h3>
          <p className="text-sm text-slate-500">Manage case studies and client projects shown in the portfolio</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-md shadow-primary-500/10"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-550">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800">
          No projects found. Click "Add Project" to upload one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj._id} className="glass rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-44 bg-slate-100 dark:bg-slate-900">
                <img src={proj.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md rounded-lg flex space-x-0.5 p-1 border border-white/10">
                  <button 
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 text-white hover:text-primary-500 transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(proj._id)}
                    className="p-1.5 text-white hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest block mb-2">{proj.category}</span>
                  <h4 className="text-lg font-bold mb-2">{proj.title}</h4>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-3">{proj.description}</p>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags && proj.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] rounded font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-xs text-primary-500 font-bold hover:underline">
                        <span>Live Preview</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-slate-650 hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-lg rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-650"
            >
              <X size={20} />
            </button>
            <h4 className="text-2xl font-bold mb-6">{editingProject ? 'Edit Project' : 'Add New Project'}</h4>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Project Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Dex Crypto Portal"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="AI/ML">AI/ML</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tags (Comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.tags}
                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, Vite, GraphQL"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Image URL</label>
                <input 
                  type="text" 
                  required
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Live Demo Link</label>
                  <input 
                    type="text" 
                    value={formData.liveDemo}
                    onChange={e => setFormData({ ...formData, liveDemo: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">GitHub Repository</label>
                  <input 
                    type="text" 
                    value={formData.github}
                    onChange={e => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Description</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summarize this project's key features..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/10 mt-2"
              >
                {editingProject ? 'Save Changes' : 'Create Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Jobs Management Sub-component
const JobsManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    description: '',
    requirements: '',
    deadline: ''
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/jobs`);
      setJobs(res.data);
    } catch (err) {
      toast.error('Failed to load career jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openAddModal = () => {
    setEditingJob(null);
    setFormData({ title: '', department: 'Engineering', type: 'Full-time', location: 'Remote', description: '', requirements: '', deadline: '' });
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department || 'Engineering',
      type: job.type || 'Full-time',
      location: job.location || 'Remote',
      description: job.description,
      requirements: job.requirements ? job.requirements.join(', ') : '',
      deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this position?')) return;
    try {
      await axios.delete(`${API_BASE}/jobs/${id}`, getHeaders());
      toast.success('Job position deleted successfully');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      requirements: formData.requirements.split(',').map(r => r.trim()).filter(Boolean),
      deadline: formData.deadline ? new Date(formData.deadline) : undefined
    };

    try {
      if (editingJob) {
        await axios.put(`${API_BASE}/jobs/${editingJob._id}`, payload, getHeaders());
        toast.success('Job updated successfully');
      } else {
        await axios.post(`${API_BASE}/jobs`, payload, getHeaders());
        toast.success('Job created successfully');
      }
      setModalOpen(false);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Jobs & Careers</h3>
          <p className="text-sm text-slate-500">Post open roles and manage hiring listings</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-md shadow-primary-500/10"
        >
          <Plus size={18} />
          <span>Add Position</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-550">Loading job postings...</div>
      ) : jobs.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800">
          No job postings found. Click "Add Position" to open a role.
        </div>
      ) : (
        <div className="glass rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-550">Job Title</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-550">Department</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-550">Type</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-550">Location</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-550">Deadline</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-550 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="p-5 font-bold text-sm">{job.title}</td>
                    <td className="p-5 text-sm text-slate-600 dark:text-slate-400">{job.department}</td>
                    <td className="p-5 text-sm">
                      <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-500 rounded text-xs font-bold">
                        {job.type}
                      </span>
                    </td>
                    <td className="p-5 text-sm text-slate-500">{job.location}</td>
                    <td className="p-5 text-sm text-slate-500">
                      {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'No Limit'}
                    </td>
                    <td className="p-5 text-right space-x-2">
                      <button 
                        onClick={() => openEditModal(job)}
                        className="p-1.5 text-slate-400 hover:text-primary-500 transition-colors inline-block"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(job._id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors inline-block"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-lg rounded-3xl p-8 border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-650"
            >
              <X size={20} />
            </button>
            <h4 className="text-2xl font-bold mb-6">{editingJob ? 'Edit Position' : 'Post New Position'}</h4>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Job Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Frontend Architect"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Department</label>
                  <input 
                    type="text" 
                    required
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Engineering"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Employment Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Dhaka (Hybrid)"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Apply Deadline</label>
                  <input 
                    type="date" 
                    value={formData.deadline}
                    onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Requirements (Comma separated)</label>
                <input 
                  type="text" 
                  value={formData.requirements}
                  onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="3+ yrs React exp, Team leading, GraphQL"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Job Description</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the job duties, day-to-day requirements..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/10 mt-2"
              >
                {editingJob ? 'Save Changes' : 'Publish Job'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Messages Sub-component
const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/messages`, getHeaders());
      setMessages(res.data);
    } catch (err) {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await axios.delete(`${API_BASE}/messages/${id}`, getHeaders());
      toast.success('Inquiry deleted');
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
      fetchMessages();
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold">Inquiries & Contact Messages</h3>
        <p className="text-sm text-slate-500">Read and manage incoming inquiries from the website contact form</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-550">Loading inquiries...</div>
      ) : messages.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800">
          No inquiries found in database.
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 glass rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-sm max-h-[70vh] overflow-y-auto">
            {messages.map((msg) => (
              <div 
                key={msg._id} 
                onClick={() => setSelectedMessage(msg)}
                className={`p-5 cursor-pointer transition-all hover:bg-slate-50/50 dark:hover:bg-slate-900/25 ${
                  selectedMessage && selectedMessage._id === msg._id 
                    ? 'bg-slate-100 dark:bg-slate-900 border-l-4 border-l-primary-500 pl-4' 
                    : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm block truncate max-w-[70%]">{msg.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-655 font-bold mb-1 truncate">{msg.subject}</p>
                <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                <button 
                  onClick={(e) => handleDelete(msg._id, e)}
                  className="mt-3 text-red-500 hover:text-red-600 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1"
                >
                  <Trash2 size={12} />
                  <span>Delete</span>
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="glass rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div>
                    <h4 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h4>
                    <div className="flex items-center space-x-3 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span className="font-bold">{selectedMessage.name}</span>
                      </div>
                      <span>&bull;</span>
                      <div className="flex items-center space-x-1">
                        <Mail size={14} />
                        <span>{selectedMessage.email}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full font-bold">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Message Body</h5>
                  <p className="text-slate-600 dark:text-slate-350 leading-relaxed bg-slate-100/50 dark:bg-slate-900/35 p-6 rounded-2xl whitespace-pre-wrap font-medium">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <a 
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-md shadow-primary-500/10"
                  >
                    <Mail size={18} />
                    <span>Reply via Mail</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="glass rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500 shadow-sm">
                <Mail size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <p className="font-medium text-lg">No message selected</p>
                <p className="text-sm text-slate-400 mt-1">Select an inquiry from the sidebar to read its contents</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      <Sidebar />
      <div className="lg:pl-64">
        <header className="h-20 glass border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full bg-slate-100 dark:bg-slate-900/50 rounded-xl pl-12 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-bold">{localStorage.getItem('adminUsername') || 'Admin'}</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-10 h-10 rounded-full ring-2 ring-primary-500/20" />
            </div>
          </div>
        </header>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/services" element={<ServicesManagement />} />
            <Route path="/portfolio" element={<PortfolioManagement />} />
            <Route path="/jobs" element={<JobsManagement />} />
            <Route path="/messages" element={<MessagesManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
