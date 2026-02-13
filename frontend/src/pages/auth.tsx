import React, { useState } from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Github, 
  Linkedin,
  UploadCloud,
  FileText,
  X
} from 'lucide-react';

type AuthMode = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [fileName, setFileName] = useState<string | null>(null);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setFileName(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center overflow-hidden relative font-sans text-slate-200 selection:bg-blue-500 selection:text-white">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] bg-blue-600/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] bg-indigo-600/10 rounded-full blur-[80px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      {/* --- CENTERED CARD --- */}
      <div className="relative z-10 w-full max-w-[360px]">
        
        {/* COMPACT HEADER */}
        <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 mb-1">
                <div className="bg-blue-600 p-1.5 rounded-md shadow-lg shadow-blue-500/20">
                    <Cpu size={18} className="text-white" />
                </div>
                <h1 className="font-bold text-xl tracking-tight text-white">
                    Faculty<span className="text-blue-500">OS</span>
                </h1>
            </div>
            <p className="text-xs text-slate-500">
                {mode === 'login' ? 'Welcome back.' : 'Create profile.'}
            </p>
        </div>

        {/* GLASS FORM BOX */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl">
            <div className="p-6">
                
                <form className="flex flex-col gap-3">
                    
                    {/* Name (Signup Only) */}
                    {mode === 'signup' && (
                        <div className="animate-fadeIn">
                            <input 
                                type="text" 
                                className="block w-full px-3 py-2 bg-slate-950/50 border border-slate-700 rounded-md text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all text-sm" 
                                placeholder="Full Name"
                            />
                        </div>
                    )}

                    {/* Email */}
                    <input 
                        type="email" 
                        className="block w-full px-3 py-2 bg-slate-950/50 border border-slate-700 rounded-md text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all text-sm" 
                        placeholder="Email Address"
                    />

                    {/* Password */}
                    <input 
                        type="password" 
                        className="block w-full px-3 py-2 bg-slate-950/50 border border-slate-700 rounded-md text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all text-sm" 
                        placeholder="Password"
                    />

                    {/* Compact CV Upload (Signup Only) */}
                    {mode === 'signup' && (
                        <div className="animate-fadeIn relative group">
                            <input 
                                type="file" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                onChange={handleFileChange}
                            />
                            <div className={`flex items-center justify-center gap-2 px-3 py-2 border border-dashed rounded-md transition-all ${fileName ? 'bg-blue-500/10 border-blue-500/50 text-blue-300' : 'bg-slate-950/30 border-slate-600 text-slate-500 hover:border-slate-500'}`}>
                                {fileName ? <FileText size={14}/> : <UploadCloud size={14}/>}
                                <span className="text-xs truncate max-w-[200px]">
                                    {fileName || "Upload Resume (PDF)"}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <button 
                        type="button"
                        className="mt-1 w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-lg shadow-blue-900/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all active:scale-[0.98]"
                    >
                        {mode === 'login' ? 'Log In' : 'Sign Up'}
                        <ArrowRight size={14} />
                    </button>
                </form>

                {/* Footer Section */}
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col items-center gap-3">
                    
                    <div className="text-xs text-slate-400">
                        {mode === 'login' ? "New here? " : "Joined already? "}
                        <button onClick={toggleMode} className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                            {mode === 'login' ? 'Create Account' : 'Log in'}
                        </button>
                    </div>

                    {/* Micro Socials */}
                    <div className="flex gap-3 opacity-60 hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white border border-slate-700">
                            <Github size={14} />
                        </button>
                        <button className="p-1.5 rounded bg-slate-800 text-blue-500 hover:text-blue-400 border border-slate-700">
                            <Linkedin size={14} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;