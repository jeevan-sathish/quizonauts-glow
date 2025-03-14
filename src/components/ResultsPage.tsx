
import { useQuiz } from "@/context/QuizContext";
import { quiz } from "@/data/quizData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "./ThemeToggle";
import { PerformanceChart } from "./PerformanceChart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Trophy, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ResultsPage() {
  const { quizResult, selectedAnswers } = useQuiz();
  
  if (!quizResult) return null;
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Helper function to get result text and classes
  const getResultFeedback = (score: number) => {
    if (score >= 80) {
      return {
        title: "Excellent!",
        description: "You have a strong understanding of advanced React concepts.",
        icon: <Trophy className="h-7 w-7" />,
        class: "text-emerald-500 dark:text-emerald-400"
      };
    } else if (score >= 60) {
      return {
        title: "Good Job!",
        description: "You have a good grasp of React concepts, but there's room for improvement.",
        icon: <Check className="h-7 w-7" />,
        class: "text-blue-500 dark:text-blue-400"
      };
    } else {
      return {
        title: "Keep Learning!",
        description: "You're on your way to understanding React better. Review the areas you missed.",
        icon: <ArrowLeft className="h-7 w-7" />,
        class: "text-purple-500 dark:text-purple-400"
      };
    }
  };
  
  const feedback = getResultFeedback(quizResult.score);

  return (
    <div className="min-h-screen flex flex-col w-full py-8 px-4 md:py-12 lg:py-16 transition-all animate-fade-in">
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between mb-8 lg:mb-12">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-semibold text-gradient">Quiz Results</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card overflow-hidden mb-8">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-bold">
                    <span className={feedback.class}>{feedback.title}</span>
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    {feedback.description}
                  </CardDescription>
                </div>
                <div className={`p-4 rounded-full ${feedback.class} bg-background/50 dark:bg-background/10 border border-current/20`}>
                  {feedback.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-background/50 dark:bg-background/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{quizResult.score}%</div>
                  <div className="text-sm text-muted-foreground">Total Score</div>
                </div>
                <div className="bg-background/50 dark:bg-background/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-correct">{quizResult.correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="bg-background/50 dark:bg-background/20 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-incorrect">{quizResult.wrongAnswers}</div>
                  <div className="text-sm text-muted-foreground">Incorrect Answers</div>
                </div>
              </div>
              
              <Link to="/">
                <Button className="w-full neo-button">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PerformanceChart />
            </motion.div>
          </div>
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle>Quiz Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Questions</span>
                      <span className="font-medium">{quiz.questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Answered</span>
                      <span className="font-medium">
                        {quizResult.correctAnswers + quizResult.wrongAnswers}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unanswered</span>
                      <span className="font-medium">{quizResult.unanswered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="font-medium">
                        {quizResult.correctAnswers > 0
                          ? Math.round((quizResult.correctAnswers / (quizResult.correctAnswers + quizResult.wrongAnswers)) * 100)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-10"
        >
          <h2 className="text-xl font-semibold mb-4">Detailed Review</h2>
          
          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const isUnanswered = userAnswer === undefined || userAnswer === null;
              
              return (
                <motion.div key={index} variants={item}>
                  <Card className={`border ${
                    isUnanswered 
                      ? 'border-muted' 
                      : isCorrect 
                        ? 'border-correct' 
                        : 'border-incorrect'
                  }`}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-base font-medium">
                          {index + 1}. {question.question}
                        </CardTitle>
                        {!isUnanswered && (
                          <div className={`flex-shrink-0 rounded-full p-1 ${
                            isCorrect ? 'bg-correct/10 text-correct' : 'bg-incorrect/10 text-incorrect'
                          }`}>
                            {isCorrect ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div 
                            key={optIndex}
                            className={`p-3 rounded-md ${
                              optIndex === question.correctAnswer
                                ? 'bg-correct/10 dark:bg-correct/20 border border-correct/30'
                                : userAnswer === optIndex
                                  ? 'bg-incorrect/10 dark:bg-incorrect/20 border border-incorrect/30'
                                  : 'bg-secondary/30 dark:bg-secondary/10'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-sm ${
                                optIndex === question.correctAnswer
                                  ? 'bg-correct text-white'
                                  : userAnswer === optIndex
                                    ? 'bg-incorrect text-white'
                                    : 'border border-muted-foreground/30 text-muted-foreground'
                              }`}>
                                {String.fromCharCode(65 + optIndex)}
                              </div>
                              <div className="pt-0.5">{option}</div>
                            </div>
                          </div>
                        ))}
                        
                        {isUnanswered && (
                          <div className="mt-3 text-sm text-muted-foreground italic">
                            You didn't answer this question
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
