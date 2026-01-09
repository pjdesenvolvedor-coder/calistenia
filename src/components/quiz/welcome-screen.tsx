"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import placeholderData from "@/lib/placeholder-images.json";

type WelcomeScreenProps = {
  onStart: () => void;
};

const CalisthenicsLogo = () => (
  <div className="text-center font-headline uppercase">
    <h2 className="text-xl font-bold tracking-wider">Desafio de</h2>
    <h1 className="text-4xl font-black">Calistenia</h1>
    <p className="text-xl font-bold tracking-wider">- 28 Dias -</p>
  </div>
);

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const heroImage = placeholderData.placeholderImages.find(
    (img) => img.id === "quiz-hero"
  );

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-500 text-center relative flex flex-col justify-between min-h-[80vh] bg-card/10 rounded-lg p-6">
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-20"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-start pt-8">
        <CalisthenicsLogo />
      </div>

      <div className="relative z-10 flex flex-col justify-end">
        <h2 className="font-headline text-3xl md:text-4xl font-black uppercase mb-2">
          Monte seu plano <span className="text-primary">personalizado</span> de calistenia para <span className="text-primary">secar e definir</span> em 28 dias
        </h2>
        <p className="text-muted-foreground mb-8">
          Responda algumas perguntas rápidas para montar seu cronograma ideal para seu corpo, rotina e objetivos.
        </p>
        <Button onClick={onStart} size="lg" className="w-full font-bold text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
          MONTAR MEU TREINO AGORA &gt;
        </Button>
      </div>
    </div>
  );
}
