
import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <div className="relative pt-6">
      {/* Decorative top studs for the header "brick" */}
      <div className="flex justify-around absolute top-0 left-0 right-0 px-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-6 h-3 bg-yellow-500 rounded-t-full shadow-sm"></div>
        ))}
      </div>
      
      <div className="bg-white p-4 flex flex-col md:flex-row items-center justify-center md:justify-between border-b-[8px] border-gray-200 relative z-10 rounded-t-xl overflow-hidden">
        {/* The Brand Logo is now the centerpiece */}
        <div className="flex-grow flex justify-center md:justify-start">
           <Logo size="sm" />
        </div>

        <div className="hidden md:flex flex-col items-end space-y-2">
          <div className="flex space-x-2">
            <div className="w-4 h-4 rounded-full bg-[#241b3b]"></div>
            <div className="w-4 h-4 rounded-full bg-[#f9d448]"></div>
            <div className="w-4 h-4 rounded-full bg-[#4cb9e7]"></div>
            <div className="w-4 h-4 rounded-full bg-[#e63946]"></div>
          </div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Urna Digital Escolar</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
