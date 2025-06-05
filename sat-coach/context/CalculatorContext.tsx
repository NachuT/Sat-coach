'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CalculatorContextType {
  showCalculator: boolean;
  setShowCalculator: (show: boolean) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <CalculatorContext.Provider value={{ showCalculator, setShowCalculator }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}; 