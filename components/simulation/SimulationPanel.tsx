"use client";

import { useSimulation } from "@/hooks/useSimulation";
import { Sliders, TrendingUp, Users, DollarSign } from "lucide-react";

export function SimulationPanel() {
    const {
        churnRate, conversionLift, avgOrderValue,
        setChurn, setLift, setAOV
    } = useSimulation();

    return (
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Sliders size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Simulation Parameters</h3>
                    <p className="text-slate-400 text-sm">Adjust global variables</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Conversion Lift */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-200">
                            <TrendingUp size={16} className="text-emerald-400" />
                            <span className="text-sm font-medium">Conversion Lift</span>
                        </div>
                        <span className="text-emerald-400 font-mono font-bold">+{conversionLift}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={conversionLift}
                        onChange={(e) => setLift(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <p className="text-xs text-slate-500">Global impact on all conversion nodes.</p>
                </div>

                {/* Churn Rate */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-200">
                            <Users size={16} className="text-red-400" />
                            <span className="text-sm font-medium">Churn Rate</span>
                        </div>
                        <span className="text-red-400 font-mono font-bold">{churnRate}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        step="0.5"
                        value={churnRate}
                        onChange={(e) => setChurn(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                    <p className="text-xs text-slate-500">Percentage of leads lost to attrition.</p>
                </div>

                {/* AOV */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-200">
                            <DollarSign size={16} className="text-amber-400" />
                            <span className="text-sm font-medium">Avg. Deal Value</span>
                        </div>
                        <span className="text-amber-400 font-mono font-bold">£{avgOrderValue.toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="100"
                        value={avgOrderValue}
                        onChange={(e) => setAOV(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <p className="text-xs text-slate-500">Average revenue per closed deal.</p>
                </div>
            </div>
        </div>
    );
}
