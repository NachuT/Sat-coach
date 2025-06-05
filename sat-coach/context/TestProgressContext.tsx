'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TestProgressContextType {
  currentQuestion: number;
  totalQuestions: number;
  setTotalQuestions: (total: number) => void;
  goToNextQuestion: () => void;
  isLastQuestion: boolean;
}

const TestProgressContext = createContext<TestProgressContextType | undefined>(undefined);

export const TestProgressProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const goToNextQuestion = () => {
    setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1));
  };

  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <TestProgressContext.Provider value={{ currentQuestion, totalQuestions, setTotalQuestions, goToNextQuestion, isLastQuestion }}>
      {children}
    </TestProgressContext.Provider>
  );
};

export const useTestProgress = () => {
  const context = useContext(TestProgressContext);
  if (context === undefined) {
    throw new Error('useTestProgress must be used within a TestProgressProvider');
  }
  return context;
}; 