'use client';

import { useState, useEffect } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useTestProgress } from '@/context/TestProgressContext';
import { useCalculator } from '@/context/CalculatorContext';
import CalculatorButton from '@/components/CalculatorButton';

const questions = [
  {
    id: 1,
    prompt: (
      <span>
        A right triangle has base <InlineMath math="x" /> meters and height <InlineMath math="h" /> meters, where <InlineMath math="h" /> is constant and <InlineMath math="x" /> changes with respect to time <InlineMath math="t" /> (measured in seconds). The angle <InlineMath math="\theta" /> (in radians) is defined by <InlineMath math={String.raw`\tan \theta = \frac{h}{x}`}/>. Which of the following best describes the relationship between <InlineMath math={String.raw`\frac{d\theta}{dt}`}/> (the rate of change of <InlineMath math="\theta" /> with respect to time) and <InlineMath math={String.raw`\frac{dx}{dt}`}/> (the rate of change of <InlineMath math="x" /> with respect to time)?
      </span>
    ),
    choices: [
      { label: 'A', value: String.raw`\frac{d\theta}{dt} = \left(\frac{-h}{x^2 + h^2}\right)\frac{dx}{dt} \text{ radians per second}` },
      { label: 'B', value: String.raw`\frac{d\theta}{dt} = \left(\frac{-h}{x^2 + h^2}\right)\frac{dx}{dt} \text{ radians per second}` },
      { label: 'C', value: String.raw`\frac{d\theta}{dt} = \left(\frac{-h}{x\sqrt{x^2 + h^2}}\right)\frac{dx}{dt} \text{ radians per second}` },
      { label: 'D', value: String.raw`\frac{d\theta}{dt} = \left(\frac{h}{x\sqrt{x^2 + h^2}}\right)\frac{dx}{dt} \text{ radians per second}` },
    ],
  },
  // Add more questions as needed
];  

export default function BluebookClone() {
  const [selected, setSelected] = useState<number|null>(null);
  const [marked, setMarked] = useState(false);

  const { currentQuestion, setTotalQuestions } = useTestProgress();
  const { showCalculator, setShowCalculator } = useCalculator();

  useEffect(() => {
    setTotalQuestions(questions.length);
  }, [setTotalQuestions]);

  const q = questions[currentQuestion];

  const handleAnswerSelect = (idx: number) => {
    setSelected(idx);
  };

  return (
    <div className="flex flex-col w-full flex-1 pb-8"> {/* Changed pb-20 to pb-8 */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow border border-white mt-8">
        {/* Top Row */}
        <div className="flex items-center justify-between border-b border-white px-6 py-3 bottom-dashed-border">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg bg-gray-900 text-white rounded w-8 h-8 flex items-center justify-center">{currentQuestion + 1}</span>
              <div className="w-8 border-b border-dashed border-gray-200 mt-1"></div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={marked} onChange={() => setMarked(m => !m)} className="accent-blue-600" />
              <span className="text-sm text-gray-700">Mark for Review</span>
            </label>
          </div>
          {/* Placeholder Calculator button */}
          <CalculatorButton /> {/* Placeholder button with image */}
        </div>
        {/* Calculator Window (Conditionally Rendered) */}
        {showCalculator && <DraggableCalculator onClose={() => setShowCalculator(false)} />} {/* Use DraggableCalculator component */}
        {/* Question Prompt */}
        <div className="px-6 py-6 text-gray-900 text-sm leading-relaxed">
          {q.prompt}
        </div>
        {/* Choices */}
        <div className="flex flex-col gap-4 px-6 pb-6">
          {q.choices.map((choice, idx) => (
            <button
              key={choice.label}
              onClick={() => handleAnswerSelect(idx)}
              className={`flex items-center gap-4 border-2 rounded-lg px-4 py-3 text-left transition-all w-full text-gray-900 ${
                selected === idx ? 'border-blue-600 bg-white' : 'border-gray-700 hover:border-blue-400'
              }`}
            >
              <span className={`font-bold text-base w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                selected === idx ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-700 bg-white text-gray-900'
              }`}>
                {choice.label}
              </span>
              <span className="text-sm"><BlockMath math={choice.value} /></span>
            </button>
          ))}
        </div>
      </div>
      {/* Navigation - Removed from here, now in Layout Footer */}
      {/* The question count is now displayed in the layout footer using Context */}
    </div>
  );
}

// New DraggableCalculator component
interface DraggableCalculatorProps {
  onClose: () => void;
}

function DraggableCalculator({ onClose }: DraggableCalculatorProps) {
  const [calculatorPosition, setCalculatorPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setCalculatorPosition({ x: calculatorPosition.x + deltaX, y: calculatorPosition.y + deltaY });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="absolute top-16 right-6 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
      style={{
        width: '400px',
        height: '750px',
        zIndex: 50,
        left: `${calculatorPosition.x}px`,
        top: `${calculatorPosition.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="flex justify-between items-center bg-gray-200 px-3 py-1" style={{ cursor: 'grab' }}>
        <span className="text-sm font-semibold text-gray-800">Calculator</span>
        <img src="/icons8-drag-16.png" alt="Drag indicator" className="h-4 w-4" />
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
          ×
        </button>
      </div>
      <iframe
        src="https://www.desmos.com/testing/cb-sat-ap/graphing"
        width="100%"
        style={{ border: 'none', flexGrow: 1 }}
      ></iframe>
    </div>
  );
}
