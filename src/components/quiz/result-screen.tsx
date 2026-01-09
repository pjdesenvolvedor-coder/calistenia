"use client";

import { SalesPage } from "@/components/sales/sales-page";
import { ProductRecommendationOutput } from "@/ai/flows/product-recommendation";

type ResultScreenProps = {
  recommendation: ProductRecommendationOutput;
  onRetake: () => void;
};

export function ResultScreen({ recommendation, onRetake }: ResultScreenProps) {
  return <SalesPage recommendation={recommendation} onRetake={onRetake} />;
}
