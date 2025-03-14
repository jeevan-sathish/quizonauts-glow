
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { quiz } from "../data/quizData";
import { toast } from "sonner";

type QuizContextType = {
  currentQuestion: number;
  selectedAnswers: Record<number, number | null>;
  setSelectedAnswers: React.Dispatch<React.SetStateAction<Record<number, number | null>>>;
  timeRemaining: number;
  isQuizCompleted: boolean;
  showHint: boolean;
  setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  selectAnswer: (questionIndex: number, optionIndex: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  completeQuiz: () => void;
  quizResult: {
    correctAnswers: number;
    wrongAnswers: number;
    unanswered: number;
    score: number;
  } | null;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QUIZ_TIME_MINUTES = 15;
const TOTAL_SECONDS = QUIZ_TIME_MINUTES * 60;

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_SECONDS);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizContextType["quizResult"]>(null);
  const navigate = useNavigate();

  // Initialize timer
  useEffect(() => {
    if (isQuizCompleted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          completeQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizCompleted]);

  // Select an answer
  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHint(false);
    }
  };

  // Navigate to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowHint(false);
    }
  };

  // Complete the quiz and calculate results
  const completeQuiz = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    quiz.questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      if (userAnswer === null || userAnswer === undefined) {
        unansweredCount++;
      } else if (userAnswer === question.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const totalScore = Math.round((correctCount / quiz.questions.length) * 100);

    setQuizResult({
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      unanswered: unansweredCount,
      score: totalScore,
    });

    setIsQuizCompleted(true);
    navigate("/results");
    toast.success("Quiz completed successfully!");
  };

  const value = {
    currentQuestion,
    selectedAnswers,
    setSelectedAnswers,
    timeRemaining,
    isQuizCompleted,
    showHint,
    setShowHint,
    setCurrentQuestion,
    selectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    completeQuiz,
    quizResult,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
