"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Autoplay from "embla-carousel-autoplay";
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
  const [progress, setProgress] = useState(0);
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  onLoadingCompleteRef.current = onLoadingComplete;

  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    let frameId: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      if (elapsedTime < totalDuration) {
        frameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        onLoadingCompleteRef.current();
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  let cumulativeDuration = 0;
  const elapsedTotalTime = (progress / 100) * totalDuration;

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
              cumulativeDuration += step.duration; // Update cumulativeDuration for the next iteration
              const stepEndTime = cumulativeDuration;
              
              let stepProgress;
              if (elapsedTotalTime >= stepEndTime) {
                  stepProgress = 100;
              } else if (elapsedTotalTime < stepStartTime) {
                  stepProgress = 0;
              } else {
                  stepProgress = ((elapsedTotalTime - stepStartTime) / step.duration) * 100;
              }
              const isDone = stepProgress >= 100;
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
                      {Math.round(stepProgress)}%
                    </span>
                  </div>
                  <Progress value={stepProgress} className="h-2" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center my-4">
            <Carousel 
              className="w-full max-w-[200px] sm:max-w-xs mx-auto"
              plugins={[autoplayPlugin.current]}
              onMouseEnter={() => autoplayPlugin.current.stop()}
              onMouseLeave={() => autoplayPlugin.current.reset()}
            >
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
