"use client";

import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <AppSidebar />
            <div className="flex-1 flex flex-col pl-20">
                <AppHeader />
                <main className="flex-1 pt-16 relative overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
