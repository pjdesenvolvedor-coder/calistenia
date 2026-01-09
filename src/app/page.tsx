"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductRecommendationOutput, recommendProduct } from "@/ai/flows/product-recommendation";

import { WelcomeScreen } from "@/components/quiz/welcome-screen";
import { QuizScreen } from "@/components/quiz/quiz-screen";
import { ResultScreen } from "@/components/quiz/result-screen";
import { quizData } from "@/lib/quiz-data";

type QuizState = "welcome" | "in-progress" | "loading" | "results";
type Answers = Record<string, string>;

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>("welcome");
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recommendation, setRecommendation] = useState<ProductRecommendationOutput | null>(null);
  const { toast } = useToast();

  const handleStart = () => {
    setQuizState("in-progress");
  };

  const handleAnswer = async (question: string, answer: string) => {
    const newAnswers = { ...answers, [question]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState("loading");
      try {
        const result = await recommendProduct({ quizAnswers: newAnswers });
        setRecommendation(result);
        setQuizState("results");
      } catch (error) {
        console.error("Failed to get recommendation", error);
        toast({
          title: "Erro",
          description: "Não foi possível obter a sua recomendação. Por favor, tente novamente.",
          variant: "destructive",
        });
        handleReset();
      }
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setRecommendation(null);
    setQuizState("welcome");
  };

  const renderContent = () => {
    switch (quizState) {
      case "welcome":
        return <WelcomeScreen onStart={handleStart} />;
      case "in-progress":
        return (
          <QuizScreen
            key={currentQuestionIndex}
            question={quizData[currentQuestionIndex]}
            onAnswer={handleAnswer}
            progress={((currentQuestionIndex + 1) / quizData.length) * 100}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quizData.length}
          />
        );
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h2 className="text-2xl font-headline font-semibold text-primary-foreground/90">
              Estamos preparando sua recomendação...
            </h2>
          </div>
        );
      case "results":
        return recommendation ? (
          <ResultScreen recommendation={recommendation} onRetake={handleReset} />
        ) : null;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md mx-auto">
        {renderContent()}
      </div>
    </main>
  );
}
