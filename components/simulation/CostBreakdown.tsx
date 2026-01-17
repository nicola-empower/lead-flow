"use client";

import { useSimulation } from "@/hooks/useSimulation";

export function CostBreakdown() {
    const { adSpendMultiplier } = useSimulation();

    const costs = [
        { channel: "Facebook Ads", base: 4500, cpl: 45 },
        { channel: "Google Search", base: 2100, cpl: 32 },
        { channel: "LinkedIn", base: 5000, cpl: 85 },
        { channel: "Tool Stack", base: 1200, cpl: 0 },
    ];

    const total = costs.reduce((acc, item) => acc + (item.base * adSpendMultiplier), 0);

    return (
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Cost Breakdown</h3>
                <p className="text-slate-400 text-sm">Estimated monthly spend based on current volume.</p>
            </div>

            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3 font-medium">Channel</th>
                        <th className="pb-3 font-medium text-right">Base Spend</th>
                        <th className="pb-3 font-medium text-right">Adjusted ({adSpendMultiplier}x)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {costs.map((item) => (
                        <tr key={item.channel}>
                            <td className="py-3 text-slate-200">{item.channel}</td>
                            <td className="py-3 text-right text-slate-500">£{item.base.toLocaleString()}</td>
                            <td className="py-3 text-right text-white font-mono">
                                £{(item.base * adSpendMultiplier).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="pt-4 font-bold text-white">Total</td>
                        <td className="pt-4 text-right text-slate-500"></td>
                        <td className="pt-4 text-right text-emerald-400 font-bold font-mono text-lg">
                            £{total.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
