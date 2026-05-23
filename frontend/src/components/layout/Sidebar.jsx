import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPieChart, FiUsers, FiList, FiActivity, FiUser } from 'react-icons/fi';

const Sidebar = () => {
    const links = [
        { path: '/admin', name: 'Analytics', icon: <FiPieChart size={20} /> },
        { path: '/admin/users', name: 'Users', icon: <FiUsers size={20} /> },
        { path: '/admin/tasks', name: 'Tasks', icon: <FiList size={20} /> },
        { path: '/admin/logs', name: 'Activity', icon: <FiActivity size={20} /> },
        { path: '/about', name: 'About Admin', icon: <FiUser size={20} /> },
    ];

    return (
        <aside className="w-64 bg-[#0B0F19] text-gray-400 flex flex-col hidden md:flex border-r border-gray-800/50 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>

            <div className="p-6 relative z-10">
                <h2 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Admin Workspace</h2>
                <div className="h-1 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            
            <nav className="flex-1 px-4 relative z-10">
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                end={link.path === '/admin'}
                                className={({ isActive }) => 
                                    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                                        isActive 
                                            ? 'text-white bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(79,70,229,0.15)]' 
                                            : 'hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Active state indicator line */}
                                        {isActive && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-md"></div>
                                        )}
                                        
                                        <div className={`transition-transform duration-300 ${isActive ? 'text-indigo-400 scale-110' : 'group-hover:text-indigo-400 group-hover:scale-110'}`}>
                                            {link.icon}
                                        </div>
                                        <span className="font-medium tracking-wide">{link.name}</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="p-6 text-xs text-gray-600 text-center relative z-10">
                &copy; 2026 TaskMaster AI
            </div>
        </aside>
    );
};

export default Sidebar;
