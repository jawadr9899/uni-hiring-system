import React from 'react';
import { MoreVertical } from 'lucide-react';
import { type Candidate } from '@/types/types';

const MOCK_USERS: Candidate[] = [
  { id: 1, name: "Dr. Sarah Smith", role: "Candidate", status: "Verified" },
  { id: 2, name: "Prof. Alan Doe", role: "Candidate", status: "Pending" },
  { id: 3, name: "Jane Wilson", role: "Recruiter", status: "Verified" },
];

const CandidatesView = () => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-fadeIn">
    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
      <h3 className="font-semibold text-white">Registered Users</h3>
      <button className="text-sm text-blue-400 hover:text-blue-300">Export CSV</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="bg-slate-950/50 text-xs uppercase font-semibold text-slate-300">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Profile</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {MOCK_USERS.map((user) => (
            <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-medium text-white">{user.name}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${user.status === 'Verified' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-white">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CandidatesView;