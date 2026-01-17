"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SimulationPanel } from "@/components/simulation/SimulationPanel";
import { CostBreakdown } from "@/components/simulation/CostBreakdown";

export default function SimulationPage() {
    return (
        <DashboardLayout>
            <div className="p-8 space-y-8 h-full overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Advanced Simulation</h1>
                        <p className="text-slate-400">Fine-tune simulation parameters and analyze cost implications.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        <SimulationPanel />
                        <CostBreakdown />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
