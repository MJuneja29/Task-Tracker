import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyTasks from '../pages/user/MyTasks';
import TaskForm from '../pages/user/TaskForm';
import AnalyticsDashboard from '../pages/admin/AnalyticsDashboard';
import UserManagement from '../pages/admin/UserManagement';
import TaskMonitoring from '../pages/admin/TaskMonitoring';
import ActivityLogs from '../pages/admin/ActivityLogs';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

// Protected Route Wrapper
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;
    
    if (!user) return <Navigate to="/login" replace />;

    if (adminOnly && user.role !== 'Admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AppRoutes = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
            {user && <Navbar />}
            <div className="flex flex-1 overflow-hidden">
                {user && user.role === 'Admin' && <Sidebar />}
                
                <main className="flex-1 p-6 overflow-y-auto">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* User Routes */}
                        <Route path="/" element={
                            <ProtectedRoute>
                                {user?.role === 'Admin' ? <Navigate to="/admin" /> : <MyTasks />}
                            </ProtectedRoute>
                        } />
                        <Route path="/task/new" element={
                            <ProtectedRoute>
                                <TaskForm />
                            </ProtectedRoute>
                        } />
                        <Route path="/task/edit/:id" element={
                            <ProtectedRoute>
                                <TaskForm />
                            </ProtectedRoute>
                        } />

                        {/* Admin Routes */}
                        <Route path="/admin" element={
                            <ProtectedRoute adminOnly={true}>
                                <AnalyticsDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/users" element={
                            <ProtectedRoute adminOnly={true}>
                                <UserManagement />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/tasks" element={
                            <ProtectedRoute adminOnly={true}>
                                <TaskMonitoring />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/logs" element={
                            <ProtectedRoute adminOnly={true}>
                                <ActivityLogs />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AppRoutes;
