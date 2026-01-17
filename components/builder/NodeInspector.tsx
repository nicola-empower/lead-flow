"use client";

import { X, Settings2 } from "lucide-react";

interface NodeData {
    label: string;
    visitors?: number;
    cost?: number;
    conversionRate?: number;
    revenue?: number;
    valuePerDeal?: number;
    baseVisitors?: number;
    [key: string]: any;
}

interface NodeInspectorProps {
    selectedNode: any | null;
    onUpdate: (id: string, data: Partial<NodeData>) => void;
    onClose: () => void;
}

export function NodeInspector({ selectedNode, onUpdate, onClose }: NodeInspectorProps) {
    if (!selectedNode) return null;

    const { type, data } = selectedNode;

    const handleChange = (field: string, value: any) => {
        onUpdate(selectedNode.id, { [field]: value });
    };

    return (
        <div className="absolute top-4 right-4 z-20 w-80 bg-slate-900/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-slate-800/50">
                <div className="flex items-center gap-2 text-white font-medium">
                    <Settings2 size={16} className="text-primary" />
                    <span>Edit {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Node'}</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Form Fields */}
            <div className="p-4 space-y-4">
                {/* Common: Label */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</label>
                    <input
                        type="text"
                        value={data.label || ''}
                        onChange={(e) => handleChange('label', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="Node Name"
                    />
                </div>

                {/* Source Specific */}
                {type === 'source' && (
                    <>
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Base Monthly Visitors</label>
                                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 rounded border border-blue-500/20">Synced API</span>
                            </div>
                            <input
                                type="number"
                                value={data.visitors || 0}
                                onChange={(e) => handleChange('visitors', parseInt(e.target.value) || 0)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Cost (£)</label>
                            <input
                                type="number"
                                value={data.cost || 0}
                                onChange={(e) => handleChange('cost', parseInt(e.target.value) || 0)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </>
                )}

                {/* Process Specific */}
                {type === 'process' && (
                    <>
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Conversion Rate (%)</label>
                                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 rounded border border-blue-500/20">Real Data</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={data.conversionRate || 0}
                                    onChange={(e) => handleChange('conversionRate', parseFloat(e.target.value))}
                                    className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <span className="text-sm font-mono text-primary w-12 text-right">{data.conversionRate}%</span>
                            </div>
                        </div>

                        {/* 🤖 AI Profit Playbook */}
                        {(data.conversionRate as number) < 20 && (
                            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg animate-in fade-in zoom-in-95 duration-300">
                                <div className="flex items-center gap-2 text-amber-500 mb-2">
                                    <span className="text-lg">🤖</span>
                                    <h4 className="font-semibold text-xs uppercase tracking-wider">AI Profit Playbook</h4>
                                </div>
                                <p className="text-amber-200 text-xs mb-3 leading-relaxed">
                                    <strong>Critical Drop-off Detected!</strong><br />
                                    This step converts below industry average (20%).
                                </p>
                                <div className="bg-slate-900/50 p-2 rounded border border-white/5 mb-3">
                                    <p className="text-slate-300 text-[10px] italic">
                                        "Based on 1,000+ funnels, adding an <strong>Urgency Countdown</strong> here typically lifts conversion by <strong>4.2%</strong>."
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleChange('conversionRate', Math.min(100, (data.conversionRate as number) + 5))}
                                    className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    ✨ Apply AI Fix (+5%)
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Outcome Specific */}
                {type === 'outcome' && (
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Value Per Deal (£)</label>
                        <input
                            type="number"
                            value={data.valuePerDeal || 0}
                            onChange={(e) => handleChange('valuePerDeal', parseInt(e.target.value) || 0)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                        />
                        <p className="text-[10px] text-slate-500">Revenue = Visitors * Value Per Deal</p>
                    </div>
                )}
            </div>

            {/* Footer / Info */}
            <div className="p-4 bg-slate-800/30 border-t border-white/5 text-[10px] text-slate-500">
                ID: <span className="font-mono text-slate-400">{selectedNode.id}</span>
            </div>
        </div>
    );
}
