import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, User, Loader2, ArrowLeft } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi there! 👋 I am the Automiq Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Form Flow State for leaving messages
  const [formState, setFormState] = useState({
    active: false,
    step: '', // 'name', 'email', 'subject', 'message'
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  const quickReplies = [
    { label: '💼 Services', value: 'services' },
    { label: '👥 Leadership & Founders', value: 'founders' },
    { label: '📞 Contact Details', value: 'contact' },
    { label: '⏰ Working Hours', value: 'hours' },
    { label: '✉️ Leave a Message', value: 'leave_message' }
  ];

  const handleQuickReply = (value) => {
    // Add user message
    const userMsg = {
      sender: 'user',
      text: quickReplies.find(q => q.value === value)?.label || value,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    
    // Process response
    setIsTyping(true);
    setTimeout(() => {
      processBotResponse(value);
    }, 800);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const userMsg = {
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      if (formState.active) {
        handleFormFlow(userText);
      } else {
        processBotResponse(userText.toLowerCase());
      }
    }, 800);
  };

  const startFormFlow = () => {
    setFormState({
      active: true,
      step: 'name',
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setMessages(prev => [
      ...prev,
      {
        sender: 'bot',
        text: 'Great! Let’s leave a message for our team. First, what is your full name?',
        timestamp: new Date()
      }
    ]);
    setIsTyping(false);
  };

  const handleFormFlow = async (text) => {
    const { step } = formState;

    if (step === 'name') {
      setFormState(prev => ({ ...prev, step: 'email', name: text }));
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Nice to meet you, ${text}! What is your email address?`,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    } else if (step === 'email') {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: 'Oops! That doesn’t look like a valid email address. Could you please double-check and enter it again?',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
        return;
      }

      setFormState(prev => ({ ...prev, step: 'subject', email: text }));
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Got it. What is the subject of your inquiry?',
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    } else if (step === 'subject') {
      setFormState(prev => ({ ...prev, step: 'message', subject: text }));
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Perfect. Finally, please enter your message below:',
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    } else if (step === 'message') {
      const updatedForm = { ...formState, message: text };
      setFormState(prev => ({ ...prev, step: 'submitting', message: text }));
      
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sending your inquiry to the Automiq team...',
          timestamp: new Date()
        }
      ]);

      try {
        const response = await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: updatedForm.name,
            email: updatedForm.email,
            subject: updatedForm.subject,
            message: updatedForm.message
          })
        });

        if (response.ok) {
          setMessages(prev => [
            ...prev,
            {
              sender: 'bot',
              text: `Thank you, ${updatedForm.name}! Your message has been sent successfully. Our team will get back to you at ${updatedForm.email} shortly.`,
              timestamp: new Date()
            }
          ]);
        } else {
          throw new Error('Failed to send');
        }
      } catch (err) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: 'I ran into an issue submitting your message. Please try sending a message via our Contact page or try again later.',
            timestamp: new Date()
          }
        ]);
      } finally {
        setFormState({
          active: false,
          step: '',
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsTyping(false);
      }
    }
  };

  const processBotResponse = (input) => {
    setIsTyping(false);
    
    // Exact quick reply values or keyword matching
    if (input === 'services' || input.includes('service') || input.includes('offer') || input.includes('what do you do')) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'We offer state-of-the-art software solutions tailored to your business:\n\n💻 **Web Development**: High-performance React & Next.js apps.\n📱 **Mobile Apps**: Cross-platform iOS/Android development (React Native, Flutter).\n🏢 **Enterprise Solutions**: Comprehensive custom ERP systems.\n🤖 **AI & ML**: Intelligent diagnostic applications and predictive modeling.',
          timestamp: new Date()
        }
      ]);
    } else if (input === 'founders' || input.includes('founder') || input.includes('ceo') || input.includes('cto') || input.includes('leader') || input.includes('leadership') || input.includes('boss') || input.includes('who runs') || input.includes('team')) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Automiq Tech is led by:\n\n👨‍💼 **Abdulla Al Bayzed** (Co-Founder & CEO)\n👨‍💻 **Asib Ahmed** (Co-Founder & CTO)\n👨‍🎨 **Hasibul Kabir Emon** (Lead Architect)\n\nThey lead a talented group of software engineers and designers dedicated to client success.',
          timestamp: new Date()
        }
      ]);
    } else if (input === 'contact' || input.includes('contact') || input.includes('phone') || input.includes('email') || input.includes('address') || input.includes('office') || input.includes('location') || input.includes('where are you')) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Here is how you can connect with us:\n\n📧 **Email**: hello@automiqtech.com\n📞 **Phone**: +8801708019889\n📍 **Office**: 12/A, Mirpur-6, Dhaka-1216, Bangladesh.',
          timestamp: new Date()
        }
      ]);
    } else if (input === 'hours' || input.includes('hour') || input.includes('time') || input.includes('when') || input.includes('open') || input.includes('schedule')) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Our official working hours are:\n\n📅 **Sunday - Thursday**: 10:00 AM - 7:00 PM\n🛑 **Friday & Saturday**: Closed',
          timestamp: new Date()
        }
      ]);
    } else if (input === 'leave_message' || input.includes('message') || input.includes('write') || input.includes('send') || input.includes('hire') || input.includes('inquiry') || input.includes('project')) {
      startFormFlow();
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('hola')) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Hello! 😊 How can I help you today? Choose one of the quick replies below or type your question.',
          timestamp: new Date()
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'I’m not sure I quite got that. I can tell you about our services, leadership, contact details, working hours, or help you leave a message for our team.',
          timestamp: new Date()
        }
      ]);
    }
  };

  const cancelFormFlow = () => {
    setFormState({
      active: false,
      step: '',
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setMessages(prev => [
      ...prev,
      {
        sender: 'bot',
        text: 'Form inquiry cancelled. How else can I help you?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/30 focus:outline-none"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={28} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-primary-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-primary-500 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] rounded-3xl overflow-hidden glass shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col backdrop-blur-xl bg-white/90 dark:bg-slate-950/90"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold flex items-center space-x-1.5 text-base">
                    <span>Automiq Agent</span>
                    <Sparkles size={14} className="text-amber-300 animate-pulse" />
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-white/80">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}>
                      {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-800/50'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                      <Bot size={16} className="text-slate-600 dark:text-slate-300" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-4 py-3 flex space-x-1.5 items-center shadow-sm">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Panel (only when not in the middle of submission form) */}
            {!formState.active && (
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-900/50 bg-slate-50/50 dark:bg-slate-950/20 flex flex-wrap gap-2 justify-center">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.value}
                    onClick={() => handleQuickReply(reply.value)}
                    className="text-xs bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}

            {/* Active Form Flow Helper Header */}
            {formState.active && (
              <div className="px-5 py-2.5 bg-amber-500/10 border-t border-amber-500/25 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400">
                <span className="font-semibold uppercase tracking-wider">Form input active</span>
                <button
                  onClick={cancelFormFlow}
                  className="flex items-center space-x-1 hover:underline text-red-500 dark:text-red-400"
                >
                  <ArrowLeft size={12} />
                  <span>Cancel</span>
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2 bg-white dark:bg-slate-950"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={formState.active ? `Enter your ${formState.step}...` : 'Ask me anything about Automiq Tech...'}
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 text-slate-800 dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || formState.step === 'submitting'}
                className="w-11 h-11 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-primary-500/25 shrink-0"
              >
                {formState.step === 'submitting' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
