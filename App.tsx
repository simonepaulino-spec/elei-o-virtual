
import React, { useState } from 'react';
import { AppState, Candidate } from './types';
import { LEGO_COLORS } from './constants';
import SetupScreen from './components/SetupScreen';
import VotingScreen from './components/VotingScreen';
import ResultsScreen from './components/ResultsScreen';
import Header from './components/Header';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SETUP);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [blankVotes, setBlankVotes] = useState<number>(0);
  const [selectedCandidate, setSelectedCandidate] = useState<string | 'blank' | null>(null);

  const addCandidate = (name: string) => {
    // We alternate colors based on the logo's main palette
    const nextColorIndex = candidates.length % LEGO_COLORS.length;
    const { hex } = LEGO_COLORS[nextColorIndex];
    
    const newCandidate: Candidate = {
      id: crypto.randomUUID(),
      name,
      color: hex,
      votes: 0
    };
    setCandidates([...candidates, newCandidate]);
  };

  const removeCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const startVoting = () => {
    if (candidates.length > 0) {
      setAppState(AppState.VOTING);
    }
  };

  const handleVote = (candidateId: string | 'blank') => {
    setSelectedCandidate(candidateId);
  };

  const confirmVote = () => {
    if (selectedCandidate === 'blank') {
      setBlankVotes(prev => prev + 1);
    } else if (selectedCandidate) {
      setCandidates(prev => prev.map(c => 
        c.id === selectedCandidate ? { ...c, votes: c.votes + 1 } : c
      ));
    }
    setAppState(AppState.VOTED);
    setSelectedCandidate(null);
  };

  const nextVoter = () => {
    setAppState(AppState.VOTING);
  };

  const viewResults = () => {
    setAppState(AppState.RESULTS);
  };

  const resetElection = () => {
    setCandidates([]);
    setBlankVotes(0);
    setAppState(AppState.SETUP);
    setSelectedCandidate(null);
  };

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0) + blankVotes;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden border-[12px] border-white ring-4 ring-gray-200">
        <Header />
        
        <div className="p-6 md:p-10 bg-white">
          {appState === AppState.SETUP && (
            <SetupScreen 
              candidates={candidates} 
              onAdd={addCandidate} 
              onRemove={removeCandidate} 
              onStart={startVoting} 
            />
          )}

          {appState === AppState.VOTING && (
            <VotingScreen 
              candidates={candidates} 
              selectedId={selectedCandidate}
              onSelect={handleVote} 
              onConfirm={confirmVote}
              onViewResults={viewResults}
            />
          )}

          {appState === AppState.VOTED && (
            <div className="text-center py-24 space-y-10 animate-fadeIn">
               <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto lego-brick border-4 border-white shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
               </div>
               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">Voto Confirmado!</h2>
                  <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">Obrigado por participar da democracia escolar</p>
               </div>
               <div className="pt-10">
                 <button 
                  onClick={nextVoter}
                  className="bg-[#241b3b] text-white px-16 py-6 rounded-[32px] text-3xl font-black uppercase tracking-widest lego-brick hover:bg-[#322650] transition-all active:scale-95"
                 >
                   PRÓXIMO ELEITOR
                 </button>
               </div>
            </div>
          )}

          {appState === AppState.RESULTS && (
            <ResultsScreen 
              candidates={candidates} 
              blankVotes={blankVotes} 
              totalVotes={totalVotes}
              onReset={resetElection}
            />
          )}
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center space-y-2 opacity-60">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-500 text-xs">★</span>)}
        </div>
        <p className="text-gray-500 font-black tracking-[0.3em] text-[10px] uppercase">
          Eleições GET Paraguai 2024
        </p>
      </div>
    </div>
  );
};

export default App;
