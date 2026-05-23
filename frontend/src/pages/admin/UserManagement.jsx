import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiUsers, FiTrash2, FiPower } from 'react-icons/fi';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        const actionText = newStatus === 'Active' ? 'activate' : 'deactivate';
        
        if (!window.confirm(`Are you sure you want to ${actionText} this user?`)) {
            return;
        }

        try {
            await api.put(`/admin/users/${id}/status`, { status: newStatus });
            setUsers(users.map(u => u._id === id ? { ...u, status: newStatus } : u));
        } catch (error) {
            console.error('Error updating status', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user and all their tasks? This action cannot be undone.')) {
            try {
                await api.delete(`/admin/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
            } catch (error) {
                console.error('Error deleting user', error);
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
                <div className="p-3 bg-blue-100 rounded-xl">
                    <FiUsers className="text-blue-600" size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Directory</h1>
                    <p className="text-gray-500 font-medium">Manage access and accounts for all platform users.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">User Info</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Role</th>
                                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 font-bold uppercase mr-4">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 text-base">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <span className={`text-sm font-bold ${user.role === 'Admin' ? 'text-purple-600' : 'text-blue-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <span className={`px-4 py-1.5 inline-flex text-xs font-bold rounded-full border ${
                                            user.status === 'Active' 
                                                ? 'bg-green-50 text-green-700 border-green-200' 
                                                : 'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2 transition-opacity">
                                            {user.role !== 'Admin' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleStatusChange(user._id, user.status)}
                                                        className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 font-bold text-xs ${
                                                            user.status === 'Active' ? 'text-orange-700 bg-orange-50 hover:bg-orange-100' : 'text-green-700 bg-green-50 hover:bg-green-100'
                                                        }`}
                                                    >
                                                        <FiPower size={14} /> {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(user._id)} 
                                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
