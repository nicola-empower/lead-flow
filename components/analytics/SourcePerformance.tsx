"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { name: 'Facebook', value: 12500, color: '#6366F1' },
    { name: 'Google', value: 8200, color: '#10B981' },
    { name: 'LinkedIn', value: 3400, color: '#F59E0B' },
    { name: 'Email', value: 1200, color: '#EC4899' },
];

export function SourcePerformance() {
    return (
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm h-full">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Source Volume</h3>
                <p className="text-slate-400 text-sm">Traffic distribution by channel</p>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                        <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
