
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type WelcomeScreenProps = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center text-white p-4 rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <Image
        src="https://img.freepik.com/fotos-premium/cara-forte-com-torso-muscular-flexionando-os-musculos-dos-bracos-mostrando-biceps-duplos-no-ginasio-forca_474717-21185.jpg"
        alt="Homem forte mostrando os músculos"
        fill
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/80 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <div className="mb-8 font-headline">
            <p className="text-lg">DESAFIO DE</p>
            <h1 className="text-5xl font-black tracking-wider">CALISTENIA</h1>
            <p className="text-lg">- 28 DIAS -</p>
        </div>

        <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-headline font-black uppercase leading-tight">
            Monte seu plano <span className="text-yellow-400">personalizado</span> de calistenia para <span className="text-yellow-400">secar e definir em 28 dias</span>
            </h2>
        </div>
        <p className="max-w-md text-base text-neutral-300 mb-8">
            Responda algumas perguntas rápidas para montar seu cronograma ideal para seu corpo, rotina e objetivos.
        </p>
      </div>
      <div className="relative z-20 w-full">
        <Button onClick={onStart} size="lg" className="w-full font-bold text-lg bg-green-500 hover:bg-green-600 text-black animate-pulse-scale">
          MONTAR MEU TREINO AGORA &gt;
        </Button>
      </div>
    </div>
  );
}
