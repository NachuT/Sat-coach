'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "If 2x + 3 = 15, what is the value of x?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    explanation: "To solve for x, we need to isolate it on one side of the equation. First, subtract 3 from both sides: 2x = 12. Then divide both sides by 2: x = 6."
  },
  // Add more questions here
];

export default function MathPractice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    if (index === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Math Practice</h2>
          <p className="text-gray-600">Question {currentQuestion + 1} of {sampleQuestions.length}</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium text-gray-900 mb-4">
            {sampleQuestions[currentQuestion].question}
          </p>
          
          <div className="space-y-3">
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg border ${
                  selectedAnswer === index
                    ? index === sampleQuestions[currentQuestion].correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                    : 'border-gray-200 hover:border-blue-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Explanation:</h3>
            <p className="text-gray-600">{sampleQuestions[currentQuestion].explanation}</p>
          </div>
        )}

        {showExplanation && currentQuestion < sampleQuestions.length - 1 && (
          <button
            onClick={handleNextQuestion}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next Question
          </button>
        )}

        {currentQuestion === sampleQuestions.length - 1 && showExplanation && (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 mb-4">
              Practice Complete! Your score: {score}/{sampleQuestions.length}
            </p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 