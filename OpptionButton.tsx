import React from 'react';

interface OptionButtonProps {
  text: string;
  index: number;
  isSelected: boolean;
  isSubmitted: boolean;
  isCorrect: boolean;
  isMissed: boolean;
  isWrong: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  text,
  index,
  isSelected,
  isSubmitted,
  isCorrect,
  isMissed,
  isWrong,
  onClick,
}) => {
  let baseClasses = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 mb-3 flex items-start group relative ";
  
  if (isSubmitted) {
    if (isCorrect) {
      baseClasses += "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium ";
    } else if (isWrong) {
      baseClasses += "border-rose-500 bg-rose-50 text-rose-800 ";
    } else if (isMissed) {
      baseClasses += "border-emerald-400 bg-white text-emerald-600 border-dashed ";
    } else {
      baseClasses += "border-slate-200 bg-slate-50 text-slate-400 opacity-70 ";
    }
  } else {
    if (isSelected) {
      baseClasses += "border-blue-500 bg-blue-50 text-blue-900 shadow-md ring-2 ring-blue-200/50 ";
    } else {
      baseClasses += "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 hover:shadow-sm text-slate-700 ";
    }
  }

  const letter = String.fromCharCode(65 + index);

  return (
    <button
      onClick={onClick}
      disabled={isSubmitted}
      className={baseClasses}
    >
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-bold flex-shrink-0 transition-colors ${
        isSubmitted 
          ? (isCorrect || isMissed ? 'bg-emerald-200 text-emerald-800' : (isWrong ? 'bg-rose-200 text-rose-800' : 'bg-slate-200 text-slate-500'))
          : (isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600')
      }`}>
        {letter}
      </span>
      <span className="mt-1 leading-relaxed">{text}</span>
      
      {isSubmitted && (isCorrect || isMissed) && (
        <span className="absolute right-4 top-4 text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      )}
      
      {isSubmitted && isWrong && (
        <span className="absolute right-4 top-4 text-rose-600">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      )}
    </button>
  );
};

export default OptionButton;
