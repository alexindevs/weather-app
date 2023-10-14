import express from 'express';
const quizRouter = express.Router();
import { getQuestions, submitQuestions, fetchQuestionsByNumber } from '../controllers/weatherQuiz';

quizRouter.get('/getQuestions', getQuestions);
quizRouter.post('/submitQuestions', submitQuestions);
quizRouter.get('/fetchQuestions/:numberToFetch', fetchQuestionsByNumber);

export default quizRouter;