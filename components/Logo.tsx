
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-125' : 'scale-100';
  
  return (
    <div className={`flex flex-col items-center justify-center py-4 ${scale} transition-transform`}>
      {/* Top Stars */}
      <div className="flex justify-center space-x-12 mb-2">
        <span className="text-blue-400 text-xl">★</span>
        <span className="text-red-600 text-2xl -mt-2">★</span>
        <span className="text-blue-400 text-xl">★</span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Rocket Recreated with emoji for simplicity but styled for impact */}
        <div className="relative mr-4 animate-pulse">
            <span className="text-6xl filter drop-shadow-md">🚀</span>
        </div>

        {/* GET Blocks */}
        <div className="flex space-x-2">
          {/* G Block */}
          <div className="w-16 h-16 bg-[#241b3b] rounded-2xl flex items-center justify-center shadow-lg border-b-4 border-black border-opacity-30 relative overflow-hidden">
             <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white opacity-20"></div>
             <span className="text-[#e63946] font-black text-4xl">G</span>
          </div>
          {/* E Block */}
          <div className="w-16 h-16 bg-[#f9d448] rounded-2xl flex items-center justify-center shadow-lg border-b-4 border-black border-opacity-10 relative overflow-hidden">
             <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white opacity-40"></div>
             <span className="text-[#e63946] font-black text-4xl">E</span>
          </div>
          {/* T Block */}
          <div className="w-16 h-16 bg-[#4cb9e7] rounded-2xl flex items-center justify-center shadow-lg border-b-4 border-black border-opacity-20 relative overflow-hidden">
             <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white opacity-20"></div>
             <span className="text-[#e63946] font-black text-4xl">T</span>
          </div>
        </div>
      </div>

      {/* PARAGUAI Text */}
      <div className="mt-2 flex space-x-1">
        {"PARAGUAI".split("").map((letter, i) => (
          <span key={i} className="text-[#f9d448] font-black text-3xl tracking-widest drop-shadow-sm" style={{ textShadow: '1px 1px 0px #000' }}>
            {letter}
          </span>
        ))}
      </div>

      {/* Bottom Stars */}
      <div className="flex space-x-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-[10px]">★</span>
        ))}
      </div>
    </div>
  );
};

export default Logo;
