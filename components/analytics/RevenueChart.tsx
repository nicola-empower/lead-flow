"use client";

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';

const baseData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
];

interface RevenueChartProps {
    adSpendMultiplier?: number;
}

export function RevenueChart({ adSpendMultiplier = 1 }: RevenueChartProps) {
    const [visibleSeries, setVisibleSeries] = useState({ actual: true, projected: true });

    const chartData = useMemo(() => {
        return baseData.map(item => ({
            ...item,
            // Simple simulation logic: Projected = Revenue * (1 + (Multiplier - 1) * 0.8)
            // 0.8 factor implies diminishing returns or imperfect scaling
            projected: Math.round(item.revenue * (1 + (adSpendMultiplier - 1) * 0.8))
        }));
    }, [adSpendMultiplier]);

    const toggleSeries = (dataKey: 'actual' | 'projected') => {
        setVisibleSeries(prev => ({ ...prev, [dataKey]: !prev[dataKey] }));
    };

    return (
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm h-full">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-white">Revenue Projection</h3>
                    <p className="text-slate-400 text-sm">Actual vs Simulated outcomes ({adSpendMultiplier.toFixed(1)}x Spend)</p>
                </div>
                {/* Custom Legend Toggle */}
                <div className="flex gap-2">
                    <button
                        onClick={() => toggleSeries('actual')}
                        className={`text-xs px-2 py-1 rounded border transition-all ${visibleSeries.actual ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        Actual
                    </button>
                    <button
                        onClick={() => toggleSeries('projected')}
                        className={`text-xs px-2 py-1 rounded border transition-all ${visibleSeries.projected ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                        Simulated
                    </button>
                </div>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
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
                        {visibleSeries.actual && (
                            <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} name="Actual Revenue" />
                        )}
                        {visibleSeries.projected && (
                            <Area
                                type="monotone"
                                dataKey="projected"
                                stroke="#6366F1"
                                strokeDasharray="5 5"
                                fillOpacity={1}
                                fill="url(#colorProjected)"
                                strokeWidth={2}
                                name={`Projected (${adSpendMultiplier}x)`}
                                animationDuration={500}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
