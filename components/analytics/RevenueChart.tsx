"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
    { name: 'Jan', revenue: 4000, projected: 2400 },
    { name: 'Feb', revenue: 3000, projected: 1398 },
    { name: 'Mar', revenue: 2000, projected: 9800 },
    { name: 'Apr', revenue: 2780, projected: 3908 },
    { name: 'May', revenue: 1890, projected: 4800 },
    { name: 'Jun', revenue: 2390, projected: 3800 },
    { name: 'Jul', revenue: 3490, projected: 4300 },
];

export function RevenueChart() {
    return (
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm h-full">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Revenue Projection</h3>
                <p className="text-slate-400 text-sm">Actual vs Simulated outcomes</p>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} name="Actual Revenue" />
                        <Area type="monotone" dataKey="projected" stroke="#6366F1" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProjected)" strokeWidth={2} name="Projected (Sim)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
