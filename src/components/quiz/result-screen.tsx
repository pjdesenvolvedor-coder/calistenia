"use client";

import { SalesPage } from "@/components/sales/sales-page";
import { ProductRecommendationOutput } from "@/ai/flows/product-recommendation";

type ResultScreenProps = {
  recommendation: ProductRecommendationOutput;
  onRetake: () => void;
  answers: Record<string, string>;
};

export function ResultScreen({ recommendation, onRetake, answers }: ResultScreenProps) {
  const mainGoal = answers['Qual o seu principal objetivo ao iniciar este desafio?'] || 'Definição Muscular';
  
  const updatedReasoning = `Com base nas suas respostas, seu objetivo é ${mainGoal.toLowerCase()}`;
  
  const updatedRecommendation = {
    ...recommendation,
    reasoning: updatedReasoning
  };

  return <SalesPage recommendation={updatedRecommendation} onRetake={onRetake} />;
}
