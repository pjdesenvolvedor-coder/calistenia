"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CheckCircle, Zap, Target, BarChart, Settings, Award } from "lucide-react";
import placeholderData from "@/lib/placeholder-images.json";

const loadingSteps = [
  { text: "Analisando seus objetivos...", icon: Target, duration: 1000 },
  { text: "Selecionando os melhores exercícios...", icon: Award, duration: 1500 },
  { text: "Ajustando plano pra sua rotina...", icon: Settings, duration: 1000 },
  { text: "Finalizando seu plano personalizado...", icon: BarChart, duration: 1500 },
];

const carouselImages = placeholderData.placeholderImages.filter(img => img.id.startsWith('carousel-'));


export function LoadingScreen({ mainGoal }: { mainGoal: string }) {
  const [progress, setProgress] = useState<{ [key: number]: number }>({});
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    let cumulativeDelay = 0;

    loadingSteps.forEach((step, index) => {
      setTimeout(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 5;
          setProgress((prev) => ({ ...prev, [index]: currentProgress }));

          if (currentProgress >= 100) {
            clearInterval(interval);
            setDone((prev) => [...prev, index]);
          }
        }, step.duration / 20);
      }, cumulativeDelay);

      cumulativeDelay += step.duration;
    });
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <CardContent className="p-0">
        <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg py-3 px-4 mb-6">
          <p className="font-semibold">
            Estamos montando seu Protocolo de Calistenia focado em{" "}
            <span className="font-bold">{mainGoal}</span>...
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {loadingSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="space-y-1 text-left">
                <div className="flex items-center text-sm font-medium text-foreground/80">
                  {done.includes(index) ? (
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  ) : (
                    <Icon className="h-4 w-4 mr-2" />
                  )}
                  <span>{step.text}</span>
                  <span className="ml-auto text-xs font-semibold">
                    {Math.round(progress[index] || 0)}%
                  </span>
                </div>
                <Progress value={progress[index] || 0} className="h-2" />
              </div>
            );
          })}
        </div>

        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {carouselImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
