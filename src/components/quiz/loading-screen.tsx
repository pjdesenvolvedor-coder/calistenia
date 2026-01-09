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
import actualPlaceholderData from "@/lib/placeholder-images.json";
import { Button } from "@/components/ui/button";

const loadingSteps = [
  { text: "Analisando seus objetivos...", icon: Target, duration: 2.5 },
  { text: "Selecionando os melhores exercícios...", icon: Award, duration: 3.5 },
  { text: "Ajustando plano pra sua rotina...", icon: Settings, duration: 2.5 },
  { text: "Finalizando seu plano personalizado...", icon: BarChart, duration: 3.5 },
];

const carouselImages = actualPlaceholderData.placeholderImages.filter(img => img.id.startsWith('carousel-'));

export function LoadingScreen({
  mainGoal,
  onLoadingComplete,
}: {
  mainGoal: string;
  onLoadingComplete: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  onLoadingCompleteRef.current = onLoadingComplete;

  const autoplayPlugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;
    let stepStartTime: number | null = null;
    let cumulativeDuration = 0;

    const totalDuration = loadingSteps.reduce((acc, step) => acc + step.duration, 0) * 1000;
    
    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
        stepStartTime = timestamp;
      }
      
      const elapsedTime = timestamp - startTime;

      const currentStepIndex = activeStep;
      if (currentStepIndex >= loadingSteps.length) {
          onLoadingCompleteRef.current();
          return;
      }
      const currentStep = loadingSteps[currentStepIndex];
      const stepDuration = currentStep.duration * 1000;
      const elapsedSinceStepStart = timestamp - (stepStartTime ?? timestamp);

      const stepProgress = Math.min((elapsedSinceStepStart / stepDuration) * 100, 100);
      setProgress(stepProgress);

      if (elapsedSinceStepStart >= stepDuration) {
          if (currentStepIndex < loadingSteps.length - 1) {
              setActiveStep(prev => prev + 1);
              stepStartTime = (stepStartTime ?? 0) + stepDuration;
          } else {
              setProgress(100);
              onLoadingCompleteRef.current();
              return; 
          }
      }
      
      if (elapsedTime >= totalDuration) {
        setProgress(100);
        setActiveStep(loadingSteps.length -1);
        onLoadingCompleteRef.current();
        return; 
      }
      
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(frameId);
  }, [activeStep]);
  

  const getStepProgress = (stepIndex: number) => {
    if (stepIndex < activeStep) return 100;
    if (stepIndex === activeStep) return progress;
    return 0;
  };
  
  const isComplete = activeStep === loadingSteps.length - 1 && progress >= 100;

  return (
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6 text-center animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
       <CardContent className="p-0 flex flex-col justify-between h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] md:min-h-0 relative">
        <div className="flex-shrink-0">
          <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg py-2 px-3 mb-4">
            <p className="font-semibold text-sm sm:text-base">
              Estamos montando seu Protocolo de Calistenia focado em{" "}
              <span className="font-bold">{mainGoal}</span>...
            </p>
          </div>

          <div className="space-y-3 mb-4">
            {loadingSteps.map((step, index) => {
              const stepProgress = getStepProgress(index);
              const isDone = stepProgress >= 100;
              const isActive = index === activeStep;
              const Icon = step.icon;

              return (
                <div key={index} className={`space-y-1 text-left transition-opacity duration-300 ${isComplete || index <= activeStep ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="flex items-center text-xs sm:text-sm font-medium text-foreground/80">
                    {isDone && !isActive ? (
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                    ) : (
                      <Icon className={`h-4 w-4 mr-2 shrink-0 ${isActive ? 'animate-pulse' : ''}`} />
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
              opts={{
                loop: true,
              }}
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
                            priority={carouselImages.indexOf(image) < 2}
                          />
                        </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
               <CarouselPrevious />
               <CarouselNext />
            </Carousel>
        </div>
      </CardContent>
    </Card>
  );
}
