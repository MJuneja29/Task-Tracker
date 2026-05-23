import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiTrash2, FiList } from 'react-icons/fi';

const TaskMonitoring = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/admin/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/admin/tasks/${id}`);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (error) {
                console.error('Error deleting task', error);
            }
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
                <div className="p-3 bg-purple-100 rounded-xl">
                    <FiList className="text-purple-600" size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Tasks</h1>
                    <p className="text-gray-500 font-medium">Monitor and manage all tasks across the platform.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Task Details</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Creator</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Created</th>
                                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {tasks.map((task) => (
                                <tr key={task._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-gray-900 text-base mb-1">{task.title}</div>
                                        <div className="text-sm text-gray-500 line-clamp-1 max-w-[200px]">{task.description}</div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <div className="font-semibold text-gray-800">{task.createdBy?.name}</div>
                                        <div className="text-xs text-gray-500">{task.createdBy?.email}</div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <span className={`px-4 py-1.5 inline-flex text-xs font-bold rounded-full border ${
                                            task.status === 'Completed' 
                                                ? 'bg-green-50 text-green-700 border-green-200' 
                                                : 'bg-orange-50 text-orange-700 border-orange-200'
                                        }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-500">
                                        {new Date(task.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleDelete(task._id)} 
                                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Delete Task"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center text-gray-500 font-medium">
                                        No tasks available in the system.
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

export default TaskMonitoring;
