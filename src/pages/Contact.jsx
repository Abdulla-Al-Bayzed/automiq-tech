import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import PageHeader from '../components/PageHeader';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/messages', formData);
      if (response.status === 201) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <PageHeader
        title="Get In Touch"
        subtitle="Ready to start your next big project? We're here to help you every step of the way."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="premium-card">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <p className="text-slate-500">hello@coderizeitsolution.com</p>
                    <p className="text-slate-500">support@coderizeitsolution.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-slate-500">+8801708019889</p>
                    <p className="text-slate-500"></p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Office Location</h4>
                    <p className="text-slate-500">12/A, Mirpur-6</p>
                    <p className="text-slate-500">Dhaka-1216, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="premium-card bg-slate-900 text-white border-none">
              <h3 className="text-xl font-bold mb-6">Working Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Sun - Thu</span>
                  </span>
                  <span className="text-white font-medium">10:00 AM - 7:00 PM</span>
                </div>

                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Saturday</span>
                  </span>
                  <span className="text-red-400 font-bold uppercase text-xs">Closed</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Sunday</span>
                  </span>
                  <span className="text-red-400 font-bold uppercase text-xs">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="premium-card">
              <div className="flex items-center space-x-3 mb-8">
                <MessageSquare className="text-primary-500" size={32} />
                <h2 className="text-3xl font-bold">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                      placeholder="Abdulla Al Bayzed"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500">Message</label>
                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary-500 text-white py-5 rounded-2xl font-bold text-xl hover:bg-primary-600 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-primary-500/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending...</span>
                      <Loader2 size={24} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={24} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-24 rounded-[3rem] overflow-hidden h-[400px] relative glass border border-slate-200 dark:border-slate-800">
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center text-slate-400">
            <Globe size={64} className="mb-4 animate-spin-slow" />
            <p className="text-xl font-bold tracking-tight uppercase tracking-widest">Interactive Map Loading...</p>
          </div>
          {/* Integration tip: Replace with Google Maps Iframe */}
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
