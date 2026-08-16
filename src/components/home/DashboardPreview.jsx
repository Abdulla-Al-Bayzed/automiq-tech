import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Bell, 
  Code2,
  Terminal,
  Layers,
  Search,
  Settings,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// Sub-component for Animated Line Chart
const LineChart = () => (
  <div className="w-full h-24 relative group">
    <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38a9f8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70 T 400 30"
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70 T 400 30 V 100 H 0 Z"
        fill="url(#lineGradient)"
      />
      {/* Animated dots */}
      {[0, 100, 200, 300, 400].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={i === 0 ? 80 : i === 1 ? 60 : i === 2 ? 40 : i === 3 ? 70 : 30}
          r="4"
          className="fill-primary-500"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: 1 + i * 0.2 }}
        />
      ))}
    </svg>
  </div>
);

// Sub-component for Circular Progress
const CircularProgress = ({ value, label, color }) => (
  <div className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/5 rounded-2xl relative group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="stroke-slate-800"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <motion.path
          className={color === 'blue' ? 'stroke-primary-500' : 'stroke-purple-500'}
          strokeWidth="3"
          strokeDasharray={`${value}, 100`}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">
        {value}%
      </div>
    </div>
    <div className="mt-2 text-[8px] font-black uppercase tracking-widest text-slate-500">{label}</div>
  </div>
);

// Sub-component for AI Assistant Popup
const AIAssistant = () => (
  <motion.div
    initial={{ opacity: 0, x: 20, y: 20 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay: 2 }}
    className="absolute bottom-6 right-6 z-30 flex items-center space-x-3 bg-slate-900/90 backdrop-blur-xl border border-white/20 p-3 rounded-2xl shadow-2xl"
  >
    <div className="relative">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
        <Sparkles size={18} className="text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
    </div>
    <div className="pr-4">
      <div className="text-[10px] font-black uppercase tracking-widest text-primary-400 mb-0.5">AI Engine</div>
      <div className="text-xs font-bold text-slate-200">Processing Node-04...</div>
    </div>
  </motion.div>
);

const MetricCard = ({ icon: Icon, label, value, trend, color }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-3 flex flex-col justify-between group overflow-hidden relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex justify-between items-start relative z-10">
      <div className={`p-2 rounded-lg ${color === 'blue' ? 'bg-blue-500/10 text-blue-500' : color === 'purple' ? 'bg-purple-500/10 text-purple-500' : 'bg-amber-500/10 text-amber-500'}`}>
        <Icon size={18} />
      </div>
      <div className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-wider">
        {trend}
      </div>
    </div>
    <div className="mt-3 relative z-10">
      <div className="text-slate-400 text-[10px] uppercase font-black tracking-widest">{label}</div>
      <div className="text-xl font-black text-white mt-1">{value}</div>
    </div>
  </motion.div>
);

