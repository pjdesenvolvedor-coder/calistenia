"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons/logo";
import placeholderData from "@/lib/placeholder-images.json";

type WelcomeScreenProps = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const heroImage = placeholderData.placeholderImages.find(
    (img) => img.id === "quiz-hero"
  );

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="p-0">
        {heroImage && (
          <div className="relative w-full h-48">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <Logo className="h-10 w-auto text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl font-bold mb-2">
          Crie o seu plano perfeito
        </CardTitle>
        <p className="text-muted-foreground mb-6">
          Responda algumas perguntas e descubra o produto ideal para você.
        </p>
        <Button onClick={onStart} size="lg" className="w-full font-bold text-lg" variant="default">
          Vamos começar
        </Button>
      </CardContent>
    </Card>
  );
}
