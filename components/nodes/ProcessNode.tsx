"use client";

import { Handle, Position } from '@xyflow/react';
import { Filter, MousePointerClick, AlertTriangle } from 'lucide-react';

export function ProcessNode({ data }: { data: any }) {
    const isLeak = data.conversionRate < 10;
    const isGood = data.conversionRate > 20;

    return (
        <div className={`min-w-[200px] bg-slate-900/90 border rounded-xl shadow-xl backdrop-blur-md transition-all hover:border-slate-500 group ${isLeak ? 'border-red-500/50 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]' : 'border-slate-700/50'}`}>
            <Handle
                type="target"
                position={Position.Left}
                className="!w-3 !h-3 !bg-slate-500 !border-2 !border-slate-900"
            />

            <div className={`bg-slate-800/50 p-3 flex items-center gap-3 border-b ${isLeak ? 'border-red-500/20' : 'border-white/5'}`}>
                <div className={`p-1.5 rounded-lg ${isLeak ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                    {isLeak ? <AlertTriangle size={16} /> : <Filter size={16} />}
                </div>
                <div className="font-medium text-slate-200 text-sm">{data.label}</div>
            </div>

            <div className="p-4 space-y-3">
                {/* Metric Bar */}
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Conversion</span>
                        <div className="flex items-center gap-1">
                            <span className={`font-mono ${isLeak ? 'text-red-500 font-bold animate-pulse' : isGood ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {data.conversionRate}%
                            </span>
                        </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${isLeak ? 'bg-red-500' : isGood ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${data.conversionRate}%` }}
                        />
                    </div>
                </div>

                {isLeak && (
                    <div className="text-[10px] text-red-400 bg-red-500/10 p-1.5 rounded border border-red-500/20 animate-pulse">
                        Critical Drop-off detected.
                    </div>
                )}

                <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span>Throughput</span>
                    <span className="text-white font-mono">{Math.floor((data.visitors * data.conversionRate) / 100).toLocaleString()}</span>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="!w-3 !h-3 !bg-slate-500 !border-2 !border-slate-900 group-hover:!bg-white transition-colors"
            />
        </div>
    );
}
