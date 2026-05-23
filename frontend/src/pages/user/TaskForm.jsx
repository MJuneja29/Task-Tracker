import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [error, setError] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            fetchTask();
        }
    }, [id]);

    const fetchTask = async () => {
        try {
            const { data } = await api.get('/tasks');
            const task = data.find(t => t._id === id);
            if (task) {
                setTitle(task.title);
                setDescription(task.description);
                setStatus(task.status);
            }
        } catch (error) {
            console.error('Error fetching task', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!window.confirm(isEditMode ? 'Are you sure you want to update this task?' : 'Are you sure you want to create this task?')) {
            return;
        }

        setError('');
        
        try {
            const taskData = { title, description, status };
            
            if (isEditMode) {
                await api.put(`/tasks/${id}`, taskData);
            } else {
                await api.post('/tasks', taskData);
            }
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-3xl mx-auto animate-fade-in">
            <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium mb-8 transition-colors group"
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to tasks
            </button>

            <div className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{isEditMode ? 'Edit Task' : 'Create New Task'}</h1>
                
                {error && <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-fade-in">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Task Title</label>
                        <input 
                            type="text" 
                            required 
                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none font-medium text-gray-800"
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Description</label>
                        <textarea 
                            required 
                            rows="5"
                            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none font-medium text-gray-800 resize-none"
                            placeholder="Add more details about this task..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Status</label>
                        <div className="relative">
                            <select 
                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none font-medium text-gray-800 appearance-none cursor-pointer"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100 flex gap-4 justify-end">
                        <button type="button" onClick={() => navigate('/')} className="px-6 py-3 font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-3 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center gap-2">
                            <FiSave /> {isEditMode ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
