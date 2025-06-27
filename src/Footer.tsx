import React from 'react';

interface FooterProps {
  logoSrc: string;
}

const Footer: React.FC<FooterProps> = ({ logoSrc }) => (
  <footer className="bg-black/70 backdrop-blur-lg text-white py-12 sm:py-16 border-t border-gray-800 shadow-2xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <img
            src={logoSrc}
            alt="OrlandIV Logo"
            width={176}
            height={80}
            className="w-44 h-24 sm:w-56 sm:h-32 md:w-64 md:h-36 object-contain mx-auto bg-black/80"
            loading="lazy"
          />
        </div>
        <p className="text-gray-300 mb-6 sm:mb-8 text-lg sm:text-xl font-light">
          Premium web development services that elevate your digital presence
        </p>
        <div className="text-gray-400 text-base sm:text-lg">
          © 2025 orlandiv|John Orland Sudoy. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 