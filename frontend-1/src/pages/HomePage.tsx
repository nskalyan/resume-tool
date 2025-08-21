import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/pages.css';

const features = [
    {
        icon: '📄',
        title: 'ATS Score Checker',
        description:
            'Instantly evaluate your resume using industry-standard ATS rules. Get actionable feedback to improve your chances.',
        color: '#3b82f6', // blue-500
    },
    {
        icon: '🎯',
        title: 'Role & Company Keywords',
        description:
            'Align your resume with relevant keywords tailored to your target role and company using real hiring patterns.',
        color: '#f472b6', // pink-400
    },
    {
        icon: '🏆',
        title: 'Winning Templates',
        description:
            'Explore resumes that landed interviews at Google, Amazon, Flipkart, AMD, and more to shape your own.',
        color: '#10b981', // emerald-500
    },
];

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center px-4 py-16">
            {/* Logo and Title Section */}
            <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center px-8 py-6 mb-12 transition-transform duration-500 hover:scale-105 hover:shadow-3xl">
                <img
                    src={logo}
                    alt="ATS Resume Pro Logo"
                    className="h-24 md:h-28 mb-4 transition-transform duration-500 hover:rotate-6"
                />
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
                    ATS Resume Pro
                </h1>
                <span className="text-base text-gray-500 mt-2 font-medium">CV Matters</span>
            </div>
            
            {/* Main Actions and CTA */}
            <section className="text-center mb-16 max-w-4xl">
                <p className="mb-8 text-lg md:text-xl text-gray-700 font-light leading-relaxed">
                    Build, evaluate, and optimize your resume for top companies.
                    <br />
                    <span className="text-purple-600 font-bold text-xl md:text-2xl mt-2 block">
                        Stand out. Get noticed. Get hired.
                    </span>
                </p>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    <Link to="/evaluate">
                        <button className="button bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Evaluate Resume 🚀
                        </button>
                    </Link>
                    <Link to="/editor">
                        <button className="button bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-300">
                            Optimize Resume ✨
                        </button>
                    </Link>
                    <Link to="/examples">
                        <button className="button bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300">
                            View Examples 📈
                        </button>
                    </Link>
                    <Link to="/about">
                        <button className="button bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300">
                            About Us ℹ️
                        </button>
                    </Link>
                </div>
            </section>
            
            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 w-full max-w-7xl px-4">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="card text-center p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 transform hover:-translate-y-2"
                        style={{
                            borderTop: `6px solid ${feature.color}`,
                        }}
                    >
                        <div
                            className="text-5xl mb-4"
                            style={{ color: feature.color }}
                        >
                            {feature.icon}
                        </div>
                        <h3
                            className="text-2xl font-bold mb-3"
                            style={{ color: feature.color }}
                        >
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default HomePage;
