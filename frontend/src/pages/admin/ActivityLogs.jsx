import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiActivity } from 'react-icons/fi';

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const { data } = await api.get('/admin/logs');
            setLogs(data);
        } catch (error) {
            console.error('Error fetching logs', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex h-[80vh] items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-teal-100 rounded-xl">
                    <FiActivity className="text-teal-600" size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Logs</h1>
                    <p className="text-gray-500 font-medium">Audit trail of all actions performed across the platform.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden relative">
                {/* Subtle gradient strip at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500"></div>
                
                <div className="overflow-x-auto mt-1">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Time</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">User</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Action Performed</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Target ID</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {logs.map((log) => (
                                <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-500">
                                        {new Date(log.createdAt).toLocaleString(undefined, { 
                                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                                        })}
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <div className="font-semibold text-gray-800">{log.user?.name}</div>
                                        <div className="text-xs text-gray-500">{log.user?.email}</div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <span className={`px-4 py-1.5 inline-flex text-xs font-bold rounded-full border ${
                                            log.action.includes('Delete') ? 'bg-red-50 text-red-700 border-red-200' :
                                            log.action.includes('Create') ? 'bg-green-50 text-green-700 border-green-200' :
                                            'bg-indigo-50 text-indigo-700 border-indigo-200'
                                        }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-400 font-mono bg-gray-50/30">
                                        {log.targetId || '—'}
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-12 text-center text-gray-500 font-medium">
                                        No activity logs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogs;
