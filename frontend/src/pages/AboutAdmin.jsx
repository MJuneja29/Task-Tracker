import React from 'react';
import { FiAward, FiBriefcase, FiBookOpen, FiCode, FiExternalLink } from 'react-icons/fi';

const AboutAdmin = () => {
    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto animate-fade-in pb-20">
            {/* Header Section */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-5xl font-black shadow-xl shrink-0 border-4 border-white">
                        MJ
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Manav Juneja</h1>
                        <p className="text-xl text-indigo-600 font-bold mb-6">AI & Machine Learning Engineer</p>
                        <p className="text-gray-600 leading-relaxed max-w-2xl text-lg">
                            AI-focused engineer with hands-on experience in machine learning, deep learning, and speech processing systems. Completed AI specialization from IIT Ropar and architected real-world ASR pipelines. Skilled in Python, data processing, and building scalable AI applications across computer vision and speech domains. Seeking opportunities to apply AI in production environments.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Education */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                <FiBookOpen size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Education</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="relative pl-6 border-l-2 border-gray-100">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-100 border-4 border-white"></div>
                                <h3 className="font-bold text-gray-900">Indian Institute of Technology, Ropar</h3>
                                <p className="text-gray-500 text-sm mt-1">Major in Artificial Intelligence</p>
                            </div>
                            <div className="relative pl-6 border-l-2 border-gray-100">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-100 border-4 border-white"></div>
                                <h3 className="font-bold text-gray-900">Thapar University, Patiala</h3>
                                <p className="text-gray-500 text-sm mt-1">Bachelor of Engineering – Mechanical</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                <FiCode size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Technical Skills</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Machine Learning & AI</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Regression', 'Classification', 'Deep Learning (LSTM, CNN)', 'Speech Processing (ASR)', 'RAG'].map(s => (
                                        <span key={s} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Back-End & Data</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Python', 'Node.js', 'Express.js', 'FastAPI', 'MongoDB', 'Pandas', 'NumPy'].map(s => (
                                        <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Front-End</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'JavaScript', 'Tailwind CSS'].map(s => (
                                        <span key={s} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-lg text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Experience */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                                <FiBriefcase size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                        </div>

                        <div className="space-y-8">
                            <div className="relative pl-6 border-l-2 border-indigo-100">
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_0_4px_white]"></div>
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-1">
                                    <h3 className="text-lg font-bold text-gray-900">AI Engineer</h3>
                                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">Feb 2026 – Apr 2026</span>
                                </div>
                                <p className="text-gray-500 font-medium mb-3">Annam.ai (IIT Ropar)</p>
                                <ul className="space-y-2 text-gray-600 list-disc list-inside">
                                    <li>Spearheaded farmer query clustering and built an end-to-end ASR pipeline for meeting analysis</li>
                                    <li>Developed 2 MCP servers for agricultural market insights and soil health advisory systems</li>
                                </ul>
                            </div>

                            <div className="relative pl-6 border-l-2 border-gray-100">
                                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gray-300 shadow-[0_0_0_4px_white]"></div>
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-1">
                                    <h3 className="text-lg font-bold text-gray-900">Design Engineer</h3>
                                    <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">2019 – 2026</span>
                                </div>
                                <p className="text-gray-500 font-medium mb-3">Harshit Industries, Ludhiana</p>
                                <ul className="space-y-2 text-gray-600 list-disc list-inside">
                                    <li>Led mechanical component design using SolidWorks, managing projects from concept to manufacturing</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                                <FiAward size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Featured Projects</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Project 1 */}
                            <div className="group p-5 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Outreach Report Generation & ASR Pipeline</h3>
                                    <a href="https://github.com/MJuneja29/outreach-report-generator.git" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors p-1"><FiExternalLink size={18} /></a>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Python</span>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Whisper</span>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">LLMs</span>
                                </div>
                                <ul className="space-y-1 text-gray-600 text-sm list-disc list-inside">
                                    <li>Architected end-to-end pipeline for farmer meeting analysis (30–40 min audio inputs), including diarization, ASR, translation, and automated report generation (PDF).</li>
                                    <li>Optimized Whisper fine-tuning using BAFT-T, reducing training cost by 5.2x and updating only 0.1–1% parameters vs full fine-tuning.</li>
                                </ul>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Project 2 */}
                            <div className="group p-5 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">Farmer Query Clustering System</h3>
                                    <a href="https://github.com/MJuneja29/FAQCluster.git" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors p-1"><FiExternalLink size={18} /></a>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">NLP</span>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">HDBSCAN</span>
                                </div>
                                <ul className="space-y-1 text-gray-600 text-sm list-disc list-inside">
                                    <li>Designed a hybrid clustering pipeline combining HDBSCAN with Agglomerative Clustering, applied on 50k+ Punjab farmer queries per crop.</li>
                                    <li>Improved clustering quality with composite score increased from 0.86 to 0.94.</li>
                                </ul>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Project 3 */}
                            <div className="group p-5 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">FitPredict: Activity Prediction System</h3>
                                    <a href="https://github.com/MJuneja29/FitPredict_Activity-Prediction-and-Motivation-System.git" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors p-1"><FiExternalLink size={18} /></a>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Machine Learning</span>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">LSTM</span>
                                </div>
                                <ul className="space-y-1 text-gray-600 text-sm list-disc list-inside">
                                    <li>Developed LSTM-based time-series models on 1.5M+ wearable data points achieving 90% prediction accuracy.</li>
                                    <li>Built classification models for goal prediction with 83.8% precision and 86.1% recall.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutAdmin;
