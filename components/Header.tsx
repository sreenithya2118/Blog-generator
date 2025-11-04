
import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquareIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Gemini Blog Studio
        </Link>
        <nav>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          >
            <PenSquareIcon className="h-5 w-5" />
            <span>New Post</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
