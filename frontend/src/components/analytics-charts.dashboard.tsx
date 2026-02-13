import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector
} from 'recharts';
import { type ChartDataPoint } from '@/types/types';

// --- CUSTOM SHAPE RENDERER (Replaces <Cell>) ---
// This function reads the 'fill' color directly from the data payload
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={payload.fill} // <--- Color applied here
      stroke={payload.fill}
    />
  );
};

const ACTIVITY_DATA = [
  { name: 'Mon', active: 400 },
  { name: 'Tue', active: 300 },
  { name: 'Wed', active: 200 },
  { name: 'Thu', active: 278 },
  { name: 'Fri', active: 189 },
  { name: 'Sat', active: 239 },
  { name: 'Sun', active: 349 },
];

const DEPARTMENT_DATA: ChartDataPoint[] = [
  { name: 'Comp Sci', value: 45, fill: '#3b82f6' },
  { name: 'Physics', value: 25, fill: '#8b5cf6' },
  { name: 'Math', value: 20, fill: '#10b981' },
  { name: 'Arts', value: 10, fill: '#f59e0b' },
];

export const ActivityChart = () => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
    <h3 className="text-lg font-semibold text-white mb-6">Application Activity</h3>
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={ACTIVITY_DATA}>
          <defs>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#94a3b8' }}
          />
          <Area type="monotone" dataKey="active" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const DepartmentChart = () => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
    <h3 className="text-lg font-semibold text-white mb-6">By Department</h3>
    <div className="h-[250px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={DEPARTMENT_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            activeShape={renderActiveShape} // Uses custom shape
            shape={renderActiveShape}       // Uses custom shape
            stroke="none"
          />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Legend built manually for better control */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {DEPARTMENT_DATA.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></span>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);