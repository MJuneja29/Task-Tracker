import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 border-b border-gray-200/50 px-6 py-4 flex justify-between items-center transition-all duration-300">
            <div className="font-extrabold text-2xl tracking-tight">
                <Link to="/" className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all">
                    TaskMaster AI
                </Link>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-white/50 px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                        <FiUser size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-800 font-semibold text-sm leading-tight">{user?.name}</span>
                        <span className={`text-[10px] font-bold tracking-wide uppercase ${user?.role === 'Admin' ? 'text-purple-600' : 'text-blue-600'}`}>
                            {user?.role}
                        </span>
                    </div>
                </div>
                
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm group"
                >
                    <FiLogOut className="group-hover:rotate-12 transition-transform" /> 
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
