
import React, { useState } from 'react';
import { Candidate } from '../types';

interface Props {
  candidates: Candidate[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onStart: () => void;
}

const SetupScreen: React.FC<Props> = ({ candidates, onAdd, onRemove, onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="text-center">
        <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-black uppercase text-sm mb-2 shadow-md">Fase de Preparação</div>
        <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Cadastro de Candidatos</h2>
        <p className="text-gray-500 font-medium">Adicione os nomes dos alunos que concorrem à vaga.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-2 bg-gray-100 rounded-[32px] border-4 border-gray-200">
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do candidato..."
          className="flex-grow p-5 text-2xl bg-white border-4 border-transparent rounded-[24px] focus:outline-none focus:border-yellow-400 transition-all font-bold placeholder:text-gray-300"
        />
        <button 
          type="submit"
          className="bg-green-600 text-white px-10 py-5 rounded-[24px] text-xl font-black lego-brick hover:bg-green-700 active:scale-95 flex items-center justify-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
          </svg>
          ADICIONAR
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-[200px]">
        {candidates.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-300">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>
            <p className="text-xl font-black text-gray-400 uppercase tracking-widest">Aguardando Candidatos</p>
          </div>
        ) : (
          candidates.map((c) => (
            <div 
              key={c.id} 
              className="lego-brick p-5 flex items-center justify-between group overflow-hidden"
              style={{ backgroundColor: c.color }}
            >
              <div className="lego-studs">
                {[...Array(6)].map((_, i) => <div key={i} className="stud"></div>)}
              </div>
              
              <div className="flex items-center space-x-5 relative z-10">
                <div className="w-12 h-12 bg-white rounded-xl shadow-inner flex items-center justify-center">
                  <span className="text-2xl" style={{ color: c.color }}>👤</span>
                </div>
                <span className={`text-2xl font-black tracking-tight ${c.color === '#FFD500' ? 'text-gray-900' : 'text-white'}`}>
                  {c.name}
                </span>
              </div>
              
              <button 
                onClick={() => onRemove(c.id)}
                className="relative z-10 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-xl transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center pt-6">
        <button 
          onClick={onStart}
          disabled={candidates.length === 0}
          className={`
            px-16 py-6 rounded-[32px] text-3xl font-black uppercase tracking-widest transition-all lego-brick
            ${candidates.length > 0 
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          Iniciar Votação
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;
