import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiUsers, FiList, FiCheckCircle, FiClock, FiTrendingUp } from 'react-icons/fi';

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get('/admin/analytics');
                setStats(data);
            } catch (error) {
                console.error('Error fetching analytics', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="flex h-[80vh] items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    const cards = [
        { title: 'Total Users', value: stats.totalUsers, icon: <FiUsers className="text-white" size={24} />, gradient: 'from-blue-500 to-cyan-500', stagger: 'stagger-1' },
        { title: 'Total Tasks', value: stats.totalTasks, icon: <FiList className="text-white" size={24} />, gradient: 'from-purple-500 to-indigo-500', stagger: 'stagger-2' },
        { title: 'Completed', value: stats.completedTasks, icon: <FiCheckCircle className="text-white" size={24} />, gradient: 'from-emerald-500 to-teal-500', stagger: 'stagger-3' },
        { title: 'Pending', value: stats.pendingTasks, icon: <FiClock className="text-white" size={24} />, gradient: 'from-orange-400 to-amber-500', stagger: 'stagger-4' },
    ];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
                <div className="p-3 bg-indigo-100 rounded-xl">
                    <FiTrendingUp className="text-indigo-600" size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Platform Overview</h1>
                    <p className="text-gray-500 font-medium">Real-time statistics across the entire system.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className={`bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 animate-fade-in ${card.stagger}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}>
                                {card.icon}
                            </div>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-gray-800 mb-1">{card.value}</p>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 animate-fade-in stagger-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Welcome to the Admin Workspace</h3>
                <p className="text-gray-500">
                    Use the sidebar navigation to manage users, monitor all task activities, and view detailed system logs. The interface is designed to provide you with a high-level overview while allowing deep dives into specific entities.
                </p>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
