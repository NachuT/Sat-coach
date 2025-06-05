import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TestProgressProvider } from '@/context/TestProgressContext';
import Footer from '@/components/Footer';
import { CalculatorProvider } from '@/context/CalculatorContext';
import CalculatorButton from '@/components/CalculatorButton';
import HeaderCalculatorButton from '@/components/HeaderCalculatorButton';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAT Practice Test",
  description: "Digital SAT Practice Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white min-h-screen flex flex-col"}>
        <TestProgressProvider>
          <CalculatorProvider>
            {/* Header */}
            <header className="bg-blue-100 py-10 px-6 flex items-center justify-between h-16 header-dashed-border">
              <div className="font-semibold text-lg text-gray-800">AP Topic Questions 4.4 and 4.5</div>
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-700 text-sm"><span className="hidden sm:inline">Highlights & Notes</span></button>
                <HeaderCalculatorButton />
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-700 text-sm"><span className="hidden sm:inline">More</span></button>
              </div>
            </header>
            {/* Main Content */}
            <main className="flex-1 flex justify-center w-full relative pb-16">
              {children}
            </main>
            <Footer />
          </CalculatorProvider>
        </TestProgressProvider>
      </body>
    </html>
  );
}
