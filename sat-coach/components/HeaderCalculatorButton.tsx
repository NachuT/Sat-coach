'use client';

import { useCalculator } from '@/context/CalculatorContext';

export default function HeaderCalculatorButton() {
  const { setShowCalculator } = useCalculator();

  return (
    <button onClick={() => setShowCalculator(true)} className="flex items-center gap-1 text-gray-700 hover:text-blue-700 text-sm"><span className="hidden sm:inline">Calculator</span></button>
  );
} 