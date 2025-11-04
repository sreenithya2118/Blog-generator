
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {currentYear} Gemini Blog Studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
