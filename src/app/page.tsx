"use client";

import { useState, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProductRecommendationOutput } from "@/ai/flows/product-recommendation";

import { WelcomeScreen } from "@/components/quiz/welcome-screen";
import { QuizScreen } from "@/components/quiz/quiz-screen";
import { ResultScreen } from "@/components/quiz/result-screen";
import { MeasurementScreen } from "@/components/quiz/measurement-screen";
import { CheckboxQuestionScreen } from "@/components/quiz/checkbox-question-screen";
import { quizData } from "@/lib/quiz-data";
import { LoadingScreen } from "@/components/quiz/loading-screen";
import { addDocumentNonBlocking } from "@/firebase";
import { collection, getFirestore } from "firebase/firestore";

type QuizState = "welcome" | "in-progress" | "loading" | "results";
type Answers = Record<string, string>;

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>("welcome");
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recommendation, setRecommendation] = useState<ProductRecommendationOutput | null>(null);
  const { toast } = useToast();
  const firestore = getFirestore();

  const handleStart = () => {
    // Track quiz click
    const quizId = "calisthenics-quiz"; // Example ID, can be made dynamic
    const clicksCollection = collection(firestore, 'quiz_clicks');
    addDocumentNonBlocking(clicksCollection, { 
      quizId: quizId, 
      timestamp: new Date().toISOString() 
    });

    setQuizState("in-progress");
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setRecommendation(null);
    setQuizState("welcome");
  };

  const advanceToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState("loading");
    }
  }, [currentQuestionIndex]);

  const handleAnswer = (question: string, answer: string) => {
    const newAnswers = { ...answers, [question]: answer };
    setAnswers(newAnswers);
    advanceToNextQuestion();
  };

  const handleMeasurementSubmit = (measurements: Record<string, string>) => {
    const newAnswers = { ...answers, ...measurements };
    setAnswers(newAnswers);
    advanceToNextQuestion();
  };
  
  const handleCheckboxSubmit = (question: string, selectedAnswers: string[]) => {
    const newAnswers = { ...answers, [question]: selectedAnswers.join(", ") };
    setAnswers(newAnswers);
    advanceToNextQuestion();
  };
  
  // This function now provides a static recommendation to bypass the AI flow.
  const getRecommendation = useCallback(() => {
    const mainGoal = answers['Qual o seu principal objetivo ao iniciar este desafio?'] || "Secar gordura e definir o corpo";
    const staticRecommendation: ProductRecommendationOutput = {
      recommendedProduct: "Definição Muscular",
      reasoning: `Com base nas suas respostas, seu objetivo é ${mainGoal.toLowerCase()}`
    };
    setRecommendation(staticRecommendation);
    setQuizState("results");
  }, [answers]);


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
        
        let questionDescription = currentQuestion.description;
        if (currentQuestion.id === 'q9') {
          const timeAnswer = answers['Quanto tempo por dia você consegue se dedicar ao seu treino?'] || '20 minutos';
          questionDescription = `Ótimo! Seus treinos serão adaptados para serem feitos Em casa em ${timeAnswer}/dia`;
        }

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
            question={{...currentQuestion, description: questionDescription}}
            onAnswer={handleAnswer}
            progress={progress}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
          />
        );
      case "loading":
        const mainGoal = answers['Qual o seu principal objetivo ao iniciar este desafio?'] || "Secar gordura do corpo";
        return <LoadingScreen mainGoal={mainGoal} onLoadingComplete={getRecommendation} />;
      case "results":
        return recommendation ? (
          <ResultScreen answers={answers} recommendation={recommendation} onRetake={handleReset} />
        ) : null;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  const mainClass = quizState === "results" 
    ? "w-full"
    : "flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8";

  const containerClass = quizState === "results"
    ? "w-full"
    : "w-full max-w-md mx-auto";

  return (
    <main className={mainClass}>
      <div className={containerClass}>
        {renderContent()}
      </div>
    </main>
  );
}
