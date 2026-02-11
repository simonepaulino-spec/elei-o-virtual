
import React from 'react';
import { Candidate } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface Props {
  candidates: Candidate[];
  blankVotes: number;
  totalVotes: number;
  onReset: () => void;
}

const ResultsScreen: React.FC<Props> = ({ candidates, blankVotes, totalVotes, onReset }) => {
  const chartData = [
    ...candidates.map(c => ({
      name: c.name,
      votes: c.votes,
      color: c.color
    })),
    { name: 'Brancos', votes: blankVotes, color: '#CBD5E1' }
  ].sort((a, b) => b.votes - a.votes);

  const winner = [...candidates].sort((a, b) => b.votes - a.votes)[0];
  const isDraw = candidates.length > 1 && winner && candidates.some(c => c.id !== winner.id && c.votes === winner.votes);

  const exportResults = () => {
    const text = `RESULTADO ELEIÇÃO GET PARAGUAI\n\n` +
      `Total de Votos: ${totalVotes}\n` +
      candidates.map(c => `${c.name}: ${c.votes} votos`).join('\n') +
      `\nVotos em Branco: ${blankVotes}\n\n` +
      (isDraw ? 'Resultado: EMPATE' : `VENCEDOR: ${winner?.name || 'N/A'}`);
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultado_get_paraguai.txt';
    a.click();
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Placar Final</h2>
        <div className="inline-flex items-center bg-yellow-400 px-10 py-4 rounded-3xl lego-brick border-2 border-yellow-500">
          <span className="text-3xl font-black text-gray-900 uppercase">{totalVotes} Votos computados</span>
        </div>
      </div>

      {winner && winner.votes > 0 ? (
        <div className={`relative p-10 rounded-[50px] border-[8px] border-white shadow-2xl text-center overflow-hidden lego-brick ${isDraw ? 'bg-orange-500' : 'bg-green-600'}`}>
           <div className="lego-studs opacity-10">
              {[...Array(40)].map((_, i) => <div key={i} className="stud"></div>)}
           </div>
           
           <div className="relative z-10 space-y-4">
              <span className="text-7xl mb-4 block animate-bounce">
                {isDraw ? '🤝' : '🏆'}
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-[0.3em] opacity-80">
                {isDraw ? 'Empate Técnico!' : 'Representante Eleito'}
              </h3>
              <p className="text-7xl font-black text-white drop-shadow-lg tracking-tighter">
                {isDraw ? 'Nova Votação?' : winner.name}
              </p>
              {!isDraw && (
                <div className="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full text-xl font-bold text-white uppercase">
                   {winner.votes} votos de confiança
                </div>
              )}
           </div>
        </div>
      ) : (
        <div className="p-20 bg-gray-100 rounded-[50px] border-4 border-dashed border-gray-300 text-center">
            <p className="text-3xl font-black text-gray-300 uppercase tracking-widest italic">Nenhum dado disponível</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[40px] p-8 shadow-xl border-4 border-gray-100 flex flex-col h-[450px]">
          <h4 className="text-2xl font-black mb-8 text-gray-800 uppercase flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            Gráfico de Barras
          </h4>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 14, fontWeight: '900', fill: '#64748b' }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: '4px solid #f1f5f9', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    fontWeight: 'bold'
                  }}
                />
                <Bar dataKey="votes" radius={[15, 15, 5, 5]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-8 shadow-xl border-4 border-gray-100 flex flex-col h-[450px]">
          <h4 className="text-2xl font-black mb-8 text-gray-800 uppercase flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg"></div>
            Lista de Apuração
          </h4>
          <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 bg-gray-50 rounded-[24px] border-l-[12px] lego-brick shadow-sm" style={{ borderLeftColor: item.color }}>
                <span className="text-xl font-black text-gray-800 uppercase tracking-tight">{item.name}</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-gray-900">{item.votes}</span>
                  <span className="text-xs font-black text-gray-400 uppercase">votos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10 pb-4">
        <button 
          onClick={exportResults}
          className="bg-blue-600 text-white px-12 py-6 rounded-[32px] text-2xl font-black uppercase tracking-tight lego-brick hover:bg-blue-700 active:scale-95 flex items-center justify-center gap-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          SALVAR RESULTADO
        </button>
        <button 
          onClick={onReset}
          className="bg-red-600 text-white px-12 py-6 rounded-[32px] text-2xl font-black uppercase tracking-tight lego-brick hover:bg-red-700 active:scale-95 flex items-center justify-center gap-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          NOVA ELEIÇÃO
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
