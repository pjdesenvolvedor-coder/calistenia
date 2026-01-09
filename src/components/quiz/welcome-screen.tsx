"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type WelcomeScreenProps = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {

  return (
    <Card className="w-full max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl font-black uppercase text-primary">
          Quiz de Calistenia
        </CardTitle>
        <CardDescription>
          Responda algumas perguntas para encontrar o plano de treino ideal para você.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onStart} size="lg" className="w-full font-bold">
          Começar
        </Button>
      </CardContent>
    </Card>
  );
}
