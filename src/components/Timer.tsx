
import { useEffect, useState } from "react";
import { useQuiz, QUIZ_TIME_MINUTES } from "@/context/QuizContext";
import { Clock } from "lucide-react";

export function Timer() {
  const { timeRemaining, completeQuiz } = useQuiz();
  const [isWarning, setIsWarning] = useState(false);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate percentage of time remaining
  const percentRemaining = (timeRemaining / (QUIZ_TIME_MINUTES * 60)) * 100;
  
  // Set warning state when time is running low (less than 20% remaining)
  useEffect(() => {
    if (percentRemaining < 20) {
      setIsWarning(true);
    }
  }, [percentRemaining]);

  return (
    <div className="flex items-center gap-2 py-1 px-3 rounded-full bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm border border-border/50 shadow-sm transition-all">
      <Clock className={`h-4 w-4 ${isWarning ? 'text-red-500 animate-pulse' : ''}`} />
      <span 
        className={`font-mono text-sm transition-colors ${
          isWarning ? 'text-red-500 font-semibold' : ''
        }`}
      >
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
}
