import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Question, QuestionBank, WrongAnswer } from './types';
import { QUESTION_BANKS } from './data';

// --- Helper Functions ---

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// --- Sub Components ---

const OptionButton: React.FC<{
  text: string;
  index: number;
  isSelected: boolean;
  isSubmitted: boolean;
  isCorrect: boolean;
  isMissed: boolean;
  isWrong: boolean;
  onClick: () => void;
}> = ({ text, index, isSelected, isSubmitted, isCorrect, isMissed, isWrong, onClick }) => {
  let baseClasses = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 mb-3 flex items-start group relative shadow-sm ";
  
  if (isSubmitted) {
    if (isCorrect) {
      baseClasses += "border-emerald-500 bg-emerald-50/80 text-emerald-900 font-medium ";
    } else if (isWrong) {
      baseClasses += "border-rose-500 bg-rose-50/80 text-rose-900 ";
    } else if (isMissed) {
      baseClasses += "border-emerald-400 bg-white/60 text-emerald-700 border-dashed ";
    } else {
      baseClasses += "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60 grayscale ";
    }
  } else {
    if (isSelected) {
      baseClasses += "border-indigo-500 bg-indigo-50/90 text-indigo-900 shadow-indigo-200 ring-2 ring-indigo-200 ";
    } else {
      baseClasses += "border-slate-200 bg-white/80 hover:border-indigo-300 hover:bg-slate-50/90 hover:shadow-md text-slate-700 backdrop-blur-sm ";
    }
  }

  const letter = String.fromCharCode(65 + index);

  return (
    <button onClick={onClick} disabled={isSubmitted} className={baseClasses}>
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-bold flex-shrink-0 transition-colors ${
        isSubmitted 
          ? (isCorrect || isMissed ? 'bg-emerald-200 text-emerald-800' : (isWrong ? 'bg-rose-200 text-rose-800' : 'bg-slate-200 text-slate-500'))
          : (isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600')
      }`}>
        {letter}
      </span>
      <span className="mt-1 leading-relaxed text-lg md:text-base break-words font-medium">{text}</span>
      
      {isSubmitted && (isCorrect || isMissed) && (
        <span className="absolute right-4 top-4 text-emerald-600 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
      )}
      
      {isSubmitted && isWrong && (
        <span className="absolute right-4 top-4 text-rose-600">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      )}
    </button>
  );
};

const ResultScreen: React.FC<{
  score: number;
  total: number;
  timeSpent: number;
  wrongList: WrongAnswer[];
  onRestart: () => void;
  onHome: () => void;
}> = ({ score, total, timeSpent, wrongList, onRestart, onHome }) => {
  const percentage = Math.round((score / total) * 100);
  
  let gradeColor = 'text-indigo-600';
  let gradeText = 'Good Job!';
  if (percentage >= 90) { gradeColor = 'text-emerald-600'; gradeText = 'Excellent!'; }
  else if (percentage < 60) { gradeColor = 'text-rose-600'; gradeText = 'Keep Practicing'; }

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full max-w-3xl mx-auto my-4 md:my-8 animate-fade-in-up">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden mb-6 border border-white/50">
        <div className="bg-slate-900 p-6 md:p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/50 to-purple-600/50"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1 relative z-10">測驗結果</h2>
          <p className="text-slate-300 relative z-10 text-sm tracking-wider uppercase">Performance Report</p>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-4">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
                 <circle 
                   cx="50" 
                   cy="50" 
                   r={radius} 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="8" 
                   strokeDasharray={circumference} 
                   strokeDashoffset={strokeDashoffset} 
                   className={`${gradeColor} transition-all duration-1000 ease-out`}
                   strokeLinecap="round"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl md:text-5xl font-bold ${gradeColor}`}>{score}</span>
                  <span className="text-sm text-slate-400 font-medium mt-1">/ {total} 題</span>
               </div>
            </div>
            
            <div className="flex items-center gap-6 mb-2">
               <div className="text-center">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time</span>
                  <div className="text-xl font-bold text-slate-700">{formatTime(timeSpent)}</div>
               </div>
               <div className="w-px h-8 bg-slate-200"></div>
               <div className="text-center">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Accuracy</span>
                  <div className={`text-xl font-bold ${gradeColor}`}>{percentage}%</div>
               </div>
            </div>
            
            <div className={`text-2xl font-bold ${gradeColor} mt-2`}>{gradeText}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={onRestart}
              className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              重新測驗 (隨機出題)
            </button>
            
            <button 
              onClick={onHome}
              className="w-full py-4 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              返回選單
            </button>
          </div>
        </div>
      </div>

      {wrongList.length > 0 && (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden p-6 md:p-8 border border-white/50">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="w-1.5 h-6 bg-rose-500 rounded-full mr-3"></span>
            錯題回顧 ({wrongList.length} 題)
          </h3>
          <div className="space-y-6">
            {wrongList.map((item, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                   <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full mr-2">
                     原題號 {item.originalIndex + 1}
                   </span>
                   {item.question.a.length > 1 && (
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">複選</span>
                   )}
                </div>
                
                <div 
                  className="text-slate-800 font-semibold mb-5 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: item.question.q }} 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-rose-50 border border-rose-200/50 rounded-xl p-4">
                    <span className="block text-rose-600 font-bold mb-2 text-xs uppercase tracking-wider">你的選擇</span>
                    <ul className="list-none space-y-1 text-rose-900 font-medium">
                      {item.userSelected.length > 0 ? (
                         item.userSelected.map(selIdx => (
                           <li key={selIdx} className="flex items-start">
                             <span className="mr-2">•</span> 
                             {String.fromCharCode(65 + selIdx)}. {item.question.o[selIdx]}
                           </li>
                         ))
                      ) : (
                        <li className="italic text-rose-400">未作答</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200/50 rounded-xl p-4">
                    <span className="block text-emerald-600 font-bold mb-2 text-xs uppercase tracking-wider">正確答案</span>
                     <ul className="list-none space-y-1 text-emerald-900 font-medium">
                      {item.question.a.map(ansIdx => (
                           <li key={ansIdx} className="flex items-start">
                             <span className="mr-2">•</span>
                             {String.fromCharCode(65 + ansIdx)}. {item.question.o[ansIdx]}
                           </li>
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
    </div>
  );
};

const QuizGame: React.FC<{ bank: QuestionBank; onExit: () => void }> = ({ bank, onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [wrongList, setWrongList] = useState<WrongAnswer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Timer State
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startQuiz();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bank]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startQuiz = useCallback(() => {
    setIsLoading(true);
    // Shuffle all questions
    const shuffled = [...bank.questions].sort(() => 0.5 - Math.random());
    
    // Slice based on bank limit (Computer: 40, Shipping: 50)
    const limit = bank.limit;
    const selected = shuffled.slice(0, Math.min(limit, shuffled.length));
    
    setQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setWrongList([]);
    setSelectedIndices([]);
    setIsSubmitted(false);
    setIsQuizEnded(false);
    setTimeSpent(0);
    window.scrollTo(0, 0);
    setIsLoading(false);
    startTimer();
  }, [bank]);

  const currentQuestion = questions[currentIndex];
  
  if (isLoading || !currentQuestion) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-slate-50">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
       </div>
     );
  }

  const isMulti = currentQuestion.a.length > 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isSubmitted) return;

    if (isMulti) {
      if (selectedIndices.includes(index)) {
        setSelectedIndices(selectedIndices.filter(i => i !== index));
      } else {
        setSelectedIndices([...selectedIndices, index]);
      }
    } else {
      setSelectedIndices([index]);
    }
  };

  const handleSubmit = () => {
    if (selectedIndices.length === 0) {
      alert("請至少選擇一個答案！");
      return;
    }

    setIsSubmitted(true);
    const sortedSelected = [...selectedIndices].sort((a, b) => a - b);
    const sortedCorrect = [...currentQuestion.a].sort((a, b) => a - b);
    const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrongList(prev => [
        ...prev, 
        {
          question: currentQuestion,
          userSelected: selectedIndices,
          originalIndex: currentIndex
        }
      ]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIndices([]);
      setIsSubmitted(false);
      window.scrollTo(0, 0);
    } else {
      stopTimer();
      setIsQuizEnded(true);
      window.scrollTo(0, 0);
    }
  };

  if (isQuizEnded) {
    return (
      <div className="min-h-screen bg-slate-100 py-8 px-4 flex justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <ResultScreen 
          score={score} 
          total={questions.length} 
          timeSpent={timeSpent}
          wrongList={wrongList} 
          onRestart={startQuiz} 
          onHome={onExit}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 py-6 px-4 flex flex-col items-center animate-fade-in-up bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className="w-full max-w-3xl flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
        <div className="flex flex-col items-start">
          <button onClick={onExit} className="text-slate-500 hover:text-indigo-600 text-sm font-semibold flex items-center gap-1 transition-colors mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            退出
          </button>
          <h1 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            {bank.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Timer Badge */}
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-lg border border-slate-200 text-indigo-900 font-mono font-medium shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatTime(timeSpent)}
           </div>

           <div className="flex items-baseline gap-1">
             <span className="text-2xl font-bold text-indigo-600 leading-none">{currentIndex + 1}</span>
             <span className="text-sm text-slate-400 font-medium">/ {questions.length}</span>
           </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md w-full max-w-3xl rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col border border-white/60">
        <div className="w-full bg-slate-100 h-1.5">
          <div 
            className="bg-indigo-600 h-1.5 transition-all duration-500 ease-out rounded-r-full shadow-[0_0_10px_rgba(79,70,229,0.5)]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-6 md:p-10">
           <div className="mb-8">
             <div className="flex items-center gap-3 mb-4">
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
                  Question {currentIndex + 1}
                </span>
                {isMulti && (
                  <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                    複選題
                  </span>
                )}
             </div>
             <h2 
               className="text-xl md:text-2xl font-bold text-slate-800 leading-snug tracking-tight"
               dangerouslySetInnerHTML={{ __html: currentQuestion.q }}
             />
           </div>

           <div className="mb-10 space-y-3">
             {currentQuestion.o.map((opt, idx) => {
               const isCorrect = currentQuestion.a.includes(idx);
               const isSelected = selectedIndices.includes(idx);
               
               let displayCorrect = false;
               let displayWrong = false;
               let displayMissed = false;

               if (isSubmitted) {
                 if (isCorrect && isSelected) displayCorrect = true;
                 else if (!isCorrect && isSelected) displayWrong = true;
                 else if (isCorrect && !isSelected) displayMissed = true;
               }

               return (
                 <OptionButton
                    key={idx}
                    index={idx}
                    text={opt}
                    isSelected={isSelected}
                    isSubmitted={isSubmitted}
                    isCorrect={displayCorrect}
                    isWrong={displayWrong}
                    isMissed={displayMissed}
                    onClick={() => handleOptionClick(idx)}
                 />
               );
             })}
           </div>

           <div>
             {!isSubmitted ? (
               <button 
                 onClick={handleSubmit}
                 className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-1 active:scale-[0.98]"
               >
                 送出答案
               </button>
             ) : (
               <button 
                 onClick={handleNext}
                 className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg shadow-lg transition-all duration-200 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2"
               >
                 {currentIndex === questions.length - 1 ? '查看成績' : '下一題'}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
               </button>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeBank, setActiveBank] = useState<QuestionBank | null>(null);

  return (
    <div className="antialiased text-slate-900 min-h-screen bg-slate-50 font-sans">
      {activeBank ? (
        <QuizGame bank={activeBank} onExit={() => setActiveBank(null)} />
      ) : (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 drop-shadow-sm">
              考前衝刺<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">題庫系統</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              高效複習 · 隨機出題 · 即時回饋
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-4">
            {QUESTION_BANKS.map((bank, idx) => (
              <button
                key={bank.id}
                onClick={() => setActiveBank(bank)}
                style={{ animationDelay: `${idx * 150}ms` }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-2 border border-white/60 flex flex-col h-full overflow-hidden animate-fade-in-up text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-in-out"></div>
                
                <div className="relative z-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 transition-colors duration-300 border border-slate-100 group-hover:border-indigo-500 group-hover:shadow-indigo-200">
                   {bank.icon === 'ship' ? (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                     </svg>
                   ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                   )}
                </div>
                
                <div className="relative z-10 w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {bank.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                     <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded border border-slate-200">
                       隨機抽取 {bank.limit} 題
                     </span>
                     <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded border border-slate-200">
                       題庫總量: {bank.questions.length}
                     </span>
                  </div>
                  <p className="text-slate-500 text-base leading-relaxed mb-8 border-l-2 border-slate-200 pl-4">
                    {bank.description}
                  </p>
                  
                  <div className="flex items-center text-indigo-600 font-bold text-lg mt-auto">
                    開始測驗
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-16 text-center text-slate-400 text-sm">
            <p>&copy; 2024 Exam Sprint Pro. Build for Excellence.</p>
          </div>

          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
              animation: fadeInUp 0.6s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
                               }
