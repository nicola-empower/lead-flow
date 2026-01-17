"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { SourcePerformance } from "@/components/analytics/SourcePerformance";
import { KPICard } from "@/components/analytics/KPICard";
import { DollarSign, TrendingUp, Users, Wallet } from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";

export default function AnalyticsPage() {
    const { adSpendMultiplier } = useSimulation();

    // Simple mock logic for KPI simulation
    const multiplier = adSpendMultiplier || 1;
    const isSimulated = multiplier !== 1;

    // Helper to calculate sim values
    const getSimValue = (base: number, factor: number = 0.8) => {
        return Math.round(base * (1 + (multiplier - 1) * factor));
    };

    const revenue = 139500;
    const simRevenue = getSimValue(revenue);

    return (
        <DashboardLayout>
            <div className="p-8 space-y-8 h-full overflow-y-auto">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Analytics Overview</h1>
                        <p className="text-slate-400">Campaign performance and financial projections.</p>
                    </div>
                    {isSimulated && (
                        <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-lg">
                            <span className="text-indigo-400 text-sm font-medium flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                Simulation Active: {multiplier.toFixed(1)}x Ad Spend
                            </span>
                        </div>
                    )}
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard
                        label="Total Revenue"
                        value={`£${simRevenue.toLocaleString()}`}
                        change={isSimulated ? `+${((simRevenue / revenue - 1) * 100).toFixed(1)}%` : "+12.5%"}
                        trend="up"
                        icon={DollarSign}
                        color="accent"
                        subtext={isSimulated ? `vs Baseline £${revenue.toLocaleString()}` : "vs last month"}
                    />
                    <KPICard
                        label="Ad Spend"
                        value={`£${(11600 * multiplier).toLocaleString()}`}
                        change={isSimulated ? `+${((multiplier - 1) * 100).toFixed(0)}%` : "+2.1%"}
                        trend="up"
                        icon={Wallet}
                        color="warning"
                        subtext={isSimulated ? `Boosted by ${multiplier}x` : "vs last month"}
                    />
                    <KPICard
                        label="Total Leads"
                        value={(24100 * (1 + (multiplier - 1) * 0.7)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        change="+5.4%"
                        trend="up"
                        icon={Users}
                        color="primary"
                        subtext="Projected Volume"
                    />
                    <KPICard
                        label="ROI"
                        value={`${(1202 * (1 - (multiplier - 1) * 0.1)).toFixed(0)}%`}
                        change="-1.2%"
                        trend="down"
                        icon={TrendingUp}
                        color="accent"
                        subtext="Diminishing returns at scale"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                    <div className="lg:col-span-2 h-full">
                        <RevenueChart adSpendMultiplier={multiplier} />
                    </div>
                    <div className="h-full">
                        <SourcePerformance />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
