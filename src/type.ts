export interface Question {
  id?: string;
  q: string; // Question text
  o: string[]; // Options
  a: number[]; // Answer indices (0-based)
}

export interface QuestionBank {
  id: string;
  title: string;
  description: string;
  icon: 'computer' | 'ship';
  limit: number; // How many questions to pull randomly
  questions: Question[];
}

export interface WrongAnswer {
  question: Question;
  userSelected: number[];
  originalIndex: number;
}
