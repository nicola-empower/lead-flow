"use client";

import { Home, MousePointer2, Settings, BarChart3, Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: MousePointer2, label: "Flow Builder", href: "/builder" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Layers, label: "Simulation", href: "/simulation" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-6 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 z-50">
            <div className="mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-white font-bold text-xl">L</span>
                </div>
            </div>

            <nav className="flex-1 w-full flex flex-col gap-4 items-center">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "p-3 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-white/10 text-primary shadow-inner"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                            title={item.label}
                        >
                            <item.icon className="w-6 h-6" />
                            {isActive && (
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full translate-x-3" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto">
                {/* User Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" />
            </div>
        </aside>
    );
}
