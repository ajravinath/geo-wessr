import { AnswerResult, QuestionType } from '../types/enums';

export const validateAnswer =
  (questionType: QuestionType) =>
  (correctAnswer: string, givenAnswer: string): AnswerResult => {
    switch (questionType) {
      case QuestionType.Temperature:
        return Math.abs(parseInt(correctAnswer) - parseInt(givenAnswer)) < 3
          ? AnswerResult.Correct
          : AnswerResult.Wrong;
      default:
        return AnswerResult.Unknown;
    }
  };
