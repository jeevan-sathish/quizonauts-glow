
import { useQuiz } from "@/context/QuizContext";
import { quiz } from "@/data/quizData";

export function ProgressChart() {
  const { currentQuestion, selectedAnswers } = useQuiz();
  
  // Calculate the current progress percentage
  const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100;
  
  // Calculate how many questions have been answered
  const answeredCount = Object.values(selectedAnswers).filter(val => val !== null && val !== undefined).length;
  const answeredPercentage = (answeredCount / quiz.questions.length) * 100;
  
  // SVG parameters
  const size = 64;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressOffset = circumference - (progressPercentage / 100) * circumference;
  const answeredOffset = circumference - (answeredPercentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          className="text-secondary dark:text-secondary/30"
        />
        
        {/* Answered questions progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={answeredOffset}
          strokeLinecap="round"
          className="progress-ring text-primary/40 dark:text-primary/30"
        />
        
        {/* Current question indicator */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          className="progress-ring text-primary"
        />
      </svg>
      
      {/* Text in the center of the circle */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-sm font-medium">{currentQuestion + 1}</span>
        <span className="text-xs text-muted-foreground">/{quiz.questions.length}</span>
      </div>
    </div>
  );
}
