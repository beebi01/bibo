import React, { useState, useEffect } from 'react';
import { RAW_QUESTIONS } from './constants';
import { QuestionData, WrongAnswerEntry } from './types';
import OptionButton from './components/OptionButton';
import ResultScreen from './components/ResultScreen';

function App() {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [wrongList, setWrongList] = useState<WrongAnswerEntry[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);

  // Initialize Quiz
  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = () => {
    // Shuffle and pick 40
    const shuffled = [...RAW_QUESTIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 40);
    
    setQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setWrongList([]);
    setSelectedIndices([]);
    setIsSubmitted(false);
    setIsQuizEnded(false);
    window.scrollTo(0, 0);
  };

  const currentQuestion = questions[currentIndex];
  
  if (!currentQuestion) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-slate-100">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
       </div>
     );
  }

  const isMulti = currentQuestion.a.length > 1;

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

    // Sort to compare arrays
    const sortedSelected = [...selectedIndices].sort((a, b) => a - b);
    const sortedCorrect = [...currentQuestion.a].sort((a, b) => a - b);
    const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      // Record wrong answer
      setWrongList(prev => [
        ...prev, 
        {
          question: currentQuestion,
          userSelected: selectedIndices,
          index: currentIndex
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
      setIsQuizEnded(true);
      window.scrollTo(0, 0);
    }
  };

  if (isQuizEnded) {
    return (
      <div className="min-h-screen bg-slate-100 py-8 px-4 flex justify-center">
        <ResultScreen 
          score={score} 
          total={questions.length} 
          wrongList={wrongList} 
          onRestart={startQuiz} 
        />
      </div>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 flex flex-col items-center">
      {/* Header / Brand */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">考前衝刺題庫</h1>
        <p className="text-slate-500 text-sm mt-1">Practice makes perfect</p>
      </div>

      {/* Main Card */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2">
          <div 
            className="bg-blue-600 h-2 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Top Info Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
             <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">
               Q{currentIndex + 1}
             </span>
             <span className="text-slate-400 text-sm font-medium">/ {questions.length}</span>
          </div>
          <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            得分: {score}
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6 md:p-8">
           <div className="mb-6">
             {isMulti && (
               <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded mb-2 align-middle mr-2 border border-amber-200">
                 複選
               </span>
             )}
             <h2 
               className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed inline align-middle"
               dangerouslySetInnerHTML={{ __html: currentQuestion.q }}
             />
           </div>

           {/* Options List */}
           <div className="mb-8">
             {currentQuestion.o.map((opt, idx) => {
               const isCorrect = currentQuestion.a.includes(idx);
               const isSelected = selectedIndices.includes(idx);
               // Logic for coloring:
               // If submitted:
               // - Highlight Correct (Green)
               // - Highlight Wrong Selection (Red)
               // - Highlight Missed Correct (Dashed Green)
               
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

           {/* Actions */}
           <div className="flex flex-col sm:flex-row gap-3">
             {!isSubmitted ? (
               <button 
                 onClick={handleSubmit}
                 className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold shadow-lg shadow-blue-500/30 transition-all duration-200 transform active:scale-[0.98]"
               >
                 送出答案
               </button>
             ) : (
               <button 
                 onClick={handleNext}
                 className="w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold shadow-lg transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-2"
               >
                 {currentIndex === questions.length - 1 ? '查看結果' : '下一題'}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
               </button>
             )}
           </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-400 text-xs">
        <p>&copy; 2023 Exam Prep System. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
