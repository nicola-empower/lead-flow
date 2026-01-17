"use client";

import { Megaphone, Filter, BadgeDollarSign, GripVertical } from "lucide-react";

export function NodePalette() {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-64 bg-slate-900 border-r border-white/5 p-4 flex flex-col gap-4">
            <div className="mb-2">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Components</h2>
            </div>

            <div
                className="bg-slate-800 p-3 rounded-lg border border-white/5 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors flex items-center gap-3"
                onDragStart={(event) => onDragStart(event, 'source')}
                draggable
            >
                <GripVertical size={16} className="text-slate-600" />
                <div className="p-1.5 rounded bg-primary text-white">
                    <Megaphone size={16} />
                </div>
                <div className="text-sm font-medium text-slate-200">Traffic Source</div>
            </div>

            <div
                className="bg-slate-800 p-3 rounded-lg border border-white/5 cursor-grab active:cursor-grabbing hover:border-slate-500/50 transition-colors flex items-center gap-3"
                onDragStart={(event) => onDragStart(event, 'process')}
                draggable
            >
                <GripVertical size={16} className="text-slate-600" />
                <div className="p-1.5 rounded bg-slate-700 text-slate-300">
                    <Filter size={16} />
                </div>
                <div className="text-sm font-medium text-slate-200">Process Step</div>
            </div>

            <div
                className="bg-slate-800 p-3 rounded-lg border border-white/5 cursor-grab active:cursor-grabbing hover:border-emerald-500/50 transition-colors flex items-center gap-3"
                onDragStart={(event) => onDragStart(event, 'outcome')}
                draggable
            >
                <GripVertical size={16} className="text-slate-600" />
                <div className="p-1.5 rounded bg-emerald-500 text-white">
                    <BadgeDollarSign size={16} />
                </div>
                <div className="text-sm font-medium text-slate-200">Outcome</div>
            </div>

            <div className="mt-auto p-4 bg-slate-800/50 rounded-lg border border-white/5">
                <p className="text-xs text-slate-400 text-center">
                    Drag items onto the canvas to add them to your flow.
                </p>
            </div>
        </div>
    );
}
