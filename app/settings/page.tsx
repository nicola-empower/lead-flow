"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, CreditCard, Shield, Bell, Copy } from "lucide-react";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="p-8 h-full overflow-y-auto w-full">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
                        <p className="text-slate-400">Manage your account and preferences.</p>
                    </div>

                    {/* Profile Section */}
                    <section className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <User size={20} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Profile</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-500 font-medium uppercase">First Name</label>
                                    <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" defaultValue="Demo" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-500 font-medium uppercase">Last Name</label>
                                    <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" defaultValue="User" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-500 font-medium uppercase">Email Address</label>
                                <input type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" defaultValue="demo@leadflow.app" />
                            </div>
                        </div>
                    </section>

                    {/* Plan Section */}
                    <section className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Current Plan</h3>
                                    <p className="text-slate-400 text-sm">You are on the <span className="text-white font-medium">Pro Plan</span></p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700">
                                Manage Billing
                            </button>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[75%]"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-slate-400">
                            <span>75,000 / 100,000 Events</span>
                            <span>Resets in 12 days</span>
                        </div>
                    </section>

                    {/* API Keys */}
                    <section className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">API Keys</h3>
                                <p className="text-slate-400 text-sm">Manage access tokens for your project.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700 group cursor-pointer relative">
                            <code className="text-slate-300 font-mono text-sm flex-1">pk_live_51M0...92xZ</code>
                            <button className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition-colors">
                                <Copy size={16} />
                            </button>
                        </div>
                        <button className="mt-4 text-sm text-primary hover:text-primary/80 font-medium">
                            + Generate New Secret Key
                        </button>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
