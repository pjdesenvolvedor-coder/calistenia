"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import placeholderData from "@/lib/placeholder-images.json";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type WelcomeScreenProps = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const heroImage = placeholderData.placeholderImages.find(
    (img) => img.id === "quiz-hero"
  );

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-500 text-center shadow-2xl">
      {heroImage && (
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>
        </CardHeader>
      )}
      <CardContent className="p-6 bg-card relative -mt-16 z-10 rounded-t-2xl flex flex-col items-center">
        <CardTitle className="font-headline text-3xl md:text-4xl font-black uppercase mb-2 text-primary-foreground">
          Monte seu plano <span className="text-primary">personalizado</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground mb-6 max-w-xs">
          Responda algumas perguntas rápidas para montar seu cronograma ideal para seu corpo, rotina e objetivos.
        </CardDescription>
        <Button onClick={onStart} size="lg" className="w-full font-bold text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
          MONTAR MEU TREINO AGORA &gt;
        </Button>
      </CardContent>
    </Card>
  );
}
