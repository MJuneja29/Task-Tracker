import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiEdit2, FiTrash2, FiPlus, FiLayout, FiCheckCircle, FiCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Expand row state
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    
    // Modal state for completion
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [completingTask, setCompletingTask] = useState(null);
    const [completionNotes, setCompletionNotes] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
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
                await api.delete(`/tasks/${id}`);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (error) {
                console.error('Error deleting task', error);
            }
        }
    };

    const initiateToggleStatus = (task) => {
        if (task.status === 'Pending') {
            // Task is pending, let's complete it via Modal
            setCompletingTask(task);
            setCompletionNotes(task.completionNotes || '');
            setShowCompleteModal(true);
        } else {
            // Reverting from Completed to Pending
            if (window.confirm('Are you sure you want to mark this task as pending?')) {
                executeToggleStatus(task, 'Pending', '');
            }
        }
    };

    const executeToggleStatus = async (task, newStatus, notes) => {
        try {
            const updatedData = { ...task, status: newStatus, completionNotes: notes };
            await api.put(`/tasks/${task._id}`, updatedData);
            setTasks(tasks.map(t => t._id === task._id ? updatedData : t));
        } catch (error) {
            console.error('Error updating task status', error);
        }
    };

    const handleConfirmComplete = () => {
        if (completingTask) {
            executeToggleStatus(completingTask, 'Completed', completionNotes);
            setShowCompleteModal(false);
            setCompletingTask(null);
            setCompletionNotes('');
        }
    };

    const toggleExpand = (id) => {
        if (expandedTaskId === id) {
            setExpandedTaskId(null);
        } else {
            setExpandedTaskId(id);
        }
    };

    if (loading) return (
        <div className="flex h-[80vh] items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fade-in relative">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-100 rounded-xl">
                        <FiLayout className="text-indigo-600" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Tasks</h1>
                        <p className="text-gray-500 font-medium">Manage and track your personal workflow.</p>
                    </div>
                </div>
                <Link to="/task/new" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    <FiPlus size={20} /> Create Task
                </Link>
            </div>

            {tasks.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-16 flex flex-col items-center justify-center text-center animate-fade-in stagger-1">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <FiLayout className="text-gray-300" size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks found</h3>
                    <p className="text-gray-500 max-w-sm">You haven't created any tasks yet. Click the "Create Task" button to get started.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden animate-fade-in stagger-1">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-10"></th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Task Details</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Created</th>
                                    <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {tasks.map((task) => (
                                    <React.Fragment key={task._id}>
                                        <tr className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6 cursor-pointer text-gray-400 hover:text-indigo-600" onClick={() => toggleExpand(task._id)}>
                                                {expandedTaskId === task._id ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                            </td>
                                            <td className="px-8 py-6 cursor-pointer" onClick={() => toggleExpand(task._id)}>
                                                <div className={`font-bold text-base mb-1 ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                                    {task.title}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-1 max-w-md">{task.description}</div>
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
                                                {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3 transition-opacity">
                                                    <button 
                                                        onClick={() => initiateToggleStatus(task)} 
                                                        className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 font-bold text-xs ${
                                                            task.status === 'Completed' 
                                                                ? 'text-yellow-700 bg-yellow-50 hover:bg-yellow-100' 
                                                                : 'text-green-700 bg-green-50 hover:bg-green-100'
                                                        }`}
                                                    >
                                                        {task.status === 'Completed' ? (
                                                            <> <FiCircle size={14} /> Mark Pending </>
                                                        ) : (
                                                            <> <FiCheckCircle size={14} /> Mark Complete </>
                                                        )}
                                                    </button>
                                                    <Link to={`/task/edit/${task._id}`} className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="Edit Task">
                                                        <FiEdit2 size={18} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(task._id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Delete Task">
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Expanded Details Row */}
                                        {expandedTaskId === task._id && (
                                            <tr className="bg-indigo-50/30">
                                                <td colSpan="5" className="px-16 py-6 border-b border-gray-100">
                                                    <div className="animate-fade-in grid grid-cols-1 gap-6 text-sm">
                                                        <div>
                                                            <h4 className="font-bold text-indigo-900 mb-2 uppercase tracking-wide text-xs">Full Description</h4>
                                                            <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
                                                        </div>
                                                        {task.status === 'Completed' && (
                                                            <div>
                                                                <h4 className="font-bold text-green-800 mb-2 uppercase tracking-wide text-xs">Completion Notes</h4>
                                                                <div className="bg-white p-4 rounded-xl border border-green-100 text-gray-700 shadow-sm whitespace-pre-wrap">
                                                                    {task.completionNotes || <span className="text-gray-400 italic">No notes provided.</span>}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal for Completion Notes */}
            {showCompleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                        onClick={() => setShowCompleteModal(false)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-fade-in border border-gray-100">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Complete Task</h2>
                        <p className="text-gray-500 mb-6 font-medium">Add any final notes or comments before marking this task as completed. (Optional)</p>
                        
                        <textarea 
                            rows="4" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 outline-none text-gray-800 mb-6 resize-none"
                            placeholder="e.g., Finished all sub-tasks, client approved..."
                            value={completionNotes}
                            onChange={(e) => setCompletionNotes(e.target.value)}
                            autoFocus
                        ></textarea>
                        
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setShowCompleteModal(false)}
                                className="px-6 py-2.5 font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirmComplete}
                                className="px-6 py-2.5 font-bold text-white bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30 rounded-xl transition-all flex items-center gap-2"
                            >
                                <FiCheckCircle /> Confirm Completion
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTasks;
