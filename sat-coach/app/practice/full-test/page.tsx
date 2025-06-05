'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TestSection {
  id: string;
  title: string;
  timeLimit: number; // in minutes
  questions: {
    id: number;
    question: string;
    passage?: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

const testSections: TestSection[] = [
  {
    id: 'math1',
    title: 'Math Section 1',
    timeLimit: 25,
    questions: [
      {
        id: 1,
        question: "If 2x + 3 = 15, what is the value of x?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 2,
        explanation: "To solve for x, we need to isolate it on one side of the equation. First, subtract 3 from both sides: 2x = 12. Then divide both sides by 2: x = 6."
      },
      // Add more math questions
    ]
  },
  {
    id: 'reading1',
    title: 'Reading Section 1',
    timeLimit: 25,
    questions: [
      {
        id: 1,
        passage: `The Industrial Revolution marked a major turning point in human history. Almost every aspect of daily life was influenced in some way. In particular, average income and population began to exhibit unprecedented sustained growth.`,
        question: "According to the passage, what was a significant effect of the Industrial Revolution?",
        options: [
          "It immediately improved living standards for everyone",
          "It led to consistent growth in income and population",
          "It only affected Western countries",
          "It had no impact on daily life"
        ],
        correctAnswer: 1,
        explanation: "The passage states that 'average income and population began to exhibit unprecedented sustained growth' during the Industrial Revolution."
      },
      // Add more reading questions
    ]
  }
];

export default function FullTest() {
  const [currentSection, setCurrentSection] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testSections[0].timeLimit * 60);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSectionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, testStarted, showResults]);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [`${testSections[currentSection].id}-${questionId}`]: answerIndex,
    }));
  };

  const handleSectionComplete = () => {
    if (currentSection < testSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setTimeLeft(testSections[currentSection + 1].timeLimit * 60);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    testSections.forEach((section) => {
      section.questions.forEach((question) => {
        const answerKey = `${section.id}-${question.id}`;
        if (answers[answerKey] === question.correctAnswer) {
          correctAnswers++;
        }
      });
    });
    return correctAnswers;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Full Practice Test</h2>
          <p className="text-gray-600 mb-6">
            This practice test simulates the actual SAT experience with timed sections.
            You will have {testSections[0].timeLimit} minutes for each section.
          </p>
          <button
            onClick={() => setTestStarted(true)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const totalQuestions = testSections.reduce((acc, section) => acc + section.questions.length, 0);
    const score = calculateScore();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Complete!</h2>
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-900">
              Your Score: {score} out of {totalQuestions}
            </p>
            <p className="text-gray-600">
              Percentage: {((score / totalQuestions) * 100).toFixed(1)}%
            </p>
          </div>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentSectionData = testSections[currentSection];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{currentSectionData.title}</h2>
            <p className="text-gray-600">
              Question {Object.keys(answers).length + 1} of {currentSectionData.questions.length}
            </p>
          </div>
          <div className="text-lg font-medium text-gray-900">
            Time Remaining: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mb-6">
          {currentSectionData.questions.map((question, index) => (
            <div key={question.id} className="mb-8">
              {question.passage && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">{question.passage}</p>
                </div>
              )}
              <p className="text-lg font-medium text-gray-900 mb-4">{question.question}</p>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(question.id, optionIndex)}
                    className={`w-full text-left p-4 rounded-lg border ${
                      answers[`${currentSectionData.id}-${question.id}`] === optionIndex
                        ? 'bg-blue-50 border-blue-500'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSectionComplete}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Complete Section
        </button>
      </div>
    </div>
  );
} 