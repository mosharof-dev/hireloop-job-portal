import React from 'react';
import { FiUsers, FiBox, FiBriefcase, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const StatCard = ({ title, value, trend, icon: Icon, colorClass }) => (
    <div className="bg-[#121214] border border-white/8 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-opacity-10 ${colorClass}`}>
                <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-').replace('/10', '')}`} />
            </div>
            {trend && (
                <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <FiTrendingUp className="w-3.5 h-3.5" />
                    {trend}
                </div>
            )}
        </div>
        <div>
            <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
            <p className="text-white text-3xl font-bold">{value}</p>
        </div>
    </div>
);

export default function AdminDashboard() {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Admin Overview</h1>
                <p className="text-zinc-400">Monitor and manage platform activity, users, and revenue.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Users" 
                    value="12,450" 
                    trend="+12%" 
                    icon={FiUsers} 
                    colorClass="bg-blue-500/10 text-blue-500" 
                />
                <StatCard 
                    title="Registered Companies" 
                    value="840" 
                    trend="+5%" 
                    icon={FiBox} 
                    colorClass="bg-indigo-500/10 text-indigo-500" 
                />
                <StatCard 
                    title="Active Jobs" 
                    value="3,200" 
                    trend="+18%" 
                    icon={FiBriefcase} 
                    colorClass="bg-amber-500/10 text-amber-500" 
                />
                <StatCard 
                    title="Total Revenue" 
                    value="$45,200" 
                    trend="+24%" 
                    icon={FiDollarSign} 
                    colorClass="bg-emerald-500/10 text-emerald-500" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#121214] border border-white/8 p-6 rounded-2xl min-h-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FiTrendingUp className="w-8 h-8 text-zinc-500" />
                        </div>
                        <h3 className="text-white font-medium mb-2">Platform Activity Chart</h3>
                        <p className="text-zinc-500 text-sm">Revenue & User Growth visualizations will appear here.</p>
                    </div>
                </div>

                <div className="bg-[#121214] border border-white/8 p-6 rounded-2xl min-h-100">
                    <h3 className="text-white font-medium mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
                                    <FiUsers className="w-5 h-5 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-300">
                                        <span className="text-white font-medium">New User</span> registered as Recruiter.
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-1">{i * 10} mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
