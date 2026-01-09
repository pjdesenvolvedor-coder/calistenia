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
import { CheckCircle, Target, Settings, Award, BarChart } from "lucide-react";
import placeholderData from "@/lib/placeholder-images.json";

const loadingSteps = [
  { text: "Analisando seus objetivos...", icon: Target, duration: 1800 },
  { text: "Selecionando os melhores exercícios...", icon: Award, duration: 2500 },
  { text: "Ajustando plano pra sua rotina...", icon: Settings, duration: 1800 },
  { text: "Finalizando seu plano personalizado...", icon: BarChart, duration: 2500 },
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
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <CardContent className="p-0 flex flex-col justify-between h-full min-h-[500px] sm:min-h-0">
        <div>
          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg py-2 px-3 mb-4">
            <p className="font-semibold text-sm sm:text-base">
              Estamos montando seu Protocolo de Calistenia focado em{" "}
              <span className="font-bold">{mainGoal}</span>...
            </p>
          </div>

          <div className="space-y-3 mb-4">
            {loadingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="space-y-1 text-left">
                  <div className="flex items-center text-xs sm:text-sm font-medium text-foreground/80">
                    {done.includes(index) ? (
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    ) : (
                      <Icon className="h-4 w-4 mr-2 shrink-0" />
                    )}
                    <span className="truncate">{step.text}</span>
                    <span className="ml-auto text-xs font-semibold">
                      {Math.round(progress[index] || 0)}%
                    </span>
                  </div>
                  <Progress value={progress[index] || 0} className="h-2" />
                </div>
              );
            })}
          </div>
        </div>

        <Carousel className="w-full max-w-[200px] sm:max-w-xs mx-auto mt-auto">
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
                        sizes="(max-width: 640px) 150px, 200px"
                      />
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-8px] sm:left-2" />
          <CarouselNext className="right-[-8px] sm:right-2" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
