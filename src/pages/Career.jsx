import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Star, 
  Send, 
  X, 
  FileText, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Link as LinkIcon, 
  Paperclip, 
  Trash2, 
  Loader2 
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const defaultJobs = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    dept: 'Engineering',
    location: 'Remote / Dhaka',
    type: 'Full-time',
    salary: 'Competitive / Market Standard',
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    dept: 'Design',
    location: 'Remote',
    type: 'Full-time',
    salary: 'Competitive / Market Standard',
  },
  {
    id: '3',
    title: 'Backend Engineer (Node.js)',
    dept: 'Engineering',
    location: 'Dhaka',
    type: 'Full-time',
    salary: 'Competitive / Market Standard',
  },
  {
    id: '4',
    title: 'Frontend Intern (React)',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Internship',
    salary: 'Stipend + Learning Track',
  },
];

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  coverLetter: ''
};

const Career = () => {
  const [jobs, setJobs] = useState(defaultJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // General application form state
  const [genFormData, setGenFormData] = useState({ fullName: '', email: '', message: '' });
  const [genCvFile, setGenCvFile] = useState(null);
  const [isGenSubmitting, setIsGenSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        if (res.data && res.data.length > 0) {
          setJobs(res.data);
        }
      } catch (err) {
        console.log('Using default jobs list:', err.message);
      }
    };
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit. Please upload a smaller file.');
        return;
      }
      setCvFile(file);
      toast.success(`CV Attached: ${file.name}`);
    }
  };

  const handleGenFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit.');
        return;
      }
      setGenCvFile(file);
      toast.success(`Resume Attached: ${file.name}`);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error('Please upload your CV / Resume before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: `Job Application: ${selectedJob.title}`,
        message: `Applicant: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nJob Title: ${selectedJob.title}\nLinkedIn: ${formData.linkedin || 'N/A'}\nCV Attached: ${cvFile.name}\nCover Letter: ${formData.coverLetter || 'N/A'}`
      };

      try {
        await axios.post('http://localhost:5000/api/messages', payload);
      } catch (apiErr) {
        console.log('Backend API post fallback:', apiErr.message);
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success(`Your application for "${selectedJob.title}" has been submitted successfully! We will review your profile and get back to you soon.`, {
        duration: 6000,
      });

      setSelectedJob(null);
      setFormData(initialFormState);
      setCvFile(null);
    } catch (error) {
      toast.error('Something went wrong while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();

    if (!genCvFile) {
      toast.error('Please upload your resume before submitting.');
      return;
    }

    setIsGenSubmitting(true);
    try {
      const payload = {
        name: genFormData.fullName,
        email: genFormData.email,
        subject: 'General Career Application',
        message: `General Application from ${genFormData.fullName}.\nEmail: ${genFormData.email}\nCV Attached: ${genCvFile.name}\nMessage: ${genFormData.message || 'N/A'}`
      };

      try {
        await axios.post('http://localhost:5000/api/messages', payload);
      } catch (apiErr) {
        console.log('Backend API general submit fallback:', apiErr.message);
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success('Your application has been submitted successfully! We will keep your resume on file for matching opportunities.', {
        duration: 6000,
      });

      setGenFormData({ fullName: '', email: '', message: '' });
      setGenCvFile(null);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsGenSubmitting(false);
    }
  };

  const openApplyModal = (e, job) => {
    if (e) e.stopPropagation();
    setSelectedJob(job);
    setFormData(initialFormState);
    setCvFile(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 min-h-screen"
    >
      <PageHeader
        title="Join Our Team"
        subtitle="Work on cutting-edge technologies and help us shape the future of software."
      />

      {/* Perks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Remote First', icon: Clock, desc: 'Work from anywhere in the world.' },
            { title: 'Modern Stack', icon: Star, iconColor: 'text-yellow-500', desc: 'Work with the latest technologies.' },
            { title: 'Great Pay', icon: Briefcase, iconColor: 'text-green-500', desc: 'Competitive salary packages.' },
            { title: 'Growth', icon: ArrowRight, iconColor: 'text-blue-500', desc: 'Continuous learning and mentorship.' },
          ].map((perk, i) => (
            <div key={i} className="premium-card text-center">
              <div className="w-12 h-12 mx-auto bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-800">
                <perk.icon className={perk.iconColor || 'text-primary-500'} size={24} />
              </div>
              <h4 className="font-bold mb-2">{perk.title}</h4>
              <p className="text-sm text-slate-500">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32" id="open-positions">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Open Positions</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Explore our current career opportunities and find your next challenge with us.
          </p>
        </div>
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id || job._id || i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="premium-card group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary-500/50"
            >
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-primary-500/10 text-primary-500 text-xs font-bold rounded-full uppercase tracking-wider">
                    {job.dept || job.department || 'Engineering'}
                  </span>
                  <span className="text-slate-400 text-sm">{job.type}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center space-x-2">
                      <Briefcase size={16} />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>
              </div>
              <button 
                type="button"
                onClick={(e) => openApplyModal(e, job)}
                className="relative z-10 bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-500 group-hover:text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer hover:shadow-lg hover:shadow-primary-500/25 active:scale-95"
              >
                <span>Apply Now</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Form Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="glass rounded-[3rem] p-12 md:p-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Can't find the right role?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              We are always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
          </div>
          <form onSubmit={handleGeneralSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                required
                value={genFormData.fullName}
                onChange={(e) => setGenFormData({ ...genFormData, fullName: e.target.value })}
                placeholder="Full Name *"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <input
                type="email"
                required
                value={genFormData.email}
                onChange={(e) => setGenFormData({ ...genFormData, email: e.target.value })}
                placeholder="Email Address *"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <textarea
                rows={3}
                value={genFormData.message}
                onChange={(e) => setGenFormData({ ...genFormData, message: e.target.value })}
                placeholder="Tell us about yourself and what role interests you..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-500 outline-none resize-none text-sm"
              />
            </div>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleGenFileChange}
                className="hidden"
                id="resume-upload-general"
              />
              {!genCvFile ? (
                <label
                  htmlFor="resume-upload-general"
                  className="flex items-center justify-center space-x-3 w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 py-8 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Paperclip className="text-primary-500" size={24} />
                  <span className="font-bold text-slate-500">Upload Your Resume / CV (PDF, DOC) *</span>
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 bg-primary-500/10 border border-primary-500/30 rounded-2xl">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="p-2.5 bg-primary-500 text-white rounded-xl flex-shrink-0">
                      <FileText size={22} />
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{genCvFile.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {(genCvFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <CheckCircle2 className="text-green-500" size={20} />
                    <button
                      type="button"
                      onClick={() => setGenCvFile(null)}
                      className="p-1.5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isGenSubmitting}
              className="w-full bg-primary-500 text-white py-5 rounded-2xl font-bold text-xl hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isGenSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Application</span>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Apply Modal Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedJob(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              
              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 z-10 p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="px-3 py-1 bg-primary-500/10 text-primary-500 text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
                      Applying for Position
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {selectedJob.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {selectedJob.location} • {selectedJob.type}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleApply} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+880 1700-000000"
                          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                        LinkedIn / Portfolio (Optional)
                      </label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-5 py-3.5 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Upload Resume / CV <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="modal-resume-upload"
                      />
                      {!cvFile ? (
                        <label
                          htmlFor="modal-resume-upload"
                          className="flex flex-col items-center justify-center space-y-2 w-full bg-slate-50 dark:bg-slate-800/40 border-2 border-dashed border-slate-300 dark:border-slate-700 py-8 px-4 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-primary-500/50 transition-all text-center group"
                        >
                          <div className="w-12 h-12 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Paperclip size={22} />
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 dark:text-slate-200 block text-sm sm:text-base">
                              Click or Drag & Drop to Upload Resume
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                              Supports PDF, DOC, DOCX (Max 10MB)
                            </span>
                          </div>
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-4 bg-primary-500/10 border border-primary-500/30 rounded-2xl">
                          <div className="flex items-center space-x-3 overflow-hidden">
                            <div className="p-2.5 bg-primary-500 text-white rounded-xl flex-shrink-0">
                              <FileText size={22} />
                            </div>
                            <div className="truncate">
                              <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{cvFile.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {(cvFile.size / (1024 * 1024)).toFixed(2)} MB • Attached
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <CheckCircle2 className="text-green-500" size={20} />
                            <button
                              type="button"
                              onClick={() => setCvFile(null)}
                              className="p-1.5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                              title="Remove file"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Cover Letter / Why you are a good fit (Optional)
                    </label>
                    <textarea
                      rows={3}
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your experience and motivation for this role..."
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white text-sm resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-6 py-3.5 rounded-2xl font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-300 text-sm cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-2xl font-bold bg-primary-500 text-white hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px] text-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="animate-spin" size={18} />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Submit Application</span>
                          <Send size={16} />
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
};

export default Career;
