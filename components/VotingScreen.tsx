
import React from 'react';
import { Candidate } from '../types';

interface Props {
  candidates: Candidate[];
  selectedId: string | 'blank' | null;
  onSelect: (id: string | 'blank') => void;
  onConfirm: () => void;
  onViewResults: () => void;
}

const VotingScreen: React.FC<Props> = ({ candidates, selectedId, onSelect, onConfirm, onViewResults }) => {
  const currentSelection = selectedId === 'blank' 
    ? { name: 'VOTO EM BRANCO', color: '#f3f4f6' } 
    : candidates.find(c => c.id === selectedId);

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-gray-900 uppercase leading-none">Faça sua Escolha</h2>
            <p className="text-lg font-bold text-gray-400 mt-2 uppercase tracking-wide">Clique no seu candidato favorito</p>
        </div>
        <button 
            onClick={onViewResults}
            className="bg-white border-4 border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-400 px-6 py-3 rounded-2xl flex items-center gap-2 font-black transition-all shadow-sm"
        >
            APURAÇÃO
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`
              relative p-8 h-40 rounded-3xl text-left transition-all lego-brick overflow-hidden
              ${selectedId === c.id ? 'ring-[10px] ring-blue-500 scale-105 z-10' : 'hover:scale-102 hover:brightness-110'}
            `}
            style={{ backgroundColor: c.color }}
          >
            {/* Lego studs decoration */}
            <div className="lego-studs">
               {[...Array(12)].map((_, i) => <div key={i} className="stud"></div>)}
            </div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
               <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👤</span>
               </div>
               <span className={`text-2xl font-black uppercase tracking-tighter break-words ${c.color === '#FFD500' ? 'text-gray-900' : 'text-white'}`}>
                 {c.name}
               </span>
            </div>
          </button>
        ))}

        <button
          onClick={() => onSelect('blank')}
          className={`
            relative p-8 h-40 rounded-3xl text-left transition-all lego-brick bg-white border-4 border-gray-200 overflow-hidden
            ${selectedId === 'blank' ? 'ring-[10px] ring-blue-500 scale-105 z-10' : 'hover:scale-102'}
          `}
        >
          <div className="lego-studs text-gray-200">
             {[...Array(12)].map((_, i) => <div key={i} className="stud"></div>)}
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full">
             <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚪</span>
             </div>
             <span className="text-2xl font-black text-gray-400 uppercase tracking-tighter">VOTO EM BRANCO</span>
          </div>
        </button>
      </div>

      {/* Chunky Control Panel */}
      <div className="mt-16 bg-gray-900 p-10 rounded-[50px] shadow-2xl relative border-b-[16px] border-black overflow-hidden">
        {/* Decorative pattern for the panel */}
        <div className="absolute top-0 right-0 p-4 flex space-x-2 opacity-20">
          <div className="w-4 h-4 rounded-full bg-white"></div>
          <div className="w-4 h-4 rounded-full bg-white"></div>
          <div className="w-4 h-4 rounded-full bg-white"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 relative z-10">
          <div className="flex-grow bg-white rounded-[32px] p-8 border-[6px] border-gray-700 flex flex-col justify-center min-h-[140px] shadow-inner">
            {currentSelection ? (
              <div className="flex items-center space-x-6 animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl lego-brick" style={{ backgroundColor: currentSelection.color }}></div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">Candidato Selecionado</span>
                  <span className="text-4xl font-black text-gray-900 tracking-tighter">{currentSelection.name}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-6 opacity-30">
                <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
                <span className="text-3xl font-black text-gray-400 uppercase italic">Aguardando Seleção...</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => onSelect(null as any)}
              disabled={!selectedId}
              className={`
                px-10 py-6 rounded-3xl text-2xl font-black uppercase tracking-tight lego-brick transition-all
                ${selectedId ? 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95' : 'bg-gray-700 text-gray-600 cursor-not-allowed shadow-none'}
              `}
            >
              Corrigir
            </button>
            <button
              onClick={onConfirm}
              disabled={!selectedId}
              className={`
                px-16 py-6 rounded-3xl text-3xl font-black uppercase tracking-widest lego-brick transition-all
                ${selectedId ? 'bg-green-600 text-white hover:bg-green-700 active:scale-95' : 'bg-gray-700 text-gray-600 cursor-not-allowed shadow-none'}
              `}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingScreen;
