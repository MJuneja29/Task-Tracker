import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const res = await register(name, email, password);
        setIsLoading(false);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="flex-1 flex items-center justify-center p-6 z-10">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">Create Account</h2>
                            <p className="text-gray-500 font-medium">Join us and start managing tasks today.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center justify-center animate-fade-in">
                                {error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FiUser />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none font-medium text-gray-800"
                                        placeholder="Manav Juneja"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FiMail />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none font-medium text-gray-800"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <FiLock />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none font-medium text-gray-800"
                                        placeholder="Min 6 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-2 py-4 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70"
                            >
                                {isLoading ? 'Creating Account...' : (
                                    <>
                                        Get Started
                                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm font-medium text-gray-500">
                            Already have an account? <Link to="/login" className="text-indigo-600 hover:text-purple-600 transition-colors">Sign in here</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Panel */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-bl from-indigo-900 via-purple-900 to-[#0B0F19] text-white items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="z-10 max-w-lg text-center animate-fade-in stagger-2">
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">Join The Future <br />Of Work.</h1>
                    <p className="text-indigo-200 text-lg leading-relaxed mb-8">
                        Experience seamless task tracking, role-based controls, and detailed analytics in one unified platform.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-500/50"></div>
                        <div className="w-12 h-2 rounded-full bg-indigo-500"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500/50"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
