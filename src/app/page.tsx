"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProductRecommendationOutput, recommendProduct } from "@/ai/flows/product-recommendation";

import { WelcomeScreen } from "@/components/quiz/welcome-screen";
import { QuizScreen } from "@/components/quiz/quiz-screen";
import { ResultScreen } from "@/components/quiz/result-screen";
import { MeasurementScreen } from "@/components/quiz/measurement-screen";
import { CheckboxQuestionScreen } from "@/components/quiz/checkbox-question-screen";
import { quizData } from "@/lib/quiz-data.tsx";
import { LoadingScreen } from "@/components/quiz/loading-screen";
import { RedirectingScreen } from "@/components/quiz/redirecting-screen";

type QuizState = "welcome" | "in-progress" | "loading" | "redirecting" | "results";
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

  const handleAnswer = (question: string, answer: string) => {
    const newAnswers = { ...answers, [question]: answer };
    setAnswers(newAnswers);
    advanceToNextQuestion(newAnswers);
  };

  const handleMeasurementSubmit = (measurements: Record<string, string>) => {
    const newAnswers = { ...answers, ...measurements };
    setAnswers(newAnswers);
    advanceToNextQuestion(newAnswers);
  };
  
  const handleCheckboxSubmit = (question: string, selectedAnswers: string[]) => {
    const newAnswers = { ...answers, [question]: selectedAnswers.join(", ") };
    setAnswers(newAnswers);
    advanceToNextQuestion(newAnswers);
  };
  
  const advanceToNextQuestion = (currentAnswers: Answers) => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(currentAnswers);
    }
  }

  const finishQuiz = async (finalAnswers: Answers) => {
    setQuizState("loading");
    try {
      const result = await recommendProduct({ quizAnswers: finalAnswers });
      setRecommendation(result);
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

  useEffect(() => {
    if (quizState === 'loading' && recommendation) {
      const showResults = async () => {
        // Show toast
        toast({
          title: "Tudo pronto!",
          description: "Encontramos o treino ideal para você.",
        });
  
        // Change state to "redirecting"
        setQuizState("redirecting");
  
        // Wait 3 seconds on the redirecting screen
        await new Promise(resolve => setTimeout(resolve, 3000));
  
        // Finally, go to results
        setQuizState("results");
      };
      
      showResults();
    }
  }, [quizState, recommendation, toast]);


  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setRecommendation(null);
    setQuizState("welcome");
  };

  const renderContent = () => {
    const currentQuestion = quizData[currentQuestionIndex];

    switch (quizState) {
      case "welcome":
        return <WelcomeScreen onStart={handleStart} />;
      case "in-progress":
        if (!currentQuestion) return null;

        const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
        const questionNumber = currentQuestionIndex + 1;
        const totalQuestions = quizData.length;

        if (currentQuestion.type === 'measurement') {
          return (
            <MeasurementScreen
              question={currentQuestion}
              onSubmit={handleMeasurementSubmit}
              progress={progress}
            />
          );
        }

        if (currentQuestion.type === 'multiple-checkbox') {
          return (
            <CheckboxQuestionScreen
              question={currentQuestion}
              onSubmit={handleCheckboxSubmit}
              progress={progress}
            />
          );
        }
        
        return (
          <QuizScreen
            key={currentQuestionIndex}
            question={currentQuestion}
            onAnswer={handleAnswer}
            progress={progress}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
          />
        );
      case "loading":
        const mainGoal = answers['Qual o seu principal objetivo ao iniciar este desafio?'] || "Secar gordura do corpo";
        return <LoadingScreen mainGoal={mainGoal} onLoadingComplete={finishQuiz} answers={answers} />;
      case "redirecting":
        return <RedirectingScreen />;
      case "results":
        return recommendation ? (
          <ResultScreen recommendation={recommendation} onRetake={handleReset} />
        ) : null;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md mx-auto">
        {renderContent()}
      </div>
    </main>
  );
}
