
import { useQuiz } from "@/context/QuizContext";
import { quiz } from "@/data/quizData";
import { ThemeToggle } from "./ThemeToggle";
import { Timer } from "./Timer";
import { ProgressChart } from "./ProgressChart";
import { QuizCard } from "./QuizCard";
import { Button } from "@/components/ui/button";
import { ListChecks } from "lucide-react";

export function QuizLayout() {
  const { completeQuiz } = useQuiz();

  return (
    <div className="min-h-screen flex flex-col w-full py-8 px-4 md:py-12 lg:py-16 transition-all animate-fade-in">
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between mb-8 lg:mb-12">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-semibold text-gradient">{quiz.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Timer />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <ProgressChart />
            <div className="hidden sm:block text-sm text-muted-foreground">
              <span className="font-medium">{quiz.description}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={completeQuiz}
            className="text-sm"
          >
            <ListChecks className="mr-2 h-4 w-4" />
            Submit Quiz
          </Button>
        </div>

        <QuizCard />
      </main>
    </div>
  );
}
