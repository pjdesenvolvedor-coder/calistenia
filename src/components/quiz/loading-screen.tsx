"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
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
  { text: "Analisando seus objetivos...", icon: Target, duration: 2.5 },
  { text: "Selecionando os melhores exercícios...", icon: Award, duration: 3.5 },
  { text: "Ajustando plano pra sua rotina...", icon: Settings, duration: 2.5 },
  { text: "Finalizando seu plano personalizado...", icon: BarChart, duration: 3.5 },
];

const totalDuration = loadingSteps.reduce((acc, step) => acc + step.duration, 0);

const carouselImages = placeholderData.placeholderImages.filter(img => img.id.startsWith('carousel-'));


export function LoadingScreen({ mainGoal, onLoadingComplete }: { mainGoal: string, onLoadingComplete: () => void }) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  onLoadingCompleteRef.current = onLoadingComplete;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const newElapsedTime = (Date.now() - startTime) / 1000;
      if (newElapsedTime >= totalDuration) {
        clearInterval(interval);
        setElapsedTime(totalDuration);
        onLoadingCompleteRef.current();
      } else {
        setElapsedTime(newElapsedTime);
      }
    }, 50); // Update every 50ms for smoother progress

    return () => clearInterval(interval);
  }, []);
  
  let cumulativeDuration = 0;

  return (
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6 text-center animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
      <CardContent className="p-0 flex flex-col justify-between h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] md:min-h-0">
        <div className="flex-shrink-0">
          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg py-2 px-3 mb-4">
            <p className="font-semibold text-sm sm:text-base">
              Estamos montando seu Protocolo de Calistenia focado em{" "}
              <span className="font-bold">{mainGoal}</span>...
            </p>
          </div>

          <div className="space-y-3 mb-4">
            {loadingSteps.map((step, index) => {
              const stepStartTime = cumulativeDuration;
              const stepEndTime = cumulativeDuration + step.duration;
              cumulativeDuration = stepEndTime;

              let progress;
              if (elapsedTime >= stepEndTime) {
                progress = 100;
              } else if (elapsedTime < stepStartTime) {
                progress = 0;
              } else {
                progress = ((elapsedTime - stepStartTime) / step.duration) * 100;
              }
              const isDone = progress >= 100;
              const Icon = step.icon;

              return (
                <div key={index} className="space-y-1 text-left">
                  <div className="flex items-center text-xs sm:text-sm font-medium text-foreground/80">
                    {isDone ? (
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    ) : (
                      <Icon className="h-4 w-4 mr-2 shrink-0 animate-pulse" />
                    )}
                    <span className="truncate">{step.text}</span>
                    <span className="ml-auto text-xs font-semibold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center my-4">
            <Carousel className="w-full max-w-[200px] sm:max-w-xs mx-auto">
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
                            priority
                          />
                        </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-8px] sm:left-2" />
              <CarouselNext className="right-[-8px] sm:right-2" />
            </Carousel>
        </div>
      </CardContent>
    </Card>
  );
}
