'use client';

import { useCalculator } from '@/context/CalculatorContext';
import Image from 'next/image'; // Import Image component if needed, or use regular img tag

export default function CalculatorButton() {
  // Removed useCalculator hook as this button will not toggle the window
  // Removed onClick handler
  return (
    <button className="flex items-center gap-1 text-gray-700 hover:text-blue-700 text-sm p-1"> {/* Removed onClick */}
      <img src="/calculator-button.png" alt="Calculator" className="h-4 w-auto mr-1" /> {/* Calculator button image */}
      <span className="hidden sm:inline">Elimination</span> {/* Added Elimination text */}
    </button>
  );
} 