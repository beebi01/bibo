import React from 'react';
import { WrongAnswerEntry } from '../types';

interface ResultScreenProps {
  score: number;
  total: number;
  wrongList: WrongAnswerEntry[];
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, wrongList, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  let gradeColor = 'text-blue-600';
  let gradeText = 'Good Job!';
  if (percentage >= 90) { gradeColor = 'text-emerald-600'; gradeText = 'Excellent!'; }
  else if (percentage < 60) { gradeColor = 'text-rose-600'; gradeText = 'Keep Practicing'; }

  return (
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up mx-auto my-8">
      <div className="bg-slate-900 p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30"></div>
        <h2 className="text-3xl font-bold mb-2 relative z-10">測驗結束</h2>
        <p className="text-slate-300 relative z-10">Your Performance Report</p>
      </div>

      <div className="p-8">
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
               <circle 
                 cx="50" 
                 cy="50" 
                 r="45" 
                 fill="none" 
                 stroke="currentColor" 
                 strokeWidth="8" 
                 strokeDasharray={`${2 * Math.PI * 45}`} 
                 strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`} 
                 className={`${gradeColor} transition-all duration-1000 ease-out`}
                 strokeLinecap="round"
               />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${gradeColor}`}>{score}</span>
                <span className="text-sm text-slate-400 font-medium">/ {total}</span>
             </div>
          </div>
          <div className={`text-2xl font-bold ${gradeColor}`}>{gradeText}</div>
          <p className="text-slate-500 mt-2">正確率: {percentage}%</p>
        </div>

        {wrongList.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-rose-500 pl-3">
              錯題回顧 ({wrongList.length} 題)
            </h3>
            <div className="space-y-6">
              {wrongList.map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                     <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded mr-2">
                       第 {item.index + 1} 題
                     </span>
                     {item.question.a.length > 1 && (
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">複選</span>
                     )}
                  </div>
                  
                  <div 
                    className="text-slate-800 font-medium mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.question.q }} 
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-rose-50 border border-rose-100 rounded-lg p-3">
                      <span className="block text-rose-500 font-bold mb-1 text-xs uppercase tracking-wider">你的選擇</span>
                      <ul className="list-disc list-inside text-rose-900">
                        {item.userSelected.length > 0 ? (
                           item.userSelected.map(selIdx => (
                             <li key={selIdx}>{String.fromCharCode(65 + selIdx)}. {item.question.o[selIdx]}</li>
                           ))
                        ) : (
                          <li className="italic text-rose-400">未作答</li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                      <span className="block text-emerald-500 font-bold mb-1 text-xs uppercase tracking-wider">正確答案</span>
                       <ul className="list-disc list-inside text-emerald-900">
                        {item.question.a.map(ansIdx => (
                             <li key={ansIdx}>{String.fromCharCode(65 + ansIdx)}. {item.question.o[ansIdx]}</li>
                           ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={onRestart}
          className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          重新測驗 (題目重洗)
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
