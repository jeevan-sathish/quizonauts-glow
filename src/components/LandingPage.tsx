
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full p-4 md:p-8 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card max-w-3xl w-full p-8 md:p-12 text-center space-y-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          Advanced React Quiz
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          Test your React knowledge with 20 challenging questions. 
          Complete the quiz in 15 minutes to see how well you understand 
          advanced React concepts.
        </p>

        <div className="space-y-4">
          <ul className="text-left space-y-3 max-w-md mx-auto">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>20 advanced React questions</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>15-minute time limit</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Helpful hints available</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Detailed performance analytics</span>
            </li>
          </ul>
        </div>

        <Button
          onClick={handleGetStarted}
          size="lg"
          className="neo-button mt-8 text-lg group hover:bg-primary/90"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  );
}
