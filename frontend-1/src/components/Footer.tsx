import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm mb-2">© {new Date().getFullYear()} ATS Resume Pro. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="/about" className="hover:text-blue-400 transition duration-300">About Us</a>
          <a href="/privacy" className="hover:text-blue-400 transition duration-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-400 transition duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;