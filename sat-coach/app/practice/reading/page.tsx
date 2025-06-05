'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ReadingQuestion {
  id: number;
  passage: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: ReadingQuestion[] = [
  {
    id: 1,
    passage: `The Industrial Revolution marked a major turning point in human history. Almost every aspect of daily life was influenced in some way. In particular, average income and population began to exhibit unprecedented sustained growth. Some economists say that the major effect of the Industrial Revolution was that the standard of living for the general population in the Western world began to increase consistently for the first time in history, although others have said that it did not begin to meaningfully improve until the late 19th and 20th centuries.`,
    question: "According to the passage, what was a significant effect of the Industrial Revolution?",
    options: [
      "It immediately improved living standards for everyone",
      "It led to consistent growth in income and population",
      "It only affected Western countries",
      "It had no impact on daily life"
    ],
    correctAnswer: 1,
    explanation: "The passage states that 'average income and population began to exhibit unprecedented sustained growth' during the Industrial Revolution. While there is some debate about when living standards began to improve, the consistent growth in income and population is presented as a clear effect."
  },
  // Add more questions here
];

export default function ReadingPractice() {
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
          <h2 className="text-xl font-bold text-gray-900">Reading Practice</h2>
          <p className="text-gray-600">Question {currentQuestion + 1} of {sampleQuestions.length}</p>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700 leading-relaxed">
              {sampleQuestions[currentQuestion].passage}
            </p>
          </div>

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