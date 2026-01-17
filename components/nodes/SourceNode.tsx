"use client";

import { Handle, Position } from '@xyflow/react';
import { Megaphone, Mail, Globe, Search } from 'lucide-react';
import { clsx } from "clsx";

const icons = {
    facebook: Megaphone,
    email: Mail,
    organic: Search,
    direct: Globe,
};

export function SourceNode({ data }: { data: any }) {
    // @ts-ignore
    const Icon = icons[data.sourceType] || Globe;

    return (
        <div className="min-w-[180px] bg-slate-900/90 border-2 border-primary rounded-xl shadow-[0_0_20px_-5px_var(--color-primary)] backdrop-blur-md overflow-hidden transition-all hover:scale-105 group">
            <div className="bg-primary/20 p-3 flex items-center gap-3 border-b border-white/5">
                <div className="p-1.5 rounded-lg bg-primary text-white">
                    <Icon size={16} />
                </div>
                <div className="font-semibold text-white text-sm tracking-wide">{data.label}</div>
            </div>

            <div className="p-4 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Visitors</span>
                    <span className="text-white font-mono">{data.visitors?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Cost</span>
                    <span className="text-white font-mono">£{data.cost?.toLocaleString() || 0}</span>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="!w-3 !h-3 !bg-primary !border-2 !border-slate-900 group-hover:!bg-white transition-colors"
            />
        </div>
    );
}