const DashboardPreview = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto group">
      {/* Floating Particles/Glows */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
      
      {/* Floating Micro-Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -40, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: 5 + i, 
            repeat: Infinity, 
            delay: i * 0.5 
          }}
          className="absolute w-1 h-1 bg-primary-400 rounded-full blur-[1px]"
          style={{ 
            top: `${20 + i * 15}%`, 
            left: `${10 + i * 20}%` 
          }}
        />
      ))}

      {/* Main Dashboard Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 bg-slate-950/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Dashboard Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02] relative z-10">
          <div className="flex items-center space-x-6">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center space-x-4">
              <div className="p-1.5 bg-primary-500/20 rounded-lg">
                <Layers className="text-primary-500" size={14} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Automiq OS</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center space-x-3 hidden sm:flex">
              <Search size={14} className="text-slate-500" />
              <span className="text-xs text-slate-500">Quick Search...</span>
              <span className="text-[10px] text-slate-600 bg-black/30 px-1.5 py-0.5 rounded border border-white/5">⌘K</span>
            </div>
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-slate-400 relative">
              <Bell size={18} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-slate-900" />
            </div>
          </div>
        </div>

        <div className="flex relative z-10">
          {/* Sidebar */}
          <div className="w-20 lg:w-56 border-r border-white/5 p-3 space-y-4 hidden md:block bg-white/[0.01]">
            <div className="space-y-1">
              {['Overview', 'Analytics', 'Deployments', 'Settings'].map((item, i) => (
                <div 
                  key={item} 
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                    i === 0 ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {i === 0 && <Activity size={18} />}
                  {i === 1 && <BarChart3 size={18} />}
                  {i === 2 && <Zap size={18} />}
                  {i === 3 && <Settings size={18} />}
                  <span className="text-sm font-bold hidden lg:block">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-6 hidden lg:block">
              <div className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-600 mb-4">Teams</div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-black text-white">AI</div>
                  <span className="text-xs font-bold text-slate-400">AI Engineering</span>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 opacity-50">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px] font-black text-white">UX</div>
                  <span className="text-xs font-bold text-slate-400">Design Lab</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-5 md:p-6 space-y-6 bg-gradient-to-b from-transparent to-black/20">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard 
                icon={Activity} 
                label="System Health" 
                value="99.9%" 
                trend="+2.4%" 
                color="blue"
              />
              <MetricCard 
                icon={Cpu} 
                label="AI Usage" 
                value="14.2k" 
                trend="+18%" 
                color="purple"
              />
              <MetricCard 
                icon={Zap} 
                label="API Latency" 
                value="24ms" 
                trend="-4ms" 
                color="amber"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Main Chart Section */}
              <div className="xl:col-span-2 bg-white/[0.03] border border-white/5 rounded-3xl p-5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <h3 className="text-lg font-black text-white">Resource Performance</h3>
                    <p className="text-xs text-slate-500 mt-1">Real-time data flow monitoring</p>
                  </div>
                  <div className="flex space-x-2">
                    {['1H', '24H', '7D'].map((t, i) => (
                      <button key={t} className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-tighter ${i === 1 ? 'bg-primary-500 text-white' : 'bg-white/5 text-slate-500'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative z-10">
                  <LineChart />
                </div>
              </div>

              {/* Circular Progress Widgets */}
              <div className="grid grid-cols-2 gap-4">
                <CircularProgress value={85} label="Server CPU" color="blue" />
                <CircularProgress value={62} label="Memory" color="purple" />
                <CircularProgress value={94} label="Efficiency" color="blue" />
                <CircularProgress value={18} label="Cache Miss" color="purple" />
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Activity Feed */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Live Activity</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Live</span>
                  </div>
                </div>
                {[1, 2, 3].map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                        {i === 0 ? <Globe size={20} /> : <Terminal size={20} />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-200">
                          {i === 0 ? 'Deployment success' : 'AI Node scaling'}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">Production-v2 • {i + 1}m ago</div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>

              {/* Code Snippet / Technical Insight */}
              <div className="bg-slate-950/80 border border-white/10 rounded-3xl p-5 relative overflow-hidden group/code">
                <div className="absolute top-0 right-0 p-4 opacity-30">
                  <Code2 size={40} className="text-primary-500" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-6">Security Engine</div>
                <div className="font-mono text-[11px] space-y-2 text-slate-400">
                  <div className="flex space-x-4">
                    <span className="text-slate-600">01</span>
                    <span><span className="text-purple-400">import</span> {'{ engine }'} <span className="text-purple-400">from</span> <span className="text-green-400">'@automiq/ai'</span>;</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-slate-600">02</span>
                    <span><span className="text-blue-400">const</span> config = engine.<span className="text-amber-400">init</span>({'{'}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-slate-600">03</span>
                    <span className="ml-4">secure: <span className="text-amber-400">true</span>,</span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-slate-600">04</span>
                    <span className="ml-4">nodes: <span className="text-amber-400">12</span></span>
                  </div>
                  <div className="flex space-x-4">
                    <span className="text-slate-600">05</span>
                    <span>{'}'});</span>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black text-white">U{i}</div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-primary-500 flex items-center justify-center text-[10px] font-black text-white">+4</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500">Collaborating...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Assistant Popup */}
        <AIAssistant />
      </motion.div>

      {/* Floating Interactive Elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -right-12 glass px-6 py-4 rounded-2xl shadow-2xl border border-primary-500/30 backdrop-blur-xl z-20 hidden lg:block"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <ShieldCheck className="text-green-500" size={20} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">System Integrity</div>
            <div className="text-sm font-black text-white">Encrypted & Verified</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 -left-12 glass px-6 py-4 rounded-2xl shadow-2xl border border-indigo-500/30 backdrop-blur-xl z-20 hidden lg:block"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <TrendingUp className="text-indigo-500" size={20} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">Revenue Growth</div>
            <div className="text-sm font-black text-white">$142.8k <span className="text-green-500 ml-2">↑12%</span></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPreview;
