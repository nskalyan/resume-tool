import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Evaluate', path: '/evaluate' },
    { label: 'Optimize', path: '/editor' },
    { label: 'Examples', path: '/examples' },
    { label: 'About', path: '/about' }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-auto rounded" />
          <span className="text-xl font-semibold text-blue-700 tracking-wide">ATS Resume Pro</span>
        </Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`text-base font-medium px-3 py-1 rounded transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;