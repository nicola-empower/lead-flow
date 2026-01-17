"use client";

import { Play, Pause, RotateCcw, Zap } from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";

export function SimulationControls() {
    const { isPlaying, togglePlay, adSpendMultiplier, setAdSpend } = useSimulation();

    return (
        <div className="flex items-center gap-4">
            {/* Time Machine Slider */}
            <div className="hidden md:flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-amber-400">
                    <Zap size={14} className="fill-current" />
                    <span className="text-xs font-medium uppercase tracking-wider">Ad Spend</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">1x</span>
                    <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={adSpendMultiplier}
                        onChange={(e) => setAdSpend(parseFloat(e.target.value))}
                        className="w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="text-xs text-primary font-mono font-bold">{adSpendMultiplier.toFixed(1)}x</span>
                </div>
            </div>

            <div className="h-6 w-px bg-white/10 mx-2" />

            {/* Playback Controls */}
            <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-white/5">
                <button
                    className="p-2 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors"
                    title="Reset Simulation"
                    onClick={() => setAdSpend(1)}
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-white/10" />
                <button
                    onClick={togglePlay}
                    className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-colors shadow-lg ${isPlaying
                            ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 shadow-amber-500/5 border border-amber-500/20'
                            : 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
                        }`}
                >
                    {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                    {isPlaying ? 'Pause' : 'Run Sim'}
                </button>
            </div>
        </div>
    );
}
