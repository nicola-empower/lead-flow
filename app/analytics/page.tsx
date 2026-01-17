"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { SourcePerformance } from "@/components/analytics/SourcePerformance";
import { KPICard } from "@/components/analytics/KPICard";
import { DollarSign, TrendingUp, Users, Wallet } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="p-8 space-y-8 h-full overflow-y-auto">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Analytics Overview</h1>
                    <p className="text-slate-400">Campaign performance and financial projections.</p>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard
                        label="Total Revenue"
                        value="£139,500"
                        change="+12.5%"
                        trend="up"
                        icon={DollarSign}
                        color="accent"
                    />
                    <KPICard
                        label="Ad Spend"
                        value="£11,600"
                        change="+2.1%"
                        trend="up"
                        icon={Wallet}
                        color="warning"
                    />
                    <KPICard
                        label="Total Leads"
                        value="24,100"
                        change="+5.4%"
                        trend="up"
                        icon={Users}
                        color="primary"
                    />
                    <KPICard
                        label="ROI"
                        value="1,202%"
                        change="-1.2%"
                        trend="down"
                        icon={TrendingUp}
                        color="accent"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                    <div className="lg:col-span-2 h-full">
                        <RevenueChart />
                    </div>
                    <div className="h-full">
                        <SourcePerformance />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
