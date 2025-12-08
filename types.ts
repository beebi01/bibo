export interface QuestionData {
  q: string;
  o: string[];
  a: number[];
}

export interface WrongAnswerEntry {
  question: QuestionData;
  userSelected: number[];
  index: number;
}
