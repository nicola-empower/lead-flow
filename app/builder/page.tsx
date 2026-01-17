"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";
import { NodePalette } from "@/components/builder/NodePalette";

export default function BuilderPage() {
    return (
        <DashboardLayout>
            <div className="flex h-full">
                <NodePalette />
                <BuilderCanvas />
            </div>
        </DashboardLayout>
    );
}
