import React, { useState } from 'react';
import { Search, Plus, Users, Trash2 } from 'lucide-react';
import { type Job } from '@/types/types';

const INITIAL_JOBS: Job[] = [
  { id: 1, title: "Senior Lecturer in AI", dept: "Computer Science", applicants: 42, status: 'Active' },
  { id: 2, title: "Research Fellow", dept: "Physics", applicants: 18, status: 'Active' },
  { id: 3, title: "Lab Technician", dept: "Biology", applicants: 5, status: 'Closed' },
];

const JobsView = () => {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  const handleDelete = (id: number) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Bar */}
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-500 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search jobs..." 
            className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none w-64" 
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <Plus size={16} /> Post Job
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left text-slate-400">
          <thead className="bg-slate-950/50 text-xs uppercase font-semibold text-slate-300">
            <tr>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Applicants</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{job.title}</td>
                <td className="px-6 py-4">{job.dept}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Users size={14} className="text-blue-500" /> {job.applicants}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/50 text-slate-400'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(job.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsView;