import * as fs from 'fs';
import { Request, Response } from "express";
import path from 'path';

interface QuizQuestion {
  id: number; // Add an ID field
  question: string;
  options: { text: string; isCorrect: boolean }[];
}

// Read the JSON file
const filePath = path.join(__dirname, '../config/quizData.json');
const quizData = fs.readFileSync(filePath, 'utf-8');
const quizQuestions: QuizQuestion[] = JSON.parse(quizData);

// Define an array to keep track of the selected question IDs
const selectedQuestionIds: number[] = [];

// Define a function to get 10 random questions by ID
export const getQuestions = (req: Request, res: Response) => {
  // Check if we've used up all the questions
  if (selectedQuestionIds.length >= quizQuestions.length) {
    res.json({ message: "No more questions available." });
    return;
  }

  // Initialize an array to store the IDs of selected questions
  const selectedQuestionIdsToReturn: number[] = [];

  // Randomly select 10 question IDs that haven't been used yet
  while (selectedQuestionIdsToReturn.length < 10) {
    const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    if (!selectedQuestionIdsToReturn.includes(randomQuestion.id)) {
      selectedQuestionIdsToReturn.push(randomQuestion.id);
    }
  }
  const questionsToReturn = quizQuestions.filter(question => selectedQuestionIdsToReturn.includes(question.id));
  res.json(questionsToReturn);
};

export const submitQuestions = (req: Request, res: Response) => {
  const userAnswers: { id: number, selectedOption: number }[] = req.body.answers;

  let score = 0;
  userAnswers.forEach((userAnswer) => {
    const question = quizQuestions.find(question => question.id === userAnswer.id);
    if (question && question.options[userAnswer.selectedOption].isCorrect) {
      score++;
    }
  });

  const percentageScore = (score / 10) * 100;

  res.json({ percentageScore });
};

export const fetchQuestionsByNumber = (req: Request, res: Response) => {
  const numberToFetch = Number(req.params.numberToFetch);

  if (isNaN(numberToFetch) || numberToFetch <= 0) {
    res.status(400).json({ error: "Invalid number of questions to fetch." });
    return;
  }

  const questionsToFetch = [];
  for (let i = 0; i < numberToFetch; i++) {
    if (selectedQuestionIds.length >= quizQuestions.length) {
      break;
    }
    const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    if (!selectedQuestionIds.includes(randomQuestion.id)) {
      selectedQuestionIds.push(randomQuestion.id);
      questionsToFetch.push(randomQuestion);
    }
  }

  res.json(questionsToFetch);
};
