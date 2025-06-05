'use client';

import { useTestProgress } from '@/context/TestProgressContext';
import { useEffect } from 'react';

export default function FooterContent() {
  const { currentQuestion, totalQuestions } = useTestProgress();

  // Optional: Update layout title/header if needed, but context is primarily for the footer
  // useEffect(() => {
  //   if (typeof document !== 'undefined') {
  //     const headerTitle = document.querySelector('header h1'); // Adjust selector as needed
  //     if (headerTitle) {
  //       headerTitle.textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
  //     }
  //   }
  // }, [currentQuestion, totalQuestions]);

  return (
    <div className="text-sm font-medium text-gray-700">
      {totalQuestions > 0 ? `Question ${currentQuestion + 1} of ${totalQuestions}` : ''}
    </div>
  );
} 