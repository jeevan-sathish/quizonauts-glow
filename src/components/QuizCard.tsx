
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quiz } from "@/data/quizData";
import { useQuiz } from "@/context/QuizContext";
import { ArrowLeft, ArrowRight, HelpCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export function QuizCard() {
  const { 
    currentQuestion, 
    selectedAnswers, 
    selectAnswer, 
    goToNextQuestion, 
    goToPreviousQuestion,
    completeQuiz,
    showHint,
    setShowHint
  } = useQuiz();
  
  const question = quiz.questions[currentQuestion];
  const selectedOption = selectedAnswers[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  
  const handleSelectOption = (optionIndex: number) => {
    selectAnswer(currentQuestion, optionIndex);
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };
  
  const optionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.3,
        delay: 0.1 + custom * 0.1
      }
    })
  };

  return (
    <motion.div
      key={currentQuestion}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader className="relative pb-2">
          <CardTitle className="text-xl md:text-2xl leading-tight">
            {currentQuestion + 1}. {question.question}
          </CardTitle>
          <CardDescription>
            Select the best answer from the options below
          </CardDescription>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full"
            onClick={toggleHint}
          >
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </CardHeader>
        
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="px-6 pb-3"
            >
              <div className="bg-secondary/50 dark:bg-secondary/30 p-3 rounded-lg text-sm text-muted-foreground">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Hint</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={toggleHint}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p>{question.hint}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CardContent className="space-y-6 pt-4">
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.div 
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={optionVariants}
              >
                <button
                  className={`option-card w-full text-left ${
                    selectedOption === index
                      ? "border-primary bg-primary/10 dark:bg-primary/20"
                      : "bg-card hover:bg-secondary/50 dark:hover:bg-secondary/20"
                  } ${selectedOption !== null && selectedOption !== index ? "opacity-50" : ""}`}
                  onClick={() => handleSelectOption(index)}
                  disabled={selectedOption !== null && selectedOption !== index}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-sm border ${
                      selectedOption === index
                        ? "border-primary bg-primary text-white"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1 pt-0.5">{option}</div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
          
          <Separator />
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
              className="neo-button"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            
            {isLastQuestion ? (
              <Button 
                onClick={completeQuiz}
                className="neo-button bg-primary hover:bg-primary/90"
              >
                Finish Quiz
              </Button>
            ) : (
              <Button 
                onClick={goToNextQuestion}
                className="neo-button"
              >
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
