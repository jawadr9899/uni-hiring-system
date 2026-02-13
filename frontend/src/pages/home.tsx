import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  FileScan, 
  BrainCircuit, 
  Users, 
  Search 
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'university' | 'faculty'>('university');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                        <Cpu className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        Faculty<span className="text-blue-500">OS</span>
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
                    <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                    <a href="#features" className="hover:text-white transition-colors">AI Engine</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium hover:text-white transition-colors">Log in</button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20">
                        Post a Job
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Copy */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-medium text-blue-400 mb-6 shadow-sm">
                        <Zap className="h-3 w-3" />
                        <span>Automated Faculty Recruitment Engine</span>
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Stop Interviewing. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            Start Hiring.
                        </span>
                    </h1>
                    
                    <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                        We are not a university. We are the filter that saves you from them. 
                        Our AI scans thousands of academic CVs to deliver the top 1% of matches to your dashboard instantly.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex justify-center items-center gap-2 bg-white text-slate-900 px-8 py-3.5 rounded-lg font-bold hover:bg-slate-100 transition-all shadow-xl shadow-white/5">
                            <Users className="h-4 w-4" />
                            I'm Hiring Faculty
                        </button>
                        <button className="flex justify-center items-center gap-2 bg-slate-800 border border-slate-700 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-slate-700 transition-all">
                            <CheckCircle2 className="h-4 w-4" />
                            I'm an Academic
                        </button>
                    </div>
                    
                    <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span>Trusted by 500+ Institutions to reduce hiring time.</span>
                    </div>
                </div>

                {/* Right: The Dashboard Mockup (Visual Proof of SaaS) */}
                <div className="relative">
                    {/* The Glass Card */}
                    <div className="bg-slate-900/80 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-slate-700/50 relative z-10 transform transition-transform hover:scale-[1.01] duration-500">
                        
                        {/* Fake Browser Header */}
                        <div className="flex justify-between items-center mb-6 border-b border-slate-700/50 pb-4">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                                SYSTEM STATUS: OPTIMAL
                            </div>
                        </div>

                        {/* Candidate Match Item */}
                        <div className="space-y-3">
                            {/* Card 1 */}
                            <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/5">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center border border-slate-600">
                                    <span className="font-bold text-white text-xs">JD</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h4 className="text-white font-semibold text-sm">Dr. John Doe, PhD</h4>
                                        <span className="text-xs text-blue-400 font-mono">High Fit</span>
                                    </div>
                                    <div className="flex gap-2 text-[10px] text-slate-400 mt-1">
                                        <span className="bg-slate-700 px-1.5 py-0.5 rounded">Computer Science</span>
                                        <span className="bg-slate-700 px-1.5 py-0.5 rounded">H-Index: 14</span>
                                    </div>
                                </div>
                                <div className="text-right pl-4 border-l border-slate-700">
                                    <div className="text-[10px] text-slate-500 font-mono mb-0.5">MATCH</div>
                                    <div className="text-lg font-bold text-emerald-400">98%</div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="flex items-center gap-4 bg-slate-800/20 p-4 rounded-lg border border-slate-700/50 opacity-60">
                                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                    <span className="font-bold text-slate-400 text-xs">AM</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-slate-300 font-medium text-sm">Prof. A. Miller</h4>
                                    <div className="h-2 w-16 bg-slate-700 rounded mt-2"></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-slate-500">74%</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating "Time Saved" Badge */}
                        <div className="absolute -right-6 -bottom-6 bg-slate-900 border border-slate-700 p-4 rounded-lg shadow-xl flex items-center gap-3 animate-bounce-slow">
                            <div className="bg-emerald-500/10 p-2 rounded-full">
                                <Clock className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400">Avg Time Saved</div>
                                <div className="font-bold text-white">42 Hours</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                <div className="px-4">
                    <div className="text-4xl font-bold text-white mb-1">15k+</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Academics Vetted</div>
                </div>
                <div className="px-4">
                    <div className="text-4xl font-bold text-blue-400 mb-1">85%</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Faster Hiring</div>
                </div>
                <div className="px-4">
                    <div className="text-4xl font-bold text-white mb-1">Zero</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Bad Interviews</div>
                </div>
            </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (TABBED) --- */}
      <section id="how-it-works" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Technology, Not Administration</h2>
                <p className="text-slate-400 text-lg">
                    We replaced the manual hiring committee with advanced algorithms. Choose your path to see how it works.
                </p>
                
                {/* Toggle Switch */}
                <div className="flex justify-center mt-8">
                    <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 inline-flex">
                        <button 
                            onClick={() => setActiveTab('university')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'university' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            For Universities
                        </button>
                        <button 
                            onClick={() => setActiveTab('faculty')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'faculty' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            For Faculty
                        </button>
                    </div>
                </div>
            </div>

            {/* Dynamic Content Based on Tab */}
            <div className="grid md:grid-cols-3 gap-8">
                {activeTab === 'university' ? (
                    <>
                         <FeatureCard 
                            icon={<FileScan />} 
                            title="1. Define Parameters" 
                            desc="Input your requirements: PhD topics, years of tenure, publication count, and salary range." 
                        />
                         <FeatureCard 
                            icon={<BrainCircuit />} 
                            title="2. AI Analysis" 
                            desc="Our engine scans the global talent pool, filtering out 95% of candidates who don't meet the criteria." 
                        />
                         <FeatureCard 
                            icon={<CheckCircle2 />} 
                            title="3. Instant Shortlist" 
                            desc="Receive a ranked list of 5 verified experts ready to interview. No fluff, just results." 
                        />
                    </>
                ) : (
                    <>
                         <FeatureCard 
                            icon={<FileScan />} 
                            title="1. One Profile" 
                            desc="Upload your CV once. Our system parses your publications, degrees, and teaching history automatically." 
                        />
                         <FeatureCard 
                            icon={<Search />} 
                            title="2. Auto-Matching" 
                            desc="You don't apply to jobs. Jobs apply to you. We notify you when a top university requests an interview." 
                        />
                         <FeatureCard 
                            icon={<Zap />} 
                            title="3. Fast Track" 
                            desc="Skip the first 3 rounds of generic interviews. Go straight to the decision makers." 
                        />
                    </>
                )}
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    <span className="font-bold text-xl text-white">Faculty<span className="text-blue-500">OS</span></span>
                </div>
                <div className="text-slate-500 text-sm">
                    © 2024 FacultyOS Inc. All rights reserved.
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

// Simple helper component for features to keep code clean
const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors group">
        <div className="bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-900/50 transition-colors text-blue-400">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">
            {desc}
        </p>
    </div>
);

export default LandingPage;