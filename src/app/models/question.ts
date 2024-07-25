import { Answer } from "./answer";

export interface Question {
    question: string;
    listAnswers: Answer[];
    category: string;
}
