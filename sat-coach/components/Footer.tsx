'use client';

import { useTestProgress } from '@/context/TestProgressContext';
import FooterContent from '@/components/FooterContent';

export default function Footer() {
  const { goToNextQuestion, isLastQuestion } = useTestProgress();

  return (
    <footer className="bg-blue-100 py-9 px-6 flex items-center justify-between h-16 w-full absolute bottom-0 left-0 right-0 custom-dashed-border"> 
      <div className="font-semibold text-gray-700 flex items-center gap-2"><span>AP</span><span>Classroom</span></div>
      <FooterContent />
      <div>
        <button
          className="bg-blue-700 text-white rounded-full px-8 py-2 font-semibold text-lg shadow hover:bg-blue-800 focus:outline-none"
          onClick={goToNextQuestion}
          disabled={isLastQuestion}
        >
          Next
        </button>
      </div>
    </footer>
  );
} 